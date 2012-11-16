package edu.newschool.piim.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.StringTokenizer;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.tatrc.paws.labs.Lab;
import org.tatrc.paws.labs.Report;
import org.tatrc.paws.labs.ResultItem;
import org.tatrc.paws.patient.Patient;
import org.tatrc.paws.radiology.RadiologyResult;

import edu.newschool.piim.model.results.ResultForwarded;
import edu.newschool.piim.model.results.ResultStatus;
import edu.newschool.piim.model.results.ResultStatusStates;
import edu.newschool.piim.model.results.ResultsDetail;
import edu.newschool.piim.model.results.ResultsDetailLab;
import edu.newschool.piim.model.results.ResultsDetailsRadiology;
import edu.newschool.piim.model.results.ResultsKind;
import edu.newschool.piim.model.results.ResultsNew;
import edu.newschool.piim.model.results.ResultsNewLab;
import edu.newschool.piim.model.results.ResultsNewRadiology;
import edu.newschool.piim.util.Hib;
import edu.newschool.piim.util.StringUtil;



/**
 * Service for accessing the new results data 
 * 
 * @author gregm
 */
public final class ServResults {
	
    /**
     * arbitrary text used to join and split a key for test id  
     */
    private static final String ID_DELIMETER = "PIIM";
    
    /**
     * static variable for access to the system log
     */
    private static final Log LOG = LogFactory.getLog(ServResults.class);

    /**
     * public interface to find a single test based on the test id. 
     * paws has no such id, so we use a natural key combining
     * patient id/unit number, the test timestamp, and the kind
     * as Lab or Rad so we can tell which service to query
     * temporary variables are used for self documentation clarity
     * 
     * @param testId a key to find a particular test
     * @return a result if one is found or null
     */
    public static ResultsNew getResult(final String testId) {
        if (StringUtil.isEmpty(testId)  || 0 > testId.indexOf(ID_DELIMETER)){
            throw new IllegalArgumentException(
                    "testId cannot be empty or malformed::" + testId);
        }
        final String[] split = testId.split(ID_DELIMETER);
        final String unitNbr = split[0];
        final String testDateGetTime = split[1];
        final String testNameHash = split[2];
        final String testKind = split[3];
        if ("Lab".equals(testKind)) {
            return resultLab(testId, unitNbr, testDateGetTime
                    , Integer.valueOf(testNameHash));
        } else if ("Rad".equals(testKind)) {
            return resultRad(testId, unitNbr, testDateGetTime
                    , Integer.valueOf(testNameHash));
        } else {
            throw new IllegalStateException("cannot resolve testKind ::" 
                    + testId);
        }
    }

    /**
     * public interface to get a list of results for the given patient
     *  
     * @param unitNbr the patient id
     * @return a list of the results from the labs and radiology services
     */
    public static List<ResultsNew> getResultsNew(final String unitNbr) {
        final List<ResultsNew> res = new ArrayList<ResultsNew>();
        for (final ResultsNew aResult: getResults(unitNbr)) {
            if (isNew(aResult)) {
                res.add(aResult);
            }
        }
        Collections.sort(res, new Comparator<ResultsNew>() {
            public int compare(final ResultsNew fir, final ResultsNew sec) {
                return (-1 * (fir.getTestDate().compareTo(sec.getTestDate())));
            }
        });
        return res; 
    }

    /**
     * public interface to access the list saved results for the 
     * given unit number
     * 
     * @param unitNbr the patient id
     * @return a list of saved results for the given patient id
     */
    public static List<ResultsNew> getResultsSaved(final String unitNbr){
        final List<ResultsNew> res = new ArrayList<ResultsNew>();
        for (final ResultsNew aResult: getResults(unitNbr)) {
            if (ResultStatusStates.Saved.equals(
                    aResult.getStatusObj().getState())) {
                res.add(aResult);
            }
        }
        return res;
    }
    
