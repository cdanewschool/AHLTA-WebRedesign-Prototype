package edu.newschool.piim.service;

import java.rmi.RemoteException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.xml.rpc.ServiceException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.tatrc.paws.allergies.AllergiesServiceLocator;
import org.tatrc.paws.allergies.Allergy;
import org.tatrc.paws.documents.Document;
import org.tatrc.paws.documents.DocumentServiceLocator;
import org.tatrc.paws.encounter.Encounter;
import org.tatrc.paws.encounter.EncounterServiceLocator;
import org.tatrc.paws.facility.ConceptValue;
import org.tatrc.paws.facility.MilitaryTreatmentFacilityServiceLocator;
import org.tatrc.paws.facility.MilitaryTreatmentFacilityServiceSoap;
import org.tatrc.paws.history.HistoryServiceLocator;
import org.tatrc.paws.history.Problem;
import org.tatrc.paws.labs.Lab;
import org.tatrc.paws.labs.LabsServiceLocator;
import org.tatrc.paws.medications.Medication;
import org.tatrc.paws.medications.MedicationsServiceLocator;
import org.tatrc.paws.patient.Patient;
import org.tatrc.paws.patient.PatientServiceLocator;
import org.tatrc.paws.provider.Provider;
import org.tatrc.paws.provider.ProviderServiceSoap;
import org.tatrc.paws.radiology.RadiologyResult;
import org.tatrc.paws.radiology.RadiologyServiceLocator;

import edu.newschool.piim.util.StringUtil;

/**
 * encapsulates the actual calls to paws, particularly the exception handling,
 * the paws endpoint configuration, and the wrapping of results into collections
 * and reporting in the log.  Pleas note that this class only provides 
 * package level access, and is primarily meant to collaborate with the ServPaws
 * who provides the public interface part.
 * 
 * @author gregm
 *
 */
public class Pawser {
    
    /**
     * member variable for the paws endpoint address.  our paws
     * interface code is generated output from the apache 
     * axis wsdl2java tool which burns in the endpoint address
     * from the wsdl.  however, we update that value (hardcoded) with 
     * the value stored here if set.  see the servlet xml for value
     */
    private static String _pawsAddr ;//= "http://70.46.221.37/DoD.TATRC.PAWS/";
    
    /**
     * application name required for paws requests
     */
    private static String application = "PiimAhltaGui";

    /**
     * member variable for access to the application log
     */
    private static final Log LOG = LogFactory.getLog(Pawser.class);
    
    /**
     * user name required for paws requests this will be replaced by the 
     * authenticated user later
     */
    private static String username = "greg";
    
    /**
     * isolates the configuration and creation of the military treatment
     * facility service 
     * 
     * @return soap interface to the service
     * @throws ServiceException
     */
    private static MilitaryTreatmentFacilityServiceSoap facilitySoaper()
            throws ServiceException {
        MilitaryTreatmentFacilityServiceLocator mtfsL = 
            new MilitaryTreatmentFacilityServiceLocator();
        if (! StringUtil.isEmpty(_pawsAddr) ) {
            mtfsL.setEndpointAddress(
                    "MilitaryTreatmentFacilityServiceSoap12"
                    , new StringBuilder().append(_pawsAddr).append(
                            "MilitaryTreatmentFacilityService.asmx")
                            .toString());
        }
        return mtfsL.getMilitaryTreatmentFacilityServiceSoap12();
    }
    
    /**
     * utility to make null strings empty strings 
     * 
     * @param targ
     * @return
     */
    private static String notNull(final String targ) {
        return (null == targ) ? "" : targ;
    }
    
    /**
     * do the work of querying the paws allergies service
     * @param unitNumber the paws search key
     * @return a list of allergies for the patient
     * @throws RemoteException
     * @throws ServiceException
     */
    static List<Allergy> doAllergies(final String unitNumber)
            throws RemoteException, ServiceException {
        final AllergiesServiceLocator locator = new AllergiesServiceLocator();
        //"http://10.0.1.6/DoD.TATRC.PAWS/AllergiesService.asmx";
        if (! StringUtil.isEmpty(_pawsAddr) ) {
            locator.setEndpointAddress("AllergiesServiceSoap12"
                    , new StringBuilder().append(_pawsAddr).append(
                            "AllergiesService.asmx")
                            .toString());
        }
        final  Allergy[] allergies = 
            locator.getAllergiesServiceSoap12().fetchAllergies(
                    application, username, unitNumber);
        if (null == allergies) {
            LOG.info("PAWS returned null allergies");
            return new ArrayList<Allergy>();
        } else {
            LOG.info("PAWS returned allergies::" + allergies.length);
            return Arrays.asList(allergies);
        }
    }

