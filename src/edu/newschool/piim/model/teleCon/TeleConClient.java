package edu.newschool.piim.model.teleCon;

import java.util.Calendar;
import java.util.Date;

import org.tatrc.paws.patient.Patient;
import org.tatrc.paws.patient.Telecom;

import edu.newschool.piim.model.facility.ClinicConsVal;
import edu.newschool.piim.model.facility.Clinician;
import edu.newschool.piim.service.ServPaws;
import edu.newschool.piim.util.DateUtil;
import edu.newschool.piim.util.Hib;
import edu.newschool.piim.util.StringUtil;

/**
 * java bean-level encapsulation of a telephone consultation 
 * 
 * @author gregm
 */
public class TeleConClient {
    
    /**
     * static factory method for object creation from database
     * if there is no row in the db, then an exception is thrown 
     * @param apptId
     * @return
     */
    public static TeleConClient getInstance(final Integer apptId) {
        return Hib.template().get(TeleConClient.class, apptId);
    }
    
    /**
     * removes the passed in instance from the database
     * @param client the instance to remove
     */
    public static void removeInstance(final TeleConClient client) {
        Hib.template().delete(client);
    }

    /**
     * member variable for the appt status
     */
    private String _apptStatus;
    
    /**
     * property for callBackPhone
     */
    private String _callbackPhone;
    
    /**
     * member variable for the clinic
     */
    private ClinicConsVal _clinic;  

    /**
     * member variable for comments
     */
    private String _comments;
    
    /**
     * member variable for the collaborator, discussed
     * which is basiclally just a logical partitioning 
     * of the available fields
     */
    private TeleConDiscussed _discussed;
    
    /**
     * member variable for the disposition
     */
    private String _disposition;
    
    /**
     * member variable for E and M
     */
    private String _eAndM;
    //    private TeleConFollowUp _followUp;
    
    /**
     * link to another instance when the other instance is
     * a follow-up to this
     */
    private TeleConClient _followUp;
    
    /**
     * member variable for the For Tx data
     */
    private String _forTx;
    
    /**
     * member variable for note
     */
    private String _note;
    
    /**
     * member variable for Ok for out patient treatment
     */
    private boolean _outPatientOk;
    /**
     * member variable for the paws patient record
     */
    private Patient _pawsPatient;
    
    /**
     * member variable for the PRN
     */
    private boolean _prn ;
    
    /**
     * property for provider
     */
    private Clinician _provider;
    
    /**
     * member variable for the Reason For Visit
     */
    private String _reasonForVisit;
    
    /**
     * member variable for the database id
     */
    private Integer _teleConId;
    
    /**
     * member variable for urgency state 
     */
    private TeleConUrgencyState _urgency;
    
    /**
     * member variable for the start of the telephone consult
     */
    private Date _when;
    
    /**
     * member variable for With PCM
     */
    private boolean _withPcm ;
    
    /**
     * member variable for the telecon status
     * @return
     */
    public String getApptStatus() {
        return _apptStatus;
    }
    
    /**
     * accessor for the call back phone
     * @return call back phone
     */
    public String getCallbackPhone() {
        //if not updated then home phone
        return (StringUtil.isEmpty(_callbackPhone)) ? 
                homePhone(_pawsPatient.getTelecoms()): _callbackPhone;
    }
    
    /**
     * accessor for the client name
     * @return the cient name
     */
    public String getClientName() {
        return new StringBuilder()
        .append(_pawsPatient.getName().getLastName()).append(",&#160;")
        .append(_pawsPatient.getName().getFirstName()).toString();
    }
    
    /**
     * accessor for the clinic 
     * @return the clinic
     */
    public ClinicConsVal getClinic() {
        return _clinic;
    }
    
    /**
     * accessor for the clinic name 
     * @return the clinic name
     */
    public String getClinicName() {
        return StringUtil.nonBreaking(_clinic.getName());
    }
    
    /**
     * 
     * @return
     */
    public String getClinicNcid() {
        if (null == _clinic) {
            return null;
        }
        return _clinic.getNcid() ;
    }
    
