/**
 * HistoryServiceSoap.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Nov 19, 2006 (02:31:34 GMT+00:00) WSDL2Java emitter.
 */

package org.tatrc.paws.history;

public interface HistoryServiceSoap extends java.rmi.Remote {
    public org.tatrc.paws.history.Problem[] fetchProblems(java.lang.String application, java.lang.String username, java.lang.String unitnumber) throws java.rmi.RemoteException;
    public org.tatrc.paws.history.Problem[] fetchProblemsEx(java.lang.String application, java.lang.String username, java.lang.String unitnumber, org.tatrc.paws.history.FetchStatus status) throws java.rmi.RemoteException;
    public org.tatrc.paws.history.Procedure[] fetchProcedures(java.lang.String application, java.lang.String username, java.lang.String unitnumber) throws java.rmi.RemoteException;
    public org.tatrc.paws.history.Procedure[] fetchProceduresEx(java.lang.String application, java.lang.String username, java.lang.String unitnumber, org.tatrc.paws.history.FetchStatus status) throws java.rmi.RemoteException;
    public org.tatrc.paws.history.SocialHistory[] fetchSocialHistories(java.lang.String application, java.lang.String username, java.lang.String unitnumber) throws java.rmi.RemoteException;
    public org.tatrc.paws.history.SocialHistory[] fetchSocialHistoriesEx(java.lang.String application, java.lang.String username, java.lang.String unitnumber, org.tatrc.paws.history.FetchStatus status) throws java.rmi.RemoteException;
    public org.tatrc.paws.history.OtherPastMedicalHistory[] fetchOtherPastMedicalHistories(java.lang.String application, java.lang.String username, java.lang.String unitnumber) throws java.rmi.RemoteException;
    public org.tatrc.paws.history.OtherPastMedicalHistory[] fetchOtherPastMedicalHistoriesEx(java.lang.String application, java.lang.String username, java.lang.String unitnumber, org.tatrc.paws.history.FetchStatus status) throws java.rmi.RemoteException;
    public org.tatrc.paws.history.FamilyHistory[] fetchFamilyHistories(java.lang.String application, java.lang.String username, java.lang.String unitnumber) throws java.rmi.RemoteException;
    public org.tatrc.paws.history.FamilyHistory[] fetchFamilyHistoriesEx(java.lang.String application, java.lang.String username, java.lang.String unitnumber, org.tatrc.paws.history.FetchStatus status) throws java.rmi.RemoteException;
    public boolean alive() throws java.rmi.RemoteException;
    public java.lang.String version() throws java.rmi.RemoteException;
}
