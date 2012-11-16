package edu.newschool.piim.model.results;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import edu.newschool.piim.util.Hib;


/**
 * rather than actually forward in any way, the action of forwarding
 * is recorded in the db as an auditable logged event
 * @author gregm
 *
 */
public class ResultForwarded {
    
    /**
     * static reference to the system log
     */
    private static final Log LOG = LogFactory.getLog(ResultForwarded.class);

    /**
     * api to record that the result is recorded as forwarded 
     * @param pawsKey
     * @param providerNcid
     */
    public static void recordForwarded(
            final String pawsKey, final String providerNcid) {
        final ResultForwarded firstTimer = new ResultForwarded();
        firstTimer.setPawsNaturalKey(pawsKey);
        firstTimer.setProviderNcid(providerNcid);
        Hib.template().persist(firstTimer);
        LOG.info("new Result forwarded:: " + firstTimer);
    }
    
    /**
     * member for database identity required by ORM
     */
    private int id;
    
    /**
     * key to uniquely id a result from the paws data
     */
    private String pawsNaturalKey;
    
    /**
     * ncid for the provider to whom the result was forwarded
     */
    private String providerNcid;
    
    /**
     * package scope constructor required for Hibernate
     */
    ResultForwarded() {
        super();
    }
    
    /**
     * accessor for the id as recored in the db 
     * @return the id
     */
    public int getId() {
        return id;
    }
    
    /**
     * accessor for the paws natural key  
     * @return the paws natural key
     */
    public String getPawsNaturalKey() {
        return pawsNaturalKey;
    }
    
    /**
     * accessor for the provider ncid to whom the result was sent
     * @return the provider ncid
     */
    public String getProviderNcid() {
        return providerNcid;
    }
    
    /**
     * mutator for the db id 
     * @param id
     */
    public void setId(int id) {
        this.id = id;
    }
    
    /**
     * mutator for paws natural key 
     * @param pawsNaturalKey
     */
    public void setPawsNaturalKey(String pawsNaturalKey) {
        this.pawsNaturalKey = pawsNaturalKey;
    }
    
    /**
     * mutator for provider ncid the report was sent to
     * @param providerNcid
     */
    public void setProviderNcid(String providerNcid) {
        this.providerNcid = providerNcid;
    }
    
    /**
     * display state
     */
    @Override
    public String toString() {
        return "ResultForwarded [id=" + id + ", pawsNaturalKey="
                + pawsNaturalKey + ", providerNcid=" + providerNcid + "]";
    }

}
