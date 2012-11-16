/**
 * RadiologyResult.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.radiology;

public class RadiologyResult  implements java.io.Serializable {
    
    @Override
    public String toString() {
        return "RadiologyResult [POCEnc=" + POCEnc + ", __equalsCalc="
                + __equalsCalc + ", __hashCodeCalc=" + __hashCodeCalc
                + ", approvingClinician=" + approvingClinician
                + ", dateApproved=" + dateApproved + ", dateCollected="
                + dateCollected + ", dateEvent=" + dateEvent
                + ", dateResulted=" + dateResulted + ", examNumber="
                + examNumber + ", facility=" + facility
                + ", orderingClinician=" + orderingClinician
                + ", placerNumber=" + placerNumber + ", priority=" + priority
                + ", procedure=" + procedure + ", reasonForOrder="
                + reasonForOrder + ", report=" + report + ", reportText="
                + reportText + ", resultCode=" + resultCode + ", status="
                + status + ", unitNumber=" + unitNumber + "]";
    }

    private java.lang.String unitNumber;

    private java.util.Calendar dateEvent;

    private org.tatrc.paws.radiology.ConceptValue procedure;

    private org.tatrc.paws.radiology.ConceptValue orderingClinician;

    private org.tatrc.paws.radiology.ConceptValue status;

    private java.lang.String resultCode;

    private java.util.Calendar dateCollected;

    private java.lang.String placerNumber;

    private java.lang.String examNumber;

    private org.tatrc.paws.radiology.ConceptValue facility;

    private java.util.Calendar dateResulted;

    private org.tatrc.paws.radiology.ConceptValue priority;

    private java.lang.String report;

    private java.lang.String POCEnc;

    private java.lang.String reasonForOrder;

    private java.lang.String approvingClinician;

    private java.util.Calendar dateApproved;

    private java.lang.String reportText;

    public RadiologyResult() {
    }

    public RadiologyResult(
           java.lang.String unitNumber,
           java.util.Calendar dateEvent,
           org.tatrc.paws.radiology.ConceptValue procedure,
           org.tatrc.paws.radiology.ConceptValue orderingClinician,
           org.tatrc.paws.radiology.ConceptValue status,
           java.lang.String resultCode,
           java.util.Calendar dateCollected,
           java.lang.String placerNumber,
           java.lang.String examNumber,
           org.tatrc.paws.radiology.ConceptValue facility,
           java.util.Calendar dateResulted,
           org.tatrc.paws.radiology.ConceptValue priority,
           java.lang.String report,
           java.lang.String POCEnc,
           java.lang.String reasonForOrder,
           java.lang.String approvingClinician,
           java.util.Calendar dateApproved,
           java.lang.String reportText) {
           this.unitNumber = unitNumber;
           this.dateEvent = dateEvent;
           this.procedure = procedure;
           this.orderingClinician = orderingClinician;
           this.status = status;
           this.resultCode = resultCode;
           this.dateCollected = dateCollected;
           this.placerNumber = placerNumber;
           this.examNumber = examNumber;
           this.facility = facility;
           this.dateResulted = dateResulted;
           this.priority = priority;
           this.report = report;
           this.POCEnc = POCEnc;
           this.reasonForOrder = reasonForOrder;
           this.approvingClinician = approvingClinician;
           this.dateApproved = dateApproved;
           this.reportText = reportText;
    }


    /**
     * Gets the unitNumber value for this RadiologyResult.
     * 
     * @return unitNumber
     */
    public java.lang.String getUnitNumber() {
        return unitNumber;
    }


    /**
     * Sets the unitNumber value for this RadiologyResult.
     * 
     * @param unitNumber
     */
    public void setUnitNumber(java.lang.String unitNumber) {
        this.unitNumber = unitNumber;
    }


    /**
     * Gets the dateEvent value for this RadiologyResult.
     * 
     * @return dateEvent
     */
    public java.util.Calendar getDateEvent() {
        return dateEvent;
    }


    /**
     * Sets the dateEvent value for this RadiologyResult.
     * 
     * @param dateEvent
     */
    public void setDateEvent(java.util.Calendar dateEvent) {
        this.dateEvent = dateEvent;
    }


    /**
     * Gets the procedure value for this RadiologyResult.
     * 
     * @return procedure
     */
    public org.tatrc.paws.radiology.ConceptValue getProcedure() {
        return procedure;
    }


    /**
     * Sets the procedure value for this RadiologyResult.
     * 
     * @param procedure
     */
    public void setProcedure(org.tatrc.paws.radiology.ConceptValue procedure) {
        this.procedure = procedure;
    }


    /**
     * Gets the orderingClinician value for this RadiologyResult.
     * 
     * @return orderingClinician
     */
    public org.tatrc.paws.radiology.ConceptValue getOrderingClinician() {
        return orderingClinician;
    }


    /**
     * Sets the orderingClinician value for this RadiologyResult.
     * 
     * @param orderingClinician
     */
    public void setOrderingClinician(org.tatrc.paws.radiology.ConceptValue orderingClinician) {
        this.orderingClinician = orderingClinician;
    }


    /**
     * Gets the status value for this RadiologyResult.
     * 
     * @return status
     */
    public org.tatrc.paws.radiology.ConceptValue getStatus() {
        return status;
    }


    /**
     * Sets the status value for this RadiologyResult.
     * 
     * @param status
     */
    public void setStatus(org.tatrc.paws.radiology.ConceptValue status) {
        this.status = status;
    }


    /**
     * Gets the resultCode value for this RadiologyResult.
     * 
     * @return resultCode
     */
    public java.lang.String getResultCode() {
        return resultCode;
    }


    /**
     * Sets the resultCode value for this RadiologyResult.
     * 
     * @param resultCode
     */
    public void setResultCode(java.lang.String resultCode) {
        this.resultCode = resultCode;
    }


    /**
     * Gets the dateCollected value for this RadiologyResult.
     * 
     * @return dateCollected
     */
    public java.util.Calendar getDateCollected() {
        return dateCollected;
    }


    /**
     * Sets the dateCollected value for this RadiologyResult.
     * 
     * @param dateCollected
     */
    public void setDateCollected(java.util.Calendar dateCollected) {
        this.dateCollected = dateCollected;
    }


    /**
     * Gets the placerNumber value for this RadiologyResult.
     * 
     * @return placerNumber
     */
    public java.lang.String getPlacerNumber() {
        return placerNumber;
    }


    /**
     * Sets the placerNumber value for this RadiologyResult.
     * 
     * @param placerNumber
     */
    public void setPlacerNumber(java.lang.String placerNumber) {
        this.placerNumber = placerNumber;
    }


    /**
     * Gets the examNumber value for this RadiologyResult.
     * 
     * @return examNumber
     */
    public java.lang.String getExamNumber() {
        return examNumber;
    }


    /**
     * Sets the examNumber value for this RadiologyResult.
     * 
     * @param examNumber
     */
    public void setExamNumber(java.lang.String examNumber) {
        this.examNumber = examNumber;
    }


    /**
     * Gets the facility value for this RadiologyResult.
     * 
     * @return facility
     */
    public org.tatrc.paws.radiology.ConceptValue getFacility() {
        return facility;
    }


    /**
     * Sets the facility value for this RadiologyResult.
     * 
     * @param facility
     */
    public void setFacility(org.tatrc.paws.radiology.ConceptValue facility) {
        this.facility = facility;
    }


    /**
     * Gets the dateResulted value for this RadiologyResult.
     * 
     * @return dateResulted
     */
    public java.util.Calendar getDateResulted() {
        return dateResulted;
    }


    /**
     * Sets the dateResulted value for this RadiologyResult.
     * 
     * @param dateResulted
     */
    public void setDateResulted(java.util.Calendar dateResulted) {
        this.dateResulted = dateResulted;
    }


    /**
     * Gets the priority value for this RadiologyResult.
     * 
     * @return priority
     */
    public org.tatrc.paws.radiology.ConceptValue getPriority() {
        return priority;
    }


    /**
     * Sets the priority value for this RadiologyResult.
     * 
     * @param priority
     */
    public void setPriority(org.tatrc.paws.radiology.ConceptValue priority) {
        this.priority = priority;
    }


    /**
     * Gets the report value for this RadiologyResult.
     * 
     * @return report
     */
    public java.lang.String getReport() {
        return report;
    }


    /**
     * Sets the report value for this RadiologyResult.
     * 
     * @param report
     */
    public void setReport(java.lang.String report) {
        this.report = report;
    }


    /**
     * Gets the POCEnc value for this RadiologyResult.
     * 
     * @return POCEnc
     */
    public java.lang.String getPOCEnc() {
        return POCEnc;
    }


    /**
     * Sets the POCEnc value for this RadiologyResult.
     * 
     * @param POCEnc
     */
    public void setPOCEnc(java.lang.String POCEnc) {
        this.POCEnc = POCEnc;
    }


    /**
     * Gets the reasonForOrder value for this RadiologyResult.
     * 
     * @return reasonForOrder
     */
    public java.lang.String getReasonForOrder() {
        return reasonForOrder;
    }


    /**
     * Sets the reasonForOrder value for this RadiologyResult.
     * 
     * @param reasonForOrder
     */
    public void setReasonForOrder(java.lang.String reasonForOrder) {
        this.reasonForOrder = reasonForOrder;
    }


    /**
     * Gets the approvingClinician value for this RadiologyResult.
     * 
     * @return approvingClinician
     */
    public java.lang.String getApprovingClinician() {
        return approvingClinician;
    }


    /**
     * Sets the approvingClinician value for this RadiologyResult.
     * 
     * @param approvingClinician
     */
    public void setApprovingClinician(java.lang.String approvingClinician) {
        this.approvingClinician = approvingClinician;
    }


    /**
     * Gets the dateApproved value for this RadiologyResult.
     * 
     * @return dateApproved
     */
    public java.util.Calendar getDateApproved() {
        return dateApproved;
    }


    /**
     * Sets the dateApproved value for this RadiologyResult.
     * 
     * @param dateApproved
     */
    public void setDateApproved(java.util.Calendar dateApproved) {
        this.dateApproved = dateApproved;
    }


    /**
     * Gets the reportText value for this RadiologyResult.
     * 
     * @return reportText
     */
    public java.lang.String getReportText() {
        return reportText;
    }


    /**
     * Sets the reportText value for this RadiologyResult.
     * 
     * @param reportText
     */
    public void setReportText(java.lang.String reportText) {
        this.reportText = reportText;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof RadiologyResult)) return false;
        RadiologyResult other = (RadiologyResult) obj;
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
            ((this.dateEvent==null && other.getDateEvent()==null) || 
             (this.dateEvent!=null &&
              this.dateEvent.equals(other.getDateEvent()))) &&
            ((this.procedure==null && other.getProcedure()==null) || 
             (this.procedure!=null &&
              this.procedure.equals(other.getProcedure()))) &&
            ((this.orderingClinician==null && other.getOrderingClinician()==null) || 
             (this.orderingClinician!=null &&
              this.orderingClinician.equals(other.getOrderingClinician()))) &&
            ((this.status==null && other.getStatus()==null) || 
             (this.status!=null &&
              this.status.equals(other.getStatus()))) &&
            ((this.resultCode==null && other.getResultCode()==null) || 
             (this.resultCode!=null &&
              this.resultCode.equals(other.getResultCode()))) &&
            ((this.dateCollected==null && other.getDateCollected()==null) || 
             (this.dateCollected!=null &&
              this.dateCollected.equals(other.getDateCollected()))) &&
            ((this.placerNumber==null && other.getPlacerNumber()==null) || 
             (this.placerNumber!=null &&
              this.placerNumber.equals(other.getPlacerNumber()))) &&
            ((this.examNumber==null && other.getExamNumber()==null) || 
             (this.examNumber!=null &&
              this.examNumber.equals(other.getExamNumber()))) &&
            ((this.facility==null && other.getFacility()==null) || 
             (this.facility!=null &&
              this.facility.equals(other.getFacility()))) &&
            ((this.dateResulted==null && other.getDateResulted()==null) || 
             (this.dateResulted!=null &&
              this.dateResulted.equals(other.getDateResulted()))) &&
            ((this.priority==null && other.getPriority()==null) || 
             (this.priority!=null &&
              this.priority.equals(other.getPriority()))) &&
            ((this.report==null && other.getReport()==null) || 
             (this.report!=null &&
              this.report.equals(other.getReport()))) &&
            ((this.POCEnc==null && other.getPOCEnc()==null) || 
             (this.POCEnc!=null &&
              this.POCEnc.equals(other.getPOCEnc()))) &&
            ((this.reasonForOrder==null && other.getReasonForOrder()==null) || 
             (this.reasonForOrder!=null &&
              this.reasonForOrder.equals(other.getReasonForOrder()))) &&
            ((this.approvingClinician==null && other.getApprovingClinician()==null) || 
             (this.approvingClinician!=null &&
              this.approvingClinician.equals(other.getApprovingClinician()))) &&
            ((this.dateApproved==null && other.getDateApproved()==null) || 
             (this.dateApproved!=null &&
              this.dateApproved.equals(other.getDateApproved()))) &&
            ((this.reportText==null && other.getReportText()==null) || 
             (this.reportText!=null &&
              this.reportText.equals(other.getReportText())));
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
        if (getDateEvent() != null) {
            _hashCode += getDateEvent().hashCode();
        }
        if (getProcedure() != null) {
            _hashCode += getProcedure().hashCode();
        }
        if (getOrderingClinician() != null) {
            _hashCode += getOrderingClinician().hashCode();
        }
        if (getStatus() != null) {
            _hashCode += getStatus().hashCode();
        }
        if (getResultCode() != null) {
            _hashCode += getResultCode().hashCode();
        }
        if (getDateCollected() != null) {
            _hashCode += getDateCollected().hashCode();
        }
        if (getPlacerNumber() != null) {
            _hashCode += getPlacerNumber().hashCode();
        }
        if (getExamNumber() != null) {
            _hashCode += getExamNumber().hashCode();
        }
        if (getFacility() != null) {
            _hashCode += getFacility().hashCode();
        }
        if (getDateResulted() != null) {
            _hashCode += getDateResulted().hashCode();
        }
        if (getPriority() != null) {
            _hashCode += getPriority().hashCode();
        }
        if (getReport() != null) {
            _hashCode += getReport().hashCode();
        }
        if (getPOCEnc() != null) {
            _hashCode += getPOCEnc().hashCode();
        }
        if (getReasonForOrder() != null) {
            _hashCode += getReasonForOrder().hashCode();
        }
        if (getApprovingClinician() != null) {
            _hashCode += getApprovingClinician().hashCode();
        }
        if (getDateApproved() != null) {
            _hashCode += getDateApproved().hashCode();
        }
        if (getReportText() != null) {
            _hashCode += getReportText().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(RadiologyResult.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "RadiologyResult"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("unitNumber");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "UnitNumber"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("dateEvent");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "DateEvent"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "dateTime"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("procedure");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Procedure"));
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
        elemField.setFieldName("status");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Status"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "ConceptValue"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("resultCode");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "ResultCode"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("dateCollected");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "DateCollected"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "dateTime"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("placerNumber");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "PlacerNumber"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("examNumber");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "ExamNumber"));
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
        elemField.setFieldName("dateResulted");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "DateResulted"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "dateTime"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("priority");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Priority"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "ConceptValue"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("report");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Report"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("POCEnc");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "POCEnc"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("reasonForOrder");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "ReasonForOrder"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("approvingClinician");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "ApprovingClinician"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("dateApproved");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "DateApproved"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "dateTime"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("reportText");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "ReportText"));
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
