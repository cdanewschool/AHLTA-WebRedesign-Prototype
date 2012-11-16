<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<table class="tbl" summary="Listing of new results" id="newResultsTable" >
	<thead>
		<tr> 
			<th id="patientName">Patient Name</th><th id="status">Status</th> 
			<th id="type">Type</th><th id="testName">Test Name</th> 
			<th id="critAbi">Critical/Abnormal</th><th id="theDate">Date</th> 
			<th id="orderComments">Order Comments</th>
			<th id="priority">Priority</th><th id="age">Age</th> 
			<th id="gender">Gender</th><th id="fmpSsn">FMP/SSN</th> 
		</tr> 
	</thead>
	<tbody id="newResultsTbody">
		<c:set var="indx" value="-1"/>
	
		<c:forEach items="${results}" var="result" varStatus="rowCounter">
			<c:set var="indx" value="${rowCounter.count}"/>
			<c:if test="${rowCounter.count % 2 == 0}">
				<c:if test="${result.abnormal}">
					<tr id="${result.idEncoded}" class="alternate warning" 
						onclick="focusOnPopup(event); return newResults.getDetails(event, '${result.idEncoded}');"	>
				</c:if>
				<c:if test="${! result.abnormal}">
					<tr id="${result.id}" class="alternate" 
						onclick="focusOnPopup(event); return newResults.getDetails(event, '${result.idEncoded}');"	>
				</c:if>
			</c:if>
			<c:if test="${rowCounter.count % 2 != 0}">
				<c:if test="${result.abnormal}">
					<tr id="${result.id}" class="warning" 
						onclick="focusOnPopup(event); return newResults.getDetails(event, '${result.idEncoded}');"	>
				</c:if>
				<c:if test="${! result.abnormal}">
					<tr id="${result.id}" 
						onclick="focusOnPopup(event); return newResults.getDetails(event, '${result.idEncoded}');"	>
				</c:if>
			</c:if>
				<td headers="patientName">${result.patientName}</td>
				<td headers="status">${result.resultStatus}</td> 
				<td headers="type">${result.resultKind}</td> 
				<td headers="testName">${result.testName}</td> 
				<td headers="critAbi">${result.criticalAbnormal}</td> 
				
				<td headers="theDate">
					<fmt:formatDate 
					value="${result.testDate}"
					type="date" pattern="dd MMM yyyy" />
				</td>
					 
				<td headers="orderComments">${result.orderComments}</td>
				<td headers="priority">${result.priority}</td> 
				<td headers="age">${result.age}</td>
				<td headers="gender">${result.gender}</td> 
				<td headers="fmpSsn">${result.fmpSsn}</td> 
		</tr>
		</c:forEach>
	</tbody>
	<tfoot></tfoot>
</table>

		