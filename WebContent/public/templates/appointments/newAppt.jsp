<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div id="patientSearchDiv" class="contentWndwPad entryAndDisplay fullborder" > 
	<div class="rela" style="width: 578px; padding-left: 11px; padding-right: 11px; " ><hr /></div>
	<form id="newApptFrm" class="rela" style="width: 585px; padding-left: 11px; padding-right: 11px; ">
 		<input type="hidden" id="patientUnitNb" value="${patient.unitNumber}" 
 		/><div class="rela" style="height: 85px;">
			<ul class="rela"
				><li class="rela horizontal" style="height: 85px; width: 282px; margin: 5px;" >
					<ul class="rela" style="" >
						<li class="rela">
							<h3 class="horizontal">${patient.clientName}</h3>
							<div class="rela horizontal" style="top: 0; left: 105px; ">
								<input type="button" class="textButton " 
									id="changePatient" value="Change Patient" 
									onmouseover="return actionBttns.mouseover(event, 'checkinAction');" 
									onmouseout="return actionBttns.mouseout(event, 'checkinAction');" 
									onmousedown="return actionBttns.mousedown(event, 'checkinAction');" 
									onmouseup="apptActions.add(); return actionBttns.mouseup(event, 'checkinAction');"/>
								<br style="clear:both" />
									
							</div>
						</li>
						<li class="rela" style="clear: both;">
							<div class="rela horizontal" style="height: 15px; margin-top: 2px; " 
								>FMP: ${patient.fmpSsn} &#160; &#160; &#160; &#160; DOB ${patient.dob}</div>
						</li>
						<li class="rela">
							<div class="rela horizontal" style="height: 15px; margin-top: 2px; "
							>Home Phone: ${patient.homePhone}</div>
						</li>
						<li class="rela">
							<div class="rela horizontal" style="height: 15px; margin-top: 2px; margin-bottom: 2px; " 
							>Work Phone: ${patient.workPhone}</div>
						</li>
						
					</ul>
				</li
				><li class="rela horizontal" style="height: 85px; width: 200px; margin: 5px; top:-53px;">
					<div class="rela horizontal" style="top: 15px; ">
						<label style="width: 90px; font-weight: bolder; margin-right: 5px;" for="callbackNbr">Call Back Number &#160;</label>
						<input id="callbackNbr" type="text" value="" size="14"/>
						<br style="clear:both" />
					</div>
				</li
			></ul>
		</div>
		<hr />
		<div class="rela" >
			<ul>
				<li class="rela horizontal" style="width: 282px; margin: 5px; height : 280px; ">
					<ul>
						<li>
		
		<fieldset >
			<label for="dateTime">Date &amp; Time: &#160;</label
			><input id="dateTime" type="text" value="" size="20" 
			/><br class="clearLeft" />
			
			<label for="assignedClinic">Assigned Clinic: &#160;</label>
			<select id="assignedClinic" >
			<c:forEach items="${clinics}" var="clinic" >
				<option value="${clinic.ncid}">${clinic.name}</option>
			</c:forEach>
			</select>
			<br class="clearLeft" />
									
			<label for="provider">Provider: &#160;</label>
			<select id="provider" >
			<c:forEach items="${providers}" var="provider" >
				<option value="${provider.ncid}">${provider.fullName}</option>
			</c:forEach>
			</select>
			<br class="clearLeft" />
		</fieldset>							
									
									
						</li>
						<li>
							<h3><label style="width: 105px; float: none; text-align: left; " for="apptType">Appointment Type</label></h3>
							<hr />
							<select id="apptType" size="7"
								><option value="acut">Acute Appt [Acut $] 30</option
								><option value="est">Established Follow Up Appt [est] 60</option
								><option value="proc">Procedure Appt [Proc] 60</option
								><option value="rout">Routine [Rout] 15</option
								><option value="tcon">Telephone Consult [Tcon] 10</option
								><option value="well">Wellness/Health Promotion Appt [Well] 30</option
							></select>				
							<br class="clearLeft" />
						</li>
						<li>
							<h3>USV Type</h3>
							<hr />
							<input type="radio" name="usvType" id="usvW" value="walkin" />
							<label for="usvW" class="rightSide" style="width: 45px; " >Walk-in</label> 
							 &#160; &#160; &#160; &#160; &#160;
							<input type="radio" name="usvType" id="usvS" value="sickCall" />
							<label for="usvS" class="rightSide" style="width: 45px; " >Sick Call</label>
							<br style="clear:both" />
						</li>
					</ul>
				</li>
				<li class="rela horizontal" style="width: 277px; margin: 5px; height : 280px;">
					<ul>
						<li>
							<h3>Appointment Classification</h3>
							<hr />
							<input type="radio" name="apptClass" id="apptClassO" value="outpatient" /> 
							<label for="apptClassO" class="rightSide" style="width: 50px; margin-right: 11px; " >Outpatient</label> 
							<input type="radio" name="apptClass" id="apptClassI" value="inpatient" /> 
							<label for="apptClassI" class="rightSide" style="width: 45px; " >Inpatient</label>
							<br style="clear:both" />
						</li>
						<li>
							<h3>Observation</h3>
							<hr />
							<input type="checkbox" name="observation" value="observation" /> 
							<label for="observation" class="rightSide" style="width: 45px; " >Observation</label>
							<br style="clear:both" />
						</li>
						<li>
							<h3>Meets Output Visit Criteria [Workload]?</h3>
							<hr />
							<input type="radio" name="outpatOk" id="outpatOkY" value="yes" 
							/><label for="outpatOkY" class="rightSide" style="width: 45px; " >Yes</label>
							<input type="radio" name="outpatOk" value="no" id="outpatOkN"  
							/><label for="outpatOkN" class="rightSide" style="width: 45px; " >No</label>
							<br style="clear:both" />
						</li>
						<li>
							<hr />
							<input type="checkbox" name="rel2Inpat" value="true" />
							<label for="rel2Inpat" class="rightSide" style="width: 45px; " >Related to Inpatient Stay?</label>
							<br style="clear:both" />
							<input type="checkbox" name="rel2Inj" value="true" /> 
							<label for="rel2Inj" class="rightSide" style="width: 45px; " >Related to Injury/Accident?</label>
							<br style="clear:both" />
						</li>
						<li>
							<h3>Urgency</h3>
							<hr />
							<input type="radio" name="urgency" id="urgencyH" value="high" />
							<label for="urgencyH" class="rightSide" style="width: 45px; " >High</label> 
							<input type="radio" name="urgency" id="urgencyM"value="medium" /> 
							<label for="urgencyM" class="rightSide" style="width: 45px; " >Medium</label> 
							<input type="radio" name="urgency" id="urgencyL" value="low" /> 
							<label for="urgencyL" class="rightSide" style="width: 45px; " >Low</label>
							<br style="clear:both" />
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<hr />
		<div class="rela" >
			<ul>
				<li class="rela horizontal" style="width: 278px; margin: 5px;">
					<h3>Reason for Appointment</h3>
					<textarea name="reason" rows="5" cols="31"> </textarea>
				</li>
				<li class="rela horizontal" style="width: 278px; margin: 5px;">
					<h3>Comments</h3>
					<textarea name="comments" rows="5" cols="31"> </textarea>
				</li>
			</ul>
		</div>
		<div class="rela" style="margin-bottom: 5px; " >
			<div class="rela"  style="width: 100px; left: 240px; " >
				<input id="btnOk" type="button" class="textButton " value="OK" 
					onmouseover="return actionBttns.mouseover(event, 'btnOk');" 
					onmouseout="return actionBttns.mouseout(event, 'btnOk');" 
					onmousedown="return actionBttns.mousedown(event, 'btnOk');" 
					onmouseup="apptActions.addCompleted(event) ; return actionBttns.mouseup(event, 'btnOk');" 
				/> <input id="btnCncl" type="button" class="textButton " value="Cancel" 
					onmouseover="return actionBttns.mouseover(event, 'btnCncl');" 
					onmouseout="return actionBttns.mouseout(event, 'btnCncl');" 
					onmousedown="return actionBttns.mousedown(event, 'btnCncl');" 
					onmouseup="actionBttns.mouseup(event, 'btnCncl'); popup.close(event); return (false) ; " 
			/></div>
		</div>
	</form>
</div>