    /**
     * public interface to mark the test as forwarded
     * @param testId
     * @param providerNcid
     * @return
     */
    public static ResultStatus resultForward(final String testId
            , final String providerNcid) {
        ResultForwarded.recordForwarded(testId, providerNcid);
        return updateStatus(testId, ResultStatusStates.Forwarded);
    }

    /**
     * public interface to mark a test as reviewed
     * @param testId
     * @return
     */
    public static ResultStatus resultReviewed(final String testId) {
        return updateStatus(testId, ResultStatusStates.Reviewed);
    }

    /**
     * public interface to mark a test as saved
     * @param testId
     * @return
     */
    public static ResultStatus resultSaved(final String testId) {
        return updateStatus(testId, ResultStatusStates.Saved);
    }
    
    /**
     * public interface to mark a test as signed
     * @param testId
     * @return
     */
    public static ResultStatus resultSigned(final String testId) {
        return updateStatus(testId, ResultStatusStates.Signed);
    }
    
    /**
     * public interface to mark a test as un-saved, ie moved to new tab
     * @param testId
     * @return
     */
    public static ResultStatus resultUnSaved(final String testId) {
        return updateStatus(testId, ResultStatusStates.New);
    }

    /**
     * calculate the number of years old the paws patient is and 
     * return it as an int
     * @param pat the patient as returned from paws
     * @return an int for the years old of the patient
     */
    private static int calcPatAgeYrs(final Patient pat) {
        return Calendar.getInstance().get(
                Calendar.YEAR) - pat.getDateOfBirth().get(Calendar.YEAR);
    }

    /**
     * iterates over the given set of reports and checks if
     * critical/abnormal should be flagged
     * 
     * @param results a set of result objects for a patient returned from paws
     * @return the text for critical or abnomal if flagged or null
     */
    private static String criticalAbnormal(final Report[] results) {
        for(int i = 0 ; null != results && i < results.length; i++) {
            final String crit = critiInspectResultItems(results[i].getResultItems());
            if (null != crit) {
                return crit;
            }
        }
        return null;
    }
    
        
    /**
     * do the work of inspecting a result to see if it is critical or abnormal
     * 
     * @param resItems the individual result items from a report here in order
     * to avoid i/j nested iterators
     * @return the text of critical or abnormal or null
     */
    private static String critiInspectResultItems(final ResultItem[] resItems){
        for (int i = 0; null != resItems && i < resItems.length; i++) {
            if ("Abnormal".equalsIgnoreCase(resItems[i].getName())) {
                final String ncid = resItems[i].getValue().getNCID();
                if (! "1044".equalsIgnoreCase(ncid)) {
                    if ("1039".equalsIgnoreCase(ncid)) {
                        return "CRITICAL";
                    } else {
                        return "ABNORMAL";
                    }
                }
            }
        }
        return null;
    }

    /**
     * take a report and build a resultDetailLab object
     * 
     * @param report the test report as returned from paws
     * @param siteSpecimen as text unpacked upstream
     * @return a ResultDetailLab object which addresses the front end need
     */
    private static ResultsDetailLab detailLab(final Report report, final String siteSpecimen) {
        final Map<String, String> resultItems = unpackResultItems(report.getResultItems());
        
        final ResultsDetailLab detail = new ResultsDetailLab();
        detail.setId("fakeId");
        detail.setResultName(report.getName().getRepresentation());
        detail.setSiteSpecimen(siteSpecimen); // TODO this is in the wrong place ie object
        detail.setResultValues(resultItems.get("Value"));
        detail.setUnits(resultItems.get("Units")); 
        detail.setRefRange(resultItems.get("Reference Range"));
        return detail;
    }

    /**
     * from the given Lab from paws, make a list of the result details
     * 
     * @param lab the lab as from paws
     * @return a list of result details used for the front end
     */
    private static List<ResultsDetail> detailsLab(final Lab lab){
        final Report[] results = lab.getResults();
        final List<ResultsDetail> details = new ArrayList<ResultsDetail>();
        for (int i = 0; null != results && i < results.length ; i++) {
            details.add(detailLab(results[i], lab.getSiteSpecimen()));
        }
        return details;
    }

