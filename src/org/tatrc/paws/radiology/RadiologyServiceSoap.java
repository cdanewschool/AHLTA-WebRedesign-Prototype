/**
 * RadiologyServiceSoap.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.radiology;

public interface RadiologyServiceSoap extends java.rmi.Remote {
    public org.tatrc.paws.radiology.RadiologyResult[] fetchRadiologyResultsEx(java.lang.String application, java.lang.String username, java.lang.String unitnumber, java.util.Calendar startdate, java.util.Calendar enddate, int lastn) throws java.rmi.RemoteException;
    public org.tatrc.paws.radiology.RadiologyResult[] fetchRadiologyResults(java.lang.String application, java.lang.String username, java.lang.String unitnumber) throws java.rmi.RemoteException;
    public boolean alive() throws java.rmi.RemoteException;
    public java.lang.String version() throws java.rmi.RemoteException;
}
