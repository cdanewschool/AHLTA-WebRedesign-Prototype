/**
 * LabsServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.labs;

public class LabsServiceLocator extends org.apache.axis.client.Service implements org.tatrc.paws.labs.LabsService {

    public LabsServiceLocator() {
    }


    public LabsServiceLocator(org.apache.axis.EngineConfiguration config) {
        super(config);
    }

    public LabsServiceLocator(java.lang.String wsdlLoc, javax.xml.namespace.QName sName) throws javax.xml.rpc.ServiceException {
        super(wsdlLoc, sName);
    }

    // Use to get a proxy class for LabsServiceSoap
    private java.lang.String LabsServiceSoap_address = "http://10.0.1.6/DoD.TATRC.PAWS/LabsService.asmx";

    public java.lang.String getLabsServiceSoapAddress() {
        return LabsServiceSoap_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String LabsServiceSoapWSDDServiceName = "LabsServiceSoap";

    public java.lang.String getLabsServiceSoapWSDDServiceName() {
        return LabsServiceSoapWSDDServiceName;
    }

    public void setLabsServiceSoapWSDDServiceName(java.lang.String name) {
        LabsServiceSoapWSDDServiceName = name;
    }

    public org.tatrc.paws.labs.LabsServiceSoap getLabsServiceSoap() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(LabsServiceSoap_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getLabsServiceSoap(endpoint);
    }

    public org.tatrc.paws.labs.LabsServiceSoap getLabsServiceSoap(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            org.tatrc.paws.labs.LabsServiceSoapStub _stub = new org.tatrc.paws.labs.LabsServiceSoapStub(portAddress, this);
            _stub.setPortName(getLabsServiceSoapWSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setLabsServiceSoapEndpointAddress(java.lang.String address) {
        LabsServiceSoap_address = address;
    }


    // Use to get a proxy class for LabsServiceSoap12
    private java.lang.String LabsServiceSoap12_address = "http://10.0.1.6/DoD.TATRC.PAWS/LabsService.asmx";

    public java.lang.String getLabsServiceSoap12Address() {
        return LabsServiceSoap12_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String LabsServiceSoap12WSDDServiceName = "LabsServiceSoap12";

    public java.lang.String getLabsServiceSoap12WSDDServiceName() {
        return LabsServiceSoap12WSDDServiceName;
    }

    public void setLabsServiceSoap12WSDDServiceName(java.lang.String name) {
        LabsServiceSoap12WSDDServiceName = name;
    }

    public org.tatrc.paws.labs.LabsServiceSoap getLabsServiceSoap12() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(LabsServiceSoap12_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getLabsServiceSoap12(endpoint);
    }

    public org.tatrc.paws.labs.LabsServiceSoap getLabsServiceSoap12(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            org.tatrc.paws.labs.LabsServiceSoap12Stub _stub = new org.tatrc.paws.labs.LabsServiceSoap12Stub(portAddress, this);
            _stub.setPortName(getLabsServiceSoap12WSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setLabsServiceSoap12EndpointAddress(java.lang.String address) {
        LabsServiceSoap12_address = address;
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
            if (org.tatrc.paws.labs.LabsServiceSoap.class.isAssignableFrom(serviceEndpointInterface)) {
                org.tatrc.paws.labs.LabsServiceSoapStub _stub = new org.tatrc.paws.labs.LabsServiceSoapStub(new java.net.URL(LabsServiceSoap_address), this);
                _stub.setPortName(getLabsServiceSoapWSDDServiceName());
                return _stub;
            }
            if (org.tatrc.paws.labs.LabsServiceSoap.class.isAssignableFrom(serviceEndpointInterface)) {
                org.tatrc.paws.labs.LabsServiceSoap12Stub _stub = new org.tatrc.paws.labs.LabsServiceSoap12Stub(new java.net.URL(LabsServiceSoap12_address), this);
                _stub.setPortName(getLabsServiceSoap12WSDDServiceName());
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
        if ("LabsServiceSoap".equals(inputPortName)) {
            return getLabsServiceSoap();
        }
        else if ("LabsServiceSoap12".equals(inputPortName)) {
            return getLabsServiceSoap12();
        }
        else  {
            java.rmi.Remote _stub = getPort(serviceEndpointInterface);
            ((org.apache.axis.client.Stub) _stub).setPortName(portName);
            return _stub;
        }
    }

    public javax.xml.namespace.QName getServiceName() {
        return new javax.xml.namespace.QName("http://paws.tatrc.org/", "LabsService");
    }

    private java.util.HashSet ports = null;

    public java.util.Iterator getPorts() {
        if (ports == null) {
            ports = new java.util.HashSet();
            ports.add(new javax.xml.namespace.QName("http://paws.tatrc.org/", "LabsServiceSoap"));
            ports.add(new javax.xml.namespace.QName("http://paws.tatrc.org/", "LabsServiceSoap12"));
        }
        return ports.iterator();
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(java.lang.String portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        
if ("LabsServiceSoap".equals(portName)) {
            setLabsServiceSoapEndpointAddress(address);
        }
        else 
if ("LabsServiceSoap12".equals(portName)) {
            setLabsServiceSoap12EndpointAddress(address);
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
