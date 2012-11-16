/**
 * DocumentServiceSoap.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.documents;

public interface DocumentServiceSoap extends java.rmi.Remote {
    public org.tatrc.paws.documents.Document[] fetchDocumentHeaders(java.lang.String application, java.lang.String username, java.lang.String unitnumber, int lastn) throws java.rmi.RemoteException;
    public org.tatrc.paws.documents.Document[] fetchDocument(java.lang.String application, java.lang.String username, java.lang.String unitnumber, java.lang.String id, org.tatrc.paws.documents.EnumDocumentFormat format) throws java.rmi.RemoteException;
    public boolean alive() throws java.rmi.RemoteException;
    public java.lang.String version() throws java.rmi.RemoteException;
}
