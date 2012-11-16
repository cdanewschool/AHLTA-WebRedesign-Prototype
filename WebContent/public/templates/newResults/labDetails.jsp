<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div class="resultsDetailLab">
	<h2>${result.testName}</h2>
	<div>
	Collection Date: ${result.testDate}
	<c:if test="${! empty result.orderComments }">
		<br /><h2>Order Comments: ${result.orderComments}</h2>
	</c:if>
	</div>
			
<c:if test="${! empty result.details }">
	<div class="resultsDetailTable">
		<table class="tbl" summary="results details Lab" id="resultsDetailLabTable" >
			<thead><tr>
				<th id="resultName">Result Name</th>
				<th id="siteSpecimen">Site&#160;/&#160;Specimen</th>
				<th id="resultValues">Result Values</th>
				<th id="units">Units</th>
				<th id="refRng">Ref Rng</th>
				<th id="interp">Interpretations, Comments&#160;/&#160;Amendments</th>
			</tr></thead>
			<tbody id="newResultsTbody">
				<c:forEach items="${result.details}" var="detail" varStatus="rowCounter">
					<tr id="${detail.id}" >
						<td headers="resultName">${detail.resultName}</td>
						<td headers="siteSpecimen">${detail.siteSpecimen}</td>
						<td headers="resultValues">${detail.resultValues}</td>
						<td headers="units">${detail.units}</td>
						<td headers="refRange">${detail.refRange}</td>
						<td headers="interp">${detail.interp}</td> 
					</tr>
				</c:forEach>
			</tbody>
		</table>
	</div>
</c:if>
</div>



		