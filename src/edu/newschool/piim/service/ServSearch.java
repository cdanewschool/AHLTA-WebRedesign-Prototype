package edu.newschool.piim.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.tatrc.paws.allergies.Allergy;
import org.tatrc.paws.documents.Content;
import org.tatrc.paws.documents.Document;
import org.tatrc.paws.encounter.Encounter;
import org.tatrc.paws.history.Problem;
import org.tatrc.paws.labs.Lab;
import org.tatrc.paws.medications.Drug;
import org.tatrc.paws.medications.Medication;
import org.tatrc.paws.patient.Address;
import org.tatrc.paws.patient.ConceptValue;
import org.tatrc.paws.patient.DirectCare;
import org.tatrc.paws.patient.GenericData;
import org.tatrc.paws.patient.Patient;
import org.tatrc.paws.patient.Telecom;
import org.tatrc.paws.radiology.RadiologyResult;

import edu.newschool.piim.model.search.SearchPatient;
import edu.newschool.piim.model.search.SearchPatientDetailed;
import edu.newschool.piim.util.StringUtil;


/**
 * encapsulate the functionality requered for the search module and reused in 
 * the search popup
 * 
 * @author gregm
 *
 */
public final class ServSearch {
    
    
    
    /* ALEXANDER, VIOLET ALEXANDER, EDWARD, ALEXANDER, MARIE, ALEXANDER, EVELYN, ALEXANDER, SAMANTHA, BERG, OLAF, BERG, LEE, CHANG, JON, CHANG, MAMDOUH, CHANG, INDIRA, CHANG, ESTER, CLOUD, HEATHER, CLOUD, ROSE, CLOUD, LANCE, CLOUD, APRIL, CRUZ, SUSAN, FLANAGAN, PAULA, JACKSON, JOSEPH, JACKSON, BILL, JACKSON, JENNIFER, JACKSON, SONYA, JACKSON, MARK,JACKSON, SUSAN,JACKSON, TIMOTHY,JACKSON, RONALD,JACKSON, MELISSA,JACKSON, JORDAN,MARCOS, RAMONA,MARCOS, FREDERICK,RICE, KENNETH,SMITH, DALE,SMITH, JOSHUA,SMITH, KAREN,SMITH, CHRIS,SMITH, JILL,SMITH, SARAH,SMITH, FRED,;STERN, DANIEL;,SUAREZ, EDUARDO;,SUAREZ, BONITA;SUAREZ, MIGUEL;SUAREZ, MARIA;,SUAREZ, JOSE;SUGARMAN, REGINOLD;WILLIAMS, CLAYTON;,WILLIAMS, BERNICE;WUNDERLICH, ANNA;,WUNDERLICH, GERTHA;WUNDERLICH, HERMAN;WUNDERLICH, KLAUS;,WUNDERLICH, WILMA      */
    
    /**
     * public interface to get a detaild list of search results
     */
    public static List<SearchPatientDetailed> detailed() {
        return details(ServPaws.patientsAll()); 
    }
    
    /**
     * public interface to retieve all the patients
     */
    public static List<SearchPatient> patientsAll() { 
        return searchPatients(ServPaws.patientsAll());
    }
    
    /**
     * main public interface to the search engine tied to the find button
     * @param lastname
     * @param firstname
     * @param dob
     * @param uic
     * @param ssn
     * @param fmp
     * @param sponsorSsn
     * @param sex
     * @return
     */
    public static List<SearchPatient> searchFind(final String lastname
            , final String firstname, final String dob, final String uic, final String ssn
            , final String fmp, final String sponsorSsn, final String sex) {
        if ( StringUtil.isEmpty(lastname) && StringUtil.isEmpty(ssn) 
                && StringUtil.isEmpty(sponsorSsn) ) {
            throw new IllegalArgumentException("You must fill out one of "
                    + "Last Name, SSN, Sponsor SSN, or Quick Search to do a "
                    + "search");
        }
        return searchPatients(
                ServPaws.patients(lastname, firstname, dob, uic, ssn, fmp
                        , sponsorSsn, sex));
    }

    /**
     * unpack the address array
     * @param addrs
     * @return
     */
    private static String address(final Address[] addrs) {
        for (int i = 0; i < addrs.length; i++) {
            if (null != addrs[i].getAddress()) {
                return addrs[i].getAddress();
            }
        }
        return null;
    }

    private static String age(final Calendar dateOfBirth) {
        return String.valueOf(Calendar.getInstance().get((Calendar.YEAR)) 
                - dateOfBirth.get(Calendar.YEAR))+ " years";
    }
    

