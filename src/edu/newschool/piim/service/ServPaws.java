package edu.newschool.piim.service;

import java.rmi.RemoteException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import javax.xml.rpc.ServiceException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.tatrc.paws.allergies.Allergy;
import org.tatrc.paws.documents.Document;
import org.tatrc.paws.encounter.Encounter;
import org.tatrc.paws.facility.ConceptValue;
import org.tatrc.paws.history.Problem;
import org.tatrc.paws.labs.Lab;
import org.tatrc.paws.medications.Medication;
import org.tatrc.paws.patient.Patient;
import org.tatrc.paws.provider.Name;
import org.tatrc.paws.provider.Provider;
import org.tatrc.paws.radiology.RadiologyResult;

import edu.newschool.piim.model.facility.ClinicConsVal;
import edu.newschool.piim.model.facility.Clinician;
import edu.newschool.piim.model.facility.Facility;

/**
 * Service for accessing PAWS data 
 * 
 * @author gregm
 */
public class ServPaws {

    /*  retain for reference *******************
ALEXANDER|VIOLET|99990069
ALEXANDER|EDWARD|99990075
ALEXANDER|MARIE|99990076
ALEXANDER|EVELYN|99990085
ALEXANDER|SAMANTHA|99990088
BERG|OLAF|99990066
BERG|LEE|99990087
CHANG|JON|99990068
CHANG|MAMDOUH|99990081
CHANG|INDIRA|99990082
CHANG|ESTER|99990084
CLOUD|HEATHER|99990072
CLOUD|ROSE|99990077
CLOUD|LANCE|99990078
CLOUD|APRIL|99990083
CRUZ|SUSAN|99990100
FLANAGAN|PAULA|99990102
JACKSON|JOSEPH|99990200
JACKSON|BILL|99990202
JACKSON|JENNIFER|99990207
JACKSON|SONYA|99990201
JACKSON|MARK|99990203
JACKSON|SUSAN|99990204
JACKSON|TIMOTHY|99990205
JACKSON|RONALD|99990206
JACKSON|MELISSA|99990208
JACKSON|JORDAN|99990209
MARCOS|RAMONA|99990067
MARCOS|FREDERICK|99990090
RICE|KENNETH|99990217
SMITH|DALE|99990210
SMITH|JOSHUA|99990214
SMITH|KAREN|99990211
SMITH|CHRIS|99990212
SMITH|JILL|99990213
SMITH|SARAH|99990215
SMITH|FRED|99990216
STERN|DANIEL|99990101
SUAREZ|EDUARDO|99990070
SUAREZ|BONITA|99990071
SUAREZ|MIGUEL|99990079
SUAREZ|MARIA|99990080
SUAREZ|JOSE|99990089
SUGARMAN|REGINOLD|99990063
WILLIAMS|CLAYTON|99990064
WILLIAMS|BERNICE|99990065
WUNDERLICH|ANNA|99990061
WUNDERLICH|GERTHA|99990062
WUNDERLICH|HERMAN|99990073
WUNDERLICH|KLAUS|99990074
WUNDERLICH|WILMA|99990086
     */
    
    /**
     * member variable for access to the application log
     */
    private static final Log LOG = LogFactory.getLog(ServPaws.class);
    
    /**
     * a list of the patients last names used for all patients interface
     * since paws does not provide us with one
     */
    private static final String[] TEST_PATEINTS_NAMES = {
        "ALEXANDER", "BERG", "CHANG", "CLOUD", "CRUZ", "FLANAGAN", "JACKSON", 
        "MARCOS", "RICE", "SMITH", "STERN", "SUAREZ", "SUGARMAN", "WILLIAMS", 
        "WUNDERLICH" };

