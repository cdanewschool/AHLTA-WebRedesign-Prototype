
/******************************************************************************
 * Uize calendar widget for the lower left-hand corner to drive date-time 
 * awareness.
 *
 * dependency on uize.templates.Calendar for html makes unwanted html which is 
 * via css.  snapViewOnValueChange means we only have to listen for 
 * onValueChange.  loose coupling to gui s.t. only modify the container's 'da'
 * (day) value which is an observable. calendar days should have 0 time part.
 * 
 */
function initUizeCal(that) {
	/*
	 * integration point to the uize framework for the calendar module
	 * note loosely coupled design integration to dom observer
	 * @calls none
	 * @calledby page level onclick listeners
	 */
	Uize.module ({
		required:[
			'UizeDotCom.Page.Example.library',
			'UizeDotCom.Page.Example',
			'Uize.Widget.Calendar',
			'Uize.Templates.Calendar',
			'Uize.Date'
		] ,
		builder:function () {
			var page = window.page = new Uize.Widget.Page;
			var calendar = page.addChild ('calendar',
				Uize.Widget.Calendar, {	built:false
					, html:Uize.Templates.Calendar
					, snapViewOnValueChange:true} );
			page.wireUi();
			function valueChanged() {
				var apptContainer = document.getElementById(that.container);
				if (apptContainer) {
			   		apptContainer.setAttribute('da', calendar.get ('value') );
				} else {
//					alert("uizecal builder cannot set current date attribute:  appointmentContainer is null");	
				}
			}
			calendar.wire ('Changed.value', valueChanged);
//			calendar.wire ('Changed.month',displayCalendarState);
//			calendar.wire ('Changed.year',displayCalendarState);
//			displayCalendarState ();

			that._myCalendar = calendar;
			var signl = new Date();
			signl.setMilliseconds(0);
			signl.setSeconds(0);
			signl.setMinutes(0);
			signl.setHours(0);
			that._myCalendar.set ({ 'value' : signl  });
		}
	} );
}


