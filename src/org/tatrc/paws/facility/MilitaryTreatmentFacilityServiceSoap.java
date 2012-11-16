/**
 * MilitaryTreatmentFacilityServiceSoap.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.facility;

public interface MilitaryTreatmentFacilityServiceSoap extends java.rmi.Remote {
    public org.tatrc.paws.facility.ConceptValue[] fetchMilitaryTreatmentFacilities() throws java.rmi.RemoteException;
    public org.tatrc.paws.facility.ConceptValue[] fetchClinicsByFacilityNCID(java.lang.String facilityncid) throws java.rmi.RemoteException;
    public org.tatrc.paws.facility.Clinic[] fetchClinicByNCID(java.lang.String clinicncid) throws java.rmi.RemoteException;
    public boolean alive() throws java.rmi.RemoteException;
    public java.lang.String version() throws java.rmi.RemoteException;
}
