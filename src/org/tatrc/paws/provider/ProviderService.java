/**
 * ProviderService.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.provider;

public interface ProviderService extends javax.xml.rpc.Service {
    public java.lang.String getProviderServiceSoapAddress();

    public org.tatrc.paws.provider.ProviderServiceSoap getProviderServiceSoap() throws javax.xml.rpc.ServiceException;

    public org.tatrc.paws.provider.ProviderServiceSoap getProviderServiceSoap(java.net.URL portAddress) throws javax.xml.rpc.ServiceException;
    public java.lang.String getProviderServiceSoap12Address();

    public org.tatrc.paws.provider.ProviderServiceSoap getProviderServiceSoap12() throws javax.xml.rpc.ServiceException;

    public org.tatrc.paws.provider.ProviderServiceSoap getProviderServiceSoap12(java.net.URL portAddress) throws javax.xml.rpc.ServiceException;
}
