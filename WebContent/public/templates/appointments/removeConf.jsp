<form style="margin: 5px 20px 5px 20px; ">
	<div style="margin: 5px 20px 5px 20px; ">The selected appointment has been canceled.</div>
	<div class="rela"  style="width: 100px; left: 110px; " >
		<input id="btnOk" type="button" class="rela textButton " value="OK" 
			onmouseover="return actionBttns.mouseover(event, 'btnOk');" 
			onmouseout="return actionBttns.mouseout(event, 'btnOk');" 
			onmousedown="return actionBttns.mousedown(event, 'btnOk');" 
			onmouseup="apptActions.doneRemove(event) ; return actionBttns.mouseup(event, 'btnOk');" 
		/> 
	</div>
</form>