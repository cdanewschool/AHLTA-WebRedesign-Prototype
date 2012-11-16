<div id="patientSearchDiv" class="contentWndwPad entryAndDisplay fullborder" > 
	<form class="searchForm" id="patientSearch" action="self" method="post" > 
		<fieldset class="outer" id="first" > 
			<fieldset> 
				<label for="quickSearch">Quick Search: &#160;</label><input id="quickSearch" type="text" value="" size="14" />  
			</fieldset> 
			<fieldset> 
				<label for="lastName">Last Name: &#160;</label><input id="lastName" type="text" value="" size="14" />
   				<br /><label for="firstName">First Name: &#160;</label><input id="firstName" type="text" value="" size="14" /> 
				<br /><label for="sex">Sex: &#160;</label><select id="sex">	<option value=""></option><option value="m">M</option><option value="f">F</option><option value="b">B</option><option value="u">U</option></select>
				<br /><label for="birthYear" >DOB: </label><input class="multi" id="birthYear" onfocus="Birthday.focusField(event, 'birthYear');" onblur="Birthday.doBlurBirthYear(event, 'birthYear');" 
							type="text" value="YYYY" size="4" maxlength="4"/>&#160;&#160;<input class="multi" id="birthMonth" onfocus="Birthday.focusField(event, 'birthMonth');" onblur="Birthday.doBlurBirthMonth(event, 'birthMonth');" type="text" value="MM" size="2" maxlength="2" />&#160;&#160;<input class="multi" id="birthDay" onfocus="Birthday.focusField(event, 'birthDay');" onblur="Birthday.doBlurBirthDay(event, 'birthDay');" type="text" value="DD" size="2" maxlength="2" />
			</fieldset>
		</fieldset>
		<fieldset class="outer">
			<fieldset class="leftCheck" >
				<input id="localFacility" type="checkbox" value="false" /><label class="rightSide" for="localFacility">&#160;Find only patients enrolled in this facility</label>
			</fieldset>
			<fieldset>
				<p><label for="ssnFirst">SSN: &#160;</label>
					<input class="multi" id="ssnFirst" type="text" value="" size="3"  maxlength="3"	onblur="SocialSecNbr.blurFstPt(event, 'ssnFirst');" 
					/>&#160;-&#160;<input class="multi" id="ssnMiddle" type="text" value="" size="2" maxlength="2" 
						onblur="SocialSecNbr.blurMdlPt(event, 'ssnMiddle');" 
					/>&#160;-&#160;<input class="multi" id="ssnLast" type="text" value="" size="4"  maxlength="4"
						onblur="SocialSecNbr.blurLstPt(event, 'ssnLast');" 
					/>
				</p>
				<p> 
					<label for="sonsorSsnFirst">Sponsor SSN: &#160;</label>
					<input class="multi" id="sponsorSsnFirst" type="text" value="" size="3"  maxlength="3" 
						onblur="SocialSecNbr.blurFstPt(event, 'sponsorSsnFirst');" 
					/>&#160;-&#160;<input class="multi" id="sponsorSsnMiddle" type="text" value="" size="2" maxlength="2" 
						onblur="SocialSecNbr.blurMdlPt(event, 'sponsorSsnMiddle');" 
					/>&#160;-&#160;<input class="multi" id="sponsorSsnLast" type="text" value="" size="4"  maxlength="4"
						onblur="SocialSecNbr.blurLstPt(event, 'sponsorSsnLast');" 
					/>
				</p>
			</fieldset> 
		</fieldset> 
		<fieldset class="outer" id="last"> 
			<fieldset><p> &#160; </p></fieldset> 
   			<fieldset> 
				<label for="fmp">FMP: &#160;</label><input id="fmp" type="text" value="" size="2" />
				<br />
				<label for="uic">UIC: &#160;</label><input id="uic" type="text" value="" size="6" />
			</fieldset> 
		</fieldset> 
		<br /> 
		<fieldset class="bottom"> 
			<fieldset class="straight"> &#160; </fieldset> 
			<fieldset class="straight"> 
				<input class="padded" type="button" value="Find" 
					onclick="SearchCtl.searchFind(event, 'patientSearch', 'searchResContnr' );"
				/> <input class="padded" type="reset" value="Clear" 
					onclick="SearchCtl.clearIt(event, 'searchResContnr' );"/>
			</fieldset> 
			<fieldset class="straight">
				<input id="allPatients" type="button" value="All Patients" 
					onclick="SearchCtl.allPatients(event, 'searchResContnr');"
				/> <input id="patientDetails" type="button" value="Patient Details" 
					onclick="SearchCtl.patientDetails(event, 'searchResContnr');"
				/> <input id="chcs" type="button" value="Search CHCS" disabled="disabled" />
			</fieldset> 
   		</fieldset>
	</form>
	<hr /> 
	<form class="resultsForm" id="searchResults"> 
		<h2><span id="nbrResults"> </span> &#160; Search Results:</h2> 
		<div id="searchResContnr" class="searchResultsTbl" > 
			<table summary="Listing of results from Patient Lookup" id="foo">  
				<thead ><tr><th class="twoCent" id="patientName">Patient Name</th><th class="twoCent" id="ssn">SSN</th>
				<th class="twoCent" id="FMP-SponsorSSN">FMP/Sponsor SSN</th><th class="twoCent" id="dob">DOB</th>
				<th class="twoCent" id="sex">Sex</th><th class="twoCent" id="homePhone">Home Phone</th>
				<th class="twoCent" id="workPhone">Work Phone</th><th class="twoCent" id="address">Address</th></tr></thead>
			</table>
		</div>
		<fieldset class="searchResultsCtls"> 
			<input id="patientSearchOk" type="button" value="OK" onclick="SearchCtl.lastSelected(event);"
			/> <input id="patientSearchCancel" type="button" value="Cancel" onclick="SearchCtl.cancelLast(event);" />
		</fieldset>
	</form>
</div>