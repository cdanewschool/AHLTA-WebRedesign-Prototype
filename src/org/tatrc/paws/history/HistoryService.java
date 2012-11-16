/**
 * HistoryService.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.history;

public interface HistoryService extends javax.xml.rpc.Service {
    public java.lang.String getHistoryServiceSoap12Address();

    public org.tatrc.paws.history.HistoryServiceSoap getHistoryServiceSoap12() throws javax.xml.rpc.ServiceException;

    public org.tatrc.paws.history.HistoryServiceSoap getHistoryServiceSoap12(java.net.URL portAddress) throws javax.xml.rpc.ServiceException;
    public java.lang.String getHistoryServiceSoapAddress();

    public org.tatrc.paws.history.HistoryServiceSoap getHistoryServiceSoap() throws javax.xml.rpc.ServiceException;

    public org.tatrc.paws.history.HistoryServiceSoap getHistoryServiceSoap(java.net.URL portAddress) throws javax.xml.rpc.ServiceException;
}