    /**
     * accessor for comments 
     * @return
     */
    public String getComments() {
        return _comments;
    }
    
    /**
     * accessor for the Discussed collaborator
     * @return
     */
    public TeleConDiscussed getDiscussed() {
        return _discussed;
    }
    
    /**
     * accessor for the disposition
     * @return
     */
    public String getDisposition() {
        return _disposition;
    }
    /**
     * accessor for for the client's date of birth
     * @return
     */
    public String getDob() {
        return DateUtil.datePart(_pawsPatient.getDateOfBirth().getTime());
        // new SimpleDateFormat("MMM dd, yyyy").format(
        // _pawsPatient.getDateOfBirth().getTime()); //dateOfBirth;
    }
    
    /**
     * accesor for the E and M
     * @return
     */
    public String getEandM() {
        return _eAndM;
    }
    
    /**
     * accessor for the first name
     * @return the first name
     */
    public String getFirstname() {
        return _pawsPatient.getName().getFirstName(); // firstname;
    }
    
    /**
     * accessor for for the fmp ssn
     * @return the fmp ssn
     */
    public String getFmpSsn() {
        return fmpSsn() ; //_fmpSsn;
    }
    
    /**
     * accessor for the followup telephone consult
     * @return the follow up or null
     */
    public TeleConClient getFollowUp() {
        return _followUp;
    }
    
    /**
     * accessor for the For TX field
     * @return the For TX data
     */
    public String getForTx() {
        return _forTx;
    }
    
    /**
     * accessor for the home phone
     * @return home phone
     */
    public String getHomePhone() {
        return homePhone(_pawsPatient.getTelecoms());
    }
    
    /**
     * acessor for the last name
     * @return the last name
     */
    public String getLastname() {
        return _pawsPatient.getName().getLastName();//lastname;
    }
    
    /**
     * accessor for the MEPRS code
     * @return the MEPRES code
     */
    public String getMeprsCode() {
        return null;
    }
    
    /**
     * accessor for meprs description 
     * @return the meprs description
     */
    public String getMeprsDescription() {
        return null;
    }
    
    /**
     * accessor for the encounter note
     * @return the note
     */
    public String getNote() {
        return _note;
    }
    
    /**
     * accessor for the paws patient
     * @return the paws patient
     */
    public Patient getPatient() {
        return _pawsPatient;
    }
    
    /**
     * accessor for the paws patient unit number
     * @return the paws pateint unit number
     */
    public String getPawsPatUnitNbr() {
        return this._pawsPatient.getUnitNumber();//pawsPatUnitNbr;
    }
    
    /**
     * accessor for the provider
     * @return the provider
     */
    public Clinician getProvider() {
        return _provider; 
    }
    
    /**
     * accessor for the provider ncid
     * @return the provider ncid
     */
    public String getProviderId() {
        return this._provider.getNcid();//providerId;
    }
    
    /**
     * TODO
     * @return
     */
    public String getProviderName() {
        //return (StringUtil.isEmpty(_provider)) ? null : _provider;//ServPaws.lookupProvider(_provider).getFullName(); 
        return "";//(StringUtil.isEmpty(_provider.getFullName())) ? null : _provider.getFullName(); 
    }

    // diagnosis not captured at this time

    /**
     * TODO
     */
    public String getProviderNcid() {
        return "";//(StringUtil.isEmpty(_provider.getNcid())) ? null : _provider.getNcid();//ServPaws.lookupProvider(_provider).getFullName(); 
    }
    
    /**
     * accessor for the reason for visit
     * @return the reason for the visit
     */
    public String getReasonForVisit() {
        return _reasonForVisit;
    }
    
    /**
     * accessor for the database id
     * @return the database id
     */
    public Integer getTeleConId() {
        return _teleConId;
    }
    
    /**
     * accressor for the paws patient unit number
     * @return paws patient unit number
     */
    public String getUnitNumber() {
        return _pawsPatient.getUnitNumber();
    }
    
