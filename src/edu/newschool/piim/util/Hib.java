package edu.newschool.piim.util;


import org.hibernate.SessionFactory;
import org.springframework.orm.hibernate3.HibernateTemplate;


/**
 * static access to Spring's HibernateWrapper
 * 
 * @author gregm
 *
 */
public final class Hib {
    
    /**
     * member variable for the Spring Frameworks integration point to Hibernate 
     */
    private static HibernateTemplate _springHib;
        
    /**
     * static accessor for the application to get to the database
     * @return
     */
    public static HibernateTemplate template() { return _springHib ; }

    /**
     * this is where Spring will wire via inversion-of-control.  from the 
     * session factory we set up the hibernate template and we are ready to go
     * @param sessionFactory
     */
    public void setSessionFactory(final SessionFactory sessionFactory) {
        _springHib = new HibernateTemplate(sessionFactory);
    }

    
}