    /**
     * public interface for accessing the the allergies 
     * for the unitnumber ie patient
     * @param unitNumber the patient id
     * @return a list of alergies for the patient id
     */
    public static List<Allergy> allergies(final String unitNumber) {
        LOG.info("begin search of PAWS AllergiesService::unitNumber=" + unitNumber);
        try {
            final List<Allergy> doAllergies = Pawser.doAllergies(unitNumber);
            LOG.info("end search of PAWS AllergiesService returned rows:" + doAllergies.size());
            return doAllergies;
        } catch (final ServiceException e) {
            LOG.error("Service Exception::" + e.getMessage());
            throw new IllegalStateException(e);
        } catch (final RemoteException e) {
            return allergies2ndTry(unitNumber);
        }
    }

    
    /**
     * build a clinic for the given ncid.  paws does not offer
     * a clinic by id function, so if all we have is the 
     * clinics ncid then we are sool and kind of illegal anyway
     * that is why the clinic is alway Test Clinic, a visual 
     * indication that the actual name is dropping out
     * @param clinicNcid
     * @return the clinic
     */
    public static ClinicConsVal clinic(final String clinicNcid) {
        final ClinicConsVal myClinic = new ClinicConsVal();
        myClinic.setContext(null);
        myClinic.setName("Test Clinic");
        myClinic.setNcid(clinicNcid);
        return myClinic;
    }
    
    /**
     * public interface for accessing the clinical notes  
     * for the unitnumber ie patient
     * 
     * @param unitNumber the id of the patient
     * @return a list of the clinical notes for the patient
     */
    public static List<Document> clinicalNotes(final String unitNumber) {
        LOG.info("begin search of PAWS DocumentService::unitNumber="+ unitNumber);
        try {
            final List<Document> doClinicalNotes = Pawser.doClinicalNotes(unitNumber);
            LOG.info("end search of PAWS DocumentService rows:"+ doClinicalNotes.size() );
            return doClinicalNotes;
        } catch (final ServiceException e) {
            LOG.error("Service Exception::" + e.getMessage());
            throw new IllegalStateException(e);
        } catch (final RemoteException e) {
            return clinical2ndTry(unitNumber);
        }
    } 

    /**
     * get the providers for the last name stem and build a list of clinicians
     * @param p_lastnameStem
     * @param p_clinicName
     * @return a list of clinicians
     */
    public static List<Clinician> clinicians(final String p_lastnameStem
            , final String p_clinicName) {
        try {
            final List<Clinician> res = new ArrayList<Clinician>();
            for (final Provider provider 
                    : Pawser.doProviderByName(p_lastnameStem)) {
                res.add(buildClinician(p_clinicName, provider));
            }
            return res;
        } catch (final RemoteException e) {
            LOG.error("Service Exception::" + e.getMessage());
            throw new IllegalStateException(e);
        } catch (final ServiceException e) {
            LOG.error("Remote Exception::" + e.getMessage());
            throw new IllegalStateException(e);
        }
    }

    /**
     * public interface to get a list of clinics from the given facility
     * ncid.  for display purposes, we often put our clinic first on the
     * list of clinics for our facility.  to do this provide a preferred 
     * clinic.  if the clinic is on the list of facilities clinic it 
     * will be at the top
     * @param p_facilityNcid
     * @param p_prefClinic
     * @return a list of clinics for this faciltiy sorted by name with
     * any preferred clinic at the top
     */
    public static List<ClinicConsVal> clinics(final String p_facilityNcid
            , final ClinicConsVal p_prefClinic) {
        try {
            final List<ClinicConsVal> res = new ArrayList<ClinicConsVal>();
            for (ConceptValue paws: Pawser.doClinics(p_facilityNcid)) {
                res.add(buildClinic(paws));
            }
            Collections.sort(res, new Comparator<ClinicConsVal>(){
                public int compare(
                        final ClinicConsVal fir, final ClinicConsVal sec) {
                    if (null == p_prefClinic) {
                        return fir.getName().compareTo(sec.getName());
                    } else {
                        if (fir.getNcid().equalsIgnoreCase(
                                p_prefClinic.getNcid())) {
                            return -1;
                        } else if (sec.getNcid().equalsIgnoreCase(
                                p_prefClinic.getNcid())) {
                            return 1;
                        } else {
                            return fir.getName().compareTo(sec.getName());
                        }
                    }
                }
            });
            return res;
        } catch (final RemoteException e) {
            LOG.error("Service Exception::" + e.getMessage());
            throw new IllegalStateException(e);
        } catch (final ServiceException e) {
            LOG.error("Remote Exception::" + e.getMessage());
            throw new IllegalStateException(e);
        }
    } 
    
