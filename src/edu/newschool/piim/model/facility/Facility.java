package edu.newschool.piim.model.facility;

public class Facility extends FacConsValAbsBase {
    
    /**
     * eqality function for use in java collections and the orm
     */
    //    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Facility other = (Facility) obj;
        if (super.getContext() == null) {
            if (other.getContext() != null) return false;
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
     * hashing function for use in java collections and orm 
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
     * textual display for the log etc.
     */
    @Override
    public String toString() {
        return "Facility [getContext()=" + getContext() + ", getName()="
                + getName() + ", getNcid()=" + getNcid() + ", toString()="
                + super.toString() + ", getClass()=" + getClass() + "]";
    }
    
}
