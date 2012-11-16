/**
 * SecurityService.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.security;

public interface SecurityService extends javax.xml.rpc.Service {
    public java.lang.String getSecurityServiceSoapAddress();

    public org.tatrc.paws.security.SecurityServiceSoap getSecurityServiceSoap() throws javax.xml.rpc.ServiceException;

    public org.tatrc.paws.security.SecurityServiceSoap getSecurityServiceSoap(java.net.URL portAddress) throws javax.xml.rpc.ServiceException;
    public java.lang.String getSecurityServiceSoap12Address();

    public org.tatrc.paws.security.SecurityServiceSoap getSecurityServiceSoap12() throws javax.xml.rpc.ServiceException;

    public org.tatrc.paws.security.SecurityServiceSoap getSecurityServiceSoap12(java.net.URL portAddress) throws javax.xml.rpc.ServiceException;
}
