

/**
 * internal module for traversing forms and gathering values
 * 
 */
var FormCtl = {
		
		
	/**
	 * build the query string to be sent to the server by inspecting the 
	 * inputs and the selects 
	 * @param p_formObj the dom level form  element
	 * @return a string composed of query string parameters
	 * @private
	 * @calls this.buildQueryString, this.submitInputs,
	 * this.submitSelects
	 * @calledby searchFind
	 */
	buildQueryStr: function (p_formObj) {
		try {
			var withInputs = this._buildQueryString('',
					this._submitInputs(p_formObj.getElementsByTagName('input')) );	
			var withSelects = this._buildQueryString(withInputs, 
					this._submitSelects(p_formObj.getElementsByTagName('select')) );
// nono must be post			var withTextareas = this._buildQueryString(withSelects, 
			return (withSelects);
		} catch (ex) {
			alert('searchQuery error:: ' + ex.message);	
			throw(ex);
		}
	}
	
	
	/**
	 * iterates over the params parameter joining them with
	 * &'s after the first one
	 * @param p_queryString the accumulator into which 
	 * results are stored
	 * @param p_params the query string parameters
	 * as detected from the form
	 * @return the query string as composed after this 
	 * iteration.  this fucting is called multiple times
	 * for each type of element included in the form
	 * @calls none
	 * @calledby searchQuery
	 */
	, _buildQueryString: function(p_queryString, p_params) {
		try {
			if (p_params && 1 < p_params.length) {
				if (1 < p_queryString.length) {
					p_queryString += '&'
				}
				p_queryString += p_params;
			}
			return (p_queryString);
		} catch (ex) {
			alert('buildQueryString err:: ' + ex.message) ;
			throw(ex);
		}
	}
		
	/**
	 * this is the way to build a Hash containing
	 * the parameters for a POST command
	 * 
	 * @return a Hash of parameters for the POST
	 */
	, buildPostParams: function (p_formObj) {
		try {
			var params = new Hash();
			this._inputs(p_formObj, params );
			this._selects(p_formObj, params );
			this._textareas(p_formObj, params );
			return (params);
		} catch (ex) {
			alert('building post params err:: ' + ex.message);	
			throw(ex);
		}
	}
	
	/**
	 * traverse the form for text areas set
	 */
	, _textareas: function (p_formObj, postParams){
		var textareas = p_formObj.getElementsByTagName('textarea');
		for (var i = 0; i < textareas.length; i++) {
			if (textareas[i].value && 0 < textareas[i].value.length) {
				postParams.set(
						this.getNamePart(textareas[i]) , textareas[i].value);
			} 
		}
	}
	
	/**
	 * this is how we check the input fields note that the logic
	 * check is special since there are different kinds of
	 * input tags.  it is for POST and stores in a Hash
	 */
	, _inputs: function (p_formObj, postParams) {
		var inputs = p_formObj.getElementsByTagName('input');
		for (var i = 0, len = inputs.length; i < len; i++) {
			if (this.hasValue(inputs[i])) {
				postParams.set(this.getNamePart(inputs[i]) 
						, this.getValuePart(inputs[i]));
			}
		}
		
	}
	
	/**
	 * this is how we check the selects for POST 
	 */
	, _selects: function (p_formObj, postParams) {
		var selects = p_formObj.getElementsByTagName('select');
		for (var i = 0; i < selects.length; i++) {
			var selOpts = this._selOpts(selects[i]); 
			if (selOpts && 0 < selOpts.length) {
				postParams.set( selects[i].id, selOpts);
			}
		}
	} 
	
	/**
	 * iterate over the options and see if they and selected and 
	 * have a value
	 */
	, _selOpts: function (p_thisSelect) {
		var result = '';
		var options = p_thisSelect.getElementsByTagName('option');
		for (var i = 0; i < options.length; i++) {
			if (options[i].selected  && (0 < options[i].value.length)) {
				if (1 < result.length) {
					result += ',';
				} 
				result += options[i].value;
			}
		}
		return (result);
	}
			
	/**
	 * as part of the chain of calls collecting form data, this
	 * function check against various types of input elements 
	 * and composes an http query string.  checkboxes are handled 
	 * specially.
	 * @param p_inputs an array of input form elements as 
	 * retrieved via document.getElementsByTagName
	 * @return a string representing this section of the query 
	 * string parameters
	 * @calls none
	 * @calledby searchQuery
	 */
	, _submitInputs: function (p_inputs) {
		try {
			var queryString = '';
			for (var i = 0, len = p_inputs.length; i < len; i++) {
				if (this.hasValue(p_inputs[i])) {
					queryString = this.concatQueryString(queryString
							, this.getNamePart(p_inputs[i])
							, this.getValuePart(p_inputs[i]));
				}
			}
			return(queryString);
		} catch (ex) {
			alert('submitInputs err:: ' + ex.message);
			throw(ex);
		}
	}
	

//	, floob: function(){
//		var rp = '';
//		
////		var k = new Object();
//////		k.value = '';
////		k.checked = undefined;
//////		var res = this.hasValue(k);
//////		rp += 'hasBoth |' + res + '<br />';//t
//////		(! isEmpty(formInput.value))
////		var w =  ( k.checked);//isEmpty(k.value);
////		rp += " w ok: " + w;
//		
//		var k = new Object();
//		k.value = 'val';
//		k.checked = 'true';
//		var res = this.hasValue(k);
//		rp += 'hasBoth |' + res + '<br />';//t
//
//		k = new Object();
//		k.value = 'foo';
//		k.checked = 'false';
//		res = this.hasValue(k);
//		rp += 'has val  |' + res + '<br />';//t
//
//		k = new Object();
//		k.value = '';
//		k.checked = 'true';
//		res = this.hasValue(k);
//		rp += 'has check 0 |' + res + '<br />';//t
//
//		k = new Object();
//		k.checked = 'true';
//		res = this.hasValue(k);
//		rp += 'floob zip |' + res + '<br />';//t
//
//		k = new Object();
//		k.value = '';
//		k.checked = 'false';
//		res = this.hasValue(k);
//		rp += 'floob there but not |' + res + '<br />';//f
//
//		k = new Object();
//		k.checked = 'false';
//		res = this.hasValue(k);
//		rp += 'floob zip not there and false|' + res + '<br />';//f
//
//		k = new Object();
//		res = this.hasValue(k);
//		rp += 'floob zip absolutely not there |' + ( res) + '<br />';//t
//		alert(rp);
//	}
	
	
	
	/**
	 * this is where inputs are examined and there is a little bit to it re 
	 * checkbox and radio 
	 */
	, hasValue: function (formInput) {
		if ( 'text'== formInput.type 
				|| 'password'== formInput.type
				|| 'hidden'== formInput.type 
				|| 'text'== formInput.type 
				|| 'text'== formInput.type
		) {
			return (! isEmpty(formInput.value));
		} else if ('checkbox'== formInput.type && formInput.checked) {
			return true;
		} else if ('radio'== formInput.type && formInput.checked) {
			return true;
		} else {
			return false;
		}
	}
	
	/**
	 * isolates the process of extracting the value after it has been 
	 * determined to have a value
	 */
	, getValuePart: function (formInput) {
		if ( 'text'== formInput.type 
				|| 'password'== formInput.type
				|| 'hidden'== formInput.type 
				|| 'text'== formInput.type 
				|| 'text'== formInput.type
		) {
			return formInput.value
		} else if ('checkbox'== formInput.type && formInput.checked){
			return formInput.checked ;
		} else if ('radio'== formInput.type && formInput.checked){
			return formInput.value ;
		} else {
			throw "cannot handle this form type: " + formInput.type;
		}
				
	}
	
	/**
	 * get the name part of the parameter by returning the name attribute
	 * unless it is missing when we get the id 
	 */
	, getNamePart : function (formInput) {
		return (null == formInput.name || 0 === formInput.name.length) ?
			formInput.id: formInput.name;
	}
	
	/**
	 * for GET parameters, join them in a string of
	 * name value pairs with ampersands between
	 */
	, concatQueryString: function (queryString, name, value) {
		var buildIt = queryString;
		if (0 < buildIt.length) {
			buildIt	+= '&';
		}
		buildIt += name + '=' + value;
		return buildIt;
	}
	
	/**
	 * as part of the chain of calls collecting form data, this
	 * function check against selects and composes an http query 
	 * string.  
	 * @param selects an array of select form elements as 
	 * retrieved via document.getElementsByTagName
	 * @return a string representing this section of the query 
	 * string parameters
	 * @calls none
	 * @calledby searchQuery
	 */
	, _submitSelects: function (p_selects) {
		try {
			var queryString = '';
			for (var i = 0, len = p_selects.length; i < len; i++) {
				var selectParam = this._submitOptions(p_selects[i]);//x=y,y,y
				if (1 < selectParam.length) {
					if (1 < queryString.length) {
						queryString += '&'
					}
					queryString += selectParam;
				}
			}
			return (queryString);
		} catch (ex) {
			alert('submitSelects err:: ' + ex.message);
			throw(ex);
		}
	}  
	
	/**
	 * traverse the form passed as a param by retrieving all the 
	 * options elements, and constructing a query string for submission to
	 * the server
	 * @param thisSelected the form 
	 * @return a query string fragment of the options elements
	 * @private
	 * @calls none
	 * @calledby submitSelects
	 */
	, _submitOptions: function (p_thisSelect) {
		try {
			var result = '';
			var options = p_thisSelect.getElementsByTagName('option');
			for (var i = 0, len = options.length; i < len; i++) {
				if (options[i].selected  && (0 < options[i].value.length)) {
					if (1 < result.length) {
						result += ',' + options[i].value;
					} else {
						result += p_thisSelect.id + '=' + options[i].value;
					}
				}
			}
			return (result);
		} catch (ex) {
			alert('submitOptions error:: ' + ex.message);
			throw(ex);
		}
	} 

}






