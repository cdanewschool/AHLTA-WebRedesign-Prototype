/**
 * ProviderServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.provider;

public class ProviderServiceLocator extends org.apache.axis.client.Service implements org.tatrc.paws.provider.ProviderService {

    public ProviderServiceLocator() {
    }


    public ProviderServiceLocator(org.apache.axis.EngineConfiguration config) {
        super(config);
    }

    public ProviderServiceLocator(java.lang.String wsdlLoc, javax.xml.namespace.QName sName) throws javax.xml.rpc.ServiceException {
        super(wsdlLoc, sName);
    }

    // Use to get a proxy class for ProviderServiceSoap
    private java.lang.String ProviderServiceSoap_address = "http://10.0.1.6/DoD.TATRC.PAWS/ProviderService.asmx";

    public java.lang.String getProviderServiceSoapAddress() {
        return ProviderServiceSoap_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String ProviderServiceSoapWSDDServiceName = "ProviderServiceSoap";

    public java.lang.String getProviderServiceSoapWSDDServiceName() {
        return ProviderServiceSoapWSDDServiceName;
    }

    public void setProviderServiceSoapWSDDServiceName(java.lang.String name) {
        ProviderServiceSoapWSDDServiceName = name;
    }

    public org.tatrc.paws.provider.ProviderServiceSoap getProviderServiceSoap() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(ProviderServiceSoap_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getProviderServiceSoap(endpoint);
    }

    public org.tatrc.paws.provider.ProviderServiceSoap getProviderServiceSoap(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            org.tatrc.paws.provider.ProviderServiceSoapStub _stub = new org.tatrc.paws.provider.ProviderServiceSoapStub(portAddress, this);
            _stub.setPortName(getProviderServiceSoapWSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setProviderServiceSoapEndpointAddress(java.lang.String address) {
        ProviderServiceSoap_address = address;
    }


    // Use to get a proxy class for ProviderServiceSoap12
    private java.lang.String ProviderServiceSoap12_address = "http://10.0.1.6/DoD.TATRC.PAWS/ProviderService.asmx";

    public java.lang.String getProviderServiceSoap12Address() {
        return ProviderServiceSoap12_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String ProviderServiceSoap12WSDDServiceName = "ProviderServiceSoap12";

    public java.lang.String getProviderServiceSoap12WSDDServiceName() {
        return ProviderServiceSoap12WSDDServiceName;
    }

    public void setProviderServiceSoap12WSDDServiceName(java.lang.String name) {
        ProviderServiceSoap12WSDDServiceName = name;
    }

    public org.tatrc.paws.provider.ProviderServiceSoap getProviderServiceSoap12() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(ProviderServiceSoap12_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getProviderServiceSoap12(endpoint);
    }

    public org.tatrc.paws.provider.ProviderServiceSoap getProviderServiceSoap12(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            org.tatrc.paws.provider.ProviderServiceSoap12Stub _stub = new org.tatrc.paws.provider.ProviderServiceSoap12Stub(portAddress, this);
            _stub.setPortName(getProviderServiceSoap12WSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setProviderServiceSoap12EndpointAddress(java.lang.String address) {
        ProviderServiceSoap12_address = address;
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
            if (org.tatrc.paws.provider.ProviderServiceSoap.class.isAssignableFrom(serviceEndpointInterface)) {
                org.tatrc.paws.provider.ProviderServiceSoapStub _stub = new org.tatrc.paws.provider.ProviderServiceSoapStub(new java.net.URL(ProviderServiceSoap_address), this);
                _stub.setPortName(getProviderServiceSoapWSDDServiceName());
                return _stub;
            }
            if (org.tatrc.paws.provider.ProviderServiceSoap.class.isAssignableFrom(serviceEndpointInterface)) {
                org.tatrc.paws.provider.ProviderServiceSoap12Stub _stub = new org.tatrc.paws.provider.ProviderServiceSoap12Stub(new java.net.URL(ProviderServiceSoap12_address), this);
                _stub.setPortName(getProviderServiceSoap12WSDDServiceName());
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
        if ("ProviderServiceSoap".equals(inputPortName)) {
            return getProviderServiceSoap();
        }
        else if ("ProviderServiceSoap12".equals(inputPortName)) {
            return getProviderServiceSoap12();
        }
        else  {
            java.rmi.Remote _stub = getPort(serviceEndpointInterface);
            ((org.apache.axis.client.Stub) _stub).setPortName(portName);
            return _stub;
        }
    }

    public javax.xml.namespace.QName getServiceName() {
        return new javax.xml.namespace.QName("http://paws.tatrc.org/", "ProviderService");
    }

    private java.util.HashSet ports = null;

    public java.util.Iterator getPorts() {
        if (ports == null) {
            ports = new java.util.HashSet();
            ports.add(new javax.xml.namespace.QName("http://paws.tatrc.org/", "ProviderServiceSoap"));
            ports.add(new javax.xml.namespace.QName("http://paws.tatrc.org/", "ProviderServiceSoap12"));
        }
        return ports.iterator();
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(java.lang.String portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        
if ("ProviderServiceSoap".equals(portName)) {
            setProviderServiceSoapEndpointAddress(address);
        }
        else 
if ("ProviderServiceSoap12".equals(portName)) {
            setProviderServiceSoap12EndpointAddress(address);
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
