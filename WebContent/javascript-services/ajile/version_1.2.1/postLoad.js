
//try {
//	sideNav.loadContent (null, 'tasks'
//		, 'WebContent/public/templates/appointments/appointments.html'
//		, piimAppointments )
//} catch(ex) {
//	alert("side nav loading err::" + ex.message);
//	throw(ex);
//}


/**
 * statically loads the main content panel on initial application startup.
 * create a Prototype Ajax updated object and pass it the main content url 
 * dom object whose innerhtml is to be replaced
 * @calls none
 * @calledby statically at load time 
new Ajax.Updater('mainContentDisplay', 'WebContent/public/templates/mainContent/mainContent.tpl', {
	method: 'get', asynchronous: false
	, onException: function(resp){ alert(resp); } 
	, onFailure: function(resp){ alert(resp); } 
});
 */


/**
 * naive level way to load the tab A div AFTER the tabA is defined
 * calls doTabA
 * calledby browser interal task scheduler 1/2 second after this text loads
 */
////////////////////////////setTimeout('doTab("tabA")', '500');


/**
 * now that the side navigation is created, it is safe to bind
 * the listeners for changes to the current patient
 * @param curPat the dom element located in the current patient
 * wireframe bar
 */
//function initListeners() {
try {
	initApptListeners ('current_patient', curPatDispatcher);
} catch (ex) {
	alert("init current patient listeners err::" + ex.message);
	throw(ex);
}
//}

try {
new Draggable( 'popupContainer', {
	handle: 'popupHandle',
	zindex: 99999,
	starteffect: false,
	endeffect: false
}) ;
} catch (ex) {
	alert('popup draggable err:: ' + ex.message);
	
}