/**
 * DocumentServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.documents;

public class DocumentServiceLocator extends org.apache.axis.client.Service implements org.tatrc.paws.documents.DocumentService {

    public DocumentServiceLocator() {
    }


    public DocumentServiceLocator(org.apache.axis.EngineConfiguration config) {
        super(config);
    }

    public DocumentServiceLocator(java.lang.String wsdlLoc, javax.xml.namespace.QName sName) throws javax.xml.rpc.ServiceException {
        super(wsdlLoc, sName);
    }

    // Use to get a proxy class for DocumentServiceSoap12
    private java.lang.String DocumentServiceSoap12_address = "http://10.0.1.6/DoD.TATRC.PAWS/DocumentService.asmx";

    public java.lang.String getDocumentServiceSoap12Address() {
        return DocumentServiceSoap12_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String DocumentServiceSoap12WSDDServiceName = "DocumentServiceSoap12";

    public java.lang.String getDocumentServiceSoap12WSDDServiceName() {
        return DocumentServiceSoap12WSDDServiceName;
    }

    public void setDocumentServiceSoap12WSDDServiceName(java.lang.String name) {
        DocumentServiceSoap12WSDDServiceName = name;
    }

    public org.tatrc.paws.documents.DocumentServiceSoap getDocumentServiceSoap12() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(DocumentServiceSoap12_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getDocumentServiceSoap12(endpoint);
    }

    public org.tatrc.paws.documents.DocumentServiceSoap getDocumentServiceSoap12(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            org.tatrc.paws.documents.DocumentServiceSoap12Stub _stub = new org.tatrc.paws.documents.DocumentServiceSoap12Stub(portAddress, this);
            _stub.setPortName(getDocumentServiceSoap12WSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setDocumentServiceSoap12EndpointAddress(java.lang.String address) {
        DocumentServiceSoap12_address = address;
    }


    // Use to get a proxy class for DocumentServiceSoap
    private java.lang.String DocumentServiceSoap_address = "http://10.0.1.6/DoD.TATRC.PAWS/DocumentService.asmx";

    public java.lang.String getDocumentServiceSoapAddress() {
        return DocumentServiceSoap_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String DocumentServiceSoapWSDDServiceName = "DocumentServiceSoap";

    public java.lang.String getDocumentServiceSoapWSDDServiceName() {
        return DocumentServiceSoapWSDDServiceName;
    }

    public void setDocumentServiceSoapWSDDServiceName(java.lang.String name) {
        DocumentServiceSoapWSDDServiceName = name;
    }

    public org.tatrc.paws.documents.DocumentServiceSoap getDocumentServiceSoap() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(DocumentServiceSoap_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getDocumentServiceSoap(endpoint);
    }

    public org.tatrc.paws.documents.DocumentServiceSoap getDocumentServiceSoap(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            org.tatrc.paws.documents.DocumentServiceSoapStub _stub = new org.tatrc.paws.documents.DocumentServiceSoapStub(portAddress, this);
            _stub.setPortName(getDocumentServiceSoapWSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setDocumentServiceSoapEndpointAddress(java.lang.String address) {
        DocumentServiceSoap_address = address;
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
            if (org.tatrc.paws.documents.DocumentServiceSoap.class.isAssignableFrom(serviceEndpointInterface)) {
                org.tatrc.paws.documents.DocumentServiceSoap12Stub _stub = new org.tatrc.paws.documents.DocumentServiceSoap12Stub(new java.net.URL(DocumentServiceSoap12_address), this);
                _stub.setPortName(getDocumentServiceSoap12WSDDServiceName());
                return _stub;
            }
            if (org.tatrc.paws.documents.DocumentServiceSoap.class.isAssignableFrom(serviceEndpointInterface)) {
                org.tatrc.paws.documents.DocumentServiceSoapStub _stub = new org.tatrc.paws.documents.DocumentServiceSoapStub(new java.net.URL(DocumentServiceSoap_address), this);
                _stub.setPortName(getDocumentServiceSoapWSDDServiceName());
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
        if ("DocumentServiceSoap12".equals(inputPortName)) {
            return getDocumentServiceSoap12();
        }
        else if ("DocumentServiceSoap".equals(inputPortName)) {
            return getDocumentServiceSoap();
        }
        else  {
            java.rmi.Remote _stub = getPort(serviceEndpointInterface);
            ((org.apache.axis.client.Stub) _stub).setPortName(portName);
            return _stub;
        }
    }

    public javax.xml.namespace.QName getServiceName() {
        return new javax.xml.namespace.QName("http://paws.tatrc.org/", "DocumentService");
    }

    private java.util.HashSet ports = null;

    public java.util.Iterator getPorts() {
        if (ports == null) {
            ports = new java.util.HashSet();
            ports.add(new javax.xml.namespace.QName("http://paws.tatrc.org/", "DocumentServiceSoap12"));
            ports.add(new javax.xml.namespace.QName("http://paws.tatrc.org/", "DocumentServiceSoap"));
        }
        return ports.iterator();
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(java.lang.String portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        
if ("DocumentServiceSoap12".equals(portName)) {
            setDocumentServiceSoap12EndpointAddress(address);
        }
        else 
if ("DocumentServiceSoap".equals(portName)) {
            setDocumentServiceSoapEndpointAddress(address);
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
