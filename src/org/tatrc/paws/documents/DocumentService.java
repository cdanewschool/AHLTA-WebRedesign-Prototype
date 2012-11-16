/**
 * DocumentService.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.documents;

public interface DocumentService extends javax.xml.rpc.Service {
    public java.lang.String getDocumentServiceSoap12Address();

    public org.tatrc.paws.documents.DocumentServiceSoap getDocumentServiceSoap12() throws javax.xml.rpc.ServiceException;

    public org.tatrc.paws.documents.DocumentServiceSoap getDocumentServiceSoap12(java.net.URL portAddress) throws javax.xml.rpc.ServiceException;
    public java.lang.String getDocumentServiceSoapAddress();

    public org.tatrc.paws.documents.DocumentServiceSoap getDocumentServiceSoap() throws javax.xml.rpc.ServiceException;

    public org.tatrc.paws.documents.DocumentServiceSoap getDocumentServiceSoap(java.net.URL portAddress) throws javax.xml.rpc.ServiceException;
}
