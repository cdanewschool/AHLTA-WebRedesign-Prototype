/**
 * Content.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.encounter;

public class Content  implements java.io.Serializable {
    private org.tatrc.paws.encounter.EnumDocumentFormat documentFormat;

    private java.lang.String documentText;

    private byte[] documentBytes;

    public Content() {
    }

    public Content(
           org.tatrc.paws.encounter.EnumDocumentFormat documentFormat,
           java.lang.String documentText,
           byte[] documentBytes) {
           this.documentFormat = documentFormat;
           this.documentText = documentText;
           this.documentBytes = documentBytes;
    }


    /**
     * Gets the documentFormat value for this Content.
     * 
     * @return documentFormat
     */
    public org.tatrc.paws.encounter.EnumDocumentFormat getDocumentFormat() {
        return documentFormat;
    }


    /**
     * Sets the documentFormat value for this Content.
     * 
     * @param documentFormat
     */
    public void setDocumentFormat(org.tatrc.paws.encounter.EnumDocumentFormat documentFormat) {
        this.documentFormat = documentFormat;
    }


    /**
     * Gets the documentText value for this Content.
     * 
     * @return documentText
     */
    public java.lang.String getDocumentText() {
        return documentText;
    }


    /**
     * Sets the documentText value for this Content.
     * 
     * @param documentText
     */
    public void setDocumentText(java.lang.String documentText) {
        this.documentText = documentText;
    }


    /**
     * Gets the documentBytes value for this Content.
     * 
     * @return documentBytes
     */
    public byte[] getDocumentBytes() {
        return documentBytes;
    }


    /**
     * Sets the documentBytes value for this Content.
     * 
     * @param documentBytes
     */
    public void setDocumentBytes(byte[] documentBytes) {
        this.documentBytes = documentBytes;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof Content)) return false;
        Content other = (Content) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.documentFormat==null && other.getDocumentFormat()==null) || 
             (this.documentFormat!=null &&
              this.documentFormat.equals(other.getDocumentFormat()))) &&
            ((this.documentText==null && other.getDocumentText()==null) || 
             (this.documentText!=null &&
              this.documentText.equals(other.getDocumentText()))) &&
            ((this.documentBytes==null && other.getDocumentBytes()==null) || 
             (this.documentBytes!=null &&
              java.util.Arrays.equals(this.documentBytes, other.getDocumentBytes())));
        __equalsCalc = null;
        return _equals;
    }

    private boolean __hashCodeCalc = false;
    public synchronized int hashCode() {
        if (__hashCodeCalc) {
            return 0;
        }
        __hashCodeCalc = true;
        int _hashCode = 1;
        if (getDocumentFormat() != null) {
            _hashCode += getDocumentFormat().hashCode();
        }
        if (getDocumentText() != null) {
            _hashCode += getDocumentText().hashCode();
        }
        if (getDocumentBytes() != null) {
            for (int i=0;
                 i<java.lang.reflect.Array.getLength(getDocumentBytes());
                 i++) {
                java.lang.Object obj = java.lang.reflect.Array.get(getDocumentBytes(), i);
                if (obj != null &&
                    !obj.getClass().isArray()) {
                    _hashCode += obj.hashCode();
                }
            }
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(Content.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Content"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("documentFormat");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "DocumentFormat"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "EnumDocumentFormat"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("documentText");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "DocumentText"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("documentBytes");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "DocumentBytes"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "base64Binary"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
    }

    /**
     * Return type metadata object
     */
    public static org.apache.axis.description.TypeDesc getTypeDesc() {
        return typeDesc;
    }

    /**
     * Get Custom Serializer
     */
    public static org.apache.axis.encoding.Serializer getSerializer(
           java.lang.String mechType, 
           java.lang.Class _javaType,  
           javax.xml.namespace.QName _xmlType) {
        return 
          new  org.apache.axis.encoding.ser.BeanSerializer(
            _javaType, _xmlType, typeDesc);
    }

    /**
     * Get Custom Deserializer
     */
    public static org.apache.axis.encoding.Deserializer getDeserializer(
           java.lang.String mechType, 
           java.lang.Class _javaType,  
           javax.xml.namespace.QName _xmlType) {
        return 
          new  org.apache.axis.encoding.ser.BeanDeserializer(
            _javaType, _xmlType, typeDesc);
    }

}
