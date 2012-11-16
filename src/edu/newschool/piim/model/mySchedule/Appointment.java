package edu.newschool.piim.model.mySchedule;

import java.util.Date;



/**
 * java bean-level encapsulation of an appointment on a calendar
 * 
 * @author gregm
 */
public class Appointment {
        

    /**
     * property to hold the appointee's unit number
     */
    private String _clientId;

    /**
     * property for the client's name
     */
    private String _clientName;
    
    /**
     * property for the datetime for the start of the appointment
     * currently designed to work only for quarter hours 00 15 30 45
     */
    private Date _start;
    
    /**
     * accessor for the client's unit number
     * @return client's unit number
     */
    public String getClientId() {
        return _clientId;
    }
    
    /**
     * accessor for the name of the person who holds the appointment
     * of the form Doe, Jane
     * @return the client's ln, fn
     */
    public String getClientName() {
        return _clientName;
    }
    
    /**
     * accessor to get the datetime of the start of the appointment
     * @return the start datetime
     */
    public Date getStart() {
        return _start;
    }
    
    /**
     * mutator to set the client's unit number
     * @param clientId 
     */
    public void setClientId(final String clientId) {
        this._clientId = clientId;
    }
    
    /**
     * mutator for the client's name as ln, fn
     * 
     * @param clientName as ln, fn
     */
    public void setClientName(final String clientName) {
        this._clientName = clientName;
    }
    
    /**
     * mutator to set the start time and date of an appointment
     * @param start
     */
    public void setStart(final Date start) {
        this._start = start;
    }
   
    /**
     * textual display of the instance for the log etc
     */
    @Override
    public String toString() {
        return "Appointment [_clientId=" + _clientId + ", _clientName="
                + _clientName + ", _start=" + _start + "]";
    }
    
    

}
