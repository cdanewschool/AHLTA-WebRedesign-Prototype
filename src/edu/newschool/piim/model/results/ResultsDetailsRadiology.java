package edu.newschool.piim.model.results;



/**
 * java bean-level encapsulation of a radiology result 
 * 
 * @author gregm
 */
public class ResultsDetailsRadiology implements ResultsDetail {
    
    /**
     * property for the radiology report id
     */
    private long _id;
    
    /**
     * property for whether there is a worning or not 
     */
    private boolean _isWarning;
    
    /**
     * property for the report label
     */
    private String _radiRptLabel;
    
    /**
     * property for report value
     */
    private String _radiRptValue;
    
    /**
     * accessor for the id 
     * @return
     */
    public long getId() {
        return _id;
    }
    
    /**
     * accessor for the report label
     * @return
     */
    public String getRadiRptLabel() {
        return _radiRptLabel;
    }
    
    /**
     * accessor for for the report value
     * @return
     */
    public String getRadRptValue() {
        return _radiRptValue;
    }
    
    /**
     * accessor for whether there was a warning
     * @return
     */
    public boolean isWarning() {
        return _isWarning;
    }
    
    /**
     * mutator for the id 
     * @param id
     */
    public void setId(final long id) {
        this._id = id;
    }
    
    /**
     * mutator for the label 
     * @param radiRptLabel
     */
    public void setRadiRptLabel(final String radiRptLabel) {
        this._radiRptLabel = radiRptLabel;
    }
    
    /**
     * mutator for the report value
     * @param radiRptValue
     */
    public void setRadiRptValue(final String radiRptValue) {
        this._radiRptValue = radiRptValue;
    }
    
    /**
     * mutator for whether there is a warning
     * @param isWarning
     */
    public void setWarning(final boolean isWarning) {
        this._isWarning = isWarning;
    }
    
    
    
}
