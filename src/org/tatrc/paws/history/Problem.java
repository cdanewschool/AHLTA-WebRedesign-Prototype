/**
 * Problem.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.history;

public class Problem  extends org.tatrc.paws.history.HistoryDomainBase  implements java.io.Serializable {
    private org.tatrc.paws.history.ConceptValue ICD9;

    private org.tatrc.paws.history.ConceptValue chronicity;

    private java.util.Calendar dateOnset;

    private java.util.Calendar notedDate;

    private java.lang.String snoMed;

    public Problem() {
    }

    public Problem(
           java.lang.String unitNumber,
           org.tatrc.paws.history.ConceptValue description,
           java.lang.String comment,
           org.tatrc.paws.history.ConceptValue status,
           java.util.Calendar dateReported,
           org.tatrc.paws.history.ConceptValue source,
           boolean verified,
           org.tatrc.paws.history.ConceptValue clinician,
           org.tatrc.paws.history.ConceptValue ICD9,
           org.tatrc.paws.history.ConceptValue chronicity,
           java.util.Calendar dateOnset,
           java.util.Calendar notedDate,
           java.lang.String snoMed) {
        super(
            unitNumber,
            description,
            comment,
            status,
            dateReported,
            source,
            verified,
            clinician);
        this.ICD9 = ICD9;
        this.chronicity = chronicity;
        this.dateOnset = dateOnset;
        this.notedDate = notedDate;
        this.snoMed = snoMed;
    }


    /**
     * Gets the ICD9 value for this Problem.
     * 
     * @return ICD9
     */
    public org.tatrc.paws.history.ConceptValue getICD9() {
        return ICD9;
    }


    /**
     * Sets the ICD9 value for this Problem.
     * 
     * @param ICD9
     */
    public void setICD9(org.tatrc.paws.history.ConceptValue ICD9) {
        this.ICD9 = ICD9;
    }


    /**
     * Gets the chronicity value for this Problem.
     * 
     * @return chronicity
     */
    public org.tatrc.paws.history.ConceptValue getChronicity() {
        return chronicity;
    }


    /**
     * Sets the chronicity value for this Problem.
     * 
     * @param chronicity
     */
    public void setChronicity(org.tatrc.paws.history.ConceptValue chronicity) {
        this.chronicity = chronicity;
    }


    /**
     * Gets the dateOnset value for this Problem.
     * 
     * @return dateOnset
     */
    public java.util.Calendar getDateOnset() {
        return dateOnset;
    }


    /**
     * Sets the dateOnset value for this Problem.
     * 
     * @param dateOnset
     */
    public void setDateOnset(java.util.Calendar dateOnset) {
        this.dateOnset = dateOnset;
    }


    /**
     * Gets the notedDate value for this Problem.
     * 
     * @return notedDate
     */
    public java.util.Calendar getNotedDate() {
        return notedDate;
    }


    /**
     * Sets the notedDate value for this Problem.
     * 
     * @param notedDate
     */
    public void setNotedDate(java.util.Calendar notedDate) {
        this.notedDate = notedDate;
    }


    /**
     * Gets the snoMed value for this Problem.
     * 
     * @return snoMed
     */
    public java.lang.String getSnoMed() {
        return snoMed;
    }


    /**
     * Sets the snoMed value for this Problem.
     * 
     * @param snoMed
     */
    public void setSnoMed(java.lang.String snoMed) {
        this.snoMed = snoMed;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof Problem)) return false;
        Problem other = (Problem) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = super.equals(obj) && 
            ((this.ICD9==null && other.getICD9()==null) || 
             (this.ICD9!=null &&
              this.ICD9.equals(other.getICD9()))) &&
            ((this.chronicity==null && other.getChronicity()==null) || 
             (this.chronicity!=null &&
              this.chronicity.equals(other.getChronicity()))) &&
            ((this.dateOnset==null && other.getDateOnset()==null) || 
             (this.dateOnset!=null &&
              this.dateOnset.equals(other.getDateOnset()))) &&
            ((this.notedDate==null && other.getNotedDate()==null) || 
             (this.notedDate!=null &&
              this.notedDate.equals(other.getNotedDate()))) &&
            ((this.snoMed==null && other.getSnoMed()==null) || 
             (this.snoMed!=null &&
              this.snoMed.equals(other.getSnoMed())));
        __equalsCalc = null;
        return _equals;
    }

    private boolean __hashCodeCalc = false;
    public synchronized int hashCode() {
        if (__hashCodeCalc) {
            return 0;
        }
        __hashCodeCalc = true;
        int _hashCode = super.hashCode();
        if (getICD9() != null) {
            _hashCode += getICD9().hashCode();
        }
        if (getChronicity() != null) {
            _hashCode += getChronicity().hashCode();
        }
        if (getDateOnset() != null) {
            _hashCode += getDateOnset().hashCode();
        }
        if (getNotedDate() != null) {
            _hashCode += getNotedDate().hashCode();
        }
        if (getSnoMed() != null) {
            _hashCode += getSnoMed().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(Problem.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Problem"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("ICD9");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "ICD9"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "ConceptValue"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("chronicity");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "Chronicity"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://paws.tatrc.org/", "ConceptValue"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("dateOnset");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "DateOnset"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "dateTime"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("notedDate");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "NotedDate"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "dateTime"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("snoMed");
        elemField.setXmlName(new javax.xml.namespace.QName("http://paws.tatrc.org/", "SnoMed"));
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
