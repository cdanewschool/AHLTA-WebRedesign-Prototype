/**
 * PatientService.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.patient;

public interface PatientService extends javax.xml.rpc.Service {
    public java.lang.String getPatientServiceSoap12Address();

    public org.tatrc.paws.patient.PatientServiceSoap getPatientServiceSoap12() throws javax.xml.rpc.ServiceException;

    public org.tatrc.paws.patient.PatientServiceSoap getPatientServiceSoap12(java.net.URL portAddress) throws javax.xml.rpc.ServiceException;
    public java.lang.String getPatientServiceSoapAddress();

    public org.tatrc.paws.patient.PatientServiceSoap getPatientServiceSoap() throws javax.xml.rpc.ServiceException;

    public org.tatrc.paws.patient.PatientServiceSoap getPatientServiceSoap(java.net.URL portAddress) throws javax.xml.rpc.ServiceException;
}
