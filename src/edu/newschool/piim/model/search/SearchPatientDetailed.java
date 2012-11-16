package edu.newschool.piim.model.search;


/**
 * data module, ie transport object, for the results returned for a patient search details
 * 
 * might need polymorphism later
 * @author gregm
 */
public class SearchPatientDetailed {



    /**
     * property for Active Dual Status
     */
    private String _activeDualStatus = "Active Dual Status";
    
    /**
     * property for Age
     */
    private String _age = "Age";
    
    /**
     * property for allergies
     */
    private String _allergies = "Allergies";
    
    /**
     * property for bmist Enc
     */
    private String _bmistEnc = "BMIST Enc";
    
    /**
     * property for classification
     */
    private String _classification = "Classification";
    
    /**
     * property for Clinical Notes
     */
    private String _clinicalNotes = "Clinical Notes";
    
    /**
     * property for Consults
     */
    private String _consults = "Consults";
    
    /**
     * property for Assigned to Diabetes CPG
     */
    private String _diabetesCpg = "Assigned to Diabetes CPG?";
    
    /**
     * property for Sex
     */
    private String _gender = "Sex";
    
    /**
     * property for unit number 
     */
    private String _id;
    
    /**
     * property for labs
     */
    private String _labs = "Labs";
    
    /**
     * property for Medicare Eligibility
     */
    private String _medicareElig = "Medicare Eligibility";
    
    /**
     * property for meds
     */
    private String _meds = "Meds";
    
    /**
     * property for patient name
     */
    private String _patientName;
    
    /**
     * property for pre-positioned Appts#/Clinic
     */
    private String _prePosApptsClinic = "Pre-positioned Appts#/Clinic";
    
    /**
     * property for Pre-positioned Telcons
     */
    private String _prePosTelcons = "Pre-positioned Telcons";
    
    /**
     * property for previous encounter
     */
    private String _previousEnc = "Previous Enc";
    
    /**
     * property for problems
     */
    private String _problems = "Problems";
    
    /**
     * property for radiologies 
     */
    private String _rads = "Rads";
    
    /**
     * property for rank service
     */
    private String _rankSvc = "RankSvc";
    
    /**
     * property for Special Work Status
     */
    private String _specialWorkStat = "Special Work Status";
    
    /**
     * property for Active SRTS II Orders
     */
    private String _srtsii = "Active SRTS II Orders";
    
    /**
     * property for ssn 
     */
    private String _ssn = "SSN";
    
    /**
     * property for Theater Enc
     */
    private String _theaterEnc = "Theater Enc";
    
    
    /**
     * accessor for activeDualStatus
     * @return the activeDualStatus
     */
    public String getActiveDualStatus() {
        return _activeDualStatus;
    }
    
    /**
     * accessor for age
     * @return the age
     */
    public String getAge() {
        return _age;
    }
    
    /**
     * accessor for allergies
     * @return the allergies
     */
    public String getAllergies() {
        return _allergies;
    }
    
    /**
     * accessor for bmist enc 
     * @return the bmist enc
     */
    public String getBmistEnc() {
        return _bmistEnc;
    }
    
    /**
     * accessor for classification 
     * @return the classification
     */
    public String getClassification() {
        return _classification;
    }
    
    /**
     * accessor for clinical notes
     * @return the clinical notes
     */
    public String getClinicalNotes() {
        return _clinicalNotes;
    }
    
    /**
     * accessor for consults 
     * @return the consults
     */
    public String getConsults() {
        return _consults;
    }
    
    /**
     * accessor for diabetes cpg 
     * @return the diabetes cpg
     */
    public String getDiabetesCpg() {
        return _diabetesCpg;
    }
    
    /**
     * accessor for gender 
     * @return the gender
     */
    public String getGender() {
        return _gender;
    }
    
    /**
     * accessor for unit number
     * @return the  unit number
     */
    public String getId() { return _id; } 
    
    /**
     * accessor for labs 
     * @return the labs
     */
    public String getLabs() {
        return _labs;
    }
    
    /**
     * accessor for medicare elig
     * @return the medicare elig
     */
    public String getMedicareElig() {
        return _medicareElig;
    }
    
    /**
     * accessor for meds 
     * @return the meds
     */
    public String getMeds() {
        return _meds;
    }
    
    /**
     * accessor for patient name
     * @return the patient name
     */
    public String getPatientName() {
        return _patientName;
    }
    
    /**
     * accessor for pre-Positioned Appts Clinic
     * @return the pre-Positioned Appts Clinic
     */
    public String getPrePosApptsClinic() {
        return _prePosApptsClinic;
    }
    
    /**
     * accessor for pre-Positioned Telcons 
     * @return the pre-Positioned Telcons
     */
    public String getPrePosTelcons() {
        return _prePosTelcons;
    }
    
    /**
     * accessor for Previous Enc
     * @return the Previous Enc
     */
    public String getPreviousEnc() {
        return _previousEnc;
    }
    
    /**
     * accessor for problems
     * @return the problems 
     */
    public String getProblems() {
        return _problems;
    }
    
