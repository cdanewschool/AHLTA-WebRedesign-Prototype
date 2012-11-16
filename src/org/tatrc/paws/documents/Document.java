/**
 * Document.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.documents;

public class Document  implements java.io.Serializable {
    private java.lang.String unitNumber;

    private java.lang.String ID;

    private org.tatrc.paws.documents.Content[] contents;

    private org.tatrc.paws.documents.ConceptValue documentType;

    private java.lang.String title;

    private java.util.Calendar originalDate;

    private org.tatrc.paws.documents.ConceptValue status;

    private org.tatrc.paws.documents.ConceptValue clinic;

    private java.lang.String comments;

    private java.lang.String encounterID;

    private org.tatrc.paws.documents.ConceptValue facility;

    private org.tatrc.paws.documents.ConceptValue clinician;

    public Document() {
    }

    public Document(
           java.lang.String unitNumber,
           java.lang.String ID,
           org.tatrc.paws.documents.Content[] contents,
           org.tatrc.paws.documents.ConceptValue documentType,
           java.lang.String title,
           java.util.Calendar originalDate,
           org.tatrc.paws.documents.ConceptValue status,
           org.tatrc.paws.documents.ConceptValue clinic,
           java.lang.String comments,
           java.lang.String encounterID,
           org.tatrc.paws.documents.ConceptValue facility,
           org.tatrc.paws.documents.ConceptValue clinician) {
           this.unitNumber = unitNumber;
           this.ID = ID;
           this.contents = contents;
           this.documentType = documentType;
           this.title = title;
           this.originalDate = originalDate;
           this.status = status;
           this.clinic = clinic;
           this.comments = comments;
           this.encounterID = encounterID;
           this.facility = facility;
           this.clinician = clinician;
    }


    /**
     * Gets the unitNumber value for this Document.
     * 
     * @return unitNumber
     */
    public java.lang.String getUnitNumber() {
        return unitNumber;
    }


    /**
     * Sets the unitNumber value for this Document.
     * 
     * @param unitNumber
     */
    public void setUnitNumber(java.lang.String unitNumber) {
        this.unitNumber = unitNumber;
    }


    /**
     * Gets the ID value for this Document.
     * 
     * @return ID
     */
    public java.lang.String getID() {
        return ID;
    }


    /**
     * Sets the ID value for this Document.
     * 
     * @param ID
     */
    public void setID(java.lang.String ID) {
        this.ID = ID;
    }


    /**
     * Gets the contents value for this Document.
     * 
     * @return contents
     */
    public org.tatrc.paws.documents.Content[] getContents() {
        return contents;
    }


    /**
     * Sets the contents value for this Document.
     * 
     * @param contents
     */
    public void setContents(org.tatrc.paws.documents.Content[] contents) {
        this.contents = contents;
    }


    /**
     * Gets the documentType value for this Document.
     * 
     * @return documentType
     */
    public org.tatrc.paws.documents.ConceptValue getDocumentType() {
        return documentType;
    }


    /**
     * Sets the documentType value for this Document.
     * 
     * @param documentType
     */
    public void setDocumentType(org.tatrc.paws.documents.ConceptValue documentType) {
        this.documentType = documentType;
    }


    /**
     * Gets the title value for this Document.
     * 
     * @return title
     */
    public java.lang.String getTitle() {
        return title;
    }


    /**
     * Sets the title value for this Document.
     * 
     * @param title
     */
    public void setTitle(java.lang.String title) {
        this.title = title;
    }


    /**
     * Gets the originalDate value for this Document.
     * 
     * @return originalDate
     */
    public java.util.Calendar getOriginalDate() {
        return originalDate;
    }


    /**
     * Sets the originalDate value for this Document.
     * 
     * @param originalDate
     */
    public void setOriginalDate(java.util.Calendar originalDate) {
        this.originalDate = originalDate;
    }


    /**
     * Gets the status value for this Document.
     * 
     * @return status
     */
    public org.tatrc.paws.documents.ConceptValue getStatus() {
        return status;
    }


    /**
     * Sets the status value for this Document.
     * 
     * @param status
     */
    public void setStatus(org.tatrc.paws.documents.ConceptValue status) {
        this.status = status;
    }


    /**
     * Gets the clinic value for this Document.
     * 
     * @return clinic
     */
    public org.tatrc.paws.documents.ConceptValue getClinic() {
        return clinic;
    }


    /**
     * Sets the clinic value for this Document.
     * 
     * @param clinic
     */
    public void setClinic(org.tatrc.paws.documents.ConceptValue clinic) {
        this.clinic = clinic;
    }


    /**
     * Gets the comments value for this Document.
     * 
     * @return comments
     */
    public java.lang.String getComments() {
        return comments;
    }


    /**
     * Sets the comments value for this Document.
     * 
     * @param comments
     */
    public void setComments(java.lang.String comments) {
        this.comments = comments;
    }


    /**
     * Gets the encounterID value for this Document.
     * 
     * @return encounterID
     */
    public java.lang.String getEncounterID() {
        return encounterID;
    }


    /**
     * Sets the encounterID value for this Document.
     * 
     * @param encounterID
     */
    public void setEncounterID(java.lang.String encounterID) {
        this.encounterID = encounterID;
    }


    /**
     * Gets the facility value for this Document.
     * 
     * @return facility
     */
    public org.tatrc.paws.documents.ConceptValue getFacility() {
        return facility;
    }


    /**
     * Sets the facility value for this Document.
     * 
     * @param facility
     */
    public void setFacility(org.tatrc.paws.documents.ConceptValue facility) {
        this.facility = facility;
    }


    /**
     * Gets the clinician value for this Document.
     * 
     * @return clinician
     */
    public org.tatrc.paws.documents.ConceptValue getClinician() {
        return clinician;
    }


    /**
     * Sets the clinician value for this Document.
     * 
     * @param clinician
     */
    public void setClinician(org.tatrc.paws.documents.ConceptValue clinician) {
        this.clinician = clinician;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof Document)) return false;
        Document other = (Document) obj;
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
            ((this.ID==null && other.getID()==null) || 
             (this.ID!=null &&
              this.ID.equals(other.getID()))) &&
            ((this.contents==null && other.getContents()==null) || 
             (this.contents!=null &&
              java.util.Arrays.equals(this.contents, other.getContents()))) &&
            ((this.documentType==null && other.getDocumentType()==null) || 
             (this.documentType!=null &&
              this.documentType.equals(other.getDocumentType()))) &&
            ((this.title==null && other.getTitle()==null) || 
             (this.title!=null &&
              this.title.equals(other.getTitle()))) &&
            ((this.originalDate==null && other.getOriginalDate()==null) || 
             (this.originalDate!=null &&
              this.originalDate.equals(other.getOriginalDate()))) &&
            ((this.status==null && other.getStatus()==null) || 
             (this.status!=null &&
              this.status.equals(other.getStatus()))) &&
            ((this.clinic==null && other.getClinic()==null) || 
             (this.clinic!=null &&
              this.clinic.equals(other.getClinic()))) &&
            ((this.comments==null && other.getComments()==null) || 
             (this.comments!=null &&
              this.comments.equals(other.getComments()))) &&
            ((this.encounterID==null && other.getEncounterID()==null) || 
             (this.encounterID!=null &&
              this.encounterID.equals(other.getEncounterID()))) &&
            ((this.facility==null && other.getFacility()==null) || 
             (this.facility!=null &&
              this.facility.equals(other.getFacility()))) &&
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
        if (getID() != null) {
            _hashCode += getID().hashCode();
        }
        if (getContents() != null) {
            for (int i=0;
                 i<java.lang.reflect.Array.getLength(getContents());
                 i++) {
                java.lang.Object obj = java.lang.reflect.Array.get(getContents(), i);
                if (obj != null &&
                    !obj.getClass().isArray()) {
                    _hashCode += obj.hashCode();
                }
            }
        }
        if (getDocumentType() != null) {
            _hashCode += getDocumentType().hashCode();
        }
        if (getTitle() != null) {
            _hashCode += getTitle().hashCode();
        }
        if (getOriginalDate() != null) {
            _hashCode += getOriginalDate().hashCode();
        }
        if (getStatus() != null) {
            _hashCode += getStatus().hashCode();
        }
        if (getClinic() != null) {
            _hashCode += getClinic().hashCode();
        }
        if (getComments() != null) {
            _hashCode += getComments().hashCode();
        }
        if (getEncounterID() != null) {
            _hashCode += getEncounterID().hashCode();
        }
        if (getFacility() != null) {
            _hashCode += getFacility().hashCode();
        }
        if (getClinician() != null) {
            _hashCode += getClinician().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(Document.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Document"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("unitNumber");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "UnitNumber"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("ID");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "ID"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("contents");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Contents"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Content"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        elemField.setItemQName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Content"));
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("documentType");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "DocumentType"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "ConceptValue"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("title");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Title"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("originalDate");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "OriginalDate"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "dateTime"));
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
        elemField.setFieldName("clinic");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Clinic"));
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
        elemField.setFieldName("encounterID");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "EncounterID"));
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
