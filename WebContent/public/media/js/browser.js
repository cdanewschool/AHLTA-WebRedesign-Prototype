/* 
edited by gm 1/28/2010
This example is from the book _Ajax: The Definitive Guide_ by Anthony T. Holdener III.
 * Written by Anthony T. Holdener III.  Copyright (C) 2008 O'Reilly Media, Inc.
 * You may study, use, modify, and distribute this example for any purpose.
 * This example is provided WITHOUT WARRANTY either expressed or implied.
 */
/**
 * @fileoverview Example 7-5, browser.js: Code for browser detection
 *
 * This file, browser.js, contains the Browser object, which can be used for browser
 * detecting on the client.
 */

/**
 * This object, Browser, allows the developer to check the user's client against
 * specific browser clients. Currently, the following checks are supported:
 * - isIE (is the browser an Internet Explorer browser)
 * - isMoz (is the browser a Mozilla-based browser)
 * - isOpera (is the browser an Opera browser)
 * - isSafari (is the browser a Safari browser)
 * - isOther (is the browser an unknown browser)
 */
var Browser = {
	/**
	 * This variable stores the browser's agent.
	 * @private
	 */
	_agent: navigator.userAgent.toLowerCase( ),
	/**
	 * This variable stores the browser's version/
	 * @private
	 */
	_version: navigator.appVersion.toLowerCase( ),
	/**
	 * This variable stores whether the browser is an Internet Explorer browser or not.
	 * @calledby sidenav.pageMouseDown
	 */
	isIE: false,
	/**
	 * This variable stores whether the browser is a Mozilla-based browser or not.
	 * @calledby sideNav.getOffsetLeft, sidenav.getOffsetTop
	 */
	isMoz: false,
	/**
	 * This variable stores whether the browser is an Opera browser or not.
	 */
	isOpera: false,
	/**
	 * This variable stores whether the browser is a Safari browser or not.
	 */
	isSafari: false,
	/**
	 * This variable stores whether the browser is some unknown browser or not.
	 */
	isOther: false,
	
	/**
	 * flag to manually trigger initialization to eliminate unpredictable behavior 
	 * with the onload event
	 * @calls none
	 * @calledby sideMenu.prototype.inialize
	 */
	doInit: true,
	
	/**
	 * This method, initialize, sets the boolean members of the class to their
	 * appropriate values based on the values of the /_agent/ and /_version/ members.
	 *
	 * @member Browser
	 * @constructor
	 * @calls none
	 * @calledby sideMenu.prototype. initialize,  
	 * @return void
	 */
	initialize: function( ) {
		doInit = false;
		this.isOpera = (this._agent.indexOf('opera') != -1);
		this.isIE = ((this._agent.indexOf('mac') != -1) && (this._version.indexOf('msie') != -1));
		this.isOther = (this._agent.indexOf('konqueror') != -1);
		this.isSafari = ((this._agent.indexOf('safari') != -1) && (this_.agent.indexOf('mac') != -1));
		this.isIE = ((this._version.indexOf('msie') != -1) && !this.isOpera && !(this._agent.indexOf('mac') != -1) && !this.isOther && !this.isSafari);
		this.isMoz = (!this.isOther && !this.isSafari && navigator.product && (navigator.product.toLowerCase( ) == 'gecko'));
		this.isOther = (!this.isIE && !this.isMoz && !this.isOpera && !this.isSafari);
	}
};
/* use Prototype's cross-browser event handling methods for ease of use. */
try {
	/*
 	 * Call the initialize method of the Browser object when the load event
	 * fires in the document
	 */
//	Event.observe(document, 'load', Browser.initialize, false);
} catch (ex) {
//alert( ex.message);
}
 
