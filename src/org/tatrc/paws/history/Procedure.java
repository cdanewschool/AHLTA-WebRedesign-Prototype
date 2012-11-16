/**
 * Procedure.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.history;

public class Procedure  extends org.tatrc.paws.history.HistoryDomainBase  implements java.io.Serializable {
    private java.util.Calendar datePerformed;

    private java.lang.String CPT4;

    public Procedure() {
    }

    public Procedure(
           java.lang.String unitNumber,
           org.tatrc.paws.history.ConceptValue description,
           java.lang.String comment,
           org.tatrc.paws.history.ConceptValue status,
           java.util.Calendar dateReported,
           org.tatrc.paws.history.ConceptValue source,
           boolean verified,
           org.tatrc.paws.history.ConceptValue clinician,
           java.util.Calendar datePerformed,
           java.lang.String CPT4) {
        super(
            unitNumber,
            description,
            comment,
            status,
            dateReported,
            source,
            verified,
            clinician);
        this.datePerformed = datePerformed;
        this.CPT4 = CPT4;
    }


    /**
     * Gets the datePerformed value for this Procedure.
     * 
     * @return datePerformed
     */
    public java.util.Calendar getDatePerformed() {
        return datePerformed;
    }


    /**
     * Sets the datePerformed value for this Procedure.
     * 
     * @param datePerformed
     */
    public void setDatePerformed(java.util.Calendar datePerformed) {
        this.datePerformed = datePerformed;
    }


    /**
     * Gets the CPT4 value for this Procedure.
     * 
     * @return CPT4
     */
    public java.lang.String getCPT4() {
        return CPT4;
    }


    /**
     * Sets the CPT4 value for this Procedure.
     * 
     * @param CPT4
     */
    public void setCPT4(java.lang.String CPT4) {
        this.CPT4 = CPT4;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof Procedure)) return false;
        Procedure other = (Procedure) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = super.equals(obj) && 
            ((this.datePerformed==null && other.getDatePerformed()==null) || 
             (this.datePerformed!=null &&
              this.datePerformed.equals(other.getDatePerformed()))) &&
            ((this.CPT4==null && other.getCPT4()==null) || 
             (this.CPT4!=null &&
              this.CPT4.equals(other.getCPT4())));
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
        if (getDatePerformed() != null) {
            _hashCode += getDatePerformed().hashCode();
        }
        if (getCPT4() != null) {
            _hashCode += getCPT4().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(Procedure.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Procedure"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("datePerformed");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "DatePerformed"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "dateTime"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("CPT4");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "CPT4"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
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