    /**
     * accessor for the urgency
     * @return urgency
     */
    public TeleConUrgencyState getUrgency() {
        return _urgency;
    }
    
    /**
     * accessor for the urgency name 
     * @return
     */
    public String getUrgencyName() {
        return _urgency.name();
    }
    
    /**
     * accessor for the start to the telecon
     * @return
     */
    public Date getWhen() {
        return _when;
    }
    
    /**
     * accessor for the end of the telecon
     * @return
     */
    public Date getWhenEnd() {
        Calendar cal = Calendar.getInstance();
        cal.setTime(_when);
        cal.add(Calendar.MINUTE, 15);
        return cal.getTime();
    } 
    
    /**
     * accessor for the work phone 
     * @return
     */
    public String getWorkPhone() {
        return  workPhone(_pawsPatient.getTelecoms());
        //_workPhone;
    }
    
    /**
     * accessor for the is patient ok for out patient care 
     * @return
     */
    public boolean isOutPatientOk() {
        return _outPatientOk;
    }
    
    /**
     * accessor for the prn
     * @return
     */
    public boolean isPrn() {
        return _prn;
    }
    
    /**
     * accessor for the Is With PCM
     * @return
     */
    public boolean isWithPcm() {
        return _withPcm;
    }

    /**
     * mutator for the telecon status
     * @param apptStatus
     */
    public void setApptStatus(final String apptStatus) {
        this._apptStatus = apptStatus;
    }
    
    /**
     * mutator for the callback phone
     * @param phone
     */
    public void setCallbackPhone(String phone) {
        this._callbackPhone = phone;
    }
    
    /**
     * mutator for the clinic
     * @param clinic
     */
    public void setClinic(ClinicConsVal clinic) {
        this._clinic = clinic;
    }

    /**
     * mutator for the clinic ncid
     * @param clinicNcid
     */
    public void setClinicNcid(String clinicNcid) {
        if ( (null == this._clinic) || (! this._clinic.getNcid().equals(clinicNcid)) ) {
            this._clinic = ServPaws.clinic(clinicNcid);
        }
    }

    /**
     * mutator for the comments
     * @param comments
     */
    public void setComments(final String comments) {
        this._comments = comments;
    }
    
    /**
     * mutator for the discussed 
     * @param discussed
     */
    public void setDiscussed(TeleConDiscussed discussed) {
        this._discussed = discussed;
    }
    
    /**
     * mutator for the disposition
     * @param disposition
     */
    public void setDisposition(final String disposition) {
        this._disposition = disposition;
    }
    
    /**
     * mutator for the e and m 
     * @param eAndM
     */
    public void setEandM(String eAndM) {
        this._eAndM = eAndM;
    }

    /**
     * mutator for any follow up appt
     * @param followUp
     */
    public void setFollowUp(TeleConClient followUp) {
        this._followUp = followUp;
    }
//    public void setFollowUp(TeleConFollowUp followUp) {
//        this._followUp = followUp;
//    }
    
    /**
     * mutator for the For Tx
     */
    public void setForTx(String forTx) {
        this._forTx = forTx;
    }
    
    /**
     * mutator for the note
     * @param note
     */
    public void setNote(final String note) {
        this._note = note;
    }
 
    /**
     * mutator for the out patient ok 
     * @param outPatientOk
     */
    public void setOutPatientOk(boolean outPatientOk) {
        this._outPatientOk = outPatientOk;
    }
    
    /**
     * mutator for the paws patient
     * @param paws
     */
    public void setPawsPatient(Patient paws) {
        this._pawsPatient = paws;
    }
    
    /**
     * mutator for the paws patient unit number 
     * @param pawsPatUnitNbr
     */
    public void setPawsPatUnitNbr(String pawsPatUnitNbr) {
        if ( (null == this._pawsPatient) || (! this._pawsPatient.getUnitNumber().equals(pawsPatUnitNbr)) ) {
            this._pawsPatient = ServPaws.patient(pawsPatUnitNbr);
        }
    }
    
