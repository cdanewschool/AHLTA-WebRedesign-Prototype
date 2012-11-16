package edu.newschool.piim.model.facility;

public abstract class FacConsValAbsBase {

    /**
     * member variable for the context 
     */
    private String context;
    
    /**
     * member variable for the name
     */
    private String name;
    
    /**
     * member variable for the ncid
     */
    private String ncid;
    
    /**
     * public constructor
     */
    public FacConsValAbsBase() {
        super();
    }

    /**
     * accessor for the context
     * @return
     */
    public String getContext() {
        return context;
    }

    /**
     * accessor for the name 
     * @return
     */
    public String getName() {
        return name;
    }

    /**
     * accessor for the ncid
     * @return
     */
    public String getNcid() {
        return ncid;
    }

    /**
     * mutator for the context 
     * @param context
     */
    public void setContext(String context) {
        this.context = context;
    }

    /**
     * mutator for the name
     * @param name
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * mutator for the ncid 
     * @param ncid
     */
    public void setNcid(String ncid) {
        this.ncid = ncid;
    }

    /**
     * textual display of the instance
     */
    @Override
    public String toString() {
        return "Facility [context=" + context + ", name=" + name + ", ncid="
                + ncid + "]";
    }

}