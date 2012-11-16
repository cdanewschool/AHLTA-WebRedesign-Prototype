package edu.newschool.piim.model.results;

/**
 * representation of a lab result
 * @author gregm
 *
 */
public class ResultsNewLab extends ResultsNew {
    
    /**
     * factory method for object instatiation
     * @param key
     * @return
     */
    public static final ResultsNew getInstance(String key) {
        return new ResultsNewLab(key);
    }
    
    /**
     * mostly just calls super but assigns the kind to the lab enum
     */
    private ResultsNewLab(final String id) {
        super(id);
        super._kind = ResultsKind.LABORATORY;
//        super.setId(id);
    }

    

    
}
