<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<form id="newResultsProviderSearchForm" action="" method="post" class="pop_form">
	The result was sent to the selected provider.
	
	<fieldset style="width: 96%; padding-top: 10px; padding-bottom: 10px" > 
		<fieldset style="padding-left: 80px; " class="horizontal textButton"> 
			<input id="btnOk" type="button" value="OK" style="padding-left: 5px; padding-right: 5px;" 
				onmouseover="return actionBttns.mouseover(event, 'btnOk');"
				onmouseout="return actionBttns.mouseout(event, 'btnOk');"
				onmousedown="return actionBttns.mousedown(event, 'btnOk');" 
				onmouseup="popup.close(event); return actionBttns.mouseup(event, 'btnOk');" />
		</fieldset>
	</fieldset>
</form>