    /**
     * public interface for accessing the encounter headers  
     * for the unitnumber ie patient
     * 
     * @param unitNbr the id of the patient
     * @return a list of the encounter headers for the patient
     */
    public static List<Encounter> encounterHeaders(final String unitNbr) {
        LOG.info("begin search of PAWS EncounterServiceHeaders::unitNumber=" + unitNbr);
        try {
            final List<Encounter> doEncountHdrs = Pawser.doEncountHdrs(unitNbr);
            LOG.info("end search of PAWS EncounterServiceHeaders rows:" + doEncountHdrs.size());
            return doEncountHdrs;
        } catch (final ServiceException e) {
            LOG.error("Service Exception::" + e.getMessage());
            throw new IllegalStateException(e);
        } catch (final RemoteException e) {
            return encount2ndTry(unitNbr);
        }
    }

    /**
     * public interface for accessing the encounters 
     * for the unitnumber ie patient
     * 
     * @param unitNbr the id for the patient
     * @return a list of the encounters for a patient
     */
    public static List<Encounter> encounters(final String unitNbr) {
        LOG.info("begin search of PAWS EncounterService::unitNumber=" + unitNbr);
        try {
            return doEncounters(unitNbr);
        } catch (final ServiceException e) {
            LOG.error("Service Exception::" + e.getMessage());
            throw new IllegalStateException(e);
        } catch (RemoteException e) {
            LOG.error("Service Exception::" + e.getMessage());
            throw new IllegalStateException(e);
        }
    }
    
    /**
     * gets all the facilities as a list.  provide a prefered clinic if you 
     * want it first on the returned list
     * @param p_prefFacility
     * @return list of facilities with qny preferred facility at the top
     */
    public static List<Facility> facilities(final Facility p_prefFacility) {
        try {
            final List<Facility> res = new ArrayList<Facility>();
            for (final org.tatrc.paws.facility.ConceptValue fromPaws: Pawser.doFacilities()) {
                res.add(buildFacility(fromPaws));
            }
            Collections.sort(res, new Comparator<Facility>() {
                public int compare(final Facility fir, final  Facility sec) {
                    if (fir.getNcid().equalsIgnoreCase(
                            p_prefFacility.getNcid())) {
                        return -1;
                    } else if (sec.getNcid().equalsIgnoreCase(
                            p_prefFacility.getNcid())) {
                        return 1;
                    } else {
                        return fir.getName().compareTo(sec.getName());
                    }
                } });
            return res;
        } catch (final RemoteException e) {
            LOG.error("Service Exception::" + e.getMessage());
            throw new IllegalStateException(e);
        } catch (final ServiceException e) {
            LOG.error("Remote Exception::" + e.getMessage());
            throw new IllegalStateException(e);
        }
    
            
    }

    /**
     * public interface for accessing the history problems 
     * for the unitnumber ie patient
     * 
     * @param unitNumber the id of a patient
     * @return a list of the problems history for a patient
     */
    public static List<Problem> historyProblems(final String unitNumber) {
        LOG.info("begin search of PAWS HistoryService fetchProblems::unitNumber="+ unitNumber);
        try {
            final List<Problem> doHistProbs = Pawser.doHistProbs(unitNumber);
            LOG.info("end search of PAWS HistoryService fetchProblems rows:"+ doHistProbs.size() );
            return doHistProbs;
        } catch (final ServiceException e) {
            LOG.error("Service Exception::" + e.getMessage());
            throw new IllegalStateException(e);
        } catch (final RemoteException e) {
            return histProbs2ndTry(unitNumber);
        }
    }

    /**
     * public interface for accessing the labs 
     * for the unitnumber ie patient
     * 
     * @param unitNumber the patient id
     * @return a list of the labs for a patient
     */
    public static List<Lab> labs(final String unitNumber) {
        return labs(unitNumber, 0);
    }

    /**
     * public interface for accessing the last 3 labs 
     * for the unitnumber ie patient
     * 
     * @param unitNumber the patient id
     * @return a list of the last 3 labs for a patient
     */
    public static List<Lab> labs3(final String unitNumber) {
        return labs(unitNumber, 3);
    }

    /**
     * get a clinician for the provided provider ncid
     * @param p_providerNcid
     * @return the clinician for the ncid
     */
    public static Clinician lookupProvider(final String p_providerNcid) {
        try {
            final List<Provider> prov = 
                Pawser.doProviderByNcid(p_providerNcid);
            final Clinician clinician = new Clinician();
            final Name name = prov.get(0).getName();
            clinician.setFirstName(name.getFirstName());
            clinician.setLastName(name.getLastName());
            clinician.setFullName(name.getFullName());
            clinician.setNcid(prov.get(0).getNCID());
            return clinician;
        } catch (final RemoteException e) {
            LOG.error("Service Exception::" + e.getMessage());
            throw new IllegalStateException(e);
        } catch (final ServiceException e) {
            LOG.error("Remote Exception::" + e.getMessage());
            throw new IllegalStateException(e);
        }
    }
    
