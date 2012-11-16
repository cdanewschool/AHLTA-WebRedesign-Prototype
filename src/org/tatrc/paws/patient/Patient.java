/**
 * Patient.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.patient;

public class Patient  implements java.io.Serializable {
    private java.lang.String unitNumber;

    private java.lang.String deersId;

    private org.tatrc.paws.patient.Name name;

    private java.lang.String SSN;

    private java.lang.String FMP;

    private java.lang.String sponsorSSN;

    private java.util.Calendar dateOfBirth;

    private java.lang.String gender;

    private org.tatrc.paws.patient.Telecom[] telecoms;

    private org.tatrc.paws.patient.Address[] addresses;

    //private java.lang.String race;
    private org.tatrc.paws.patient.ConceptValue race;
    
    private java.lang.String sponsorStatus;

    private java.lang.String BRACPharmacyEligibilty;

    private org.tatrc.paws.patient.ConceptValue rank;

    private java.lang.String paygrade;

    private java.lang.String branch;

    private java.lang.String triCareStatus;

    private java.lang.String careAuthorizationPhone;

    private java.lang.String PCMLocation;

    private java.lang.String medicare;

    //private java.lang.String maritalStatus;
    private org.tatrc.paws.patient.ConceptValue maritalStatus;
    
    //private java.lang.String religion;
    private org.tatrc.paws.patient.ConceptValue religion;
    
    private org.tatrc.paws.patient.DirectCare directCare;

    private org.tatrc.paws.patient.GenericData[] genericDatas;

    public Patient() {
    }

    public Patient(
           java.lang.String unitNumber,
           java.lang.String deersId,
           org.tatrc.paws.patient.Name name,
           java.lang.String SSN,
           java.lang.String FMP,
           java.lang.String sponsorSSN,
           java.util.Calendar dateOfBirth,
           java.lang.String gender,
           org.tatrc.paws.patient.Telecom[] telecoms,
           org.tatrc.paws.patient.Address[] addresses,
           //java.lang.String race,
           org.tatrc.paws.patient.ConceptValue race,
           java.lang.String sponsorStatus,
           java.lang.String BRACPharmacyEligibilty,
           org.tatrc.paws.patient.ConceptValue rank,
           java.lang.String paygrade,
           java.lang.String branch,
           java.lang.String triCareStatus,
           java.lang.String careAuthorizationPhone,
           java.lang.String PCMLocation,
           java.lang.String medicare,
           //java.lang.String maritalStatus,
           org.tatrc.paws.patient.ConceptValue maritalStatus,
           //java.lang.String religion,
           org.tatrc.paws.patient.ConceptValue religion,
           org.tatrc.paws.patient.DirectCare directCare,
           org.tatrc.paws.patient.GenericData[] genericDatas) {
           this.unitNumber = unitNumber;
           this.deersId = deersId;
           this.name = name;
           this.SSN = SSN;
           this.FMP = FMP;
           this.sponsorSSN = sponsorSSN;
           this.dateOfBirth = dateOfBirth;
           this.gender = gender;
           this.telecoms = telecoms;
           this.addresses = addresses;
           this.race = race;
           this.sponsorStatus = sponsorStatus;
           this.BRACPharmacyEligibilty = BRACPharmacyEligibilty;
           this.rank = rank;
           this.paygrade = paygrade;
           this.branch = branch;
           this.triCareStatus = triCareStatus;
           this.careAuthorizationPhone = careAuthorizationPhone;
           this.PCMLocation = PCMLocation;
           this.medicare = medicare;
           this.maritalStatus = maritalStatus;
           this.religion = religion;
           this.directCare = directCare;
           this.genericDatas = genericDatas;
    }


    /**
     * Gets the unitNumber value for this Patient.
     * 
     * @return unitNumber
     */
    public java.lang.String getUnitNumber() {
        return unitNumber;
    }


    /**
     * Sets the unitNumber value for this Patient.
     * 
     * @param unitNumber
     */
    public void setUnitNumber(java.lang.String unitNumber) {
        this.unitNumber = unitNumber;
    }


    /**
     * Gets the deersId value for this Patient.
     * 
     * @return deersId
     */
    public java.lang.String getDeersId() {
        return deersId;
    }


    /**
     * Sets the deersId value for this Patient.
     * 
     * @param deersId
     */
    public void setDeersId(java.lang.String deersId) {
        this.deersId = deersId;
    }


    /**
     * Gets the name value for this Patient.
     * 
     * @return name
     */
    public org.tatrc.paws.patient.Name getName() {
        return name;
    }


    /**
     * Sets the name value for this Patient.
     * 
     * @param name
     */
    public void setName(org.tatrc.paws.patient.Name name) {
        this.name = name;
    }


    /**
     * Gets the SSN value for this Patient.
     * 
     * @return SSN
     */
    public java.lang.String getSSN() {
        return SSN;
    }


    /**
     * Sets the SSN value for this Patient.
     * 
     * @param SSN
     */
    public void setSSN(java.lang.String SSN) {
        this.SSN = SSN;
    }


    /**
     * Gets the FMP value for this Patient.
     * 
     * @return FMP
     */
    public java.lang.String getFMP() {
        return FMP;
    }


    /**
     * Sets the FMP value for this Patient.
     * 
     * @param FMP
     */
    public void setFMP(java.lang.String FMP) {
        this.FMP = FMP;
    }


    /**
     * Gets the sponsorSSN value for this Patient.
     * 
     * @return sponsorSSN
     */
    public java.lang.String getSponsorSSN() {
        return sponsorSSN;
    }


    /**
     * Sets the sponsorSSN value for this Patient.
     * 
     * @param sponsorSSN
     */
    public void setSponsorSSN(java.lang.String sponsorSSN) {
        this.sponsorSSN = sponsorSSN;
    }


    /**
     * Gets the dateOfBirth value for this Patient.
     * 
     * @return dateOfBirth
     */
    public java.util.Calendar getDateOfBirth() {
        return dateOfBirth;
    }


    /**
     * Sets the dateOfBirth value for this Patient.
     * 
     * @param dateOfBirth
     */
    public void setDateOfBirth(java.util.Calendar dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }


    /**
     * Gets the gender value for this Patient.
     * 
     * @return gender
     */
    public java.lang.String getGender() {
        return gender;
    }


    /**
     * Sets the gender value for this Patient.
     * 
     * @param gender
     */
    public void setGender(java.lang.String gender) {
        this.gender = gender;
    }


    /**
     * Gets the telecoms value for this Patient.
     * 
     * @return telecoms
     */
    public org.tatrc.paws.patient.Telecom[] getTelecoms() {
        return telecoms;
    }


    /**
     * Sets the telecoms value for this Patient.
     * 
     * @param telecoms
     */
    public void setTelecoms(org.tatrc.paws.patient.Telecom[] telecoms) {
        this.telecoms = telecoms;
    }


    /**
     * Gets the addresses value for this Patient.
     * 
     * @return addresses
     */
    public org.tatrc.paws.patient.Address[] getAddresses() {
        return addresses;
    }


    /**
     * Sets the addresses value for this Patient.
     * 
     * @param addresses
     */
    public void setAddresses(org.tatrc.paws.patient.Address[] addresses) {
        this.addresses = addresses;
    }


    /**
     * Gets the race value for this Patient.
     * 
     * @return race
     */
    public org.tatrc.paws.patient.ConceptValue getRace() {
        return race;
    }


    /**
     * Sets the race value for this Patient.
     * 
     * @param race
     */
    public void setRace(org.tatrc.paws.patient.ConceptValue race) {
        this.race = race;
    }


    /**
     * Gets the sponsorStatus value for this Patient.
     * 
     * @return sponsorStatus
     */
    public java.lang.String getSponsorStatus() {
        return sponsorStatus;
    }


    /**
     * Sets the sponsorStatus value for this Patient.
     * 
     * @param sponsorStatus
     */
    public void setSponsorStatus(java.lang.String sponsorStatus) {
        this.sponsorStatus = sponsorStatus;
    }


    /**
     * Gets the BRACPharmacyEligibilty value for this Patient.
     * 
     * @return BRACPharmacyEligibilty
     */
    public java.lang.String getBRACPharmacyEligibilty() {
        return BRACPharmacyEligibilty;
    }


    /**
     * Sets the BRACPharmacyEligibilty value for this Patient.
     * 
     * @param BRACPharmacyEligibilty
     */
    public void setBRACPharmacyEligibilty(java.lang.String BRACPharmacyEligibilty) {
        this.BRACPharmacyEligibilty = BRACPharmacyEligibilty;
    }


    /**
     * Gets the rank value for this Patient.
     * 
     * @return rank
     */
    public org.tatrc.paws.patient.ConceptValue getRank() {
        return rank;
    }


    /**
     * Sets the rank value for this Patient.
     * 
     * @param rank
     */
    public void setRank(org.tatrc.paws.patient.ConceptValue rank) {
        this.rank = rank;
    }


    /**
     * Gets the paygrade value for this Patient.
     * 
     * @return paygrade
     */
    public java.lang.String getPaygrade() {
        return paygrade;
    }


    /**
     * Sets the paygrade value for this Patient.
     * 
     * @param paygrade
     */
    public void setPaygrade(java.lang.String paygrade) {
        this.paygrade = paygrade;
    }


    /**
     * Gets the branch value for this Patient.
     * 
     * @return branch
     */
    public java.lang.String getBranch() {
        return branch;
    }


    /**
     * Sets the branch value for this Patient.
     * 
     * @param branch
     */
    public void setBranch(java.lang.String branch) {
        this.branch = branch;
    }


    /**
     * Gets the triCareStatus value for this Patient.
     * 
     * @return triCareStatus
     */
    public java.lang.String getTriCareStatus() {
        return triCareStatus;
    }


    /**
     * Sets the triCareStatus value for this Patient.
     * 
     * @param triCareStatus
     */
    public void setTriCareStatus(java.lang.String triCareStatus) {
        this.triCareStatus = triCareStatus;
    }


    /**
     * Gets the careAuthorizationPhone value for this Patient.
     * 
     * @return careAuthorizationPhone
     */
    public java.lang.String getCareAuthorizationPhone() {
        return careAuthorizationPhone;
    }


    /**
     * Sets the careAuthorizationPhone value for this Patient.
     * 
     * @param careAuthorizationPhone
     */
    public void setCareAuthorizationPhone(java.lang.String careAuthorizationPhone) {
        this.careAuthorizationPhone = careAuthorizationPhone;
    }


    /**
     * Gets the PCMLocation value for this Patient.
     * 
     * @return PCMLocation
     */
    public java.lang.String getPCMLocation() {
        return PCMLocation;
    }


    /**
     * Sets the PCMLocation value for this Patient.
     * 
     * @param PCMLocation
     */
    public void setPCMLocation(java.lang.String PCMLocation) {
        this.PCMLocation = PCMLocation;
    }


    /**
     * Gets the medicare value for this Patient.
     * 
     * @return medicare
     */
    public java.lang.String getMedicare() {
        return medicare;
    }


    /**
     * Sets the medicare value for this Patient.
     * 
     * @param medicare
     */
    public void setMedicare(java.lang.String medicare) {
        this.medicare = medicare;
    }


    /**
     * Gets the maritalStatus value for this Patient.
     * 
     * @return maritalStatus
     */
    public org.tatrc.paws.patient.ConceptValue getMaritalStatus() {
        return maritalStatus;
    }


    /**
     * Sets the maritalStatus value for this Patient.
     * 
     * @param maritalStatus
     */
    public void setMaritalStatus(org.tatrc.paws.patient.ConceptValue maritalStatus) {
        this.maritalStatus = maritalStatus;
    }


    /**
     * Gets the religion value for this Patient.
     * 
     * @return religion
     */
    public org.tatrc.paws.patient.ConceptValue getReligion() {
        return religion;
    }


    /**
     * Sets the religion value for this Patient.
     * 
     * @param religion
     */
    public void setReligion(org.tatrc.paws.patient.ConceptValue religion) {
        this.religion = religion;
    }


    /**
     * Gets the directCare value for this Patient.
     * 
     * @return directCare
     */
    public org.tatrc.paws.patient.DirectCare getDirectCare() {
        return directCare;
    }


    /**
     * Sets the directCare value for this Patient.
     * 
     * @param directCare
     */
    public void setDirectCare(org.tatrc.paws.patient.DirectCare directCare) {
        this.directCare = directCare;
    }


    /**
     * Gets the genericDatas value for this Patient.
     * 
     * @return genericDatas
     */
    public org.tatrc.paws.patient.GenericData[] getGenericDatas() {
        return genericDatas;
    }


    /**
     * Sets the genericDatas value for this Patient.
     * 
     * @param genericDatas
     */
    public void setGenericDatas(org.tatrc.paws.patient.GenericData[] genericDatas) {
        this.genericDatas = genericDatas;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof Patient)) return false;
        Patient other = (Patient) obj;
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
            ((this.deersId==null && other.getDeersId()==null) || 
             (this.deersId!=null &&
              this.deersId.equals(other.getDeersId()))) &&
            ((this.name==null && other.getName()==null) || 
             (this.name!=null &&
              this.name.equals(other.getName()))) &&
            ((this.SSN==null && other.getSSN()==null) || 
             (this.SSN!=null &&
              this.SSN.equals(other.getSSN()))) &&
            ((this.FMP==null && other.getFMP()==null) || 
             (this.FMP!=null &&
              this.FMP.equals(other.getFMP()))) &&
            ((this.sponsorSSN==null && other.getSponsorSSN()==null) || 
             (this.sponsorSSN!=null &&
              this.sponsorSSN.equals(other.getSponsorSSN()))) &&
            ((this.dateOfBirth==null && other.getDateOfBirth()==null) || 
             (this.dateOfBirth!=null &&
              this.dateOfBirth.equals(other.getDateOfBirth()))) &&
            ((this.gender==null && other.getGender()==null) || 
             (this.gender!=null &&
              this.gender.equals(other.getGender()))) &&
            ((this.telecoms==null && other.getTelecoms()==null) || 
             (this.telecoms!=null &&
              java.util.Arrays.equals(this.telecoms, other.getTelecoms()))) &&
            ((this.addresses==null && other.getAddresses()==null) || 
             (this.addresses!=null &&
              java.util.Arrays.equals(this.addresses, other.getAddresses()))) &&
            ((this.race==null && other.getRace()==null) || 
             (this.race!=null &&
              this.race.equals(other.getRace()))) &&
            ((this.sponsorStatus==null && other.getSponsorStatus()==null) || 
             (this.sponsorStatus!=null &&
              this.sponsorStatus.equals(other.getSponsorStatus()))) &&
            ((this.BRACPharmacyEligibilty==null && other.getBRACPharmacyEligibilty()==null) || 
             (this.BRACPharmacyEligibilty!=null &&
              this.BRACPharmacyEligibilty.equals(other.getBRACPharmacyEligibilty()))) &&
            ((this.rank==null && other.getRank()==null) || 
             (this.rank!=null &&
              this.rank.equals(other.getRank()))) &&
            ((this.paygrade==null && other.getPaygrade()==null) || 
             (this.paygrade!=null &&
              this.paygrade.equals(other.getPaygrade()))) &&
            ((this.branch==null && other.getBranch()==null) || 
             (this.branch!=null &&
              this.branch.equals(other.getBranch()))) &&
            ((this.triCareStatus==null && other.getTriCareStatus()==null) || 
             (this.triCareStatus!=null &&
              this.triCareStatus.equals(other.getTriCareStatus()))) &&
            ((this.careAuthorizationPhone==null && other.getCareAuthorizationPhone()==null) || 
             (this.careAuthorizationPhone!=null &&
              this.careAuthorizationPhone.equals(other.getCareAuthorizationPhone()))) &&
            ((this.PCMLocation==null && other.getPCMLocation()==null) || 
             (this.PCMLocation!=null &&
              this.PCMLocation.equals(other.getPCMLocation()))) &&
            ((this.medicare==null && other.getMedicare()==null) || 
             (this.medicare!=null &&
              this.medicare.equals(other.getMedicare()))) &&
            ((this.maritalStatus==null && other.getMaritalStatus()==null) || 
             (this.maritalStatus!=null &&
              this.maritalStatus.equals(other.getMaritalStatus()))) &&
            ((this.religion==null && other.getReligion()==null) || 
             (this.religion!=null &&
              this.religion.equals(other.getReligion()))) &&
            ((this.directCare==null && other.getDirectCare()==null) || 
             (this.directCare!=null &&
              this.directCare.equals(other.getDirectCare()))) &&
            ((this.genericDatas==null && other.getGenericDatas()==null) || 
             (this.genericDatas!=null &&
              java.util.Arrays.equals(this.genericDatas, other.getGenericDatas())));
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
        if (getDeersId() != null) {
            _hashCode += getDeersId().hashCode();
        }
        if (getName() != null) {
            _hashCode += getName().hashCode();
        }
        if (getSSN() != null) {
            _hashCode += getSSN().hashCode();
        }
        if (getFMP() != null) {
            _hashCode += getFMP().hashCode();
        }
        if (getSponsorSSN() != null) {
            _hashCode += getSponsorSSN().hashCode();
        }
        if (getDateOfBirth() != null) {
            _hashCode += getDateOfBirth().hashCode();
        }
        if (getGender() != null) {
            _hashCode += getGender().hashCode();
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
        if (getRace() != null) {
            _hashCode += getRace().hashCode();
        }
        if (getSponsorStatus() != null) {
            _hashCode += getSponsorStatus().hashCode();
        }
        if (getBRACPharmacyEligibilty() != null) {
            _hashCode += getBRACPharmacyEligibilty().hashCode();
        }
        if (getRank() != null) {
            _hashCode += getRank().hashCode();
        }
        if (getPaygrade() != null) {
            _hashCode += getPaygrade().hashCode();
        }
        if (getBranch() != null) {
            _hashCode += getBranch().hashCode();
        }
        if (getTriCareStatus() != null) {
            _hashCode += getTriCareStatus().hashCode();
        }
        if (getCareAuthorizationPhone() != null) {
            _hashCode += getCareAuthorizationPhone().hashCode();
        }
        if (getPCMLocation() != null) {
            _hashCode += getPCMLocation().hashCode();
        }
        if (getMedicare() != null) {
            _hashCode += getMedicare().hashCode();
        }
        if (getMaritalStatus() != null) {
            _hashCode += getMaritalStatus().hashCode();
        }
        if (getReligion() != null) {
            _hashCode += getReligion().hashCode();
        }
        if (getDirectCare() != null) {
            _hashCode += getDirectCare().hashCode();
        }
        if (getGenericDatas() != null) {
            for (int i=0;
                 i<java.lang.reflect.Array.getLength(getGenericDatas());
                 i++) {
                java.lang.Object obj = java.lang.reflect.Array.get(getGenericDatas(), i);
                if (obj != null &&
                    !obj.getClass().isArray()) {
                    _hashCode += obj.hashCode();
                }
            }
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(Patient.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Patient"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("unitNumber");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "UnitNumber"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("deersId");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "DeersId"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("name");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Name"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Name"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("SSN");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "SSN"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("FMP");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "FMP"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("sponsorSSN");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "SponsorSSN"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("dateOfBirth");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "DateOfBirth"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "dateTime"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("gender");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Gender"));
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
        elemField.setFieldName("race");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Race"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "ConceptValue"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("sponsorStatus");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "SponsorStatus"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("BRACPharmacyEligibilty");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "BRACPharmacyEligibilty"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("rank");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Rank"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "ConceptValue"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("paygrade");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Paygrade"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("branch");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Branch"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("triCareStatus");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "TriCareStatus"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("careAuthorizationPhone");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "CareAuthorizationPhone"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("PCMLocation");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "PCMLocation"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("medicare");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Medicare"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("maritalStatus");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "MaritalStatus"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "ConceptValue"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("religion");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Religion"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "ConceptValue"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("directCare");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "DirectCare"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "DirectCare"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("genericDatas");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "GenericDatas"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "GenericData"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        elemField.setItemQName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "GenericData"));
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
