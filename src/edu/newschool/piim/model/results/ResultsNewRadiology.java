package edu.newschool.piim.model.results;


/**
 * polymorphic endpoint for test types that are radiology
 * @author gregm
 *
 */
public class ResultsNewRadiology extends ResultsNew {
    
    /**
     * static factory method for radiology reports
     * @param key
     * @return
     */
    public static final ResultsNew getInstance(final String key) {
        return new ResultsNewRadiology(key);
    }

    /**
     * private constructor that properly sets the type enum
     * @param id
     */
    private ResultsNewRadiology(final String id) {
        super(id);
        super._kind = ResultsKind.RADIOLOGY;
//        super.setId(id);
    }
    
    
}