    /**
     * unpack the given radiology result and build the list of resultDetails 
     * needed by the jsp
     * @param rad the radiology report delivered by paws
     * @return the list of result details used by the jsp containing the 
     * data contained in the paws report
     */
    private static List<ResultsDetail> detailsRad(final RadiologyResult rad) {
        final List<ResultsDetail> details = new ArrayList<ResultsDetail>();

        details.add(detailsRadPoc(rad));
        details.add(detailsRadStatus(rad));
        details.add(detailsRadBlank());
        details.add(detailsRadProcedure(rad));
        details.add(detailsRadReason(rad));
        details.add(detailsRadBlank());
        details.add(detailsRadExamNbr(rad));
        details.add(detailsRadTranscriptTs(rad));
        details.add(detailsRadProvider(rad));
        details.add(detailsRadBlank());
        details.add(detailsRadResultCode(rad));

        if (-1 != rad.getReport().indexOf("Interpreted By")) {
            details.add(detailsRadInterpretedBy(rad.getReport()));
        }
        if (-1 != rad.getReport().indexOf("Approved By:")) {
            details.add(detailsRadApprovedBy(rad.getReport()));
        }
        if (-1 != rad.getReport().indexOf("Approved Date/Time:")) {
            details.add(detailsRadApprovedTs(rad.getReport()));
        }
        details.add(detailsRadBlank());
        if (-1 != rad.getReport().indexOf("Report Text:")) {
            details.add(detailsRadText(rad.getReport()));
        }
        return details;
    }

    /**
     * the hackie yucky way we have to unpack the approved by field
     * @param report the report text as delivered by paws
     * @return a report details for a radiology
     */
    private static ResultsDetailsRadiology detailsRadApprovedBy(
            final String report) {
        final StringTokenizer tok = new StringTokenizer(
                report.substring(report.indexOf("Approved By:")));
        tok.nextToken();
        tok.nextToken();
        return detailsRadDoIt("Approved by:", tok.nextToken() + " " 
                + tok.nextToken());
    }

    /** 
     * the hackie yucky way we have to unpack the approved date time field
     * @param report the report text as delivered by paws
     * @return a report details for a radiology
     */
    private static ResultsDetailsRadiology detailsRadApprovedTs(
            final String report) {
        final StringTokenizer tok = new StringTokenizer(
                report.substring(report.indexOf("Approved Date/Time:")));
        tok.nextToken();
        tok.nextToken();
        return detailsRadDoIt("Approved Date/Time:"
                , tok.nextToken() + " " + tok.nextToken());
    }

    /**
     * utility function to make a blank row
     * @return
     */
    private static ResultsDetailsRadiology detailsRadBlank() {
        return detailsRadDoIt("", "");
    }

    /**
     * move the paws result data for a radiology from a name value pair 
     * to a wrapper object and set its warning label
     * @param label the left hand side of the detail
     * @param value the right hand side of the detail
     * @return the radiology detail item object
     */
    private static ResultsDetailsRadiology detailsRadDoIt(
            final String label, final String value) {
        final ResultsDetailsRadiology detail = new ResultsDetailsRadiology();
        detail.setId(1);
        detail.setRadiRptLabel(label);
        detail.setRadiRptValue(value);
        if ((! StringUtil.isEmpty(value)) && 
                (-1 != value.toUpperCase(Locale.getDefault())
                        .indexOf("ABNORMAL"))) {
            detail.setWarning(true);
        }
        return detail;
    }

    /**
     * unpack the radiology exam number
     * @param rad the data from paws
     * @return a report detail for the radiology report number
     */
    private static ResultsDetailsRadiology detailsRadExamNbr(
            final RadiologyResult rad) {
        return detailsRadDoIt("Exam #:", rad.getExamNumber());
    }

