package edu.newschool.piim.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import edu.newschool.piim.model.facility.ClinicConsVal;
import edu.newschool.piim.model.facility.Facility;
import edu.newschool.piim.service.ServPaws;
import edu.newschool.piim.util.StringUtil;

/**
 * web interface for the facilities service 
 * @author gregm
 *
 */
public class CntrlFacilities implements Controller {
    
    /**
     * token to set and retrieve the current clinic from the session
     */
	private static final String CURRENT_CLINIC = "current_clinic";
	
	/**
	 * token to get and set the current faciltui in the session
	 */
    private static final String CURRENT_FACILITY = "current_facility";
    
    /**
	 * log any useful information
	 */
	private static final Log LOG = LogFactory.getLog(CntrlFacilities.class);

	/**
	 * main public interface to handle url requests for new results data
	 * @param request the HttpServletRequest 
     * @param response the HttpServletResponse 
     */
	public ModelAndView handleRequest(final HttpServletRequest request,
            final HttpServletResponse response) throws Exception {
        LOG.info("recieved request for " + request.getRequestURI()
                + "?" + request.getQueryString()); 
	    try {
	        return resolveModelAndView(request);
	    } catch (final Exception e){
	        LOG.error("exception in handleRequest for " 
	                + request.getQueryString() + " msg:: " + e.getMessage());
	        throw e;
//	    } finally{
//	        LOG.info("going to view::" + modelAndView.getViewName());
	    }
	}

	/**
	 * default set up of the implicit home clinic for development purposes
	 * @return the default clinic
	 */
    private ClinicConsVal defaultClinic() {
        final ClinicConsVal clin = new ClinicConsVal();
        clin.setContext("2000");
        clin.setName("CHCSII Test Clinic");
        clin.setNcid("1047450");
        return clin;
    }

    /**
     * default set up for the implicit facility for development purposes
     * @return the default facility
     */
    private Facility defaultFacility() {
        final Facility fac = new Facility();
        fac.setContext("2000");
        fac.setName("CHCSII ITT Facility");
        fac.setNcid("1046961");
        return fac;
    }

    /**
     * handle requests for clinics by checking the session for any 
     * referred clinic or facility
     * @param request
     * @return
     */
    private ModelAndView doClinics(final HttpServletRequest request ) {
        final HttpSession session = request.getSession();
        if (null == session.getAttribute(CURRENT_FACILITY)) {
            initFacility(session);
        }
        final String p_facNcid = request.getParameter("facNcid"); 
        ClinicConsVal clinic = null;
        if (StringUtil.isEmpty(p_facNcid) || 
                ((Facility) session.getAttribute(
                        CURRENT_FACILITY)).getNcid().equals(p_facNcid)) {
            clinic = (ClinicConsVal) session.getAttribute(CURRENT_CLINIC);
        } 
        final ModelAndView mav = new ModelAndView("facilities/clinicsSelect");
        mav.addObject("clinics", ServPaws.clinics(
                ((Facility) session.getAttribute(
                        CURRENT_FACILITY)).getNcid(), clinic));
        return mav;
    }
    
    /**
     * set up the session with the default clinic and default facility
     * @param ses
     */
    private void initFacility(HttpSession ses) {
        if (null == ses.getAttribute(CURRENT_FACILITY)) {
            ses.setAttribute(CURRENT_FACILITY, defaultFacility());
        }
        if (null == ses.getAttribute(CURRENT_CLINIC)) {
            ses.setAttribute(CURRENT_CLINIC, defaultClinic());
        }
    }

    
    /**
     * isolate the logic of determine what the request was for
     * @param kind the kind of the query
     * @param patientId whose results we wan
     * @param testId the id of the test if there is one
     * @return jsp
     */
    private ModelAndView resolveModelAndView(final HttpServletRequest request){
        final String kind = request.getParameter("kind");
        if ("clinics".equals(kind) ) {
            return doClinics(request );
        }
        throw new IllegalStateException("unrecognized kind for " + kind);
    }
    
	
}
