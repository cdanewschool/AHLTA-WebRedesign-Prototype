package edu.newschool.piim.service;

import java.sql.SQLException;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;

import edu.newschool.piim.model.mySchedule.ApptClient;
import edu.newschool.piim.util.Hib;

/**
 * Service for accessing appointment data from the model
 * 
 * @author gregm
 */
public final class ServAppts {
    
    /**
     * property for logging access
     */
    private static final Log LOG = LogFactory.getLog(ServAppts.class);

    /**
     * make the current set of appointments by starting from today go back one month 
     * and make 3 appointments each day as long as it is not saturday ofr sunday and contimue
     * until the month after today three months all together
     * 
     * sorted from old to new 
     * @return a list of appointments
     */
    public static List<ApptClient> getSched() {
        return Hib.template().execute(new HibernateCallback<List<ApptClient>>() {
            @SuppressWarnings("unchecked")
            public List<ApptClient> doInHibernate(Session ses)
            throws HibernateException, SQLException {
                return (List<ApptClient>) ses.createQuery("from ApptClient").list();
            }
        });
    }


}
