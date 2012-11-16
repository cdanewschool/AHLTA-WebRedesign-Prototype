/**
 * Refills.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.medications;

public class Refills  implements java.io.Serializable {
    private int ordered;

    private int filled;

    private int remaining;

    public Refills() {
    }

    public Refills(
           int ordered,
           int filled,
           int remaining) {
           this.ordered = ordered;
           this.filled = filled;
           this.remaining = remaining;
    }


    /**
     * Gets the ordered value for this Refills.
     * 
     * @return ordered
     */
    public int getOrdered() {
        return ordered;
    }


    /**
     * Sets the ordered value for this Refills.
     * 
     * @param ordered
     */
    public void setOrdered(int ordered) {
        this.ordered = ordered;
    }


    /**
     * Gets the filled value for this Refills.
     * 
     * @return filled
     */
    public int getFilled() {
        return filled;
    }


    /**
     * Sets the filled value for this Refills.
     * 
     * @param filled
     */
    public void setFilled(int filled) {
        this.filled = filled;
    }


    /**
     * Gets the remaining value for this Refills.
     * 
     * @return remaining
     */
    public int getRemaining() {
        return remaining;
    }


    /**
     * Sets the remaining value for this Refills.
     * 
     * @param remaining
     */
    public void setRemaining(int remaining) {
        this.remaining = remaining;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof Refills)) return false;
        Refills other = (Refills) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            this.ordered == other.getOrdered() &&
            this.filled == other.getFilled() &&
            this.remaining == other.getRemaining();
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
        _hashCode += getOrdered();
        _hashCode += getFilled();
        _hashCode += getRemaining();
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(Refills.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Refills"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("ordered");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Ordered"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "int"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("filled");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Filled"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "int"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("remaining");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Remaining"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "int"));
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
