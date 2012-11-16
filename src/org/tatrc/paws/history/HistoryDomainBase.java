/**
 * HistoryDomainBase.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.history;

public class HistoryDomainBase  implements java.io.Serializable {
    private java.lang.String unitNumber;

    private org.tatrc.paws.history.ConceptValue description;

    private java.lang.String comment;

    private org.tatrc.paws.history.ConceptValue status;

    private java.util.Calendar dateReported;

    private org.tatrc.paws.history.ConceptValue source;

    private boolean verified;

    private org.tatrc.paws.history.ConceptValue clinician;

    public HistoryDomainBase() {
    }

    public HistoryDomainBase(
           java.lang.String unitNumber,
           org.tatrc.paws.history.ConceptValue description,
           java.lang.String comment,
           org.tatrc.paws.history.ConceptValue status,
           java.util.Calendar dateReported,
           org.tatrc.paws.history.ConceptValue source,
           boolean verified,
           org.tatrc.paws.history.ConceptValue clinician) {
           this.unitNumber = unitNumber;
           this.description = description;
           this.comment = comment;
           this.status = status;
           this.dateReported = dateReported;
           this.source = source;
           this.verified = verified;
           this.clinician = clinician;
    }


    /**
     * Gets the unitNumber value for this HistoryDomainBase.
     * 
     * @return unitNumber
     */
    public java.lang.String getUnitNumber() {
        return unitNumber;
    }


    /**
     * Sets the unitNumber value for this HistoryDomainBase.
     * 
     * @param unitNumber
     */
    public void setUnitNumber(java.lang.String unitNumber) {
        this.unitNumber = unitNumber;
    }


    /**
     * Gets the description value for this HistoryDomainBase.
     * 
     * @return description
     */
    public org.tatrc.paws.history.ConceptValue getDescription() {
        return description;
    }


    /**
     * Sets the description value for this HistoryDomainBase.
     * 
     * @param description
     */
    public void setDescription(org.tatrc.paws.history.ConceptValue description) {
        this.description = description;
    }


    /**
     * Gets the comment value for this HistoryDomainBase.
     * 
     * @return comment
     */
    public java.lang.String getComment() {
        return comment;
    }


    /**
     * Sets the comment value for this HistoryDomainBase.
     * 
     * @param comment
     */
    public void setComment(java.lang.String comment) {
        this.comment = comment;
    }


    /**
     * Gets the status value for this HistoryDomainBase.
     * 
     * @return status
     */
    public org.tatrc.paws.history.ConceptValue getStatus() {
        return status;
    }


    /**
     * Sets the status value for this HistoryDomainBase.
     * 
     * @param status
     */
    public void setStatus(org.tatrc.paws.history.ConceptValue status) {
        this.status = status;
    }


    /**
     * Gets the dateReported value for this HistoryDomainBase.
     * 
     * @return dateReported
     */
    public java.util.Calendar getDateReported() {
        return dateReported;
    }


    /**
     * Sets the dateReported value for this HistoryDomainBase.
     * 
     * @param dateReported
     */
    public void setDateReported(java.util.Calendar dateReported) {
        this.dateReported = dateReported;
    }


    /**
     * Gets the source value for this HistoryDomainBase.
     * 
     * @return source
     */
    public org.tatrc.paws.history.ConceptValue getSource() {
        return source;
    }


    /**
     * Sets the source value for this HistoryDomainBase.
     * 
     * @param source
     */
    public void setSource(org.tatrc.paws.history.ConceptValue source) {
        this.source = source;
    }


    /**
     * Gets the verified value for this HistoryDomainBase.
     * 
     * @return verified
     */
    public boolean isVerified() {
        return verified;
    }


    /**
     * Sets the verified value for this HistoryDomainBase.
     * 
     * @param verified
     */
    public void setVerified(boolean verified) {
        this.verified = verified;
    }


    /**
     * Gets the clinician value for this HistoryDomainBase.
     * 
     * @return clinician
     */
    public org.tatrc.paws.history.ConceptValue getClinician() {
        return clinician;
    }


    /**
     * Sets the clinician value for this HistoryDomainBase.
     * 
     * @param clinician
     */
    public void setClinician(org.tatrc.paws.history.ConceptValue clinician) {
        this.clinician = clinician;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof HistoryDomainBase)) return false;
        HistoryDomainBase other = (HistoryDomainBase) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.unitNumber==null && other.getUnitNumber()==null) || 
             (this.unitNumber!=null &&
              this.unitNumber.equals(other.getUnitNumber()))) &&
            ((this.description==null && other.getDescription()==null) || 
             (this.description!=null &&
              this.description.equals(other.getDescription()))) &&
            ((this.comment==null && other.getComment()==null) || 
             (this.comment!=null &&
              this.comment.equals(other.getComment()))) &&
            ((this.status==null && other.getStatus()==null) || 
             (this.status!=null &&
              this.status.equals(other.getStatus()))) &&
            ((this.dateReported==null && other.getDateReported()==null) || 
             (this.dateReported!=null &&
              this.dateReported.equals(other.getDateReported()))) &&
            ((this.source==null && other.getSource()==null) || 
             (this.source!=null &&
              this.source.equals(other.getSource()))) &&
            this.verified == other.isVerified() &&
            ((this.clinician==null && other.getClinician()==null) || 
             (this.clinician!=null &&
              this.clinician.equals(other.getClinician())));
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
        if (getUnitNumber() != null) {
            _hashCode += getUnitNumber().hashCode();
        }
        if (getDescription() != null) {
            _hashCode += getDescription().hashCode();
        }
        if (getComment() != null) {
            _hashCode += getComment().hashCode();
        }
        if (getStatus() != null) {
            _hashCode += getStatus().hashCode();
        }
        if (getDateReported() != null) {
            _hashCode += getDateReported().hashCode();
        }
        if (getSource() != null) {
            _hashCode += getSource().hashCode();
        }
        _hashCode += (isVerified() ? Boolean.TRUE : Boolean.FALSE).hashCode();
        if (getClinician() != null) {
            _hashCode += getClinician().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(HistoryDomainBase.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "HistoryDomainBase"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("unitNumber");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "UnitNumber"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("description");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Description"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "ConceptValue"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("comment");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Comment"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("status");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Status"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "ConceptValue"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("dateReported");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "DateReported"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "dateTime"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("source");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Source"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "ConceptValue"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("verified");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Verified"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "boolean"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("clinician");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Clinician"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "ConceptValue"));
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
