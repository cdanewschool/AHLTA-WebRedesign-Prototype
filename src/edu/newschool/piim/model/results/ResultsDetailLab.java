package edu.newschool.piim.model.results;


/**
 * java bean-level encapsulation of a lab result 
 * 
 * @author gregm
 */
public class ResultsDetailLab implements ResultsDetail {
    
    
    /**
     * property for the interpretation
     */
    private String _interp;
    
    /**
     * property for the reference range
     */
    private String _refRange;
    
    /**
     * property for the results detail id
     */
    private String _resultDetailId;
    
    /**
     * property for the name 
     */
    private String _resultDetailName;
    
    /**
     * property for the result value 
     */
    private String _resultValues;
    
    /**
     * property for the site specimen
     */
    private String _siteSpecimen;
    
    /**
     * property for the units involved 
     */
    private String _units;
    
    /**
     * accessor for the results id 
     * @return
     */
    public String getId() {
        return _resultDetailId;
    }
    
    /**
     * accessor for the interpretation 
     * @return
     */
    public String getInterp() {
        return _interp;
    }
    
    /**
     * accessor for reference rang 
     * @return
     */
    public String getRefRange() {
        return _refRange;
    }
    
    /**
     * accessor for the result name 
     * @return
     */
    public String getResultName() {
        return _resultDetailName;
    }
    
    /**
     * accessor for the result value
     * @return
     */
    public String getResultValues() {
        return _resultValues;
    }
    
    /**
     * accessor for site specimen 
     * @return
     */
    public String getSiteSpecimen() {
        return _siteSpecimen;
    }
    
    /**
     * accessor for the units involved
     * @return
     */
    public String getUnits() {
        return _units;
    }
    
    /**
     * accessor for the datails id 
     * @param detailId
     */
    public void setId(final String detailId) {
        _resultDetailId = detailId;
    }
    
    /**
     * mutator for the interpretation
     * @param interp
     */
    public void setInterp(final String interp) {
        this._interp = interp;
    }
    
    /**
     * mutator for the refernece range
     * @param refRange
     */
    public void setRefRange(final String refRange) {
        this._refRange = refRange;
    }
    
    /**
     * mutator for the result name 
     * @param resultName
     */
    public void setResultName(final String resultName) {
        this._resultDetailName = resultName;
    }
    
    /**
     * mutator for the result value 
     * @param resultValues
     */
    public void setResultValues(final String resultValues) {
        this._resultValues = resultValues;
    }
    
    /**
     * mutator for the site specimen
     * @param siteSpecimen
     */
    public void setSiteSpecimen(final String siteSpecimen) {
        this._siteSpecimen = siteSpecimen;
    }
    
    /**
     * mutator for lab units mesurement
     * @param units
     */
    public void setUnits(final String units) {
        this._units = units;
    }
    
    
    
    
}
