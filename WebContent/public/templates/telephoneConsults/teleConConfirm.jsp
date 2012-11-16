<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<form id="newTeleConFrmw" class="rela contentWndwPad entryAndDisplay fullborder" 
 	style="padding: 11px;">
	<div>The Encounter Summary for the patient <bold> (${teleConClient.clientName}) </bold> has been updated.</div>
	<fieldset class="rela" style="margin-bottom: 5px; " >
		<input id="btnOk" type="button" class="textButton " value="Submit" style="left: 150px; " 
			onmouseover="return actionBttns.mouseover(event, 'btnOk');" 
			onmouseout="return actionBttns.mouseout(event, 'btnOk');" 
			onmousedown="return actionBttns.mousedown(event, 'btnOk');" 
			onmouseup="teleConActions.updateDone(event) ; return actionBttns.mouseup(event, 'btnOk');" 
	/></fieldset
></form>
