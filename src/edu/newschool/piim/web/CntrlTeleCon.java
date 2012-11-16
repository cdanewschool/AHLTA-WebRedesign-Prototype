package edu.newschool.piim.web;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import edu.newschool.piim.model.facility.ClinicConsVal;
import edu.newschool.piim.model.facility.Clinician;
import edu.newschool.piim.model.facility.Facility;
import edu.newschool.piim.model.teleCon.TeleConClient;
import edu.newschool.piim.model.teleCon.TeleConDiscussed;
import edu.newschool.piim.model.teleCon.TeleConUrgencyState;
import edu.newschool.piim.service.ServPaws;
import edu.newschool.piim.util.DateUtil;
import edu.newschool.piim.util.Hib;
import edu.newschool.piim.util.StringUtil;

/**
 * web interface to the telephone consults module
 * @author gregm
 *
 */
public class CntrlTeleCon implements Controller {

    /**
     * handle to the system log to record significant events
     */
	private static final Log LOG = LogFactory.getLog(CntrlTeleCon.class);

	/**
	 * token for getting and setting the current consult in the session
	 */
	private static final String TELE_CON_CLIENT = "teleConClient";

	/**
     * main interface for url responding
     */
    public ModelAndView handleRequest(final HttpServletRequest request,
            final HttpServletResponse response) throws Exception {
        LOG.info("recieved request for " + request.getRequestURI()
                + "?" + request.getQueryString()); 
        Sessioner.checkSession(request.getSession());
        ModelAndView modelAndView = new ModelAndView();
	    try {
	        modelAndView = resolveModelAndView(request);
            return modelAndView;
	    } catch (final Exception e){
	        LOG.error("exception in handleRequest for " 
	                + request.getQueryString() + " msg:: " + e.getMessage());
	        throw e;
	    } finally{
	        LOG.info("going to view::" + modelAndView.getViewName());
	    }
	}

    private boolean boolParam(final String fromClient) {
        return ( (! StringUtil.isEmpty(fromClient))
                && "TRUE".equalsIgnoreCase(fromClient))
                ? true: false;
    }

    /**
     * handle requests to and a telephone consult by popping the window
     * @param request
     * @return
     */
    private ModelAndView doAdd(final HttpServletRequest request) {
        final HttpSession ses = request.getSession();
        final ClinicConsVal currentClinic = 
            (ClinicConsVal) ses.getAttribute(Sessioner.CURRENT_CLINIC);
        final List<ClinicConsVal> clinics = ServPaws.clinics(
                ((Facility) ses.getAttribute(Sessioner.CURRENT_FACILITY)).getNcid()
                , currentClinic);
        final List<Clinician> providers = new ArrayList<Clinician>();
        providers.addAll(ServPaws.clinicians("user", currentClinic.getName()));
        providers.addAll(ServPaws.clinicians("doct", currentClinic.getName()));
        final TeleConClient cli = getClient(request);
        cli.setPawsPatient(ServPaws.patient(request.getParameter("patient_id")));
        ses.setAttribute("clinics", clinics);
        ses.setAttribute("providers", providers);
        return new ModelAndView("telephoneConsults/newTeleCon");
    }
    
    /**
     * handle requests for the second part of adding a telephone consult
     * by getting the consult updating the available information and 
     * forwarding
     * @param req
     * @return
     */
    private ModelAndView doAddPt2(final HttpServletRequest req) {
        final TeleConClient cli = getClient(req);
        cli.setCallbackPhone((String) req.getParameter("callbackNbr"));
        String clinicNcid = (String) req.getParameter("assignedClinic");
//        cli.setClinic(assignedClinicNcid);
        String providerId = (String) req.getParameter("provider");
        LOG.info("do add pt 2: providerP::" + providerId 
                + " clinicId ::" + clinicNcid);
        cli.setProvider(ServPaws.lookupProvider(providerId));
        cli.setReasonForVisit((String) req.getParameter("reason"));
        cli.setUrgency(TeleConUrgencyState.getInstance(
                (String) req.getParameter("urgency")));
        return new ModelAndView("telephoneConsults/teleConEntry");
    }
    
