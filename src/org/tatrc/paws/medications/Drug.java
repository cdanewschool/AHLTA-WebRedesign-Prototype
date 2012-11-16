/**
 * Drug.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.medications;

public class Drug  implements java.io.Serializable {
    private org.tatrc.paws.medications.ConceptValue description;

    private java.lang.String dose;

    private java.lang.String nationalDrugCode;

    private java.lang.String maximumDose;

    public Drug() {
    }

    public Drug(
           org.tatrc.paws.medications.ConceptValue description,
           java.lang.String dose,
           java.lang.String nationalDrugCode,
           java.lang.String maximumDose) {
           this.description = description;
           this.dose = dose;
           this.nationalDrugCode = nationalDrugCode;
           this.maximumDose = maximumDose;
    }


    /**
     * Gets the description value for this Drug.
     * 
     * @return description
     */
    public org.tatrc.paws.medications.ConceptValue getDescription() {
        return description;
    }


    /**
     * Sets the description value for this Drug.
     * 
     * @param description
     */
    public void setDescription(org.tatrc.paws.medications.ConceptValue description) {
        this.description = description;
    }


    /**
     * Gets the dose value for this Drug.
     * 
     * @return dose
     */
    public java.lang.String getDose() {
        return dose;
    }


    /**
     * Sets the dose value for this Drug.
     * 
     * @param dose
     */
    public void setDose(java.lang.String dose) {
        this.dose = dose;
    }


    /**
     * Gets the nationalDrugCode value for this Drug.
     * 
     * @return nationalDrugCode
     */
    public java.lang.String getNationalDrugCode() {
        return nationalDrugCode;
    }


    /**
     * Sets the nationalDrugCode value for this Drug.
     * 
     * @param nationalDrugCode
     */
    public void setNationalDrugCode(java.lang.String nationalDrugCode) {
        this.nationalDrugCode = nationalDrugCode;
    }


    /**
     * Gets the maximumDose value for this Drug.
     * 
     * @return maximumDose
     */
    public java.lang.String getMaximumDose() {
        return maximumDose;
    }


    /**
     * Sets the maximumDose value for this Drug.
     * 
     * @param maximumDose
     */
    public void setMaximumDose(java.lang.String maximumDose) {
        this.maximumDose = maximumDose;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof Drug)) return false;
        Drug other = (Drug) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.description==null && other.getDescription()==null) || 
             (this.description!=null &&
              this.description.equals(other.getDescription()))) &&
            ((this.dose==null && other.getDose()==null) || 
             (this.dose!=null &&
              this.dose.equals(other.getDose()))) &&
            ((this.nationalDrugCode==null && other.getNationalDrugCode()==null) || 
             (this.nationalDrugCode!=null &&
              this.nationalDrugCode.equals(other.getNationalDrugCode()))) &&
            ((this.maximumDose==null && other.getMaximumDose()==null) || 
             (this.maximumDose!=null &&
              this.maximumDose.equals(other.getMaximumDose())));
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
        if (getDescription() != null) {
            _hashCode += getDescription().hashCode();
        }
        if (getDose() != null) {
            _hashCode += getDose().hashCode();
        }
        if (getNationalDrugCode() != null) {
            _hashCode += getNationalDrugCode().hashCode();
        }
        if (getMaximumDose() != null) {
            _hashCode += getMaximumDose().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(Drug.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Drug"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("description");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Description"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "ConceptValue"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("dose");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Dose"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("nationalDrugCode");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "NationalDrugCode"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("maximumDose");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "MaximumDose"));
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
