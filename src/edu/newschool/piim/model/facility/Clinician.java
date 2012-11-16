package edu.newschool.piim.model.facility;

import java.io.Serializable;

public class Clinician implements Serializable{
    
    /**
     * needed for serializability in the session during server restarts
     */
    private static final long serialVersionUID = 7059407429356287375L;

    /**
     * member variable for the clinics name
     */
    private String clinicName;

    /**
     * member variable for the clinicians first name
     */
    private String firstName;
    
    /**
     * member variable for the full name
     */
    private String fullName;
    
    /**
     * member variable for the clinicians last name
     */
    private String lastName;
    
    /**
     * member variable for the clinicians ncid
     */
    private String ncid;
    
    /**
     * comparison operation for collections and sorting etc
     */
    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Clinician other = (Clinician) obj;
        if (clinicName == null) {
            if (other.clinicName != null)
                return false;
        } else if (!clinicName.equals(other.clinicName))
            return false;
        if (firstName == null) {
            if (other.firstName != null)
                return false;
        } else if (!firstName.equals(other.firstName))
            return false;
        if (fullName == null) {
            if (other.fullName != null)
                return false;
        } else if (!fullName.equals(other.fullName))
            return false;
        if (lastName == null) {
            if (other.lastName != null)
                return false;
        } else if (!lastName.equals(other.lastName))
            return false;
        if (ncid == null) {
            if (other.ncid != null)
                return false;
        } else if (!ncid.equals(other.ncid))
            return false;
        return true;
    }
    
    /**
     * accessor for the clinicians clinic name
     * @return the clinicians clinic name
     */
    public String getClinicName() {
        return clinicName;
    }

    /**
     * accessor for the clinicians first name 
     * @return the clinicians first name
     */
    public String getFirstName() {
        return firstName;
    }
    /**
     * accessor for the clinicians full name
     * @return the clinicians full name
     */
    public String getFullName() {
        return fullName;
    }
    
    /**
     * accessor for the clinicians last name 
     * @return the clinicians last name
     */
    public String getLastName() {
        return lastName;
    }
    
    /**
     * accessor for the clinicians ncid
     * @return the clinicians ncid
     */
    public String getNcid() {
        return ncid;
    }
    
    /**
     * determine a hash value for the instance
     */
    @Override 
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result
                + ((clinicName == null) ? 0 : clinicName.hashCode());
        result = prime * result
                + ((firstName == null) ? 0 : firstName.hashCode());
        result = prime * result
                + ((fullName == null) ? 0 : fullName.hashCode());
        result = prime * result
                + ((lastName == null) ? 0 : lastName.hashCode());
        result = prime * result + ((ncid == null) ? 0 : ncid.hashCode());
        return result;
    }
    
    /**
     * mutator for the clinic name 
     * @param clinicName 
     */
    public void setClinicName(String clinicName) {
        this.clinicName = clinicName;
    }
    
    /**
     * mutator for the first name
     * @param firstName
     */
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    
    /**
     * mutator for the full name
     * @param fullName
     */
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
    
    /**
     * mutator for the last name 
     * @param lastName
     */
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    
    /**
     * mutator for the ncid
     * @param ncid
     */
    public void setNcid(String ncid) {
        this.ncid = ncid;
    }
    
    /**
     * textual display of the instances state
     */
    @Override
    public String toString() {
        return "Clinician [clinicName=" + clinicName + ", firstName="
                + firstName + ", fullName=" + fullName + ", lastName="
                + lastName + ", ncid=" + ncid + "]";
    }

}
