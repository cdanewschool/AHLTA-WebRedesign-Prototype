package edu.newschool.piim.util;

/**
 * utility class for static access for basic boilerplate string functions
 * @author gregm
 *
 */
public final class StringUtil {
    
    /**
     * no instatiations everything is static
     */
    private StringUtil(){}
    
    /**
     * test if the parameter is nul;l or 0 length
     * @param targ a string that may be empty
     * @return boolean true if the targ has no data
     */
    public static final Boolean isEmpty(final String targ) {
        return (null == targ || 1 > targ.trim().length());
    }

    /**
     * test is a string can be converted to a positive integer
     * expand if more sophistication is needed this is 
     * pretty basic
     * @param targ a string which might be a number
     * @return true is the target is numeric else false
     */
    public static final Boolean isNumeric(final String targ) {
        for (int i = 0; i < targ.length(); i++) {
            if (! Character.isDigit(targ.charAt(i))) {
                return false;
            }
        }
        return true;
    }

    /**
     * replace all space with a non-breaking space and all hyphens with non 
     * breaking hyphens.  add more replacers as the situation arises
     * @param targ
     * @return string is non breaking
     */
    public static final String nonBreaking(final String targ) {
        return (isEmpty(targ))? targ : targ.replaceAll(" ", "&#160;").replaceAll("-", "&#8209;");
    }
    

}

