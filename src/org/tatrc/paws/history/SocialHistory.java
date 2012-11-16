/**
 * SocialHistory.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.history;

public class SocialHistory  extends org.tatrc.paws.history.HistoryDomainBase  implements java.io.Serializable {
    private java.util.Calendar dateOnset;

    public SocialHistory() {
    }

    public SocialHistory(
           java.lang.String unitNumber,
           org.tatrc.paws.history.ConceptValue description,
           java.lang.String comment,
           org.tatrc.paws.history.ConceptValue status,
           java.util.Calendar dateReported,
           org.tatrc.paws.history.ConceptValue source,
           boolean verified,
           org.tatrc.paws.history.ConceptValue clinician,
           java.util.Calendar dateOnset) {
        super(
            unitNumber,
            description,
            comment,
            status,
            dateReported,
            source,
            verified,
            clinician);
        this.dateOnset = dateOnset;
    }


    /**
     * Gets the dateOnset value for this SocialHistory.
     * 
     * @return dateOnset
     */
    public java.util.Calendar getDateOnset() {
        return dateOnset;
    }


    /**
     * Sets the dateOnset value for this SocialHistory.
     * 
     * @param dateOnset
     */
    public void setDateOnset(java.util.Calendar dateOnset) {
        this.dateOnset = dateOnset;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof SocialHistory)) return false;
        SocialHistory other = (SocialHistory) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = super.equals(obj) && 
            ((this.dateOnset==null && other.getDateOnset()==null) || 
             (this.dateOnset!=null &&
              this.dateOnset.equals(other.getDateOnset())));
        __equalsCalc = null;
        return _equals;
    }

    private boolean __hashCodeCalc = false;
    public synchronized int hashCode() {
        if (__hashCodeCalc) {
            return 0;
        }
        __hashCodeCalc = true;
        int _hashCode = super.hashCode();
        if (getDateOnset() != null) {
            _hashCode += getDateOnset().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(SocialHistory.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "SocialHistory"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("dateOnset");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "DateOnset"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "dateTime"));
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
