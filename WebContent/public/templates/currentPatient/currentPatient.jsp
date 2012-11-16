<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<c:if test="${null != currentPatient}">
	<div">
		<span class="profileBrief" >${currentPatient.lastName}, ${currentPatient.firstName}</span>
	|	<span class="profileBrief" >${currentPatient.idNumber}</span> 
	| <span class="profileBrief" >${currentPatient.age} yo.</span>
	|	<span class="profileBrief" >${currentPatient.gender}</span> 
	| <span class="profileBrief" ><fmt:formatDate value="${currentPatient.dateOfBirth}" 
		type="date" pattern="MMMM d, yyyy" /></span>
	|	<span class="profileBrief" >${currentPatient.allergyWarning}</span>
	</div>

</c:if>
<c:if test="${null == currentPatients}">
	<div>
		<span class="profileBrief" >Patient's last name, first name</span>
		|<span class="profileBrief" >ID number</span>
		|<span class="profileBrief" >Age</span>
		|<span class="profileBrief" >Gender</span>
		|<span class="profileBrief" >Date of Birth</span>
		|<span class="profileBrief" >Allergy warning</span>
	</div>

</c:if>
					
