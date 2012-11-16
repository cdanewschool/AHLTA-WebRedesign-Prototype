package edu.newschool.piim.model.results;

/**
 * encapsulate the different kinds of reports as an enum type
 * 
 * @author gregm
 */
public enum ResultsKind {
    
    /**
     * the static list of enum types 
     */
    LABORATORY("Laboratory"), //NULL_RES(""), 
    RADIOLOGY("Radiology");
    
    /**
     * internal state of the enum for sending to the toString method
     */
    private final String _label;
    
    /**
     * constructor for the enums private scope
     * @param label
     */
    private ResultsKind(final String label) {
        _label = label;
    }
    
    /**
     * print a label for the enum
     */
    public String toString() {
        return _label;
    }
    
    
    
}
