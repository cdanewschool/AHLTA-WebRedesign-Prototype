package edu.newschool.piim.web;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
import edu.newschool.piim.model.mySchedule.ApptClient;
import edu.newschool.piim.service.ServPaws;
import edu.newschool.piim.util.DateUtil;
import edu.newschool.piim.util.Hib;
import edu.newschool.piim.util.StringUtil;

/**
 * web interface for the appointments module
 * 
 * @author gregm
 *
 */
public class CntrlAppointments implements Controller {

    /**
     * set up the appointment types map first at class load time 
     */
    private static final Map<String, String> APPT_TYPES = initTypesMap();

    /**
     * constant for last removed
     */
    private static final String LAST_REMOVED = "lastRemoved";

	/**
     * static accessor to the system log
     */
	private static final Log LOG = LogFactory.getLog(CntrlAppointments.class);

    
    /**
     * make the current set of appointments by starting from today go back one month 
     * and make 3 appointments each day as long as it is not saturday ofr sunday and contimue
     * until the month after today three months all together
     * 
     * sorted from old to new 
     * @return a list of appointments
     */
    private static List<ApptClient> getSched() {
        return Hib.template().execute(new HibernateCallback<List<ApptClient>>() {
            @SuppressWarnings("unchecked")
            public List<ApptClient> doInHibernate(Session ses)
            throws HibernateException, SQLException {
                return (List<ApptClient>) ses.createQuery(
                        "from ApptClient cli order by cli.apptStart asc").list();
            }
        });
    }
    
    /**
     * the interface represents this data on the fron end, but the 
     * source of this data in paws is unclear.  perhaps it is not there.
     * in any case, the fron end calls for it, so we encode it here 
     * @return
     */
    private static final Map<String, String> initTypesMap() {
        final Map<String, String> types = new HashMap<String, String>();
        types.put("acut", "Acute Appt");
        types.put("est", "Established Follow Up Appt ");
        types.put("proc", "Procedure Appt");
        types.put("rout", "Routine");
        types.put("tcon", "Telephone Consult");
        types.put("well", "Wellness/Health Promotion Appt");
        return types;
    }
    

    /**
	 * the name of the jsp for the clientview configured via spring framework
	 */
	private String _clientView;// = "appointments/client";

    /**
     * the name of the jsp for the schedule view configured via spring framework
     */
    private String _schedView;// = "appointments/sched";

    /**
     * main interface for url responding.  this component makes use of the 
     * session so that is set up first
     */
    public ModelAndView handleRequest(final HttpServletRequest request,
            final HttpServletResponse response) throws Exception {
        LOG.info("recieved request for " + request.getRequestURI()
                + "?" + request.getQueryString()); 
        Sessioner.checkSession(request.getSession());
        ModelAndView mav = new ModelAndView();
	    try {
	        mav = resolveModelAndView(request);
            return mav;
	    } catch (final Exception e){
	        LOG.error("exception in handleRequest for " 
	                + request.getQueryString() + " msg:: " 
	                + e.getMessage());
	        throw e;
	    } finally{
	        LOG.info("going to view::" + mav.getViewName());
	    }
	}
    
    /**
     * allow spring to set the name for the client view
     * 
     * @param clientView the path to the jsp
     */
    public void setClientView(String clientView) {
        this._clientView = clientView;
    }

    /**
     * allow spring to set the name for the schedule view
     * 
     * @param schedView the path to the jsp
     */
    public void setSchedView(String schedView) {
        this._schedView = schedView;
    }
    
    /**
     * respond to requests for adding an appointment by getting the providers, 
     * clinics and paws patient and creating the initial appointment 
     * @param request
     * @return
     */
    private ModelAndView doAdd(final HttpServletRequest request) {
        ClinicConsVal currentClinic = 
            (ClinicConsVal) request.getSession().getAttribute(
                    Sessioner.CURRENT_CLINIC);
        List<ClinicConsVal> clinics = ServPaws.clinics(
                ((Facility) request.getSession().getAttribute(
                        Sessioner.CURRENT_FACILITY)).getNcid()
                        , currentClinic);
        List<Clinician> providers = new ArrayList<Clinician>();
        providers.addAll(ServPaws.clinicians("user", currentClinic.getName()));
        providers.addAll(ServPaws.clinicians("davi", currentClinic.getName()));
        ModelAndView mav = new ModelAndView("appointments/newAppt");
        mav.addObject("providers", providers);
        mav.addObject("clinics", clinics);
        ApptClient cli = new ApptClient();
        cli.setPawsPatient(ServPaws.patient(request.getParameter("patient_id")));
        mav.addObject("patient", cli);
        return mav;
    }

