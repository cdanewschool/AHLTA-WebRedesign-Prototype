var TableCtl;

try {
	TableCtl = Class.create();
} catch (ex) {
	alert('excpt in Class create of filemenu:: ' + ex.message);
}
/**
 * the declaration of the the class sideMenu
 */
TableCtl.prototype = {
		/**
		 * initializer automatically called by Prototype 
		 * framework when instance is created
		 * @param elt a class object to be treated as this superclass of the 
		 * instance
		 * @return void
		 */
	initialize : function(elt) {
		this._lastSelected = null;
	} ,
		
	/**
	 * the DOM element last selected
	 * @private
	 */
	_lastSelected: null
	
	/**
	 * @public
	 */
	, getLastSelected: function() {
		return (this._lastSelected);
	}
		
	/*
	 * if first click turn active, if one already active make inactive
	 * old inactive
	 * new active unless new is old
	 * 
	 */
	, selected: function(p_idRow ){ // these do not need to be tr's 
		try {
			if (null == p_idRow) {
				return;
			}
			var clickedRow = $(document.getElementById(p_idRow));
			this._initIt(clickedRow);
			this._origStyle(this._lastSelected); // null ok
			if (null != this._lastSelected && this._lastSelected.id === clickedRow.id) {
				this._lastSelected = null;
			} else {
				this._selectedStyle(clickedRow);
				this._lastSelected = clickedRow;
			}
		} catch (ex) {
			alert('error table controller - click::' + ex.message);
			throw(ex);
		}
	}	
		
	/**
	 * Respond to the cancel button on the form by clearing the internal state of the 
	 * selected patient
	 * @param e the event as returned by the browser
	 * @return void
	 * @calls none
	 */
	, cancelLast: function () {
		if (null != this._lastSelected) {
			this.selected(this._lastSelected.id);
		}
	}
	

	/**
	 * when a row is first selected set up some values for its original color and 
	 * background.  this is due to the alternating row colors that
	 * must be restored when the row is de-selected.  you only need to do this once
	 * @calledby newSelected
	 * @private 
	 */
	, _initIt: function (p_someTr) {
		if ( (p_someTr) && (null != p_someTr) && (! p_someTr.didInit) ){
			try {
				p_someTr.origBkgrnd = p_someTr.style.backgroundColor;
				p_someTr.origClr = p_someTr.style.color;
				p_someTr.didInit = true;
			} catch (ex) {
				alert('TableCtl._initIt err:: ' + ex.message);
			}
		}
	}

	/**
	 * restore the last selected row to its original color and background
	 * calledby newSelected
	 */
	, _origStyle: function (p_someTr) {
		try {
			if (null != p_someTr ) {
				if (! p_someTr.didInit) {
					throw 'cannot restore orig style for someTr that is not initialized ';
				}
				if ( p_someTr.style.backgroundColor != p_someTr.origBkgrnd) {
					p_someTr.style.backgroundColor = p_someTr.origBkgrnd;
				}
				if ( p_someTr.style.color != p_someTr.origClr) {
					p_someTr.style.color = p_someTr.origClr;
				}
			}
		} catch(ex) {
			alert('rowSelected.clear err:: ' + ex.message);
			throw (ex);
		}
	}
	
	, _selectedStyle: function (p_someTr) {
		try {
			if (null != p_someTr ) {
				if (! p_someTr.didInit) {
					throw 'cannot set selected style for someTr that is not initialized ';
				}
				p_someTr.style.backgroundColor = '#00AEEF';
				p_someTr.style.color = '#FFFFFF';
			}
		} catch(ex) {
			alert('rowSelected.clear err:: ' + ex.message);
			throw (ex);
		}
	}


		
}

