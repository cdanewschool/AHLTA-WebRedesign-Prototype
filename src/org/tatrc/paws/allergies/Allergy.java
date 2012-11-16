/**
 * Allergy.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.allergies;

public class Allergy  implements java.io.Serializable {
    private java.lang.String unitNumber;

    private org.tatrc.paws.allergies.ConceptValue allergen;

    private org.tatrc.paws.allergies.ConceptValue[] reactions;

    private java.util.Calendar onset;

    private org.tatrc.paws.allergies.ConceptValue infoSource;

    private org.tatrc.paws.allergies.ConceptValue clinician;

    private java.lang.String comments;

    private org.tatrc.paws.allergies.ConceptValue origin;

    private org.tatrc.paws.allergies.ConceptValue facility;

    private org.tatrc.paws.allergies.ConceptValue allergyType;

    public Allergy() {
    }

    public Allergy(
           java.lang.String unitNumber,
           org.tatrc.paws.allergies.ConceptValue allergen,
           org.tatrc.paws.allergies.ConceptValue[] reactions,
           java.util.Calendar onset,
           org.tatrc.paws.allergies.ConceptValue infoSource,
           org.tatrc.paws.allergies.ConceptValue clinician,
           java.lang.String comments,
           org.tatrc.paws.allergies.ConceptValue origin,
           org.tatrc.paws.allergies.ConceptValue facility,
           org.tatrc.paws.allergies.ConceptValue allergyType) {
           this.unitNumber = unitNumber;
           this.allergen = allergen;
           this.reactions = reactions;
           this.onset = onset;
           this.infoSource = infoSource;
           this.clinician = clinician;
           this.comments = comments;
           this.origin = origin;
           this.facility = facility;
           this.allergyType = allergyType;
    }


    /**
     * Gets the unitNumber value for this Allergy.
     * 
     * @return unitNumber
     */
    public java.lang.String getUnitNumber() {
        return unitNumber;
    }


    /**
     * Sets the unitNumber value for this Allergy.
     * 
     * @param unitNumber
     */
    public void setUnitNumber(java.lang.String unitNumber) {
        this.unitNumber = unitNumber;
    }


    /**
     * Gets the allergen value for this Allergy.
     * 
     * @return allergen
     */
    public org.tatrc.paws.allergies.ConceptValue getAllergen() {
        return allergen;
    }


    /**
     * Sets the allergen value for this Allergy.
     * 
     * @param allergen
     */
    public void setAllergen(org.tatrc.paws.allergies.ConceptValue allergen) {
        this.allergen = allergen;
    }


    /**
     * Gets the reactions value for this Allergy.
     * 
     * @return reactions
     */
    public org.tatrc.paws.allergies.ConceptValue[] getReactions() {
        return reactions;
    }


    /**
     * Sets the reactions value for this Allergy.
     * 
     * @param reactions
     */
    public void setReactions(org.tatrc.paws.allergies.ConceptValue[] reactions) {
        this.reactions = reactions;
    }


    /**
     * Gets the onset value for this Allergy.
     * 
     * @return onset
     */
    public java.util.Calendar getOnset() {
        return onset;
    }


    /**
     * Sets the onset value for this Allergy.
     * 
     * @param onset
     */
    public void setOnset(java.util.Calendar onset) {
        this.onset = onset;
    }


    /**
     * Gets the infoSource value for this Allergy.
     * 
     * @return infoSource
     */
    public org.tatrc.paws.allergies.ConceptValue getInfoSource() {
        return infoSource;
    }


    /**
     * Sets the infoSource value for this Allergy.
     * 
     * @param infoSource
     */
    public void setInfoSource(org.tatrc.paws.allergies.ConceptValue infoSource) {
        this.infoSource = infoSource;
    }


    /**
     * Gets the clinician value for this Allergy.
     * 
     * @return clinician
     */
    public org.tatrc.paws.allergies.ConceptValue getClinician() {
        return clinician;
    }


    /**
     * Sets the clinician value for this Allergy.
     * 
     * @param clinician
     */
    public void setClinician(org.tatrc.paws.allergies.ConceptValue clinician) {
        this.clinician = clinician;
    }


    /**
     * Gets the comments value for this Allergy.
     * 
     * @return comments
     */
    public java.lang.String getComments() {
        return comments;
    }


    /**
     * Sets the comments value for this Allergy.
     * 
     * @param comments
     */
    public void setComments(java.lang.String comments) {
        this.comments = comments;
    }


    /**
     * Gets the origin value for this Allergy.
     * 
     * @return origin
     */
    public org.tatrc.paws.allergies.ConceptValue getOrigin() {
        return origin;
    }


    /**
     * Sets the origin value for this Allergy.
     * 
     * @param origin
     */
    public void setOrigin(org.tatrc.paws.allergies.ConceptValue origin) {
        this.origin = origin;
    }


    /**
     * Gets the facility value for this Allergy.
     * 
     * @return facility
     */
    public org.tatrc.paws.allergies.ConceptValue getFacility() {
        return facility;
    }


    /**
     * Sets the facility value for this Allergy.
     * 
     * @param facility
     */
    public void setFacility(org.tatrc.paws.allergies.ConceptValue facility) {
        this.facility = facility;
    }


    /**
     * Gets the allergyType value for this Allergy.
     * 
     * @return allergyType
     */
    public org.tatrc.paws.allergies.ConceptValue getAllergyType() {
        return allergyType;
    }


    /**
     * Sets the allergyType value for this Allergy.
     * 
     * @param allergyType
     */
    public void setAllergyType(org.tatrc.paws.allergies.ConceptValue allergyType) {
        this.allergyType = allergyType;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof Allergy)) return false;
        Allergy other = (Allergy) obj;
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
            ((this.allergen==null && other.getAllergen()==null) || 
             (this.allergen!=null &&
              this.allergen.equals(other.getAllergen()))) &&
            ((this.reactions==null && other.getReactions()==null) || 
             (this.reactions!=null &&
              java.util.Arrays.equals(this.reactions, other.getReactions()))) &&
            ((this.onset==null && other.getOnset()==null) || 
             (this.onset!=null &&
              this.onset.equals(other.getOnset()))) &&
            ((this.infoSource==null && other.getInfoSource()==null) || 
             (this.infoSource!=null &&
              this.infoSource.equals(other.getInfoSource()))) &&
            ((this.clinician==null && other.getClinician()==null) || 
             (this.clinician!=null &&
              this.clinician.equals(other.getClinician()))) &&
            ((this.comments==null && other.getComments()==null) || 
             (this.comments!=null &&
              this.comments.equals(other.getComments()))) &&
            ((this.origin==null && other.getOrigin()==null) || 
             (this.origin!=null &&
              this.origin.equals(other.getOrigin()))) &&
            ((this.facility==null && other.getFacility()==null) || 
             (this.facility!=null &&
              this.facility.equals(other.getFacility()))) &&
            ((this.allergyType==null && other.getAllergyType()==null) || 
             (this.allergyType!=null &&
              this.allergyType.equals(other.getAllergyType())));
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
        if (getAllergen() != null) {
            _hashCode += getAllergen().hashCode();
        }
        if (getReactions() != null) {
            for (int i=0;
                 i<java.lang.reflect.Array.getLength(getReactions());
                 i++) {
                java.lang.Object obj = java.lang.reflect.Array.get(getReactions(), i);
                if (obj != null &&
                    !obj.getClass().isArray()) {
                    _hashCode += obj.hashCode();
                }
            }
        }
        if (getOnset() != null) {
            _hashCode += getOnset().hashCode();
        }
        if (getInfoSource() != null) {
            _hashCode += getInfoSource().hashCode();
        }
        if (getClinician() != null) {
            _hashCode += getClinician().hashCode();
        }
        if (getComments() != null) {
            _hashCode += getComments().hashCode();
        }
        if (getOrigin() != null) {
            _hashCode += getOrigin().hashCode();
        }
        if (getFacility() != null) {
            _hashCode += getFacility().hashCode();
        }
        if (getAllergyType() != null) {
            _hashCode += getAllergyType().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(Allergy.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Allergy"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("unitNumber");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "UnitNumber"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("allergen");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Allergen"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "ConceptValue"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("reactions");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Reactions"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "ConceptValue"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        elemField.setItemQName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "ConceptValue"));
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("onset");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Onset"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "dateTime"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("infoSource");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "InfoSource"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "ConceptValue"));
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
        elemField.setFieldName("comments");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Comments"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("origin");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Origin"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "ConceptValue"));
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
        elemField.setFieldName("allergyType");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "AllergyType"));
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