    /**
     * extract the representation
     * @param buff
     * @param conceptVal
     */
    private static void conceptValName(final StringBuilder buff,
            final org.tatrc.paws.allergies.ConceptValue conceptVal) {
        if ( null != conceptVal) {
            final String repr = shortName(conceptVal.getRepresentation());
            if (! StringUtil.isEmpty(repr)){
                if (0 < buff.length()) {
                    buff.append(", ");
                }
                buff.append(repr);
            }
        }
    }

    /**
     * simple assingments to build the search patient detail
     * @param activeDualStatus
     * @param age
     * @param allergies
     * @param bmistEnc
     * @param classification
     * @param clinicalNotes
     * @param consults
     * @param diabetesCpg
     * @param gender
     * @param id
     * @param labs
     * @param medicareElig
     * @param meds
     * @param patientName
     * @param prePosApptsClinic
     * @param prePosTelcons
     * @param previousEnc
     * @param problems
     * @param rads
     * @param rankSvc
     * @param specialWorkStat
     * @param srtsii
     * @param ssn
     * @param theaterEnc
     * @return
     */
    private static SearchPatientDetailed detailed(
            final String activeDualStatus, final String age
            , final String allergies, final String bmistEnc
            , final String classification, final String clinicalNotes
            , final String consults, final String diabetesCpg
            , final String gender, final String id, String labs
            , final String medicareElig, final String meds
            , final String patientName, final String prePosApptsClinic
            , final String prePosTelcons, final String previousEnc
            , final String problems, final String rads, String rankSvc
            , final String specialWorkStat, final String srtsii, final String ssn
            , final String theaterEnc){
        final SearchPatientDetailed pat = new SearchPatientDetailed();
        pat.setPatientName(patientName);
        pat.setSsn(ssn);
        pat.setRankSvc(rankSvc);
        pat.setAge(age);
        pat.setActiveDualStatus(activeDualStatus);
        pat.setAllergies(allergies);
        pat.setBmistEnc(bmistEnc);
        
        pat.setClassification(classification);
        pat.setClinicalNotes(clinicalNotes);
        pat.setConsults(consults);
        pat.setDiabetesCpg(diabetesCpg);
        pat.setGender(gender);
        pat.setId(id);
        pat.setLabs(labs);
        pat.setMedicareElig(medicareElig);
        pat.setMeds(meds);
        pat.setPrePosApptsClinic(prePosApptsClinic);
        pat.setPrePosTelcons(prePosTelcons);
        pat.setPreviousEnc(previousEnc);
        pat.setProblems(problems);
        pat.setRads(rads);
        pat.setSpecialWorkStat(specialWorkStat);
        pat.setSrtsii(srtsii);
        pat.setTheaterEnc(theaterEnc);
        return pat;

    }

    /**
     * for all the patients build the result objects
     * @param patients
     * @return
     */
    private static List<SearchPatientDetailed> details(final List<Patient> patients){
        final List<SearchPatientDetailed> details = new ArrayList<SearchPatientDetailed>();
        if (null != patients) {
            for (final Patient patient: patients) {
                details.add(
                        detailed("activeDualStatus"
                                , age(patient.getDateOfBirth())
                                , getAllergies(patient.getUnitNumber())
                                , "bmistEnc"
                                , "classification"
                                , getClinicalNotes(patient.getUnitNumber())
                                , "consults", "diabetesCpg"
                                , patient.getGender()
                                , patient.getUnitNumber()
                                , getLabs3(patient.getUnitNumber())
                                , patient.getMedicare()
                                , getMeds(patient.getUnitNumber())
                                , patientName(patient)
                                , "prePosApptsClinic"
                                , "prePosTelcons"
                                , getPreviousEncounter(patient.getUnitNumber())
                                , probs(patient.getUnitNumber())
                                , getRads(patient.getUnitNumber())
                                , patient.getRank().getRepresentation()
                                , "specialWorkStat"
                                , "srtsii"
                                , patient.getSSN()
                                , "theaterEnc"));
            }
        }
        return details;
    }

    /**
     * query the paws allergy service
     * @param id
     * @return
     */
    private static String getAllergies(final String id) {
        final StringBuilder allerg = new StringBuilder();
        final List<Allergy> allergies = ServPaws.allergies(id);
        for (final Allergy allergy: allergies) {
            conceptValName(allerg, allergy.getAllergen());
        }
        return allerg.toString();
    }

