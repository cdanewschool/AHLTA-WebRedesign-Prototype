<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<table summary="Listing of results from Patient Lookup" id="foo">  
	<thead > 
		<tr><th class="twoCent" id="patientName">Patient Name</th><th class="twoCent" id="ssn">SSN</th><th class="twoCent" id="rank/Svc">Rank/Svc</th><th class="twoCent" id="age">Age</th><th class="twoCent" id="sex">Sex</th><th class="twoCent" id="classification">Classification</th><th class="twoCent" id="previous Enc">Previous Enc</th><th class="twoCent" id="bmistEnc">BMIST Enc</th><th class="twoCent" id="theaterEnc">Theater Enc</th><th class="twoCent" id="problems">Problems</th><th class="twoCent" id="meds">Meds</th><th class="twoCent" id="allergies">Allergies</th><th class="twoCent" id="labs">Labs</th><th class="twoCent" id="rads">Rads</th><th class="twoCent" id="clinicalNotes">Clinical Notes</th><th class="twoCent" id="prePosApptsClinic">Pre-positioned Appts#/Clinic</th><th class="twoCent" id="prePosTelcons">Pre-positioned Telcons</th><th class="twoCent" id="consults">Consults</th><th class="twoCent" id="SRTSII">Active SRTS II Orders</th><th class="twoCent" id="medicareElig">Medicare Eligibility</th><th class="twoCent" id="specialWorkStat">Special Work Status</th><th class="twoCent" id="activeDualStatus">Active Dual Status</th><th class="twoCent" id="diabetesCPG?">Assigned to Diabetes CPG?</th></tr> 
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
					
					<td headers="rank/Svc">${patient.rankSvc}</td>
					<td headers="age">${patient.age}</td>
					<td headers="sex">${patient.gender}</td>
					<td headers="classification">${patient.classification}</td>
					<td headers="previous Enc">${patient.previousEnc}</td>
					<td headers="bmistEnc">${patient.bmistEnc}</td>
					<td headers="theaterEnc">${patient.theaterEnc}</td>
					<td headers="problems">${patient.problems}</td>
					<td headers="meds">${patient.meds}</td>
					<td headers="allergies">${patient.allergies}</td>
					<td headers="labs">${patient.labs}</td>
					<td headers="rads">${patient.rads}</td>
					<td headers="clinicalNotes">${patient.clinicalNotes}</td>
					<td headers="prePosApptsClinic">${patient.prePosApptsClinic}</td>
					<td headers="prePosTelcons">${patient.prePosTelcons}</td>
					<td headers="consults">${patient.consults}</td>
					<td headers="SRTSII">${patient.srtsii}</td>
					<td headers="medicareElig">${patient.medicareElig}</td>
					<td headers="specialWorkStat">${patient.specialWorkStat}</td>
					<td headers="activeDualStatus">${patient.activeDualStatus}</td>
					<td headers="diabetesCPG?">${patient.diabetesCpg}</td>
				</tr>
			</c:forEach>
		</c:if>
	</tbody>
</table>