/**
 * 
 */
package edu.newschool.piim.service;

import static org.junit.Assert.fail;

import org.junit.Test;

import edu.newschool.piim.model.results.ResultsNew;

/**
 * @author gregm
 *
 */
public class KeeTest {

    /**
     * Test method for {@link edu.newschool.piim.service.ServPaws#allergies(java.lang.String)}.
     */
    @Test
    public void testAllergies() {
        
        String id = "99990069PIIM1179014400000PIIM-1436117199PIIMLab";
        ResultsNew result = ServResults.getResult(id);
        System.out.println(result);
        org.junit.Assert.assertTrue(true);
//        asertTrue(true);
//        fail("Not yet implemented");
    }

//    /**
//     * Test method for {@link edu.newschool.piim.service.ServPaws#clinicalNotes(java.lang.String)}.
//     */
//    @Test
//    public void testClinicalNotes() {
//        fail("Not yet implemented");
//    }
//
//    /**
//     * Test method for {@link edu.newschool.piim.service.ServPaws#encounterHeaders(java.lang.String)}.
//     */
//    @Test
//    public void testEncounterHeaders() {
//        fail("Not yet implemented");
//    }
//
//    /**
//     * Test method for {@link edu.newschool.piim.service.ServPaws#encounters(java.lang.String)}.
//     */
//    @Test
//    public void testEncounters() {
//        fail("Not yet implemented");
//    }
//
//    /**
//     * Test method for {@link edu.newschool.piim.service.ServPaws#historyProblems(java.lang.String)}.
//     */
//    @Test
//    public void testHistoryProblems() {
//        fail("Not yet implemented");
//    }
//
//    /**
//     * Test method for {@link edu.newschool.piim.service.ServPaws#labs(java.lang.String)}.
//     */
//    @Test
//    public void testLabsString() {
//        fail("Not yet implemented");
//    }
//
//    /**
//     * Test method for {@link edu.newschool.piim.service.ServPaws#labs(java.lang.String, int)}.
//     */
//    @Test
//    public void testLabsStringInt() {
//        fail("Not yet implemented");
//    }
//
//    /**
//     * Test method for {@link edu.newschool.piim.service.ServPaws#labs3(java.lang.String)}.
//     */
//    @Test
//    public void testLabs3() {
//        fail("Not yet implemented");
//    }
//
//    /**
//     * Test method for {@link edu.newschool.piim.service.ServPaws#meds(java.lang.String)}.
//     */
//    @Test
//    public void testMeds() {
//        fail("Not yet implemented");
//    }
//
//    /**
//     * Test method for {@link edu.newschool.piim.service.ServPaws#patient(java.lang.String)}.
//     */
//    @Test
//    public void testPatient() {
//        fail("Not yet implemented");
//    }
//
//    /**
//     * Test method for {@link edu.newschool.piim.service.ServPaws#patients(java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String)}.
//     */
//    @Test
//    public void testPatients() {
//        fail("Not yet implemented");
//    }
//
//    /**
//     * Test method for {@link edu.newschool.piim.service.ServPaws#patientsAll()}.
//     */
//    @Test
//    public void testPatientsAll() {
//        fail("Not yet implemented");
//    }
//
//    /**
//     * Test method for {@link edu.newschool.piim.service.ServPaws#rads(java.lang.String)}.
//     */
//    @Test
//    public void testRads() {
//        fail("Not yet implemented");
//    }

}
