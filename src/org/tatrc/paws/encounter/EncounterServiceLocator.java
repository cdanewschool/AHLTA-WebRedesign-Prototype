/**
 * EncounterServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.encounter;

public class EncounterServiceLocator extends org.apache.axis.client.Service implements org.tatrc.paws.encounter.EncounterService {

    public EncounterServiceLocator() {
    }


    public EncounterServiceLocator(org.apache.axis.EngineConfiguration config) {
        super(config);
    }

    public EncounterServiceLocator(java.lang.String wsdlLoc, javax.xml.namespace.QName sName) throws javax.xml.rpc.ServiceException {
        super(wsdlLoc, sName);
    }

    // Use to get a proxy class for EncounterServiceSoap12
    private java.lang.String EncounterServiceSoap12_address = "http://10.0.1.6/DoD.TATRC.PAWS/EncounterService.asmx";

    public java.lang.String getEncounterServiceSoap12Address() {
        return EncounterServiceSoap12_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String EncounterServiceSoap12WSDDServiceName = "EncounterServiceSoap12";

    public java.lang.String getEncounterServiceSoap12WSDDServiceName() {
        return EncounterServiceSoap12WSDDServiceName;
    }

    public void setEncounterServiceSoap12WSDDServiceName(java.lang.String name) {
        EncounterServiceSoap12WSDDServiceName = name;
    }

    public org.tatrc.paws.encounter.EncounterServiceSoap getEncounterServiceSoap12() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(EncounterServiceSoap12_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getEncounterServiceSoap12(endpoint);
    }

    public org.tatrc.paws.encounter.EncounterServiceSoap getEncounterServiceSoap12(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            org.tatrc.paws.encounter.EncounterServiceSoap12Stub _stub = new org.tatrc.paws.encounter.EncounterServiceSoap12Stub(portAddress, this);
            _stub.setPortName(getEncounterServiceSoap12WSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setEncounterServiceSoap12EndpointAddress(java.lang.String address) {
        EncounterServiceSoap12_address = address;
    }


    // Use to get a proxy class for EncounterServiceSoap
    private java.lang.String EncounterServiceSoap_address = "http://10.0.1.6/DoD.TATRC.PAWS/EncounterService.asmx";

    public java.lang.String getEncounterServiceSoapAddress() {
        return EncounterServiceSoap_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String EncounterServiceSoapWSDDServiceName = "EncounterServiceSoap";

    public java.lang.String getEncounterServiceSoapWSDDServiceName() {
        return EncounterServiceSoapWSDDServiceName;
    }

    public void setEncounterServiceSoapWSDDServiceName(java.lang.String name) {
        EncounterServiceSoapWSDDServiceName = name;
    }

    public org.tatrc.paws.encounter.EncounterServiceSoap getEncounterServiceSoap() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(EncounterServiceSoap_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getEncounterServiceSoap(endpoint);
    }

    public org.tatrc.paws.encounter.EncounterServiceSoap getEncounterServiceSoap(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            org.tatrc.paws.encounter.EncounterServiceSoapStub _stub = new org.tatrc.paws.encounter.EncounterServiceSoapStub(portAddress, this);
            _stub.setPortName(getEncounterServiceSoapWSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setEncounterServiceSoapEndpointAddress(java.lang.String address) {
        EncounterServiceSoap_address = address;
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
            if (org.tatrc.paws.encounter.EncounterServiceSoap.class.isAssignableFrom(serviceEndpointInterface)) {
                org.tatrc.paws.encounter.EncounterServiceSoap12Stub _stub = new org.tatrc.paws.encounter.EncounterServiceSoap12Stub(new java.net.URL(EncounterServiceSoap12_address), this);
                _stub.setPortName(getEncounterServiceSoap12WSDDServiceName());
                return _stub;
            }
            if (org.tatrc.paws.encounter.EncounterServiceSoap.class.isAssignableFrom(serviceEndpointInterface)) {
                org.tatrc.paws.encounter.EncounterServiceSoapStub _stub = new org.tatrc.paws.encounter.EncounterServiceSoapStub(new java.net.URL(EncounterServiceSoap_address), this);
                _stub.setPortName(getEncounterServiceSoapWSDDServiceName());
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
        if ("EncounterServiceSoap12".equals(inputPortName)) {
            return getEncounterServiceSoap12();
        }
        else if ("EncounterServiceSoap".equals(inputPortName)) {
            return getEncounterServiceSoap();
        }
        else  {
            java.rmi.Remote _stub = getPort(serviceEndpointInterface);
            ((org.apache.axis.client.Stub) _stub).setPortName(portName);
            return _stub;
        }
    }

    public javax.xml.namespace.QName getServiceName() {
        return new javax.xml.namespace.QName("http://paws.tatrc.org/", "EncounterService");
    }

    private java.util.HashSet ports = null;

    public java.util.Iterator getPorts() {
        if (ports == null) {
            ports = new java.util.HashSet();
            ports.add(new javax.xml.namespace.QName("http://paws.tatrc.org/", "EncounterServiceSoap12"));
            ports.add(new javax.xml.namespace.QName("http://paws.tatrc.org/", "EncounterServiceSoap"));
        }
        return ports.iterator();
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(java.lang.String portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        
if ("EncounterServiceSoap12".equals(portName)) {
            setEncounterServiceSoap12EndpointAddress(address);
        }
        else 
if ("EncounterServiceSoap".equals(portName)) {
            setEncounterServiceSoapEndpointAddress(address);
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
