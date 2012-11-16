package edu.newschool.piim.model.search;

import java.util.Date;



/**
 * data module, ie transport object, for the results returned for a patient search
 * 
 * @author gregm
 */
public class SearchPatient {
    
    /**
     * attribute for the displayed address
     */
    private String _address;
    
    /**
     * attribute for the date of birth
     */
    private Date _dob;
    
    /**
     * attribute for the fmp / sponsor ssn
     */
    private String _fmpSponsorSsn;
    
    /**
     * attribute for the gender as M or F
     */
    private String _gender ;
    
    /**
     * attribute for the home phone
     */
    private String _homePhone;
    
    /**
     * attribute for the unit number
     */
    private String _id;
    
    /**
     * attribute for the patients name as displayed in the search results
     */
    private String _patientName;
    
    /**
     * attribute for the ssn
     */
    private String _ssn;
    
    /**
     * attribute for the work phone
     */
    private String _workPhone;
    
    /**
     * accessor for the address
     * @return the addr
     */
    public String getAddress() {
        return _address;
    }
    
    /**
     * accessor for the date of birth
     * @return Date
     */
    public Date getDob() {
        return _dob;
    }
    
    /**
     * accessor for the fmp sponsor ssn
     * @return the fmp sponsor ssn
     */
    public String getFmpSponsorSsn() {
        return _fmpSponsorSsn;
    }
    
    /**
     * acessor for gender
     * @return String
     */
    public String getGender() {
        return _gender;
    }
    
    /**
     * accessor for home phone
     * 
     * @return String
     */
    public String getHomePhone() {
        return _homePhone;
    }
    
    /**
     * accessor for the unit number
     * @return String
     */
    public String getId() {
        return _id;
    }
    
    /**
     * accessor for the patient name
     * @return the patient name
     */
    public String getPatientName() {
        return _patientName;
    }
    
    /**
     * accessor for the ssn.  if the ssn is not hyphenated make it so
     * @return
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
     * accessor for work phone
     * @return the work phone
     */
    public String getWorkPhone() {
        return _workPhone;
    }
    
    /**
     * mutator for address
     * @param address 
     */
    public void setAddress(final String address) {
        this._address = address;
    }
    
    /**
     * mutator for date of birth
     * @param dob
     */
    public void setDob(final Date dob) {
        this._dob = dob;
    }
    
    /**
     * mutator for fmp sponsor ssn
     * @param fmpSponsorSsn
     */
    public void setFmpSponsorSsn(final String fmpSponsorSsn) {
        this._fmpSponsorSsn = fmpSponsorSsn;
    }
    
    /**
     * mutator for gender
     * @param gender
     */
    public void setGender(final String gender) {
        this._gender = gender;
    } 
    
    /**
     * mutator for home phone
     * @param homePhone
     */
    public void setHomePhone(final String homePhone) {
        this._homePhone = homePhone;
    }
    
    /**
     * mutator for the unit number
     * @param id
     */
    public void setId(final String id) {
        this._id = id;
    }
    
    /**
     * mutator for the patient name
     * @param patientName
     */
    public void setPatientName(final String patientName) {
        this._patientName = patientName;
    } 
    
    /**
     * mutator for the ssn
     * @param ssn
     */
    public void setSsn(final String ssn) {
        this._ssn = ssn;
    }
    
    /**
     * mutator for work phone
     * @param workPhone
     */
    public void setWorkPhone(final String workPhone) {
        this._workPhone = workPhone;
    }

    
    
}