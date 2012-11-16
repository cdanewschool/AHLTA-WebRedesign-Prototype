/**
 * AllergiesServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.allergies;

public class AllergiesServiceLocator extends org.apache.axis.client.Service implements org.tatrc.paws.allergies.AllergiesService {

    public AllergiesServiceLocator() {
    }


    public AllergiesServiceLocator(org.apache.axis.EngineConfiguration config) {
        super(config);
    }

    public AllergiesServiceLocator(java.lang.String wsdlLoc, javax.xml.namespace.QName sName) throws javax.xml.rpc.ServiceException {
        super(wsdlLoc, sName);
    }

    // Use to get a proxy class for AllergiesServiceSoap
    private java.lang.String AllergiesServiceSoap_address = "http://10.0.1.6/DoD.TATRC.PAWS/AllergiesService.asmx";

    public java.lang.String getAllergiesServiceSoapAddress() {
        return AllergiesServiceSoap_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String AllergiesServiceSoapWSDDServiceName = "AllergiesServiceSoap";

    public java.lang.String getAllergiesServiceSoapWSDDServiceName() {
        return AllergiesServiceSoapWSDDServiceName;
    }

    public void setAllergiesServiceSoapWSDDServiceName(java.lang.String name) {
        AllergiesServiceSoapWSDDServiceName = name;
    }

    public org.tatrc.paws.allergies.AllergiesServiceSoap getAllergiesServiceSoap() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(AllergiesServiceSoap_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getAllergiesServiceSoap(endpoint);
    }

    public org.tatrc.paws.allergies.AllergiesServiceSoap getAllergiesServiceSoap(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            org.tatrc.paws.allergies.AllergiesServiceSoapStub _stub = new org.tatrc.paws.allergies.AllergiesServiceSoapStub(portAddress, this);
            _stub.setPortName(getAllergiesServiceSoapWSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setAllergiesServiceSoapEndpointAddress(java.lang.String address) {
        AllergiesServiceSoap_address = address;
    }


    // Use to get a proxy class for AllergiesServiceSoap12
    private java.lang.String AllergiesServiceSoap12_address = "http://10.0.1.6/DoD.TATRC.PAWS/AllergiesService.asmx";

    public java.lang.String getAllergiesServiceSoap12Address() {
        return AllergiesServiceSoap12_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String AllergiesServiceSoap12WSDDServiceName = "AllergiesServiceSoap12";

    public java.lang.String getAllergiesServiceSoap12WSDDServiceName() {
        return AllergiesServiceSoap12WSDDServiceName;
    }

    public void setAllergiesServiceSoap12WSDDServiceName(java.lang.String name) {
        AllergiesServiceSoap12WSDDServiceName = name;
    }

    public org.tatrc.paws.allergies.AllergiesServiceSoap getAllergiesServiceSoap12() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(AllergiesServiceSoap12_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getAllergiesServiceSoap12(endpoint);
    }

    public org.tatrc.paws.allergies.AllergiesServiceSoap getAllergiesServiceSoap12(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            org.tatrc.paws.allergies.AllergiesServiceSoap12Stub _stub = new org.tatrc.paws.allergies.AllergiesServiceSoap12Stub(portAddress, this);
            _stub.setPortName(getAllergiesServiceSoap12WSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setAllergiesServiceSoap12EndpointAddress(java.lang.String address) {
        AllergiesServiceSoap12_address = address;
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
            if (org.tatrc.paws.allergies.AllergiesServiceSoap.class.isAssignableFrom(serviceEndpointInterface)) {
                org.tatrc.paws.allergies.AllergiesServiceSoapStub _stub = new org.tatrc.paws.allergies.AllergiesServiceSoapStub(new java.net.URL(AllergiesServiceSoap_address), this);
                _stub.setPortName(getAllergiesServiceSoapWSDDServiceName());
                return _stub;
            }
            if (org.tatrc.paws.allergies.AllergiesServiceSoap.class.isAssignableFrom(serviceEndpointInterface)) {
                org.tatrc.paws.allergies.AllergiesServiceSoap12Stub _stub = new org.tatrc.paws.allergies.AllergiesServiceSoap12Stub(new java.net.URL(AllergiesServiceSoap12_address), this);
                _stub.setPortName(getAllergiesServiceSoap12WSDDServiceName());
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
        if ("AllergiesServiceSoap".equals(inputPortName)) {
            return getAllergiesServiceSoap();
        }
        else if ("AllergiesServiceSoap12".equals(inputPortName)) {
            return getAllergiesServiceSoap12();
        }
        else  {
            java.rmi.Remote _stub = getPort(serviceEndpointInterface);
            ((org.apache.axis.client.Stub) _stub).setPortName(portName);
            return _stub;
        }
    }

    public javax.xml.namespace.QName getServiceName() {
        return new javax.xml.namespace.QName("http://paws.tatrc.org/", "AllergiesService");
    }

    private java.util.HashSet ports = null;

    public java.util.Iterator getPorts() {
        if (ports == null) {
            ports = new java.util.HashSet();
            ports.add(new javax.xml.namespace.QName("http://paws.tatrc.org/", "AllergiesServiceSoap"));
            ports.add(new javax.xml.namespace.QName("http://paws.tatrc.org/", "AllergiesServiceSoap12"));
        }
        return ports.iterator();
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(java.lang.String portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        
if ("AllergiesServiceSoap".equals(portName)) {
            setAllergiesServiceSoapEndpointAddress(address);
        }
        else 
if ("AllergiesServiceSoap12".equals(portName)) {
            setAllergiesServiceSoap12EndpointAddress(address);
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
