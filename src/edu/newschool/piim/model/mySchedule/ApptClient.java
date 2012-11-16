package edu.newschool.piim.model.mySchedule;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.tatrc.paws.patient.Patient;
import org.tatrc.paws.patient.Telecom;

import edu.newschool.piim.service.ServPaws;
import edu.newschool.piim.util.DateUtil;
import edu.newschool.piim.util.Hib;
import edu.newschool.piim.util.StringUtil;



/**
 * java bean-level encapsulation of a patient with an appointment 
 * 
 * @author gregm
 */
public class ApptClient {
    
    /**
     * constant for checked in state`
     */
    private static final String CHECKED_IN = "CheckedIn";
    
    /**
     * constant for checked out state
     */
    private static final String CHECKED_OUT = "CheckedOut";
    
    /**
     * constant for signed state
     */
    private static final String SIGNED = "Signed";
    
    /**
     * factory method for instance from the database
     * @param apptId the appointment id
     * @return an instance from the database or null
     */
    public static ApptClient getInstance(final Integer apptId) {
        return Hib.template().get(ApptClient.class, apptId);
    }
    
    /**
     * static method for removing an instance from the database
     * @param apptClient id of appointment to remove
     */
    public static void removeInstance(final ApptClient apptClient) {
        Hib.template().delete(apptClient);
    }
    
    /**
     * property for the unique identifier of the appointment
     */
    private Integer _apptId;

    /**
     * property for the apptIen
     */
    private String _apptIen;
    
    /**
     * property for the apptKind
     */
    private String _apptKind; 
    
    /**
     * property for apptStart
     */
    private Date _apptStart;
    
    /**
     * property for apptStatus
     */
    private String _apptStatus;
    
    /**
     * property for callBackPhone
     */
    private String _callbackPhone;
    
    /**
     * property for checkinTime
     */
    private Date _checkinTime;
    
    /**
     * property for classification
     */
    private String _classification;

    /**
     * property for clinic
     */
    private String _clinic;


    /**
     * property for comments
     */
    private String _comments;

    /**
     * property for encounter
     */
    private String _encounter;

    /**
     * property for meprsCode
     */
    private String _meprsCode;

    /**
     * property for meprsDescription
     */
    private String _meprsDescription;
    
    /**
     * property of observation
     */
    private Boolean _observation; 

    /**
     * property for the outpatient ok
     */
    private String _outpatOk;    //=yes

    /**
     * property for the paws depiction of the patient
     */
    private Patient _pawsPatient;

    /**
     * property for provider
     */
    private String _provider;

    /**
     * property for reasonForVisit
     */
    private String _reasonForVisit;

    /**
     * property for related to injury
     */
    private String _rel2Inj;     //=true

    /**
     * property for related to in-patient care
     */
    private String _rel2Inpat ;   //=true

    /**
     * property for urgency
     */
    private String _urgency;     //=high
     
    /**
     * property for usv type like walk in
     */
    private String _usvType;     //=walkin

    /**
     * public interface to set status to checked in
     */
    public void checkin() {
        setApptStatus(CHECKED_IN);
        this.setCheckinTime(new Date());
        Hib.template().update(this);
        
    }
    
    /**
     * public interface to set status to checked out
     */
    public void checkout() {
        setApptStatus(CHECKED_OUT);
        Hib.template().update(this);
    }
    
    /**
     * accessor for the appointment end
     * @return fifteen minutes after start
     */
    public Date getApptEnd() {
        return new Date((long) (1000 * 60 * 15) + _apptStart.getTime());
    }
    
    /**
     * accessor for the Appointment Id
     * @return appointment id
     */
    public Integer getApptId() {
        return _apptId;
    }
    
    /**
     * accessor for appointment ien
     * @return the appt ien
     */
    public String getApptIen() {
        return _apptIen;
    }
    
    /**
     * accessor for appointment kind
     * @return appt kind
     */
    public String getApptKind() {
        return StringUtil.nonBreaking(_apptKind);
    }
    
    /**
     * accessor for appointment start datetime 
     * @return the appt start
     */
    public Date getApptStart() {
        return _apptStart; 
    }
    
    /**
     * accessor for appointment status
     * @returnteh appt status
     */
    public String getApptStatus() {
        return _apptStatus;
    }
    
    /**
     * accessor for for the call back phone
     * @return the callback phone
     */
    public String getCallbackPhone() {
        return (StringUtil.isEmpty(_callbackPhone))?homePhone(_pawsPatient.getTelecoms()): _callbackPhone;
    }
    
    /**
     * accessor for the check in time
     * @return the check in time
     */
    public Date getCheckinTime() {
        return _checkinTime;
    }

    /**
     * accessor for for the classification
     * @return the classification
     */
    public String getClassification() {
        return _classification;
    }

