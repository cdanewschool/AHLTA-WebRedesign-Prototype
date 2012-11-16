/**
 * Clinic.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.facility;

public class Clinic  implements java.io.Serializable {
    private java.lang.String NCID;

    private java.lang.String IEN;

    private java.lang.String representation;

    private org.tatrc.paws.facility.Telecom[] telecoms;

    private org.tatrc.paws.facility.Address[] addresses;

    private org.tatrc.paws.facility.ConceptValue facility;

    private org.tatrc.paws.facility.MEPRS MEPRS;

    private org.tatrc.paws.facility.DMIS DMIS;

    private org.tatrc.paws.facility.CodeDescription location;

    private boolean walkInAllowed;

    private boolean sickCallAllowed;

    private boolean active;

    public Clinic() {
    }

    public Clinic(
           java.lang.String NCID,
           java.lang.String IEN,
           java.lang.String representation,
           org.tatrc.paws.facility.Telecom[] telecoms,
           org.tatrc.paws.facility.Address[] addresses,
           org.tatrc.paws.facility.ConceptValue facility,
           org.tatrc.paws.facility.MEPRS MEPRS,
           org.tatrc.paws.facility.DMIS DMIS,
           org.tatrc.paws.facility.CodeDescription location,
           boolean walkInAllowed,
           boolean sickCallAllowed,
           boolean active) {
           this.NCID = NCID;
           this.IEN = IEN;
           this.representation = representation;
           this.telecoms = telecoms;
           this.addresses = addresses;
           this.facility = facility;
           this.MEPRS = MEPRS;
           this.DMIS = DMIS;
           this.location = location;
           this.walkInAllowed = walkInAllowed;
           this.sickCallAllowed = sickCallAllowed;
           this.active = active;
    }


    /**
     * Gets the NCID value for this Clinic.
     * 
     * @return NCID
     */
    public java.lang.String getNCID() {
        return NCID;
    }


    /**
     * Sets the NCID value for this Clinic.
     * 
     * @param NCID
     */
    public void setNCID(java.lang.String NCID) {
        this.NCID = NCID;
    }


    /**
     * Gets the IEN value for this Clinic.
     * 
     * @return IEN
     */
    public java.lang.String getIEN() {
        return IEN;
    }


    /**
     * Sets the IEN value for this Clinic.
     * 
     * @param IEN
     */
    public void setIEN(java.lang.String IEN) {
        this.IEN = IEN;
    }


    /**
     * Gets the representation value for this Clinic.
     * 
     * @return representation
     */
    public java.lang.String getRepresentation() {
        return representation;
    }


    /**
     * Sets the representation value for this Clinic.
     * 
     * @param representation
     */
    public void setRepresentation(java.lang.String representation) {
        this.representation = representation;
    }


    /**
     * Gets the telecoms value for this Clinic.
     * 
     * @return telecoms
     */
    public org.tatrc.paws.facility.Telecom[] getTelecoms() {
        return telecoms;
    }


    /**
     * Sets the telecoms value for this Clinic.
     * 
     * @param telecoms
     */
    public void setTelecoms(org.tatrc.paws.facility.Telecom[] telecoms) {
        this.telecoms = telecoms;
    }


    /**
     * Gets the addresses value for this Clinic.
     * 
     * @return addresses
     */
    public org.tatrc.paws.facility.Address[] getAddresses() {
        return addresses;
    }


    /**
     * Sets the addresses value for this Clinic.
     * 
     * @param addresses
     */
    public void setAddresses(org.tatrc.paws.facility.Address[] addresses) {
        this.addresses = addresses;
    }


    /**
     * Gets the facility value for this Clinic.
     * 
     * @return facility
     */
    public org.tatrc.paws.facility.ConceptValue getFacility() {
        return facility;
    }


    /**
     * Sets the facility value for this Clinic.
     * 
     * @param facility
     */
    public void setFacility(org.tatrc.paws.facility.ConceptValue facility) {
        this.facility = facility;
    }


    /**
     * Gets the MEPRS value for this Clinic.
     * 
     * @return MEPRS
     */
    public org.tatrc.paws.facility.MEPRS getMEPRS() {
        return MEPRS;
    }


    /**
     * Sets the MEPRS value for this Clinic.
     * 
     * @param MEPRS
     */
    public void setMEPRS(org.tatrc.paws.facility.MEPRS MEPRS) {
        this.MEPRS = MEPRS;
    }


    /**
     * Gets the DMIS value for this Clinic.
     * 
     * @return DMIS
     */
    public org.tatrc.paws.facility.DMIS getDMIS() {
        return DMIS;
    }


    /**
     * Sets the DMIS value for this Clinic.
     * 
     * @param DMIS
     */
    public void setDMIS(org.tatrc.paws.facility.DMIS DMIS) {
        this.DMIS = DMIS;
    }


    /**
     * Gets the location value for this Clinic.
     * 
     * @return location
     */
    public org.tatrc.paws.facility.CodeDescription getLocation() {
        return location;
    }


    /**
     * Sets the location value for this Clinic.
     * 
     * @param location
     */
    public void setLocation(org.tatrc.paws.facility.CodeDescription location) {
        this.location = location;
    }


    /**
     * Gets the walkInAllowed value for this Clinic.
     * 
     * @return walkInAllowed
     */
    public boolean isWalkInAllowed() {
        return walkInAllowed;
    }


    /**
     * Sets the walkInAllowed value for this Clinic.
     * 
     * @param walkInAllowed
     */
    public void setWalkInAllowed(boolean walkInAllowed) {
        this.walkInAllowed = walkInAllowed;
    }


    /**
     * Gets the sickCallAllowed value for this Clinic.
     * 
     * @return sickCallAllowed
     */
    public boolean isSickCallAllowed() {
        return sickCallAllowed;
    }


    /**
     * Sets the sickCallAllowed value for this Clinic.
     * 
     * @param sickCallAllowed
     */
    public void setSickCallAllowed(boolean sickCallAllowed) {
        this.sickCallAllowed = sickCallAllowed;
    }


    /**
     * Gets the active value for this Clinic.
     * 
     * @return active
     */
    public boolean isActive() {
        return active;
    }


    /**
     * Sets the active value for this Clinic.
     * 
     * @param active
     */
    public void setActive(boolean active) {
        this.active = active;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof Clinic)) return false;
        Clinic other = (Clinic) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.NCID==null && other.getNCID()==null) || 
             (this.NCID!=null &&
              this.NCID.equals(other.getNCID()))) &&
            ((this.IEN==null && other.getIEN()==null) || 
             (this.IEN!=null &&
              this.IEN.equals(other.getIEN()))) &&
            ((this.representation==null && other.getRepresentation()==null) || 
             (this.representation!=null &&
              this.representation.equals(other.getRepresentation()))) &&
            ((this.telecoms==null && other.getTelecoms()==null) || 
             (this.telecoms!=null &&
              java.util.Arrays.equals(this.telecoms, other.getTelecoms()))) &&
            ((this.addresses==null && other.getAddresses()==null) || 
             (this.addresses!=null &&
              java.util.Arrays.equals(this.addresses, other.getAddresses()))) &&
            ((this.facility==null && other.getFacility()==null) || 
             (this.facility!=null &&
              this.facility.equals(other.getFacility()))) &&
            ((this.MEPRS==null && other.getMEPRS()==null) || 
             (this.MEPRS!=null &&
              this.MEPRS.equals(other.getMEPRS()))) &&
            ((this.DMIS==null && other.getDMIS()==null) || 
             (this.DMIS!=null &&
              this.DMIS.equals(other.getDMIS()))) &&
            ((this.location==null && other.getLocation()==null) || 
             (this.location!=null &&
              this.location.equals(other.getLocation()))) &&
            this.walkInAllowed == other.isWalkInAllowed() &&
            this.sickCallAllowed == other.isSickCallAllowed() &&
            this.active == other.isActive();
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
        if (getNCID() != null) {
            _hashCode += getNCID().hashCode();
        }
        if (getIEN() != null) {
            _hashCode += getIEN().hashCode();
        }
        if (getRepresentation() != null) {
            _hashCode += getRepresentation().hashCode();
        }
        if (getTelecoms() != null) {
            for (int i=0;
                 i<java.lang.reflect.Array.getLength(getTelecoms());
                 i++) {
                java.lang.Object obj = java.lang.reflect.Array.get(getTelecoms(), i);
                if (obj != null &&
                    !obj.getClass().isArray()) {
                    _hashCode += obj.hashCode();
                }
            }
        }
        if (getAddresses() != null) {
            for (int i=0;
                 i<java.lang.reflect.Array.getLength(getAddresses());
                 i++) {
                java.lang.Object obj = java.lang.reflect.Array.get(getAddresses(), i);
                if (obj != null &&
                    !obj.getClass().isArray()) {
                    _hashCode += obj.hashCode();
                }
            }
        }
        if (getFacility() != null) {
            _hashCode += getFacility().hashCode();
        }
        if (getMEPRS() != null) {
            _hashCode += getMEPRS().hashCode();
        }
        if (getDMIS() != null) {
            _hashCode += getDMIS().hashCode();
        }
        if (getLocation() != null) {
            _hashCode += getLocation().hashCode();
        }
        _hashCode += (isWalkInAllowed() ? Boolean.TRUE : Boolean.FALSE).hashCode();
        _hashCode += (isSickCallAllowed() ? Boolean.TRUE : Boolean.FALSE).hashCode();
        _hashCode += (isActive() ? Boolean.TRUE : Boolean.FALSE).hashCode();
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(Clinic.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Clinic"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("NCID");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "NCID"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("IEN");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "IEN"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("representation");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Representation"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("telecoms");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Telecoms"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Telecom"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        elemField.setItemQName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Telecom"));
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("addresses");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Addresses"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Address"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        elemField.setItemQName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Address"));
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("facility");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Facility"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "ConceptValue"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("MEPRS");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "MEPRS"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "MEPRS"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("DMIS");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "DMIS"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "DMIS"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("location");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Location"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "CodeDescription"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("walkInAllowed");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "WalkInAllowed"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "boolean"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("sickCallAllowed");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "SickCallAllowed"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "boolean"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("active");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Active"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "boolean"));
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
