package edu.newschool.piim.service;



import org.tatrc.paws.patient.Patient;

import edu.newschool.piim.model.currentPatient.CurrentPatient;
import edu.newschool.piim.util.StringUtil;

/**
 * Service for accessing current patient data from the model
 * 
 * @author gregm
 */
public class ServCurPatient {
    
    /**
     *  public interface for getting a current patient object. if the input
     *  parameter is empty then return null 
     * @param curPatId a unit number of empty
     * @return a current patient object of null
     */
    public static CurrentPatient getCurrentPatient(final String curPatId) {
        return (StringUtil.isEmpty(curPatId))? null: makeBean(ServPaws.patient(curPatId));
    }
    
    /**
     * for the given patient, extract the information needed to render the 
     * current patient.  the handling of allergy warning is basically a 
     * boolean flag at this time
     * @param patient a patent as returned from paws
     * @return a current patient for rendering on the from end 
     */
    private static CurrentPatient makeBean(final Patient patient) {
        final CurrentPatient curPat = new CurrentPatient();
        curPat.setAllergyWarning(
                (0 < ServPaws.allergies(patient.getUnitNumber()).size())
                ? "Allergy Warning": null);
        curPat.setDateOfBirth(patient.getDateOfBirth().getTime());
        curPat.setFirstName(patient.getName().getFirstName());
        curPat.setGender(patient.getGender());
        curPat.setIdNumber(patient.getUnitNumber());
        curPat.setLastName(patient.getName().getLastName());
        return curPat;
    }
    
}
