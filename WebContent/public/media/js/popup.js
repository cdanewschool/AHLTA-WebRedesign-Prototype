/**
 * encapsulate the popup's functionality
 */
var popup = {
	
	/**
	 * close the popup
	 * @calledby front end markup onclick event handler from the "x" icon in 
	 * the top-right corner and the close button
	 * @public
	 */
	close: function(e) {
		SearchCtl.forPopup = false;
		Element.hide('popupContainer');
		return (false);
	}
		
	/**
	 * this function "opens" the custom popup and sets the focus
	 * of the page to the OK button
	 * @called by front newResultsAction.openLegend
	 * @public
	 */
	, open: function(e) {
		try {
			SearchCtl.forPopup = true;
			var popupContainer = $('popupContainer');
			var overallHeight = $('overallWireframe').getHeight();
			var overallWidth = $('overallWireframe').getWidth();
			var popupHeight = popupContainer.getHeight();
			var popupWidth = popupContainer.getWidth();
			var newX = (overallWidth/2) - (popupWidth/2) - 1 ;
			var newY = (overallHeight/2) - (popupHeight/2) - 1 ;
			popupContainer.setStyle( {
				left : newX + 'px'
				, top : newY + 'px'
			});
			//do not use Element.sho -- seems buggie
			$('popupContainer').setStyle( {display : 'block' } );
			if (null != $('btnOk')) {
				$('btnOk').focus();
			}
			return false;
		} catch (ex) {
			alert('popup.open err:: ' + ex.message);
			throw (ex);
		}
	}
	
	, fill: function(p_body, p_header) {
		this.close(null);
		if (p_header) {
			$('popupHandleText').innerHTML = p_header;
		} else {
			$('popupHandleText').innerHTML = 'Alert window';
		}
		$('popupContentWrapper').innerHTML = p_body;
		/*
		 * this is for IE in case p_body contains event attrs
		 * to be sure they fire correctly
		 */
		$('popupContentWrapper').innerHTML = $('popupContentWrapper').innerHTML;
		/*
		 * now open the popup
		 */
		this.open(null);
	}
	
};
