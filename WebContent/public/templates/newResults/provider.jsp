<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<form id="newResultsProviderSearchForm" action="" method="post" class="pop_form">
	<hr />
	<h3>Search Criteria</h3>
	<fieldset class="popup" >
		<label for="provider_name">Name: </label>
		<input id="provider_name" type="text" value="" size="14"
			onkeydown="newResultsAction.popupEnterPressed(event);"/>
		<br class="clearLeft" />
			
		<label for="provider_facility">Facility: </label>
		<select id="provider_facility" onchange="return newResultsAction.providerFacClin(event)">
			<c:forEach items="${facilities}" var="facility" >
				<option value="${facility.ncid}">${facility.name}</option>
			</c:forEach>
		</select>
		<br class="clearLeft" />
		
		<label for="provider_clinic">Clinic: </label>
		<div id="clinicWrap4ie">
			<select id="provider_clinic" >
				<c:forEach items="${clinics}" var="clinic" >
					<option value="${clinic.ncid}">${clinic.name}</option>
				</c:forEach>
			</select>
		</div>
		<br class="clearLeft" />
		
		<label for="loc" > &#160; </label>
		<input id="loc" type="checkbox" value="true"/>
		<label class="rightSide" for="loc" 
			>&#160;Find only clinicians who have accounts on this system.</label>
		<br class="clearLeft" />
		
	</fieldset>
	
	<fieldset class="leftCheck" >
	</fieldset>
	<hr />
	<h3><span id="nbrResults"></span> &#160; Search Results:</h3>
	
	<div id="pop_search_container" class="pop_search" > </div>
	
	
	<fieldset class="pop_search_controls"> 
		<fieldset >
			<input id="btnOk" type="button" value="Find" 
				onmouseover="return actionBttns.mouseover(event, 'btnOk');"
				onmouseout="return actionBttns.mouseout(event, 'btnOk');"
				onmousedown="return actionBttns.mousedown(event, 'btnOk');" 
				onmouseup="newResultsAction.providerFind(event); return actionBttns.mouseup(event, 'btnOk');" />
			<input id="btnSel" type="button" value="Select" 
				onmouseover="return actionBttns.mouseover(event, 'btnSel');"
				onmouseout="return actionBttns.mouseout(event, 'btnSel');"
				onmousedown="return actionBttns.mousedown(event, 'btnSel');" 
				onmouseup="newResultsAction.providerSel(event); return actionBttns.mouseup(event, 'btnSel');" />
		</fieldset>
		<fieldset>
			<input id="btnClr" type="button" value="Clear" 
				onmouseover="return actionBttns.mouseover(event, 'btnClr');"
				onmouseout="return actionBttns.mouseout(event, 'btnClr');"
				onmousedown="return actionBttns.mousedown(event, 'btnClr');" 
				onmouseup="newResultsAction.providerClear(event); return actionBttns.mouseup(event, 'btnClr');" />
		</fieldset>
		<fieldset>
			<input id="btnCnc" type="button" value="Cancel" 
				onmouseover="return actionBttns.mouseover(event, 'btnCnc');"
				onmouseout="return actionBttns.mouseout(event, 'btnCnc');"
				onmousedown="return actionBttns.mousedown(event, 'btnCnc');" 
				onmouseup="newResultsAction.providerCancel(event); return actionBttns.mouseup(event, 'btnCnc');" />
		</fieldset>
	</fieldset>
</form>