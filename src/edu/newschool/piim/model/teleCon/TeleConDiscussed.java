package edu.newschool.piim.model.teleCon;

/**
 * collaborator object to the TeleConClient in a one-to-one relation
 * a collection of fields all of which deal with what was discussed during
 * 
 * @author gregm
 *
 */
public class TeleConDiscussed {
    
    /**
     * member variable whether alternatives were discussed
     */
    private boolean alternatives;
    
    /**
     * member variable whether a diagnosis was discussed
     */
    private boolean diagnosis;
    
    /**
     * member variable whether medications were discussed
     */
    private boolean medications;
    
    /**
     * member variable whether side effects were discussed
     */
    private boolean sideEffects;
    
    /**
     * member variable for whether the patient indicated 
     * understanding what was discussed 
     */
    private String understood;
    
    /**
     * equality used for hibernate and collections
     */
    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        TeleConDiscussed other = (TeleConDiscussed) obj;
        if (alternatives != other.alternatives)
            return false;
        if (diagnosis != other.diagnosis)
            return false;
        if (medications != other.medications)
            return false;
        if (sideEffects != other.sideEffects)
            return false;
        if (understood == null) {
            if (other.understood != null)
                return false;
        } else if (!understood.equals(other.understood))
            return false;
        return true;
    }
    
    /**
     * accessor for the understood value
     * @return
     */
    public String getUnderstood() {
        return understood;
    }
    
    /**
     * 
     * hashing used for hibernate and collections
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + (alternatives ? 1231 : 1237);
        result = prime * result + (diagnosis ? 1231 : 1237);
        result = prime * result + (medications ? 1231 : 1237);
        result = prime * result + (sideEffects ? 1231 : 1237);
        result = prime * result
                + ((understood == null) ? 0 : understood.hashCode());
        return result;
    }
    
    /**
     * accessor for whether alternatives were discussed
     * @return were alternatives discussed
     */
    public boolean isAlternatives() {
        return alternatives;
    }
    
    /**
     * accessor for whether a disagnosis was discussed
     * @return was a diagnosis discussed
     */
    public boolean isDiagnosis() {
        return diagnosis;
    }
    
    /**
     * accessor for whether medications were discussed
     * @return were medications discussed
     */
    public boolean isMedications() {
        return medications;
    }

    /**
     * accessor for whether any side effects were discussed
     * @return were side effects discussed
     */
    public boolean isSideEffects() {
        return sideEffects;
    }
    
    /**
     * mutator whether alternatives were discussed
     * @param alternatives
     */
    public void setAlternatives(boolean alternatives) {
        this.alternatives = alternatives;
    }
    
    /**
     * mutator whether alternatives were discussed
     * @param diagnosis
     */
    public void setDiagnosis(boolean diagnosis) {
        this.diagnosis = diagnosis;
    }
    
    /**
     * mutator whether medications were discussed
     * @param medications
     */
    public void setMedications(boolean medications) {
        this.medications = medications;
    }
    
    /**
     * mutator whether side effects were discussed
     * @param sideEffects
     */
    public void setSideEffects(boolean sideEffects) {
        this.sideEffects = sideEffects;
    }
    
    /**
     * mutator of if the patient indicated understanding what was discussed
     * @param understood
     */
    public void setUnderstood(String understood) {
        this.understood = understood;
    }
    
    /**
     * dump state
     */
    @Override
    public String toString() {
        return "TeleConDiscussed [alternatives=" + alternatives
                + ", diagnosis=" + diagnosis + ", medications=" + medications
                + ", sideEffects=" + sideEffects + ", understood=" + understood
                + "]";
    }

}
