package edu.newschool.piim;


import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;
import org.springframework.beans.factory.*;





public class Setup {

    
        
    static final String springConfig = //Root =
        //"C:\\Program Files\\tomcat\\apache-tomcat-5.5.25\\webapps\\shomin\\WEB-INF\\spring-config\\" ;
        "C:\\Documents and Settings\\gregm\\workspace\\tatrc\\etc\\tatrc-servlet.xml";
        
//    private static String[] configs = 
//        new java.io.File(springConfigRoot).list(
//                new java.io.FilenameFilter() { 
//                    public boolean accept(java.io.File dir, String name) {
//                        return name.endsWith("xml");
//                    }
//                }
//        );
    
//    private static String[] getConfigs() {
//        String[] ret = new String[configs.length];
//        for (int i = 0; i < configs.length; i++) {
//            // ret[i] = springConfigRoot + "\\" + configs[i];
//            ret[i] = springConfigRoot + configs[i];
//        }
//        return ret;
//    }
    
    private static ApplicationContext applicationContext = 
        new FileSystemXmlApplicationContext(springConfig );
        
        
    private Setup() {}
        
    public static BeanFactory getBeanFactory() {
            return applicationContext;
    }
        
    public static ApplicationContext getCtx() {
        return  applicationContext;
    }
        
    public static void main(String[] args) { 
        // System.out.println("foo");
        /* String[] f = getConfigs();
            for (int i = 0 ; i < f.length; i++) {
                System.out.println("foo " + f[i]);
            }
         */
        BeanFactory beanFactory = Setup.getBeanFactory();
        boolean isNull = (null == beanFactory);
        System.out.println("is factory null? " + isNull);
    }
    
    
    
}