    /**
     * respond to requests for addcompleted by querrying the form and building 
     * a completed appointment.  if all goes well the appointment is persisted.
     * @param req
     * @return
     */
    private ModelAndView doAddComplete(final HttpServletRequest req) {
        final ApptClient cli = new ApptClient();
        cli.setPawsPatient(ServPaws.patient(req.getParameter("patientUnitNb")));
        cli.setUsvType(req.getParameter("usvType"));
        cli.setObservation(Boolean.valueOf(req.getParameter("observation")));
        cli.setOutpatOk(req.getParameter("outpatOk"));
        cli.setRel2Inpat(req.getParameter("rel2Inpat"));
        cli.setRel2Inj(req.getParameter("rel2Inj"));
        cli.setUrgency(req.getParameter("urgency"));
        cli.setApptStart(DateUtil.parse(req.getParameter("dateTime"))); // makeDate(16, 10, 2009, 15, 0));
        
        if (! StringUtil.isEmpty(req.getParameter("apptType"))) {
            cli.setApptKind(APPT_TYPES.get(req.getParameter("apptType")));
        }
        cli.setClassification(req.getParameter("apptClass"));
        cli.setClinic(req.getParameter("assignedClinic"));
        cli.setCallbackPhone(req.getParameter("callbackNbr"));
        cli.setProvider(req.getParameter("provider"));
        cli.setReasonForVisit(req.getParameter("reason"));
        cli.setComments(req.getParameter("comments"));
        cli.setApptStatus("scheduled");
        Hib.template().persist(cli);
        return new ModelAndView();
    }
    
    /**
     * respond to requests for patient checkin to the appointment
     * get the appt and trigger its checkin function
     * @param request
     * @return
     */
    private ModelAndView doCheckin(final HttpServletRequest request){
        ApptClient instance = ApptClient.getInstance(
                Integer.valueOf(request.getParameter("apptId")));
        instance.checkin();
        return doClient(request);
    }
    
    /**
     * respond to requests for patient checkout of the appointment by
     * getting the instance and triggering its checkout function
     * @param request
     * @return
     */
    private ModelAndView doCheckout(final HttpServletRequest request) {
        ApptClient instance = ApptClient.getInstance(
                Integer.valueOf(request.getParameter("apptId")));
        instance.checkout();
        return doClient(request);
    }
    
    /**
     * isolates the functioning if looking for a client on the schedule
     * @param clientId the id unit number of the person on the schedule 
     * @return the ModelAndView for client view
     */
    private ModelAndView doClient(final HttpServletRequest request) {
        final String apptId = request.getParameter("apptId");
        final ApptClient instance = ApptClient.getInstance(Integer.valueOf(apptId));
        return new ModelAndView(_clientView).addObject("client"
                , (StringUtil.isEmpty(apptId)) ? null : instance);
    }
    
    /**
     * respond to requests for removing the appointment by getting the appt
     * and putting it in the request scope
     * @param request
     * @return
     */
    private ModelAndView doRemove(final HttpServletRequest request) {
        final ModelAndView mav = new ModelAndView("appointments/remove");
        final ApptClient instance = 
            ApptClient.getInstance(
                    Integer.valueOf(request.getParameter("apptId")));
        mav.addObject("appt", instance);
        return mav;

    }

