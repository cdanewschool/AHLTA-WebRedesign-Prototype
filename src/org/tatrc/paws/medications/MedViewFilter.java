/**
 * MedViewFilter.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.medications;

public class MedViewFilter implements java.io.Serializable {
    private java.lang.String _value_;
    private static java.util.HashMap _table_ = new java.util.HashMap();

    // Constructor
    protected MedViewFilter(java.lang.String value) {
        _value_ = value;
        _table_.put(_value_,this);
    }

    public static final java.lang.String _All_All = "All_All";
    public static final java.lang.String _All_Current = "All_Current";
    public static final java.lang.String _All_Discontinued = "All_Discontinued";
    public static final java.lang.String _OutPatient_All = "OutPatient_All";
    public static final java.lang.String _OutPatient_Current = "OutPatient_Current";
    public static final java.lang.String _OutPatient_Discontinued = "OutPatient_Discontinued";
    public static final java.lang.String _InPatient_All = "InPatient_All";
    public static final java.lang.String _InPatient_Current = "InPatient_Current";
    public static final java.lang.String _InPatient_Discontinued = "InPatient_Discontinued";
    public static final java.lang.String _Expired_All = "Expired_All";
    public static final java.lang.String _Expired_Within_Year = "Expired_Within_Year";
    public static final MedViewFilter All_All = new MedViewFilter(_All_All);
    public static final MedViewFilter All_Current = new MedViewFilter(_All_Current);
    public static final MedViewFilter All_Discontinued = new MedViewFilter(_All_Discontinued);
    public static final MedViewFilter OutPatient_All = new MedViewFilter(_OutPatient_All);
    public static final MedViewFilter OutPatient_Current = new MedViewFilter(_OutPatient_Current);
    public static final MedViewFilter OutPatient_Discontinued = new MedViewFilter(_OutPatient_Discontinued);
    public static final MedViewFilter InPatient_All = new MedViewFilter(_InPatient_All);
    public static final MedViewFilter InPatient_Current = new MedViewFilter(_InPatient_Current);
    public static final MedViewFilter InPatient_Discontinued = new MedViewFilter(_InPatient_Discontinued);
    public static final MedViewFilter Expired_All = new MedViewFilter(_Expired_All);
    public static final MedViewFilter Expired_Within_Year = new MedViewFilter(_Expired_Within_Year);
    public java.lang.String getValue() { return _value_;}
    public static MedViewFilter fromValue(java.lang.String value)
          throws java.lang.IllegalArgumentException {
        MedViewFilter enumeration = (MedViewFilter)
            _table_.get(value);
        if (enumeration==null) throw new java.lang.IllegalArgumentException();
        return enumeration;
    }
    public static MedViewFilter fromString(java.lang.String value)
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
        new org.apache.axis.description.TypeDesc(MedViewFilter.class);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "MedViewFilter"));
    }
    /**
     * Return type metadata object
     */
    public static org.apache.axis.description.TypeDesc getTypeDesc() {
        return typeDesc;
    }

}
