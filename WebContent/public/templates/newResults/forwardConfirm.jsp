<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<form id="newResultsProviderSearchForm" action="" method="post" class="pop_form">
<c:if test="${null != provider}">
	Would you like to forward the selected result to this provider: ${provider.fullName}?
</c:if>
<c:if test="${null == provider}">
	Would you like to forward the selected result to this provider?
</c:if>
	
	<fieldset style="width: 96%; padding-top: 10px; padding-bottom: 10px" > 
		<fieldset style="padding-left: 100px; " class="horizontal textButton"> 
			<input id="btnOk" type="button" value="OK" style="padding-right: 6px;padding-left: 6px;" 
				onmouseover="return actionBttns.mouseover(event, 'btnOk');"
				onmouseout="return actionBttns.mouseout(event, 'btnOk');"
				onmousedown="return actionBttns.mousedown(event, 'btnOk');" 
				onmouseup="newResults.forwardDo(event);	return actionBttns.mouseup(event, 'btnOk');" />
		</fieldset>
		<fieldset style="padding-left: 20px; " class="horizontal textButton">
			<input id="btnCan" type="button" value="Cancel" 
				onmouseover="return actionBttns.mouseover(event, 'btnCan');"
				onmouseout="return actionBttns.mouseout(event, 'btnCan');"
				onmousedown="return actionBttns.mousedown(event, 'btnCan');" 
				onmouseup="popup.close(event); return actionBttns.mouseup(event, 'btnCan');" />
		</fieldset>
	</fieldset>
</form>