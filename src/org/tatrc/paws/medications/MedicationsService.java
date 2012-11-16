/**
 * MedicationsService.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.medications;

public interface MedicationsService extends javax.xml.rpc.Service {
    public java.lang.String getMedicationsServiceSoap12Address();

    public org.tatrc.paws.medications.MedicationsServiceSoap getMedicationsServiceSoap12() throws javax.xml.rpc.ServiceException;

    public org.tatrc.paws.medications.MedicationsServiceSoap getMedicationsServiceSoap12(java.net.URL portAddress) throws javax.xml.rpc.ServiceException;
    public java.lang.String getMedicationsServiceSoapAddress();

    public org.tatrc.paws.medications.MedicationsServiceSoap getMedicationsServiceSoap() throws javax.xml.rpc.ServiceException;

    public org.tatrc.paws.medications.MedicationsServiceSoap getMedicationsServiceSoap(java.net.URL portAddress) throws javax.xml.rpc.ServiceException;
}
