package edu.newschool.piim.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import edu.newschool.piim.service.ServCurPatient;
import edu.newschool.piim.util.StringUtil;

/**
 * web interface for the current patient cross application functionality
 * @author gregm
 *
 */
public class CntrlCurPatient implements Controller {
	
    /**
     * log any useful information
     */
	private static final Log LOG = LogFactory.getLog(CntrlCurPatient.class);
	
	/**
	 * public interface to hadle url requests for current patient data
	 * @param request the HttpServletRequest 
	 * @param response the HttpServletResponse 
	 */
	public ModelAndView handleRequest(final HttpServletRequest request,
            final HttpServletResponse response) throws Exception {
        LOG.info("recieved request for " + request.getRequestURI()
                + "?" + request.getQueryString()); 
        ModelAndView modelAndView = null;
	    try {
	        final String kind = request.getParameter("kind");
            final String patId = request.getParameter("currentPatientId");

	        if ("name".equals(kind)) {
	            modelAndView = new ModelAndView("currentPatient/name");
	            if (StringUtil.isEmpty(patId)) {
	                return modelAndView.addObject("currentPatient", null);
	            }
	        } else if ("brief".equals(kind)){
	            modelAndView = new ModelAndView("currentPatient/currentPatient");
	        } else {
	            throw new IllegalArgumentException("cannot determine type::" 
	                    + request.getQueryString());
	        }
	        
            return modelAndView.addObject("currentPatient"
	                , ServCurPatient.getCurrentPatient(
	                        patId));
	    } catch (final Exception e){
	        LOG.error("exception in handleRequest for " 
	                + request.getQueryString() + " msg:: " + e.getMessage());
	        throw e;
       } finally{
            LOG.info("going to view::" + modelAndView.getViewName());
	    }
	}

	
}
