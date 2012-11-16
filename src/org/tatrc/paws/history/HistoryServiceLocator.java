/**
 * HistoryServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.history;

public class HistoryServiceLocator extends org.apache.axis.client.Service implements org.tatrc.paws.history.HistoryService {

    public HistoryServiceLocator() {
    }


    public HistoryServiceLocator(org.apache.axis.EngineConfiguration config) {
        super(config);
    }

    public HistoryServiceLocator(java.lang.String wsdlLoc, javax.xml.namespace.QName sName) throws javax.xml.rpc.ServiceException {
        super(wsdlLoc, sName);
    }

    // Use to get a proxy class for HistoryServiceSoap12
    private java.lang.String HistoryServiceSoap12_address = "http://10.0.1.6/DoD.TATRC.PAWS/HistoryService.asmx";

    public java.lang.String getHistoryServiceSoap12Address() {
        return HistoryServiceSoap12_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String HistoryServiceSoap12WSDDServiceName = "HistoryServiceSoap12";

    public java.lang.String getHistoryServiceSoap12WSDDServiceName() {
        return HistoryServiceSoap12WSDDServiceName;
    }

    public void setHistoryServiceSoap12WSDDServiceName(java.lang.String name) {
        HistoryServiceSoap12WSDDServiceName = name;
    }

    public org.tatrc.paws.history.HistoryServiceSoap getHistoryServiceSoap12() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(HistoryServiceSoap12_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getHistoryServiceSoap12(endpoint);
    }

    public org.tatrc.paws.history.HistoryServiceSoap getHistoryServiceSoap12(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            org.tatrc.paws.history.HistoryServiceSoap12Stub _stub = new org.tatrc.paws.history.HistoryServiceSoap12Stub(portAddress, this);
            _stub.setPortName(getHistoryServiceSoap12WSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setHistoryServiceSoap12EndpointAddress(java.lang.String address) {
        HistoryServiceSoap12_address = address;
    }


    // Use to get a proxy class for HistoryServiceSoap
    private java.lang.String HistoryServiceSoap_address = "http://10.0.1.6/DoD.TATRC.PAWS/HistoryService.asmx";

    public java.lang.String getHistoryServiceSoapAddress() {
        return HistoryServiceSoap_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String HistoryServiceSoapWSDDServiceName = "HistoryServiceSoap";

    public java.lang.String getHistoryServiceSoapWSDDServiceName() {
        return HistoryServiceSoapWSDDServiceName;
    }

    public void setHistoryServiceSoapWSDDServiceName(java.lang.String name) {
        HistoryServiceSoapWSDDServiceName = name;
    }

    public org.tatrc.paws.history.HistoryServiceSoap getHistoryServiceSoap() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(HistoryServiceSoap_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getHistoryServiceSoap(endpoint);
    }

    public org.tatrc.paws.history.HistoryServiceSoap getHistoryServiceSoap(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            org.tatrc.paws.history.HistoryServiceSoapStub _stub = new org.tatrc.paws.history.HistoryServiceSoapStub(portAddress, this);
            _stub.setPortName(getHistoryServiceSoapWSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setHistoryServiceSoapEndpointAddress(java.lang.String address) {
        HistoryServiceSoap_address = address;
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
            if (org.tatrc.paws.history.HistoryServiceSoap.class.isAssignableFrom(serviceEndpointInterface)) {
                org.tatrc.paws.history.HistoryServiceSoap12Stub _stub = new org.tatrc.paws.history.HistoryServiceSoap12Stub(new java.net.URL(HistoryServiceSoap12_address), this);
                _stub.setPortName(getHistoryServiceSoap12WSDDServiceName());
                return _stub;
            }
            if (org.tatrc.paws.history.HistoryServiceSoap.class.isAssignableFrom(serviceEndpointInterface)) {
                org.tatrc.paws.history.HistoryServiceSoapStub _stub = new org.tatrc.paws.history.HistoryServiceSoapStub(new java.net.URL(HistoryServiceSoap_address), this);
                _stub.setPortName(getHistoryServiceSoapWSDDServiceName());
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
        if ("HistoryServiceSoap12".equals(inputPortName)) {
            return getHistoryServiceSoap12();
        }
        else if ("HistoryServiceSoap".equals(inputPortName)) {
            return getHistoryServiceSoap();
        }
        else  {
            java.rmi.Remote _stub = getPort(serviceEndpointInterface);
            ((org.apache.axis.client.Stub) _stub).setPortName(portName);
            return _stub;
        }
    }

    public javax.xml.namespace.QName getServiceName() {
        return new javax.xml.namespace.QName("http://paws.tatrc.org/", "HistoryService");
    }

    private java.util.HashSet ports = null;

    public java.util.Iterator getPorts() {
        if (ports == null) {
            ports = new java.util.HashSet();
            ports.add(new javax.xml.namespace.QName("http://paws.tatrc.org/", "HistoryServiceSoap12"));
            ports.add(new javax.xml.namespace.QName("http://paws.tatrc.org/", "HistoryServiceSoap"));
        }
        return ports.iterator();
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(java.lang.String portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        
if ("HistoryServiceSoap12".equals(portName)) {
            setHistoryServiceSoap12EndpointAddress(address);
        }
        else 
if ("HistoryServiceSoap".equals(portName)) {
            setHistoryServiceSoapEndpointAddress(address);
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
