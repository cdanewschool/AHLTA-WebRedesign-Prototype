/**
 * MedicationsServiceSoap.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.medications;

public interface MedicationsServiceSoap extends java.rmi.Remote {
    public org.tatrc.paws.medications.Medication[] fetchDispensedMeds(java.lang.String application, java.lang.String username, java.lang.String unitnumber) throws java.rmi.RemoteException;
    public org.tatrc.paws.medications.Medication[] fetchDispensedMedsEx(java.lang.String application, java.lang.String username, java.lang.String unitnumber, org.tatrc.paws.medications.MedViewFilter medviewfilter, java.util.Calendar startdate, java.util.Calendar enddate) throws java.rmi.RemoteException;
    public boolean alive() throws java.rmi.RemoteException;
    public java.lang.String version() throws java.rmi.RemoteException;
}
