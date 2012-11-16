package edu.newschool.piim.model.teleCon;

/**
 * controlled types for valid urgencies
 * 
 * @author gregm
 *
 */
public enum TeleConUrgencyState {
    /**
     * enumeration of urgency states
     */
    HIGH("High"), MEDIUM("Medium"), LOW("Low"), NA("n/a");
    
    /**
     * package level constructor requiring a label name
     * @param name
     */
    TeleConUrgencyState(final String name) {
        _name = name;
    }
    
    /**
     * member variable for the ugency label for display since the object itself if all caps
     */
    private final String _name;
    
    /**
     * accessor for display name
     * @return display name
     */
    public String getName() { return _name; }
    
    /**
     * static factory method that acts as a dipatcher and hard codes a list of 
     * acceptable types.  additional type would require modifications of this code
     * ultimately registy could be in xml or properties file. 
     * @param kind somebody wants this kind of urgency state
     * @return
     */
    public static TeleConUrgencyState getInstance(final String kind) {
        if ("MEDIUM".equalsIgnoreCase(kind)) {
            return TeleConUrgencyState.MEDIUM;
        }
        if ("HIGH".equalsIgnoreCase(kind)) {
            return TeleConUrgencyState.HIGH;
        }
        if ("LOW".equalsIgnoreCase(kind)) {
            return TeleConUrgencyState.LOW;
        }
        return TeleConUrgencyState.NA;
    }
    
}