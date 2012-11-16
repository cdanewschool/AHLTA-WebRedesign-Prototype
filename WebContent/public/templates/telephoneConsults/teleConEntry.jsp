<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<form id="teleConEntryFrm" class="rela contentWndwPad entryAndDisplay fullborder" 
 	style="padding: 11px;">
	<input type="hidden" id="patientUnitNb" value="${teleConClient.unitNumber}" />
	<c:if test="${null != teleConClient}" >
		<input type="hidden" id="teleConId" value="${teleConClient.teleConId}" />
	</c:if>

	<fieldset  >
		<hr class="rela"  />
		<fieldset style="margin: 0px; height: 80px; width: 575px; " >
			<fieldset class="horizontal" style="position: absolute; top: 0px ; left: 0px; width: 282px; margin: 0px; ">
				<h3 class="horizontal">${teleConClient.clientName}</h3>
				<div class="rela horizontal" style="position: absolute; top: 0; left: 191px; ">
					<input type="button" class="textButton " 
						id="changePatient" value="Change Patient" 
						onmouseover="return actionBttns.mouseover(event, 'checkinAction');" 
						onmouseout="return actionBttns.mouseout(event, 'checkinAction');" 
						onmousedown="return actionBttns.mousedown(event, 'checkinAction');" 
						onmouseup="actionBttns.mouseup(event, 'checkinAction'); teleConActions.add(); return (false);"/>
					<br style="clear:both" />
				</div>
				<ul class="rela" >
					<li class="rela" style="clear: both; height: 15px; margin-top: 2px; "
						>FMP: ${teleConClient.fmpSsn} &#160; &#160; &#160; &#160; DOB ${teleConClient.dob}</li
					><li class="rela" style="height: 15px; margin-top: 2px; "
						>Home Phone: ${teleConClient.homePhone}</li
					><li class="rela" style="height: 15px; margin-top: 2px; margin-bottom: 2px; "
						>Work Phone: ${teleConClient.workPhone}</li
				></ul>
			</fieldset>
			<fieldset class="horizontal" style="position: absolute; top: 0px ; margin: 0px; left: 285px; width: 282px;">
				<div class="rela horizontal" >
					<label style="width: 90px; font-weight: bolder; margin-right: 5px;" 
						for="callbackNbr">Call Back Number &#160;</label>
					<input id="callbackNbr" type="text" value="${teleConClient.callbackPhone}" size="20" />
					<br style="clear:both" />
					<label style="width: 90px; font-weight: bolder; margin-right: 5px;" 
						for="when">Date &amp; Time &#160;</label>
					<input id="when" type="text" value="<fmt:formatDate value="${teleConClient.when}" type="both" 
					pattern="dd MMM yyyy h:mm" />" size="20" />
					<input id="whenDetails" type="button" value="Details" disabled="disabled" />
					<br style="clear:both" />
				</div>
			</fieldset>
		</fieldset>
		<hr class="rela" >
		<fieldset class="horizontal" style=" width: 282px;  margin: 0px;">
			<label for="assignedClinic" style="width: 80px; margin-right: 3px;" >Assigned Clinic: &#160;</label>
			<select id="assignedClinic" >
				<c:forEach items="${clinics}" var="clinic" >
					<c:choose>
					<c:when test="${teleConClient.clinic == clinic}" > 
						<option value="${clinic.ncid}" selected="selected">${clinic.name}</option>
					</c:when> 
					<c:otherwise>
						<option value="${clinic.ncid}">${clinic.name}</option>
					</c:otherwise>
					</c:choose> 
				</c:forEach>
			</select>
			<br class="clearLeft" />
			<label for="provider" style="width: 80px; margin-right: 3px;" >Assigned Owner: &#160;</label>
			<select id="provider" >
				<c:forEach items="${providers}" var="provider" >
					<c:choose>
					<c:when test="${teleConClient.provider == provider}" > 
						<option value="${provider.ncid}" selected="selected"
							>${provider.fullName}</option>
					</c:when> 
					<c:otherwise>
						<option value="${provider.ncid}">${provider.fullName}</option>
					</c:otherwise>
					</c:choose> 
				</c:forEach>
			</select>
			<br class="clearLeft" />
		</fieldset>
		<fieldset class="horizontal" style="width: 282px;  margin: 0px;">
			<h3>Urgency</h3>
			<hr />
			<c:choose>
			<c:when test="${teleConClient.urgency.name == 'High'}" > 
				<input type="radio" name="urgency" id="urgencyH" value="high" checked="checked" />
			</c:when> 
			<c:otherwise>
				<input type="radio" name="urgency" id="urgencyH" value="high" />
			</c:otherwise>
			</c:choose> 
			<label for="urgencyH" class="rightSide" style="width: 45px; " >High</label> 
			<c:choose>
			<c:when test="${teleConClient.urgency.name == 'Medium'}" > 
				<input type="radio" name="urgency" id="urgencyM" value="medium" checked="checked" />
			</c:when> 
			<c:otherwise>
				<input type="radio" name="urgency" id="urgencyM" value="medium" /> 
			</c:otherwise>
			</c:choose> 
			<label for="urgencyM" class="rightSide" style="width: 45px; " >Medium</label>
			<c:choose> 
			<c:when test="${teleConClient.urgency.name == 'Low'}" > 
				<input type="radio" name="urgency" id="urgencyL" value="low" checked="checked" />
			</c:when> 
			<c:otherwise>
				<input type="radio" name="urgency" id="urgencyL" value="low" /> 
			</c:otherwise>
			</c:choose> 
			<label for="urgencyL" class="rightSide" style="width: 48px; " >Low</label>
			<br style="clear:both" />
		</fieldset>
		<fieldset style="margin: 0px;" >
			<h3>Note</h3>
			<textarea name="note" rows="2" cols="65">${teleConClient.note}</textarea>
		</fieldset>
		<fieldset style="margin: 0px;" >
			<h3>Diagnosis</h3>
			<hr class="rela" >
			<input id="clinicList" type="button" value="Clinic List" disabled="disabled" />
			<input id="problemList" type="button" value="Problem List" disabled="disabled" />
			<br />
			<label style="width: 45px; font-weight: bolder; margin-right: 5px;" 
				for="diagSrch">Search: &#160;</label>
			<select id="diagSrch" disabled="disabled" style="width: 140px; " >
				<c:forEach items="${diagSrch}" var="diagSrchKey" >
					<option value="${diagSrchKey.ncid}">${diagSrchKey.name}</option>
				</c:forEach>
			</select>
			<input id="btnFnd" type="button" class="textButton " value="Find" 
				disabled="disabled" style="margin:5px 0 0;"
				onmouseover="return actionBttns.mouseover(event, 'btnFnd');" 
				onmouseout="return actionBttns.mouseout(event, 'btnFnd');" 
				onmousedown="return actionBttns.mousedown(event, 'btnFnd');" 
				onmouseup="return actionBttns.mouseup(event, 'btnFnd');" 
			/><br style="clear:both" 
			/><table class="rela horizontal" style="margin-right: 5px;" 
				><thead
					><tr
						><th id="dActIcd" style="width: 50px;" >ICD</th
						><th id="dActDiag" style="width: 150px;" >Diagnosis</th
					></tr
				></thead
				><tbody style="background-color: #FFF; ">
					<tr>
						<td style="border-top: none; border-bottom: none; " headers="dActIcd" ></td>
						<td style="border-top: none; border-bottom: none; " headers="dActDiag" ></td>
					</tr>
					<tr>
						<td style="border-top: none; border-bottom: none; " headers="dActIcd"  ></td>
						<td style="border-top: none; border-bottom: none; " headers="dActDiag" ></td>
					</tr>
					<tr>
						<td style="border-top: none; " headers="dActIcd" ></td>
						<td style="border-top: none; " headers="dActDiag" ></td>
					</tr>
				</tbody>
			</table
			><div class="rela horizontal" style="margin-top: 5px; padding: 20px, 5px, 10px, 5px; " 
				><input id="btnDadd" type="button" class="textButton " value="Add >>" 
					disabled="disabled" style="margin: 5px 0; top: 20px; width: 60px;"
					onmouseover="return actionBttns.mouseover(event, 'btnFnd');" 
					onmouseout="return actionBttns.mouseout(event, 'btnFnd');" 
					onmousedown="return actionBttns.mousedown(event, 'btnFnd');" 
					onmouseup="return actionBttns.mouseup(event, 'btnFnd');" 
				/><br 
				/><input id="btnDrem" type="button" class="textButton " value="<< Remove" 
					disabled="disabled" style="margin: 5px 0; top: 10px; width: 60px;"
					onmouseover="return actionBttns.mouseover(event, 'btnFnd');" 
					onmouseout="return actionBttns.mouseout(event, 'btnFnd');" 
					onmousedown="return actionBttns.mousedown(event, 'btnFnd');" 
					onmouseup="return actionBttns.mouseup(event, 'btnFnd');" 
			/></div
			><table class="rela horizontal " style="margin-left: 5px;"
				><thead
					><tr
						><th id="uActPri" style="width: 50px;" >Priority</th
						><th id="uActIcd" style="width: 50px;" >ICD</th
						><th id="uActDiag" style="width: 50px;" >Diagnosis</th
						><th id="uActIcd2" style="width: 50px;" >ICD</th
						><th id="uActTyp" style="width: 50px;" >Type</th
					></tr
				></thead
				><tbody style="background-color: #FFF; "
					><tr
						><td style="border-top: none; border-bottom: none; " headers="uActPri" ></td
						><td style="border-top: none; border-bottom: none; " headers="uActIcd" ></td
						><td style="border-top: none; border-bottom: none; " headers="uActDiag" ></td
						><td style="border-top: none; border-bottom: none; " headers="uActIcd2" ></td
						><td style="border-top: none; border-bottom: none; " headers="uActTyp" ></td
					></tr
					><tr>
						<td style="border-top: none; border-bottom: none; " headers="uActPri" ></td>
						<td style="border-top: none; border-bottom: none; " headers="uActIcd" ></td>
						<td style="border-top: none; border-bottom: none; " headers="uActDiag" ></td>
						<td style="border-top: none; border-bottom: none; " headers="uActIcd2" ></td>
						<td style="border-top: none; border-bottom: none; " headers="uActTyp" ></td>
					</tr>
					<tr>
						<td style="border-top: none;" headers="uActPri" ></td>
						<td style="border-top: none;" headers="uActIcd" ></td>
						<td style="border-top: none;" headers="uActDiag" ></td>
						<td style="border-top: none;" headers="uActIcd2" ></td>
						<td style="border-top: none;" headers="uActTyp" ></td>
					</tr>
				</tbody>
			</table>
		</fieldset>
		<fieldset style="margin: 0px; height: 290px; ">
			<fieldset class="horizontal" style="position: absolute; top: 0px; left: 0px; width: 282px; margin: 0px; " >
				<h3>Follow Up</h3>
				<hr class="rela" />
				<c:choose>
					<c:when test="${null != teleConClient.followUp && true == teleConClient.followUp.withPcm }" > 
						<input id="fUwPcm" type="checkbox" checked="checked" value="true"	/>
					</c:when> 
					<c:otherwise>
						<input id="fUwPcm" type="checkbox" value="true"	/>
					</c:otherwise>
				</c:choose> 
				<label for="fUwPcm" class="rightSide" >With PCM</label>
				<c:choose>
					<c:when test="${null != teleConClient.followUp && true == teleConClient.followUp.prn }" > 
						<input id="fUprn" type="checkbox" checked="checked" value="true"  />
					</c:when> 
					<c:otherwise>
						<input id="fUprn" type="checkbox" value="true"  />
					</c:otherwise>
				</c:choose> 
				<label for="fUprn" class="rightSide"  >PRN</label>
				<br class="clearLeft" />
				
				<label for="fUwhen" style="width: 50px;" >When: &#160;</label>
				<c:choose>
					<c:when test="${null != teleConClient.followUp }" > 
						<input id="fUwhen" type="text" value="<fmt:formatDate value="${teleConClient.followUp.when}" type="both" 
							pattern="dd MMM yyyy h:mm" />" size="20" />
					</c:when> 
					<c:otherwise>
						<input id="fUwhen" type="text" value="" size="20" />
					</c:otherwise>
				</c:choose> 
				
				<input id="fUwhenDet" type="button" value="Details"	disabled="disabled" />
				<br class="clearLeft" />
				
				<label for="fUforTx" style="width: 50px;" >For Tx: &#160;</label>
				<c:choose>
					<c:when test="${null != teleConClient.followUp }" > 
						<input id="fUforTx" type="text" value="${teleConClient.followUp.forTx}" size="20"/>
					</c:when> 
					<c:otherwise>
						<input id="fUforTx" type="text" value="" size="20"/>
					</c:otherwise>
				</c:choose> 
				
				<input id="fUforTxDet" type="button" value="Details" 
					disabled="disabled" />
				<br class="clearLeft" />
				
				<label for="fUinClinic" style="width: 50px;" >In Clinic: &#160;</label>
				<select id="fUinClinic" >
					<c:forEach items="${clinics}" var="clinic" >
						<option value="${clinic.ncid}">${clinic.name}</option>
					</c:forEach>
				</select>
				<br class="clearLeft" />
				
				
				<h3>Discussed</h3>
				<hr class="rela" />
				<input id="allItemsDiscussed" type="checkbox" value="true" onClick="teleConActions.checkAllDisc(event); " />
				<label for="allItemsDiscussed" class="rightSide" >All Items Discussed</label>
				<br class="clearLeft" />
				<fieldset style="margin-top: 0px; margin-bottom: 0px; margin-right: 0px;" >
					<fieldset class="rela horizontal" style=" width: 100px; margin-top: 0px; margin-bottom: 0px; margin-right: 0px;" >
						<c:choose>
							<c:when test="${true == teleConClient.discussed.diagnosis}" > 
								<input id="disDiagnosis" type="checkbox" value="true" checked="checked" />
							</c:when> 
							<c:otherwise>
								<input id="disDiagnosis" type="checkbox" value="true" />
							</c:otherwise>
						</c:choose> 
					
					
						<label for="disDiagnosis" class="rightSide" >Diagnosis</label>
						<br class="clearLeft" />
						
						<c:choose>
							<c:when test="${true == teleConClient.discussed.medications}" > 
								<input id="disMed" type="checkbox" value="true" checked="checked" />
							</c:when> 
							<c:otherwise>
								<input id="disMed" type="checkbox" value="true" />
							</c:otherwise>
						</c:choose> 
						<label for="disMed" class="rightSide" style="height: 30px; width: 70px;" >Medication(s)/<br />Treatments</label>
						<br class="clearLeft" />
					</fieldset>
					<fieldset class="rela horizontal" style=" width: 100px; margin-top: 0px; margin-bottom: 0px; margin-right: 0px;">
						<c:choose>
							<c:when test="${true == teleConClient.discussed.sideEffects}" > 
								<input id="disSide" type="checkbox" value="true" checked="checked" />
							</c:when> 
							<c:otherwise>
								<input id="disSide" type="checkbox" value="true" />
							</c:otherwise>
						</c:choose> 
						<label for="disSide" class="rightSide" >Potential Side Effects</label>
						<br class="clearLeft" />
						<c:choose>
							<c:when test="${true == teleConClient.discussed.alternatives}" > 
								<input id="disAlt" type="checkbox" value="true" checked="checked" />
							</c:when> 
							<c:otherwise>
								<input id="disAlt" type="checkbox" value="true" />
							</c:otherwise>
						</c:choose> 
						<label for="disAlt" class="rightSide" >Alternatives</label>
						<br class="clearLeft" />
					</fieldset>
					<input id="disUnd" type="text" value="${teleConClient.discussed.understood}" size="14"  style="float: left;"/>			
					<label for="disUnd" class="rightSide" >indicated understanding</label>
					<br class="clearLeft" />
				</fieldset>
			</fieldset>
			<fieldset class="horizontal" style="position: absolute; top: 0px; left: 285px; width: 282px; margin: 0px; ">
				<h3>Admin</h3>
				<hr class="rela" >
				<label for="outpt" style="width: 190px; " >
					Meets Outpt Visit Criteria [Workload]? &#160;
				</label
				><select id="outpt"  >
					<c:choose>
						<c:when test="${null == teleConClient}" > 
							<option value="yes"> Yes</option>
							<option value="no">No</option>
						</c:when> 
						<c:when test="${true == teleConClient.outPatientOk}" > 
							<option value="no">No</option>
							<option value="yes" selected="selected"> Yes</option>
						</c:when> 
						<c:otherwise>
							<option value="no" selected="selected" >No</option>
							<option value="yes">Yes</option>
						</c:otherwise>
					</c:choose> 
				</select>
				<input id="adminHelp" type="button" value="Help" 
					disabled="disabled" 
				/><br class="clearLeft" />
				<label for="eNm" style="margin-right: 3px; width: 35px;" >
					E&amp;M: &#160;
				</label>
				<select id="eNm" >
					<c:choose>
						<c:when test="${'99441' == teleConClient.eandM}" > 
							<option value="99441" selected="selected">99441 Telephone Services (5-10 minutes)</option>
						</c:when> 
						<c:otherwise>
							<option value="99441">99441 Telephone Services (5-10 minutes)</option>
						</c:otherwise>
					</c:choose> 
					
					<c:choose>
						<c:when test="${'99442' == teleConClient.eandM}" > 
							<option value="99442" selected="selected" >99442 Telephone Services (11-20 minutes)</option>
						</c:when> 
						<c:otherwise>
							<option value="99442">99442 Telephone Services (11-20 minutes)</option>
						</c:otherwise>
					</c:choose> 
					
					<c:choose>
						<c:when test="${'99443' == teleConClient.eandM}" > 
							<option value="99443" selected="selected" >99443 Telephone Services (21-30 minutes)</option>
						</c:when> 
						<c:otherwise>
							<option value="99443">99443 Telephone Services (21-30 minutes)</option>
						</c:otherwise>
					</c:choose> 
					<c:choose>
						<c:when test="${'99444' == teleConClient.eandM}" > 
							<option value="99444" selected="selected" >99444 On-Line Medical Evaluation</option>
						</c:when> 
						<c:otherwise>
							<option value="99444">99444 On-Line Medical Evaluation</option>
						</c:otherwise>
					</c:choose> 
					<c:choose>
						<c:when test="${'99499' == teleConClient.eandM}" > 
							<option value="99499" selected="selected" >99499 (Unlisted E&M)</option>
						</c:when> 
						<c:otherwise>
							<option value="99499">99499 (Unlisted E&M)</option>
						</c:otherwise>
					</c:choose> 
					<c:choose>
						<c:when test="${'no' == teleConClient.eandM}" > 
							<option value="no" selected="selected" ></option>
						</c:when> 
						<c:otherwise>
							<option value="no"></option>
						</c:otherwise>
					</c:choose> 
				</select>
				<br class="clearLeft" style="margin-bottom: 20px; " />
				<h3>Disposition</h3>
				<hr class="rela" >
				<input id="disposition" type="text" value="${teleConClient.disposition}" size="40"/>
				<br class="clearLeft" />
				<h3>Comments (not written to encounter)</h3>
				<textarea id="commentson" rows="6" cols="32">${teleConClient.comments}</textarea>
				<br class="clearLeft" />
			</fieldset>
		</fieldset>
		<fieldset class="rela" style="margin-bottom: 5px; " >
			<input id="btnOk" type="button" class="textButton " value="Submit" style="left: 225px; " 
					onmouseover="return actionBttns.mouseover(event, 'btnOk');" 
					onmouseout="return actionBttns.mouseout(event, 'btnOk');" 
					onmousedown="return actionBttns.mousedown(event, 'btnOk');" 
					onmouseup="teleConActions.update(event) ; return actionBttns.mouseup(event, 'btnOk');" 
		/></fieldset
	></fieldset
></form>
