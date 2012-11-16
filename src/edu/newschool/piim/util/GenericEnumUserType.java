package edu.newschool.piim.util;

import java.io.Serializable;
import java.lang.reflect.Method;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Properties;

import org.hibernate.HibernateException;
import org.hibernate.type.NullableType;
import org.hibernate.type.TypeFactory;
import org.hibernate.usertype.ParameterizedType;
import org.hibernate.usertype.UserType;


/**
 * this is a type mapping required for Hibernate to map java Enumerations.
 * the code was taken from the Hibernate website
 * 
 * @author gregm
 *
 */
public class GenericEnumUserType implements UserType, ParameterizedType {
    
    /**
     * constant value for errors on the identifier method
     */
    private static final String DEFAULT_IDENTIFIER_METHOD_NAME = "name" ;
    
    /**
     * Constant value for errors on valueOf method
     */
    private static final String DEFAULT_VALUE_OF_METHOD_NAME = "valueOf" ;

    /**
     * member variable for the mapped enum 
     */
    private Class enumClass;

    /**
     * member variable for the id method of the mapped class
     */
    private Method identifierMethod;

    /**
     * member variable for the type of the mapped class
     */
    private Class identifierType;

    /**
     * member variable for an array for he sql types
     */
    private int[] sqlTypes;

    /**
     * member variable for a hibernate specific reprenentation of the type 
     * that can handle null conditions
     */
    private NullableType type;

    /**
     * member variable for the valueOf method of the mapped class
     */
    private Method valueOfMethod;

    
    /**
     * prepare the object for de-serialization
     */
    public Object assemble(final Serializable cached, final Object owner)
    throws HibernateException {
        return cached;
    }

    /**
     * looks like a simple stub to meet the requiremnted of the itnerface
     */
    public Object deepCopy(final Object value) throws HibernateException {
        return value;
    }

    /**
     * prepare the type for serialization
     */
    public Serializable disassemble(final Object value) throws HibernateException {
        return (Serializable) value;
    }
    
    /**
     * must implement hashcode and equals for huibernate and collections
     */
    public boolean equals(final Object x, final Object y) throws HibernateException {
        return x == y;
    }
    
    /**
     * must implement hashcode and equals for huibernate and collections
     */
    public int hashCode(final Object x) throws HibernateException {
        return x.hashCode();
    }
    
    /**
     * this mapping is not mutable
     */
    public boolean isMutable() {
        return false;
    }
    
    /**
     * handle the result set in a null safe way.  if the result set was null, return null,
     * else invoke the valueOf method of the mapped class 
     */
    @SuppressWarnings("deprecation")
    public Object nullSafeGet(final ResultSet rs, final String[] names, final Object owner) 
    throws HibernateException, SQLException {
        Object identifier = type.get(rs, names[0]);
        if (rs.wasNull()) {
            return null;
        }
        try {
            return valueOfMethod.invoke(enumClass, new Object[] { identifier });
        } catch (Exception e) {
            throw new HibernateException("Exception while invoking valueOf method " + valueOfMethod.getName() + " of enumeration class " + enumClass + " ", e);
        }
    }
    
    /**
     * setting up the prepared statement in a null safe way.  if we are the value is null 
     * then use the setNull method, else call the identifier method on the mapped object
     * and bind that result
     */
    public void nullSafeSet(final PreparedStatement st, final Object value, final int index) 
    throws HibernateException, SQLException {
        try {
            if (value == null) {
                st.setNull(index, type.sqlType());
            } else {
                type.set(st, identifierMethod.invoke(value, new Object[0]), index);
            }
        } catch (Exception e) {
            throw new HibernateException("Exception while invoking identifierMethod " 
                    + identifierMethod.getName() + " of enumeration class " 
                    + enumClass + " ", e);
        }
    }
    
    /**
     * this looks like a stub to simply meet the requirements of the interface
     */
    public Object replace(final Object original, final Object target, final Object owner) 
    throws HibernateException {
        return original;
    }
    
    /**
     * getter for the enum class
     */
    public Class returnedClass() {
        return enumClass;
    }
    
    /**
     * Set up the component by inspecting the config xml loading the target class.
     * From the class we pull out the id method set up the type and sql subtypes
     */
    public void setParameterValues(final Properties parameters) {
        try {
            enumClass = Class.forName(parameters.getProperty("enumClassName")).asSubclass(Enum.class);
        } catch (ClassNotFoundException cfne) {
            throw new HibernateException("Enum class not found", cfne);
        }
        try {
            identifierMethod = enumClass.getMethod(parameters.getProperty("identifierMethod", DEFAULT_IDENTIFIER_METHOD_NAME), new Class[0]);
            identifierType = identifierMethod.getReturnType();
        } catch (Exception e) {
            throw new HibernateException("Failed to obtain identifier method", e);
        }
        type = (NullableType) TypeFactory.basic(identifierType.getName());
        if (type == null) {
            throw new HibernateException("Unsupported identifier type " + identifierType.getName());
        }
        sqlTypes = new int[] { type.sqlType() };
        try {
            valueOfMethod = enumClass.getMethod(parameters.getProperty("valueOfMethod", DEFAULT_VALUE_OF_METHOD_NAME), new Class[] { identifierType });
        } catch (Exception e) {
            throw new HibernateException("Failed to obtain valueOf method", e);
        }
    }
    
    /**
     * getter for the sqltypes
     */
    public int[] sqlTypes() {
        return sqlTypes;
    }
    
    

}   
    
 

