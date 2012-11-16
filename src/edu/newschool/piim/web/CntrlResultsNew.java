package edu.newschool.piim.web;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import edu.newschool.piim.model.facility.ClinicConsVal;
import edu.newschool.piim.model.facility.Facility;
import edu.newschool.piim.model.results.ResultsKind;
import edu.newschool.piim.model.results.ResultsNew;
import edu.newschool.piim.service.ServPaws;
import edu.newschool.piim.service.ServResults;
import edu.newschool.piim.util.StringUtil;

/**
 * web interface for the New Results module
 *  
 * @author gregm
 *
 */
public class CntrlResultsNew implements Controller {
    
    /**
	 * log any useful information
	 */
	private static final Log LOG = LogFactory.getLog(CntrlResultsNew.class);

	/**
	 * main public interface to handle url requests for new results data
	 * @param request the HttpServletRequest 
     * @param response the HttpServletResponse 
     */
	public ModelAndView handleRequest(final HttpServletRequest request,
            final HttpServletResponse response) throws Exception {
	    Sessioner.checkSession(request.getSession());
        LOG.info("recieved request for " + request.getRequestURI()
                + "?" + request.getQueryString()); 
        ModelAndView modelAndView = null;
	    try {
	        modelAndView = resolveModelAndView(request);
            return modelAndView;
	    } catch (final Exception e){
	        LOG.error("exception in handleRequest for " 
	                + request.getQueryString() + " msg:: " + e.getMessage());
	        throw e;
//	    } finally{
//	        LOG.info("going to view::" + modelAndView.getViewName());
	    }
	}

	/**
     * isolate the functioning for the details type of result
     * @param testId the id for the test we want.  paws does not have such an 
     * id so we make our own
     * @return jsp
     */
    private ModelAndView doDetails(final String testId) {
//        try {
        final ResultsNew result = ServResults.getResult(testId);
        final ModelAndView modelAndView = whichDetails(result.getResultKind());
        modelAndView.addObject("result", result );
        return modelAndView; // } catch (RuntimeException e) { LOG.warn("could not resolve test " + e.getMessage()); String decode = testId; decode = java.net.URLDecoder.decode(testId, "UTF-8"); final String[] split = decode.split("PIIM"); final String testKind = split[3]; ResultsKind resultKind = ("Lab".equals(testKind))? ResultsKind.LABORATORY: ResultsKind.RADIOLOGY; final ModelAndView modelAndView = whichDetails(resultKind); modelAndView.addObject("result", result ); return modelAndView; }
    }
	
    /**
     * handle requests to being the multi stage process of forwarding the new result
     * by assembling a list of providers
     * @param request
     * @return
     */
    private ModelAndView doForwardConfirm(final HttpServletRequest request) {
        final ModelAndView mav = 
            new ModelAndView("newResults/forwardConfirm");
        mav.addObject("provider", 
                ServPaws.lookupProvider(
                        (String) request.getParameter("providerNcid")) );
        return mav;
        
    }
    
    /**
     * handle requests to actually do the forward. it returns an empty mav
     * @param request
     * @return
     */
    private ModelAndView doForwardDo(final HttpServletRequest request) {
        ServResults.resultForward(
                request.getParameter("testId")
                , request.getParameter("providerNcid"));
        return new ModelAndView("newResults/forwarded");
        
    }
    
    /**
     * handle requests to nove the result from the saved tab to the new tab
     * @param testId
     * @return
     */
    private ModelAndView doMoveToNew(final String testId) {
        ServResults.resultUnSaved(testId);
        return new ModelAndView();
    }
    
    /**
	 * isolate the functioning for the new type of results
	 * @param patientId the id of whom we want test results 
	 * @return the jsp
	 */
    private ModelAndView doNew(final String patientId) {
        final ModelAndView modelAndView = new ModelAndView("newResults/newResults");
        modelAndView.addObject("results", ServResults.getResultsNew(patientId));
        return modelAndView;
    }
    
    /**
     * handle request for providers
     * @param request
     * @return
     */
    private ModelAndView doProvider(final HttpServletRequest request) {
        final HttpSession ses = request.getSession();
        final ModelAndView mav = new ModelAndView("newResults/provider");
        final Facility facility = (Facility) ses.getAttribute(Sessioner.CURRENT_FACILITY);
        mav.addObject("facilities", ServPaws.facilities(facility));
        final ClinicConsVal clinic = (ClinicConsVal) ses.getAttribute(Sessioner.CURRENT_CLINIC);
        mav.addObject("clinics", ServPaws.clinics(facility.getNcid(), clinic));
        return mav;
    }