    /**
     * query the paws clinincal notes service
     * @param id
     * @return
     */
    private static String getClinicalNotes(final String id) {
        final StringBuilder buf = new StringBuilder();
        final List<Document> clinicalNotes = ServPaws.clinicalNotes(id);
        for (final Document doc: clinicalNotes) {
            final Content[] contents = doc.getContents();
            if (null != contents && 0 < contents.length) {
                if (0 < buf.length()) {
                    buf.append(", ");
                }
                buf.append(contents[0].getDocumentText());
            }
        }
        return buf.toString();
    }
    
    /**
     * get the 3 most recent labs from paws
     * @param id
     * @return
     */
    private static String getLabs3(final String id) {
        final StringBuilder res = new StringBuilder();
        final List<Lab> labs3 = ServPaws.labs3(id);
        for (final Lab lab : labs3) {
            unpackDetailsReport(res, lab.getReport());
        }
        return res.toString();
    }
    
    /**
     * query the paws medications service
     * @param id
     * @return
     */
    private static String getMeds(final String id) {
        final StringBuilder meddies = new StringBuilder();
        final List<Medication> meds = ServPaws.meds(id);
        for (final Medication med: meds) {
            final Drug[] drugs = med.getDrugs();
            for (int i = 0; null != drugs && i < drugs.length; i++) {
                unpackDetailsMeds(meddies, drugs[i].getDescription());
            }
            
        }
        return meddies.toString();
    }

    /**
     * query the paws previous encounter service
     * @param id
     * @return
     */
    private static String getPreviousEncounter(final String id) {
        final StringBuilder buf = new StringBuilder();
        final List<Encounter> encounters = ServPaws.encounters(id);
        final int end = (3 > encounters.size())? encounters.size(): 3;
        final List<Encounter> subList = encounters.subList(0, end);
        for (final Encounter enc: subList) {
            if (0 < buf.length()) {
                buf.append(", ");
            }
            buf.append(enc.getPrimaryDx());
        }
        return buf.toString();
    }
    
    /**
     * query the radiology service
     * @param id
     * @return
     */
    private static String getRads(final String id) {
        final StringBuilder res = new StringBuilder();
        final List<RadiologyResult> rads = ServPaws.rads(id);
        for (final RadiologyResult rad : rads) {
            unpackDetailRads(res, rad.getProcedure());
        }
        return res.toString();
    }

    /**
     * get the home phone
     * @param telecoms
     * @return
     */
    private static String homePhone(final Telecom[] telecoms) {
        return unpackTelcom("Home Phone", telecoms);
    }
    
    /**
     * construct the patient name from the first name and the last name
     * @param patient
     * @return
     */
    private static String patientName(final Patient patient) {
        return patient.getName().getLastName() + ", " 
        + patient.getName().getFirstName() 
        + ((StringUtil.isEmpty(patient.getName().getMiddleName()))
                ? ""
                : " " + patient.getName().getMiddleName().substring(0, 1));
    }
    
    /**
     * query the health history service and construnc the problems
     * @param id
     * @return
     */
    private static String probs(final String id) {
        final StringBuilder probs = new StringBuilder();
        for (final Problem prob: ServPaws.historyProblems(id)) {
            unpackProbs(probs, prob.getDescription());
        }
        return probs.toString();
    }

    /**
     * construct the search patient object for the jsp from the
     * passed in primatives
     * @param address
     * @param dob
     * @param fmp
     * @param gender
     * @param homePhone
     * @param id
     * @param patientName
     * @param ssn
     * @param workPhone
     * @param sponsorSSN
     * @return
     */
    private static SearchPatient searchPatient(
            final String address, final Date dob, final String fmp,
            final String gender, final String homePhone, final String id,
            final String patientName, final String ssn,
            final String workPhone, String sponsorSSN
    ) {
        final SearchPatient pat = new SearchPatient();
        pat.setAddress(address);
        pat.setDob(dob);
        pat.setFmpSponsorSsn(
                (StringUtil.isEmpty(sponsorSSN))
                ? fmp: fmp + " / " + sponsorSSN);
        pat.setGender(gender);
        if (! StringUtil.isEmpty(homePhone)) {
            pat.setHomePhone(homePhone.replaceAll(" ", "&#160;"));
        }
        pat.setId(id);
        pat.setPatientName(patientName);
        pat.setSsn(ssn);
        if (! StringUtil.isEmpty(workPhone)){
            pat.setWorkPhone(workPhone.replaceAll(" ", "&#160;"));
        }
        return pat;

    }

    
    /**
     * iterate of the list of patients returned by the paws service and build
     * a list of objcts for display
     * @param patients
     * @return
     */
    private static List<SearchPatient> searchPatients(
            final List<Patient> patients) {
        final List<SearchPatient> searchPatients = 
            new ArrayList<SearchPatient>();
        if (null != patients) {
            for (final Patient patient : patients) {
                searchPatients.add(unpack(patient));
            }
        }
        return searchPatients;
    }

    
    /**
     * extract the name dropping anything in parenthesis if such exists
     * @param name
     * @return
     */
    private static String shortName(final String name) {
        if (null == name) {
            return null;
        }
        return (-1 == name.indexOf('(')) ? 
                name : name.substring(0, name.indexOf('(')) ;
    }