    /**
     * unpack the interpreted by for radiology
     * @param report the report filed of the radiology object returned by paws
     * @return the details object
     */
    private static ResultsDetailsRadiology detailsRadInterpretedBy(
            final String report) {
        final StringTokenizer tok = new StringTokenizer(
                report.substring(report.indexOf("Interpreted By:")));
        tok.nextToken();
        tok.nextToken();
        return detailsRadDoIt("Interpreted by:"
                , tok.nextToken() + " " +tok.nextToken());
    }

    /**
     * unpack the POC enc
     * @param rad the radiology report from paws
     * @return a detail object
     */
    private static ResultsDetailsRadiology detailsRadPoc(
            final RadiologyResult rad) {
        return detailsRadDoIt("POC Enc: " + rad.getPOCEnc()
                , "POC Fac: " + rad.getFacility().getRepresentation()); 
    }

    /**
     * unpack the procedure
     * @param rad the paws report
     * @return the detail object
     */
    private static ResultsDetailsRadiology detailsRadProcedure(
            final RadiologyResult rad) {
        return detailsRadDoIt("Procedure:"
                , rad.getProcedure().getRepresentation());
    }

    /**
     * unpack the radiology provider
     * @param rad the paws report
     * @return the detail object
     */
    private static ResultsDetailsRadiology detailsRadProvider(
            final RadiologyResult rad) {
        return detailsRadDoIt("Provider:"
                , rad.getOrderingClinician().getRepresentation());
    }

    /**
     * unpack the radiology reason for
     * @param rad the paws report
     * @return the details object
     */
    private static ResultsDetailsRadiology detailsRadReason(
            final RadiologyResult rad) {
        return detailsRadDoIt("Reason for Order:"
                , rad.getReasonForOrder());
    }

    /**
     * unpack the radiology result code
     * @param rad the paws report
     * @return the details object
     */
    private static ResultsDetailsRadiology detailsRadResultCode(
            final RadiologyResult rad) {
        return detailsRadDoIt("Result Code:", rad.getResultCode());
    }

    /**
     * unpack the status 
     * @param rad the paws report
     * @return the the detail object
     */
    private static ResultsDetailsRadiology detailsRadStatus(
            final RadiologyResult rad) {
        return detailsRadDoIt("Status: " 
                + rad.getStatus().getRepresentation(), ""); 
    }

    /**
     * basic attempt to extract the actual report text from the report 
     * returned from paws  
     * @param report as returned from paws
     * @return a detail object encapsulating the result text
     */
    private static ResultsDetailsRadiology detailsRadText(final String report) {
        final StringTokenizer tok = new StringTokenizer(
                report.substring(report.indexOf("Report Text:") + 12));
        final StringBuilder buff = new StringBuilder();
        for (int cntr = 0; tok.hasMoreElements(); ) {
            final String next = tok.nextToken();
            cntr += next.length();
            if (120 < cntr) {
                buff.append("<br>");
                cntr = next.length();
            }
            buff.append(next);
            cntr++;
            buff.append(" ");
        }
        return detailsRadDoIt("Text", buff.toString()); // substring);
    }

    /**
     * unpack the transcription date time fromt he paws data
     * @param rad the paws data
     * @return the detail object
     */
    private static ResultsDetailsRadiology detailsRadTranscriptTs(
            final RadiologyResult rad) {
        return detailsRadDoIt("Transcription Date/Time:"
                , new SimpleDateFormat("MM/dd/yyyy hh:mm a")
                .format(rad.getDateEvent().getTime()));
    }

