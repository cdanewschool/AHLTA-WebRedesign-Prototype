package edu.newschool.piim.service;

import static org.junit.Assert.*;

import org.junit.Test;

public class ServPawsTest {

    private String unitNumber = "99990070";
    @Test
    public void testAllergies() {
        assertNotNull(ServPaws.allergies(unitNumber));
    }

    @Test
    public void testClinicalNotes() {
        assertNotNull(ServPaws.clinicalNotes(unitNumber));
    }

    @Test
    public void testEncounterHeaders() {
        assertNotNull(ServPaws.encounterHeaders(unitNumber));
    }

    @Test
    public void testEncounters() {
        assertNotNull(ServPaws.encounters(unitNumber));
    }

    @Test
    public void testHistoryProblems() {
        assertNotNull(ServPaws.historyProblems(unitNumber));
    }

    @Test
    public void testLabsString() {
        assertNotNull(ServPaws.labs(unitNumber));
    }

    @Test
    public void testLabs3() {
        assertNotNull(ServPaws.labs3(unitNumber));
    }

    @Test
    public void testMeds() {
        assertNotNull(ServPaws.meds(unitNumber));
    }

    @Test
    public void testPatient() {
        assertNotNull(ServPaws.patient(unitNumber));
    }

    @Test
    public void testRads() {
        assertNotNull(ServPaws.rads(unitNumber));
    }

}