    /**
     * do the work of querying the paws clinical notes 
     * 
     * @param unitNumber the patient id
     * @return a list clinical notes documents
     * @throws RemoteException
     * @throws ServiceException
     */
    static List<Document> doClinicalNotes(final String unitNumber)
            throws RemoteException, ServiceException {
        final DocumentServiceLocator docServLoc = new DocumentServiceLocator();
//        = "http://10.0.1.6/DoD.TATRC.PAWS/DocumentService.asmx";
        if (! StringUtil.isEmpty(_pawsAddr) ) {
            docServLoc.setEndpointAddress("DocumentServiceSoap12"
                    , new StringBuilder().append(_pawsAddr).append(
                            "DocumentService.asmx").toString());
        }
        final Document[] docs = docServLoc
        .getDocumentServiceSoap12().fetchDocumentHeaders(
                application, username, unitNumber, 3);
        if (null == docs) {
            LOG.info("PAWS returned null documents");
            return new ArrayList<Document>();
        } else {
            LOG.info("PAWS returned documents::" + docs.length);
            return Arrays.asList(docs);
        }
    }

    /**
     * get a list of clinics for the give facility ncid
     * 
     * @param facilityNcid
     * @return
     * @throws RemoteException
     * @throws ServiceException
     */
    static List<org.tatrc.paws.facility.ConceptValue> doClinics(
            final String facilityNcid) 
    throws RemoteException, ServiceException {
        org.tatrc.paws.facility.ConceptValue[] clinics = null;
        try {
            clinics = facilitySoaper()
            .fetchClinicsByFacilityNCID(facilityNcid);
        } catch (Exception e) {
            LOG.error("error with MilitaryTreatmentFacilityServiceSoap"
                    + ".fetchClinicsByFacilityNCID(" + facilityNcid + ");");
            e.printStackTrace();
        }
        if (null == clinics) {
            LOG.info("PAWS returned null clinics for milTreatFacilities");
            return new ArrayList<ConceptValue>();
        } else {
            LOG.info("PAWS returned clinics for facility::" + clinics.length);
            return Arrays.asList(clinics);
        }
    }
    
    /**
     * get the encounters for the give unit number, id, and ncid
     * @param unitNbr
     * @param id
     * @param ncid
     * @return
     * @throws RemoteException
     * @throws ServiceException
     */
    static List<Encounter> doEncounter(final String unitNbr
            , final String id, final String ncid)
    throws RemoteException, ServiceException {
        //= "http://10.0.1.6/DoD.TATRC.PAWS/EncounterService.asmx";
        final EncounterServiceLocator encServLoc = new EncounterServiceLocator();
        if (! StringUtil.isEmpty(_pawsAddr) ) {
            encServLoc.setEndpointAddress("EncounterServiceSoap12"
                    , new StringBuilder().append(_pawsAddr).append(
                            "EncounterService.asmx").toString());
        }
        final Encounter[] encounters = encServLoc.getEncounterServiceSoap12()
        .fetchEncounter(application, username, unitNbr, id, ncid
                , org.tatrc.paws.encounter.EnumDocumentFormat.None);
        if (null == encounters) {
            LOG.info("PAWS returned null encounters");
            return new ArrayList<Encounter>();
        } else {
            LOG.info("PAWS returned encounters::" + encounters.length);
            return Arrays.asList(encounters);
        }
    }

    /**
     * do the work of querying the paws Encounters service 
     * 
     * @param unitNbr the patient id
     * @return a list the the encounters for the patient
     * @throws RemoteException
     * @throws ServiceException
     */
    static List<Encounter> doEncountHdrs(final String unitNbr)
            throws RemoteException, ServiceException {
        final EncounterServiceLocator encServLoc = 
            new EncounterServiceLocator();
        if (! StringUtil.isEmpty(_pawsAddr) ) {
            encServLoc.setEndpointAddress("EncounterServiceSoap12"
                    , new StringBuilder().append(_pawsAddr).append(
                            "EncounterService.asmx").toString());
        }
        final Encounter[] encounters = 
            encServLoc.getEncounterServiceSoap().fetchEncounterHeaders(
                application, username, unitNbr);
        if (null == encounters) {
            LOG.info("PAWS returned null encounters");
            return new ArrayList<Encounter>();
        } else {
            LOG.info("PAWS returned encounters::" + encounters.length);
            return Arrays.asList(encounters);
        }
    }
    
