<div class="contentB">
<form action="#" method="get" id="fooForm">
<div class="topPart" > 
		<label >Date</label>
		<input class="formInputText" type="text" name="date" id="date" value="" size="24" maxlength="24" tabindex="1" />
		<input type="radio" name="visualAcuity" id="visualAcuity"  value="true" class="radi" checked="checked" tabindex="2" />
		<label class="fieldLabel" for="visualAcuity">Visual Acuity</label> 
		<input type="radio" name="oxygenSat" id="oxygenSat"  value="true" class="radi" tabindex="3" />
		<label class="fieldLabel" for="oxygenSat">Oxygen Sat.</label> 
		<input type="radio" name="peakFlow" id="peakFlow" value="true" class="radi" tabindex="4" />
		<label class="fieldLabel" for="peakFlow" >Peak Flow</label> 
</div>

<div class="col1">
	<div class="standardVitalSigns">Standard Vital Signs<br /><div class="miniBr"></div>
		<label for="bp">BP:</label>
		<input class="formInputText" type="text" name="bp1" id="bp1" value="" size="4" maxlength="4" tabindex="5" />
		<label class="fieldLabel" >/</label> 
		<input class="formInputText" type="text" name="bp2" id="bp2" value="" size="4" maxlength="4" tabindex="6" />
		<br />
		<div class="miniBr" ></div>
		<label for="hr">HR:</label>
		<input class="formInputText" type="text" name="hr" id="hr" value="" size="4" maxlength="4" tabindex="7" />bpm<br />
		<div class="miniBr" ></div>
		<label for="rr">RR:</label>
		<input class="formInputText" type="text" name="rr" id="rr" value="" size="4" maxlength="4" tabindex="8" />/minute<br />
		<br />
		Temperature:<br /><div class="miniBr"></div>
		<label for="temperature">BP:</label>
		<input class="formInputText" type="text" name="temperature" id="temperature" value="" size="4" maxlength="4" tabindex="9" />
	</div>

	<div class="heightWeight">Height/Weight<br /><div class="miniBr"></div>
		<label for="height">Ht:</label>
		<input class="formInputText" type="text" name="height" id="height" value="" size="4" maxlength="4" tabindex="10" /><br />
		<div class="miniBr" ></div>
		<label for="weight">Wt</label>
		<input class="formInputText" type="text" name="weight" id="weight" value="" size="4" maxlength="4" tabindex="11" /><br />
	</div>
</div>
<div class="col2">
	<div class="habits">Habits<br /><div class="miniBr"></div>
		<div class="miniBr"></div>
		<div>
			<label class="fieldLabel" for="tobacco">Tobacco:</label>
			<input type="radio" name="tobacco" id="tobacco" value="yes" class="radi" tabindex="12" />
			<input type="radio" name="tobacco" id="tobacco" value="no" class="radi" tabindex="13" />
		</div>
		<div class="miniBr"></div>
		<div>
			<label class="fieldLabel" for="alcohol">Alcohol:</label>
			<input type="radio" name="alcohol" id="alcohol" value="yes" tabindex="14" />
			<input type="radio" name="alcohol" id="alcohol" value="no" tabindex="15" />
		</div>
	</div>
	<div class="painSeverity">Pain Severity<br /><div class="miniBr"></div>
		<div class="painScale">
			<input type="radio" name="painSeverity" class="radi" id="painSeverity10" value="10" tabindex="16" />
			<label class="fieldLabel" for="painSeverity10">10 - Totally Disabling</label><br />
			<div class="miniBr"></div>
			<input type="radio" name="painSeverity" class="radi" id="painSeverity9" value="9" tabindex="17" />
			<label class="fieldLabel" for="painSeverity9">9</label><br />
			<input type="radio" name="painSeverity" class="radi" id="painSeverity8" value="8" tabindex="18" />
			<label class="fieldLabel" for="painSeverity8">8 - Severe</label><br />
			<input type="radio" name="painSeverity" class="radi" id="painSeverity7" value="7" tabindex="19" />
			<label class="fieldLabel" for="painSeverity7">7</label><br />
			<div class="miniBr"></div>
			<div class="miniBr"></div>
			<input type="radio" name="painSeverity" class="radi" id="painSeverity6" value="6" tabindex="20" />
			<label class="fieldLabel" for="painSeverity6">6</label><br />
			<input type="radio" name="painSeverity" class="radi" id="painSeverity5" value="5" tabindex="21" />
			<label class="fieldLabel" for="painSeverity5">5 - Moderate</label><br />
			<input type="radio" name="painSeverity" class="radi" id="painSeverity4" value="4" tabindex="22" />
			<label class="fieldLabel" for="painSeverity4">4</label><br />
			<div class="miniBr"></div>
			<div class="miniBr"></div>
			<input type="radio" name="painSeverity" class="radi" id="painSeverity3" value="3" tabindex="23" />
			<label class="fieldLabel" for="painSeverity3">3</label><br />
			<input type="radio" name="painSeverity" class="radi" id="painSeverity2" value="2" tabindex="24" />
			<label class="fieldLabel" for="painSeverity2">2 - Mild</label><br />
			<input type="radio" name="painSeverity" class="radi" id="painSeverity1" value="1" tabindex="25" />
			<label class="fieldLabel" for="painSeverity1">1</label><br />
			<div class="miniBr"></div>
			<div class="miniBr"></div>
			<input type="radio" name="painSeverity" class="radi" id="painSeverity0" value="0" tabindex="26" />
			<label class="fieldLabel" for="painSeverity0">0 - Pain Free</label>
		</div>
		<div class="location">Location:<br />
			<textarea name="painLocation" cols="15" rows="5"> </textarea>
		</div>
	</div>
</div>
<div class="col3">
	<table>
		<caption>Previous Encounters</caption>
		<thead>
			<tr><th colspan="2">Date</th></tr>
		</thead>
		<tbody>
			<tr><td class="variable">Variable</td><td class="value">Value</td></tr>
			<tr><td class="variable">Variable</td><td class="value">Value</td></tr>
			<tr><td class="variable">Variable</td><td class="value">Value</td></tr>
			<tr><td class="variable">Variable</td><td class="value">Value</td></tr>
			<tr><td class="variable">Variable</td><td class="value">Value</td></tr>
			<tr><td class="variable">Variable</td><td class="value">Value</td></tr>
			<tr><td class="variable">Variable</td><td class="value">Value</td></tr>
			<tr><td class="variable">Variable</td><td class="value">Value</td></tr>
			<tr><td class="variable">Variable</td><td class="value">Value</td></tr>
			<tr><td class="variable">Variable</td><td class="value">Value</td></tr>
		</tbody>

	</table>
</div>
<div class="bottomPart">
	<br />
	<br />
	<center>
		<div>&nbsp;<br />&nbsp;<br />Comments<br /><textarea name="comments" cols="70" rows="5"> </textarea><br />
		</div>
	</center>
	<center>
		<input type="button" class="formInputButton" value="OK" onclick="formSubmit()" /> 
		<input type="button" class="formInputButton" value="Cancel" onclick="formCancel()" />
	</center>
</div>

</form>
</div>