    /**
     * accessor for the patient unit number id
     * @return the patients paws unit number
     */
    public String getClientId() {
        return _pawsPatient.getUnitNumber();
    }
    
    /**
     * accessor for for the client's name
     * @return the full client name
     */
    public String getClientName() {
        return _pawsPatient.getName().getLastName() + "&#160;" + _pawsPatient.getName().getFirstName();
        
    }
    
    /**
     * accessor for the clinic 
     * @return the clinic
     */
    public String getClinic() {
        return StringUtil.nonBreaking(_clinic);
    }
    
    /**
     * accessor for comments 
     * @return the comments
     */
    public String getComments() {
        return _comments;
    }
    
    /**
     * accessor for the date of birth as a string
     * @return teh dob
     */
    public String getDob() {
        return new SimpleDateFormat("MMM dd, yyyy").format(
                _pawsPatient.getDateOfBirth().getTime()); 
    }
    
    /**
     * accessor for the encounter 
     * @return the encounter
     */
    public String getEncounter() {
        return _encounter;
    }
    
    /**
     * accessor for the first name
     * @return the first name
     */
    public String getFirstname() {
        return _pawsPatient.getName().getLastName(); 
    }
    
    /**
     * accessor for for the fmp ssn
     * @return the fmp ssn
     */
    public String getFmpSsn() {
        return fmpSsn() ; 
    }
    
    /**
     * accessor for the home phone
     * @return the home phone 
     */
    public String getHomePhone() {
        return homePhone(_pawsPatient.getTelecoms());
    }
    
    /**
     * accessor for the last name
     * @return the last name
     */
    public String getLastname() {
        return _pawsPatient.getName().getLastName();
    }
    
    /**
     * accessor for the meprs code
     * @return the merps code
     */
    public String getMeprsCode() {
        return _meprsCode;
    }

    /**
     * accessor for meprs description 
     * @return the meprs decription
     */
    public String getMeprsDescription() {
        return StringUtil.nonBreaking(_meprsDescription);
    }

    /**
     * accessor for observation
     * @return the observation
     */
    public Boolean getObservation() {
        return _observation;
    }

    /**
     * accessor for out patient ok 
     * @return the out patient ok
     */
    public String getOutpatOk() {
        return _outpatOk;
    }
    
    /**
     * accessor for paws patient 
     * @return the paws patient
     */
    public Patient getPatient() {
        return _pawsPatient;
    }
    /**
     * accessor for the paws patient id 
     * @return the paws patient id
     */
    public String getPawsPatientId() {
        return _pawsPatient.getUnitNumber();
    }
    
    /**
     * accessor for the provider
     * @return the provider
     */
    public String getProvider() {
        return (StringUtil.isEmpty(_provider)) ? null : _provider;//ServPaws.lookupProvider(_provider).getFullName(); 
    }

    
    /**
     * accessor for the reason for visit 
     * @return the reason for visit
     */
    public String getReasonForVisit() {
        return _reasonForVisit;
    }
    
    /**
     * accessor for the related to injury
     * @return the related to injury
     */
    public String getRel2Inj() {
        return _rel2Inj;
    }
    
    /**
     * accessor for related to in-patient care
     * @return related to in-patient care
     */
    public String getRel2Inpat() {
        return _rel2Inpat;
    }
    
    /**
     * accessor for appointment start time
     * @return the appt start time
     */
    public String getStartAt() {
        return DateUtil.format(getApptStart());
    }
    
    /**
     * accessor for unit number 
     * @return unit number
     */
    public String getUnitNumber() {
        return _pawsPatient.getUnitNumber();
    }

    /**
     * accessor for urgency
     * @return urgency
     */
    public String getUrgency() {
        return _urgency;
    }
    
    /**
     * accessor for usv type
     * @return usv type
     */
    public String getUsvType() {
        return _usvType;
    }
    
    /**
     * accessor for the work phone 
     * @return the work phone
     */
    public String getWorkPhone() {
        return  workPhone(_pawsPatient.getTelecoms());
    }
    
    /**
     * mutator for the appointment end
     * for now appt end is considered 15 minutes after the start
     * @deprecated
     * @param apptEnd
     */
    public void setApptEnd(final Date apptEnd) {
        // this._apptEnd = apptEnd;
    }
    
    /**
     * mutator for the appointment id 
     * @param apptId
     */
    public void setApptId(final Integer apptId) {
        this._apptId = apptId;
    }
    
    /**
     * mutator for appointment ien
     * @param apptIen
     */
    public void setApptIen(final String apptIen) {
        this._apptIen = apptIen;
    }
    
    /**
     * mutator for appointment kind
     * @param apptKind
     */
    public void setApptKind(final String apptKind) {
        this._apptKind = apptKind;
    }
    
    /**
     * mutator for the appointment start
     * @param apptStart
     */
    public void setApptStart(final Date apptStart) {
        this._apptStart = apptStart;
    }

