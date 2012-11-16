package edu.newschool.piim.model.results;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.List;


/**
 * abstract base class for labs and radiology reports so that
 * they can be treated polymorphically
 * @author gregm
 *
 */
public abstract class ResultsNew  {
    
    
    /**
     * property for the patients age
     */
    private String _age;
    
    /**
     * property for for the critical/ abnormal warning
     */
    private String _criticalAbnormal;
    
    /**
     * property for report details 
     */
    private List<ResultsDetail> _details;
    
    /**
     * property for the fmp-ssn 
     */
    private String _fmpSsn;
    
    /**
     * property for the patient's gender
     */
    private String _gender;
    
    /**
     * property for the report id -- this is an artificial id because paws 
     * does not give us one so we build one
     */
    private final String _id;
    
    /**
     * property for for the order comments 
     */
    private String _orderComments;

    /**
     * property for the patient name 
     */
    private String _patientName;
    
    /**
     * property for the priority 
     */
    private String _priority;
    
    /**
     * property for the results status 
     */
    private ResultStatus _resultStatus; 
    
    /**
     * property for the test date
     */
    private Date _testDate;
    
    /**
     * property for the test name
     */
    private String _testName;
    
    /**
     * property for kind of test 
     */
    protected ResultsKind _kind;
    
    /**
     * we has a one arg constructor
     * @param id
     */
    protected ResultsNew(final String id) {
        _resultStatus = ResultStatus.getInstance(id);
        _id = id;
    }
    
    /**
     * accessor for the patient's age
     * @return
     */
    public String getAge() {
        return _age;
    }
    
    /**
     * accessor for critical /abnormal warning
     * @return
     */
    public String getCriticalAbnormal() {
        return _criticalAbnormal;
    }
    
    /**
     * accessor for the report details
     * @return
     */
    public final List<ResultsDetail> getDetails () {
        return _details;
    }
    
    /**
     * accessor for for fmp-ssn 
     * @return
     */
    public String getFmpSsn() {
        return _fmpSsn;
    }
    
    /**
     * accessor for the patient gender
     * @return
     */
    public String getGender() {
        return _gender;
    }
    
    /**
     * accessor for the test id 
     * @return
     */
    public String getId() {
        return _id;
    }
    
    /**
     * accessor for get the test 
     * @return
     */
    public String getIdEncoded() {
        try {
            return java.net.URLEncoder.encode(_id, "UTF-8");
        } catch (final UnsupportedEncodingException e) {
            throw new IllegalStateException(e);
        }
    }

    /**
     * accessor for the order comments
     * @return
     */
    public String getOrderComments() {
        return _orderComments;
    }

    /**
     * accessor for the patient name 
     * @return
     */
    public String getPatientName() {
        return _patientName;
    }
    
    /**
     * accessor for the priority
     * @return
     */
    public String getPriority() {
        return _priority;
    }
    
    /**
     * accessor for the polimorphic kind of test 
     * @return
     */
    public ResultsKind getResultKind() { 
        return _kind; 
    }
    
    /**
     * accessor for the result's status label
     * @return
     */
    public String getResultStatus() {
        return _resultStatus.getState().name();//.getStatus();
    }
    
    /**
     * accessor for the result's status object
     * @return
     */
    public ResultStatus getStatusObj() {
        return _resultStatus;
    }
    
    /**
     * accessor for the test date 
     * @return
     */
    public Date getTestDate() {
        return _testDate;
    }
    
    /**
     * accessor for the test name 
     * @return
     */
    public String getTestName() {
        return _testName;
    }
    
    /**
     * accessor for the abnormal result indicator 
     * @return
     */
    public boolean isAbnormal() {
        return ("Abnormal".equalsIgnoreCase(_criticalAbnormal)
                || "Critical".equalsIgnoreCase(_criticalAbnormal));
    }
    
    /**
     * mutator for the patient's age 
     * @param age
     */
    public void setAge(final String age) {
        this._age = age;
    }

    /**
     * mutator for the critical abnormal indicator 
     * @param criticalAbnormal
     */
    public void setCriticalAbnormal(final String criticalAbnormal) {
        this._criticalAbnormal = criticalAbnormal;
    }
    
    /**
     * mutator for the report details
     * @param details
     */
    public final void setDetails(final List<ResultsDetail> details){
        _details = details;
    }
    
    /**
     * mutator for the fmp ssn
     * @param fmpSsn
     */
    public void setFmpSsn(final String fmpSsn) {
        this._fmpSsn = fmpSsn;
    }
    
    /**
     * mutator for the patient's gender
     * @param gender
     */
    public void setGender(final String gender) {
        this._gender = gender;
    }
    
    /**
     * mutator for the order comments
     * @param orderComments
     */
    public void setOrderComments(final String orderComments) {
        this._orderComments = orderComments;
    }
    
    /**
     * mutator for the patient's name
     * @param patientName
     */
    public void setPatientName(final String patientName) {
        this._patientName = patientName;
    }
    
    /**
     * mutator for the priority
     * @param priority
     */
    public void setPriority(final String priority) {
        this._priority = priority;
    }
    
    /**
     * mutator for the test date
     * @param testDate
     */
    public void setTestDate(final Date testDate) {
        this._testDate = testDate;
    }
    
    /**
     * mutator for 
     * @param testName
     */
    public void setTestName(final String testName) {
        this._testName = testName;
    }
    
    /**
     * display state
     */
    @Override
    public String toString() {
        return "ResultsNew [_age=" + _age + ", _criticalAbnormal="
                + _criticalAbnormal + ", _details=" + _details + ", _fmpSsn="
                + _fmpSsn + ", _gender=" + _gender + ", _id=" + _id
                + ", _kind=" + _kind + ", _orderComments=" + _orderComments
                + ", _patientName=" + _patientName + ", _priority=" + _priority
                + ", _resultStatus=" + _resultStatus + ", _testDate="
                + _testDate + ", _testName=" + _testName + "]";
    }
    


}
