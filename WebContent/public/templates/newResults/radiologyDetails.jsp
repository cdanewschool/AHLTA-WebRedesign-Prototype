<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div id="resultsDetailRad"><!-- new div -->
	<h2>${result.testName}</h2>
	<div class="resultsDetailRpt tblOrChrtBkgrnd">
		<table class="rpt" summary="Report of new results" id="radiologyReportTbl" >
			<thead> 
				<tr> 
					<th id="radiologyRptLabel"></th>
					<th id="radiologyRptValue"></th>
				</tr>
			</thead>
			<tbody>
				<c:forEach items="${result.details}" 
					var="detail" varStatus="rowCounter">
					<c:if test="${detail.warning}">
						<tr id="${detail.id}"  class="warning" >
					</c:if>
					<c:if test="${! detail.warning}">
						<tr id="${detail.id}" >
					</c:if>
						<td headers="radiologyRptLabel"
							>${detail.radiRptLabel}</td>
						<td headers="radiologyRptValue"
							>${detail.radRptValue}</td>	
					</tr>
				</c:forEach>
			</tbody>
		</table>
	</div>
</div>

		