/**
 * Medication.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.medications;

public class Medication  implements java.io.Serializable {
    private java.lang.String unitNumber;

    private org.tatrc.paws.medications.ConceptValue origin;

    private org.tatrc.paws.medications.Drug[] drugs;

    private java.lang.String sig;

    private org.tatrc.paws.medications.ConceptValue status;

    private boolean OTC;

    private java.util.Calendar lastFilledDate;

    private org.tatrc.paws.medications.ConceptValue orderingClinician;

    private java.util.Calendar orderExpirationDate;

    private org.tatrc.paws.medications.ConceptValue facility;

    private java.lang.String orderNumber;

    private java.lang.String quantity;

    private int daysOfSupply;

    private org.tatrc.paws.medications.ConceptValue dispensingLocation;

    private org.tatrc.paws.medications.ConceptValue clinic;

    private java.util.Calendar orderStartDate;

    private java.lang.String comment;

    private org.tatrc.paws.medications.ConceptValue route;

    private java.util.Calendar expirationDate;

    private java.lang.String admininstrationTiming;

    private java.lang.String frequency;

    private java.lang.String duration;

    private java.lang.String RXNumber;

    private java.util.Calendar fillDate;

    private org.tatrc.paws.medications.ConceptValue fillStatus;

    private java.lang.String placerNumber;

    private java.lang.String fillerNumber;

    private java.lang.String pharmacyInstructions;

    private java.lang.String administrationInstructions;

    private org.tatrc.paws.medications.Refills refills;

    private java.lang.String prescriptionNumber;
     
    private boolean sensitive;

    public Medication() {
    }

    public Medication(
           java.lang.String unitNumber,
           org.tatrc.paws.medications.ConceptValue origin,
           org.tatrc.paws.medications.Drug[] drugs,
           java.lang.String sig,
           org.tatrc.paws.medications.ConceptValue status,
           boolean OTC,
           java.util.Calendar lastFilledDate,
           org.tatrc.paws.medications.ConceptValue orderingClinician,
           java.util.Calendar orderExpirationDate,
           org.tatrc.paws.medications.ConceptValue facility,
           java.lang.String orderNumber,
           java.lang.String quantity,
           int daysOfSupply,
           org.tatrc.paws.medications.ConceptValue dispensingLocation,
           org.tatrc.paws.medications.ConceptValue clinic,
           java.util.Calendar orderStartDate,
           java.lang.String comment,
           org.tatrc.paws.medications.ConceptValue route,
           java.util.Calendar expirationDate,
           java.lang.String admininstrationTiming,
           java.lang.String frequency,
           java.lang.String duration,
           java.lang.String RXNumber,
           java.util.Calendar fillDate,
           org.tatrc.paws.medications.ConceptValue fillStatus,
           java.lang.String placerNumber,
           java.lang.String fillerNumber,
           java.lang.String pharmacyInstructions,
           java.lang.String administrationInstructions,
           org.tatrc.paws.medications.Refills refills,
           boolean sensitive,
           java.lang.String prescriptionNumber) {
           this.unitNumber = unitNumber;
           this.origin = origin;
           this.drugs = drugs;
           this.sig = sig;
           this.status = status;
           this.OTC = OTC;
           this.lastFilledDate = lastFilledDate;
           this.orderingClinician = orderingClinician;
           this.orderExpirationDate = orderExpirationDate;
           this.facility = facility;
           this.orderNumber = orderNumber;
           this.quantity = quantity;
           this.daysOfSupply = daysOfSupply;
           this.dispensingLocation = dispensingLocation;
           this.clinic = clinic;
           this.orderStartDate = orderStartDate;
           this.comment = comment;
           this.route = route;
           this.expirationDate = expirationDate;
           this.admininstrationTiming = admininstrationTiming;
           this.frequency = frequency;
           this.duration = duration;
           this.RXNumber = RXNumber;
           this.fillDate = fillDate;
           this.fillStatus = fillStatus;
           this.placerNumber = placerNumber;
           this.fillerNumber = fillerNumber;
           this.pharmacyInstructions = pharmacyInstructions;
           this.administrationInstructions = administrationInstructions;
           this.refills = refills;
           this.prescriptionNumber = prescriptionNumber;
           this.sensitive = sensitive;
    }


    /**
     * Gets the unitNumber value for this Medication.
     * 
     * @return unitNumber
     */
    public java.lang.String getUnitNumber() {
        return unitNumber;
    }


    /**
     * Sets the unitNumber value for this Medication.
     * 
     * @param unitNumber
     */
    public void setUnitNumber(java.lang.String unitNumber) {
        this.unitNumber = unitNumber;
    }


    /**
     * Gets the origin value for this Medication.
     * 
     * @return origin
     */
    public org.tatrc.paws.medications.ConceptValue getOrigin() {
        return origin;
    }


    /**
     * Sets the origin value for this Medication.
     * 
     * @param origin
     */
    public void setOrigin(org.tatrc.paws.medications.ConceptValue origin) {
        this.origin = origin;
    }


    /**
     * Gets the drugs value for this Medication.
     * 
     * @return drugs
     */
    public org.tatrc.paws.medications.Drug[] getDrugs() {
        return drugs;
    }


    /**
     * Sets the drugs value for this Medication.
     * 
     * @param drugs
     */
    public void setDrugs(org.tatrc.paws.medications.Drug[] drugs) {
        this.drugs = drugs;
    }


    /**
     * Gets the sig value for this Medication.
     * 
     * @return sig
     */
    public java.lang.String getSig() {
        return sig;
    }


    /**
     * Sets the sig value for this Medication.
     * 
     * @param sig
     */
    public void setSig(java.lang.String sig) {
        this.sig = sig;
    }


    /**
     * Gets the status value for this Medication.
     * 
     * @return status
     */
    public org.tatrc.paws.medications.ConceptValue getStatus() {
        return status;
    }


    /**
     * Sets the status value for this Medication.
     * 
     * @param status
     */
    public void setStatus(org.tatrc.paws.medications.ConceptValue status) {
        this.status = status;
    }


    /**
     * Gets the OTC value for this Medication.
     * 
     * @return OTC
     */
    public boolean isOTC() {
        return OTC;
    }


    /**
     * Sets the OTC value for this Medication.
     * 
     * @param OTC
     */
    public void setOTC(boolean OTC) {
        this.OTC = OTC;
    }


    /**
     * Gets the lastFilledDate value for this Medication.
     * 
     * @return lastFilledDate
     */
    public java.util.Calendar getLastFilledDate() {
        return lastFilledDate;
    }


    /**
     * Sets the lastFilledDate value for this Medication.
     * 
     * @param lastFilledDate
     */
    public void setLastFilledDate(java.util.Calendar lastFilledDate) {
        this.lastFilledDate = lastFilledDate;
    }


    /**
     * Gets the orderingClinician value for this Medication.
     * 
     * @return orderingClinician
     */
    public org.tatrc.paws.medications.ConceptValue getOrderingClinician() {
        return orderingClinician;
    }


    /**
     * Sets the orderingClinician value for this Medication.
     * 
     * @param orderingClinician
     */
    public void setOrderingClinician(org.tatrc.paws.medications.ConceptValue orderingClinician) {
        this.orderingClinician = orderingClinician;
    }


    /**
     * Gets the orderExpirationDate value for this Medication.
     * 
     * @return orderExpirationDate
     */
    public java.util.Calendar getOrderExpirationDate() {
        return orderExpirationDate;
    }


    /**
     * Sets the orderExpirationDate value for this Medication.
     * 
     * @param orderExpirationDate
     */
    public void setOrderExpirationDate(java.util.Calendar orderExpirationDate) {
        this.orderExpirationDate = orderExpirationDate;
    }


    /**
     * Gets the facility value for this Medication.
     * 
     * @return facility
     */
    public org.tatrc.paws.medications.ConceptValue getFacility() {
        return facility;
    }


    /**
     * Sets the facility value for this Medication.
     * 
     * @param facility
     */
    public void setFacility(org.tatrc.paws.medications.ConceptValue facility) {
        this.facility = facility;
    }


    /**
     * Gets the orderNumber value for this Medication.
     * 
     * @return orderNumber
     */
    public java.lang.String getOrderNumber() {
        return orderNumber;
    }


    /**
     * Sets the orderNumber value for this Medication.
     * 
     * @param orderNumber
     */
    public void setOrderNumber(java.lang.String orderNumber) {
        this.orderNumber = orderNumber;
    }


    /**
     * Gets the quantity value for this Medication.
     * 
     * @return quantity
     */
    public java.lang.String getQuantity() {
        return quantity;
    }


    /**
     * Sets the quantity value for this Medication.
     * 
     * @param quantity
     */
    public void setQuantity(java.lang.String quantity) {
        this.quantity = quantity;
    }


    /**
     * Gets the daysOfSupply value for this Medication.
     * 
     * @return daysOfSupply
     */
    public int getDaysOfSupply() {
        return daysOfSupply;
    }


    /**
     * Sets the daysOfSupply value for this Medication.
     * 
     * @param daysOfSupply
     */
    public void setDaysOfSupply(int daysOfSupply) {
        this.daysOfSupply = daysOfSupply;
    }


    /**
     * Gets the dispensingLocation value for this Medication.
     * 
     * @return dispensingLocation
     */
    public org.tatrc.paws.medications.ConceptValue getDispensingLocation() {
        return dispensingLocation;
    }


    /**
     * Sets the dispensingLocation value for this Medication.
     * 
     * @param dispensingLocation
     */
    public void setDispensingLocation(org.tatrc.paws.medications.ConceptValue dispensingLocation) {
        this.dispensingLocation = dispensingLocation;
    }


    /**
     * Gets the clinic value for this Medication.
     * 
     * @return clinic
     */
    public org.tatrc.paws.medications.ConceptValue getClinic() {
        return clinic;
    }


    /**
     * Sets the clinic value for this Medication.
     * 
     * @param clinic
     */
    public void setClinic(org.tatrc.paws.medications.ConceptValue clinic) {
        this.clinic = clinic;
    }


    /**
     * Gets the orderStartDate value for this Medication.
     * 
     * @return orderStartDate
     */
    public java.util.Calendar getOrderStartDate() {
        return orderStartDate;
    }


    /**
     * Sets the orderStartDate value for this Medication.
     * 
     * @param orderStartDate
     */
    public void setOrderStartDate(java.util.Calendar orderStartDate) {
        this.orderStartDate = orderStartDate;
    }


    /**
     * Gets the comment value for this Medication.
     * 
     * @return comment
     */
    public java.lang.String getComment() {
        return comment;
    }


    /**
     * Sets the comment value for this Medication.
     * 
     * @param comment
     */
    public void setComment(java.lang.String comment) {
        this.comment = comment;
    }


    /**
     * Gets the route value for this Medication.
     * 
     * @return route
     */
    public org.tatrc.paws.medications.ConceptValue getRoute() {
        return route;
    }


    /**
     * Sets the route value for this Medication.
     * 
     * @param route
     */
    public void setRoute(org.tatrc.paws.medications.ConceptValue route) {
        this.route = route;
    }


    /**
     * Gets the expirationDate value for this Medication.
     * 
     * @return expirationDate
     */
    public java.util.Calendar getExpirationDate() {
        return expirationDate;
    }


    /**
     * Sets the expirationDate value for this Medication.
     * 
     * @param expirationDate
     */
    public void setExpirationDate(java.util.Calendar expirationDate) {
        this.expirationDate = expirationDate;
    }


    /**
     * Gets the admininstrationTiming value for this Medication.
     * 
     * @return admininstrationTiming
     */
    public java.lang.String getAdmininstrationTiming() {
        return admininstrationTiming;
    }


    /**
     * Sets the admininstrationTiming value for this Medication.
     * 
     * @param admininstrationTiming
     */
    public void setAdmininstrationTiming(java.lang.String admininstrationTiming) {
        this.admininstrationTiming = admininstrationTiming;
    }


    /**
     * Gets the frequency value for this Medication.
     * 
     * @return frequency
     */
    public java.lang.String getFrequency() {
        return frequency;
    }


    /**
     * Sets the frequency value for this Medication.
     * 
     * @param frequency
     */
    public void setFrequency(java.lang.String frequency) {
        this.frequency = frequency;
    }


    /**
     * Gets the duration value for this Medication.
     * 
     * @return duration
     */
    public java.lang.String getDuration() {
        return duration;
    }


    /**
     * Sets the duration value for this Medication.
     * 
     * @param duration
     */
    public void setDuration(java.lang.String duration) {
        this.duration = duration;
    }


    /**
     * Gets the RXNumber value for this Medication.
     * 
     * @return RXNumber
     */
    public java.lang.String getRXNumber() {
        return RXNumber;
    }


    /**
     * Sets the RXNumber value for this Medication.
     * 
     * @param RXNumber
     */
    public void setRXNumber(java.lang.String RXNumber) {
        this.RXNumber = RXNumber;
    }


    /**
     * Gets the fillDate value for this Medication.
     * 
     * @return fillDate
     */
    public java.util.Calendar getFillDate() {
        return fillDate;
    }


    /**
     * Sets the fillDate value for this Medication.
     * 
     * @param fillDate
     */
    public void setFillDate(java.util.Calendar fillDate) {
        this.fillDate = fillDate;
    }


    /**
     * Gets the fillStatus value for this Medication.
     * 
     * @return fillStatus
     */
    public org.tatrc.paws.medications.ConceptValue getFillStatus() {
        return fillStatus;
    }


    /**
     * Sets the fillStatus value for this Medication.
     * 
     * @param fillStatus
     */
    public void setFillStatus(org.tatrc.paws.medications.ConceptValue fillStatus) {
        this.fillStatus = fillStatus;
    }


    /**
     * Gets the placerNumber value for this Medication.
     * 
     * @return placerNumber
     */
    public java.lang.String getPlacerNumber() {
        return placerNumber;
    }


    /**
     * Sets the placerNumber value for this Medication.
     * 
     * @param placerNumber
     */
    public void setPlacerNumber(java.lang.String placerNumber) {
        this.placerNumber = placerNumber;
    }


    /**
     * Gets the fillerNumber value for this Medication.
     * 
     * @return fillerNumber
     */
    public java.lang.String getFillerNumber() {
        return fillerNumber;
    }


    /**
     * Sets the fillerNumber value for this Medication.
     * 
     * @param fillerNumber
     */
    public void setFillerNumber(java.lang.String fillerNumber) {
        this.fillerNumber = fillerNumber;
    }


    /**
     * Gets the pharmacyInstructions value for this Medication.
     * 
     * @return pharmacyInstructions
     */
    public java.lang.String getPharmacyInstructions() {
        return pharmacyInstructions;
    }


    /**
     * Sets the pharmacyInstructions value for this Medication.
     * 
     * @param pharmacyInstructions
     */
    public void setPharmacyInstructions(java.lang.String pharmacyInstructions) {
        this.pharmacyInstructions = pharmacyInstructions;
    }


    /**
     * Gets the administrationInstructions value for this Medication.
     * 
     * @return administrationInstructions
     */
    public java.lang.String getAdministrationInstructions() {
        return administrationInstructions;
    }


    /**
     * Sets the administrationInstructions value for this Medication.
     * 
     * @param administrationInstructions
     */
    public void setAdministrationInstructions(java.lang.String administrationInstructions) {
        this.administrationInstructions = administrationInstructions;
    }


    /**
     * Gets the refills value for this Medication.
     * 
     * @return refills
     */
    public org.tatrc.paws.medications.Refills getRefills() {
        return refills;
    }


    /**
     * Sets the refills value for this Medication.
     * 
     * @param refills
     */
    public void setRefills(org.tatrc.paws.medications.Refills refills) {
        this.refills = refills;
    }


    /**
     * Gets the prescriptionNumber value for this Medication.
     * 
     * @return prescriptionNumber
     */
    public java.lang.String getPrescriptionNumber() {
        return prescriptionNumber;
    }


    /**
     * Sets the prescriptionNumber value for this Medication.
     * 
     * @param prescriptionNumber
     */
    public void setPrescriptionNumber(java.lang.String prescriptionNumber) {
        this.prescriptionNumber = prescriptionNumber;
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

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof Medication)) return false;
        Medication other = (Medication) obj;
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
            ((this.origin==null && other.getOrigin()==null) || 
             (this.origin!=null &&
              this.origin.equals(other.getOrigin()))) &&
            ((this.drugs==null && other.getDrugs()==null) || 
             (this.drugs!=null &&
              java.util.Arrays.equals(this.drugs, other.getDrugs()))) &&
            ((this.sig==null && other.getSig()==null) || 
             (this.sig!=null &&
              this.sig.equals(other.getSig()))) &&
            ((this.status==null && other.getStatus()==null) || 
             (this.status!=null &&
              this.status.equals(other.getStatus()))) &&
            this.OTC == other.isOTC() &&
            ((this.lastFilledDate==null && other.getLastFilledDate()==null) || 
             (this.lastFilledDate!=null &&
              this.lastFilledDate.equals(other.getLastFilledDate()))) &&
            ((this.orderingClinician==null && other.getOrderingClinician()==null) || 
             (this.orderingClinician!=null &&
              this.orderingClinician.equals(other.getOrderingClinician()))) &&
            ((this.orderExpirationDate==null && other.getOrderExpirationDate()==null) || 
             (this.orderExpirationDate!=null &&
              this.orderExpirationDate.equals(other.getOrderExpirationDate()))) &&
            ((this.facility==null && other.getFacility()==null) || 
             (this.facility!=null &&
              this.facility.equals(other.getFacility()))) &&
            ((this.orderNumber==null && other.getOrderNumber()==null) || 
             (this.orderNumber!=null &&
              this.orderNumber.equals(other.getOrderNumber()))) &&
            ((this.quantity==null && other.getQuantity()==null) || 
             (this.quantity!=null &&
              this.quantity.equals(other.getQuantity()))) &&
            this.daysOfSupply == other.getDaysOfSupply() &&
            ((this.dispensingLocation==null && other.getDispensingLocation()==null) || 
             (this.dispensingLocation!=null &&
              this.dispensingLocation.equals(other.getDispensingLocation()))) &&
            ((this.clinic==null && other.getClinic()==null) || 
             (this.clinic!=null &&
              this.clinic.equals(other.getClinic()))) &&
            ((this.orderStartDate==null && other.getOrderStartDate()==null) || 
             (this.orderStartDate!=null &&
              this.orderStartDate.equals(other.getOrderStartDate()))) &&
            ((this.comment==null && other.getComment()==null) || 
             (this.comment!=null &&
              this.comment.equals(other.getComment()))) &&
            ((this.route==null && other.getRoute()==null) || 
             (this.route!=null &&
              this.route.equals(other.getRoute()))) &&
            ((this.expirationDate==null && other.getExpirationDate()==null) || 
             (this.expirationDate!=null &&
              this.expirationDate.equals(other.getExpirationDate()))) &&
            ((this.admininstrationTiming==null && other.getAdmininstrationTiming()==null) || 
             (this.admininstrationTiming!=null &&
              this.admininstrationTiming.equals(other.getAdmininstrationTiming()))) &&
            ((this.frequency==null && other.getFrequency()==null) || 
             (this.frequency!=null &&
              this.frequency.equals(other.getFrequency()))) &&
            ((this.duration==null && other.getDuration()==null) || 
             (this.duration!=null &&
              this.duration.equals(other.getDuration()))) &&
            ((this.RXNumber==null && other.getRXNumber()==null) || 
             (this.RXNumber!=null &&
              this.RXNumber.equals(other.getRXNumber()))) &&
            ((this.fillDate==null && other.getFillDate()==null) || 
             (this.fillDate!=null &&
              this.fillDate.equals(other.getFillDate()))) &&
            ((this.fillStatus==null && other.getFillStatus()==null) || 
             (this.fillStatus!=null &&
              this.fillStatus.equals(other.getFillStatus()))) &&
            ((this.placerNumber==null && other.getPlacerNumber()==null) || 
             (this.placerNumber!=null &&
              this.placerNumber.equals(other.getPlacerNumber()))) &&
            ((this.fillerNumber==null && other.getFillerNumber()==null) || 
             (this.fillerNumber!=null &&
              this.fillerNumber.equals(other.getFillerNumber()))) &&
            ((this.pharmacyInstructions==null && other.getPharmacyInstructions()==null) || 
             (this.pharmacyInstructions!=null &&
              this.pharmacyInstructions.equals(other.getPharmacyInstructions()))) &&
            ((this.administrationInstructions==null && other.getAdministrationInstructions()==null) || 
             (this.administrationInstructions!=null &&
              this.administrationInstructions.equals(other.getAdministrationInstructions()))) &&
            ((this.refills==null && other.getRefills()==null) || 
             (this.refills!=null &&
              this.refills.equals(other.getRefills()))) &&
            ((this.prescriptionNumber==null && other.getPrescriptionNumber()==null) || 
             (this.prescriptionNumber!=null &&
              this.prescriptionNumber.equals(other.getPrescriptionNumber()))) &&
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
        if (getOrigin() != null) {
            _hashCode += getOrigin().hashCode();
        }
        if (getDrugs() != null) {
            for (int i=0;
                 i<java.lang.reflect.Array.getLength(getDrugs());
                 i++) {
                java.lang.Object obj = java.lang.reflect.Array.get(getDrugs(), i);
                if (obj != null &&
                    !obj.getClass().isArray()) {
                    _hashCode += obj.hashCode();
                }
            }
        }
        if (getSig() != null) {
            _hashCode += getSig().hashCode();
        }
        if (getStatus() != null) {
            _hashCode += getStatus().hashCode();
        }
        _hashCode += (isOTC() ? Boolean.TRUE : Boolean.FALSE).hashCode();
        if (getLastFilledDate() != null) {
            _hashCode += getLastFilledDate().hashCode();
        }
        if (getOrderingClinician() != null) {
            _hashCode += getOrderingClinician().hashCode();
        }
        if (getOrderExpirationDate() != null) {
            _hashCode += getOrderExpirationDate().hashCode();
        }
        if (getFacility() != null) {
            _hashCode += getFacility().hashCode();
        }
        if (getOrderNumber() != null) {
            _hashCode += getOrderNumber().hashCode();
        }
        if (getQuantity() != null) {
            _hashCode += getQuantity().hashCode();
        }
        _hashCode += getDaysOfSupply();
        if (getDispensingLocation() != null) {
            _hashCode += getDispensingLocation().hashCode();
        }
        if (getClinic() != null) {
            _hashCode += getClinic().hashCode();
        }
        if (getOrderStartDate() != null) {
            _hashCode += getOrderStartDate().hashCode();
        }
        if (getComment() != null) {
            _hashCode += getComment().hashCode();
        }
        if (getRoute() != null) {
            _hashCode += getRoute().hashCode();
        }
        if (getExpirationDate() != null) {
            _hashCode += getExpirationDate().hashCode();
        }
        if (getAdmininstrationTiming() != null) {
            _hashCode += getAdmininstrationTiming().hashCode();
        }
        if (getFrequency() != null) {
            _hashCode += getFrequency().hashCode();
        }
        if (getDuration() != null) {
            _hashCode += getDuration().hashCode();
        }
        if (getRXNumber() != null) {
            _hashCode += getRXNumber().hashCode();
        }
        if (getFillDate() != null) {
            _hashCode += getFillDate().hashCode();
        }
        if (getFillStatus() != null) {
            _hashCode += getFillStatus().hashCode();
        }
        if (getPlacerNumber() != null) {
            _hashCode += getPlacerNumber().hashCode();
        }
        if (getFillerNumber() != null) {
            _hashCode += getFillerNumber().hashCode();
        }
        if (getPharmacyInstructions() != null) {
            _hashCode += getPharmacyInstructions().hashCode();
        }
        if (getAdministrationInstructions() != null) {
            _hashCode += getAdministrationInstructions().hashCode();
        }
        if (getRefills() != null) {
            _hashCode += getRefills().hashCode();
        }
        if (getPrescriptionNumber() != null) {
            _hashCode += getPrescriptionNumber().hashCode();
        }
  //added new params per update on services by dod - mk 12/14/2011
        _hashCode += (isSensitive() ? Boolean.TRUE : Boolean.FALSE).hashCode();
        
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(Medication.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Medication"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("unitNumber");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "UnitNumber"));
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
        elemField.setFieldName("drugs");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Drugs"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Drug"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        elemField.setItemQName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Drug"));
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("sig");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Sig"));
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
        elemField.setFieldName("OTC");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "OTC"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "boolean"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("lastFilledDate");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "LastFilledDate"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "dateTime"));
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
        elemField.setFieldName("orderExpirationDate");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "OrderExpirationDate"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "dateTime"));
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
        elemField.setFieldName("orderNumber");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "OrderNumber"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("quantity");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Quantity"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("daysOfSupply");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "DaysOfSupply"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "int"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("dispensingLocation");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "DispensingLocation"));
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
        elemField.setFieldName("orderStartDate");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "OrderStartDate"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "dateTime"));
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
        elemField.setFieldName("route");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Route"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "ConceptValue"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("expirationDate");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "ExpirationDate"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "dateTime"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("admininstrationTiming");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "AdmininstrationTiming"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("frequency");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Frequency"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("duration");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Duration"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("RXNumber");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "RXNumber"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("fillDate");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "FillDate"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "dateTime"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("fillStatus");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "FillStatus"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "ConceptValue"));
        elemField.setMinOccurs(0);
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
        elemField.setFieldName("fillerNumber");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "FillerNumber"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("pharmacyInstructions");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "PharmacyInstructions"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("administrationInstructions");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "AdministrationInstructions"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("refills");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Refills"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Refills"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("prescriptionNumber");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "PrescriptionNumber"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
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

}
