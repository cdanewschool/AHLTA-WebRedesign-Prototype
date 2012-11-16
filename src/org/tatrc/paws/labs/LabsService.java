/**
 * LabsService.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.labs;

public interface LabsService extends javax.xml.rpc.Service {
    public java.lang.String getLabsServiceSoapAddress();

    public org.tatrc.paws.labs.LabsServiceSoap getLabsServiceSoap() throws javax.xml.rpc.ServiceException;

    public org.tatrc.paws.labs.LabsServiceSoap getLabsServiceSoap(java.net.URL portAddress) throws javax.xml.rpc.ServiceException;
    public java.lang.String getLabsServiceSoap12Address();

    public org.tatrc.paws.labs.LabsServiceSoap getLabsServiceSoap12() throws javax.xml.rpc.ServiceException;

    public org.tatrc.paws.labs.LabsServiceSoap getLabsServiceSoap12(java.net.URL portAddress) throws javax.xml.rpc.ServiceException;
}