    /**
     * build a lab result from the patient and the lab data.  some data is still
     * static and not reflected in the paws data
     * @param patient the patient from which we get date, ssn, patient name, etc.
     * @param lab the lab result taken from paws
     * @return the results object required by the front end
     */
    private static ResultsNew fromLab(final Patient patient, final Lab lab) {
        final int yrsOld = calcPatAgeYrs(patient);
        final String age = 
            new StringBuilder().append(yrsOld).append("yo").toString();
        final String criticalAbnormal = criticalAbnormal(lab.getResults());
        
        final String priority = "Routine";// TODO -- not in record
        final String resultStatus = "New";//TODO
        final Date testDate = lab.getCollectionDate().getTime();
        final String testName = lab.getReport().getRepresentation();
        
        // final String id = new StringBuilder().append(unitNumber).append(ID_DELIMETER).append(testDate.getTime()).append(ID_DELIMETER).append(testName.hashCode() ).append(ID_DELIMETER).append("Lab").toString();
        // ResultsNew newResultLab = ResultsNewLab.getInstance(id);
        
        final ResultsNew res = makeResultState( ResultsKind.LABORATORY
                , patient.getUnitNumber()
                , age, criticalAbnormal, makeFmpSsn(patient), patient.getGender()
                , lab.getOrderComment(), makePatientName(patient), priority
                , resultStatus, testDate, testName);
        res.setDetails(detailsLab(lab));
        return res;
    }

    /**
     * build a radiology report from the paws data 
     * @param pat the paws patient data  builds the 
     * id which we use but is not in the paws data
     * @param rad the paws radiology data
     * @return a results object for the front end
     */
    private static ResultsNew fromRad(
            final Patient pat, final RadiologyResult rad) {
        final String age = new StringBuilder()
        .append(calcPatAgeYrs(pat)).append("yo").toString();
        final String patientName = makePatientName(pat);
        final String priority = "Routine";// TODO -- not in record
        final String resultStatus = "New";//TODO
        final Date testDate = rad.getDateEvent().getTime();
        final String testName = rad.getProcedure().getRepresentation();
        //final String id = new StringBuilder().append(rad.getUnitNumber()).append(ID_DELIMETER).append(testDate.getTime()).append(ID_DELIMETER).append(testName.hashCode()).append(ID_DELIMETER).append("Rad").toString();
        //ResultsNew resultsNewRad = ResultsNewRadiology.getInstance(id);
        
        final ResultsNew curTest = makeResultState(ResultsKind.RADIOLOGY
                , pat.getUnitNumber()
                , age, radResult(rad.getResultCode()), makeFmpSsn(pat)
                , pat.getGender(), radOrderComments(rad.getReportText()) 
                ,  patientName, priority, resultStatus, testDate, testName);
        curTest.setDetails(detailsRad(rad));
        
        return curTest;
    }

    /**
     * decide if we need to get results for one person -- with a unit number,
     * or all the persons -- without a unit number
     * @param unitNbr a person id or nothing
     * @return a list of either a person's results or everyone's results
     */
    private static List<ResultsNew> getResults(final String unitNbr) {
        return (StringUtil.isEmpty(unitNbr))
        ? getResultsNoNbr(): getResultsWithNbr(unitNbr);
    }

    /**
     * get a list of results for everyone by first getting all the patiens and
     * then for each patient get their results
     * @return all the results for all the people
     */
    private static List<ResultsNew> getResultsNoNbr() {
        final List<ResultsNew> res = new ArrayList<ResultsNew>();
        final List<Patient> patientsAll = ServPaws.patientsAll();
        for (final Patient pat: patientsAll) {
            res.addAll(resultsForPatient(pat));
        }
        return res;
    }

    /**
     * get results for an individual 
     * @param unitNbr the person id
     * @return a list of results for the individual
     */
    private static List<ResultsNew> getResultsWithNbr(final String unitNbr) {
        return resultsForPatient(ServPaws.patient(unitNbr));
    }

    /**
     * get the labs for an single patient
     * @param pat the patient as returned from paws
     * @return a list of labs for a given patient
     */
    private static List<ResultsNew> hasUnbrLab(final Patient pat) {
        final List<Lab> labs = ServPaws.labs(pat.getUnitNumber());
        final List<ResultsNew> results = new ArrayList<ResultsNew>();
        for (final Lab lab: labs) {
            results.add(fromLab(pat, lab));
        }
        return results;
    }