    /**
     * accessor for radiologies
     * @return the radiologies
     */
    public String getRads() {
        return _rads;
    }
    
    /**
     * accessor for rank service
     * @return the rank service 
     */
    public String getRankSvc() {
        return _rankSvc;
    }
    
    /**
     * accessor for Special Work Status
     * @return the Special Work Status
     */
    public String getSpecialWorkStat() {
        return _specialWorkStat;
    }
    
    /**
     * accessor for srtsii
     * @return the srtsii
     */
    public String getSrtsii() {
        return _srtsii;
    }
    
    /**
     * accessor for ssn
     * @return the ssn
     */
    public String getSsn() {
        if (null != _ssn && 9 == _ssn.length()) {
            return new StringBuilder()
            .append(_ssn.substring(0, 3)).append("-")
            .append(_ssn.substring(3, 5)).append("-")
            .append(_ssn.substring(5)).toString();
        } else {
            return _ssn;
        }
    }
    
    /**
     * accessor for Theater Enc
     * @return the Theater Enc
     */
    public String getTheaterEnc() {
        return _theaterEnc;
    }
    
    /**
     * mutator for activeDualStatus
     * @param activeDualStatus
     */
    public void setActiveDualStatus(String activeDualStatus) {
        this._activeDualStatus = activeDualStatus;
    }
    
    /**
     * mutator for age
     * @param age
     */
    public void setAge(String age) {
        this._age = age;
    }
    
    /**
     * mutator for allergies
     * @param allergies
     */
    public void setAllergies(String allergies) {
        this._allergies = allergies;
    }
    
    /**
     * mutator for bmistEnc
     * @param bmistEnc
     */
    public void setBmistEnc(String bmistEnc) {
        this._bmistEnc = bmistEnc;
    }
    
    /**
     * mutator for classification
     * @param classification
     */
    public void setClassification(String classification) {
        this._classification = classification;
    }
    
    /**
     * mutator for clinicalNotes
     * @param clinicalNotes
     */
    public void setClinicalNotes(String clinicalNotes) {
        this._clinicalNotes = clinicalNotes;
    }
    /**
     * mutator for consults
     * @param consults
     */
    public void setConsults(String consults) {
        this._consults = consults;
    }
    
    /**
     * mutator for diabetesCpg
     * @param diabetesCpg
     */
    public void setDiabetesCpg(String diabetesCpg) {
        this._diabetesCpg = diabetesCpg;
    }
    
    /**
     * mutator for gender
     * @param gender
     */
    public void setGender(String gender) {
        this._gender = gender;
    }
    
    /**
     * mutator for unit number
     * @param id
     */
    public void setId(String id) {
        _id = id;
    }
    
    /**
     * mutator for labs
     * @param labs
     */
    public void setLabs(String labs) {
        this._labs = labs;
    }
    
    /**
     * mutator for medicareElig
     * @param medicareElig
     */
    public void setMedicareElig(String medicareElig) {
        this._medicareElig = medicareElig;
    }
    
    /**
     * mutator for meds
     * @param meds
     */
    public void setMeds(String meds) {
        this._meds = meds;
    }
    
    /**
     * mutator for patientName
     * @param patientName
     */
    public void setPatientName(String patientName) {
        this._patientName = patientName;
    }
    
    /**
     * mutator for prePosApptsClinic
     * @param prePosApptsClinic
     */
    public void setPrePosApptsClinic(String prePosApptsClinic) {
        this._prePosApptsClinic = prePosApptsClinic;
    }
    
    /**
     * mutator for prePosTelcons
     * @param prePosTelcons
     */
    public void setPrePosTelcons(String prePosTelcons) {
        this._prePosTelcons = prePosTelcons;
    }
    
    /**
     * mutator for previousEnc
     * @param previousEnc
     */
    public void setPreviousEnc(String previousEnc) {
        this._previousEnc = previousEnc;
    }
    
    /**
     * mutator for problems
     * @param problems
     */
    public void setProblems(String problems) {
        this._problems = problems;
    }
    
    /**
     * mutator for rads
     * @param rads
     */
    public void setRads(String rads) {
        this._rads = rads;
    }
    
    /**
     * mutator for rankSvc
     * @param rankSvc
     */
    public void setRankSvc(String rankSvc) {
        this._rankSvc = rankSvc;
    }
    
    /**
     * mutator for specialWorkStat
     * @param specialWorkStat
     */
    public void setSpecialWorkStat(String specialWorkStat) {
        this._specialWorkStat = specialWorkStat;
    }
    
    /**
     * mutator for srtsii
     * @param srtsii
     */
    public void setSrtsii(String srtsii) {
        this._srtsii = srtsii;
    }
    
    /**
     * mutator for ssn
     * @param ssn
     */
    public void setSsn(String ssn) {
        this._ssn = ssn;
    }
    
    /**
     * mutator for theaterEnc
     * @param theaterEnc
     */
    public void setTheaterEnc(String theaterEnc) {
        this._theaterEnc = theaterEnc;
    }

        

}