/**
 * encapsulate the high-level concept of a birthday as it appears in the 
 * application.  Bound to the search module where birthday is a search 
 * key.  Validates form entry.  
 */
var Birthday = {

	/**
	 * constants for default display in the search module
	 */
	YEAR : 'YYYY', MONTH : 'MM' , DAY : 'DD',
	
	/**
	 * constant for styling in the search module
	 */
	_backgroundColor : 'white',	BKGRD_CLR_FOCUS : 'yellow',
	
	/**
	 * when focus leaves, or blurs, the birthday form element
	 * the input is validated.  user input is retrieved via
	 * Prototype's $F function.  the input can have no more 
	 * than 2 digits, and must be a number between 1 and 31.
	 * Otherwise, the value is set to the default (DD).
	 * if the input is one digit, we add a leading 0.  
	 * reset the background just in case it was modified on focus
	 * @param e the blur event as as defined by the browser
	 * @param p_id the id of the birthday form element
	 * @return void
	 * @calls  this.isOneDigit, this.isTwoDigit
	 * @calledby frontend form element as inline text onblur handler
	 */
	doBlurBirthDay: function(e, p_id){
		var val = $F(p_id);
		if(! ( this.isOneDigit(val) || this.isTwoDigit(val)) ){
			$(p_id).value = this.DAY;
		} else if ( (31 < val) || (1 > val) ) {
			$(p_id).value = this.DAY;
		} else if (10 > val) {
			$(p_id).value = '0' + val;
		}
		$(p_id).setStyle( {backgroundColor: this._backgroundColor } );
	} ,

	/**
	 * when focus leaves, or blurs, the birth month form element
	 * the input is validated.  user input is retrieved via
	 * Prototype's $F function.  the input can have no more 
	 * than 2 digits, and must be a number between 1 and 12.
	 * Otherwise, the value is set to the default (MM).
	 * if the input is one digit, we add a leading 0.  
	 * reset the background just in case it was modified on focus
	 * @param e the blur event as as defined by the browser
	 * @param p_id the id of the birth month form element
	 * @return void
	 * @calls  this.isOneDigit, this.isTwoDigit
	 * @calledby frontend form element as inline text onblur handler
	 */
	doBlurBirthMonth: function(e, p_id){
		var val = $F(p_id);
		if(! (this.isOneDigit(val) || this.isTwoDigit(val))) {
			$(p_id).value = this.MONTH;
		} else if ( (12 < val) || (1 > val) ) {
			$(p_id).value = this.MONTH;
		} else if (10 > val) {
			$(p_id).value = '0' + val;
		}
		
		$(p_id).setStyle( { backgroundColor : this._backgroundColor } );
	} ,

	/**
	 * when focus leaves, or blurs, the birth year form element
	 * the input is validated.  user input is retrieved via
	 * Prototype's $F function.  the input must have four 
	 * digits, and must be a number between 1492 and 2299.
	 * Otherwise, the value is set to the default (YYYY).
	 * reset the background just in case it was modified on focus
	 * @param e the blur event as as defined by the browser
	 * @param p_id the id of the birth year form element
	 * @return void
	 * @calls  this.isFourDigit 
	 * @calledby frontend form element as inline text onblur handler
	 */
	doBlurBirthYear: function(e, p_id) {
		var val = $F(p_id);
		if ( (! this.isFourDigit(val)) || (1492 > val) || (2299 < val) ) {
			$(p_id).value = this.YEAR;
		} 
		$(p_id).setStyle({backgroundColor: this._backgroundColor});
	},

	/**
	 * companion to onblur, the check here address when a form element
	 * is re-visited.  if the element has data in it already, it is checked to see if
	 * it is ok, else it is reset.
	 * @param e the onfocus event as passed from the browser
	 * @param p_id the form element to check for existing data
	 * @return void
	 * @calls this.isTwoDigit, this.isFourDigit 
	 * @calledby frontend form element 
	 */
	focusField: function (e, p_id) {
		if ($(p_id).getStyle('backgroundColor') != this._backgroundColor) {
			this._backgroundColor = $(p_id).getStyle('backgroundColor');
		} 
		if (p_id) {
			var val = $F(p_id);
			if ( (! this.isTwoDigit(val)) || (! this.isFourDigit(val)) ) {
				$(p_id).value = '';
			}
		}
	},
	
	/**
	 * encapsulate the regular expression testing if a text is a 4 digit number
	 * @private
	 * @param p_val a string from delivered from the front end form
	 * @return boolean indicating if the param is a four digit number
	 * @calls none
	 * @calledby doBlurBirthYear
	 */
	isFourDigit: function (p_val) {
		try {
			return (/^\d{4}/.test(p_val));
		} catch (ex) { return false; }
	},

	/**
	 * encapsulate the regular expression testing if a text is a 2 digit number
	 * @private
	 * @param p_val a string from delivered from the front end form
	 * @return boolean indicating if the param is a two digit number
	 * @calls none
	 * @calledby doBlurBirthDay, doBlurBirthMonth 
	 */
	isTwoDigit: function (p_val) {
		try {
			return (/^\d{2}/.test(p_val));
		} catch (ex) { return false; }
	},

	/**
	 * encapsulate the regular expression testing if a text is a 1 digit number
	 * @private
	 * @param p_val a string from delivered from the front end form
	 * @return boolean indicating if the param is a one digit number
	 * @calls none
	 * @calledby doBlurBirthDay, doBlurBirthMonth 
	 */
	isOneDigit: function (p_val) {
		try {
			return (/^\d/.test(p_val));
		} catch (ex) { return false; }
	}

};