    /**
     * handle requests to display the callback number
     * @param request
     * @return
     */
    private ModelAndView doCallback(final HttpServletRequest request) {
        ModelAndView mav = 
            new ModelAndView("telephoneConsults/teleConCallback");
        mav.addObject("teleConClient", 
                TeleConClient.getInstance(Integer.valueOf(
                        request.getParameter("teleConId"))));
        return mav;
    }
    
    /**
     * isolates the functioning if looking for a client on the schedule
     * @param clientId the id unit number of the person on the schedule 
     * @return the ModelAndView for client view
     */
    private ModelAndView doClient(final HttpServletRequest request) {
        return new ModelAndView("telephoneConsults/client").addObject("client"
                , (StringUtil.isEmpty(request.getParameter("apptId"))) 
                ? null : 
                    TeleConClient.getInstance(Integer.valueOf(
                                request.getParameter("apptId"))));
    }
    
    /**
     * handle requests for the encounter notes
     * @param request
     * @return
     */
    private ModelAndView doNotes(final HttpServletRequest request) {
        final ModelAndView mav = new ModelAndView("telephoneConsults/teleConNotes");
        //        System.out.println(instance);
        mav.addObject("teleConClient", 
                TeleConClient.getInstance(Integer.valueOf(
                        request.getParameter("teleConId"))));
        return mav;
    }

    /**
     * handle requests to remove the telephone consult for instance if the 
     * patient cancelled
     * @param request
     * @return
     */
    private ModelAndView doRemove(final HttpServletRequest request) {
        final ModelAndView mav = new ModelAndView("telephoneConsults/remove");
        mav.addObject("appt", 
                TeleConClient.getInstance(Integer.valueOf(
                        request.getParameter("apptId"))));
        return mav;
    }
    
    /**
     * handle requests to complete the process for removing the telephone 
     * consults
     * @param request
     * @return
     */
    private ModelAndView doRemoveComplete(final HttpServletRequest request) {
        TeleConClient instance = TeleConClient.getInstance(Integer.valueOf(
                request.getParameter("teleConId")));
        TeleConClient.removeInstance(instance);
        return new ModelAndView("telephoneConsults/removeConf");
    }

    /**
     * isolates the functioning if looking for the schedule
     * @param physicianId a placeholder for who's calendar you are getting 
     * @return the ModelAndView for schedule view
     */
    private ModelAndView doSched(HttpServletRequest req){
        final String physicianId = req.getParameter("physicianid"); // no-op
        List<TeleConClient> sched = getSched();
        return new ModelAndView("telephoneConsults/sched").addObject("schedule",
                    sched);
    }
    
    /**
     * handle requests to transfer the telephone consult to another provider.  
     * the actual altha client fails on this in test more so this is more 
     * of a stub
     * @param request
     * @return
     */
    private ModelAndView doTransfer(final HttpServletRequest request) {
        ModelAndView mav = new ModelAndView("telephoneConsults/transfer");//transfer
        final String apptId = request.getParameter("teleConId");
        return mav;
    }
    
    /**
     * the process of resolving the client appt has to be doen thoughout the module
     * so that logic in represented in this singular place
     * @param request
     * @return
     */
    private TeleConClient getClient(final HttpServletRequest request) {
        if (! StringUtil.isEmpty(request.getParameter("teleConId"))) {
            return TeleConClient.getInstance(Integer.valueOf(
                    request.getParameter("teleConId")));
        }
        if (null == request.getSession().getAttribute(TELE_CON_CLIENT)) {
            TeleConClient cli = new TeleConClient();
            final ClinicConsVal clin = (ClinicConsVal) request.getSession().getAttribute(Sessioner.CURRENT_CLINIC);
            cli.setClinic(clin);
            request.getSession().setAttribute(TELE_CON_CLIENT
                    , cli);
        }
        return (TeleConClient) request.getSession()
            .getAttribute(TELE_CON_CLIENT);
    }
    
