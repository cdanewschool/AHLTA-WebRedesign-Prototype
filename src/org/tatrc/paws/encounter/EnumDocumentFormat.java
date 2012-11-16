/**
 * EnumDocumentFormat.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.encounter;

public class EnumDocumentFormat implements java.io.Serializable {
    private java.lang.String _value_;
    private static java.util.HashMap _table_ = new java.util.HashMap();

    // Constructor
    protected EnumDocumentFormat(java.lang.String value) {
        _value_ = value;
        _table_.put(_value_,this);
    }

    public static final java.lang.String _RTF = "RTF";
    public static final java.lang.String _HTML = "HTML";
    public static final java.lang.String _PDF = "PDF";
    public static final java.lang.String _None = "None";
    public static final java.lang.String _OfficeOpenXML = "OfficeOpenXML";
    public static final java.lang.String _ConversionException = "ConversionException";
    public static final EnumDocumentFormat RTF = new EnumDocumentFormat(_RTF);
    public static final EnumDocumentFormat HTML = new EnumDocumentFormat(_HTML);
    public static final EnumDocumentFormat PDF = new EnumDocumentFormat(_PDF);
    public static final EnumDocumentFormat None = new EnumDocumentFormat(_None);
    public static final EnumDocumentFormat OfficeOpenXML = new EnumDocumentFormat(_OfficeOpenXML);
    public static final EnumDocumentFormat ConversionException = new EnumDocumentFormat(_ConversionException);
    public java.lang.String getValue() { return _value_;}
    public static EnumDocumentFormat fromValue(java.lang.String value)
          throws java.lang.IllegalArgumentException {
        EnumDocumentFormat enumeration = (EnumDocumentFormat)
            _table_.get(value);
        if (enumeration==null) throw new java.lang.IllegalArgumentException();
        return enumeration;
    }
    public static EnumDocumentFormat fromString(java.lang.String value)
          throws java.lang.IllegalArgumentException {
        return fromValue(value);
    }
    public boolean equals(java.lang.Object obj) {return (obj == this);}
    public int hashCode() { return toString().hashCode();}
    public java.lang.String toString() { return _value_;}
    public java.lang.Object readResolve() throws java.io.ObjectStreamException { return fromValue(_value_);}
    public static org.apache.axis.encoding.Serializer getSerializer(
           java.lang.String mechType, 
           java.lang.Class _javaType,  
           javax.xml.namespace.QName _xmlType) {
        return 
          new org.apache.axis.encoding.ser.EnumSerializer(
            _javaType, _xmlType);
    }
    public static org.apache.axis.encoding.Deserializer getDeserializer(
           java.lang.String mechType, 
           java.lang.Class _javaType,  
           javax.xml.namespace.QName _xmlType) {
        return 
          new org.apache.axis.encoding.ser.EnumDeserializer(
            _javaType, _xmlType);
    }
    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(EnumDocumentFormat.class);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "EnumDocumentFormat"));
    }
    /**
     * Return type metadata object
     */
    public static org.apache.axis.description.TypeDesc getTypeDesc() {
        return typeDesc;
    }

}
