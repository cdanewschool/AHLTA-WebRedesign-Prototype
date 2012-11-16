/**
 * initialize the application statically at load time by loading these files
 */
//window.onload = function() {
try {
	Load ("WebContent/public/media/js/form.js");
	Load ("WebContent/public/media/js/table.js");
	Load ("WebContent/public/media/js/ajaxbasics.js");
	Load ("WebContent/public/media/js/sideNav.js");
	Load ("WebContent/public/media/js/mainContent.js");
	Load ("WebContent/public/media/js/currentPatient.js");
	Load ("WebContent/public/media/js/search.js");
	Load ("WebContent/public/media/js/appointments.js");
	Load ("WebContent/public/media/js/newResults.js");
	Load ("WebContent/public/media/js/util.js");
	Load ("WebContent/public/media/js/popup.js");
} catch (ex) {
	alert('load error ::' + ex.message);
}

/**
 * provide non-IE window object with an implementation of the loadXML function.
 * This way an xml String can be parsed into an xml document by the browser
 * this code is taken from Anthony T. Holdener's AJAX: The Definitive
 * Guide (2008: O'Reilly; p79)
 * @param xmlString text of an xml 
 * @return an xml document see w3c xml document
 * @calls none
 * @calledby SearchCtl.patientDetails, SearchCtl.allPatients
 * , SearchCtl.searchFind
 */
if(! window.ActiveXObject) {
	Document.prototype.loadXML = function(xmlString) {
		var doc = (new DOMParser).parseFromString(xmlString, 'text/xml');
		while (this && this.hasChildNode && this.hasChildNode()){
			this.removeChild(this.lastChild);
		}
		for(i = 0, len = doc.childNodes.length; i < len; i++){
			this.appendChild(this.importNode(doc.childNodes[i], true));
		}
	};
	Node.prototype.__defineGetter__("xml", _Node_getXML );
}


function _Node_getXML() {
	try {
		//create a new XMLSerializer
		var objXMLSerializer = new XMLSerializer;
		//get the XML string
		var strXML = objXMLSerializer.serializeToString(this);
	    //return the XML string
		return strXML;
	} catch (ex) {
		 alert('error setting document xml attribute ::' + ex.message);
	}
} 
/******************************************************************************
* Bind a listeners to the scheduler container via a dispatcher singleton -- is
* the single listener a w3c thing or IE??  Browser impl dependent -- not 
* tested on safari or opera

* @param {String} container Id of the DOMElement loaded by the sideNav to which
* we listen for Attribute Change
* @param (function} dispatcher wrapper singleton dereference to set of listeners
* @calledby appointments.prototype.initContent
* @calls none
*/
function initApptListeners (container, dispatcher) {
	var apptCntr = document.getElementById(container);
	if (apptCntr) {
		try { //attach event listener
			if(apptCntr.addEventListener) { //moz
				apptCntr.addEventListener('DOMAttrModified', dispatcher, false);
			} else if (apptCntr.attachEvent) { //ie
				apptCntr.attachEvent('onpropertychange', dispatcher);
			} else { // err
				alert('cannot attach listener for ' + container );
			}
		}catch (ex) {
			alert('appointments event listener exception ' + ex.message);
		}
	} 
	else {
		alert('appt cont is null');	
	}
}

/**
 *
 * modified from _Ajax: the Definative Guide_ by Anthony T. Holdener III
 * (2008: O'Reilly Media; p341)
 */
function isPopupClicked(elt) {
	for (var child = elt; null != child && 'BODY' != child.tagName ;
		child = child.parentNode) {
//		alert('tn ' + child.tagName + '|' + child.id );
		if ('popupContainer' == child.id) {
			return (true);
		}
	}
	return (false);
}

function focusOnPopup(e) {
//	alert('focusOnPopup');
	try {
		// cross-browser sniff
		var el = ((e.target)? e.target: e.srcElement);
		var popupContainer = $('popupContainer');
//		alert(el.id + 'if ( ' + popupContainer + ' && ' + ('none' != popupContainer.getStyle('display') ) + '::' +  popupContainer.getStyle('display') );
		if (popupContainer && 'none' != popupContainer.getStyle('display') ) {
			if ('popupContainer' != el.id) {
				var childNode = false;
				for (var child = el; child.tagName != 'BODY'; child = child.parentNode) {
					if (child.id == 'popupContainer') {
						childNode = true;
						break;
					}
				}
				if (! childNode) {
//					alert('not cn');
					Event.stop(e);
					if (e.stopPropagation) {
						e.stopPropagation();
					} else {
						e.cancelBubble = true;
					}
					if (e.preventDefault) {
						e.preventDefault();
					} else {
						e.returnValue = false;
					}
					if (null != $('btnOk')) {
						$('btnOk').focus();
					}
				} else {
//					alert('is cn');
					el.focus();
				}
			}
		} else {
//			alert('not vis ' + ('none' != el.getStyle('display')) + '++' + el.getStyle('display')    );
			if ('none' != el.getStyle('display')) {
				try { // ie will barf on the popup close control
					el.focus();
				} catch (ex) {}
			}
		}
			
	} catch (ex) {
		//alert('focusOnPopup err:: ' + ex.message);
		throw (ex);
	}
	return 
}


document.observe("dom:loaded", function() {
	try {
			  // initially hide all containers for tab content
		doTheNewInit();
	} catch(ex) {
		alert('onload err::' + ex.message);	
	}
});

function doTheNewInit() {
	try {
//		Event.observe(document, 'click', focusOnPopup);
		document.observe('click', focusOnPopup);
//		FormCtl.floob();
		try {
			sideNav.loadContent (null, 'tasks'
				, 'WebContent/public/templates/appointments/appointments.html'
				, piimAppointments )
		} catch(ex) {
			alert("side nav loading err::" + ex.message);
			throw(ex);
		}
//		Event.observe($('sideNav_NewResults') , 'click', sideNav.foo );
	} catch (ex) {
		alert('doTheNewInit::' + ex.message);
	}
}



