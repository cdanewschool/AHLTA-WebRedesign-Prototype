/**
 * MedicationsServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.medications;

public class MedicationsServiceLocator extends org.apache.axis.client.Service implements org.tatrc.paws.medications.MedicationsService {

    public MedicationsServiceLocator() {
    }


    public MedicationsServiceLocator(org.apache.axis.EngineConfiguration config) {
        super(config);
    }

    public MedicationsServiceLocator(java.lang.String wsdlLoc, javax.xml.namespace.QName sName) throws javax.xml.rpc.ServiceException {
        super(wsdlLoc, sName);
    }

    // Use to get a proxy class for MedicationsServiceSoap12
    private java.lang.String MedicationsServiceSoap12_address = "http://10.0.1.6/DoD.TATRC.PAWS/MedicationsService.asmx";

    public java.lang.String getMedicationsServiceSoap12Address() {
        return MedicationsServiceSoap12_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String MedicationsServiceSoap12WSDDServiceName = "MedicationsServiceSoap12";

    public java.lang.String getMedicationsServiceSoap12WSDDServiceName() {
        return MedicationsServiceSoap12WSDDServiceName;
    }

    public void setMedicationsServiceSoap12WSDDServiceName(java.lang.String name) {
        MedicationsServiceSoap12WSDDServiceName = name;
    }

    public org.tatrc.paws.medications.MedicationsServiceSoap getMedicationsServiceSoap12() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(MedicationsServiceSoap12_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getMedicationsServiceSoap12(endpoint);
    }

    public org.tatrc.paws.medications.MedicationsServiceSoap getMedicationsServiceSoap12(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            org.tatrc.paws.medications.MedicationsServiceSoap12Stub _stub = new org.tatrc.paws.medications.MedicationsServiceSoap12Stub(portAddress, this);
            _stub.setPortName(getMedicationsServiceSoap12WSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setMedicationsServiceSoap12EndpointAddress(java.lang.String address) {
        MedicationsServiceSoap12_address = address;
    }


    // Use to get a proxy class for MedicationsServiceSoap
    private java.lang.String MedicationsServiceSoap_address = "http://10.0.1.6/DoD.TATRC.PAWS/MedicationsService.asmx";

    public java.lang.String getMedicationsServiceSoapAddress() {
        return MedicationsServiceSoap_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String MedicationsServiceSoapWSDDServiceName = "MedicationsServiceSoap";

    public java.lang.String getMedicationsServiceSoapWSDDServiceName() {
        return MedicationsServiceSoapWSDDServiceName;
    }

    public void setMedicationsServiceSoapWSDDServiceName(java.lang.String name) {
        MedicationsServiceSoapWSDDServiceName = name;
    }

    public org.tatrc.paws.medications.MedicationsServiceSoap getMedicationsServiceSoap() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(MedicationsServiceSoap_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getMedicationsServiceSoap(endpoint);
    }

    public org.tatrc.paws.medications.MedicationsServiceSoap getMedicationsServiceSoap(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            org.tatrc.paws.medications.MedicationsServiceSoapStub _stub = new org.tatrc.paws.medications.MedicationsServiceSoapStub(portAddress, this);
            _stub.setPortName(getMedicationsServiceSoapWSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setMedicationsServiceSoapEndpointAddress(java.lang.String address) {
        MedicationsServiceSoap_address = address;
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
            if (org.tatrc.paws.medications.MedicationsServiceSoap.class.isAssignableFrom(serviceEndpointInterface)) {
                org.tatrc.paws.medications.MedicationsServiceSoap12Stub _stub = new org.tatrc.paws.medications.MedicationsServiceSoap12Stub(new java.net.URL(MedicationsServiceSoap12_address), this);
                _stub.setPortName(getMedicationsServiceSoap12WSDDServiceName());
                return _stub;
            }
            if (org.tatrc.paws.medications.MedicationsServiceSoap.class.isAssignableFrom(serviceEndpointInterface)) {
                org.tatrc.paws.medications.MedicationsServiceSoapStub _stub = new org.tatrc.paws.medications.MedicationsServiceSoapStub(new java.net.URL(MedicationsServiceSoap_address), this);
                _stub.setPortName(getMedicationsServiceSoapWSDDServiceName());
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
        if ("MedicationsServiceSoap12".equals(inputPortName)) {
            return getMedicationsServiceSoap12();
        }
        else if ("MedicationsServiceSoap".equals(inputPortName)) {
            return getMedicationsServiceSoap();
        }
        else  {
            java.rmi.Remote _stub = getPort(serviceEndpointInterface);
            ((org.apache.axis.client.Stub) _stub).setPortName(portName);
            return _stub;
        }
    }

    public javax.xml.namespace.QName getServiceName() {
        return new javax.xml.namespace.QName("http://paws.tatrc.org/", "MedicationsService");
    }

    private java.util.HashSet ports = null;

    public java.util.Iterator getPorts() {
        if (ports == null) {
            ports = new java.util.HashSet();
            ports.add(new javax.xml.namespace.QName("http://paws.tatrc.org/", "MedicationsServiceSoap12"));
            ports.add(new javax.xml.namespace.QName("http://paws.tatrc.org/", "MedicationsServiceSoap"));
        }
        return ports.iterator();
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(java.lang.String portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        
if ("MedicationsServiceSoap12".equals(portName)) {
            setMedicationsServiceSoap12EndpointAddress(address);
        }
        else 
if ("MedicationsServiceSoap".equals(portName)) {
            setMedicationsServiceSoapEndpointAddress(address);
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
