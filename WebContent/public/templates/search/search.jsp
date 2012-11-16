<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
        
<table summary="Listing of results from Patient Lookup" id="foo">  
	<thead > 
		<tr> 
			<th class="twoCent" id="patientName">Patient Name</th>
			<th class="twoCent" id="ssn">SSN</th> 
			<th class="twoCent" id="FMP-SponsorSSN">FMP/Sponsor SSN</th> 
			<th class="twoCent" id="dob">DOB</th> 
			<th class="twoCent" id="sex">Sex</th> 
			<th class="twoCent" id="homePhone">Home Phone</th> 
			<th class="twoCent" id="workPhone">Work Phone</th>
			<th class="twoCent" id="address">Address</th> 
		</tr> 
	</thead> 
	<tbody id="patientSearchResults">
		<c:if test="${null != patients}">
			<c:forEach items="${patients}" var="patient" varStatus="rowCounter">
				<c:if test="${rowCounter.count % 2 == 0}">
					<tr id="${patient.id}" class="alternate" 
						ondblclick="SearchCtl.dblClick(event, '${patient.id}');"
						onclick="SearchCtl.click(event, '${patient.id}');">
				</c:if>
				<c:if test="${rowCounter.count % 2 != 0}">
					<tr id="${patient.id}" 
						ondblclick="SearchCtl.dblClick(event, '${patient.id}');"
						onclick="SearchCtl.click(event, '${patient.id}');">
				</c:if>
					<td headers="patientName">${patient.patientName}</td>
					<td headers="ssn">${patient.ssn}</td>
					<td headers="FMP-SponsorSSN">${patient.fmpSponsorSsn}</td>
					<td headers="dob"><fmt:formatDate value="${patient.dob}" type="both" 
						pattern="M'/'d'/'yyyy" /></td>
					<td headers="sex">${patient.gender}</td>
					<td headers="homePhone">${patient.homePhone}</td>
					<td headers="workPhone">${patient.workPhone}</td>
					<td headers="address">${patient.address}</td>
				</tr>
			</c:forEach>
		</c:if>
	</tbody>
</table>
