function isEmpty(aString) {
//	alert(aString);
//	if (aString) {
//		alert(aString + '|' + aString.length);
//	}
	return (null == aString || 0 === aString.length)? true: false;
	
}

function writeObj(obj, message) {
	  if (!message) { message = obj; }
	  var details = "*****************" + "\n" + message + "\n";
	  var fieldContents;
	  for (var field in obj) {
	    fieldContents = obj[field];
	    if (typeof(fieldContents) == "function") {
	      fieldContents = "(function)";
	    }
	    details += "  " + field + ": " + fieldContents + "\n";
	  }
	  alert(details);
}

var ARR_ACTIVEX = ['MSXML4.DOMDocument', 'MSXML3.DOMDocument', 'MSXML2.DOMDocument', 'MSXML.DOMDocument', 'Microsoft.XmlDom']

function findActiveXforIe() {
	//if this is IE, determine which string to use
	if (Browser.isIE) {
		for (var i = 0; i < ARR_ACTIVEX.length ; i++) {
			try {
//				alert(ARR_ACTIVEX[i]);
				var objXML = new ActiveXObject(ARR_ACTIVEX[i]);
				return (ARR_ACTIVEX[i]);
			} catch (objException) {
			} //End: try
		} //End: for
		throw ("MSXML not found on your computer.");
	}
}

function parseXml(rawXml) {
	//if this is IE, determine which string to use
	
	var parsed;
	if (window.ActiveXObject) {
		var activeXSupport = findActiveXforIe();
		parsed = new ActiveXObject(activeXSupport);
		parsed.async = false;	
	} else if (document.implementation 
			&& document.implementation.createDocument) {
		parsed = document.implementation.createDocument('', '', null) ;
	}
	parsed.loadXML(rawXml);
	return (parsed);
}


	/**
	 * receives a table, generally from the server, and counts the number of 
	 * rows in the contained tbody.  this markup is html.
	 * @param p_fromServer the html table whose tbody's tr's will be counted
	 * @return the number of tr's
	 * @type number
	 * @calls parsed.loadXML
	 * @calledby newResultsUpdater.setResultsCntnr, SearchCtl.patientDetails
	 */
function countTbodyRows(p_fromServer) {
	try {
//		var parsed;
//		if (window.ActiveXObject) {
//			parsed = new ActiveXObject('Microsoft.XMLDOM');
//			parsed.async = false;	
//		} else if (document.implementation 
//				&& document.implementation.createDocument) {
//			parsed = document.implementation.createDocument('', '', null);
//		}
//		parsed.loadXML(p_fromServer);
		var parsed = parseXml(p_fromServer);
		var tbody = parsed.getElementsByTagName('tbody');
		var respRows ;
		if (tbody && tbody[0]) {
			respRows = tbody[0].getElementsByTagName('tr');
		} else {
			respRows = new Array();
		}
//		alert('ffff ' + respRows.length)
		return (respRows.length);
	} catch (ex) {
		alert ('countTbodyRows error:: ' + ex.message);
		throw(ex);
	}
}

/**
 * wrapper for the ajax calls which takes the url to target complete with
 * query string and calls GET.  the second parameter is a function which 
 * is treated as a hook and called with the result sent by the server
 * @calls p_containerSetter
 * @calledby _new _saved and _details
 * @private
 * 
 */
function doGet(p_targetUrl, p_successHook) {
	try { 
		new Ajax.Request(
			p_targetUrl
			, { method: 'get' 
				, onSuccess: function(xResp) { 
//					alert('w ' + xResp.responseText);
					p_successHook(xResp.responseText);
				}, onFailure: function(xResp) { //TODO p_failHook
					p_successHook('data unavailable');
				}, onexception: function(theReq, ex) {
					//				alert(ex.message);	
				}
			}
		);
		return (false);
	} catch (ex) {
//		alert('newResults getLab ::' + ex.message);
	}
}				


/**
 * wrapper for the ajax calls which takes the url to target complete with
 * query string and calls GET.  the second parameter is a function which 
 * is treated as a hook and called with the result sent by the server
 * @calls p_containerSetter
 * @calledby _new _saved and _details
 * @private
 * 
 */
function doPost(p_targetUrl, p_successHook, p_params) {
	try { 
		new Ajax.Request(
			p_targetUrl
			, { method: 'post'
				, parameters: p_params
				, onSuccess: function(xResp) { 
					p_successHook(xResp.responseText);
				}, onFailure: function(xResp) { //TODO p_failHook
					p_successHook('data unavailable');
				}, onexception: function(theReq, ex) {
					//				alert(ex.message);	
				}
			}
		);
		return (false);
	} catch (ex) {
//		alert('newResults getLab ::' + ex.message);
	}
}				

