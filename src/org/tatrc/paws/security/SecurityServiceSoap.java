/**
 * SecurityServiceSoap.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.security;

public interface SecurityServiceSoap extends java.rmi.Remote {
    public boolean authenticateCredentials(java.lang.String userid, java.lang.String password) throws java.rmi.RemoteException;
    public boolean validateXMLProxyIDEx(java.lang.String tuxtoken, java.lang.String userncid, java.lang.String facilityncid) throws java.rmi.RemoteException;
    public boolean alive() throws java.rmi.RemoteException;
    public java.lang.String version() throws java.rmi.RemoteException;
}
