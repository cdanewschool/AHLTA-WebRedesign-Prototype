/**
 * PatientServiceSoap.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.patient;

public interface PatientServiceSoap extends java.rmi.Remote {
    public org.tatrc.paws.patient.Patient[] fetchPatients(java.lang.String application, java.lang.String username, java.lang.String lastname, java.lang.String firstname, java.lang.String dob, java.lang.String uic, java.lang.String ssn, java.lang.String fmp, java.lang.String sponsorssn, java.lang.String sex) throws java.rmi.RemoteException;
    public org.tatrc.paws.patient.Patient[] fetchPatient(java.lang.String application, java.lang.String username, java.lang.String unitnumber) throws java.rmi.RemoteException;
    public org.tatrc.paws.patient.Patient[] fetchPatientsByDeersID(java.lang.String application, java.lang.String username, java.lang.String deersid) throws java.rmi.RemoteException;
    public boolean alive() throws java.rmi.RemoteException;
    public java.lang.String version() throws java.rmi.RemoteException;
}