    /**
     * get the radiology reports for a given person as represented by
     * the paws patient object
     * @param pat the patient from paws
     * @return a list of radiology results
     */
    private static List<ResultsNew> hasUnbrRadiology(final Patient pat) {
        final List<ResultsNew> results = new ArrayList<ResultsNew>();
        final List<RadiologyResult> rads = ServPaws.rads(pat.getUnitNumber());
        for (final RadiologyResult rad: rads) {
            results.add(fromRad(pat, rad));
        }
        return results;
    }

    private static boolean isNew(final ResultsNew aResult) {
        return ResultStatusStates.New.equals(aResult.getStatusObj().getState()) 
        || ResultStatusStates.Reviewed.equals(aResult.getStatusObj().getState());
    }

    /**
     * build the fmp ssn which appear to be two fields in the data so why
     * are they combined?
     * @param pat the paws data
     * @return the string combining the field
     */
    private static String makeFmpSsn(final Patient pat) {
        final StringBuilder buff = new StringBuilder();
        buff.append(pat.getFMP());
        if (! StringUtil.isEmpty(pat.getSSN())) {
            buff.append(" / ");
            if (9 == pat.getSSN().length()) {
                buff.append(pat.getSSN().substring(0,3)).append('-')
                .append(pat.getSSN().substring(3, 5)).append('-')
                .append(pat.getSSN().substring(5)) ;
            } else {
                buff.append(pat.getSSN());
            }
        }
        return buff.toString();
    }

    /**
     * compose a patient name for the front end which is oen string fromt he first name
     * last name pairs
     * @param pat
     * @return
     */
    private static String makePatientName(final Patient pat) {
        return new StringBuilder().append(pat.getName()
                .getLastName()).append(", ").append(pat.getName()
                        .getFirstName()).toString();
    }

    /**
     * isolate the population of the results object from string primatives
     * @param age
     * @param criticalAbnormal
     * @param fmpSsn
     * @param gender
     * @param orderComments
     * @param patientName
     * @param priority
     * @param resultStatus
     * @param testDate
     * @param testName
     * @param newRes
     * @return the result object
     */
    private static ResultsNew makeResultState(
            final ResultsKind kind
            , final String unitNbr
            , final String age
            , final String criticalAbnormal
            , final String fmpSsn
            , final String gender
            , final String orderComments
            , final String patientName
            , final String priority
            , final String resultStatus
            , final Date testDate
            , final String testName) { // , final ResultsNew newRes) {

        String kindForId = (ResultsKind.RADIOLOGY.equals(kind))? "Rad": "Lab";
        
        final String id = new StringBuilder().append(unitNbr).append(ID_DELIMETER).append(testDate.getTime()).append(ID_DELIMETER).append(testName.hashCode()).append(ID_DELIMETER).append(kindForId).toString();
        
//        ResultStatus.getInstance(id);
        
        
        ResultsNew newRes = (ResultsKind.RADIOLOGY.equals(kind)) ?
                ResultsNewRadiology.getInstance(id) 
                : ResultsNewLab.getInstance(id);
        newRes.setAge(age);
        newRes.setCriticalAbnormal(criticalAbnormal); 
        newRes.setFmpSsn(fmpSsn);
        newRes.setGender(gender);
        newRes.setOrderComments(orderComments);
        newRes.setPatientName(patientName); 
        newRes.setPriority(priority);
//        newRes.setResultStatus(resultStatus);
        newRes.setTestDate(testDate);//"05 Oct 2008");
        newRes.setTestName(testName);
        return newRes;
    }
    