    /**
	 * get the schedule from the model
	 * @return
	 */
    private List<TeleConClient> getSched() {
        return Hib.template().execute(new HibernateCallback<List<TeleConClient>>() {
            @SuppressWarnings("unchecked")
            public List<TeleConClient> doInHibernate(Session ses)
            throws HibernateException, SQLException {
                return (List<TeleConClient>) ses.createQuery(
                        "from TeleConClient cli order by cli.when asc").list();
            }
        });
    }

    /**
     * check if the data has been updated
     * @param fromWeb
     * @param fromObj
     * @return
     */
    private boolean isUpdated(final String fromWeb, final String fromObj) {
        return ( (! StringUtil.isEmpty(fromWeb)) && 
                ( (StringUtil.isEmpty(fromObj)) || (! fromObj.equals(fromWeb)) ) );
    }

    /**
     * handle requests for opening an telephone consult
     * @param request
     * @return
     */
    private ModelAndView open(final HttpServletRequest request) {
        ModelAndView mav = 
            new ModelAndView("telephoneConsults/teleConEntry");
        mav.addObject(TELE_CON_CLIENT
                , TeleConClient.getInstance(Integer.valueOf(
                        (String) request.getParameter("apptId"))));
        return mav;
    }

    /**
     * isolates the functioning of figuring out what we are looking for
     * @param kind the kind of query
     * @param physicianId a placeholder for who's calendar you are getting 
     * @param clientId the id unit number of the person on the schedule 
     * @return the ModelAndView 
     */
    private ModelAndView resolveModelAndView(final HttpServletRequest request) {
        final String kind = request.getParameter("kind");
        System.out.println(kind);
        if ("sched".equals(kind)) {
            return doSched(request);
        } else if ("client".equals(kind)) {
            return doClient(request); //
        } else if ("add".equals(kind)) {
            return doAdd(request);
        } else if ("addPt2".equals(kind)) {
            return doAddPt2(request);
        } else if ("update".equals(kind)) {
            return update(request);
        } else if ("remove".equals(kind)) {
            return doRemove(request);
        } else if ("removeComplete".equals(kind)) {
            return doRemoveComplete(request);
        } else if ("open".equals(kind)) {
            return open(request);
        } else if ("transfer".equals(kind)) {
            return doTransfer(request);
        } else if ("notes".equals(kind)) {
            return doNotes(request);
        } else if ("callback".equals(kind)) {
            return doCallback(request);
        }
        throw new IllegalStateException("unrecognized kind for " + kind);
    }
    
    /**
     * there is a lot of data in the telephone consutl form so
     * separate out the what was discussed part just to keep things from
     * getting too messy
     * @param request
     * @return
     */
    private TeleConDiscussed unpackDiscussed(final HttpServletRequest request) {
        String alt = request.getParameter("disAlt");
        String dia = request.getParameter("disDiagnosis");
        String med = request.getParameter("disMed");
        String sid = request.getParameter("disSide");
        String und = request.getParameter("disUnd");

        if ( 
                (! StringUtil.isEmpty(alt)) 
                ||   (! StringUtil.isEmpty(dia))
                ||   (! StringUtil.isEmpty(med))
                ||   (! StringUtil.isEmpty(sid))
                ||   (! StringUtil.isEmpty(und))
                   
        ) {
            final TeleConDiscussed dis = new TeleConDiscussed() ;
            dis.setAlternatives(boolParam(alt));
            dis.setDiagnosis(boolParam(dia));
            dis.setMedications(boolParam(med));
            dis.setSideEffects(boolParam(sid));
            dis.setUnderstood(und);
            return dis;
        }
        return null;
    }

