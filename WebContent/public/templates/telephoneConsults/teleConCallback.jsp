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
		<fieldset >
				<div class="rela">${teleConClient.clientName}</div>
				<div class="rela " >
					<label style="width: 90px; font-weight: bolder; margin-right: 5px;" 
						for="callbackNbr">Call Back Number &#160;</label>
					<input id="callbackNbr" type="text" value="${teleConClient.callbackPhone}" size="20" />
					<br style="clear:both" />
				</div>
			</fieldset>
		</fieldset>
		<fieldset class="rela" style="margin-bottom: 5px; " >
			<input id="btnOk" type="button" class="textButton " value="Submit" style="left: 50px; " 
				onmouseover="return actionBttns.mouseover(event, 'btnOk');" 
				onmouseout="return actionBttns.mouseout(event, 'btnOk');" 
				onmousedown="return actionBttns.mousedown(event, 'btnOk');" 
				onmouseup="teleConActions.update(event) ; return actionBttns.mouseup(event, 'btnOk');" 
			/><input id="btnCncl" type="button" class="textButton " value="Cancel" style="left: 50px; "
				onmouseover="return actionBttns.mouseover(event, 'btnCncl');" 
				onmouseout="return actionBttns.mouseout(event, 'btnCncl');" 
				onmousedown="return actionBttns.mousedown(event, 'btnCncl');" 
				onmouseup="actionBttns.mouseup(event, 'btnCncl'); return popup.close(event);" 
			/>
		</fieldset
	></fieldset
></form>