    /**
     * mutator for the prn
     * @param prn
     */
    public void setPrn(boolean prn) {
        this._prn = prn;
    }
    
    /**
     * mutator for the provider
     * @param provider
     */
    public void setProvider(final Clinician provider) {
        this._provider = provider;
    }

    /**
     * mutator for the provider id 
     * @param providerId
     */
    public void setProviderId(String providerId) {
        if ( (null == this._provider) || (! this._provider.getNcid().equals(providerId) ) ) {
            this._provider = ServPaws.lookupProvider(providerId);
        }
    }
    
    /**
     * mutator for the reason for visit
     * @param reasonForVisit
     */
    public void setReasonForVisit(String reasonForVisit) {
        this._reasonForVisit = reasonForVisit;
    }
    
    /**
     * mutator for the telephone conference id
     * @param teleConId
     */
    public void setTeleConId(Integer teleConId) {
        this._teleConId = teleConId;
    }

    /**
     * mutator for the urgency
     * @param urgency
     */
    public void setUrgency(TeleConUrgencyState urgency) {
        this._urgency = urgency;
    }
    
    /**
     * mutator for the telephone conference start 
     * @param when
     */
    public void setWhen(final Date when) {
        this._when = when;
    }
    
//    @Override
//    public String toString() {
//        return "TeleConClient [_callbackPhone=" + _callbackPhone + ", _clinic="
//                + _clinic + ", _comments=" + _comments + ", _disposition="
//                + _disposition + ", _eAndM=" + _eAndM + ", _followUp="
//                + _followUp + ", _note=" + _note + ", _outPatientOk="
//                + _outPatientOk + ", _pawsPatient=" + _pawsPatient
//                + ", _provider=" + _provider + ", _urgency=" + _urgency
//                + ", _when=" + _when + ", discussed=" + discussed
//                + ", reasonForVisit=" + reasonForVisit + "]";
//    }
    
    /**
     * mutator for the With PCM 
     */
    public void setWithPcm(boolean withPcm) {
        this._withPcm = withPcm;
    }
    
    /**
     * isolate the process of composing the fmp ssn
     * @param pat the patient as from the paws patient service
     * @return textual representation of the fmp ssn
     */
    private String fmpSsn() {
        String ssn = _pawsPatient.getSSN().substring(0, 3) + "&#8209;" + _pawsPatient.getSSN().substring(3,5) + "&#8209;" + _pawsPatient.getSSN().substring(5);
        return (StringUtil.isEmpty(_pawsPatient.getFMP()))? ssn: _pawsPatient.getFMP() + '/' + ssn;
    }
    
    /**
     * traverse the array of telecoms to see if the type representation 
     * is that of the passed in parameter fo phone kind
     * @param telecoms an array of telecoms for a patient as from the
     * paws patient service
     * @param phoneKind a string like "Home Phone" which is the only
     * we we have to find a particular kind of phone number.  too back 
     * paws is structured this way because it is a very fragile process
     * and will crap out if there is a misspelling 
     * @return the desired phone number
     */
    private String getPhone(Telecom[] telecoms, String phoneKind) {
        for (Telecom tele: telecoms) {
            if (phoneKind.equalsIgnoreCase(tele.getTelecomType().getRepresentation())) {
                if (! StringUtil.isEmpty(tele.getValue())) {
                    return tele.getValue().replaceAll(" ", "&#160;");
                }
            }
        }
        return null;
    }
    
    /**
     * finds the home phone from a patient's telecom's
     * @param telecoms the array of telecoms as from the paws service
     * @return the home phone or null
     */
    private String homePhone(Telecom[] telecoms) {
        return getPhone(telecoms, "Home Phone");
    }
    
    /**
     * for the give array of the telecoms, if one is the work phone
     * return it or is not return null
     * @param telecoms
     * @return
     */
    private String workPhone(Telecom[] telecoms) {
        return getPhone(telecoms, "Work Phone");
    }
    
    
}
