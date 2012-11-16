/**
 * ProviderServiceSoap.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.provider;

public interface ProviderServiceSoap extends java.rmi.Remote {
    public org.tatrc.paws.provider.Provider[] fetchProvidersByLastName(java.lang.String application, java.lang.String username, java.lang.String lastname) throws java.rmi.RemoteException;
    public org.tatrc.paws.provider.Provider[] fetchProvidersByProviderNCID(java.lang.String application, java.lang.String username, java.lang.String providerncid) throws java.rmi.RemoteException;
    public org.tatrc.paws.provider.Provider[] fetchProvidersByUserNCID(java.lang.String application, java.lang.String username, java.lang.String userncid) throws java.rmi.RemoteException;
    public boolean alive() throws java.rmi.RemoteException;
    public java.lang.String version() throws java.rmi.RemoteException;
}
