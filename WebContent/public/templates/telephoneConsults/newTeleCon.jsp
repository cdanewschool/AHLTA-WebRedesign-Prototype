<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<form id="newTeleConFrm" class="rela contentWndwPad entryAndDisplay fullborder" 
 	style="padding-left: 11px; padding-right: 11px; ">
	<input type="hidden" id="patientUnitNb" value="${teleConClient.unitNumber}" />

	<fieldset style="padding: 11px; margin: 0;">
		<hr class="rela"  />
		<fieldset class="rela horizontal" style="height: 85px; width: 282px;">
			<fieldset>
				<h3 class="horizontal">${teleConClient.clientName}</h3>
				<div class="horizontal" style="position: absolute; top: 0; left: 191px; ">
					<input type="button" class="textButton " 
						id="changePatient" value="Change Patient" 
						onmouseover="return actionBttns.mouseover(event, 'checkinAction');" 
						onmouseout="return actionBttns.mouseout(event, 'checkinAction');" 
						onmousedown="return actionBttns.mousedown(event, 'checkinAction');" 
						onmouseup="teleConActions.add(); return actionBttns.mouseup(event, 'checkinAction');"/>
					<br style="clear:both" />
				</div>
			</fieldset>
			<fieldset>
				<ul class="rela" >
					<li class="rela" style="clear: both; height: 15px; margin-top: 2px; "
						>FMP: ${teleConClient.fmpSsn} &#160; &#160; &#160; &#160; DOB ${teleConClient.dob}</li
					><li class="rela" style="height: 15px; margin-top: 2px; "
						>Home Phone: ${teleConClient.homePhone}</li
					><li class="rela" style="height: 15px; margin-top: 2px; margin-bottom: 2px; "
						>Work Phone: ${teleConClient.workPhone}</li
				></ul>
			</fieldset>
		</fieldset>
		<fieldset class="horizontal" style="position: absolute; left: 300px; width: 220px; top: 30px;">
			<div class="rela horizontal" >
				<label style="width: 90px; font-weight: bolder; margin-right: 5px;" for="callbackNbr">Call Back Number &#160;</label>
				<input id="callbackNbr" type="text" value="${teleConClient.callbackPhone}" size="14"/>
				<br style="clear:both" />
			</div>
		</fieldset>
		<hr class="rela" >
		<fieldset class="rela horizontal" style=" width: 282px; margin: 5px;">
			<label for="assignedClinic" style="width: 80px;" >Assigned Clinic: &#160;</label>
			<select id="assignedClinic" >
				<c:forEach items="${clinics}" var="clinic" >
					<option value="${clinic.ncid}">${clinic.name}</option>
				</c:forEach>
			</select>
			<br class="clearLeft" />
			<label for="provider" style="width: 80px;" >Assigned Owner: &#160;</label>
			<select id="provider" >
				<c:forEach items="${providers}" var="provider" >
					<option value="${provider.ncid}">${provider.fullName}</option>
				</c:forEach>
			</select>
			<br class="clearLeft" />
		</fieldset>
		<fieldset class="rela horizontal" style="width: 220px; ">
			<h3>Urgency</h3>
			<hr />
			<input type="radio" name="urgency" id="urgencyH" value="high" />
			<label for="urgencyH" class="rightSide" style="width: 45px; " >High</label> 
			<input type="radio" name="urgency" id="urgencyM"value="medium" /> 
			<label for="urgencyM" class="rightSide" style="width: 45px; " >Medium</label> 
			<input type="radio" name="urgency" id="urgencyL" value="low" /> 
			<label for="urgencyL" class="rightSide" style="width: 45px; " >Low</label>
			<br style="clear:both" />
		</fieldset>
		<fieldset class="rela ">
			<h3>Reason for Telephone Consult</h3>
			<textarea name="reason" rows="5" cols="59"> </textarea>
		</fieldset>
		<fieldset class="rela" style="margin-bottom: 5px; " >
			<input id="btnOk" type="button" class="textButton " value="OK" style="left: 225px; " 
					onmouseover="return actionBttns.mouseover(event, 'btnOk');" 
					onmouseout="return actionBttns.mouseout(event, 'btnOk');" 
					onmousedown="return actionBttns.mousedown(event, 'btnOk');" 
					onmouseup="teleConActions.addPt2(event) ; return actionBttns.mouseup(event, 'btnOk');" 
				/> <input id="btnCncl" type="button" class="textButton " value="Cancel" style="left: 225px; "
					onmouseover="return actionBttns.mouseover(event, 'btnCncl');" 
					onmouseout="return actionBttns.mouseout(event, 'btnCncl');" 
					onmousedown="return actionBttns.mousedown(event, 'btnCncl');" 
					onmouseup="actionBttns.mouseup(event, 'btnCncl'); return popup.close(event);" 
				/>
		</fieldset>
	</fieldset>
</form>
