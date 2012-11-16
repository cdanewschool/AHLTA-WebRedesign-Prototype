<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<select id="provider_clinic" >
	<c:forEach items="${clinics}" var="clinic" >
		<option value="${clinic.ncid}">${clinic.name}</option>
	</c:forEach>
</select>

