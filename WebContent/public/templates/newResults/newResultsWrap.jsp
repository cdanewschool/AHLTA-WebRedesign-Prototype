<div class="contentContainer" id="newResults">
	<form onSubmit=" return false;" action="" method="get">
		<input type="hidden" id="sel_prov" value="" />
		<div class="title"><h1>New Results</h1></div>
		<div class="actions"
			><ul class="buttons"
				><li class="horizontal action"><input type="image"
					class="imgButton " id="saveAction"
					src="WebContent/public/media/images/actions/ActionIcon_Save_UA_18x18.gif" alt="save" 
					disabled="disabled"
					onmouseover="return actionBttns.mouseoverImg(event, 'saveAction');"
					onmouseout="return  actionBttns.mouseoutImg(event, 'saveAction');"
					onmousedown="return  actionBttns.mousedownImg(event, 'saveAction');" 
					onmouseup="newResults.save(event); return  actionBttns.mouseupImg(event, 'saveAction');" 
				/></li
				><li class="horizontal action"><input type="button"
					class="textButton " id="reviewedAction" value="Mark Reviewed"
					disabled="disabled" 
					onmouseover="return actionBttns.mouseover(event, 'reviewedAction');" 
					onmouseout="return actionBttns.mouseout(event, 'reviewedAction');" 
					onmousedown="return actionBttns.mousedown(event, 'reviewedAction');" 
					onmouseup="newResults.markReviewed(event); return actionBttns.mouseup(event, 'reviewedAction');" 
				/></li
				><li class="horizontal action"><input type="button"
					class="textButton " id="signRemoveAction" value="Sign/Remove" 
					disabled="disabled" 
					onmouseover="return  actionBttns.mouseover(event, 'signRemoveAction');" 
					onmouseout="return actionBttns.mouseout(event, 'signRemoveAction');" 
					onmousedown="return actionBttns.mousedown(event, 'signRemoveAction');" 
					onmouseup="newResults.sign(event); return actionBttns.mouseup(event, 'signRemoveAction');" 
				/></li
				><li class="horizontal action"><input type="button"
					class="textButton " id="undoRemoveAction" value="Undo Remove" 
					disabled="disabled" 
					onmouseover="return actionBttns.mouseover(event, 'undoRemoveAction');" 
					onmouseout="return actionBttns.mouseout(event, 'undoRemoveAction');" 
					onmousedown="return actionBttns.mousedown(event, 'undoRemoveAction');" 
					onmouseup="newResults.unsign(event); return actionBttns.mouseup(event, 'undoRemoveAction');" 
				/></li
				><li class="horizontal action"><input type="button"
					class="textButton " id="forwardAction" value="Forward" 
					disabled="disabled" 
					onmouseover="return  actionBttns.mouseover(event, 'forwardAction');" 
					onmouseout="return actionBttns.mouseout(event, 'forwardAction');" 
					onmousedown="return actionBttns.mousedown(event, 'forwardAction');" 
					onmouseup="newResults.forwardConfirm(event); return actionBttns.mouseup(event, 'forwardAction');" 
				/></li
				><li class="horizontal action"><input type="button"
					class="textButton " id="moveToNewAction" value="Move to New" 
					disabled="disabled" 
					onmouseover="return  actionBttns.mouseover(event, 'moveToNewAction');" 
					onmouseout="return actionBttns.mouseout(event, 'moveToNewAction');" 
					onmousedown="return actionBttns.mousedown(event, 'moveToNewAction');" 
					onmouseup="newResults.moveToNew(event); return actionBttns.mouseup(event, 'moveToNewAction');" 
				/></li
				><li class="horizontal buttonBreak action"><input type="image"
					class="verticalRule" disabled="disabled"
					src="WebContent/public/media/images/actions/ActionBar_Vertical_Rule_3x18.gif"
					alt="vertical rule" 
				/></li
				><li class="horizontal action"><input type="image"
					class="imgButton " id="refreshAction"
					src="WebContent/public/media/images/actions/ActionIcon_Refresh_Link_18x18.gif"
					alt="Refresh"  
					onmouseover="return  actionBttns.mouseoverImg(event, 'refreshAction');"
					onmouseout="return actionBttns.mouseoutImg(event, 'refreshAction');"
					onmousedown="return actionBttns.mousedownImg(event, 'refreshAction');" 
					onmouseup="newResults.refresh(event); return actionBttns.mouseupImg(event, 'refreshAction');" 
				/></li
				><li class="horizontal action"><input type="button"
					class="textButton " id="legendAction" value="Legend" 
					onmouseover="return actionBttns.mouseover(event, 'legendAction');" 
					onmouseout="return actionBttns.mouseout(event, 'legendAction');" 
					onmousedown="return actionBttns.mousedown(event, 'legendAction');" 
					onmouseup="newResults.openLegend(event); return actionBttns.mouseup(event, 'legendAction');"
					 
				/></li
			></ul
		></div>
		<div class="contentFrame">
			<div class="contentWndwNoPad">

				<div id="newResultsContainer" curResultConCat="" curTab="">
					<ul class="tabbed">
						<li class="horizontal " id="newResultsTabNew"
							><a onclick="return newResults.activateNewTab(event);"
								class="horizontal pointer displayFont">New</a
						></li
						><li class="horizontal " id="newResultsTabSaved">
							<a onclick="return newResults.activateSavedTab(event);"
								class="horizontal pointer displayFont">Saved</a
						></li>
					</ul>
					<div class="tabBottom"></div>
	
					<div class="mainDisplay viewOnly">
						<div class="topCtls"
							><input class="textButton clrBlk"
								type="button" id="providerSrch" 
								value="Provider Search" 
								onclick="return newResultsAction.popProviderSearch(event);"
							/><label class="rightInptLabel sumryOfSelOption" 
								for="providerSrch"
								>${current_facility.name}, ${current_clinic.name}</label
						></div>
						<h2><span id="nbrResults">Fetching</span>&#160;Results:</h2>
						<div class="newResTbl" id="resultsContainer"></div>
						<div class="resultsSpacer"></div>
						<div id="resultsDetailContainer"></div>
					</div>
				</div><!-- newResultsContainer -->
			</div><!-- end content viewport -->
		</div><!-- end content frame  -->
	</form><!-- end form wrapper -->
</div><!-- end searchContainer -->