    /**
     * public interface for accessing the meds 
     * for the unitnumber ie patient
     * 
     * @param unitNumber the patient id
     * @return a list of the meds for a patient
     */
    public static List<Medication> meds(final String unitNumber) {
        LOG.info("begin search of PAWS MedicationsService "
                + "fetchDispensedMeds::unitNumber=" + unitNumber);
        try {
            final List<Medication> doMeds = Pawser.doMeds(unitNumber);
            LOG.info("end search of PAWS MedicationsService "
                    + "fetchDispensedMeds rows:" + doMeds.size());
            return doMeds;
        } catch (final ServiceException e) {
            LOG.error("Service Exception::" + e.getMessage());
            throw new IllegalStateException(e);
        } catch (final RemoteException e) {
            return meds2ndTry(unitNumber);
        }
    }

    /**
     * public interface for accessing the patient record 
     * for the unitnumber ie patient
     * 
     * @param unitNumber the patient id
     * @return a patient object
     */
    public static Patient patient(final String unitNumber) {
        LOG.info("begin search of PAWS PatientService::unitNumber=" 
                + unitNumber);
        try {
            final Patient pat = Pawser.doPatient(unitNumber);
            LOG.info("end search of PAWS PatientService isNull?:" 
                    + (null == pat));
            return pat;
        } catch (final ServiceException e) {
            LOG.error("Service Exception::" + e.getMessage());
            throw new IllegalStateException(e);
        } catch (final RemoteException e) {
            return patients2ndTry(unitNumber);
        }
    }

    /**
     * public interface for accessing a list of patients all of whom share 
     * the parameter search keys 
     * 
     * @param lastname
     * @param firstname
     * @param dob
     * @param uic
     * @param ssn
     * @param fmp
     * @param sponsorssn
     * @param sex
     * @return a list of patients
     */
    public static List<Patient> patients(final String lastname
            , final String firstname, final String dob, final String uic
            , final String ssn, final String fmp, final String sponsorssn
            , final String sex) {
        LOG.info("begin search of PAWS PatientService:: params:: lastname="
                 + lastname + ",firstname=" + firstname + ",dob=" + dob
                 + ",uic=" + uic + ",ssn=" + ssn + ",fmp=" + fmp
                 + ",sponsorssn=" + sponsorssn + ",sex=" + sex);
        try {
            final List<Patient> doPatients = Pawser.doPatients(lastname
                    , firstname, dob, uic, ssn, fmp, sponsorssn, sex);
            LOG.info("end search of PAWS PatientService rows:" 
                    + doPatients.size());
            return doPatients;
        } catch (final ServiceException e) {
            LOG.error("Service Exception::" + e.getMessage());
            throw new IllegalStateException(e);
        } catch (final RemoteException e) {
            return patients2ndTry(lastname, firstname, dob, uic, ssn, fmp,
                    sponsorssn, sex);
        }
    }


    /**
     * public interface for accessing all the patients ostensibly in the 
     * training database 
     * 
     * @return a list of all the known patients
     */
    public static List<Patient> patientsAll() {
        final List<Patient> res = new ArrayList<Patient>();
        for (int i = 0 ; i < TEST_PATEINTS_NAMES.length; i++) {
            res.addAll(
                    patients(TEST_PATEINTS_NAMES[i], "", "", "", "", "", "" , ""));
        }
        return res;
    }

    /**
     * public interface for accessing the radiologies of a patient 
     * 
     * @param unitNumber the patient id
     * @return a list of radiology records for a patient
     */
    public static List<RadiologyResult> rads(final String unitNumber) {
        LOG.info("begin search of PAWS RadiologyService::unitNumber=" 
                + unitNumber);
        try {
            final List<RadiologyResult> doRads = Pawser.doRads(unitNumber);
            LOG.info("end search of PAWS RadiologyService rows:" 
                    + doRads.size() );
            return doRads;
        } catch (final ServiceException e) {
            LOG.error("Service Exception::" + e.getMessage());
            throw new IllegalStateException(e);
        } catch (final RemoteException e) {
            return rads2ndTry(unitNumber);
        }
    }

