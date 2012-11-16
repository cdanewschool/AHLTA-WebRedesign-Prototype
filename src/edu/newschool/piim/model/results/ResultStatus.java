package edu.newschool.piim.model.results;

import java.sql.SQLException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;

import edu.newschool.piim.util.Hib;

public class ResultStatus {
    
    /**
     * member variable for access to the application log
     */
    private static final Log LOG = LogFactory.getLog(ResultStatus.class);
    
    /**
     * static factory method which first checks the database and if not
     * found creates a new one
     * @param pawsKey
     * @return
     */
    public static ResultStatus getInstance(final String pawsKey) {
        final ResultStatus resStat = fromDb(pawsKey);
        if (null != resStat) {
            return resStat;
        }
        final ResultStatus firstTimer = new ResultStatus();
        firstTimer.setPawsNaturalKey(pawsKey);
        firstTimer.setState(ResultStatusStates.New);
        Hib.template().persist(firstTimer);
        LOG.info("new Result status record :: " + firstTimer);
        return firstTimer;
    }
    
    /**
     * isolate the database stuff for the static factory 
     * @param pawsKey
     * @return
     */
    private static ResultStatus fromDb(final String pawsKey) {
        return Hib.template().execute(new HibernateCallback<ResultStatus>() {
            public ResultStatus doInHibernate(final Session session)
            throws HibernateException, SQLException {
                return (ResultStatus) session
                .createQuery("from ResultStatus where pawsNaturalKey = ?")
                .setString(0, pawsKey).uniqueResult();
            }
        });
    }
    
    /**
     * member for database id
     */
    private int id;
    
    /**
     * member for the paws natural key
     */
    private String pawsNaturalKey;
    
    /**
     * member for the result status state
     */
    private ResultStatusStates state;

    /**
     * equality function for collections and ORM
     */
    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        ResultStatus other = (ResultStatus) obj;
        if (id != other.id)
            return false;
        if (pawsNaturalKey == null) {
            if (other.pawsNaturalKey != null)
                return false;
        } else if (!pawsNaturalKey.equals(other.pawsNaturalKey))
            return false;
        if (state == null) {
            if (other.state != null)
                return false;
        } else if (!state.equals(other.state))
            return false;
        return true;
    }
    
    /**
     * accessor for database id 
     * @return database id
     */
    public int getId() {
        return id;
    }
    
    /**
     * accessor for paws natural key 
     * @return paws natural key
     */
    public String getPawsNaturalKey() {
        return pawsNaturalKey;
    }
    
    /**
     * accessor for state 
     * @return state
     */
    public ResultStatusStates getState() {
        return state;
    }
    
    /**
     * hash function for ORM and collections
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + id;
        result = prime * result
                + ((pawsNaturalKey == null) ? 0 : pawsNaturalKey.hashCode());
        result = prime * result + ((state == null) ? 0 : state.hashCode());
        return result;
    }
    
    /**
     * mutator for database id 
     * @param id
     */
    public void setId(final int id) {
        this.id = id;
    }

    /**
     * mutator for paws natural key 
     * @param pawsNaturalKey
     */
    public void setPawsNaturalKey(final String pawsNaturalKey) {
        this.pawsNaturalKey = pawsNaturalKey;
    }

    /**
     * mutator for state
     * @param state
     */
    public void setState(final ResultStatusStates state) {
        this.state = state;
    }

    /**
     * dispaly state
     */
    @Override
    public String toString() {
        return "ResultStatus [id=" + id + ", pawsNaturalKey=" + pawsNaturalKey
                + ", state=" + state + "]";
    }
    
    
    
}
