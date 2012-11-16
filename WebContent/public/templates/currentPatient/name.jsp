<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<span>
    <c:if test="${ empty currentPatient }">  
	   	Patient Medical Records
   	</c:if>
    <c:if test="${! empty currentPatient }">  
	   	${currentPatient.lastName}, ${currentPatient.firstName}
   	</c:if>
</span> 
