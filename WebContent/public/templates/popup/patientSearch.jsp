<div id="patientSearchDiv" class="contentWndwPad entryAndDisplay fullborder" > 
	<div class="rela" style="width: 578px; padding-left: 11px; padding-right: 11px; " ><hr /></div>
	<form id="patientSearch" action="" method="post" class="rela" style="height: 460px; min-width: 500px; max-width: 600px; width: 600px" > 
		<fieldset class="horizontal" style="position: absolute; top: 5px; left: 11px; height: 123px; width: 205px; " > 
			<label  
			for="quickSearch" >Quick Search: &#160;</label
			><input id="quickSearch" type="text" value="" size="14" />  
			<label 
			 for="lastName">Last Name: &#160;</label
			><input id="lastName" type="text" value="" size="14" /><br class="clearLeft" 
			/><label 
			 for="firstName">First Name: &#160;</label
			><input id="firstName" type="text" value="" size="14" /><br class="clearLeft"
			/><label  
			 for="sex">Sex: &#160;</label
			><select id="sex" 
				><option value=""></option
				><option value="m">M</option
				><option value="f">F</option
				><option value="b">B</option
				><option value="u">U</option
			></select><br class="clearLeft"
			/><label  
			for="birthYear" 
			>DOB: </label
			><input style="margin: 5px 2px 0 2px; width: 32px; " class="multi" id="birthYear"
			onfocus="Birthday.focusField(event, 'birthYear');" 
			onblur="Birthday.doBlurBirthYear(event, 'birthYear');"
			type="text" value="YYYY" size="4" maxlength="4"
			/>/<input style="margin: 5px 2px 0 2px; width: 24px; " class="multi" id="birthMonth" 
			onfocus="Birthday.focusField(event, 'birthMonth');" 
			onblur="Birthday.doBlurBirthMonth(event, 'birthMonth');" 
			type="text" value="MM" size="2" maxlength="2" 
			/>/<input style="margin: 5px 2px 0 2px; width: 24px; " class="multi" id="birthDay" 
			onfocus="Birthday.focusField(event, 'birthDay');" 
			onblur="Birthday.doBlurBirthDay(event, 'birthDay');" 
			type="text" value="DD" size="2" maxlength="2" />
		</fieldset>
		<fieldset class="horizontal" style="position: absolute; top: 5px; left: 221px;  height: 123px; width: 225px; " >
				<input id="localFacility" type="checkbox" value="false" 
				/><label class="rightSide" for="localFacility"
				>&#160;Find only patients enrolled in this facility</label><br class="clearLeft"
			/>
				<label   
				for="ssnFirst">SSN: &#160;</label>
					<input class="multi" id="ssnFirst" type="text" value=""  style="width: 28px; "
						size="3"  maxlength="3"	
						onblur="SocialSecNbr.blurFstPt(event, 'ssnFirst');" 
					/>&#160;-&#160;<input class="multi" id="ssnMiddle" style="width: 24px; "
						type="text" value="" size="2" maxlength="2" 
						onblur="SocialSecNbr.blurMdlPt(event, 'ssnMiddle');" 
					/>&#160;-&#160;<input class="multi" id="ssnLast" style="width: 32px; "
						type="text" value="" size="4"  maxlength="4"
						onblur="SocialSecNbr.blurLstPt(event, 'ssnLast');" 
					/><br class="clearLeft" 
			/>
					<label 
					for="sonsorSsnFirst">Sponsor SSN: &#160;</label>
					<input class="multi" id="sponsorSsnFirst" type="text" style="width: 28px; "
						value="" size="3"  maxlength="3" 
						onblur="SocialSecNbr.blurFstPt(event, 'sponsorSsnFirst');" 
					/>&#160;-&#160;<input class="multi" id="sponsorSsnMiddle" style="width: 24px; " 
						type="text" value="" size="2" maxlength="2" 
						onblur="SocialSecNbr.blurMdlPt(event, 'sponsorSsnMiddle');" 
					/>&#160;-&#160;<input class="multi" id="sponsorSsnLast" style="width: 32px; "
						type="text" value="" size="4"  maxlength="4"
						onblur="SocialSecNbr.blurLstPt(event, 'sponsorSsnLast');" 
					/>
		</fieldset> 
		<fieldset class="horizontal" style="position: absolute; top: 5px; left: 460px; height: 123px; width: 120px; " > 
			<p style="margin: 0; "> &#160; </p> 
				<label
				style="height: 15px; width: 40px; display: block; float: left; text-align: right; padding: 3px 0 0 0; margin: 5px 0 0;" 
				for="fmp">FMP: &#160;</label
				><input style="display: inline; width:auto; margin: 5px 0 0 0" id="fmp" type="text" value="" size="2" 
				/><br 
				/><label 
				style="height: 15px; width: 40px; display: block; float: left; text-align: right; padding: 3px 0 0 0; margin: 5px 0 0;"
				for="uic">UIC: &#160;</label
				><input id="uic" type="text" value="" size="6" />
		</fieldset> 
		<br /> 
		<fieldset style="position: absolute; top: 130px; left: 5px; width: 96%; margin: 0; height: 25px;" > 
			<fieldset class="horizontal" 
				style="position: absolute; top: 5px; left: 200px;  height: 25px; width: 100px; "> 
				<input class="padded" type="button" value="Find" id="findBtn"
					onclick="SearchCtl.searchFind(event, 'patientSearch', 'searchResContnr' );"
				/> <input class="padded" type="reset" value="Clear" 
					onclick="SearchCtl.clearIt(event, 'searchResContnr' );"/>
			</fieldset> 
			<fieldset class="horizontal" 
				style="position: absolute; top: 5px; left: 335px; height: 25px; width: 250px; ">
				<input id="allPatients" type="button" value="All Patients" 
					onclick="SearchCtl.allPatients(event, 'searchResContnr');"
				/> <input id="patientDetails" type="button" value="Patient Details" 
					onclick="SearchCtl.patientDetails(event, 'searchResContnr');"
				/> <input id="chcs" type="button" value="Search CHCS" disabled="disabled" />
			</fieldset>
   		</fieldset>
		<hr style="position: absolute; top: 170px; width: 576px; left: 11px; " />
		<h2 style="position: absolute; top: 175px; width: 98%; left: 11px; " 
			><span id="nbrResults"></span> &#160; Search Results:</h2> 
		<div id="searchResContnr" style="position: absolute; top: 230px; left: 11px; width: 578px; overflow: auto; height: 175px; background-color: white;">
			<table summary="Listing of results from Patient Lookup" id="foo">
				<thead ><tr>
				<th class="twoCent" id="patientName">Patient Name</th><th class="twoCent" id="ssn">SSN</th>
				<th class="twoCent" id="FMP-SponsorSSN">FMP/Sponsor SSN</th><th class="twoCent" id="dob">DOB</th>
				<th class="twoCent" id="sex">Sex</th><th class="twoCent" id="homePhone">Home Phone</th>
				<th class="twoCent" id="workPhone">Work Phone</th><th class="twoCent" id="address">Address</th
				></tr></thead>
			</table>
		</div>
		<fieldset style="position: absolute; top: 415px; width: 100px; left: 240px; " 
			><input id="btnOk" type="button" class="textButton " value="OK"
					onmouseover="return actionBttns.mouseover(event, 'btnOk');" 
					onmouseout="return actionBttns.mouseout(event, 'btnOk');" 
					onmousedown="return actionBttns.mousedown(event, 'btnOk');" 
					onmouseup="actionBttns.mouseup(event, 'btnCncl'); SearchCtl.lastSelected(event); " 
			/><input id="btnCncl" type="button" class="textButton " value="Cancel"
					onmouseover="return actionBttns.mouseover(event, 'btnCncl');" 
					onmouseout="return actionBttns.mouseout(event, 'btnCncl');" 
					onmousedown="return actionBttns.mousedown(event, 'btnCncl');" 
					onmouseup="actionBttns.mouseup(event, 'btnCncl'); SearchCtl.cancelLast(event); popup.close(event); return (false) ; " 
		/></fieldset>
	</form>
</div>