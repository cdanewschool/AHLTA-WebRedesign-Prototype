<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<div id="teleConRemoveWrp" class="rela contentWndwPad entryAndDisplay fullborder" style="width: 340px;"> 
	<div class="rela" style=" padding-left: 11px; padding-right: 11px; " ><hr /></div>
	<form id="removeTeleConFrm" class="rela" style="padding-left: 11px; padding-right: 11px; ">
		<fieldset class="rela">
			<input type="hidden" name="teleConId" value="${appt.teleConId}" />
			<label class="rela" style="width: 90px; font-weight: bold;" 
			for="theDateTime">Date &amp; Time:</label>
			<input class="rela" 
				style="background-color: transparent; border: 0px; font-weight: bold;" 
				name="theDateTime" type="text" disabled="disabled" value="${appt.when}" />
			<br class="rela" style="clear:both" />
			
			<label class="rela" style="width: 90px; font-weight: bold;" 
				for="thePatient">Patient:</label>
			<input class="rela" 
				style="background-color: transparent;  border: 0px; font-weight: bold; " 
				name="thePatient" type="text" disabled="disabled" value="${appt.clientName}" />
			<br class="rela" style="clear:both" />

			<fieldset class="rela" style="left: 100px; " >
				<ul>
					<li> FMP: ${appt.fmpSsn} DOB: ${appt.dob} </li>
					<li> Home Phone: ${appt.homePhone} </li>
					<li> Work Phone: ${appt.workPhone} </li>
				</ul>
			</fieldset>
			
			<fieldset class="rela">
				<legend class="rela">Cancel Type</legend>
				<hr />
				<div class="rela horizontal" style="width: 144px" >
					<input class="rela" type="radio" name="reason" value="patientCancelled" 
						id="patientCancelledId" />
					<label for="patientCancelledId" class="rightSide" style="width: 120px ; padding-top: 4px;"
						>Patient Canceled</label>
					<br class="rela" style="clear:both" />

					<input class="rela" type="radio" name="reason" value="facilityCancelled" id="facilityCancelledId" />
					<label for="facilityCancelledId" class="rightSide" style="width: 120px ; padding-top: 4px;">Facility Canceled</label>
					<br class="rela" style="clear:both" />
					
					<input class="rela" type="radio" name="reason" value="facilityCancelled" id="noShowId" />
					<label for="noShowId" class="rela rightSide" style="width: 120px ; padding-top: 4px;" >No-Show</label>
					<br class="rela" style="clear:both" />
					
				</div>

			</fieldset>
		<div class="rela" style="margin-bottom: 5px; " >
			<div class="rela"  style="width: 100px; left: 110px; " 
				><input id="btnOk" type="button" class="rela textButton " value="OK" 
					onmouseover="return actionBttns.mouseover(event, 'btnOk');" 
					onmouseout="return actionBttns.mouseout(event, 'btnOk');" 
					onmousedown="return actionBttns.mousedown(event, 'btnOk');" 
					onmouseup="teleConActions.removeCompleted(event) ; return actionBttns.mouseup(event, 'btnOk');" 
				/><input id="btnCncl" type="button" class="textButton " value="Cancel" 
					onmouseover="return actionBttns.mouseover(event, 'btnCncl');" 
					onmouseout="return actionBttns.mouseout(event, 'btnCncl');" 
					onmousedown="return actionBttns.mousedown(event, 'btnCncl');" 
					onmouseup="actionBttns.mouseup(event, 'btnCncl'); popup.close(event) ; " 
			/></div
		></div>
			
		</fieldset>	

	
	</form>
</div>