/******************************************************************************
* Isolates month-view functionality.
*
* markup function is entry point for markup and patients function for list of 
* patiens in current month (markup must go first)
*
* @TODO decouple markup from patients function
* @TODO polymorphism re views
*/
var MonthView = {
	// month name labels for gui
	MON : [ 'January', 'February', 'March', 'April' , 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	// day name labels for gui
	DAYS : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	DAYS_FULL : ['Sunday', 'Monday', 'Tueday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	//general days in month
	DAYS_IN_MONTH : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

	/*****************************************************************************
	* accumulate PATIENTS from the month into a hash by id
	*
	* @private
	* @param {object} client person with an appointment
	* @calls none
	* @calledby this.buildAppts
	*/
	, accumulatePats: function(client) {
		try {
			if(null == this._patientList){
				this._patientList = new Object();
			}
			if (! this._patientList[client.id]) {
				this._patientList[client.id] = client;
			}
		} catch (ex) {
			alert('accum pats ex: ' + ex.message);	
			throw(ex);
		} 
	}
	
	/*****************************************************************************
	* exposes the accumulated patients
	* 
	* @public
	* @return hash of patients with appointments by id
	* @type Object
	* @calls none
	* @calledby appointments.prototype.patientsOnView
	*/
	, patients: function() {
		return (this._patientList);
	}
	
	/*****************************************************************************
	* hash of patients on current calendar
	*
	* @private
	*/
	, _patientList : null

	/*****************************************************************************
	* reset to the beginning on the day
	*
	* @private
	* @param {Date} appointmentStart current day
	* @return the current day with 0 time part
	* @type Date
	* @calls none
	* @calledby this.getappts
	*/
	, apptDay: function (appointmentStart){
		var apptDay = new Date(appointmentStart);
		apptDay.setHours(0); 
		apptDay.setMilliseconds(0);
		apptDay.setMinutes(0);
		apptDay.setSeconds(0);
		return (apptDay);
	}
	
	/*****************************************************************************
	* the name of the instance or object for onclick etc listeners to render as 
	*  text such as appointments or telephoneConsults which can later be replaced 
	* by non-intrusive javascript in the markup
	*
	* @private
	*/
	, collaborator : null 

	/*****************************************************************************
	* monthview html ready for innerHTML ==
	*
	* @public
	* @param {String} apptContainer source for the current date
	* @param {Object} appointments hash of appointments from server
	* @param {mycaller} source of collaborator
	* @return html of month view
	* @type String
	* @calls this.monthRow
	* @calledby appointments.prototype.newViewMarkup
	*/
	, markup: function(apptContainer, appointments, myCaller){
		
		this.collaborator = myCaller;
		this._patientList = null;
		try {
			var curDate = this.getCurrentDate(apptContainer);
			// for legibility -- feel free to inline
			var markup = '';
			markup += '<div class="monthWrap">';
			markup += 	'<div style="background-color : #DEE6DD; " class="caption">' + this.MON[curDate.getMonth()] + ' ' + curDate.getFullYear() + '</div>';
			markup += 	'<table class="monthView" colspan="7" summary="this is the month view of the appointments module">';
			markup += 		'<thead>';
			markup += 			'<tr class="header">';
			for (var i = 0; i < this.DAYS.length; i++ ) {
				markup += 			'<th id="' + this.DAYS[i] + '" class="headr">' + this.DAYS_FULL[i] + '</th>';
			}
			markup += 			'</tr>';
			markup += 		'</thead>';
			markup += 		'<tbody>';
	
		// make a var at top
			markup += this.monthRow(appointments, curDate);
			markup += 		'</tbody>';
			markup += 	'</table>';
			markup += '</div>'; 
			return (markup);	
		} catch (ex) {
			alert(' month view markup ' + ex.message);
			throw(ex);
		}
	}
	
	/*****************************************************************************
	* retrieve the current date from teh DOM 
	*
	* @private
	* @param {DOMElement} apptContainer DOM fragment with key Attribute
	* @return either the data as found in the DOM or now
	* @type Date
	* @calledby this.markup
	* @calls none
	*/
	, getCurrentDate: function (apptContainer) {
		if ( apptContainer.getAttribute('da') ) {
			return (new Date(apptContainer.getAttribute('da')));
		}
		return (new Date() );
	}
	
	/*****************************************************************************
	* markup for all the rows.  a 2d iteration using numbers rather than dates
	* the current date must also be incremented but is not checked for the iteration
	* here.
	*
	* @private
	* @param {Object} p_appointments hash from server
	* @param {Date} the inflated date currently selected and stored in the DOM
	* @returns the markup of the rows
	* @type String
	* @calledby markup
	* @calls this.doTd
	* 
	*/
	, monthRow: function ( p_appointments , p_curSelDate) {
		try {
			var iterate = new Date(p_curSelDate.getFullYear(), p_curSelDate.getMonth(), 1  );
			iterate.setDate(iterate.getDate() - iterate.getDay() ); 
			var rows = '';
			var nbrRows = this.nbrMonthRows(p_curSelDate.getFullYear(), p_curSelDate.getMonth());

			for (var tr = 0 ; tr < nbrRows; tr++) {
				var row = '<tr>';
				for (var dayOfWeek = 0; dayOfWeek < this.DAYS.length; dayOfWeek++) {
					row += this.doTd(dayOfWeek, p_curSelDate, iterate, p_appointments);
					iterate.setDate(iterate.getDate() + 1); 
				}
				row += '</tr>';
				rows += row;
			}
			return (rows);
		} catch(ex) {
			alert(' monthRow ' + ex.message);
			throw(ex)
		}
	}
	
	, nbrMonthRows: function (p_fullYear, p_month) {
		try {
			var firstOfMonth = new Date(p_fullYear, p_month, 1  );
			return Math.ceil( (this.DAYS_IN_MONTH[firstOfMonth.getMonth()] + firstOfMonth.getDay()) / 7);
		} catch(ex) {
			alert(' error figuring out number of rows for month::' + ex.message);
			throw(ex)
		}
	}
	

	/*****************************************************************************
	* add css class for days on grid which are not the current month
	*
	* @private
	* @param {Number} p_dOweek day of the week 0-6
	* @param {Date} the date we are currently iterating over
	* @return the td for the day
	* @type String
	* @calls none
	* @calledby this.doTd
	*/
	, notMyMonthDay: function (p_dOweek, p_iteratingDate) {	
		if (0 == p_dOweek) {
			return ('<td class="noLeftBrdr nextMonthDay">' + p_iteratingDate + '</td>');
		}
		return ('<td class="nextMonthDay">' + p_iteratingDate + '</td>');
	}

	/*****************************************************************************
	* markup the day as a td -- fork on if it is the current month
	*
	* @private
	* @param {Number} p_dOweek day of week 0-6
	* @param {Date} p_curSelDate currently selected date from DOM -- do not modify
	* @param {Date} p_iterating the day we are iterating over
	* @param {Object} p_appointments the schedule fro the server
	* @return the html for a td
	* @type String
	* @calls this.monthDay , this.notMyMonthDay
	* @calledby this.monthRow
	*/
	, doTd: function (p_dOweek, p_curSelDate, p_iterating, p_appointments) {
		try {
			if (p_curSelDate.getMonth() == p_iterating.getMonth()) {
				return (this.monthDay(p_dOweek, p_curSelDate, p_iterating, p_appointments));
			} else {
				return (this.notMyMonthDay(p_dOweek, p_iterating.getDate()) );
			}
		} catch (ex) {
			alert('month view doTo ' + ex.message);
			throw(ex);	
		}
	}
	
	/*****************************************************************************
	* td markup for a day in the current month.  the check is no longer necessary
	* as it is done up-stream, but is harmless
	*
	* @see doTd
	* @calledby this.doTd
	* @calls this.openingTd, this.buildAppts
	* @calledby this.openingTd
	*/
	, monthDay: function(p_dOweek, p_curSelDate, p_iterating, p_appointments) {
		try {
			var day = this.openingTd(p_dOweek, p_curSelDate.getDate(), p_iterating.getDate() ); 
			if (p_curSelDate.getMonth() == p_iterating.getMonth()) {
				day += p_iterating.getDate();
				if (p_appointments[p_iterating]) {
					day += this.buildAppts(p_appointments[p_iterating]);
				}
			}
			day += '</td>';
			return (day);
		} catch(ex) {
			alert(' monthDay ' + ex.message);
			throw(ex);
		}
	}

	// not called?
	, nextMonthDay: function(p_dayOfWeek, p_curSelDate, p_iterDate, p_appointments) {
		return '<td class="nextMonthDay">' + p_iterDate + '</td>';
	}

	/*****************************************************************************
	* builds the css classes for a day in current month: possible values include
	* 
	* @private
	* @param {Number} p_dayOfWeek Sunday thru Saturday 0-6
	* @param {Date} p_curSelDay the Currently Selected Day as stored in the DOM
	* @param {Date} p_iteratingDay the day whose markup is being generated
	* @return markup for td classes or zero length string
	* @type String
	* @calls none
	* @calledby this.hasTdclasses
	*/
	, tdClasses: function(p_dayOfWeek, p_curSelDay, p_iteratingDay ) {
		try {
			var res = '';
			if (0 == p_dayOfWeek) {
				res += 'noLeftBrdr';
			}
			if (p_curSelDay == p_iteratingDay ) {
				if (0 < res.length) {
					res += ' ';	
				}
				res += 'curDay';
			}
			if (0 < res.length) {
				res = ' class="' + res + '" ';
			}
			return (res);
		} catch (ex) {
			alert('monthview tdClasses err:: ' + ex.message);
			throw(ex);	
		}
	}			
	
	/*****************************************************************************
	* decoupled logic from markup generation, criteria for td classes
	*
	* @see tdClasses
	* @type Boolean
	* @calls none
	* @calledby this.openingTd
	*/
	, hasTdClasses: function(p_dayOfWeek, p_curSelDay, p_iteratingDay ) {
		return (0 == p_dayOfWeek || p_curSelDay == p_iteratingDay );
	}			

	/*****************************************************************************
	* build markup for the opening of a td
	* 
	* @see tdClasses
	* @type String
	* @calls this.hasTdClasses, this.tdClasses
	*/
	, openingTd: function(p_dayOfWeek, p_curSelDay, p_iteratingDay ) {
		if (this.hasTdClasses(p_dayOfWeek, p_curSelDay, p_iteratingDay)) {
			return ('<td ' 
				+ this.tdClasses(p_dayOfWeek, p_curSelDay, p_iteratingDay) 
				+ '>');
		} 
		return ('<td>');
	}
	
	/*****************************************************************************
	* make a list of all the people who have an appointment today
	*
	* @param {Object} appts a hash of the appointments indexed by patient id
	* @return markup for UL LI's for people who have appointments today
	* @type String
	* @calls this.accumulatePats , this.patStyleClass
	* @calledby this.monthDay
	*/
	, buildAppts: function (appts) {
		
		try {
			var res = '<ul class="monthViewAppts" >' ;
			for(var i = 0 ; i < appts.length; i++) {
				this.accumulatePats(appts[i]);
				var fullName = appts[i].name;
				var parts = fullName.split(', ');
				if ( 1 < parts.length) {
					fullName = parts[0] + ', ' +  parts[1].charAt(0);
				}
				res += '<li><a class="monthViewAppt  onclick="' 
					+ this.collaborator + '.clientSelected(event, ' + appts[i].id 
					+ ');"><div ';
				res += this.patStyleClass(appts[i].id);
				res += ' name="curView' + appts[i].id + '" >' + fullName  + '</div></a></li>';	
			}
			res += '</ul>';
			return (res);
		} catch (ex) {
			alert('monthview buildappts:: ' + ex.message);
			throw (ex);	
		}
	}
	
	/**
	 * style the text of the client on the schedule generally green but
	 *  if the client is also the currently selected the client then the 
	 *  style is blue.
	 *  @param clientId the id of the apppointment's cleint that we are 
	 *  currently looking at
	 *  @return String the css class data as applied
	 *  @calls this.selclient
	 *  @calledby this.buildAppts
	 */
	, patStyleClass: function(clientId) {
		var res = ' class="zzSched ';
		if (this.selClient(clientId) ) {
			res += 'selectedClient';
		}
		res += '" ';
		return (res);
	}
	
	/**
	 * determines if the client id passed as a param is the id of the 
	 * currently selected client
	 * @param cleintId the string to be evaluated agains the currently 
	 * selected client id
	 * @return boolean is the paramt he currently selected id
	 * @calls inflates the name of the collaborator to a js component, then 
	 * requests the collaborator's currently selected client id
	 * 
	 */
	, selClient: function(clientId) {
		try {
			var theCollaborator = eval(this.collaborator);
			return ( (clientId == theCollaborator.selectedClient) ? true : false);
		} catch (ex) {
			alert('monthView selClient:: ' + ex.message);
			throw (ex);
		}
	}
	
	
}



/******************************************************************************
* Isolates week-view functionality.
*
* markup function is entry point for markup and patients function for list of 
* patiens in current week (markup must go first)
*
* @TODO decouple markup from patients function
* @TODO polymorphism re views
*/
var WeekView = {
	
	// labels
	MON : [ 'Jan', 'Feb', 'Mar', 'Apr' , 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	, DAYS : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

	/*****************************************************************************
	* noramlize the day to zero time 
	*
	* @private
	* @param {Date} day target to zero the time
	* @return the original date modified
	* @type Date
	* @TODO this can be shared
	* @TODO do we need to return the object?
	* @calledBy this.checkScheduled
	* @calls none
	*/
	, normDay: function(day) {
		var hasher = new Date(day.getTime());
		hasher.setMilliseconds(0);
		hasher.setSeconds(0);
		hasher.setMinutes(0);
		hasher.setHours(0);
		return hasher;
	}

	/*****************************************************************************
	* Deisgn document calls for just the frist initial
	*
	* @private
	* @param {String} fullName patient's name as from server
	* @return ln, f
	* @type String
	* @calledby this.td
	* @calls none
	*/
	, splitName: function (fullName) {
		//var fullName = scheduled.name;
		var parts = fullName.split(', ');
		if ( 1 < parts.length) {
			return parts[0] + ', ' +  parts[1].charAt(0);
		}
		return fullName;
	}
	
	/*****************************************************************************
	* decoupling logic from generation of markup
	*
	* @param {Number} indx day of Week 0-6
	* @return is this Saturday?
	* @type Boolean
	* @calls none
	* @calledby this.tdclassHour
	*/
	, isSaturday: function (indx) {
		return (6 == indx);
	}
	
	/*****************************************************************************
	* make the css classes for a td for hour demarcation and beginning of week
	*
	* @param {Number} indx the current row in the table each of which reps 15 min
	* @param {Boolean} isScheduled unused artifact
	* @param {Number} j the day of week 0-6 :: the iteration order is for each 15 
	* minutes and then for each day of week
	* @return markup for a td css class
	* @type String
	* @calls none
	* @calledby this.td
	*/
	, tdclassHour: function(indx, isScheduled, j){
		try {
			var res = '';
			if (3 == (indx % 4)) {
				res += ' hour ';
			} 
			if (this.isSaturday(j) ) {
				res += ' saturday ';	
			}
			if (0 < res.length) {
				res = ' class="' + res + '"' ;
			} 
			return (res);
		} catch (ex) {
			alert('tdclassHour err:: ' + ex.message);
			throw(ex);
		}		
	}
	
	/*****************************************************************************
	* Accumulate a hash of the patients on this weeks schedule
	* keys off of the patient id and store the whole patient
	* 
	* @see Monthview.accumulatePats
	*/
	, accumulatePats: function(client) {
		try {
			if(null == this._patientList){
				this._patientList = new Object();
			}
			if (! this._patientList[client.id]) {
				this._patientList[client.id] = client;
			}
		} catch (ex) {
			alert('accum pats ex: ' + ex.message);	
			throw(ex);
		} 
	}
	
	/*****************************************************************************
	* public interface to get the patients on this weeks calendar
	*
	* @see MonthView.patients
	*/
	, patients: function() {
		return (this._patientList);
	}
	
	/*****************************************************************************
	* member hash of patients on the current view
	*
	* @see MonthView. _patientList
	*/
	, _patientList : null

	/*****************************************************************************
	* the Currently Selected Date which SHOULD NOT BE CHANGED anywhere in this 
	* module -- this module is a listener to this not a modifier
	*
	* @return either the Currebntly Selected Date for the DOM or now
	* @type Date
	* @calledby this.markup, this.td
	*/
	, currentDay: function() {
		var currentDate = new Date();
		if (this._container) {
			var curDa = this._container.getAttribute('da');
			if (curDa) {
				currentDate = new Date(curDa);
			}
		}
		return (currentDate);
	}
	
	/*****************************************************************************
	* the html markup element used as the root node for this area of the
	* application, like 'appointmentsContainer' or 'consultsContainer'
	*
	* @private
	*/
	, _container: null
	
	/*****************************************************************************
	* this is the controller object for this area of the app who is calling us 
	* this is string that gets rolled into 'onclick=...' text
	*
	* @private 
	* @TODO prototype event?
	*/
	, collaborator : null
	
	
	/*****************************************************************************
	* primary entry point to access markup for the view
	* 
	* @see MonthView.markup
	*/
	, markup: function(apptContainer, theAppointments, myCaller) {
		this.collaborator = myCaller;
		this._patientList = null;
		this._container = apptContainer;
		
		var currentDate = this.currentDay();
		
		var dateClone = new Date(currentDate.getTime());
		var myDayOfWeek = dateClone.getDay();
		dateClone.setDate(dateClone.getDate() - myDayOfWeek);
		
		var markup = '';
		markup += '<div>';
		markup += 	'<div class="curViewHeading"> ';
		markup += 		'<div class="yr" id="apptsCurYr">' + currentDate.getFullYear() + '</div>';

		for (var i = 0; i < this.DAYS.length; i++) {
			markup += 		'<div class="weekViewHead">' + this.DAYS[i] + ' ' 
				+  this.MON[dateClone.getMonth()] +   ' ' + dateClone.getDate() + '</div>';
			dateClone.setDate( 1 + dateClone.getDate() );
		}
		markup += 	'</div>';
		markup += 	'<div class="curViewBody">';
		markup += 		'<table class="weekView" colspan="8" summary="this is the week view of the appointments module">';
		markup += 			'<tbody>';
		markup += this.weekRows(currentDate, theAppointments);
		markup += 			'</tbody>';
		markup += 		'</table>';
		markup += 	'</div>'; 
		markup += '</div>'; 
		return (markup);	
	}
	
	/*****************************************************************************
	* make a presentable hour label
	*
	* @param {Date} count source for hour info
	* @return hour label
	* @type String
	* @calledby this.weekRow
	* @calls none
	* 
	*/
	, labelHour: function(count) {
		try {
			var hrs = count.getHours();
			if (hrs > 12) {
				return ((hrs - 12) + ':00 PM');
			} else if (12 == hrs){
				return (hrs + ':00 PM');
			} else {
				return (hrs + ':00 AM');
			}
		} catch(ex) {
			alert('labelHour dayview ' + ex.message);	
			throw(ex);
		} 
	}
	
	/*****************************************************************************
	* First level iteration over each 15 minute interval solely controls
	* row level iteration, all aprams are send downstream
	*
	* @param {Date} currentDate from DOM :: immutable
	* @param {Object} 
	* @calls this.weekRow
	* @calledby this/markup
	*
	*/
	, weekRows: function (currentDate, theAppointments) {
		var cnt = new Date(currentDate.getTime());
		cnt.setMilliseconds(0);
		cnt.setSeconds(0);
		cnt.setMinutes(0);
		cnt.setHours(9);
		
		//go back to sunday
		cnt.setDate(cnt.getDate() - cnt.getDay());
		
		var rows = '';
		for (var i = 0; i < 32; i++) {
			var day = new Date(cnt.getTime());
			day.setMilliseconds(0);
			day.setSeconds(0);
			
			rows += this.weekRow(currentDate, theAppointments, i, day);
			// go back to first day, 15 min
			
			cnt.setMinutes(cnt.getMinutes() + 15);// sunday
		}
		return (rows);
	}
	
	/*****************************************************************************
	* isolate what to do for one row
	*
	* @param {Date} currentDate for DOM
	* @param {Object} appts hash of the patients
	* @param {Number} i the outer level index representing 15 minute intervals 0-32
	* @param {Date} day the current day
	* @return markup for a row
	* @type String
	* @calls this.td
	* @calledby weekRows
	*/
	, weekRow: function(currentDate, appts, i, day) {
		var row = '<tr>';
		row += 	'<td><div>';
		if (0 == (i % 4)) {
			row += this.labelHour(day);
		}
		row += '</div></td>';
		// for each day at this time
		for (var j = 0 ; j < this.DAYS.length; j++) {
			row += this.td(day, appts, i, j);
			day.setDate(day.getDate() + 1);
		}
		row += '</tr>';
		return (row);
	}
	

	/*****************************************************************************
	* decoupled logic from generation, is there an appointment on this day
	*
	* @param {Date} p_day current Day
	* @param {Object} p_appointments has of appointments
	* @type Boolean
	* @calls this.checkScheduled
	* @caleldby this.td
	*/
	, isScheduled: function(p_day, p_appointments) {
		return  (null != this.checkScheduled(p_day, p_appointments) ) ;
	}
	
	/*****************************************************************************
	* isolate functing to generate a single td
	*
	* @param {Number} curTime current slot 0-32
	* @param {Object} appts hash of appts
	* @param {Number} i outer index of time slots
	* @param {Number} j inner idex of day of week
	* @return markup for a week
	* @type String
	* @calls this.isScheduled, this.patStyleClass, this.splitName, 
	* this.currentDay().getDay
	* @calledby this.weekrow 
	*/
	, td: function(curTime, appts, i, j) {
		try {
			var td = 	'<td';
			var classes = this.tdclassHour(i, 
				this.isScheduled(curTime, appts), j, curTime);
			if (0 < classes.length) {
				td += classes;
			}
			td += '>';
			if (this.isScheduled(curTime, appts) ) {
				var scheduled = this.checkScheduled(curTime, appts)
				this.accumulatePats(scheduled);
				td += '<a onclick="' + this.collaborator 
					+ '.clientSelected(event, ' + scheduled.id + ');">';
				td +='<div ';
				td += this.patStyleClass(scheduled.id);
				td += ' name="curView' + scheduled.id + '" ';
				td += '>';
				td += this.splitName(scheduled.name);
				td +='</div>';
				td += '</a>';
			} else {
				if (j == this.currentDay().getDay()) {
					td += '<div class="curDay"></div>';
				} else {
					td +='<div></div>';
				}
			}
			td += '</td>';
			return (td);
		} catch (ex) {
			alert('week td err:: ' + ex.message);
			throw(ex);
		}
	}
	
	/**
	 * style the text of the client on the schedule generally green but
	 *  if the client is also the currently selected the client then the 
	 *  style is blue.
	 *  @param clientId the id of the apppointment's cleint that we are 
	 *  currently looking at
	 *  @return String the css class data as applied
	 *  @calls this.selclient
	 *  @calledby this.buildAppts
	 */
	, patStyleClass: function(clientId) {
		var res = ' class="zzSched ';
		if (this.selClient(clientId) ) {
			res += 'selectedClient';
		}
		res += '" ';
		return (res);
	}

	
	
	
	/**
	 * determines if the client id passed as a param is the id of the 
	 * currently selected client
	 * @param cleintId the string to be evaluated agains the currently 
	 * selected client id
	 * @return boolean is the paramt he currently selected id
	 * @calls inflates the name of the collaborator to a js component, then 
	 * requests the collaborator's currently selected client id
	 * 
	 */
	, selClient: function(clientId) {
		try {
			var theCollaborator = eval(this.collaborator);
			return ( (clientId == theCollaborator.selectedClient) ? true : false);
		} catch (ex) {
			alert('monthView selClient:: ' + ex.message);
			throw (ex);
		}
	}

	/*****************************************************************************
	* get this scheduled patient or null
	*
	* @param {Date} curTime time to check
	* @param {Object} appts all the appointments on the calendar
	* @return the scheduled patient or null
	* @type Object
	* @calls this.normDay
	* @calledby this.isScheduled, this.td
	*/
	, checkScheduled: function(curTime, appts) {
		var day = this.normDay(curTime);
		if (appts[day]) {// if there are appointments for this day
			var hash = new Object();// build this
			var dayAppts = appts[day];// list of day's appointments
			for (var i = 0 ; i < dayAppts.length; i++) {// for each appt in teh day
				var appt = dayAppts[i]; // this is the appointment
				hash[appt.appointment] = appt;
			}// hash of times
			return (hash[curTime]);
		} 
		return (null);
	}
	
	
	
};



/******************************************************************************
* Isolates day-view functionality.
*
* markup function is entry point for markup and patients function for list of 
* patiens in current week (markup must go first)
*
* @TODO decouple markup from patients function
* @TODO polymorphism re views
*/
var DayView = {
	
	//labels
	MON : [ 'January', 'February', 'March', 'April' , 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

	/*****************************************************************************
	* @see MonthView.tdClass
	* @calls none
	* @calledby scheduledApptTd, noSchedApptTd
	*/
	, tdclass: function(indx, isScheduled){
		var txt = ''
		if (3 == (indx % 4)) {
			txt += 'hour ';
		}
		if (isScheduled ) {
			if (3 == (indx % 4)) {
				txt += 'hasApptSolid';
			} else {
				txt += 'hasApptDotted';
			}
		} 
		if (0 < txt.length) {
			txt = ' class="' + txt + '" ';
		}
		return (txt);
	} 
	
	/*****************************************************************************
	* @see WeekView.labelHour
	* calls none
	* @ccalledby timeTd
	*/
	, labelHour: function(count) {
		try {
			var hrs = count.getHours();
			//hrs += 1; 
			if (hrs > 12) {
				return ((hrs - 12) + ':00 PM');
			} else if (12 == hrs){
				return (hrs + ':00 PM');
			} else {
				return (hrs + ':00 AM');
			}
		} catch(ex) {
			alert('labelHour dayview ' + ex.message);	
			throw(ex);
		} 
	}
	
	/*****************************************************************************
	* @see MonthView.patients
	*/
	, patients: function() {
		return (this._patientList);
	}
	
	/*****************************************************************************
	* @see Monthview._patientList
	*/
	, _patientList : null

	/*****************************************************************************
	* generate markup for this views left hand td
	* 
	* @param {} indx the time slot 0 -32
	* @param {} count
	* @return  lhs td markup
	* @type String
	* @calls this.labelHour
	* @called this.row 
	*/
	, timeTd: function (indx, count) {
		try {
			if (0 == (indx % 4)) {
				return 	'<td><div>' + this.labelHour(count) + '</div></td>'; 
			}
			return '<td><div></div></td>'; 
		} catch (ex) {
			alert('day view timeTd ' + ex.message);
			throw (ex);
		}
	}
	
	/*****************************************************************************
	* see WeekView.collaborator
	*/
	, collaborator : null
	
	/*****************************************************************************
	* this td has an appointment 
	*
	* @param {Number} indx used for css classes
	* @param {Object} client this scheduled patient
	* @return markup for an appointment rhs td
	* @type String
	* @calls this.accumulatePats , this.patStyleClass, this.tdclass, 
	* @calledby this.row
	*/
	, scheduledApptTd: function( indx, client ) {
		try {
			this.accumulatePats(client);
			var res = '<td ' + this.tdclass(indx, true) 
				+ ' id="' + client.apptId + '"  ><a onclick="' 
				+ this.collaborator + '.clientSelected(event, '	+ client.id 
				+ ', ' + client.apptId + ');" ><div ';
			res += this.patStyleClass(client.id); 
			res += ' name="curView' + client.id + '" ';
			res += '>' + client.name + '</div></a></td>';
			return res;
		} catch (ex) {
			alert('day view schedapptTd:: ' + ex.message);
			throw (ex);	
		}
	}
	/**
	 * style the text of the client on the schedule generally green but
	 *  if the client is also the currently selected the client then the 
	 *  style is blue.
	 *  @param clientId the id of the apppointment's cleint that we are 
	 *  currently looking at
	 *  @return String the css class data as applied
	 *  @calls this.selclient
	 *  @calledby this.buildAppts
	 */

	, patStyleClass: function(clientId) {
		var res = ' class="zzSched ';
		if (this.selClient(clientId) ) {
			res += 'selectedClient';
		}
		res += '" ';
		return (res);
	}
//	, theCollaborator : null
	/**
	 * determines if the client id passed as a param is the id of the 
	 * currently selected client
	 * @param cleintId the string to be evaluated agains the currently 
	 * selected client id
	 * @return boolean is the paramt he currently selected id
	 * @calls inflates the name of the collaborator to a js component, then 
	 * requests the collaborator's currently selected client id
	 * 
	 */
	, selClient: function(clientId) {
		try {
//			if (null == this.theCollaborator) {
			var theCollaborator = eval(this.collaborator);
//			}
			return ( (clientId == theCollaborator.selectedClient) ? true : false);
		} catch (ex) {
			alert('monthView selClient:: ' + ex.message);
			throw (ex);
		}
	}

	/*****************************************************************************
	* this td has no appointmemnt
	*
	* @param (Number} indx this timeslot
	* @return markup for a td
	* @type String
	* calledby this.row
	* calls this.tdclass
	* 
	*/
	, noSchedApptTd: function(indx) {
		try {
			var row =   '<td '; 
			//var isSched = (timeSlots[count])? true: false;
			var classes = this.tdclass(indx, false);
			if (0 < classes.length) {
				row += classes;
			}
			row += '><div></div></td>';
			return (row);
		} catch (ex) {
			alert('day view noschedapptTd:: ' + ex.message);
			throw (ex);	
		}
	}
	
	/*****************************************************************************
	* markup for a row
	* 
	* @param {Number} indx the timeslot
	* @param {} count
	* @param {Object} timeSlots hash of appointments keyed on time slot
	* @return tr markup
	* @type String
	* @calls this.scheduledApptTd, this.noSchedApptTd
	* @calledby dayRows
	*/
	, row: function (indx, count, timeSlots) {
		try {
			var row = '<tr>'
			row += this.timeTd(indx, count);
			row += (timeSlots[count]) ? this.scheduledApptTd( indx, timeSlots[count] ) : this.noSchedApptTd(indx); 
			row += '</tr>';
			return (row);
		} catch(ex) {
			alert('error making day row ' + ex.message);	
			throw(ex);
		}
	}
	
	/*****************************************************************************
	* patients on view
	*
	* @see MonthView.accumulatePats
	* @calls none
	* @calledby scheduledApptTd
	*/
	, accumulatePats: function(client) {
		try {
			if(null == this._patientList){
				this._patientList = new Object();
			}
			if (! this._patientList[client.id]) {
				this._patientList[client.id] = client;
			}
		} catch (ex) {
			alert('accum pats ex: ' + ex.message);	
			throw(ex);
		} 
	}
	
	/*****************************************************************************
	* clear time but skip hour
	* @calls none
	* @calledby  zerotije, dayRows
	*/ 
	, zeroMinutes: function (theDate){
		theDate.setMilliseconds(0);
		theDate.setSeconds(0);
		theDate.setMinutes(0);
		return (theDate);
	}
	
	/*****************************************************************************
	* @see MonthView.normDay
	* @calls dayRows
	* calledby dayRows
	*/
	, zeroTime: function (theDate){
		var anotherDate = this.zeroMinutes(theDate);
		anotherDate.setHours(0);
		return (anotherDate);
	}		
	
	/*****************************************************************************
	* make the row
	* @calls this.zeroTime this.zeroMinutes
	* calledby markup
	*/
	, dayRows: function (p_appointments, p_currentDate) {
		try {
			var rows = '';
			// if there are any appontments today 
			var dateClone = this.zeroTime(new Date(p_currentDate.getTime()));
			var times = new Object();
			if ( p_appointments[dateClone]) {
				var apo = p_appointments[dateClone];
				for (var i = 0; i < apo.length; i++) {
					times[apo[i].appointment] = apo[i];
				}	
			}
			var count = this.zeroMinutes(new Date(p_currentDate.getTime()));
			count.setHours(9);
			for (var i = 0; i < 32 ; i++) {
				rows += this.row(i, count, times);
			
				count.setMinutes(count.getMinutes() + 15);	
			}
			return (rows);
		} catch (ex) {
			alert(' dayView dayRows err:: '+ ex.message);
		}
	} 
	
	/*****************************************************************************
	* @see MonthView.markup
	* @calls  this.dayRows
	* @calledby appointments.propotype
	*/
	, markup: function (p_apptContainer, p_theAppointments, p_myCaller) {
		try {
			this.collaborator = p_myCaller;
			
			this._patientList = null;
			var curDa = p_apptContainer.getAttribute('da');
			var currentDate = new Date();
			if (curDa) {
				currentDate = new Date(curDa);	
			}
		
			var view = '';
			view += '<div>';
			view += '<div class="curViewHeading">';
			view += 	'<div class="yr" id="apptsCurYr" >' + currentDate.getFullYear() + '</div>';
			view += 	'<div class="dayMo" >' + currentDate.getDate() + ' ' + this.MON[currentDate.getMonth()] + '</div>';
			view += '</div>'; // end heading
			view += '<div class="curViewBody">'; 
			view += 	'<table class="dayView" colspan="2" summary="this is the day view of the appointments module">';
			view += 		'<tbody>';
			view += this.dayRows(p_theAppointments, currentDate);
			view += 		'</tbody>';
			view += 	'</table>';
			view += '</div>';//end curViewBody
			view += '</div>';//end container
			return (view);
		} catch (ex) {
			alert(' dayView markup:: ' + ex.message);
			throw (ex);
		}
	}
	
}

///******************************************************************************
//* add xml parsing to document if not IE using the IE signature
//*/
//if(! window.ActiveXObject) {
//	Document.prototype.loadXML = function(xmlString) {
//		var doc = (new DOMParser).parseFromString(xmlString, 'text/xml');
//		while (this && this.hasChildNode && this.hasChildNode()){
//			this.removeChild(this.lastChild);
//		}
//		for(i = 0, len = doc.childNodes.length; i < len; i++){
//			this.appendChild(this.importNode(doc.childNodes[i], true));
//		}
//	};
//}



/******************************************************************************
* globals used here: appointments is the 'class' or factory and the others
* are the intances
*/
var Appoints;
try {
	Appoints = Class.create();
} catch (ex) {
	alert('except in Class create of appoints:: ' + ex.message);	
}

/******************************************************************************
* controller class for the scheduling modules.  all front end logic must 
* refernce an instance of this and not a calendar view or a patient list or
* data directly
*/
Appoints.prototype = {
	
	_myCalendar : null 
	, _myApptId : null 
	, selectedClient : null
	
	/*****************************************************************************
	* controls the patient data panel
	*
	* @param {String} clientId refernce to the current client
	* @type Function
	* @calls none
	* @calledby clientSelected
	*/
	, resetCurPat: function(clientId) {
//		this._mainCalTblCtl

		try {
			if (this.selectedClient) {
				var oldOne = document.getElementById('patList' + this.selectedClient);
				if (oldOne) {
					$(oldOne).removeClassName('selClient');
				}
			}
			var newOne = $('patList' + clientId);
			if (newOne) {
				$(newOne).addClassName('selClient');
			}
			var oldSels = $$('.selectedClient');
			if (oldSels) {
				for (var i = 0; i < oldSels.length; i++) {
					$(oldSels[i]).removeClassName('selectedClient');
				}
			}
			var pats = $$('.zzSched');
			if (pats) {
				for (var i = 0; i < pats.length; i++) {
					if (('curView' + clientId) == ( pats[i].readAttribute('name') )) {
						$(pats[i]).addClassName('selectedClient');
					} 
				}
			}
			this.selectedClient = clientId;
		} catch (ex) {
			alert('resetCurPat ex:: ' + ex.message);	
			throw(ex);
		}
	}
	 



	, clearCurPat: function() {
		try {
			if (this.selectedClient) {
				var oldOne = document.getElementById('patList' + this.selectedClient);
				if (oldOne) {
					$(oldOne).removeClassName('selClient');
				}
			}
			var oldSels = $$('.selectedClient');
			if (oldSels) {
				for (var i = 0; i < oldSels.length; i++) {
					$(oldSels[i]).removeClassName('selectedClient');
				}
			}
			this.selectedClient = null;
		} catch (ex) {
			alert('resetCurPat ex:: ' + ex.message);	
			throw(ex);
		}
	}


	
	/*****************************************************************************
	* bound to from end:: an appointment was clicked , get user data from the 
	* and populate the client data panel
	*
	* @param {Event} the event from the browser
	* @param {String} clientId bound for the fron end
	* @calls clientSelected 
	* @calledby onclick
	*/
	, clientSelected: function(event, p_clientId, p_apptId) {
		try {
			this.setupBtns();
			this._myApptId = p_apptId;
			document.getElementById('current_patient').setAttribute( 'patient_id' , p_clientId )
			this.resetCurPat(p_clientId);
			var req = this.patRec + '&apptId=' + p_apptId; 
			doGet(req, function(p_serverData) {
				try {
					document.getElementById('apptPatRecId').innerHTML = p_serverData;
				} catch (ex) {
					alert('error finding patient panel:: ' + ex.message);	
					throw(ex);
				}
			});
			return (false);
		} catch (ex) {
			
			alert(ex.message);
			throw(ex);
		}
	}
	
	, setupBtns: function () {
		if ($('removeAction')) {
			$('removeAction').setAttribute('src'
					, 'WebContent/public/media/images/actions/ActionIcon_Remove_Link_18x18.gif');
		}
		if ($('openAction')) {
			$('openAction').setAttribute('src'
					, 'WebContent/public/media/images/actions/ActionIcon_Open_Link_18x18.gif');
		}

//		$('refreshAction').setAttribute('src'
//				, 'WebContent/public/media/images/actions/ActionIcon_Refresh_Link_18x18.gif');
		for (var i = 0; i < this.enableButtons.length; i++ ) {
			if ( $(this.enableButtons[i]).getAttribute('disabled')) {
				$(this.enableButtons[i]).removeAttribute('disabled');
			}
		}
	}
	
	, disableBtns: function () {
		if ($('removeAction')) {
			$('removeAction').setAttribute('src'
					, 'WebContent/public/media/images/actions/ActionIcon_Remove_UA_18x18.gif');
		}
		if ($('openAction')) {
			$('openAction').setAttribute('src'
					, 'WebContent/public/media/images/actions/ActionIcon_Open_UA_18x18.gif');
		}

//		$('refreshAction').setAttribute('src'
//				, 'WebContent/public/media/images/actions/ActionIcon_Refresh_UA_18x18.gif');
		for (var i = 0; i < this.enableButtons.length; i++ ) {
			if (! $(this.enableButtons[i]).getAttribute('disabled')) {
				$(this.enableButtons[i]).setAttribute('disabled', 'disabled');
			}
		}
		
	}
	
	/*****************************************************************************
	* @see MonthView.normDay
	* @calls none
	* @calledby today, nextMonth, previousMonth
	*/ 
	, zilchTime: function (p_date) {
		try {
			p_date.setMilliseconds(0);
			p_date.setSeconds(0);
			p_date.setMinutes(0);
			p_date.setHours(0);
			return (p_date);
		} catch(ex) {
			alert('zilchTime ex:: ' + ex.message) ;	
			throw(ex);
		}
	}
	
	/*****************************************************************************
	* bound to calendar button to go to today
	* calls this.zilchTime
	* calledby onlcik front end 
	*/
	, today: function(event) {
		try {
			var now = this.zilchTime(new Date());
			this._myCalendar.set({'value' : now});
			return false;
		} catch (ex) {
			alert('error in today: ' + ex.message);	
			throw(ex);
		}
	}	
	
	/*****************************************************************************
	* bound to directional arrows to 'next' month is a misnomer since this 
	* started as month increment but was generalized to next whaterver-it-is you
	* are looking at
	* @calls this.zilchTime, 
	* @calledby front end onclick event
	* @returns false to stop bubble
	*/
	, nextMonth: function(event) {
		try {
			var old = this._myCalendar.get('value');
			if (! old) {
				old = this.zilchTime(new Date());
			}
			var asDate = new Date(old.getTime());
			var apptContainer = document.getElementById(this.container);
			if (apptContainer) {
				var currentView = apptContainer.getAttribute('vu');
				if ('weekView' == currentView) {
					asDate.setDate(asDate.getDate() + 7);
				} else if ('monthView' == currentView) {
					asDate.setMonth(asDate.getMonth() + 1);
				} else {// dayView --do not set attr -- would loop
					asDate.setDate(asDate.getDate() + 1);
				}
			} else {
				asDate.setMonth(asDate.getMonth() + 1);
			}
			this._myCalendar.set({'value' : asDate});
			return false;
		} catch (ex) {
			alert('error in nextMonth: ' + ex.message);	
			throw(ex);
		}
	}
	
	/*****************************************************************************
	* reverse of nextMonth
	* @calls none
	* @calledby frontend onclick event
	* @returns false to stop bubble
	*/ 
	, previousMonth: function(event) {
		try {
			var old = this._myCalendar.get('value');
			if (! old) {
				old = this.zilchTime(new Date());
			}
			var asDate = new Date(old.getTime());// for uize
			var apptContainer = document.getElementById(this.container);
			if (apptContainer) {
				var currentView = apptContainer.getAttribute('vu');
				if ('weekView' == currentView) {
					asDate.setDate(asDate.getDate() - 7);
				} else if ('monthView' == currentView) {
					asDate.setMonth(asDate.getMonth() - 1);
				} else {// dayView --do not set attr -- would loop
					asDate.setDate(asDate.getDate() - 1);
				}
			} else {
				asDate.setMonth(asDate.getMonth() - 1);
			}
			this._myCalendar.set({'value' : asDate});
			return false;
		} catch (ex) {
			alert('error in previousMonth: ' + ex.message);	
			throw(ex);
		}
	}
	
	/*****************************************************************************
	* begin the process of chaning a view by causing a dom change event
	* listeners will pick this up automatically
	* 
	* @param {String} p_curView the new veiw that was selected
	* @calls none
	* @calledby frontend onclick event
	* @returns false to stop bubble
	*/
	, curViewChange: function(event, p_curView) {
		try {
			document.getElementById(this.container).setAttribute('vu', p_curView);
			return false;
		} catch (ex)  {
			alert("curViewChange ex " + ex.message );	
			throw(ex);
		}
	}
	
	
	/***********************************************************************
	* the current button is blue, the rest are grey, abstraced so we don't 
	* care which is which
	* calls none
	* calledby this.buttonState
	* 
	*/ 
	, viewButtons: function (p_on, p_off1, p_off2) {
		try {
			var onOne = document.getElementById(p_on)
			$(onOne).addClassName('curSel');
			var offOne = document.getElementById(p_off1)
			$(offOne).removeClassName('curSel');
			var offTwo = document.getElementById(p_off2)
			$(offTwo).removeClassName('curSel');
		} catch (ex) {
			alert('viewButtons ex:: ' + ex.message);
			throw(ex);
		}
	}
	
	/*****************************************************************************
	* controller logic to determine which view to render
	*
	* @param {String} p_curVu the view selected
	* @param {String} the id of the DOM element rooting the module
	* @param {Object} hash of appointments
	* @return markup for the the view
	* @type String
	* @calls WeekView.markup, MonthView.markup, DayView.markup
	* @calledby xmlHook
	*/
	, newViewMarkup: function(p_curVu, p_container, p_sched) {
		try {
			if ('weekView' == p_curVu) {
				return (WeekView.markup(p_container, p_sched, this.component));
			} else if ('monthView' == p_curVu) {
				return ( MonthView.markup(p_container, p_sched, this.component));
			} else {// dayView 
				return (DayView.markup(p_container, p_sched, this.component));
			}
		} catch(ex) {
			alert('newViewMarkup ex:: ' + ex.message);	
			throw(ex);
		}
	}
	
	/*****************************************************************************
	* generate the patient list panel
	*
	* @see newViewMarkup
	*/
	, patientsOnView: function(p_curVu, p_container, p_sched) {
		try {
			if ('weekView' == p_curVu) {
				return WeekView.patients(p_container, p_sched );
			} else if ('monthView' == p_curVu) {
				return MonthView.patients(p_container, p_sched );
			} else {// dayView 
				return DayView.patients(p_container, p_sched);
			}
		} catch (ex) {
			alert('patientsOnView ex:: ' + ex.message);	
			throw(ex);
		}
	}
	
	/*****************************************************************************
	* controller for coloring view buttons
	* calls this.viewButtons
	* calledby vxmlHook
	*/
	, buttonState: function(p_curVu) {
		try {
			if ('weekView' == p_curVu) {
				this.viewButtons('weekButton', 'dayButton', 'monthButton');
			} else if ('monthView' == p_curVu) {
				this.viewButtons('monthButton', 'dayButton', 'weekButton');
			} else {// dayView --do not set attr -- would loop
				this.viewButtons('dayButton', 'monthButton', 'weekButton');
			}
		} catch(ex) {
			alert('buttonState ex:: ' + ex.message );
			throw(ex);
		}
	}
	
	/*****************************************************************************
	* if the view changes and the current patient is still in the view
	* @calledby transitionCurPat
	* @calls none
	*/
	, curPatStillActive: function(p_patientsOnView) {
		try {
			for (patientId in p_patientsOnView) {
				if (this.selectedClient == p_patientsOnView[patientId].id) {
					return (true);
				}
			}
			return (false);
		} catch(ex) {
			alert('curPatStillActive ex:: ' + ex.message);	
			throw(ex);
		}
	}

	/*****************************************************************************
	* note that this modifies the dom which is read only in IE, so we wrap it in 
	* Prototypes $'s operator -- change the selected patient
	* @calls none
	* @calledby xmlHook
	*/
	, transitionCurPat : function(p_patientsOnView) {
		try {
			if (this.selectedClient) {
				if ( this.curPatStillActive(p_patientsOnView) ) {
					var pat = document.getElementById('patList' + this.selectedClient);
					$(pat).addClassName('selClient');
				} else {
					document.getElementById('apptPatRecId').innerHTML = '';
					var currentClient = document.getElementById('patList' + this.selectedClient) ;
					if (currentClient) {
						$(currentClient).removeClassName('selClient');
					}
					this.selectedClient = null;
				}
			}
		} catch(ex) {
			alert('transitionCurPat ex:: ' + ex.message);
			throw(ex);
		}
	}
	
	/*****************************************************************************
	* Ajax callback for hadling server respons to change view
	* @calls this.buttonState, this.getappts, this.xmlDoc, this.newViewMarkup, this.patientsOnView, this.patListHtml
	* @calledby doUpdate
	* 
	*/ 
	, xmlHook: function (targ, that) {
		try {
			var containr = document.getElementById(that.container);
			var curVu = containr.getAttribute('vu');
			this.buttonState(curVu);
//			alert('sklks |||||'+ targ );
			var sched = this.getappts(parseXml(targ));
			
			this._mainCalTblCtl = new TableCtl();
			// markup must go before patients
			document.getElementById('mainCalendarDisplay').innerHTML = this.newViewMarkup(curVu, containr, sched);
			var patientsOnView = this.patientsOnView(curVu, containr, sched);
			var pats = this.patListHtml(patientsOnView)
			document.getElementById('patientContainerId').innerHTML = pats;
			this.transitionCurPat(patientsOnView);
		} catch (ex) {
			alert(' xmlHook ex :: ' + ex.message);
			throw(ex);
		}
	}
	
	, _mainCalTblCtl : null
	
	/*****************************************************************************
	* parse the appointments from the xml retrieved from the server
	* @calls this.apptDay, this.buildApptsList
	* @calledby xmlHook
	*/
	, getappts: function (apXml) {
		try {
			var schedule = new Object();
			appointments = apXml.getElementsByTagName('appointment');
			if (appointments) {
				for (var i = 0; i < appointments.length; i++) {
					var apptDate = this.apptDay(
							appointments[i].
							getElementsByTagName('start')[0].
							childNodes[0].
							data);
					this.buildApptsList(appointments[i], schedule, apptDate);
				}
			}
			return(schedule);
		} catch (ex) {
			alert('getappts ex::' + ex.message + '|'+apXml);	
			throw(ex);
		}
	} 
	
	/*****************************************************************************
	*  assemble hash of appointments for the passed in current time
	*  calls this.buildClient
	*  @calledby getappts
	*/
	, buildApptsList: function(p_appointment, p_schedule, p_curTime) {	
		try {
			if (! p_schedule[p_curTime]) {
				p_schedule[p_curTime] = new Array();
			}
			var apptList = p_schedule[p_curTime]; 
			apptList[apptList.length] = this.buildClient(p_appointment); // add this to the end
		} catch (ex) {
			alert('error parsing xml :: ' + ex.message);	
			throw(ex);
		}
	}
	
	/*******************************************************************************
	* assemble internal representation of a client's appointment: a name, an id, 
	* and the start time fo the appointment
	* @calls none
	* @calledby buildApptsList
	*/
	, buildClient: function(p_appointment) {
		try {
			var client = new Object;
			client.name = p_appointment.getElementsByTagName('name')[0].childNodes[0].data;
			client.id   = p_appointment.getElementsByTagName('id')[0].childNodes[0].data;
			client.appointment = new Date(p_appointment.getElementsByTagName('start')[0].childNodes[0].data);
			client.apptId = p_appointment.getAttribute('id');
			
			return (client);
		} catch (ex) {
			alert('buildClient ex:: ' + ex.message);
			throw(ex);
		}
	}

	/*****************************************************************************
	* morph the object representing the current day
	* 
	* calls zilchtime
	* calledby getappts
	*/
	, apptDay: function (appointmentStart){
		try { 
			return this.zilchTime(new Date(appointmentStart));
		} catch (ex) {
			alert('apptDay ' + ex.message);	
			throw(ex);
		}
	}
	
	/*
	 * encapulaste the ajax
	 * calls xmlhook
	 * calledby update
	 */
	, doUpdate: function(e, that) {
		if(null == this._myApptId) {
			this.disableBtns();
		}
		var physicianId = '23456';
		var req = that.xmlUrl + '&physicianid=' + physicianId;
		doGet(req, function(p_serverData) {
			try {
				that.xmlHook(p_serverData, that);
			} catch (ex) {
				throw(ex);
			}
		});
	}
	
	/*****************************************************************************
	* bound to front end for rendering views
	* calls doupdate
	* calledn by frontend onclick
	* 	
	*/
	, update: function (e) {
		if('DOMAttrModified' == e.type) { //moz
			if ('da' == e.attrName || 'vu' == e.attrName) {
				try {
					this.doUpdate(e, this);
				} catch (ex) {
					alert('update ' + ex.message);
					throw (ex);	
				}
			}
		} else if ('propertychange' == e.type ) { //ie
			this.doUpdate(e, this);
		}
		return (false);
	}
	
	// place holder
	, initialize: function() {
//		alert('initiall new Appoint');
	}

	/*****************************************************************************
	* critical setup referenced from the menuing system to set up the environment
	* here we bind the listeners
	* 
	* called by static initializer
	* calls initapptlisteners
	*/
	, initContent: function() {
		try {
			this.selectedClient = null;
			if ('appointmentsContainer' == this.container) {
				initApptListeners(this.container, function (e) {
					piimAppointments.update(e);
				});
			} else {
				initApptListeners(this.container, function (e) {
					consults.update(e);
				});
			}
			initUizeCal(this);
		} catch (ex) {
			alert('init appt err:: ' + ex.message);	
			throw(ex);
		}
	}
	
	// string passed to view to render name of component for onclick's
	, component : null
	
	/*****************************************************************************
	* make a list of patients on the current schedule by asking teh view for the
	* current set of patients and interating
	* @calls none
	* @calledby xmlHook
	*/
	, patListHtml : function (patList) {
		try {
			var html = '<ul>';
			for ( var ap in patList) {
				html += '<li><a onclick="return ' 
					+ this.component 
					+ '.clientSelected(event, ' 
					+ patList[ap].id 
					+ ','
					+ patList[ap].apptId 
					+ ');"  id="patList' 
					+ patList[ap].id 
					+ '">' 
					+ patList[ap].name 
					+ '</a></li>';
			}
			html += '</ul>';
			return (html);
		} catch (ex) {
			alert('appte patListHtml err:: ' + ex.message);
		}
	}
	
	
	
}

/**
 * these are the two instance variable for each of the two modules, 
 * Appointments, and Telephone Consults.  they are declared here in the 
 * global scope
 */
var appointments, consults ;

/**
 * try block to simply be award of errors
 */
try {
	
	/**
	 * the Appointments module
	 */
	piimAppointments = new Appoints();
	
	/**
	 * the Telehone Consults module
	 */
	consults = new Appoints();

	/**
	 * reference to the DOM level div wrapper id
	 */
	piimAppointments.container = 'appointmentsContainer';	
	
	/**
	 * reference to the DOM level div wrapper id
	 */
	consults.container = 'consultsContainer';
	
	// uri's for the schedule
	/**
	 * leaving some room for improvement (done early in the project)
	 * a reference to get the schedule
	 */
	piimAppointments.xmlUrl = 'spring/appointments?kind=sched';
	consults.xmlUrl = 'spring/telephone_consults?kind=sched';
	
	/**
	 * leaving some room for improvement (done early in the project)
	 * a reference to get the "patient" ie appointment data
	 */
	piimAppointments.patRec = 'spring/appointments?kind=client';
	consults.patRec =         'spring/telephone_consults?kind=client';

	/**
	 * the name of the component stored in the component for rendering in onclick
	 * */
	piimAppointments.component = 'piimAppointments';
	consults.component = 'consults';
	
	/**
	 * these are the Appointment action buttons that can be enabled
	 */
	piimAppointments.enableButtons = [ 'checkinAction' , 'checkoutAction' , 
	                                   'transferAction', 'signEncAction' 
	                                   , 'removeAction' ]; 

	/**
	 * these are the Telephone Consults action buttons that can be enabled
	 */
	consults.enableButtons = [ 'transferAction' , 'notesAction'
	                           , 'editPhoneAction' ];
	// , 'providersAction', 'signEncountersAction' ]; 

/**
 * error/issues?
 */
} catch(ex) {
	alert('excpt instantiating appointments:: ' + ex.message);
	throw(ex);
}


var apptActions = {

		/**
		 * begin the process of adding an appointment by disabling undo and contacting server
		 */
	add: function (e) {
		this.stopRemoveUndo();
		calActionsBck.setSearch('Add Appointment'
				, 'spring/appointments?kind=add&patient_id=');
	}
		/**
		 * finish the process of adding an appointment by closing popup and refreshing view
		 */
	, addCompleted: function (e) {
		this.stopRemoveUndo();
		var postParams = FormCtl.buildPostParams($('newApptFrm'));
		postParams.set('kind', 'addComplete');
		doPost('spring/appointments', function (p_serverData) {
			try {
				popup.close();
				piimAppointments.doUpdate(null, piimAppointments);
			} catch (ex) {
				alert('error opening patient search popup::' + ex.message);
				throw (ex);
			}
		} , postParams );
		return (false);
	}
	
	/**
	 * update the appointment's state to checkin
	 */
	, checkin: function () {
		this.stopRemoveUndo();
		var params = new Hash();
		params.set('kind','checkin');
		params.set('apptId', piimAppointments._myApptId);
		doPost('spring/appointments', function (p_serverData){
			try {
				document.getElementById('apptPatRecId').innerHTML = p_serverData;
			} catch (ex) {
				alert('error setting checkin::' + ex.message);
				throw (ex);
			}
		}, params );
		return (false);
	}
	
	/**
	 * update the appointment's state to checkout
	 */
	, checkout: function () {
		this.stopRemoveUndo();
		var params = new Hash();
		params.set('kind','checkout');
		params.set('apptId', piimAppointments._myApptId);
		doPost('spring/appointments', function (p_serverData){
			try {
				document.getElementById('apptPatRecId').innerHTML = p_serverData;
			} catch (ex) {
				alert('error setting checkin::' + ex.message);
				throw (ex);
			}
		}, params );
		return (false);
	}
	
	/**
	 * finish the process of removing an appointment by notifying the server and 
	 * updating the display
	 */
	, doneRemove: function (event) {
		try {
			if ( $('undoRemoveAction').getAttribute('disabled')) {
				$('undoRemoveAction').removeAttribute('disabled');
			}
			piimAppointments._myApptId = null;
			popup.close();
			piimAppointments.doUpdate(null, piimAppointments);
		} catch (ex) {
			alert('error closing remove::' + ex.message);
			throw (ex);
		}
	}
		
	/**
	 * after effecting the state of the appointments, refresh the view
	 */
	, refresh: function (e) {
		try {
			this.stopRemoveUndo();
			popup.close();
			document.getElementById('apptPatRecId').innerHTML = '';
			piimAppointments.clearCurPat();
			piimAppointments.doUpdate(null, piimAppointments);
		} catch (ex) {
			alert('error opening patient search popup::' + ex.message);
			throw (ex);
		}
		return (false);
	}

	/**
	 * remove an appointment by identifying the appointment and notifying server
	 */
	, remove: function (event, piimAppointments) {
		this.stopRemoveUndo();
		var params = new Hash();
		params.set('kind','remove');
		params.set('apptId', piimAppointments._myApptId);
		doPost('spring/appointments', function (p_serverData) {
			try {
				popup.fill(p_serverData, 'Cancel Appointment' );
			} catch (ex) {
				alert('error opening cancel appointment popup::' + ex.message);
				throw (ex);
			}
		} , params );
	}

	/**
	 * compete the process of removing an appointment and refresh 
	 */
	, removeCompleted: function (event) {
		var postParams = FormCtl.buildPostParams($('removeApptFrm'));
		postParams.set('kind', 'removeComplete');
		doPost('spring/appointments', function (p_serverData) {
			try {
				popup.fill(p_serverData, 'Confirmation' );
			} catch (ex) {
				alert('error opening cancel appointment popup::' + ex.message);
				throw (ex);
			}
		} , postParams );
		return (false);
		
	}
	
	/**
	 * update th appotnment of th server to set its status to signed and update the view
	 */
	, sign : function () {
		this.stopRemoveUndo();
		var params = new Hash();
		params.set('kind','sign');
		params.set('apptId', piimAppointments._myApptId);
		doPost('spring/appointments', function (p_serverData){
			try {
				document.getElementById('apptPatRecId').innerHTML = p_serverData;
			} catch (ex) {
				alert('error setting checkin::' + ex.message);
				throw (ex);
			}
		}, params );
		return (false);
	}
	
	/**
	 * if the appointment has been removed, give the user a change to undo
	 */
	, stopRemoveUndo: function() {
		if (! $('undoRemoveAction').getAttribute('disabled')) {
			$('undoRemoveAction').setAttribute('disabled', 'disabled');
		}
	}
		
	/**
	 * not working in the tatrc gui
	 */
	, transfer: function () {
		this.stopRemoveUndo();
		var params = new Hash();
		params.set('kind', 'transfer');
		params.set('apptId', piimAppointments._myApptId);
		doPost('spring/appointments', function (p_serverData){
			try {
				popup.fill(p_serverData, 'Transfer Appointment' );
			} catch (ex) {
				alert('error in transfer popup::' + ex.message);
				throw (ex);
			}
		}, params );
		return (false);
	}
	
	/**
	 * disable the ability to undo a remove
	 */
	, undoRemove : function (event) {
		try {
			this.stopRemoveUndo();
			doGet('spring/appointments?kind=undoRemove', function(p_serverData){});
			piimAppointments.doUpdate(null, piimAppointments);
		} catch (ex) {
			alert('error in undoRemove::' + ex.message);
			throw (ex);
		}
	}

	
}

var teleConActions = {
		
	/**
	 * set all the "discussed" checkboxes to checked and disabled
	 */
	checkAllDisc: function (e) {
		var myChecks = ["disDiagnosis","disMed","disSide", "disAlt"];
		if (true == $('allItemsDiscussed').checked) {
			for (var i = 0; i < myChecks.length; i++) {
				$(myChecks[i]).checked = true;
				$(myChecks[i]).disabled = true;
			}
		} else {
			for (var i = 0; i < myChecks.length; i++) {
				$(myChecks[i]).checked = false;
				$(myChecks[i]).disabled = false;
			}
		}
	}

	/**
	 * this is for the refresh button on the gui.  when clicked
	 * is is as if you first landed on the page and the data
	 * on the page is current and reflect all previous committed
	 * actions
	 */
	, refresh: function (e) {
		try {
			popup.close();
			document.getElementById('apptPatRecId').innerHTML = '';
			consults.clearCurPat();
			consults.doUpdate(null, consults);
		} catch (ex) {
			alert('error opening patient search popup::' + ex.message);
			throw (ex);
		}
		return (false);
	}

	/**
	 * action for the transfer button, tells the server to transfer the
	 * appointment
	 */
	, transfer: function (e) {
		var params = new Hash();
		params.set('kind', 'transfer');
		params.set('teleConId', consults._myApptId);
		doPost('spring/telephone_consults', function (p_serverData){
			try {
				popup.fill(p_serverData, 'Transfer Telephone Consult' );
			} catch (ex) {
				alert('error in transfer popup::' + ex.message);
				throw (ex);
			}
		}, params );
		return (false);
	}

	/**
	 * fetch the notes for the appointment when the notes button is pressed
	 */
	, notes: function (e) {
		var params = new Hash();
		params.set('kind', 'notes');
		params.set('teleConId', consults._myApptId);
		doPost('spring/telephone_consults', function (p_serverData){
			try {
				popup.fill(p_serverData, 'Telephone Consult Notes' );
			} catch (ex) {
				alert('error in notes popup::' + ex.message);
				throw (ex);
			}
		}, params );
		return (false);
	}

	/**
	 * fetch the callback phone number when the button is pressed
	 */
	, callback: function (e) {
		var params = new Hash();
		params.set('kind', 'callback');
		params.set('teleConId', consults._myApptId);
		doPost('spring/telephone_consults', function (p_serverData){
			try {
				popup.fill(p_serverData, 'Change Callback Number' );
			} catch (ex) {
				alert('error in notes popup::' + ex.message);
				throw (ex);
			}
		}, params );
		return (false);
	}
	
	/**
	 * open the consult record when the button is pressed
	 */
	, open: function(e) {
		var params = new Hash();
		params.set('kind','open');
		if (null == consults._myApptId) {
			alert('No telephone consult selected');
			return false;
		}
		params.set('apptId', consults._myApptId);
		doPost('spring/telephone_consults', function (p_serverData) {
			try {
				popup.fill(p_serverData, 'Telephone Consult' );
			} catch (ex) {
				alert('error opening cancel telephone_consults popup::' + ex.message);
				throw (ex);
			}
		} , params );
		return false;
	}
	
	/**
	 * finish the remove and update the server
	 */
	, doneRemove: function (event) {
		try {
			popup.close();
			consults._myApptId = null;
			consults.doUpdate(null, consults);
		} catch (ex) {
			alert('error closing remove::' + ex.message);
			throw (ex);
		}
	}
	
	/**
	 * commit the action of removing the consult
	 */
	, removeCompleted: function (event) {
		var postParams = FormCtl.buildPostParams($('removeTeleConFrm'));
		postParams.set('kind', 'removeComplete');
		doPost('spring/telephone_consults', function (p_serverData) {
			try {
				popup.fill(p_serverData, 'Confirmation' );
			} catch (ex) {
				alert('error opening cancel telecon popup::' + ex.message);
				throw (ex);
			}
		} , postParams );
		return (false);
	}
	
	/**
	 * do the action of removing a consult.  this is the begining of a two
	 * parter
	 */
	, remove: function(e){
		var params = new Hash();
		params.set('kind','remove');
		if (null == consults._myApptId) {
			alert('No telephone consult selected');
			return false;
		}
		params.set('apptId', consults._myApptId);
		doPost('spring/telephone_consults', function (p_serverData) {
				try {
					popup.fill(p_serverData, 'Cancel Telephone Consult' );
				} catch (ex) {
					alert('error opening cancel telephone_consults popup::' + ex.message);
					throw (ex);
				}
			} , params );
		return false;
	}
	
	/**
	 * begin the process adding a consult
	 */
	, add: function (e) {
		calActionsBck.setSearch('Add Appointment', 'spring/telephone_consults?kind=add&patient_id=');
	}

	/**
	 * do part two of the process for adding an appointment.  this will pop the
	 * Telecon Entry form
	 */
	, addPt2: function (e) {
		this._poster (e, 'newTeleConFrm', 'addPt2', 'Telecon Entry');
		return (false);
	}
	
	/**
	 * open the record by calling the server rand poping the window
	 */
	, update: function (e) {
		this._poster (e, 'teleConEntryFrm', 'update', 'Updates Confirmation');
		return (false);
	}
	
	/**
	 * this is the end of the add process, or when the user opens the
	 * record.  whatever is set here is how it will be recorded on the server
	 */
	, updateDone: function (event) {
		try {
			popup.close();
			consults.doUpdate(null, consults);
		} catch (ex) {
			alert('error closing popup::' + ex.message);
			throw (ex);
		}
	}

	/**
	 * this is a utility function for re-use of the process of simply
	 * taking the server results and loading them in the popup
	 */
	, _poster: function (e, p_formId, p_kindName, p_popupHandle) {
		var postParams = FormCtl.buildPostParams($(p_formId));
		postParams.set('kind', p_kindName);
		doPost('spring/telephone_consults', 
				function (p_serverData) {
			try {
				popup.fill(p_serverData, p_popupHandle );
			} catch (ex) {
				alert('error in teleCon poster::' + ex.message);
				throw (ex);
			}
		} , postParams );
		return (false);
	}
	
}


/**
 * this is a hook function passed to the search module so that the results 
 * go into the popup rather than the main content frame
 */
var calActionsBck = {
		
		/**
		 * this is the way we re-use the search module in the popup
		 * by setting a method on the search control
		 */
	setSearch: function (p_handle, p_urlStem) {
		doGet('WebContent/public/templates/popup/patientSearch.jsp'
				, function (p_serverData) {
					try {
						SearchCtl.initContent();
						SearchCtl.popupFiller = function (p_patientId) {
							doGet(p_urlStem + p_patientId, function (p_serverData) {
								try {
									popup.fill(p_serverData, p_handle );
								} catch (ex) {
									alert('error opening patient search popup::' + ex.message);
									throw (ex);
								}
							});
						}
						popup.fill(p_serverData, 'Patient Search' );
					} catch (ex) {
						alert('error opening patient search popup::' + ex.message);
						throw (ex);
					}
				} 
		);
		return (false);
	}


}

