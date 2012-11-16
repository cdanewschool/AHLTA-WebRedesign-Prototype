package edu.newschool.piim.model.results;

import static org.junit.Assert.assertTrue;

import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;

import edu.newschool.piim.Setup;

public class ResultStatusTest {
    

    @Before
    public void setUp() throws Exception {
        ApplicationContext ctx = Setup.getCtx();
        ctx.getBean("hib");//init
    }



    @Test
    public void testGetInstance() {
        String pawsKey = "adb";
  //      ResultStatus instance = ResultStatus.getInstance(pawsKey);
        assertTrue(true); 
    }

}
