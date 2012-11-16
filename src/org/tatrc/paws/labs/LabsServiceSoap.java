/**
 * LabsServiceSoap.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.labs;

public interface LabsServiceSoap extends java.rmi.Remote {
    public org.tatrc.paws.labs.Lab[] fetchResultedLabsEx(java.lang.String application, java.lang.String username, java.lang.String unitnumber, org.tatrc.paws.labs.MedViewFilter medviewfilter, java.util.Calendar startdate, java.util.Calendar enddate, int lastn) throws java.rmi.RemoteException;
    public org.tatrc.paws.labs.Lab[] fetchResultedLabs(java.lang.String application, java.lang.String username, java.lang.String unitnumber, int lastn) throws java.rmi.RemoteException;
    public boolean alive() throws java.rmi.RemoteException;
    public java.lang.String version() throws java.rmi.RemoteException;
}
