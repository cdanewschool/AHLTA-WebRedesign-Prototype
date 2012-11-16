/**
 * RadiologyService.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.radiology;

public interface RadiologyService extends javax.xml.rpc.Service {
    public java.lang.String getRadiologyServiceSoap12Address();

    public org.tatrc.paws.radiology.RadiologyServiceSoap getRadiologyServiceSoap12() throws javax.xml.rpc.ServiceException;

    public org.tatrc.paws.radiology.RadiologyServiceSoap getRadiologyServiceSoap12(java.net.URL portAddress) throws javax.xml.rpc.ServiceException;
    public java.lang.String getRadiologyServiceSoapAddress();

    public org.tatrc.paws.radiology.RadiologyServiceSoap getRadiologyServiceSoap() throws javax.xml.rpc.ServiceException;

    public org.tatrc.paws.radiology.RadiologyServiceSoap getRadiologyServiceSoap(java.net.URL portAddress) throws javax.xml.rpc.ServiceException;
}
