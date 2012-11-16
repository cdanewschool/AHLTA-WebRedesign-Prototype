package edu.newschool.piim.web;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import edu.newschool.piim.model.facility.ClinicConsVal;
import edu.newschool.piim.model.facility.Clinician;
import edu.newschool.piim.model.facility.Facility;
import edu.newschool.piim.service.ServPaws;

public class Sessioner {
    
    /**
     * token for the current clinic in the session
     */
    static final String CURRENT_CLINIC = "current_clinic";
    
    /**
     * token for eth current facility
     */
    static final String CURRENT_FACILITY = "current_facility";
    
    /**
     * set up a default clinic 
     * @return
     */
    private static ClinicConsVal defaultClinic() {
        final ClinicConsVal clin = new ClinicConsVal();
        clin.setContext("2000");
        clin.setName("CHCSII Test Clinic");
        clin.setNcid("1047450");
        return clin;
    }

    /**
     * set up a default facility
     * @return
     */
    private static Facility defaultFacility() {
        final Facility fac = new Facility();
        fac.setContext("2000");
        fac.setName("CHCSII ITT Facility");
        fac.setNcid("1046961");
        return fac;
    }

    /**
     * check the session for the required clinic and facility
     * @param ses
     */
    static void checkSession(HttpSession ses) {
        if (ses.isNew()) {
            Facility defaultFacility = defaultFacility();
            ClinicConsVal defaultClinic = defaultClinic();
            ses.setAttribute(CURRENT_FACILITY, defaultFacility);
            ses.setAttribute(CURRENT_CLINIC, defaultClinic);
            
            List<ClinicConsVal> clinics = ServPaws.clinics(defaultFacility.getNcid(), defaultClinic);
            ses.setAttribute("clinics", clinics);
            List<Clinician> providers = new ArrayList<Clinician>();
            providers.addAll(ServPaws.clinicians("user", defaultClinic.getName()));
            providers.addAll(ServPaws.clinicians("davi", defaultClinic.getName()));
            ses.setAttribute("providers", providers);

        }
        if (null == ses.getAttribute("clinics")) {
            ClinicConsVal defaultClinic = defaultClinic();
            List<ClinicConsVal> clinics = ServPaws.clinics(defaultClinic.getNcid(), defaultClinic);
            ses.setAttribute("clinics", clinics);
        }
        if (null == ses.getAttribute("providers")) {
            ClinicConsVal defaultClinic = defaultClinic();
            List<Clinician> providers = new ArrayList<Clinician>();
            providers.addAll(ServPaws.clinicians("user", defaultClinic.getName()));
            providers.addAll(ServPaws.clinicians("davi", defaultClinic.getName()));
            ses.setAttribute("providers", providers);
        }
        
        if (null == ses.getAttribute(CURRENT_CLINIC)) {
            ses.setAttribute(CURRENT_CLINIC, defaultClinic());
        }
        if (null == ses.getAttribute(CURRENT_FACILITY)) {
            ses.setAttribute(CURRENT_FACILITY, defaultFacility());
            System.out.println("setting default facility" );
        }

    }

    
}
