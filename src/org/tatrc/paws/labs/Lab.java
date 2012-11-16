/**
 * Lab.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.labs;

public class Lab  implements java.io.Serializable {
    private java.lang.String unitNumber;

    private java.util.Calendar collectionDate;

    private org.tatrc.paws.labs.ConceptValue report;

    private java.lang.String site;

    private java.lang.String siteSpecimen;

    private org.tatrc.paws.labs.ConceptValue status;

    private org.tatrc.paws.labs.ConceptValue orderingClinician;

    private java.lang.String orderComment;

    private java.util.Calendar resultedDate;

    private org.tatrc.paws.labs.Report[] results;
    
    private boolean sensitive;
    
    private java.lang.String accessionNumber;
    
    private java.lang.String fillerNumber;
    
    private java.lang.String placerNumber;
    
    private java.lang.String ID;
    
    private java.lang.String orderID;
    
    
    

    public Lab() {
    }

    public Lab(
           java.lang.String unitNumber,
           java.util.Calendar collectionDate,
           org.tatrc.paws.labs.ConceptValue report,
           java.lang.String site,
           java.lang.String siteSpecimen,
           org.tatrc.paws.labs.ConceptValue status,
           org.tatrc.paws.labs.ConceptValue orderingClinician,
           java.lang.String orderComment,
           java.util.Calendar resultedDate,
           boolean sensitive,
           java.lang.String accessionNumber,
           java.lang.String fillerNumber,
           java.lang.String placerNumber,
           java.lang.String ID,
           java.lang.String orderID,
           org.tatrc.paws.labs.Report[] results) {
           this.unitNumber = unitNumber;
           this.collectionDate = collectionDate;
           this.report = report;
           this.site = site;
           this.siteSpecimen = siteSpecimen;
           this.status = status;
           this.orderingClinician = orderingClinician;
           this.orderComment = orderComment;
           this.resultedDate = resultedDate;
           this.results = results;
           this.sensitive = sensitive;
           this.accessionNumber = accessionNumber;
           this.fillerNumber = fillerNumber;
           this.placerNumber = placerNumber;
           this.ID = ID;
           this.orderID = orderID;
    }
           
         


    /**
     * Gets the unitNumber value for this Lab.
     * 
     * @return unitNumber
     */
    public java.lang.String getUnitNumber() {
        return unitNumber;
    }


    /**
     * Sets the unitNumber value for this Lab.
     * 
     * @param unitNumber
     */
    public void setUnitNumber(java.lang.String unitNumber) {
        this.unitNumber = unitNumber;
    }


    /**
     * Gets the collectionDate value for this Lab.
     * 
     * @return collectionDate
     */
    public java.util.Calendar getCollectionDate() {
        return collectionDate;
    }


    /**
     * Sets the collectionDate value for this Lab.
     * 
     * @param collectionDate
     */
    public void setCollectionDate(java.util.Calendar collectionDate) {
        this.collectionDate = collectionDate;
    }


    /**
     * Gets the report value for this Lab.
     * 
     * @return report
     */
    public org.tatrc.paws.labs.ConceptValue getReport() {
        return report;
    }


    /**
     * Sets the report value for this Lab.
     * 
     * @param report
     */
    public void setReport(org.tatrc.paws.labs.ConceptValue report) {
        this.report = report;
    }


    /**
     * Gets the site value for this Lab.
     * 
     * @return site
     */
    public java.lang.String getSite() {
        return site;
    }


    /**
     * Sets the site value for this Lab.
     * 
     * @param site
     */
    public void setSite(java.lang.String site) {
        this.site = site;
    }


    /**
     * Gets the siteSpecimen value for this Lab.
     * 
     * @return siteSpecimen
     */
    public java.lang.String getSiteSpecimen() {
        return siteSpecimen;
    }


    /**
     * Sets the siteSpecimen value for this Lab.
     * 
     * @param siteSpecimen
     */
    public void setSiteSpecimen(java.lang.String siteSpecimen) {
        this.siteSpecimen = siteSpecimen;
    }


    /**
     * Gets the status value for this Lab.
     * 
     * @return status
     */
    public org.tatrc.paws.labs.ConceptValue getStatus() {
        return status;
    }


    /**
     * Sets the status value for this Lab.
     * 
     * @param status
     */
    public void setStatus(org.tatrc.paws.labs.ConceptValue status) {
        this.status = status;
    }


    /**
     * Gets the orderingClinician value for this Lab.
     * 
     * @return orderingClinician
     */
    public org.tatrc.paws.labs.ConceptValue getOrderingClinician() {
        return orderingClinician;
    }


    /**
     * Sets the orderingClinician value for this Lab.
     * 
     * @param orderingClinician
     */
    public void setOrderingClinician(org.tatrc.paws.labs.ConceptValue orderingClinician) {
        this.orderingClinician = orderingClinician;
    }


    /**
     * Gets the orderComment value for this Lab.
     * 
     * @return orderComment
     */
    public java.lang.String getOrderComment() {
        return orderComment;
    }


    /**
     * Sets the orderComment value for this Lab.
     * 
     * @param orderComment
     */
    public void setOrderComment(java.lang.String orderComment) {
        this.orderComment = orderComment;
    }


    /**
     * Gets the resultedDate value for this Lab.
     * 
     * @return resultedDate
     */
    public java.util.Calendar getResultedDate() {
        return resultedDate;
    }


    /**
     * Sets the resultedDate value for this Lab.
     * 
     * @param resultedDate
     */
    public void setResultedDate(java.util.Calendar resultedDate) {
        this.resultedDate = resultedDate;
    }


    /**
     * Gets the results value for this Lab.
     * 
     * @return results
     */
    public org.tatrc.paws.labs.Report[] getResults() {
        return results;
    }


    /**
     * Sets the results value for this Lab.
     * 
     * @param results
     */
    public void setResults(org.tatrc.paws.labs.Report[] results) {
        this.results = results;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof Lab)) return false;
        Lab other = (Lab) obj;
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
            ((this.collectionDate==null && other.getCollectionDate()==null) || 
             (this.collectionDate!=null &&
              this.collectionDate.equals(other.getCollectionDate()))) &&
            ((this.report==null && other.getReport()==null) || 
             (this.report!=null &&
              this.report.equals(other.getReport()))) &&
            ((this.site==null && other.getSite()==null) || 
             (this.site!=null &&
              this.site.equals(other.getSite()))) &&
            ((this.siteSpecimen==null && other.getSiteSpecimen()==null) || 
             (this.siteSpecimen!=null &&
              this.siteSpecimen.equals(other.getSiteSpecimen()))) &&
            ((this.status==null && other.getStatus()==null) || 
             (this.status!=null &&
              this.status.equals(other.getStatus()))) &&
            ((this.orderingClinician==null && other.getOrderingClinician()==null) || 
             (this.orderingClinician!=null &&
              this.orderingClinician.equals(other.getOrderingClinician()))) &&
            ((this.orderComment==null && other.getOrderComment()==null) || 
             (this.orderComment!=null &&
              this.orderComment.equals(other.getOrderComment()))) &&
            ((this.resultedDate==null && other.getResultedDate()==null) || 
             (this.resultedDate!=null &&
              this.resultedDate.equals(other.getResultedDate()))) &&
            ((this.results==null && other.getResults()==null) || 
             (this.results!=null &&
              java.util.Arrays.equals(this.results, other.getResults())))&&
              this.sensitive == other.isSensitive() &&
            ((this.accessionNumber==null && other.getAccessionNumber()==null) || 
              (this.accessionNumber!=null &&
               this.accessionNumber.equals(other.getAccessionNumber()))) &&
            ((this.fillerNumber==null && other.getFillerNumber()==null) || 
             (this.fillerNumber!=null &&
              this.fillerNumber.equals(other.getFillerNumber()))) &&
            ((this.placerNumber==null && other.getPlacerNumber()==null) || 
             (this.placerNumber!=null &&
              this.placerNumber.equals(other.getPlacerNumber()))) &&
            ((this.ID==null && other.getID()==null) || 
              (this.ID!=null &&
               this.ID.equals(other.getID()))) &&
            ((this.orderID==null && other.getOrderID()==null) || 
             (this.orderID!=null &&
              this.orderID.equals(other.getOrderID())));
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
        if (getCollectionDate() != null) {
            _hashCode += getCollectionDate().hashCode();
        }
        if (getReport() != null) {
            _hashCode += getReport().hashCode();
        }
        if (getSite() != null) {
            _hashCode += getSite().hashCode();
        }
        if (getSiteSpecimen() != null) {
            _hashCode += getSiteSpecimen().hashCode();
        }
        if (getStatus() != null) {
            _hashCode += getStatus().hashCode();
        }
        if (getOrderingClinician() != null) {
            _hashCode += getOrderingClinician().hashCode();
        }
        if (getOrderComment() != null) {
            _hashCode += getOrderComment().hashCode();
        }
        if (getResultedDate() != null) {
            _hashCode += getResultedDate().hashCode();
        }
        if (getResults() != null) {
            for (int i=0;
                 i<java.lang.reflect.Array.getLength(getResults());
                 i++) {
                java.lang.Object obj = java.lang.reflect.Array.get(getResults(), i);
                if (obj != null &&
                    !obj.getClass().isArray()) {
                    _hashCode += obj.hashCode();
                }
            }
        }
        
        //added new params per update on services by dod - mk 12/14/2011
        
        _hashCode += (isSensitive() ? Boolean.TRUE : Boolean.FALSE).hashCode();
        if (getAccessionNumber() != null) {
            _hashCode += getAccessionNumber().hashCode();
        }
        if (getFillerNumber() != null) {
            _hashCode += getFillerNumber().hashCode();
        }
        if (getPlacerNumber() != null) {
            _hashCode += getPlacerNumber().hashCode();
        }
        if (getID() != null) {
            _hashCode += getID().hashCode();
        }
        if (getOrderID() != null) {
            _hashCode += getOrderID().hashCode();
        }
        
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(Lab.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Lab"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("unitNumber");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "UnitNumber"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("collectionDate");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "CollectionDate"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "dateTime"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("report");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Report"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "ConceptValue"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("site");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Site"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("siteSpecimen");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "SiteSpecimen"));
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
        elemField.setFieldName("orderingClinician");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "OrderingClinician"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "ConceptValue"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("orderComment");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "OrderComment"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("resultedDate");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "ResultedDate"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "dateTime"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("results");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Results"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Report"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        elemField.setItemQName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Report"));
        typeDesc.addFieldDesc(elemField);
        
        //added new params per update on services by dod - mk 12/14/2011
        
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("sensitive");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Sensitive"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "boolean"));
        //elemField.setMinOccurs(1);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("accessionNumber");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "AccessionNumber"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("fillerNumber");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "FillerNumber"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("placerNumber");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "PlacerNUmber"));
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
        elemField.setFieldName("orderID");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "OrderID"));
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

    //added new params per update on services by dod - mk 12/14/2011
    
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

    /**
     * @param accessionNumber the accessionNumber to set
     */
    public void setAccessionNumber(java.lang.String accessionNumber) {
        this.accessionNumber = accessionNumber;
    }

    /**
     * @return the accessionNumber
     */
    public java.lang.String getAccessionNumber() {
        return accessionNumber;
    }

    /**
     * @param fillerNumber the fillerNumber to set
     */
    public void setFillerNumber(java.lang.String fillerNumber) {
        this.fillerNumber = fillerNumber;
    }

    /**
     * @return the fillerNumber
     */
    public java.lang.String getFillerNumber() {
        return fillerNumber;
    }

    /**
     * @param placerNumber the placerNumber to set
     */
    public void setPlacerNumber(java.lang.String placerNumber) {
        this.placerNumber = placerNumber;
    }

    /**
     * @return the placerNumber
     */
    public java.lang.String getPlacerNumber() {
        return placerNumber;
    }

    /**
     * @param iD the iD to set
     */
    public void setID(java.lang.String iD) {
        ID = iD;
    }

    /**
     * @return the iD
     */
    public java.lang.String getID() {
        return ID;
    }

    /**
     * @param orderID the orderID to set
     */
    public void setOrderID(java.lang.String orderID) {
        this.orderID = orderID;
    }

    /**
     * @return the orderID
     */
    public java.lang.String getOrderID() {
        return orderID;
    }

   

}
