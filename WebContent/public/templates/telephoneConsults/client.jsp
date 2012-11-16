<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@page contentType="text/xml" %>
<c:if test="${null == client}">
	<div>client is null</div>
</c:if>

<c:if test="${null != client}">
<table>
	<tbody>
	
			<tr class="twenty bottomBorder"><td class="patName" colspan="2">${client.clientName}</td></tr>
			<tr class="twelve">
				<td>From</td>
				<td><fmt:formatDate value="${client.when}" type="both" 
					pattern="MM/dd/yyyy'&#160;at&#160;'h:mm'&#160;'a" />
				</td></tr>
			<tr class="twelve bottomBorder"><td>To</td><td><fmt:formatDate value="${client.whenEnd}" type="both" 
				pattern="MM/dd/yyyy'&#160;at&#160;'h:mm'&#160;'a" /></td></tr>
			<tr class="sixteen bottomBorder"><td>Urgency</td><td>${client.urgencyName}</td></tr>
			<tr class="sixteen bottomBorder"><td>Status</td><td>${client.apptStatus}</td></tr>
			<tr class="twelve"><td>Call&#160;Back&#160;Phone</td><td>${client.callbackPhone}</td></tr>
			<tr class="ten"><td></td><td></td></tr>
			<tr class="twelve"><td>Home&#160;Phone</td><td>${client.homePhone}</td></tr>
			<tr class="twelve bottomBorder"><td>Work&#160;Phone</td><td>${client.workPhone}</td></tr>
			<tr class="fifty bottomBorder"><td>Reason&#160;for&#160;Call</td><td>${client.reasonForVisit}</td></tr>
			
			<c:choose>
				<c:when test="${null == client.clinic}" > 
					<tr class="thirteen"><td>Clinic</td><td></td></tr>
				</c:when> 
				<c:otherwise>
					<tr class="thirteen"><td>Clinic</td><td>${client.clinic.name}</td></tr>
				</c:otherwise>
			</c:choose> 
					
					
			<tr class="thirteen"><td>MEPRS&#160;Code</td><td>${client.meprsCode}</td></tr>
			
			<c:choose>
				<c:when test="${null == client.provider}" > 
					<tr class="thirteen bottomBorder"><td>Provider</td><td></td></tr>
				</c:when> 
				<c:otherwise>
					<tr class="thirteen bottomBorder"><td>Provider</td><td>${client.provider.fullName}</td></tr>
				</c:otherwise>
			</c:choose> 
			
			<tr class="sixteen bottomBorder"><td>FMP/SSN</td><td>${client.fmpSsn}</td></tr>
			<tr class="sixteen bottomBorder"><td>MEPRS&#160;Description</td><td>${client.meprsDescription}</td></tr>
			<tr class="sixteen bottomBorder"><td>Telecon&#160;IEN</td><td></td></tr>
			<tr class="sixteen bottomBorder"><td>Telecon&#160;ID</td><td>${client.teleConId}</td></tr>
			<tr class="seventyEight"><td>Comments</td><td>${client.comments}</td></tr>
	</tbody>
</table>	
</c:if>