    /**
     * get the facilities from the paws service
     * 
     * @return
     * @throws RemoteException
     * @throws ServiceException
     */
    static List<org.tatrc.paws.facility.ConceptValue> doFacilities() 
    throws RemoteException, ServiceException {
        final org.tatrc.paws.facility.ConceptValue[] milTreatFacs = 
            facilitySoaper().fetchMilitaryTreatmentFacilities();
        if (null == milTreatFacs) {
            LOG.info("PAWS returned null milTreatFacilities");
            return new ArrayList<org.tatrc.paws.facility.ConceptValue>();
        } else {
            LOG.info("PAWS returned milTreatFacilities::" + milTreatFacs.length);
            return Arrays.asList(milTreatFacs);
        }
    }
    
    /**
     * do the work of querying the paws history problems service 
     * 
     * @param unitNumber the patient id
     * @return a list historic problems for the patient
     * @throws RemoteException
     * @throws ServiceException
     */
    static List<Problem> doHistProbs(final String unitNumber)
            throws RemoteException, ServiceException {
        final HistoryServiceLocator histServLoc = new HistoryServiceLocator();
        if (! StringUtil.isEmpty(_pawsAddr) ) {
            histServLoc.setEndpointAddress("HistoryServiceSoap12"
                    , new StringBuilder().append(_pawsAddr).append(
                            "HistoryService.asmx").toString());
        }
        final Problem[] probs = histServLoc
        .getHistoryServiceSoap12().fetchProblems(application, username,
                unitNumber);
        if (null == probs) {
            LOG.info("PAWS returned null problems");
            return new ArrayList<Problem>();
        } else {
            LOG.info("PAWS returned HistoryService fetchProblems::"
                    + probs.length);
            return Arrays.asList(probs);
        }
    }
    
    /**
     * do the work of querying the paws labs service 
     * 
     * @param unitNumber patient id
     * @param nbrToGet the number of records to get
     * @return a list of labs
     * @throws RemoteException
     * @throws ServiceException
     */
    static List<Lab> doLabs(final String unitNumber, final int nbrToGet) 
    throws RemoteException, ServiceException {
        final LabsServiceLocator labsServLoc = new LabsServiceLocator();
        if (! StringUtil.isEmpty(_pawsAddr) ) {
            labsServLoc.setEndpointAddress("LabsServiceSoap12"
                    , new StringBuilder().append(_pawsAddr).append(
                            "LabsService.asmx").toString());
        }
        final Lab[] labs = labsServLoc.getLabsServiceSoap12()
        .fetchResultedLabs(application, username, unitNumber, nbrToGet);
        if (null == labs) {
            LOG.info("PAWS returned null labs");
            return new ArrayList<Lab>();
        } else {
            LOG.info("PAWS returned LabsService fetchResultedLabs::" 
                    + labs.length);
            return Arrays.asList(labs);
        }
    }

    /**
     * do the work of querying the paws medications service 
     * 
     * @param unitNumber the patient id
     * @return a list of medications for the patient
     * @throws RemoteException
     * @throws ServiceException
     */
    static List<Medication> doMeds(final String unitNumber)
            throws RemoteException, ServiceException {
        MedicationsServiceLocator medServLoc = new MedicationsServiceLocator();
        if (! StringUtil.isEmpty(_pawsAddr) ) {
            medServLoc.setEndpointAddress("MedicationsServiceSoap12"
                    , new StringBuilder().append(_pawsAddr).append(
                            "MedicationsService.asmx").toString());
        }
        final Medication[] meds = medServLoc
        .getMedicationsServiceSoap12()
        .fetchDispensedMeds(application, username, unitNumber);
        if (null == meds) {
            LOG.info("PAWS returned null meds");
            return new ArrayList<Medication>();
        } else {
            LOG.info("PAWS returned MedicationsService fetchDispensedMeds::" 
                    + meds.length);
            return Arrays.asList(meds);
        }
    }
    
    /**
     * do the work of querying the paws patient service 
     * 
     * @param unitNumber the patient id
     * @return the patient
     * @throws RemoteException
     * @throws ServiceException
     */
    static Patient doPatient(final String unitNumber)
            throws RemoteException, ServiceException {
        final PatientServiceLocator patServLoc = new PatientServiceLocator();
        if (! StringUtil.isEmpty(_pawsAddr) ) {
            patServLoc.setEndpointAddress("PatientServiceSoap12"
                    , new StringBuilder().append(_pawsAddr).append(
                            "PatientService.asmx").toString());
        }
        
        final Patient[] patients = 
            patServLoc.getPatientServiceSoap12().fetchPatient(
                    application, username, unitNumber);
        if (null == patients) {
            LOG.info("PAWS returned null");
            return null;
        } else {
            LOG.info("PAWS returned PatientService::" + patients.length);
            if (1 != patients.length) {
                throw new IllegalStateException("more than one patient?? "
                        + patients.length);
            }
            return patients[0];
        }
    }