    /**
     * repsond to requests to complete the process of removing an appointment 
     * by deleting the object but keeping a backup in the session which if the 
     * next action is undo remove then we bring the object back otherwise it 
     * is purged from the session
     * @param request
     * @return
     */
    private ModelAndView doRemoveComplete(final HttpServletRequest request) {
        final ApptClient instance = 
            ApptClient.getInstance(
                    Integer.valueOf(request.getParameter("apptId")));
        request.getSession().setAttribute(LAST_REMOVED, instance);
        ApptClient.removeInstance(instance);
        return new ModelAndView("appointments/removeConf");
    }
    
    /**
     * isolates the functioning if looking for the schedule
     * @param physicianId a placeholder for who's calendar you are getting 
     * @return the ModelAndView for schedule view
     */
    private ModelAndView doSched(HttpServletRequest req){
        return new ModelAndView(_schedView).addObject("schedule", getSched());
    }
    
    /**
     * respond to requests to sign the appointment
     * @param request
     * @return
     */
    private ModelAndView doSign(final HttpServletRequest request) {
        final ApptClient instance = 
            ApptClient.getInstance(
                    Integer.valueOf(request.getParameter("apptId")));
        instance.sign();
        return doClient(request);
    }
    
    /**
     * transfer is not functional in the altha test client so we just stub it
     * @param request
     * @return
     */
    private ModelAndView doTransfer(final HttpServletRequest request) {
        ModelAndView mav = new ModelAndView("appointments/transfer");//transfer
        ApptClient instance = ApptClient.getInstance(Integer.valueOf(request.getParameter("apptId")));
        mav.addObject("appt", instance);
//        instance.transfer();
        return mav;
    }

    /**
     * respond to requsts to undo the last remove by taking the backup from 
     * the session and persisting it
     * @param request
     * @return
     */
    private ModelAndView doUndoRemove(final HttpServletRequest request) {
        final ApptClient remd = (ApptClient) request.getSession().getAttribute(LAST_REMOVED);
        if (null != remd) {
            final ApptClient cli = new ApptClient();
            cli.setPawsPatient(remd.getPatient());
            cli.setUsvType(remd.getUsvType());
            cli.setObservation(remd.getObservation());
            cli.setOutpatOk(remd.getOutpatOk());
            cli.setRel2Inpat(remd.getRel2Inpat());
            cli.setRel2Inj(remd.getRel2Inj());
            cli.setUrgency(remd.getUrgency());
            cli.setApptStart(remd.getApptStart());
            cli.setApptKind(remd.getApptKind());
            cli.setClassification(remd.getClassification());
            cli.setClinic(remd.getClinic());
            cli.setCallbackPhone(remd.getCallbackPhone());
            cli.setProvider(remd.getProvider());
            cli.setReasonForVisit(remd.getReasonForVisit());
            cli.setComments(remd.getComments());
            cli.setApptStatus(remd.getApptStatus());
            Hib.template().persist(cli);
            request.getSession().removeAttribute(LAST_REMOVED);
        }
        return new ModelAndView();
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
//            request.getSession().removeAttribute(LAST_REMOVED);
            return doSched(request);
        } else if ("client".equals(kind)) {
//            request.getSession().removeAttribute(LAST_REMOVED);
            return doClient(request); //
        } else if ("checkin".equals(kind)) {
//            request.getSession().removeAttribute(LAST_REMOVED);
            return doCheckin(request); //
        } else if ("checkout".equals(kind)) {
//            request.getSession().removeAttribute(LAST_REMOVED);
            return doCheckout(request); //
        } else if ("add".equals(kind)) {
//            request.getSession().removeAttribute(LAST_REMOVED);
            return doAdd(request);
        } else if ("addComplete".equals(kind)) {
//            request.getSession().removeAttribute(LAST_REMOVED);
            return doAddComplete(request);
        } else if ("remove".equals(kind)) {
//            request.getSession().removeAttribute(LAST_REMOVED);
            return doRemove(request);
        } else if ("removeComplete".equals(kind)) {
            return doRemoveComplete(request);
        } else if ("undoRemove".equals(kind)) {
            return doUndoRemove(request);
        } else if ("transfer".equals(kind)) {
            return doTransfer(request);
        } else if ("sign".equals(kind)) {
            return doSign(request);
        }
        throw new IllegalStateException("unrecognized kind for " + kind);
    }



}
