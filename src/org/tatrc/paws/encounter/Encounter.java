/**
 * Encounter.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.encounter;

public class Encounter  implements java.io.Serializable {
    private java.lang.String unitNumber;

    private java.util.Calendar date;

    private org.tatrc.paws.encounter.CodeDescription status;

    private org.tatrc.paws.encounter.CodeDescription encounterType;

    private java.lang.String primaryDx;

    private org.tatrc.paws.encounter.Clinic clinic;

    private org.tatrc.paws.encounter.ConceptValue clinician;

    private java.lang.String id;

    private org.tatrc.paws.encounter.ConceptValue facility;

    private org.tatrc.paws.encounter.Content[] SF600S;

    private boolean sensitive;
    
    public Encounter() {
    }

    public Encounter(
           java.lang.String unitNumber,
           java.util.Calendar date,
           org.tatrc.paws.encounter.CodeDescription status,
           org.tatrc.paws.encounter.CodeDescription encounterType,
           java.lang.String primaryDx,
           org.tatrc.paws.encounter.Clinic clinic,
           org.tatrc.paws.encounter.ConceptValue clinician,
           java.lang.String id,
           org.tatrc.paws.encounter.ConceptValue facility,
           boolean sensitive,
           org.tatrc.paws.encounter.Content[] SF600S) {
           this.unitNumber = unitNumber;
           this.date = date;
           this.status = status;
           this.encounterType = encounterType;
           this.primaryDx = primaryDx;
           this.clinic = clinic;
           this.clinician = clinician;
           this.id = id;
           this.facility = facility;
           this.SF600S = SF600S;
           this.sensitive = sensitive;
    }


    /**
     * Gets the unitNumber value for this Encounter.
     * 
     * @return unitNumber
     */
    public java.lang.String getUnitNumber() {
        return unitNumber;
    }


    /**
     * Sets the unitNumber value for this Encounter.
     * 
     * @param unitNumber
     */
    public void setUnitNumber(java.lang.String unitNumber) {
        this.unitNumber = unitNumber;
    }


    /**
     * Gets the date value for this Encounter.
     * 
     * @return date
     */
    public java.util.Calendar getDate() {
        return date;
    }


    /**
     * Sets the date value for this Encounter.
     * 
     * @param date
     */
    public void setDate(java.util.Calendar date) {
        this.date = date;
    }


    /**
     * Gets the status value for this Encounter.
     * 
     * @return status
     */
    public org.tatrc.paws.encounter.CodeDescription getStatus() {
        return status;
    }


    /**
     * Sets the status value for this Encounter.
     * 
     * @param status
     */
    public void setStatus(org.tatrc.paws.encounter.CodeDescription status) {
        this.status = status;
    }


    /**
     * Gets the encounterType value for this Encounter.
     * 
     * @return encounterType
     */
    public org.tatrc.paws.encounter.CodeDescription getEncounterType() {
        return encounterType;
    }


    /**
     * Sets the encounterType value for this Encounter.
     * 
     * @param encounterType
     */
    public void setEncounterType(org.tatrc.paws.encounter.CodeDescription encounterType) {
        this.encounterType = encounterType;
    }


    /**
     * Gets the primaryDx value for this Encounter.
     * 
     * @return primaryDx
     */
    public java.lang.String getPrimaryDx() {
        return primaryDx;
    }


    /**
     * Sets the primaryDx value for this Encounter.
     * 
     * @param primaryDx
     */
    public void setPrimaryDx(java.lang.String primaryDx) {
        this.primaryDx = primaryDx;
    }


    /**
     * Gets the clinic value for this Encounter.
     * 
     * @return clinic
     */
    public org.tatrc.paws.encounter.Clinic getClinic() {
        return clinic;
    }


    /**
     * Sets the clinic value for this Encounter.
     * 
     * @param clinic
     */
    public void setClinic(org.tatrc.paws.encounter.Clinic clinic) {
        this.clinic = clinic;
    }


    /**
     * Gets the clinician value for this Encounter.
     * 
     * @return clinician
     */
    public org.tatrc.paws.encounter.ConceptValue getClinician() {
        return clinician;
    }


    /**
     * Sets the clinician value for this Encounter.
     * 
     * @param clinician
     */
    public void setClinician(org.tatrc.paws.encounter.ConceptValue clinician) {
        this.clinician = clinician;
    }


    /**
     * Gets the id value for this Encounter.
     * 
     * @return id
     */
    public java.lang.String getId() {
        return id;
    }


    /**
     * Sets the id value for this Encounter.
     * 
     * @param id
     */
    public void setId(java.lang.String id) {
        this.id = id;
    }


    /**
     * Gets the facility value for this Encounter.
     * 
     * @return facility
     */
    public org.tatrc.paws.encounter.ConceptValue getFacility() {
        return facility;
    }


    /**
     * Sets the facility value for this Encounter.
     * 
     * @param facility
     */
    public void setFacility(org.tatrc.paws.encounter.ConceptValue facility) {
        this.facility = facility;
    }


    /**
     * Gets the SF600S value for this Encounter.
     * 
     * @return SF600S
     */
    public org.tatrc.paws.encounter.Content[] getSF600S() {
        return SF600S;
    }


    /**
     * Sets the SF600S value for this Encounter.
     * 
     * @param SF600S
     */
    public void setSF600S(org.tatrc.paws.encounter.Content[] SF600S) {
        this.SF600S = SF600S;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof Encounter)) return false;
        Encounter other = (Encounter) obj;
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
            ((this.date==null && other.getDate()==null) || 
             (this.date!=null &&
              this.date.equals(other.getDate()))) &&
            ((this.status==null && other.getStatus()==null) || 
             (this.status!=null &&
              this.status.equals(other.getStatus()))) &&
            ((this.encounterType==null && other.getEncounterType()==null) || 
             (this.encounterType!=null &&
              this.encounterType.equals(other.getEncounterType()))) &&
            ((this.primaryDx==null && other.getPrimaryDx()==null) || 
             (this.primaryDx!=null &&
              this.primaryDx.equals(other.getPrimaryDx()))) &&
            ((this.clinic==null && other.getClinic()==null) || 
             (this.clinic!=null &&
              this.clinic.equals(other.getClinic()))) &&
            ((this.clinician==null && other.getClinician()==null) || 
             (this.clinician!=null &&
              this.clinician.equals(other.getClinician()))) &&
            ((this.id==null && other.getId()==null) || 
             (this.id!=null &&
              this.id.equals(other.getId()))) &&
            ((this.facility==null && other.getFacility()==null) || 
             (this.facility!=null &&
              this.facility.equals(other.getFacility()))) &&
            ((this.SF600S==null && other.getSF600S()==null) || 
             (this.SF600S!=null &&
              java.util.Arrays.equals(this.SF600S, other.getSF600S()))) &&
              this.sensitive == other.isSensitive();
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
        if (getDate() != null) {
            _hashCode += getDate().hashCode();
        }
        if (getStatus() != null) {
            _hashCode += getStatus().hashCode();
        }
        if (getEncounterType() != null) {
            _hashCode += getEncounterType().hashCode();
        }
        if (getPrimaryDx() != null) {
            _hashCode += getPrimaryDx().hashCode();
        }
        if (getClinic() != null) {
            _hashCode += getClinic().hashCode();
        }
        if (getClinician() != null) {
            _hashCode += getClinician().hashCode();
        }
        if (getId() != null) {
            _hashCode += getId().hashCode();
        }
        if (getFacility() != null) {
            _hashCode += getFacility().hashCode();
        }
        if (getSF600S() != null) {
            for (int i=0;
                 i<java.lang.reflect.Array.getLength(getSF600S());
                 i++) {
                java.lang.Object obj = java.lang.reflect.Array.get(getSF600S(), i);
                if (obj != null &&
                    !obj.getClass().isArray()) {
                    _hashCode += obj.hashCode();
                }
            }
        }
        //added new params per update on services by dod - mk 12/14/2011
        
        _hashCode += (isSensitive() ? Boolean.TRUE : Boolean.FALSE).hashCode();
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(Encounter.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Encounter"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("unitNumber");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "UnitNumber"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("date");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Date"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "dateTime"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("status");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Status"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "CodeDescription"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("encounterType");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "EncounterType"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "CodeDescription"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("primaryDx");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "PrimaryDx"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("clinic");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Clinic"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Clinic"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("clinician");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Clinician"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "ConceptValue"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("id");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Id"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("facility");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Facility"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "ConceptValue"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("SF600S");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "SF600s"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Content"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        elemField.setItemQName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Content"));
        typeDesc.addFieldDesc(elemField);
        
        //added new params per update on services by dod - mk 12/14/2011
        
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("sensitive");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Sensitive"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "boolean"));
        //elemField.setMinOccurs(1);
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

    /**
     * @param sensitive the sensitive to set
     */
    public void setSensitive(boolean sensitive) {
        this.sensitive = sensitive;
    }

    /**
     * @return the sensitive
     */
    public boolean isSensitive() {
        return sensitive;
    }

}