    /**
     * do the work of querying the paws patient service  
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
     * @throws RemoteException
     * @throws ServiceException
     */
    static List<Patient> doPatients(final String lastname
            , final String firstname, final String dob, final String uic
            , final String ssn, final String fmp, final String sponsorssn
            , final String sex
    ) throws RemoteException, ServiceException {
        final PatientServiceLocator patServLoc = new PatientServiceLocator();
        if (! StringUtil.isEmpty(_pawsAddr) ) {
            patServLoc.setEndpointAddress("PatientServiceSoap12"
                    , new StringBuilder().append(_pawsAddr).append(
                            "PatientService.asmx").toString());
        }
        final Patient[] pats = patServLoc
        .getPatientServiceSoap12().fetchPatients(application,
                username, notNull(lastname), notNull(firstname),
                notNull(dob), notNull(uic), notNull(ssn), notNull(fmp),
                notNull(sponsorssn), notNull(sex));
        if (null == pats) {
            LOG.info("PAWS returned null");
            return new ArrayList<Patient>();
        } else {
            LOG.info("PAWS returned patients::" + pats.length);
            return Arrays.asList(pats);
        }
    }

    /**
     * get the provider by name
     * @param lastnameStem
     * @return
     * @throws RemoteException
     * @throws ServiceException
     */
    static List<Provider> doProviderByName(final String lastnameStem) 
    throws RemoteException, ServiceException {
        org.tatrc.paws.provider.ProviderServiceLocator psL = 
            new org.tatrc.paws.provider.ProviderServiceLocator();
        if (! StringUtil.isEmpty(_pawsAddr) ) {
            psL.setEndpointAddress("ProviderServiceSoap12"
                    , new StringBuilder().append(_pawsAddr).append(
                            "ProviderService.asmx").toString());
        }
        Provider[] provs = 
            psL.getProviderServiceSoap12().fetchProvidersByLastName(
                application, username, lastnameStem);
        if (null == provs) {
            LOG.info("PAWS returned null providers");
            return new ArrayList<Provider>();
        } else {
            LOG.info("PAWS returned providers::" + provs.length);
            return Arrays.asList(provs);
        }
    }
    
    /**
     * get the provider for the providers ncid
     * @param ncid
     * @return
     * @throws RemoteException
     * @throws ServiceException
     */
    static List<Provider> doProviderByNcid(final String ncid) 
    throws RemoteException, ServiceException {
        org.tatrc.paws.provider.ProviderServiceLocator psL = 
            new org.tatrc.paws.provider.ProviderServiceLocator();
        if (! StringUtil.isEmpty(_pawsAddr) ) {
            psL.setEndpointAddress("ProviderServiceSoap12"
                    , new StringBuilder().append(_pawsAddr).append(
                            "ProviderService.asmx").toString());
        }
        Provider[] provs = 
            psL.getProviderServiceSoap12().fetchProvidersByProviderNCID(
                    application, username, ncid);
        if (null == provs) {
            LOG.info("PAWS returned null providers");
            return new ArrayList<Provider>();
        } else {
            LOG.info("PAWS returned providers::" + provs.length);
            return Arrays.asList(provs);
        }
    }
    
    /**
     * do the work of querying the paws radiology service 
     * 
     * @param unitNumber the paws search key
     * @return a list of radiology results
     * @throws RemoteException
     * @throws ServiceException
     */
    static List<RadiologyResult> doRads(final String unitNumber)
            throws RemoteException, ServiceException {
        RadiologyServiceLocator radServLoc = new RadiologyServiceLocator();
        if (! StringUtil.isEmpty(_pawsAddr) ) {
            radServLoc.setEndpointAddress("RadiologyServiceSoap12"
                    , new StringBuilder().append(_pawsAddr).append(
                            "RadiologyService.asmx").toString());
        }
        final RadiologyResult[] rads = radServLoc
                .getRadiologyServiceSoap12().fetchRadiologyResults(
                        application, username, unitNumber);
        if (null == rads) {
            LOG.info("PAWS returned null rads");
            return new ArrayList<RadiologyResult>();
        } else {
            LOG.info("PAWS returned RadiologyService::" + rads.length);
            return Arrays.asList(rads);
        }
    }
    
    /**
     * set the end point for paws
     * @param pawsAddr
     */
    public void setPawsAddr(final String pawsAddr) {
        this._pawsAddr = pawsAddr;
    }


}