    /**
     * unpack the order comments for the radiology
     * @param reportText the text which we must parse to find the 
     * order comments
     * @return a string for the order comments or null
     */
    private static String radOrderComments(final String reportText) {
        if (StringUtil.isEmpty(reportText)) {
            return reportText;
        }
        if (-1 != reportText.indexOf("Order Comment")) {
            final StringBuilder buff = new StringBuilder();
            final StringTokenizer tok = new StringTokenizer(
                    reportText.substring(
                            reportText.indexOf("Order Comment")));
            while(tok.hasMoreElements()) {
                final String curToken = tok.nextToken();
                if (".".equals(curToken) || ":".equals(curToken)) {
                    break;
                }
                if (0 < buff.length()) {
                    buff.append(" ");
                }
                buff.append(curToken);
            }
            return buff.toString();
        }
        return null;
    }

    /**
     * drop any data after a comma if there is one
     * @param result the source targe to trim if there is a comment
     * @return the trimmed result
     */
    private static String radResult(final String result){
        if (null == result) {
            return result;
        }
        return (-1 != result.indexOf(',')) ?
            result.substring(0, result.indexOf(',')): result;
    }

    /**
     * find a lab from the set returned for the patient, and if there is a match
     * build a results object for output
     * @param testId 
     * @param unitNbr
     * @param testDateTime
     * @param testNameHash
     * @return the result
     */
    private static ResultsNew resultLab(final String testId, final String unitNbr,
            final String testDateTime, final int testNameHash) {
        final List<Lab> labs = ServPaws.labs(unitNbr);
        for (final Lab lab: labs) {
            if (testDateTime.equals(String.valueOf(
                    lab.getCollectionDate().getTime().getTime())) 
                    && ( testNameHash == lab.getReport().getRepresentation().hashCode())) {
                return fromLab(ServPaws.patient(unitNbr), lab);
            } 
        }
        throw new IllegalStateException("cannot determine lab::" + testId);
    } 
    
    /**
     * build the result for a radiology
     * @param testId
     * @param unitNbr
     * @param testDateGetTime
     * @param testNameHash
     * @return
     */
    private static ResultsNew resultRad(final String testId, final String unitNbr,
            final String testDateGetTime, final int testNameHash) {
        final List<RadiologyResult> rads = ServPaws.rads(unitNbr);
        for (final RadiologyResult rad: rads) {
            if ( (testDateGetTime.equals(
                    String.valueOf(rad.getDateEvent().getTime().getTime()))) 
                    && (testNameHash == 
                        rad.getProcedure().getRepresentation().hashCode())
            ) {
                return fromRad(ServPaws.patient(unitNbr), rad);
            } 
        }
        throw new IllegalStateException("cannot determine rad::" + testId);
    }

    /**
     * for the given patient, get their labs and radiologies
     * @param pat
     * @return
     */
    private static List<ResultsNew> resultsForPatient(final Patient pat) {
        final List<ResultsNew> res = new ArrayList<ResultsNew>();
        res.addAll(hasUnbrLab(pat));
        res.addAll(hasUnbrRadiology(pat));
        return res;
    } 
    
    /**
     * unpack the result items array items and get the name and value (representation)
     * and just ploop it into a map
     * @param resItems the result items as unpacked from the result from paws
     * @return a map of test result item name-value pairs
     */
    private static Map<String, String> unpackResultItems(
            final ResultItem[] resItems) {
        final Map<String, String> labRows = new HashMap<String, String>();
        for (int i = 0; null != resItems && i <  resItems.length; i++) {
            labRows.put(resItems[i].getName()
                    , resItems[i].getValue().getRepresentation());
        }
        return labRows;
    }
    
    /**
     * do the work of updating a result to the new state
     * @param testId
     * @param state
     * @return the result status of the test
     */
    private static ResultStatus updateStatus(
            final String testId, final ResultStatusStates state) {
        // is this a valid id?
        final ResultsNew res = ServResults.getResult(testId);
        if (null == res) {
            return null;
        }
        final ResultStatus stat = res.getStatusObj();
        stat.setState(state);
        Hib.template().merge(stat);
        return stat;
    }
    
    
    
    
}
