/**
 * RadiologyServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.radiology;

public class RadiologyServiceLocator extends org.apache.axis.client.Service implements org.tatrc.paws.radiology.RadiologyService {

    public RadiologyServiceLocator() {
    }


    public RadiologyServiceLocator(org.apache.axis.EngineConfiguration config) {
        super(config);
    }

    public RadiologyServiceLocator(java.lang.String wsdlLoc, javax.xml.namespace.QName sName) throws javax.xml.rpc.ServiceException {
        super(wsdlLoc, sName);
    }

    // Use to get a proxy class for RadiologyServiceSoap12
    private java.lang.String RadiologyServiceSoap12_address = "http://10.0.1.6/DoD.TATRC.PAWS/RadiologyService.asmx";

    public java.lang.String getRadiologyServiceSoap12Address() {
        return RadiologyServiceSoap12_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String RadiologyServiceSoap12WSDDServiceName = "RadiologyServiceSoap12";

    public java.lang.String getRadiologyServiceSoap12WSDDServiceName() {
        return RadiologyServiceSoap12WSDDServiceName;
    }

    public void setRadiologyServiceSoap12WSDDServiceName(java.lang.String name) {
        RadiologyServiceSoap12WSDDServiceName = name;
    }

    public org.tatrc.paws.radiology.RadiologyServiceSoap getRadiologyServiceSoap12() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(RadiologyServiceSoap12_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getRadiologyServiceSoap12(endpoint);
    }

    public org.tatrc.paws.radiology.RadiologyServiceSoap getRadiologyServiceSoap12(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            org.tatrc.paws.radiology.RadiologyServiceSoap12Stub _stub = new org.tatrc.paws.radiology.RadiologyServiceSoap12Stub(portAddress, this);
            _stub.setPortName(getRadiologyServiceSoap12WSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setRadiologyServiceSoap12EndpointAddress(java.lang.String address) {
        RadiologyServiceSoap12_address = address;
    }


    // Use to get a proxy class for RadiologyServiceSoap
    private java.lang.String RadiologyServiceSoap_address = "http://10.0.1.6/DoD.TATRC.PAWS/RadiologyService.asmx";

    public java.lang.String getRadiologyServiceSoapAddress() {
        return RadiologyServiceSoap_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String RadiologyServiceSoapWSDDServiceName = "RadiologyServiceSoap";

    public java.lang.String getRadiologyServiceSoapWSDDServiceName() {
        return RadiologyServiceSoapWSDDServiceName;
    }

    public void setRadiologyServiceSoapWSDDServiceName(java.lang.String name) {
        RadiologyServiceSoapWSDDServiceName = name;
    }

    public org.tatrc.paws.radiology.RadiologyServiceSoap getRadiologyServiceSoap() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(RadiologyServiceSoap_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getRadiologyServiceSoap(endpoint);
    }

    public org.tatrc.paws.radiology.RadiologyServiceSoap getRadiologyServiceSoap(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            org.tatrc.paws.radiology.RadiologyServiceSoapStub _stub = new org.tatrc.paws.radiology.RadiologyServiceSoapStub(portAddress, this);
            _stub.setPortName(getRadiologyServiceSoapWSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setRadiologyServiceSoapEndpointAddress(java.lang.String address) {
        RadiologyServiceSoap_address = address;
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
            if (org.tatrc.paws.radiology.RadiologyServiceSoap.class.isAssignableFrom(serviceEndpointInterface)) {
                org.tatrc.paws.radiology.RadiologyServiceSoap12Stub _stub = new org.tatrc.paws.radiology.RadiologyServiceSoap12Stub(new java.net.URL(RadiologyServiceSoap12_address), this);
                _stub.setPortName(getRadiologyServiceSoap12WSDDServiceName());
                return _stub;
            }
            if (org.tatrc.paws.radiology.RadiologyServiceSoap.class.isAssignableFrom(serviceEndpointInterface)) {
                org.tatrc.paws.radiology.RadiologyServiceSoapStub _stub = new org.tatrc.paws.radiology.RadiologyServiceSoapStub(new java.net.URL(RadiologyServiceSoap_address), this);
                _stub.setPortName(getRadiologyServiceSoapWSDDServiceName());
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
        if ("RadiologyServiceSoap12".equals(inputPortName)) {
            return getRadiologyServiceSoap12();
        }
        else if ("RadiologyServiceSoap".equals(inputPortName)) {
            return getRadiologyServiceSoap();
        }
        else  {
            java.rmi.Remote _stub = getPort(serviceEndpointInterface);
            ((org.apache.axis.client.Stub) _stub).setPortName(portName);
            return _stub;
        }
    }

    public javax.xml.namespace.QName getServiceName() {
        return new javax.xml.namespace.QName("http://paws.tatrc.org/", "RadiologyService");
    }

    private java.util.HashSet ports = null;

    public java.util.Iterator getPorts() {
        if (ports == null) {
            ports = new java.util.HashSet();
            ports.add(new javax.xml.namespace.QName("http://paws.tatrc.org/", "RadiologyServiceSoap12"));
            ports.add(new javax.xml.namespace.QName("http://paws.tatrc.org/", "RadiologyServiceSoap"));
        }
        return ports.iterator();
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(java.lang.String portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        
if ("RadiologyServiceSoap12".equals(portName)) {
            setRadiologyServiceSoap12EndpointAddress(address);
        }
        else 
if ("RadiologyServiceSoap".equals(portName)) {
            setRadiologyServiceSoapEndpointAddress(address);
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
