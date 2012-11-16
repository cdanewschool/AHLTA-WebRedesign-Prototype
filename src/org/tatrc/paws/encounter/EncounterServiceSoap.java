/**
 * EncounterServiceSoap.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.encounter;

public interface EncounterServiceSoap extends java.rmi.Remote {
    public org.tatrc.paws.encounter.Encounter[] fetchEncounterHeaders(java.lang.String application, java.lang.String username, java.lang.String unitnumber) throws java.rmi.RemoteException;
    public org.tatrc.paws.encounter.Encounter[] fetchEncounter(java.lang.String application, java.lang.String username, java.lang.String unitnumber, java.lang.String id, java.lang.String facilityncid, org.tatrc.paws.encounter.EnumDocumentFormat format) throws java.rmi.RemoteException;
    public boolean alive() throws java.rmi.RemoteException;
    public java.lang.String version() throws java.rmi.RemoteException;
}