/**
 * encapsulate the high-level concept of a social security number as represented in the 
 * application.  Bound to the search module where social security number is a search 
 * key.  Validates form entry.  
 */
var SocialSecNbr = {
		
	/**
	 * when focus leaves, or blurs, the first part of the 
	 * social security number form element the input is validated.  
	 * user input is retrieved via Prototype's $F function. 
	 * the input must consist of three numeric digits
	 * Otherwise, the value is set to the default of nothing.
	 * @param e the blur event as as defined by the browser
	 * @param p_id the id of the first part of the social security number
	 * @return void
	 * @calls  this.isThreeDigit
	 * @calledby frontend form element as inline text onblur handler
	 */
	blurFstPt: function (e, p_id) {
		if (! this.isThreeDigit($F(p_id))) {
			$(p_id).value = '';
		}
	},
	
	/**
	 * when focus leaves, or blurs, the middle part of the 
	 * social security number form element the input is validated.  
	 * user input is retrieved via Prototype's $F function. 
	 * the input must consist of two numeric digits
	 * Otherwise, the value is set to the default of nothing.
	 * @param e the blur event as as defined by the browser
	 * @param p_id the id of the 
	 * @return void
	 * @calls this.isTwoDigit
	 * @calledby frontend form element as inline text onblur handler
	 */
	blurMdlPt: function (e, p_id) {
		if (! this.isTwoDigit($F(p_id))) {
			$(p_id).value = '';
		}
	},
	
	/**
	 * when focus leaves, or blurs, the last part of the 
	 * social security number form element the input is validated.  
	 * user input is retrieved via Prototype's $F function. 
	 * the input must consist of four numeric digits
	 * Otherwise, the value is set to the default of nothing.
	 * @param e the blur event as as defined by the browser
	 * @param p_id the id of the last part of the social security number
	 * @return void
	 * @calls  this.isFourDigit
	 * @calledby frontend form element as inline text onblur handler
	 */
	blurLstPt: function (e, p_id) {
		var val = $F(p_id)
		if (! this.isFourDigit(val)) {
				$(p_id).value = '';
		}
	},
	
	/**
	 * encapsulate the regular expression testing if a text is a 4 digit number
	 * @private
	 * @param p_val a string from delivered from the front end form
	 * @return boolean indicating if the param is a four digit number
	 * @calls none
	 * @calledby blurLstPt 
	 */
	isFourDigit: function (p_val) {
		try {
			return (/^\d{4}/.test(p_val));
		} catch (ex) { 
			alert(ex.message);
			return false; 
		}
	},
	
	/**
	 * encapsulate the regular expression testing if a text is a 2 digit number
	 * @private
	 * @param p_val a string from delivered from the front end form
	 * @return boolean indicating if the param is a two digit number
	 * @calls none
	 * @calledby blurMdlPt 
	 */
	isTwoDigit: function (p_val) {
		try {
			return (/^\d{2}/.test(p_val));
		} catch (ex) { return false; }
	},
	
	/**
	 * encapsulate the regular expression testing if a text is a 3 digit number
	 * @private
	 * @param p_val a string from delivered from the front end form
	 * @return boolean indicating if the param is a two digit number
	 * @calls none
	 * @calledby blurFstPt 
	 */
	isThreeDigit: function (p_val) {
		try {
			return (/^\d{3}/.test(p_val));
		} catch (ex) { return false; }
	}
};


