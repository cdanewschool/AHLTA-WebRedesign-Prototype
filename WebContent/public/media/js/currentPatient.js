
/**
 * controls for the currently selected patient bar.  the bar is display only, with no user 
 * level inputs.  instead the bar updates as a result of listening to changes to its own
 * root level dom node which other areas of the application can update
 * 
 */
currentPatient = {
		
	/**
	 * modifies the state of the current patient dom level element, located in the 
	 * root node of the selected patient wireframe bar, patient id attribute.  this will 
	 * trigger an observable event, the exact type of which is browser implementation 
	 * dependent either w3c or Microsoft.  
	 * @param p_id the new current patient id
	 * @return void
	 * @private
	 * @calls none
	 * @calledby dblClick, lastSelected
	 * 
	 */
	updateCurPatient : function (p_id){
		try {
			document.getElementById('current_patient').setAttribute( 'patient_id' , p_id );
		} catch (ex) {
			alert('could not set id for current patient:: ' + ex.message);	
			throw(ex);
		}
	} , 

		
		
	/**
	 * listener to changes in the dom node for currently selected patient.  has special
	 * processing for IE or W3C based event objects
	 * @param e the event signalling a DOMAtributeModified, javascript only, event
	 * @returns true to allow event bubbling
	 * @calls none
	 * @called by static load-time event binding curPatDispatcher
	 */
	patientSelected: function(e){
		var w = e.srcElement;
		try {
			var currentPatientId = null;
			if ( ('undefined' == (typeof e.srcElement)) 
					&&  ('patient_id' == e.attrName) ) {
				currentPatientId = e.newValue;
			} else {
				currentPatientId = e.srcElement.getAttribute('patient_id');
			}
			if (null != currentPatientId ) {
				this.getFromServer(currentPatientId);
			}
			return (true);
		} catch(ex) {
			alert("patientSelected err::" + ex/message);
			throw(e);
		}
	}
	
	/**
	 * @param e the event for onclick as passed from the browser
	 * @param p_resContainer element to which the results
	 * will be injected via innerhtml
	 * @return false stop the bubble
	 * @calls parsed.loadXML
	 * @calledby inline event handler in the markup for patient details
	 */
	, getFromServer: function (p_currentPatientId) {
		try {
			new Ajax.Request('spring/currentPatient', {
				method: 'get' , parameters:	'kind=brief&currentPatientId=' 
					+ escape(p_currentPatientId) 
				, onSuccess: function(xResp) {
					$('curPat').innerHTML = xResp.responseText;
				}, onFailure: function(xResp) {
					$('curPat').innerHTML = 'data unavailable';//xResp.responseText;
				}, onexception: function(theReq, ex) {
					//alert(ex.message);	
				}
			});
			return (false);
		} catch (ex) {
//			alert('patientDetails err:: ' + ex.message);
			throw(ex);
		}
	} 
	

};


/**
 * due to the odd requirement (i think it is w3c??) that we can only have one 
 * listener for a given event, we use a dispatcher to handle all the various stuff 
 * that has to be done when the current patient changes
 * @param e the DomAttributeModified event or the property change event (IE)
 * @return void
 * @calls 	sideNav.patientSelected, _currentPatient.patientSelected
 * @calledby initListeners	

 */
function curPatDispatcher(e) {
	sideNav.patientSelected(e);	
	currentPatient.patientSelected(e);	
}


