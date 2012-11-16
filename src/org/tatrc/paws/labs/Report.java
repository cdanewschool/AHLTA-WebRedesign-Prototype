/**
 * Report.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.labs;

public class Report  implements java.io.Serializable {
    private org.tatrc.paws.labs.ConceptValue name;

    private org.tatrc.paws.labs.ResultItem[] resultItems;

    public Report() {
    }

    public Report(
           org.tatrc.paws.labs.ConceptValue name,
           org.tatrc.paws.labs.ResultItem[] resultItems) {
           this.name = name;
           this.resultItems = resultItems;
    }


    /**
     * Gets the name value for this Report.
     * 
     * @return name
     */
    public org.tatrc.paws.labs.ConceptValue getName() {
        return name;
    }


    /**
     * Sets the name value for this Report.
     * 
     * @param name
     */
    public void setName(org.tatrc.paws.labs.ConceptValue name) {
        this.name = name;
    }


    /**
     * Gets the resultItems value for this Report.
     * 
     * @return resultItems
     */
    public org.tatrc.paws.labs.ResultItem[] getResultItems() {
        return resultItems;
    }


    /**
     * Sets the resultItems value for this Report.
     * 
     * @param resultItems
     */
    public void setResultItems(org.tatrc.paws.labs.ResultItem[] resultItems) {
        this.resultItems = resultItems;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof Report)) return false;
        Report other = (Report) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.name==null && other.getName()==null) || 
             (this.name!=null &&
              this.name.equals(other.getName()))) &&
            ((this.resultItems==null && other.getResultItems()==null) || 
             (this.resultItems!=null &&
              java.util.Arrays.equals(this.resultItems, other.getResultItems())));
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
        if (getName() != null) {
            _hashCode += getName().hashCode();
        }
        if (getResultItems() != null) {
            for (int i=0;
                 i<java.lang.reflect.Array.getLength(getResultItems());
                 i++) {
                java.lang.Object obj = java.lang.reflect.Array.get(getResultItems(), i);
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
        new org.apache.axis.description.TypeDesc(Report.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Report"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("name");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Name"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "ConceptValue"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("resultItems");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "ResultItems"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "ResultItem"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        elemField.setItemQName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "ResultItem"));
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