    /**
     * avoids a recursive call to get the the allergies on error
     * @param unitNumber the patient id
     * @return the list of the patients allergies
     */
    private static List<Allergy> allergies2ndTry(final String unitNumber) {
        try {
            return Pawser.doAllergies(unitNumber);
        } catch (final ServiceException e2) {
            LOG.error("Service Exception - giving up ::" + e2.getMessage());
            throw new IllegalStateException(e2);
        } catch (final RemoteException e2) {
            LOG.error("Remote Exception -- giving up ::" + e2.getMessage());
            throw new IllegalStateException(e2);
        }
    }
    
    /**
     * encapsulate the instanciation of the construction of a clinic
     * @param paws
     * @return a clinc for the paws concep value
     */
    private static ClinicConsVal buildClinic(final ConceptValue paws) {
        final ClinicConsVal myClinic = new ClinicConsVal();
        myClinic.setContext(paws.getContext());
        myClinic.setName(paws.getRepresentation());
        myClinic.setNcid(paws.getNCID());
        return myClinic;
    }

    /**
     * simple encapsulation of the instanciation of the clinician bean
     * @param p_clinicName
     * @param provider
     * @return
     */
    private static Clinician buildClinician(final String p_clinicName,
            Provider provider) {
        final Clinician clinician = new Clinician();
        clinician.setClinicName(p_clinicName);
        clinician.setFirstName(provider.getName().getFirstName());
        clinician.setLastName(provider.getName().getLastName());
        clinician.setFullName(provider.getName().getFullName());
        clinician.setNcid(provider.getNCID());
        return clinician;
    }
    
    /**
     * encapsulate the instanciation of the facility
     * @param fromPaws
     * @return a facility for the given concept value
     */
    private static Facility buildFacility(
            final org.tatrc.paws.facility.ConceptValue fromPaws) {
        final Facility fac = new Facility();
        fac.setContext(fromPaws.getContext());
        fac.setName(fromPaws.getRepresentation());
        fac.setNcid(fromPaws.getNCID());
        return fac;
    }

    /**
     * avoids a recursive call to get the clinical notes on error  
     * 
     * @param unitNumber the patient id
     * @return a list of the clinical notes for the patient
     */
    private static List<Document> clinical2ndTry(final String unitNumber) {
        try {
            return Pawser.doClinicalNotes(unitNumber);
        } catch (final ServiceException e2) {
            LOG.error("Service Exception::" + e2.getMessage());
            throw new IllegalStateException(e2);
        } catch (final RemoteException e2) {
            LOG.error("Remote Exception::" + e2.getMessage());
            throw new IllegalStateException(e2);
        }
    }

    /**
     * get a list of encounters for the given paws unit number
     * @param unitNbr
     * @return
     * @throws ServiceException
     * @throws RemoteException
     */
    private static List<Encounter> doEncounters(final String unitNbr)
    throws ServiceException, RemoteException {
        final List<Encounter> res = new ArrayList<Encounter>(); 
        for (final Encounter hdr: Pawser.doEncountHdrs(unitNbr)) { 
            try {
                final List<Encounter> encntrs = 
                    Pawser.doEncounter(unitNbr, hdr.getId()
                            , hdr.getFacility().getNCID());
                if (null != encntrs) {
                    res.addAll(encntrs);
                }
            } catch (Exception e) {
                LOG.error("encounter service reports error:: " + e.getMessage());
            }
        }
        LOG.info("end search of PAWS EncounterService rows:" + res.size());
        return res;
    }
    
    /**
     * avoids a recursive call to get the encounters on error  
     * 
     * @param unitNbr
     * @return
     */
    private static List<Encounter> encount2ndTry(final String unitNbr) {
        try {
            return Pawser.doEncountHdrs(unitNbr);
        } catch (final ServiceException e2) {
            LOG.error("Service Exception::" + e2.getMessage());
            throw new IllegalStateException(e2);
        } catch (final RemoteException e2) {
            LOG.error("Remote Exception::" + e2.getMessage());
            throw new IllegalStateException(e2);
        }
    }

