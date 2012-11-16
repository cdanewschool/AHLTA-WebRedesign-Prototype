package edu.newschool.piim.service;

import java.util.List;

import edu.newschool.piim.Setup;
import edu.newschool.piim.model.mySchedule.Appointment;
import edu.newschool.piim.model.results.ResultStatus;
import edu.newschool.piim.model.results.ResultsNew;

import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;

public class ServApptsTest {
    
    @Before
    public void setUp() throws Exception {
        ApplicationContext ctx = Setup.getCtx();
        ctx.getBean("hib");//init
    }

    //99990069PIIM1179014400000PIIM-1436117199PIIMLab
    @Test
    public void test2sultsNew() {
//        List<Appointment> schedule = ServAppts.getSchedule();
//        for (Appointment a: schedule) {
//            System.out.println(a);
//            System.out.println();
//        }
////        String testId = "99990069PIIM1179014400000PIIM-1436117199PIIMLab";
////        ResultStatus f = ServResults.resultSaved(testId);
////        System.out.println(f);
////        ResultStatus g = ServResults.resultReviewed(testId);
////        System.out.println(g);
////        ResultStatus h = ServResults.resultForward(testId);
////        System.out.println(h);
        
    }
    

//    @Test
//    public void testGetResultsNew() {
//        String unitNbr = "99990069";//null;//"99990068";
//        List<ResultsNew> resN = ServResults.getResultsNew(unitNbr);
//        for (ResultsNew n: resN) {
//            System.out.println(n);
//        }
//    }

    
    
    
    
//    @Test
//    public void testGetResultsNew() {
//        String unitNbr = null;//"99990068";
//        List<ResultsNew> resN = ServResults.getResultsNew(unitNbr);
//        for (ResultsNew n: resN) {
//            System.out.println(n);
//        }
//    }
    
    
    
    
}
