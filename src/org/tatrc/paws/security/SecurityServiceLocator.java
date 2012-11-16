/**
 * SecurityServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.security;

public class SecurityServiceLocator extends org.apache.axis.client.Service implements org.tatrc.paws.security.SecurityService {

    public SecurityServiceLocator() {
    }


    public SecurityServiceLocator(org.apache.axis.EngineConfiguration config) {
        super(config);
    }

    public SecurityServiceLocator(java.lang.String wsdlLoc, javax.xml.namespace.QName sName) throws javax.xml.rpc.ServiceException {
        super(wsdlLoc, sName);
    }

    // Use to get a proxy class for SecurityServiceSoap
    private java.lang.String SecurityServiceSoap_address = "http://10.0.1.6/DoD.TATRC.PAWS/SecurityService.asmx";

    public java.lang.String getSecurityServiceSoapAddress() {
        return SecurityServiceSoap_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String SecurityServiceSoapWSDDServiceName = "SecurityServiceSoap";

    public java.lang.String getSecurityServiceSoapWSDDServiceName() {
        return SecurityServiceSoapWSDDServiceName;
    }

    public void setSecurityServiceSoapWSDDServiceName(java.lang.String name) {
        SecurityServiceSoapWSDDServiceName = name;
    }

    public org.tatrc.paws.security.SecurityServiceSoap getSecurityServiceSoap() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(SecurityServiceSoap_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getSecurityServiceSoap(endpoint);
    }

    public org.tatrc.paws.security.SecurityServiceSoap getSecurityServiceSoap(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            org.tatrc.paws.security.SecurityServiceSoapStub _stub = new org.tatrc.paws.security.SecurityServiceSoapStub(portAddress, this);
            _stub.setPortName(getSecurityServiceSoapWSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setSecurityServiceSoapEndpointAddress(java.lang.String address) {
        SecurityServiceSoap_address = address;
    }


    // Use to get a proxy class for SecurityServiceSoap12
    private java.lang.String SecurityServiceSoap12_address = "http://10.0.1.6/DoD.TATRC.PAWS/SecurityService.asmx";

    public java.lang.String getSecurityServiceSoap12Address() {
        return SecurityServiceSoap12_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String SecurityServiceSoap12WSDDServiceName = "SecurityServiceSoap12";

    public java.lang.String getSecurityServiceSoap12WSDDServiceName() {
        return SecurityServiceSoap12WSDDServiceName;
    }

    public void setSecurityServiceSoap12WSDDServiceName(java.lang.String name) {
        SecurityServiceSoap12WSDDServiceName = name;
    }

    public org.tatrc.paws.security.SecurityServiceSoap getSecurityServiceSoap12() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(SecurityServiceSoap12_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getSecurityServiceSoap12(endpoint);
    }

    public org.tatrc.paws.security.SecurityServiceSoap getSecurityServiceSoap12(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            org.tatrc.paws.security.SecurityServiceSoap12Stub _stub = new org.tatrc.paws.security.SecurityServiceSoap12Stub(portAddress, this);
            _stub.setPortName(getSecurityServiceSoap12WSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setSecurityServiceSoap12EndpointAddress(java.lang.String address) {
        SecurityServiceSoap12_address = address;
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
            if (org.tatrc.paws.security.SecurityServiceSoap.class.isAssignableFrom(serviceEndpointInterface)) {
                org.tatrc.paws.security.SecurityServiceSoapStub _stub = new org.tatrc.paws.security.SecurityServiceSoapStub(new java.net.URL(SecurityServiceSoap_address), this);
                _stub.setPortName(getSecurityServiceSoapWSDDServiceName());
                return _stub;
            }
            if (org.tatrc.paws.security.SecurityServiceSoap.class.isAssignableFrom(serviceEndpointInterface)) {
                org.tatrc.paws.security.SecurityServiceSoap12Stub _stub = new org.tatrc.paws.security.SecurityServiceSoap12Stub(new java.net.URL(SecurityServiceSoap12_address), this);
                _stub.setPortName(getSecurityServiceSoap12WSDDServiceName());
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
        if ("SecurityServiceSoap".equals(inputPortName)) {
            return getSecurityServiceSoap();
        }
        else if ("SecurityServiceSoap12".equals(inputPortName)) {
            return getSecurityServiceSoap12();
        }
        else  {
            java.rmi.Remote _stub = getPort(serviceEndpointInterface);
            ((org.apache.axis.client.Stub) _stub).setPortName(portName);
            return _stub;
        }
    }

    public javax.xml.namespace.QName getServiceName() {
        return new javax.xml.namespace.QName("http://paws.tatrc.org/", "SecurityService");
    }

    private java.util.HashSet ports = null;

    public java.util.Iterator getPorts() {
        if (ports == null) {
            ports = new java.util.HashSet();
            ports.add(new javax.xml.namespace.QName("http://paws.tatrc.org/", "SecurityServiceSoap"));
            ports.add(new javax.xml.namespace.QName("http://paws.tatrc.org/", "SecurityServiceSoap12"));
        }
        return ports.iterator();
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(java.lang.String portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        
if ("SecurityServiceSoap".equals(portName)) {
            setSecurityServiceSoapEndpointAddress(address);
        }
        else 
if ("SecurityServiceSoap12".equals(portName)) {
            setSecurityServiceSoap12EndpointAddress(address);
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
