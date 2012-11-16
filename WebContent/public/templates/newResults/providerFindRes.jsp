<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<table summary="Listing of results from Popup" id="providerSearchTable">  
	<thead > 
		<tr> 
			<th class="oneFiftyThree" id="clinicianName">Clinician Name</th>
			<th class="oneFiftyThree" id="clinicianNcid">Clinician NCID</th> 
			<th class="oneFiftyThree" id="clinic">Clinic</th> 
		</tr> 
	</thead> 
	<tbody id="clinicianSearchResults">
		<c:if test="${null != clinicians}">
			<c:forEach items="${clinicians}" var="clinician" varStatus="rowCounter">
				<c:if test="${rowCounter.count % 2 == 0}">
					<tr id="${clinician.ncid}" class="alternate" 
						onclick="newResultsAction.tableClick(event, '${clinician.ncid}');" 
						ondblclick="newResultsAction.dblClick(event, '${clinician.ncid}');"
						>
				</c:if>
				<c:if test="${rowCounter.count % 2 != 0}">
					<tr id="${clinician.ncid}" class="" 
						onclick="newResultsAction.tableClick(event, '${clinician.ncid}');"
						ondblclick="newResultsAction.dblClick(event, '${clinician.ncid}');" 
						>
				</c:if>
					<td headers="clinicianName">${clinician.fullName}</td> 
					<td headers="clinicianNcid">${clinician.ncid}</td>
					<td headers="clinic">${clinician.clinicName}</td>
				</tr>
			</c:forEach>
		</c:if>
	</tbody>
</table>
	
