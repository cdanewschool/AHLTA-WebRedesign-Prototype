/**
 * DMIS.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.encounter;

public class DMIS  implements java.io.Serializable {
    private java.lang.String ID;

    private java.lang.String parentID;

    private java.lang.String facilityServiceCode;

    private java.lang.String facilityType;

    private java.lang.String description;

    public DMIS() {
    }

    public DMIS(
           java.lang.String ID,
           java.lang.String parentID,
           java.lang.String facilityServiceCode,
           java.lang.String facilityType,
           java.lang.String description) {
           this.ID = ID;
           this.parentID = parentID;
           this.facilityServiceCode = facilityServiceCode;
           this.facilityType = facilityType;
           this.description = description;
    }


    /**
     * Gets the ID value for this DMIS.
     * 
     * @return ID
     */
    public java.lang.String getID() {
        return ID;
    }


    /**
     * Sets the ID value for this DMIS.
     * 
     * @param ID
     */
    public void setID(java.lang.String ID) {
        this.ID = ID;
    }


    /**
     * Gets the parentID value for this DMIS.
     * 
     * @return parentID
     */
    public java.lang.String getParentID() {
        return parentID;
    }


    /**
     * Sets the parentID value for this DMIS.
     * 
     * @param parentID
     */
    public void setParentID(java.lang.String parentID) {
        this.parentID = parentID;
    }


    /**
     * Gets the facilityServiceCode value for this DMIS.
     * 
     * @return facilityServiceCode
     */
    public java.lang.String getFacilityServiceCode() {
        return facilityServiceCode;
    }


    /**
     * Sets the facilityServiceCode value for this DMIS.
     * 
     * @param facilityServiceCode
     */
    public void setFacilityServiceCode(java.lang.String facilityServiceCode) {
        this.facilityServiceCode = facilityServiceCode;
    }


    /**
     * Gets the facilityType value for this DMIS.
     * 
     * @return facilityType
     */
    public java.lang.String getFacilityType() {
        return facilityType;
    }


    /**
     * Sets the facilityType value for this DMIS.
     * 
     * @param facilityType
     */
    public void setFacilityType(java.lang.String facilityType) {
        this.facilityType = facilityType;
    }


    /**
     * Gets the description value for this DMIS.
     * 
     * @return description
     */
    public java.lang.String getDescription() {
        return description;
    }


    /**
     * Sets the description value for this DMIS.
     * 
     * @param description
     */
    public void setDescription(java.lang.String description) {
        this.description = description;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof DMIS)) return false;
        DMIS other = (DMIS) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.ID==null && other.getID()==null) || 
             (this.ID!=null &&
              this.ID.equals(other.getID()))) &&
            ((this.parentID==null && other.getParentID()==null) || 
             (this.parentID!=null &&
              this.parentID.equals(other.getParentID()))) &&
            ((this.facilityServiceCode==null && other.getFacilityServiceCode()==null) || 
             (this.facilityServiceCode!=null &&
              this.facilityServiceCode.equals(other.getFacilityServiceCode()))) &&
            ((this.facilityType==null && other.getFacilityType()==null) || 
             (this.facilityType!=null &&
              this.facilityType.equals(other.getFacilityType()))) &&
            ((this.description==null && other.getDescription()==null) || 
             (this.description!=null &&
              this.description.equals(other.getDescription())));
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
        if (getID() != null) {
            _hashCode += getID().hashCode();
        }
        if (getParentID() != null) {
            _hashCode += getParentID().hashCode();
        }
        if (getFacilityServiceCode() != null) {
            _hashCode += getFacilityServiceCode().hashCode();
        }
        if (getFacilityType() != null) {
            _hashCode += getFacilityType().hashCode();
        }
        if (getDescription() != null) {
            _hashCode += getDescription().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(DMIS.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "DMIS"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("ID");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "ID"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("parentID");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "ParentID"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("facilityServiceCode");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "FacilityServiceCode"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("facilityType");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "FacilityType"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("description");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Description"));
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