    /**
     * examine the retuend patient object and construcnt the display object
     * @param patient
     * @return
     */
    private static SearchPatient unpack(final Patient patient) {
        String bracPharmacyEligibilty = patient.getBRACPharmacyEligibilty();
        String branch = patient.getBranch();
        String careAuthorizationPhone = patient.getCareAuthorizationPhone();
        String deersId = patient.getDeersId();
        DirectCare directCare = patient.getDirectCare();
        GenericData[] genericDatas = patient.getGenericDatas();
        String maritalStatus = patient.getMaritalStatus();
        String medicare = patient.getMedicare();
        String paygrade = patient.getPaygrade();
        String pcmLocation = patient.getPCMLocation();
        String race = patient.getRace();
        ConceptValue rank = patient.getRank();
        String religion = patient.getReligion();
        String sponsorSSN = patient.getSponsorSSN();
        String sponsorStatus = patient.getSponsorStatus();
        String triCareStatus = patient.getTriCareStatus();
        return searchPatient(address(patient.getAddresses()), patient.getDateOfBirth().getTime(), patient.getFMP()
                , patient.getGender(), homePhone(patient.getTelecoms()), patient.getUnitNumber()
                , patient.getName().getLastName() + ", " + patient.getName().getFirstName()
                , patient.getSSN(), workPhone(patient.getTelecoms()), sponsorSSN);
    }

    /**
     * unpack the radiology object returned by paws and build a single string representation
     * 
     */
    private static void unpackDetailRads(final StringBuilder res,
            final org.tatrc.paws.radiology.ConceptValue procedure) {
        final String repr = shortName(procedure.getRepresentation());
        if (! StringUtil.isEmpty(repr)){
            if (0 < res.length()) {
                res.append(", ");
            }
            res.append(repr);
        }
    }

    /** 
     * traverse the meds returned by paws and build a string for display
     */
    private static void unpackDetailsMeds(final StringBuilder meddies,
            final org.tatrc.paws.medications.ConceptValue desc) {
        if (null != desc) {
            final String medName = shortName(desc.getRepresentation());
            if (null != medName) {
                if (0 < meddies.length()) {
                    meddies.append(", ");
                }
                meddies.append(medName);
            }
        }
    }

    /**
     * unpack the labs returned by paws and build a string representation
     * @param res
     * @param report
     */
    private static void unpackDetailsReport(final StringBuilder res,
            final org.tatrc.paws.labs.ConceptValue report) {
        if (null != report) {
            final String repr = shortName(report.getRepresentation());
            if (! StringUtil.isEmpty(repr)){
                if (0 < res.length()) {
                    res.append(", ");
                }
                res.append(repr);
            }
        }
    }

    /**
     *unpack the health history and build a string for display 
     * @param probs
     * @param description
     */
    private static void unpackProbs(final StringBuilder probs,
            final org.tatrc.paws.history.ConceptValue description) {
        if (null != description) {
            final String thisProb = description.getRepresentation();
            if (! StringUtil.isEmpty(thisProb)) { 
                if (0 < probs.length()) {
                    probs.append(", ");
                }
                probs.append(thisProb);
            }
        }
    }
    
    
    /**
     * traverse the telecoms and if we find one that we are looking for 
     * return its textual representation
     * @param representation
     * @param telecoms
     * @return
     */
    private static String unpackTelcom(
            final String representation, final Telecom[] telecoms) {
        for (int i = 0; i < telecoms.length; i++) {
            if(representation.equalsIgnoreCase(
                    telecoms[i].getTelecomType().getRepresentation())) {
                return telecoms[i].getValue();
            }
        }
        return null;
    }
    
    
    /**
     * unpack the work phone
     * 
     * @param telecoms
     * @return
     */
    private static String workPhone(final Telecom[] telecoms) {
        return unpackTelcom("Work Phone", telecoms);
    }
    
    
        
    
    
}