    /**
     * avoids a recursive call to get the history problems on error  
     * 
     * @param unitNumber
     * @return
     */
    private static List<Problem> histProbs2ndTry(final String unitNumber) {
        try {
            return Pawser.doHistProbs(unitNumber);
        } catch (final ServiceException e2) {
            LOG.error("Service Exception::" + e2.getMessage());
            throw new IllegalStateException(e2);
        } catch (final RemoteException e2) {
            LOG.error("Remote Exception::" + e2.getMessage());
            throw new IllegalStateException(e2);
        }
    }

    /**
     * public interface for accessing a given number of past labs 
     * for the unitNbr ie patient
     * 
     * @param unitNbr the patient id
     * @param nbrToGet the number of labs to get where 0 means all
     * @return a list of the labs for a patient
     */
    private static List<Lab> labs(final String unitNbr, final int nbrToGet) {
        LOG.info("begin search of PAWS LabsService " 
                + "fetchResultedLabs::unitNumber=" + unitNbr);
        try {
            final List<Lab> checkLabs = Pawser.doLabs(unitNbr, nbrToGet);
            LOG.info("end search of PAWS LabsService fetchResultedLabs rows:" 
                    + checkLabs.size());
            return checkLabs;
        } catch (final ServiceException e) {
            LOG.error("Service Exception::" + e.getMessage());
            throw new IllegalStateException(e);
        } catch (final RemoteException e) {
            return labs2ndTry(unitNbr, nbrToGet);
        }
    }

    /**
     * avoids a recursive call to get the labs on error 
     * 
     * @param unitNumber
     * @param nbrToGet
     * @return
     */
    private static List<Lab> labs2ndTry(final String unitNumber,
            final int nbrToGet) {
        try {
            // try again
            return Pawser.doLabs(unitNumber, nbrToGet);
        } catch (final ServiceException e2) {
            LOG.error("Service Exception2::" + e2.getMessage());
            throw new IllegalStateException(e2);
        } catch (final RemoteException e2) {
            LOG.error("Remote Exception -- giving up ::" + e2.getMessage());
            throw new IllegalStateException(e2);
        }
    }
    
    /**
     * avoids a recursive call to get the meds on error 
     * 
     * @param unitNumber
     * @return
     */
    private static List<Medication> meds2ndTry(final String unitNumber) {
        try {
            return Pawser.doMeds(unitNumber);
        } catch (final ServiceException e2) {
            LOG.error("Service Exception::" + e2.getMessage());
            throw new IllegalStateException(e2);
        } catch (final RemoteException e2) {
            LOG.error("Remote Exception::" + e2.getMessage());
            throw new IllegalStateException(e2);
        }
    }

    /**
     * avoids a recursive call to get the patients on error
     * 
     * @param unitNumber
     * @return
     */
    private static Patient patients2ndTry(final String unitNumber) {
        try {
            return Pawser.doPatient(unitNumber);
        } catch (final ServiceException e2) {
            LOG.error("Service Exception::" + e2.getMessage());
            throw new IllegalStateException(e2);
        } catch (final RemoteException e2) {
            LOG.error("Remote Exception::" + e2.getMessage());
            throw new IllegalStateException(e2);
        }
    }

        
    /**
     * avoids a recursive call to get the patients on error 
     * 
     * @param lastname
     * @param firstname
     * @param dob
     * @param uic
     * @param ssn
     * @param fmp
     * @param sponsorssn
     * @param sex
     * @return
     */
    private static List<Patient> patients2ndTry(final String lastname,
            final String firstname, final String dob, String uic, 
            final String ssn, final String fmp, final String sponsorssn, 
            final String sex) {
        try {
            return Pawser.doPatients(lastname, firstname, dob, uic, ssn, fmp,
                    sponsorssn, sex);
        } catch (final ServiceException e2) {
            LOG.error("Service Exception::" + e2.getMessage());
            throw new IllegalStateException(e2);
        } catch (final RemoteException e2) {
            LOG.error("Remote Exception::" + e2.getMessage());
            throw new IllegalStateException(e2);
        }
    }
    
    
    /**
     * avoids a recursive call to get the rads on error 
     * 
     * @param unitNumber
     * @return
     */
    private static List<RadiologyResult> rads2ndTry(final String unitNumber) {
        try {
            return Pawser.doRads(unitNumber);
        } catch (final ServiceException e2) {
            LOG.error("Service Exception::" + e2.getMessage());
            throw new IllegalStateException(e2);
        } catch (final RemoteException e2) {
            LOG.error("Remote Exception::" + e2.getMessage());
            throw new IllegalStateException(e2);
        }
    }
    
}
