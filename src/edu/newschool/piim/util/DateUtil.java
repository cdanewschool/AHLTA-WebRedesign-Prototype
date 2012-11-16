package edu.newschool.piim.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public final class DateUtil {
    
    public static void main(String[] a) {
        String x = "13 Dec 2010 12:00";
        Date parse = parse(x);
        System.out.println(parse);
    }
    
    /**
     * pattern for the date part 
     */
    private static final String DATE_PART = "MMM dd, yyyy";
    
    /**
     * pattern for the full date and time 
     */
    private static final String FULL_PATRN = "dd MMM yyyy h:mm";
    
    
    /**
     * extracts the MMM dd, yyyy part of a date
     * @param target
     * @return MMM dd, yyyy
     */
    public static String datePart(final Date target) {
        return new SimpleDateFormat(DATE_PART).format(target);
    }
    
    /**
     * format the target date in the applications standard string pattern
     * @return the date in d MMM yyyy h:mm
     */
    public static String format(final Date target) {
        return new SimpleDateFormat(FULL_PATRN).format(target);
    }
    
    /**
     * parse the target string in the applications standard date pattern
     * @return the string in d MMM yyyy h:mm as a date
     */
    public static Date parse(final String dateStr) {
        try {
            System.out.println("\n\ndate " + dateStr);
            return new SimpleDateFormat(FULL_PATRN).parse(dateStr);
        } catch (ParseException e) {
            e.printStackTrace();
            throw new IllegalArgumentException(e);
        }
    }
    
}
