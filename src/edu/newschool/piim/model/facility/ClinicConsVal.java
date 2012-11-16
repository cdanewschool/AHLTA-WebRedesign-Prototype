package edu.newschool.piim.model.facility;

import java.io.Serializable;

public class ClinicConsVal extends FacConsValAbsBase implements Serializable {
    
    /**
     * this needs to be serializable as the object is often stored in teh session and session
     * objects need to serialize
     */
    private static final long serialVersionUID = -7689834929191417297L;

    /**
     * compare this to another for collections functionality
     */
    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        ClinicConsVal other = (ClinicConsVal) obj;
        if (super.getContext() == null) {
            if (other.getContext() != null)
                return false;
        } else if (!super.getContext().equals(other.getContext()))
            return false;
        if (super.getName() == null) {
            if (other.getName() != null)
                return false;
        } else if (!super.getName().equals(other.getName()))
            return false;
        if (super.getNcid() == null) {
            if (other.getNcid() != null)
                return false;
        } else if (!super.getNcid().equals(other.getNcid()))
            return false;
        return true;
    }
    
    /**
     * for object comparison in collections and sorts
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((super.getContext() == null) ? 0 : super.getContext().hashCode());
        result = prime * result + ((super.getName() == null) ? 0 : super.getName().hashCode());
        result = prime * result + ((super.getNcid() == null) ? 0 : super.getNcid().hashCode());
        return result;
    }

    /**
     * display state in the log etc
     */
    @Override
    public String toString() {
        return "ClinicConsVal [getContext()=" + getContext() + ", getName()="
                + getName() + ", getNcid()=" + getNcid() + ", toString()="
                + super.toString() + ", getClass()=" + getClass() + "]";
    }
}