    /**
     * mutator for the appointment status
     * @param apptStatus
     */
    public void setApptStatus(final String apptStatus) {
        this._apptStatus = apptStatus;
    }
    
    /**
     * mutator for home phone
     * @param homePhone
     */
    public void setCallbackPhone(final String phone) {
        this._callbackPhone = phone;
    }
    
    /**
     * mutator for the check-in time
     * @param checkinTime
     */
    public void setCheckinTime(final Date checkinTime) {
        this._checkinTime = checkinTime;
    }
    
    /**
     * mutator for the classification
     * @param classification
     */
    public void setClassification(final String classification) {
        this._classification = classification;
    }
    
    /**
     * mutator for the clinic
     * @param clinic
     */
    public void setClinic(final String clinic) {
        this._clinic = clinic;
    }
    
    /**
     * mutator for for comments
     * @param comments
     */
    public void setComments(final String comments) {
        this._comments = comments;
    }
    
    /**
     * mutator for the encounter
     * @param encounter
     */
    public void setEncounter(final String encounter) {
        this._encounter = encounter;
    }

    /**
     * mutator for the meprs code
     * @param meprsCode
     */
    public void setMeprsCode(final String meprsCode) {
        this._meprsCode = meprsCode;
    }
    
    /**
     * mutator for the meprs description
     * @param meprsDescription
     */
    public void setMeprsDescription(final String meprsDescription) {
        this._meprsDescription = meprsDescription;
    }
    
    /**
     * mutator for the ok to observation
     * @param observation
     */
    public void setObservation(final Boolean observation) {
        this._observation = observation;
    }
    
    /**
     * mutator of the out patient ok attribute
     * @param outpatOk
     */
    public void setOutpatOk(final String outpatOk) {
        this._outpatOk = outpatOk;
    }
    
    /**
     * mutator for the paws patient record
     * @param paws as from paws
     */
    public void setPawsPatient(final Patient paws) {
        this._pawsPatient = paws;
    }
    
    /** 
     * mutator for the paws patient id.  if the id represents a
     * change to the underlying paws patient, updates the 
     * paws patient
     * @param pawsUnitNbr
     */
    public void setPawsPatientId(final String pawsUnitNbr) {
        if ( (! StringUtil.isEmpty(pawsUnitNbr) )
                && ( (null == _pawsPatient) || 
                        (! pawsUnitNbr.equals(_pawsPatient.getUnitNumber()))
                )
        ) {
            _pawsPatient = ServPaws.patient(pawsUnitNbr);
        }
    }
    
    /**
     * mutator for the provider
     * @param provider
     */
    public void setProvider(final String provider) {
        this._provider = provider;
    }
    
    /**
     * mutator for the reason for the visit
     * @param reasonForVisit
     */
    public void setReasonForVisit(final String reasonForVisit) {
        this._reasonForVisit = reasonForVisit;
    }
    
    /**
     * mutator for the related to injury
     * @param rel2Inj
     */
    public void setRel2Inj(final String rel2Inj) {
        this._rel2Inj = rel2Inj;
    }
    
    /**
     * mutator for the related to inpatient care 
     * @param rel2Inpat
     */
    public void setRel2Inpat(final String rel2Inpat) {
        this._rel2Inpat = rel2Inpat;
    }
    
    /**
     * mutator for urgency
     * @param urgency
     */
    public void setUrgency(final String urgency) {
        this._urgency = urgency;
    }
    
    /**
     * mutator for usv type
     * @param usvType
     */
    public void setUsvType(final String usvType) {
        this._usvType = usvType;
    }
    
    /**
     * api to update appointment status to signed
     */
    public void sign() {
        setApptStatus(SIGNED);
        Hib.template().update(this);
    }
    
    /**
     * displays the state for a particular instance
     */
    @Override
    public String toString() {
        return "ApptClient [" 
              //  + "_clientName=" + _clientName 
//        		+ ", _apptEnd=" + _apptEnd 
                + ", _apptId=" + _apptId + ", _apptIen=" + _apptIen
                + ", _apptKind=" + _apptKind 
                + ", _apptStart=" + _apptStart
                + ", _apptStatus=" + _apptStatus 
                // + ", _callBackPhone=" //+ _callBackPhone 
                + ", _checkinTime=" + _checkinTime
                + ", _classification=" + _classification + ", _clinic="
                + _clinic + ", _comments=" + _comments + ", _encounter="
                + _encounter 
                // + ", _fmpSsn=" + _fmpSsn 
                //+ ", _homePhone=" + _homePhone 
                + ", _meprsCode=" + _meprsCode
                + ", _meprsDescription=" + _meprsDescription + ", _provider="
                + _provider + ", _reasonForVisit=" + _reasonForVisit
                //+ ", _workPhone=" + _workPhone 
                + "]";
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
