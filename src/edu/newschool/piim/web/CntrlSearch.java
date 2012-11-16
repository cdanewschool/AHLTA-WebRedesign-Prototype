package edu.newschool.piim.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import edu.newschool.piim.service.ServSearch;
import edu.newschool.piim.util.StringUtil;

/**
 * web interface for the search module 
 * @author gregm
 *
 */
public class CntrlSearch implements Controller {
	
    /**
     * log any significant events
     */
	private static final Log LOG = LogFactory.getLog(CntrlSearch.class);
	
	/**
	 * bind to the url for handling requests for search
	 */
	public ModelAndView handleRequest(final HttpServletRequest request,
            final HttpServletResponse response) throws Exception {
        LOG.info("recieved request for " + request.getRequestURI()
                + "?" + request.getQueryString());
        ModelAndView mav = null;
	    try {
	        mav = resolveModelAndView(request);
            return mav;
	    } catch (final Exception e){
	        LOG.error("exception in handleRequest for " 
	                + request.getQueryString() + " msg:: " + e.getMessage());
	        throw e;
	    } finally{
            LOG.info("going to view::" + ((null == mav)? "no mav": mav.getViewName()));
	    }
	}

	/**
	 * isolate composition for the date of birth
	 * @param birthYear year
	 * @param birthMonth month
	 * @param birthDay day
	 * @return jsp
	 */
    private String composeDob(String birthYear, String birthMonth,
            String birthDay) {
        if (null != birthYear && "YYYY".equals(birthYear)){
            birthYear = null;
        }
        if (null != birthMonth && "MM".endsWith(birthMonth)) {
            birthMonth = null;
        }
        if (null != birthDay && "DD".equals(birthDay)) {
            birthDay = null;
        }
        if ( (! StringUtil.isEmpty(birthYear)) && (! StringUtil.isEmpty(birthMonth))
                && (! StringUtil.isEmpty(birthDay)) 
        ) {
            return new StringBuilder().append(birthMonth)
            .append('/').append(birthDay)
            .append('/').append(birthYear).toString();
        }
        return null;
    }

    /**
     * isolate composition of ssn
     * 
     * @param sponsorSsnFirst first three digits that come from browser in separate fields
     * @param sponsorSsnMiddle second two digits that come from browser in separate fields
     * @param sponsorSsnLast third four digits that come from browser in separate fields
     * @return an ssn
     */
    private String composeSsn(final String sponsorSsnFirst, final String sponsorSsnMiddle,
            String sponsorSsnLast) {
        if ((! StringUtil.isEmpty(sponsorSsnFirst)) 
                && (! StringUtil.isEmpty(sponsorSsnMiddle))
                && (! StringUtil.isEmpty(sponsorSsnLast))
        ) {
            return new StringBuilder().append(sponsorSsnFirst)
            .append(sponsorSsnMiddle).append(sponsorSsnLast).toString();
        }
        return null;
    }

    /**
     * isolate the functionality for the all patients button
     * @param request 
     * @return jsp
     */
    private ModelAndView doAllPatients(final HttpServletRequest request) {
        return new ModelAndView("search/search")
            .addObject("patients", ServSearch.patientsAll());
    }
    
    /**
     * isolate the processing for the details button
     * @param request placeholder not used
     * @return jsp
     */
    private ModelAndView doDetailed(final HttpServletRequest request) {
        return new ModelAndView("search/detailed")
            .addObject("patients", ServSearch.detailed());
    }
    
    private ModelAndView doForm() {
        return new ModelAndView("search/searchWrap");
    }

    /**
     * unpack the request parameters and calls the paws interface
     * @param req for the query parameters
     * @return jsp
     */
    private ModelAndView doSearch(final HttpServletRequest req) {
        
        final String quickSearch = req.getParameter("quickSearch");
        final String lastName = req.getParameter("lastName");
        final String firstName = req.getParameter("firstName");
        final String sex = req.getParameter("sex");
        
        //mm/dd/yyyy or mm/dd/yy
        final String dob = composeDob(req.getParameter("birthYear"), 
                req.getParameter("birthMonth"), req.getParameter("birthDay"));
        final String localFacility = req.getParameter("localFacility");
        
        final String ssn = composeSsn(req.getParameter("ssnFirst"), 
                req.getParameter("ssnMiddle"), req.getParameter("ssnLast"));
        
        final String sponsorSsn = composeSsn(req.getParameter("sponsorSsnFirst"), 
                req.getParameter("sponsorSsnMiddle"), req.getParameter("sponsorSsnLast"));
        
        final String fmp = req.getParameter("fmp");
        final String uic = req.getParameter("uic");
        
        return new ModelAndView("search/search")
            .addObject("patients", ServSearch.searchFind(lastName, firstName
                    , dob, uic, ssn, fmp, sponsorSsn, sex));
    }
	
    /**
     * isolate the logic of figuring out what was requested
     * @param request source for used entered data
     * @return jsp
     */
    private ModelAndView resolveModelAndView(final HttpServletRequest request) {
        final String kind = request.getParameter("kind");
        if ("search".equals(kind)) {
            return doSearch(request);
        } else if ("allPatients".equals(kind)) {
            return doAllPatients(request);
        } else if ("detailed".equals(kind)) {
            return doDetailed(request);
        } else{
            return doForm();
        }
//        throw new IllegalStateException("unrecognized kind for " + kind);
    }
    

	
}
