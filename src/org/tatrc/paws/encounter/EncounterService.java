/**
 * EncounterService.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.encounter;

public interface EncounterService extends javax.xml.rpc.Service {
    public java.lang.String getEncounterServiceSoap12Address();

    public org.tatrc.paws.encounter.EncounterServiceSoap getEncounterServiceSoap12() throws javax.xml.rpc.ServiceException;

    public org.tatrc.paws.encounter.EncounterServiceSoap getEncounterServiceSoap12(java.net.URL portAddress) throws javax.xml.rpc.ServiceException;
    public java.lang.String getEncounterServiceSoapAddress();

    public org.tatrc.paws.encounter.EncounterServiceSoap getEncounterServiceSoap() throws javax.xml.rpc.ServiceException;

    public org.tatrc.paws.encounter.EncounterServiceSoap getEncounterServiceSoap(java.net.URL portAddress) throws javax.xml.rpc.ServiceException;
}