    /**
     * handle requests to get the clinics for a given provider
     * @param request
     * @return
     */
    private ModelAndView doProviderClinics(final HttpServletRequest request ) {
        final HttpSession session = request.getSession();
        ClinicConsVal clinic = null;
        final Facility curFacility = (Facility) session.getAttribute(Sessioner.CURRENT_FACILITY);
        final String facilityNcid = (StringUtil.isEmpty(request.getParameter("facNcid")))
            ? curFacility.getNcid()
                    : request.getParameter("facNcid");
        if ( curFacility.getNcid().equals(facilityNcid))  {
            clinic = (ClinicConsVal) session.getAttribute(Sessioner.CURRENT_CLINIC);
        } 
        final ModelAndView mav = new ModelAndView("newResults/providerClinics");
        mav.addObject("clinics", ServPaws.clinics(facilityNcid   , clinic));
        return mav;
    }
    
    /**
     * handle requests for the provider find by building a list of clinicians
     * @param p_lastnameStem
     * @return
     */
    private ModelAndView doProviderFind(final String p_lastnameStem ) {
        final ModelAndView mav = new ModelAndView("newResults/providerFindRes");
        mav.addObject("clinicians", ServPaws.clinicians(p_lastnameStem, "CHCSII TestClinic"));
        return mav;
        
    }

    /**
     * handle requests to mark the test as reviewed
     * @param testId
     * @return
     */
    private ModelAndView doReviewed(final String testId) {
        ServResults.resultReviewed(testId);
        return new ModelAndView();
    }

    /**
     * isolate the functioning for the saved type of results
     * @param patientId unit number for whom we want the saved test results
     * @return jsp
     */
    private ModelAndView doSaved(final String patientId) {
        final List<ResultsNew> savedResults = 
            ServResults.getResultsSaved(patientId);
        final ModelAndView modelAndView = 
            new ModelAndView("newResults/newResults");
        modelAndView.addObject("results", savedResults);
        return modelAndView;
    }

    /**
     * handle requests to mark the results as saved and moved to the saved tab
     * @param testId
     * @return
     */
    private ModelAndView doSaveIt(final String testId) {
        ServResults.resultSaved(testId);
        return new ModelAndView();
    }

    /**
     * handle requests to sign the result
     * @param testId
     * @return
     */
    private ModelAndView doSign(final String testId) {
        ServResults.resultSigned(testId);
        return new ModelAndView();
    }
    
    /**
     * handle requests for the component itself by just providing a 
     * path for the jsp
     * @param request
     * @return
     */
    private ModelAndView doWrapper(final HttpServletRequest request) {
        return new ModelAndView("newResults/newResultsWrap");
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
        if ("get_new".equals(kind)) {
            return doNew(request.getParameter("patientid"));
        } else if ("get_saved".equals(kind)) {
            return doSaved(request.getParameter("patientid"));
        } else if ("get_details".equals(kind)) {
            return doDetails(request.getParameter("testid"));
        } else if ("set_reviewed".equals(kind)) {
            return doReviewed(request.getParameter("testid"));
        } else if ("set_saved".equals(kind)) {
            return doSaveIt(request.getParameter("testid"));
        } else if ("set_new".equals(kind)) {
            return doMoveToNew(request.getParameter("testid"));
        } else if ("set_signed".equals(kind)) {
            return doSign(request.getParameter("testid"));
        } else if ("legend".equals(kind) ) {
            return new ModelAndView("newResults/legend");
        } else if ("provider".equals(kind) ) {
            return doProvider(request);
        } else if ("providerClinics".equals(kind) ) {
            return doProviderClinics(request );
        } else if ("providerFind".equals(kind) ) {
            return doProviderFind(request.getParameter("provider_name"));
        } else if ("forwardConfirm".equals(kind) ) {
            return doForwardConfirm(request);
        } else if ("wrap".equals(kind) ) {
            return doWrapper(request);
        } else if ("forwardDo".equals(kind) ) {
            return doForwardDo(request);
        }
        throw new IllegalStateException("unrecognized kind for " + kind);
    }
    
    /**
     * islate the determining of the details type
     * @param testType lab or radiology
     * @return jsp
     */
    private ModelAndView whichDetails(final ResultsKind testType) {
        switch (testType) {
            case LABORATORY: {
                return new ModelAndView("newResults/labDetails");
            } case RADIOLOGY: {
                return new ModelAndView("newResults/radiologyDetails");
            // } case NULL_RES: {
            //     return new ModelAndView("newResults/nullDetails");
            } default: {
                throw new IllegalStateException("cannot determind results-kind for " 
                        + testType);
            }
        }
    }

	
}