    /**
     * isolate the processof creating a follow consult if necessary
     * @param request
     * @return
     */
    private TeleConClient unpackFollowUp(final HttpServletRequest request){
        final String folUpWhen = request.getParameter("fUwhen");
        if (! StringUtil.isEmpty(folUpWhen)) {
            try {
                final TeleConClient fol = new TeleConClient();
                fol.setForTx(request.getParameter("fUforTx"));
                fol.setPrn(boolParam(request.getParameter("fUprn")));
                fol.setApptStatus("scheduled");
                fol.setWhen(DateUtil.parse(folUpWhen));
                fol.setWithPcm(boolParam(request.getParameter("fUwPcm")));
                return fol;
            } catch (RuntimeException e) {
                LOG.error("could not parse date for follow-up telecon::" 
                        + folUpWhen + "||" + e.getLocalizedMessage());
            }
        }
        return null;
    }

    /**
     * handle requests to update the state of a telephone consult
     * @param request
     * @return
     */
    private ModelAndView update(final HttpServletRequest request) {
        // skip clinic for now since paws does not provide an identity lookup -- we will just use the session ServPaws.clinics(facilityNcid, p_prefClinic).
        final TeleConClient cli = getClient(request);
        if (isUpdated(request.getParameter("callbackNbr") , cli.getCallbackPhone())) {
            cli.setCallbackPhone(request.getParameter("callbackNbr"));
        }
        if (isUpdated(request.getParameter("commentson") , cli.getComments())) {
            cli.setComments(request.getParameter("commentson"));
        }
        if (isUpdated(request.getParameter("disposition"), cli.getDisposition())){
            cli.setDisposition(request.getParameter("disposition"));
        }
        if (isUpdated(request.getParameter("eNm"), cli.getEandM())){
            cli.setEandM(request.getParameter("eNm"));
        }
        if (isUpdated(request.getParameter("note"), cli.getNote() )){
            cli.setNote(request.getParameter("note"));
        }
        if (! StringUtil.isEmpty(request.getParameter("outpt"))){
            cli.setOutPatientOk(boolParam(request.getParameter("outpt")));
        }
        
        // TODO
        //        ClinicConsVal clinic = (ClinicConsVal) request.getSession().getAttribute(Sessioner.CURRENT_CLINIC);
        //        String clinicNcid = request.getParameter("assignedClinic");
        //        cli.setClinic(clinic);
        final TeleConDiscussed dis = unpackDiscussed(request);
        if (null != dis && ( (null == cli.getDiscussed()) || (! dis.equals(cli.getDiscussed())) ) ) {
            cli.setDiscussed(dis);
        }
        String prv = request.getParameter("provider");
        if (! StringUtil.isEmpty(prv)) {
            Clinician prov = ServPaws.lookupProvider(prv);
            cli.setProvider(prov);
        }
        
        String urg = request.getParameter("urgency");
        if (! StringUtil.isEmpty(urg)) {
            cli.setUrgency(TeleConUrgencyState.getInstance(urg));
        }
        String whn = request.getParameter("when");
        if (! StringUtil.isEmpty(whn)) {
            cli.setWhen(DateUtil.parse(whn));
        }
        
        Hib.template().saveOrUpdate(cli);
        TeleConClient fol = unpackFollowUp(request);//, clinic);
        if (null != fol) {
            fol.setUrgency(TeleConUrgencyState.getInstance("n/a"));
            fol.setPawsPatient(cli.getPatient());
            fol.setClinic(cli.getClinic());
            fol.setProvider(cli.getProvider());
            Hib.template().saveOrUpdate(fol);
            cli.setFollowUp(fol);
            Hib.template().saveOrUpdate(cli);
        }
       // System.out.println(request.getSession().getAttribute(Sessioner.CURRENT_CLINIC));
        ModelAndView mav = new ModelAndView("telephoneConsults/teleConConfirm");
        request.getSession().removeAttribute(TELE_CON_CLIENT);
        mav.addObject(TELE_CON_CLIENT, cli);
        return mav;
    }



}
