<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<form id="teleConEntryFrm" class="rela contentWndwPad entryAndDisplay fullborder" 
 	style="padding: 11px;">
	<input type="hidden" id="patientUnitNb" value="${teleConClient.unitNumber}" />
	<input type="hidden" id="teleConId" value="${teleConClient.teleConId}" />

	<fieldset style="margin: 0px;" >
		<h3>Note</h3>
		<textarea name="note" rows="6" cols="35">${teleConClient.note}</textarea>
	</fieldset>
	<fieldset class="rela" style="margin-bottom: 5px; " >
		<input id="btnOk" type="button" class="textButton " value="Submit" style="left: 100px; " 
			onmouseover="return actionBttns.mouseover(event, 'btnOk');" 
			onmouseout="return actionBttns.mouseout(event, 'btnOk');" 
			onmousedown="return actionBttns.mousedown(event, 'btnOk');" 
			onmouseup="teleConActions.update(event) ; return actionBttns.mouseup(event, 'btnOk');" 
		/><input id="btnCncl" type="button" class="textButton " value="Cancel" style="left: 100px; "
			onmouseover="return actionBttns.mouseover(event, 'btnCncl');" 
			onmouseout="return actionBttns.mouseout(event, 'btnCncl');" 
			onmousedown="return actionBttns.mousedown(event, 'btnCncl');" 
			onmouseup="actionBttns.mouseup(event, 'btnCncl'); return popup.close(event);" 
		/>
	</fieldset>
	
</form>
