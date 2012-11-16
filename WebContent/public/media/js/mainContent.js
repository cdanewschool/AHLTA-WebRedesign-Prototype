
/**
 * encapsulate the front end manipulation for the action buttons.
 * these are old-style input form elements so each event must be 
 * handled here rather than using pseudo classes like you
 * would with an a tag -- Jihoon wanted it that way so we could 
 * use "disable".  the actual manipulations are done via
 * multiple class names
 */
var actionBttns = {
	
		/**
		 * the mouse is over the input item so switch to 
		 * hover classes
		 * @public
		 * @calledby front end markup 
		 */
	mouseover: function(e, p_id) {
		if ($(p_id) && (! $(p_id).hasClassName('buttonHover')) ) {
			$(p_id).addClassName('buttonHover');
		}
		return (true);
	}

	/**
	 * the mouse moved out of the input item so remove the  
	 * hover class
	 * @public
	 * @calledby front end markup 
	 */
	, mouseout: function(e, p_id) {
		if ($(p_id) && ( $(p_id).hasClassName('buttonHover')) ) {
			$(p_id).removeClassName('buttonHover');
		}
		return (false);
	}

	/**
	 * the mouse is down so switch to active state
	 * @public
	 * @calledby front end markup 
	 */
	, mousedown: function(e, p_id) {
		if ($(p_id) && (! $(p_id).hasClassName('buttonActive')) ) {
			$(p_id).addClassName('buttonActive');
		}
		return (false);
	}
	
	/**
	 * the mouse was released so remove active state
	 * @public
	 * @calledby front end markup 
	 */
	, mouseup: function(e, p_id) {
		if ($(p_id) && ( $(p_id).hasClassName('buttonActive')) ) {
			$(p_id).removeClassName('buttonActive');
		}
		return (false);
	}
	
	/**
	 * pass image handling on to regular function
	 * @public
	 * @calledby front end markup 
	 */
	, mouseoverImg: function(e, p_id) {
		this.mouseover(e, p_id); //?
		return (false);
	}
	
	/**
	 * pass image handling on to regular function
	 * @public
	 * @calledby front end markup 
	 */
	, mouseoutImg: function(e, p_id) {
		this.mouseout(e, p_id);
		return (false);
	}
	
	/**
	 * for images the images have to be swapped. the naming convention is 
	 * just to switch out Link to Hover
	 * @public
	 * @calledby front end markup 
	 */
	, mousedownImg: function(e, p_id) {
		if ($(p_id)) {
			var parts = $(p_id).getAttribute('src').split('Link');
			if (2 == parts.length) {
				$(p_id).setAttribute('src', parts[0] + 'Hover' + parts[1]);
			}
		}
		return (false);
	}
	
	/**
	 * for images the images have to be swapped. the naming convention is 
	 * just to switch out Link to Hover
	 * @public
	 * @calledby front end markup 
	 */
	, mouseupImg: function(e, p_id) {
		if ($(p_id)) {
			var parts = $(p_id).getAttribute('src').split('Hover');
			if (2 == parts.length) {
				$(p_id).setAttribute('src', parts[0] + 'Link' + parts[1]);
			}
		}
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
		return (false);
	}
}

