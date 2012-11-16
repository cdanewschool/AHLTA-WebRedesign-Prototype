package edu.newschool.piim.model.currentPatient;

import java.util.Calendar;
import java.util.Date;

/**
 * java bean-level encapsulation of the Current Patient ie brief profile of a patient
 * 
 * @author gregm
 */
public class CurrentPatient {

    /**
     * property for allergy warning
     */
    private String allergyWarning;
    
    /**
     * property for date of birth
     */
    private Date dateOfBirth;
    
    /**
     * property for first name
     */
    private String firstName;
    
    /**
     * property for gender
     */
    private String gender;
    
    /**
     * property for unit number
     */
    private String idNumber;
    
    /**
     * property for last name
     */
    private String lastName;
    
    /**
     * accessor for the age of the patient in number of years ie 37 years old
     * @return number of years the patient has lived
     */
    public int getAge() {
 //       LOG.info("dob " + dateOfBirth);
        Calendar dob = Calendar.getInstance();
        dob.setTime(dateOfBirth);
        return (Calendar.getInstance().get(Calendar.YEAR) 
                - dob.get(Calendar.YEAR));
    }
    
    /**
     * accessor for the patiuent's allergy warning
     * @return "Allergy Warning" if the patient has an allergy warning
     */
    public String getAllergyWarning() {
        return allergyWarning;
    }
    
    /**
     * accessor for the date of birth
     * @return the java.util.Date object of the patient's date of birth
     */
    public Date getDateOfBirth() {
        return dateOfBirth;
    }
    
    /**
     * accessor for the patient's first name
     * @return the patient's first name
     */
    public String getFirstName() {
        return firstName;
    }
    
    /**
     * accessor for the patients Gender
     * @return M or F
     */
    public String getGender() {
        return gender;
    }
    
    /**
     * accessor for the patient's unit number
     * @return the unit number as a String
     */
    public String getIdNumber() {
        return idNumber;
    }
    
    /**
     * accessor for the patient's last name
     * @return the patient's last name
     */
    public String getLastName() {
        return lastName;
    }
    
    /**
     * mutator for the allergy warning
     * @param allergyWarning "Allergy Warning" if the patient has an allergy warning
     */
    public void setAllergyWarning(String allergyWarning) {
        this.allergyWarning = allergyWarning;
    }
    
    /**
     * mutator for date of birth
     * @param dateOfBirth standard date representation of the date of birth
     */
    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }
    
    /**
     * mutator for the patient's first name
     * @param firstName the patient's first name
     */
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    
    /**
     * mutator for the patient's gender
     * @param gender the patient's gender
     */
    public void setGender(String gender) {
        this.gender = gender;
    }
    
    /**
     * mutator for the patient's unit number
     * @param idNumber the patient's unit number
     */
    public void setIdNumber(String idNumber) {
        this.idNumber = idNumber;
    }
    
    /**
     * mutator for the patient's last name
     * @param lastName the patient's last name
     */
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    
    /**
     * for display and logging
     */
    @Override
    public String toString() {
        return "CurrentPatient [allergyWarning=" + allergyWarning
                + ", dateOfBirth=" + dateOfBirth + ", firstName=" + firstName
                + ", gender=" + gender + ", idNumber=" + idNumber
                + ", lastName=" + lastName + "]";
    }

    

}
