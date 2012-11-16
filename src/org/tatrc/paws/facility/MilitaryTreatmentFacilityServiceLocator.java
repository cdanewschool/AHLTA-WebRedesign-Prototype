/**
 * MilitaryTreatmentFacilityServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.facility;

public class MilitaryTreatmentFacilityServiceLocator extends org.apache.axis.client.Service implements org.tatrc.paws.facility.MilitaryTreatmentFacilityService {

    public MilitaryTreatmentFacilityServiceLocator() {
    }


    public MilitaryTreatmentFacilityServiceLocator(org.apache.axis.EngineConfiguration config) {
        super(config);
    }

    public MilitaryTreatmentFacilityServiceLocator(java.lang.String wsdlLoc, javax.xml.namespace.QName sName) throws javax.xml.rpc.ServiceException {
        super(wsdlLoc, sName);
    }

    // Use to get a proxy class for MilitaryTreatmentFacilityServiceSoap12
    private java.lang.String MilitaryTreatmentFacilityServiceSoap12_address = "http://70.46.221.37/DoD.TATRC.PAWS/MilitaryTreatmentFacilityService.asmx";

    public java.lang.String getMilitaryTreatmentFacilityServiceSoap12Address() {
        return MilitaryTreatmentFacilityServiceSoap12_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String MilitaryTreatmentFacilityServiceSoap12WSDDServiceName = "MilitaryTreatmentFacilityServiceSoap12";

    public java.lang.String getMilitaryTreatmentFacilityServiceSoap12WSDDServiceName() {
        return MilitaryTreatmentFacilityServiceSoap12WSDDServiceName;
    }

    public void setMilitaryTreatmentFacilityServiceSoap12WSDDServiceName(java.lang.String name) {
        MilitaryTreatmentFacilityServiceSoap12WSDDServiceName = name;
    }

    public org.tatrc.paws.facility.MilitaryTreatmentFacilityServiceSoap getMilitaryTreatmentFacilityServiceSoap12() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(MilitaryTreatmentFacilityServiceSoap12_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getMilitaryTreatmentFacilityServiceSoap12(endpoint);
    }

    public org.tatrc.paws.facility.MilitaryTreatmentFacilityServiceSoap getMilitaryTreatmentFacilityServiceSoap12(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            org.tatrc.paws.facility.MilitaryTreatmentFacilityServiceSoap12Stub _stub = new org.tatrc.paws.facility.MilitaryTreatmentFacilityServiceSoap12Stub(portAddress, this);
            _stub.setPortName(getMilitaryTreatmentFacilityServiceSoap12WSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setMilitaryTreatmentFacilityServiceSoap12EndpointAddress(java.lang.String address) {
        MilitaryTreatmentFacilityServiceSoap12_address = address;
    }


    // Use to get a proxy class for MilitaryTreatmentFacilityServiceSoap
    private java.lang.String MilitaryTreatmentFacilityServiceSoap_address = "http://70.46.221.37/DoD.TATRC.PAWS/MilitaryTreatmentFacilityService.asmx";

    public java.lang.String getMilitaryTreatmentFacilityServiceSoapAddress() {
        return MilitaryTreatmentFacilityServiceSoap_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String MilitaryTreatmentFacilityServiceSoapWSDDServiceName = "MilitaryTreatmentFacilityServiceSoap";

    public java.lang.String getMilitaryTreatmentFacilityServiceSoapWSDDServiceName() {
        return MilitaryTreatmentFacilityServiceSoapWSDDServiceName;
    }

    public void setMilitaryTreatmentFacilityServiceSoapWSDDServiceName(java.lang.String name) {
        MilitaryTreatmentFacilityServiceSoapWSDDServiceName = name;
    }

    public org.tatrc.paws.facility.MilitaryTreatmentFacilityServiceSoap getMilitaryTreatmentFacilityServiceSoap() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(MilitaryTreatmentFacilityServiceSoap_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getMilitaryTreatmentFacilityServiceSoap(endpoint);
    }

    public org.tatrc.paws.facility.MilitaryTreatmentFacilityServiceSoap getMilitaryTreatmentFacilityServiceSoap(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            org.tatrc.paws.facility.MilitaryTreatmentFacilityServiceSoapStub _stub = new org.tatrc.paws.facility.MilitaryTreatmentFacilityServiceSoapStub(portAddress, this);
            _stub.setPortName(getMilitaryTreatmentFacilityServiceSoapWSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setMilitaryTreatmentFacilityServiceSoapEndpointAddress(java.lang.String address) {
        MilitaryTreatmentFacilityServiceSoap_address = address;
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
            if (org.tatrc.paws.facility.MilitaryTreatmentFacilityServiceSoap.class.isAssignableFrom(serviceEndpointInterface)) {
                org.tatrc.paws.facility.MilitaryTreatmentFacilityServiceSoap12Stub _stub = new org.tatrc.paws.facility.MilitaryTreatmentFacilityServiceSoap12Stub(new java.net.URL(MilitaryTreatmentFacilityServiceSoap12_address), this);
                _stub.setPortName(getMilitaryTreatmentFacilityServiceSoap12WSDDServiceName());
                return _stub;
            }
            if (org.tatrc.paws.facility.MilitaryTreatmentFacilityServiceSoap.class.isAssignableFrom(serviceEndpointInterface)) {
                org.tatrc.paws.facility.MilitaryTreatmentFacilityServiceSoapStub _stub = new org.tatrc.paws.facility.MilitaryTreatmentFacilityServiceSoapStub(new java.net.URL(MilitaryTreatmentFacilityServiceSoap_address), this);
                _stub.setPortName(getMilitaryTreatmentFacilityServiceSoapWSDDServiceName());
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
        if ("MilitaryTreatmentFacilityServiceSoap12".equals(inputPortName)) {
            return getMilitaryTreatmentFacilityServiceSoap12();
        }
        else if ("MilitaryTreatmentFacilityServiceSoap".equals(inputPortName)) {
            return getMilitaryTreatmentFacilityServiceSoap();
        }
        else  {
            java.rmi.Remote _stub = getPort(serviceEndpointInterface);
            ((org.apache.axis.client.Stub) _stub).setPortName(portName);
            return _stub;
        }
    }

    public javax.xml.namespace.QName getServiceName() {
        return new javax.xml.namespace.QName("http://paws.tatrc.org/", "MilitaryTreatmentFacilityService");
    }

    private java.util.HashSet ports = null;

    public java.util.Iterator getPorts() {
        if (ports == null) {
            ports = new java.util.HashSet();
            ports.add(new javax.xml.namespace.QName("http://paws.tatrc.org/", "MilitaryTreatmentFacilityServiceSoap12"));
            ports.add(new javax.xml.namespace.QName("http://paws.tatrc.org/", "MilitaryTreatmentFacilityServiceSoap"));
        }
        return ports.iterator();
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(java.lang.String portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        
if ("MilitaryTreatmentFacilityServiceSoap12".equals(portName)) {
            setMilitaryTreatmentFacilityServiceSoap12EndpointAddress(address);
        }
        else 
if ("MilitaryTreatmentFacilityServiceSoap".equals(portName)) {
            setMilitaryTreatmentFacilityServiceSoapEndpointAddress(address);
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
