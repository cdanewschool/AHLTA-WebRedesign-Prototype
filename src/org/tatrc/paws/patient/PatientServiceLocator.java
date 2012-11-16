/**
 * PatientServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.patient;

public class PatientServiceLocator extends org.apache.axis.client.Service implements org.tatrc.paws.patient.PatientService {

    public PatientServiceLocator() {
    }


    public PatientServiceLocator(org.apache.axis.EngineConfiguration config) {
        super(config);
    }

    public PatientServiceLocator(java.lang.String wsdlLoc, javax.xml.namespace.QName sName) throws javax.xml.rpc.ServiceException {
        super(wsdlLoc, sName);
    }

    // Use to get a proxy class for PatientServiceSoap12
    private java.lang.String PatientServiceSoap12_address = "http://10.0.1.6/DoD.TATRC.PAWS/PatientService.asmx";
//    private java.lang.String PatientServiceSoap12_address = "http://localhost:8888/DoD.TATRC.PAWS/PatientService.asmx";

    public java.lang.String getPatientServiceSoap12Address() {
        return PatientServiceSoap12_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String PatientServiceSoap12WSDDServiceName = "PatientServiceSoap12";

    public java.lang.String getPatientServiceSoap12WSDDServiceName() {
        return PatientServiceSoap12WSDDServiceName;
    }

    public void setPatientServiceSoap12WSDDServiceName(java.lang.String name) {
        PatientServiceSoap12WSDDServiceName = name;
    }

    public org.tatrc.paws.patient.PatientServiceSoap getPatientServiceSoap12() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(PatientServiceSoap12_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getPatientServiceSoap12(endpoint);
    }

    public org.tatrc.paws.patient.PatientServiceSoap getPatientServiceSoap12(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            org.tatrc.paws.patient.PatientServiceSoap12Stub _stub = new org.tatrc.paws.patient.PatientServiceSoap12Stub(portAddress, this);
            _stub.setPortName(getPatientServiceSoap12WSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setPatientServiceSoap12EndpointAddress(java.lang.String address) {
        PatientServiceSoap12_address = address;
    }


    // Use to get a proxy class for PatientServiceSoap
    private java.lang.String PatientServiceSoap_address = "http://10.0.1.6/DoD.TATRC.PAWS/PatientService.asmx";

    public java.lang.String getPatientServiceSoapAddress() {
        return PatientServiceSoap_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String PatientServiceSoapWSDDServiceName = "PatientServiceSoap";

    public java.lang.String getPatientServiceSoapWSDDServiceName() {
        return PatientServiceSoapWSDDServiceName;
    }

    public void setPatientServiceSoapWSDDServiceName(java.lang.String name) {
        PatientServiceSoapWSDDServiceName = name;
    }

    public org.tatrc.paws.patient.PatientServiceSoap getPatientServiceSoap() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(PatientServiceSoap_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getPatientServiceSoap(endpoint);
    }

    public org.tatrc.paws.patient.PatientServiceSoap getPatientServiceSoap(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            org.tatrc.paws.patient.PatientServiceSoapStub _stub = new org.tatrc.paws.patient.PatientServiceSoapStub(portAddress, this);
            _stub.setPortName(getPatientServiceSoapWSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setPatientServiceSoapEndpointAddress(java.lang.String address) {
        PatientServiceSoap_address = address;
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     * This service has multiple ports for a given interface;
     * the proxy implementation returned may be indeterminate.
     */
    public java.rmi.Remote getPort(Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        try {
            if (org.tatrc.paws.patient.PatientServiceSoap.class.isAssignableFrom(serviceEndpointInterface)) {
                org.tatrc.paws.patient.PatientServiceSoap12Stub _stub = new org.tatrc.paws.patient.PatientServiceSoap12Stub(new java.net.URL(PatientServiceSoap12_address), this);
                _stub.setPortName(getPatientServiceSoap12WSDDServiceName());
                return _stub;
            }
            if (org.tatrc.paws.patient.PatientServiceSoap.class.isAssignableFrom(serviceEndpointInterface)) {
                org.tatrc.paws.patient.PatientServiceSoapStub _stub = new org.tatrc.paws.patient.PatientServiceSoapStub(new java.net.URL(PatientServiceSoap_address), this);
                _stub.setPortName(getPatientServiceSoapWSDDServiceName());
                return _stub;
            }
        }
        catch (java.lang.Throwable t) {
            throw new javax.xml.rpc.ServiceException(t);
        }
        throw new javax.xml.rpc.ServiceException("There is no stub implementation for the interface:  " + (serviceEndpointInterface == null ? "null" : serviceEndpointInterface.getName()));
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(javax.xml.namespace.QName portName, Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        if (portName == null) {
            return getPort(serviceEndpointInterface);
        }
        java.lang.String inputPortName = portName.getLocalPart();
        if ("PatientServiceSoap12".equals(inputPortName)) {
            return getPatientServiceSoap12();
        }
        else if ("PatientServiceSoap".equals(inputPortName)) {
            return getPatientServiceSoap();
        }
        else  {
            java.rmi.Remote _stub = getPort(serviceEndpointInterface);
            ((org.apache.axis.client.Stub) _stub).setPortName(portName);
            return _stub;
        }
    }

    public javax.xml.namespace.QName getServiceName() {
        return new javax.xml.namespace.QName("http://paws.tatrc.org/", "PatientService");
    }

    private java.util.HashSet ports = null;

    public java.util.Iterator getPorts() {
        if (ports == null) {
            ports = new java.util.HashSet();
            ports.add(new javax.xml.namespace.QName("http://paws.tatrc.org/", "PatientServiceSoap12"));
            ports.add(new javax.xml.namespace.QName("http://paws.tatrc.org/", "PatientServiceSoap"));
        }
        return ports.iterator();
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(java.lang.String portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        
if ("PatientServiceSoap12".equals(portName)) {
            setPatientServiceSoap12EndpointAddress(address);
        }
        else 
if ("PatientServiceSoap".equals(portName)) {
            setPatientServiceSoapEndpointAddress(address);
        }
        else 
{ // Unknown Port Name
            throw new javax.xml.rpc.ServiceException(" Cannot set Endpoint Address for Unknown Port" + portName);
        }
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(javax.xml.namespace.QName portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        setEndpointAddress(portName.getLocalPart(), address);
    }

}
