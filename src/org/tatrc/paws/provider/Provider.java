/**
 * Provider.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.provider;

public class Provider  implements java.io.Serializable {
    private java.lang.String unitNumber;

    private java.lang.String NCID;

    private org.tatrc.paws.provider.Address[] addresses;

    private org.tatrc.paws.provider.Name name;

    private org.tatrc.paws.provider.Telecom[] telecoms;

    private java.lang.String SSN;

    private org.tatrc.paws.provider.Taxonomy[] taxonomies;

    private org.tatrc.paws.provider.ConceptValue facility;

    public Provider() {
    }

    public Provider(
           java.lang.String unitNumber,
           java.lang.String NCID,
           org.tatrc.paws.provider.Address[] addresses,
           org.tatrc.paws.provider.Name name,
           org.tatrc.paws.provider.Telecom[] telecoms,
           java.lang.String SSN,
           org.tatrc.paws.provider.Taxonomy[] taxonomies,
           org.tatrc.paws.provider.ConceptValue facility) {
           this.unitNumber = unitNumber;
           this.NCID = NCID;
           this.addresses = addresses;
           this.name = name;
           this.telecoms = telecoms;
           this.SSN = SSN;
           this.taxonomies = taxonomies;
           this.facility = facility;
    }


    /**
     * Gets the unitNumber value for this Provider.
     * 
     * @return unitNumber
     */
    public java.lang.String getUnitNumber() {
        return unitNumber;
    }


    /**
     * Sets the unitNumber value for this Provider.
     * 
     * @param unitNumber
     */
    public void setUnitNumber(java.lang.String unitNumber) {
        this.unitNumber = unitNumber;
    }


    /**
     * Gets the NCID value for this Provider.
     * 
     * @return NCID
     */
    public java.lang.String getNCID() {
        return NCID;
    }


    /**
     * Sets the NCID value for this Provider.
     * 
     * @param NCID
     */
    public void setNCID(java.lang.String NCID) {
        this.NCID = NCID;
    }


    /**
     * Gets the addresses value for this Provider.
     * 
     * @return addresses
     */
    public org.tatrc.paws.provider.Address[] getAddresses() {
        return addresses;
    }


    /**
     * Sets the addresses value for this Provider.
     * 
     * @param addresses
     */
    public void setAddresses(org.tatrc.paws.provider.Address[] addresses) {
        this.addresses = addresses;
    }


    /**
     * Gets the name value for this Provider.
     * 
     * @return name
     */
    public org.tatrc.paws.provider.Name getName() {
        return name;
    }


    /**
     * Sets the name value for this Provider.
     * 
     * @param name
     */
    public void setName(org.tatrc.paws.provider.Name name) {
        this.name = name;
    }


    /**
     * Gets the telecoms value for this Provider.
     * 
     * @return telecoms
     */
    public org.tatrc.paws.provider.Telecom[] getTelecoms() {
        return telecoms;
    }


    /**
     * Sets the telecoms value for this Provider.
     * 
     * @param telecoms
     */
    public void setTelecoms(org.tatrc.paws.provider.Telecom[] telecoms) {
        this.telecoms = telecoms;
    }


    /**
     * Gets the SSN value for this Provider.
     * 
     * @return SSN
     */
    public java.lang.String getSSN() {
        return SSN;
    }


    /**
     * Sets the SSN value for this Provider.
     * 
     * @param SSN
     */
    public void setSSN(java.lang.String SSN) {
        this.SSN = SSN;
    }


    /**
     * Gets the taxonomies value for this Provider.
     * 
     * @return taxonomies
     */
    public org.tatrc.paws.provider.Taxonomy[] getTaxonomies() {
        return taxonomies;
    }


    /**
     * Sets the taxonomies value for this Provider.
     * 
     * @param taxonomies
     */
    public void setTaxonomies(org.tatrc.paws.provider.Taxonomy[] taxonomies) {
        this.taxonomies = taxonomies;
    }


    /**
     * Gets the facility value for this Provider.
     * 
     * @return facility
     */
    public org.tatrc.paws.provider.ConceptValue getFacility() {
        return facility;
    }


    /**
     * Sets the facility value for this Provider.
     * 
     * @param facility
     */
    public void setFacility(org.tatrc.paws.provider.ConceptValue facility) {
        this.facility = facility;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof Provider)) return false;
        Provider other = (Provider) obj;
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
            ((this.NCID==null && other.getNCID()==null) || 
             (this.NCID!=null &&
              this.NCID.equals(other.getNCID()))) &&
            ((this.addresses==null && other.getAddresses()==null) || 
             (this.addresses!=null &&
              java.util.Arrays.equals(this.addresses, other.getAddresses()))) &&
            ((this.name==null && other.getName()==null) || 
             (this.name!=null &&
              this.name.equals(other.getName()))) &&
            ((this.telecoms==null && other.getTelecoms()==null) || 
             (this.telecoms!=null &&
              java.util.Arrays.equals(this.telecoms, other.getTelecoms()))) &&
            ((this.SSN==null && other.getSSN()==null) || 
             (this.SSN!=null &&
              this.SSN.equals(other.getSSN()))) &&
            ((this.taxonomies==null && other.getTaxonomies()==null) || 
             (this.taxonomies!=null &&
              java.util.Arrays.equals(this.taxonomies, other.getTaxonomies()))) &&
            ((this.facility==null && other.getFacility()==null) || 
             (this.facility!=null &&
              this.facility.equals(other.getFacility())));
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
        if (getNCID() != null) {
            _hashCode += getNCID().hashCode();
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
        if (getName() != null) {
            _hashCode += getName().hashCode();
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
        if (getSSN() != null) {
            _hashCode += getSSN().hashCode();
        }
        if (getTaxonomies() != null) {
            for (int i=0;
                 i<java.lang.reflect.Array.getLength(getTaxonomies());
                 i++) {
                java.lang.Object obj = java.lang.reflect.Array.get(getTaxonomies(), i);
                if (obj != null &&
                    !obj.getClass().isArray()) {
                    _hashCode += obj.hashCode();
                }
            }
        }
        if (getFacility() != null) {
            _hashCode += getFacility().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(Provider.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Provider"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("unitNumber");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "UnitNumber"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("NCID");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "NCID"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
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
        elemField.setFieldName("name");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Name"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Name"));
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
        elemField.setFieldName("SSN");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "SSN"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("taxonomies");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Taxonomies"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Taxonomy"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        elemField.setItemQName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Taxonomy"));
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("facility");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Facility"));
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
