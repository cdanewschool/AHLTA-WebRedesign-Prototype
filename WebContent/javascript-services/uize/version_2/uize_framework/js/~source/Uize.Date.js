/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : Uize.Date Package
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2004-2010 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/

/*ScruncherSettings Mappings="=" LineCompacting="TRUE"*/

/* Module Meta Data
	type: Package
	importance: 5
	codeCompleteness: 90
	testCompleteness: 0
	docCompleteness: 100
*/

/*?
	Introduction
		The =Uize.Date= module provides methods for working with dates, including converting time to different units, encoding / decoding dates in =ISO 8601=, etc.

		*DEVELOPERS:* `Chris van Rensburg`

		In a Nutshell
			The =Uize.Date= module is a package under the =Uize= namespace, providing a suite of utility methods for working with dates.

			ISO 8601
				Methods of the =Uize.Date= module that accept date values for parameters allow such date values to be specified as strings in =ISO 8601= format.

				[[http://en.wikipedia.org/wiki/ISO_8601][ISO 8601]] is an international standard for the representation of dates. A key characteristic of this format is its ordering of components of a date from most significant (year) to least significant (day). When dates in this format are used in file names, titles, or otherwise used to construct alphanumeric strings, sorting such strings can have the effect of sorting the strings chronologically as well.

				The =Uize.Date= module supports parsing from and serializing to the most typical and simple of the =ISO 8601= standard's many formatting options, namely the big-endian all-numeric date notation =YYYY-MM-DD=. JavaScript's built-in =Date= object does not support parsing dates in =ISO 8601= format. When having date strings in this format, the =Uize.Date.resolve= static method can be used to produce =Date= instances set to the correct date. Consider the following example...

				WRONG! WRONG! WRONG!
				.........................................................................
				var myDate = new Date ('2009-09-27');  // produces an invalid date object
				.........................................................................

				CORRECT
				..............................................
				var myDate = Uize.Date.resolve ('2009-09-27');
				..............................................

				As mentioned, dates in ISO 8601 format can be used with methods of the =Uize.Date= module that accept dates as parameters. Consider the following example...

				EXAMPLE
				................................................
				Uize.Date.getRangeAround ('2009-01-10','month');
				................................................

				The statement in the above example would produce a =dateRangeOBJ= value representing the month around January 10th, 2009.
*/

Uize.module ({
	name:'Uize.Date',
	builder:function () {
		/*** Variables for Scruncher Optimization ***/
			var _package = function () {};

		/*** Utility Functions ***/
			function _twoDigit (_value) {return (_value < 10 ? '0' : '') + _value}

		/*** Public Static Methods ***/
			var _unitsToMsFactorMap = {
				ms:1,               // canonical unit
				seconds:1000,       // 1000 ms per second
				minutes:60000,      // 60 seconds per minute
				hours:3600000,      // 60 minutes per hour
				days:86400000,      // 24 hours per day
				weeks:604800000,    // 7 days per week
				months:2629743840,  // 365.2422 days per month (from 365.2422 days per year)
				years:31556926080   // 12 months per year
			};
			var _convert = _package.convert = function (_timeValue,_timeUnit,_newTimeUnit) {
				/* NOTES: first convert to the canonical unit ms, then convert to target unit */
				return _timeValue * _unitsToMsFactorMap [_timeUnit + ''] / _unitsToMsFactorMap [_newTimeUnit + ''];
				/*?
					Static Methods
						Uize.Date.convert
							Converts the specified time in the specified time unit to a different specified time unit.

							SYNTAX
							....................................................................................
							convertedTimeFLOAT = Uize.Date.convert (timeFLOAT,timeUnitSTR,convertedTimeUnitSTR);
							....................................................................................

							This methods allows you to convert from days to milliseconds, seconds to years, years to hours, hours to weeks, months to hours, or from any one of the supported time units to another.

							TIME UNITS
							The value specified for the =timeUnitSTR= and =convertedTimeUnitSTR= parameters can be any one of:  =ms=, =seconds=, =minutes=, =hours=, =days=, =weeks=, =months=, =years=.

							EXAMPLES
							............................................................
							var
								timeInDays = Uize.Date.convert (18287659,'ms','days'),
								timeInHours = Uize.Date.convert (15306,'seconds','hours'),
								timeInWeeks = Uize.Date.convert (6,'months','weeks')
							;
							............................................................

							NOTES
							- any parameter of this method can be an object that implements a =valueOf= interface (such as an instance of a =Uize= subclass that implements the =value= set-get property)
				*/
			};

			var _resolve = _package.resolve = function (_date,_default) {
				return (
					_date != null && _date != ''
						? (typeof _date == 'string' ? _package.fromIso8601 (_date) || new Date (_date) : _date)
						: _default === undefined ? new Date : _default
				);
				/*?
					Static Methods
						Uize.Date.resolve
							Resolves the specified date to a =Date= object instance and returns that instance.

							SYNTAX
							...........................................
							dateOBJ = Uize.Date.resolve (dateSTRorOBJ);
							...........................................

							The date to resolve can be specified using the =dateSTRorOBJ= value type. When the specified date is already an instance of the =Date= object, then that instance is simply returned.

							This method can be useful when implementing other methods, to give them flexibility in the manner in which dates can be specified for them. Resolving dates means that your code can be sure to be dealing with =Date= object instances, and can then have a canonical implementation when dealing with dates.

							VARIATION 1
							..............................................................
							dateOBJ = Uize.Date.resolve (dateSTRorOBJ,defaultDateANYTYPE);
							..............................................................

							When the optional =defaultDateANYTYPE= parameter is specified, the value of this parameter will be returned by the =Uize.Date.resolve= method when the value specified for the =dateSTRorOBJ= parameter is =''= (empty string), =null=, or =undefined=. This allows you to resolve a date with a default other than the date at the time that the =Uize.Date.resolve= method is called. Note that the =value= of the =defaultDateANYTYPE= parameter is not itself resolved to a date - its value will be returned as is. So, if you want a =Date= object instance to be the default value for the resolved date, provide the default as a =Date= object instance.

							VARIATION 2
							...............................
							dateOBJ = Uize.Date.resolve ();
							...............................

							When no =dateSTRorOBJ= parameter is specified, or if an empty string or the value =null= is specified for this parameter, then a fresh =Date= object instance (ie. now) will be returned.

							NOTES
							- when the value =''= (empty string), =null=, or =undefined= is specified for the =dateSTRorOBJ= parameter, and when no value is specified for the =defaultDateANYTYPE= parameter, then this parameter will be defaulted to the date at the time that the method is called (today's date, essentially)
				*/
			};

			_package.equal = function (_date1,_date2,_precision) {
				return _package.inRange (_date1,_package.getRangeAround (_date2,_precision || 'day'));
				/*?
					Static Methods
						Uize.Date.equal
							Returns a boolean, indicating whether or not the two specified dates can be considered equal, according to the specified level of precision / accuracy.

							SYNTAX
							............................................................................
							datesEqualBOOL = Uize.Date.equal (date1STRorOBJ,date2STRorOBJ,precisionSTR);
							............................................................................

							You can use this method to easily test if two dates exist together within the same logical date range. For example, you can test to see if two dates are in the same week, the same month, the same quarter of the year, the same decade, etc. Consider the following example...

							EXAMPLE
							.....................................................................................
							Uize.Data.equal ('2009/09/10 18:19:25','2009/08/01 01:51:47','hour');        // false
							Uize.Data.equal ('2009/09/10 18:19:25','2009/08/01 01:51:47','day');         // false
							Uize.Data.equal ('2009/09/10 18:19:25','2009/08/01 01:51:47','week');        // false
							Uize.Data.equal ('2009/09/10 18:19:25','2009/08/01 01:51:47','month');       // false
							Uize.Data.equal ('2009/09/10 18:19:25','2009/08/01 01:51:47','quarter');     // true
							Uize.Data.equal ('2009/09/10 18:19:25','2009/08/01 01:51:47','year');        // true
							Uize.Data.equal ('2009/09/10 18:19:25','2009/08/01 01:51:47','decade');      // true
							Uize.Data.equal ('2009/09/10 18:19:25','2009/08/01 01:51:47','century');     // true
							.....................................................................................

							Values specified for the =date1STRorOBJ= and =date2STRorOBJ= parameters are of the =dateSTRorOBJ= value type. The values that can be specified for the =precisionSTR= parameter are all the values that can be specified for the =rangeSizeSTR= parameter of the =Uize.Date.getRangeAround= method (eg. ='minute'=, ='hour'=, ='am/pm'=, ='week'=, ='quarter'=, ='decade'=, etc.).

							MIND THE GAP

							Don't be suckered into thinking that two dates like those shown in the example below should be considered equal when compared with precision down to the second.

							.................................................................................
							Uize.Data.equal ('2009/09/10 18:19:25','2008/09/10 18:19:25','second');  // false
							.................................................................................

							Yes, the hours, minutes, and seconds of the two dates are identical, but they're a full year apart. So, they can't be considered equal down to a second in accuracy. In fact, they can't even be considered equal down to a year in accuracy.

							VARIATION 1
							...............................................................
							datesEqualBOOL = Uize.Date.equal (date1STRorOBJ,date2STRorOBJ);
							...............................................................

							When no =precisionSTR= parameter is specified, the value ='day'= will be used as the default for this parameter. This default provides a convenient way of just testing if two dates are for the same day of the same month of the same year, without regard to hours, minutes, seconds, or milliseconds. This is a typical way to compare two dates, such as testing if a particular date is someone's birthday, or a national holiday, etc.

							EXAMPLE
							.................................................................................
							Uize.Date.equal ('2009/09/10 18:19:25','2009/09/10 12:30:10');  // produces true
							Uize.Date.equal ('2009/09/10 18:19:25','2009/09/09 18:19:25');  // produces false
							.................................................................................

							VARIATION 2
							..............................................
							todayIsBOOL = Uize.Date.equal (date1STRorOBJ);
							..............................................

							When no =date2STRorOBJ= parameter is specified, then the date at the time that the =Uize.Date.equal= method is called will be used as the default for this parameter. Combined with the sensible defaulting of the =precisionSTR= parameter, this shorthand provides a convenient way ot testing if today's date is a particular date. Consider a few examples...

							EXAMPLES
							...........................................................
							isTodayHalloween2009 = Uize.Date.equal ('2009-10-31');
							isTodayChristmas2010 = Uize.Data.equal ('2009-12-25');
							isTodayStartOfRamadan2010 = Uize.Date.equal ('2010-08-11');
							...........................................................

							Specifying the value =null= or =''= (empty string) for the =date2STRorOBJ= parameter has the same effect as omitting this parameter.

							NOTES
							- see the related =Uize.Date.getRangeAround= and =Uize.Date.inRange= static methods
				*/
			};

			_package.toIso8601 = function (_date) {
				return (
					(_date = _resolve (_date)).getFullYear () + '-' +
					_twoDigit (_date.getMonth ()) + '-' +
					_twoDigit (_date.getDate ())
				);
				/*?
					Static Methods
						Uize.Date.toIso8601
							Returns a string, representing the specified date in =ISO 8601= format (YYYY-MM-DD).

							SYNTAX
							....................................................
							dateIso8601STR = Uize.Date.toIso8601 (dateSTRorOBJ);
							....................................................

							The date to be formatted in the =ISO 8601= format can be specified using the =dateSTRorOBJ= value type.

							VARIATION
							........................................
							dateIso8601STR = Uize.Date.toIso8601 ();
							........................................

							When no =dateSTRorOBJ= parameter is specified, this method will return the current date in =ISO 8601= format.

							NOTES
							- see also the companion =Uize.Date.fromIso8601= static method
							- compare to the =Uize.Date.toPretty= static method
							- when the value =''= (empty string), =null=, or =undefined= is specified for the =dateSTRorOBJ= parameter, then this parameter will be defaulted to the date at the time that the method is called (today's date, essentially)
				*/
			};

			_package.fromIso8601 = function (_dateIso8601) {
				var
					_yearMonthDayMatch = _dateIso8601.match (/(\d{2,})-(\d\d?)-(\d\d?)/),
					_date
				;
				if (_yearMonthDayMatch) {
					_date = new Date;
					_date.setYear (_yearMonthDayMatch [1]);
					_date.setDate (1);
						/* WORKAROUND:
							This is needed in order to avoid an odd issue that only occurs after the 28th of every month. Basically, because the Date object has the current day set, if you set the month to a month in which that day is not valid, the Date object rolls the month over to the next month. This is, obviously, not what we desire in this instance. By first setting the day to 1, we avoid tripping on this issue.
						*/
					_date.setMonth (_yearMonthDayMatch [2] - 1);
					_date.setDate (_yearMonthDayMatch [3]);
					_date.setHours (0,0,0,0);
				}
				return _date;
				/*?
					Static Methods
						Uize.Date.fromIso8601
							Converts the specified =ISO 8601= format (YYYY-MM-DD) date string and returns the date as a =Date= object instance.

							SYNTAX
							.................................................
							dateOBJ = Uize.Date.fromIso8601 (dateIso8601STR);
							.................................................

							If the date specified by the =dateIso8601STR= parameter is not in the =ISO 8601= format, then this method will return the value =undefined=.

							EXAMPLES
							..................................................................
							Uize.Date.fromIso8601 ('1981-01-12');       // 12th January 1981
							Uize.Date.fromIso8601 ('99-6-29');          // 29th June 1999
							Uize.Date.fromIso8601 ('2001-09-11');       // 11th September 2001
							Uize.Date.fromIso8601 ('2008-11-04');       // 4th November 2008
							Uize.Date.fromIso8601 ('Fri Jul 16 2006');  // undefined
							..................................................................

							NOTES
							- see also the companion =Uize.Date.toIso8601= static method
				*/
			};

			_package.format = _package.toPretty = function (_date,_format) {
				_date = _resolve (_date);
				var
					_fullYear = _date.getFullYear (),
					_monthNo = _date.getMonth () + 1,
					_monthName = _monthNames [_monthNo - 1],
					_hourNo = _date.getHours (),
					_dayNo = _date.getDate (),
					_dayNoMod10 = _dayNo % 10,
					_dayNoSuffix = (_dayNoMod10 > 3 || Math.floor (_dayNo / 10) % 10 == 1) ? 'th' : ['th','st','nd','rd'] [_dayNoMod10],
					_dayName = _dayNames [_date.getDay ()],
					_isPm = _hourNo > 11,
					_h12 = (_hourNo - _isPm && 11) || 12,
					_minutes = _date.getMinutes (),
					_seconds = _date.getSeconds ()
				;
				return Uize.substituteInto (
					_format || '{dayName}, {dayNo}{dayNoSuffix} {monthName} {YYYY}',
					{
						date:_date,
						YYYY:_fullYear,
						YY:(_fullYear + '').slice (-2),
						MM:_twoDigit (_monthNo),
						monthNo:_monthNo,
						monthName:_monthName,
						shortMonthName:_monthName.slice (0,3),
						DD:_twoDigit (_dayNo),
						dayNo:_dayNo,
						dayNoSuffix:_dayNoSuffix,
						dayName:_dayName,
						shortDayName:_dayName.slice (0,3),
						hh:_twoDigit (_hourNo),
						h12:_h12,
						hh12:_twoDigit (_h12),
						mm:_twoDigit (_minutes),
						minutes:_minutes,
						ss:_twoDigit (_seconds),
						seconds:_seconds,
						ampm:_isPm ? 'pm' : 'am'
					},
					'{KEY}'
				);
				/*?
					Static Methods
						Uize.Date.format
							Returns a string, being the specified date formatted using the specified formatting.

							SYNTAX
							....................................................
							dateStr = Uize.Date.format (dateSTRorOBJ,formatSTR);
							....................................................

							The date to be formatted can be specified using the =dateSTRorOBJ= value type. The format to be used is specified as a string, where all tokens supported by the =Uize.Date.format= method (enclosed in the curly braces ={= and =}=) are replaced by values derived from the specified date. Consider the following example...

							EXAMPLE
							................................................................................
							Uize.Date.format ('Thu Sep 10 2009','{YYYY}/{MM}/{DD}');  // RESULT : 2008/02/29
							................................................................................

							In the above example, the date value ='Thu Sep 10 2009'= is being formatted using the format string ='{YYYY}/{MM}/{DD}'= to produce the result ='2008/02/29'=.

							VALID TOKENS

							- ={date}= - the full date, as serialized by JavaScript's built-in =Date= object
							- ={YYYY}= - the full year, represented using four digits
							- ={YY}= - the year, represented using only two digits (ie. only year of century)
							- ={MM}= - the month number, represented always using two digits (ie. leading =0= if necessary)
							- ={monthNo}= - the month number, starting at =1= for January
							- ={monthName}= - the month name
							- ={shortMonthName}= - the first three characters of the month name (=Jan=, =Feb=, =Mar=, =Apr=, etc.)
							- ={DD}= - the day number, represented always using two digits (ie. leading =0= if necessary)
							- ={dayNo}= - the day number, in the range of =1= to =28=, =29=, =30=, or =31= (depending on the month and year)
							- ={dayNoSuffix}= - the day number suffix (=st=, =nd=, =rd=, =th=). This token can be combined with the ={dayNo}= token, as in ={dayNo}{dayNoSuffix}= to produce formatted results like =1st=, =2nd=, =3rd=, etc.
							- ={dayName}= - the day name (eg. =Monday=, =Tuesday=, =Wednesday=, =Thursday=, etc.)
							- ={shortDayName}= - the first three characters of the day name (eg. =Mon=, =Tue=, =Wed=, =Thu=, etc.)
							- ={hh}= - the hour in military time (0-23), represented always using two digits (ie. leading =0= if necessary)
							- ={h12}= - the hour in 12-hour notation (eg. would be =1= for both =1am= and =1pm=)
							- ={hh12}= - the hour in 12-hour notation, represented always using two digits (ie. leading =0= if necessary)
							- ={mm}= - the minutes, represented always using two digits (ie. leading =0= if necessary)
							- ={minutes}= - the minutes
							- ={ss}= - the seconds, represented always using two digits (ie. leading =0= if necessary)
							- ={seconds}= - the seconds
							- ={ampm}= - =am= or =pm=, depending on whether the hour is morning or afternoon

							MORE EXAMPLES
							......................................................................................
							var date = 'Thu Sep 10 2009 18:19:25';

							Uize.Date.format (date,'{YY}-{MM}-{DD}');
								// RESULT : 08-02-29

							Uize.Date.format (date,'{YYYY}/{MM}/{DD}');
								// RESULT : 2008/02/29

							Uize.Date.format (date,'{dayNo} {shortMonthName} {YYYY}');
								// RESULT : 29 Feb 2009

							Uize.Date.format (date,'{dayNo}{dayNoSuffix} {monthName} {YYYY}');
								// RESULT : 29th February 2009

							Uize.Date.format (date,'{monthName} {dayNo}{dayNoSuffix}, {YYYY} ({h12}:{mm}{ampm})');
								// RESULT : February 29th, 2009 (6:19pm)

							Uize.Date.format (date,'{YYYY}/{MM}/{DD} ({hh}:{mm}:{ss})');
								// RESULT : 2008/02/29 (18:19:25)

							Uize.Date.format (date,'{minutes} minutes and {seconds} seconds past {h12}{ampm}');
								// RESULT : 19 minutes and 25 seconds past 6pm

							Uize.Date.format (date,'{monthNo}/{dayNo}/{YYYY} is {YYYY}-{MM}-{DD} in ISO 8601');
								// RESULT : 2/29/2008 is 2008-02-29 in ISO 8601
							......................................................................................

							The above example shows how the date value ='Thu Sep 10 2009 18:19:25'= would be formatted using a variety of wildly different format strings.

							A Bad Date
								The =Uize.Date.format= method doesn't care which tokens are used or how they are used.

								Insufficient tokens could be used to fully convey the date. The same token could be used multiple times, either to produce silly results or to express a date in multiple ways in the same formatted result. The wrong tokens could be used in the wrong places to produce incorrect representations of a date. Bottom line: specify a silly format string and you'll get a silly result.

							VARIATION
							..........................................
							dateStr = Uize.Date.format (dateSTRorOBJ);
							..........................................

							When no =formatSTR= parameter is specified, then the value for this parameter will be defaulted to ='{dayName}, {dayNo}{dayNoSuffix} {monthName} {YYYY}'=. This is equivalent to using the =Uize.Date.toPretty= static method.

							NOTES
							- see the related =Uize.Date.toIso8601= and =Uize.Date.toPretty= static methods

						Uize.Date.toPretty
							Returns a string, representing a "pretty" formatting of the specified date.

							SYNTAX
							..................................................
							prettyDateSTR = Uize.Date.toPretty (dateSTRorOBJ);
							..................................................

							The date to be pretty-formatted can be specified using the =dateSTRorOBJ= value type. A pretty-formatted date follows the syntax...

							.........................................................................
							[full day name], [day of month][day suffix] [full month name] [full year]
							.........................................................................

							Following are some examples of pretty-formatted dates...

							EXAMPLES
							............................
							Friday, 15th December 2006
							Tuesday, 23rd February 1999
							Friday, 4th July 2008
							Thursday, 1st April 2004
							Saturday, 2nd September 2006
							............................

							NOTES
							- see the related =Uize.Date.format= and =Uize.Date.toIso8601= static methods
							- when the value =''= (empty string), =null=, or =undefined= is specified for the =dateSTRorOBJ= parameter, then this parameter will be defaulted to the date at the time that the method is called (today's date, essentially)
				*/
			};

			_package.getRangeAround = function (_date,_rangeSize) {
				var
					_minValue = new Date (_date = _resolve (_date)),
					_maxValue = new Date (_minValue)
				;
				function _setBounds (_boundsMethod,_boundsMin,_boundsMax) {
					_minValue [_boundsMethod] (_boundsMin);
					_maxValue [_boundsMethod] (_boundsMax);
				}
				function _setIntraBounds (_boundsComponent,_divisionSize) {
					var _divisionStart = Math.floor (_date ['get' + _boundsComponent] () / _divisionSize) * _divisionSize;
					_setBounds ('set' + _boundsComponent,_divisionStart,_divisionStart + _divisionSize - 1);
				}
				switch (_rangeSize || (_rangeSize = 'month')) {
					case 'millennium':
					case 'century':
					case 'decade':
						_setIntraBounds ('FullYear',_rangeSize == 'millennium' ? 1000 : _rangeSize == 'century' ? 100 : 10);
					case 'year':
					case 'quarter':
						_rangeSize == 'quarter' ? _setIntraBounds ('Month',3) : _setBounds ('setMonth',0,11);
					case 'month':
					case 'week':
						if (_rangeSize == 'week') {
							var _weekStartDate = _date.getDate () - _date.getDay ();
							_setBounds ('setDate',_weekStartDate,_weekStartDate + 6);
						} else {
							_setBounds ('setDate',1,_package.getDaysInMonth (_maxValue.getMonth (),_maxValue.getFullYear ()));
						}
					case 'day':
					case 'am/pm':
						_rangeSize == 'am/pm' ? _setIntraBounds ('Hours',12) : _setBounds ('setHours',0,23);
					case 'hour':
						_setBounds ('setMinutes',0,59);
					case 'minute':
						_setBounds ('setSeconds',0,59);
					case 'second':
						_setBounds ('setMilliseconds',0,999);
					// don't need to do anything for millisecond range size, since minValue should be the same as maxValue
				}
				return {minValue:_minValue,maxValue:_maxValue};
				/*?
					Static Methods
						Uize.Date.getRangeAround
							Returns an object, specifying the "neat" date range of the specified range size around the specified date.

							SYNTAX
							....................................................................
							dateRangeOBJ = Uize.Date.getRangeAround (dateSTRorOBJ,rangeSizeSTR);
							....................................................................

							This method can be used to obtain the date range for the week around a specified date, the month around a date, the quarter around a date, the year around a date, etc. The date range is specified by a =dateRangeOBJ= type value.

							rangeSizeSTR
								The =rangeSizeSTR= parameter is a string, specifying the size of the date range, where the following sizes are supported...

								'second'
									The second sized date range containing the specified date.

									EXAMPLE
									...............................................................
									Uize.Date.getRangeAround ('Thu Sep 10 2009 18:19:25','second');
									// minValue: Thu Sep 10 2009 18:19:25 (and 0 milliseconds)
									// maxValue: Thu Sep 10 2009 18:19:25 (and 999 milliseconds)
									...............................................................

								'minute'
									The minute sized date range containing the specified date.

									EXAMPLE
									...............................................................
									Uize.Date.getRangeAround ('Thu Sep 10 2009 18:19:25','minute');
									// minValue: Thu Sep 10 2009 18:19:00 (and 0 milliseconds)
									// maxValue: Thu Sep 10 2009 18:19:59 (and 999 milliseconds)
									...............................................................

								'hour'
									The hour sized date range containing the specified date.

									EXAMPLE
									.............................................................
									Uize.Date.getRangeAround ('Thu Sep 10 2009 18:19:25','hour');
									// minValue: Thu Sep 10 2009 18:00:00 (and 0 milliseconds)
									// maxValue: Thu Sep 10 2009 18:59:59 (and 999 milliseconds)
									.............................................................

								'am/pm'
									The half day sized date range containing the specified date.

									EXAMPLE
									..............................................................
									Uize.Date.getRangeAround ('Thu Sep 10 2009 18:19:25','am/pm');
									// minValue: Thu Sep 10 2009 12:00:00 (and 0 milliseconds)
									// maxValue: Thu Sep 10 2009 23:59:59 (and 999 milliseconds)
									..............................................................

								'day'
									The day sized date range containing the specified date.

									EXAMPLE
									............................................................
									Uize.Date.getRangeAround ('Thu Sep 10 2009 18:19:25','day');
									// minValue: Thu Sep 10 2009 00:00:00 (and 0 milliseconds)
									// maxValue: Thu Sep 10 2009 23:59:59 (and 999 milliseconds)
									............................................................

								'week'
									The week sized date range containing the specified date.

									EXAMPLE
									.............................................................
									Uize.Date.getRangeAround ('Thu Sep 10 2009 18:19:25','week');
									// minValue: Sun Sep 06 2009 00:00:00 (and 0 milliseconds)
									// maxValue: Sat Sep 12 2009 23:59:59 (and 999 milliseconds)
									.............................................................

								'month'
									The month sized date range containing the specified date.

									EXAMPLE
									..............................................................
									Uize.Date.getRangeAround ('Thu Sep 10 2009 18:19:25','month');
									// minValue: Tue Sep 01 2009 00:00:00 (and 0 milliseconds)
									// maxValue: Wed Sep 30 2009 23:59:59 (and 999 milliseconds)
									..............................................................

								'quarter'
									The quarter sized date range containing the specified date.

									EXAMPLE
									................................................................
									Uize.Date.getRangeAround ('Thu Sep 10 2009 18:19:25','quarter');
									// minValue: Wed Jul 01 2009 00:00:00 (and 0 milliseconds)
									// maxValue: Wed Sep 30 2009 23:59:59 (and 999 milliseconds)
									................................................................

								'year'
									The year sized date range containing the specified date.

									EXAMPLE
									.............................................................
									Uize.Date.getRangeAround ('Thu Sep 10 2009 18:19:25','year');
									// minValue: Thu Jan 01 2009 00:00:00 (and 0 milliseconds)
									// maxValue: Thu Dec 31 2009 23:59:59 (and 999 milliseconds)
									.............................................................

								'decade'
									The decade sized date range containing the specified date.

									EXAMPLE
									...............................................................
									Uize.Date.getRangeAround ('Thu Sep 10 2009 18:19:25','decade');
									// minValue: Sat Jan 01 2000 00:00:00 (and 0 milliseconds)
									// maxValue: Thu Dec 31 2009 23:59:59 (and 999 milliseconds)
									...............................................................

								'century'
									The century sized date range containing the specified date.

									EXAMPLE
									................................................................
									Uize.Date.getRangeAround ('Thu Sep 10 2009 18:19:25','century');
									// minValue: Sat Jan 01 2000 00:00:00 (and 0 milliseconds)
									// maxValue: Thu Dec 31 2099 23:59:59 (and 999 milliseconds)
									................................................................

								'millennium'
									The millennium sized date range containing the specified date.

									EXAMPLE
									...................................................................
									Uize.Date.getRangeAround ('Thu Sep 10 2009 18:19:25','millennium');
									// minValue: Sat Jan 01 2000 00:00:00 (and 0 milliseconds)
									// maxValue: Tue Dec 31 2999 23:59:59 (and 999 milliseconds)
									...................................................................

								'millisecond'
									The millisecond sized date range containing the specified date.

									EXAMPLE
									....................................................................
									Uize.Date.getRangeAround ('Thu Sep 10 2009 18:19:25','millisecond');
									// minValue: Thu Sep 10 2009 18:19:25 (and N milliseconds)
									// maxValue: Thu Sep 10 2009 18:19:25 (and N milliseconds)
									....................................................................

									SPECIAL CASE

									The millisecond sized date range is a special case, which is nevertheless useful in certain situations. Since milliseconds is the highest degree of precision in representing date values in JavaScript, when a millisecond sized date range is requested, the =minValue= and =maxValue= properties of the =dateRangeOBJ= object will be identifical to the value of the =dateSTRorOBJ= parameter. In other words, technically, the date range around a specific date that is only a millisecond big is where the upper and lower bounds of the range are the date itself.

							Using Date Ranges
								Using Date Ranges With Classes Supporting the Value Range Interface
									Because the value returned by the =Uize.Date.getRangeAround= method is an object containing =minValue= and =maxValue= properties, this object can be used to set the set-get properties for an instance of any class that implements the `Value Range Interface`.

									An example of this is the =Uize.Widget.Picker.Date= class, which lets the user select a date inside a popup date dialog.

									EXAMPLE
									................................................
									page.addChild (
										'datePickerThisWeek',
										Uize.Widget.Picker.Date,
										Uize.Date.getRangeAround (
											'',     // empty string for date means now
											'week'  // range size
										)
									);
									................................................

									In the above example, the date picker widget that is being added as a child of the page widget would let the user select a date in the current week. The result from the call to the =Uize.Date.getRangeAround= method is being supplied as the set-get property values for the =Uize.Widget.Picker.Date= instance. This works because the =Uize.Widget.Picker.Date= class implements =minValue= and =maxValue= set-get properties for constraining the range in which the user can select a date.

								Using Date Ranges With Other Uize.Date Methods
									Other methods of the =Uize.Date= module can accept date range objects as values for certain parameters.

									An example of this is the =Uize.Date.inRange= static method, which returns a boolean value indicating whether or not the specified date falls within the specified date range.

									EXAMPLE
									...................................................
									function dateIsThisWeek (date) {
										return Uize.Date.inRange (
											date,
											Uize.Date.getRangeAround (
												'',     // empty string for date means now
												'week'  // range size
											)
										);
									}
									...................................................

									In the above example, a =dateIsThisWeek= function is being defined. This function accepts a date as a parameter and then returns a boolean indicating whether or not this date is within the current week. It does this by getting the week sized date range around today's date by calling the =Uize.Date.getRangeAround= method. The resulting date range object is then supplied as the value of the =dateRangeOBJ= parameter for the =Uize.Date.inRange= method.

							NOTES
							- when the value =''= (empty string), =null=, or =undefined= is specified for the =dateSTRorOBJ= parameter, then this parameter will be defaulted to the date at the time that the method is called (today's date, essentially)
							- see the related =Uize.Date.inRange= static method
				*/
			};

			_package.inRange = function (_date,_range) {
				return (
					(_date = _resolve (_date)) >= _resolve (_range.minValue,0) &&
					_date <= _resolve (_range.maxValue,Infinity)
				);
				/*?
					Static Methods
						Uize.Date.inRange
							Returns a boolean, indicating whether or not the specified date is within the specified date range.

							SYNTAX
							............................................................
							inRangeBOOL = Uize.Date.inRange (dateSTRorOBJ,dateRangeOBJ);
							............................................................

							The date range is specified by a =dateRangeOBJ= type value.

							EXAMPLES
							..................................................................
							Uize.Date.inRange (             // produces the result false
								'2009/09/23 00:00:00',
								{minValue:'2009/09/23 00:00:01',maxValue:'2009/09/23 23:59:59'}
							);

							Uize.Date.inRange (             // produces the result true
								'2009/09/23 00:00:01',
								{minValue:'2009/09/23 00:00:01',maxValue:'2009/09/23 23:59:59'}
							);

							Uize.Date.inRange (             // produces the result true
								'2009/09/23 23:59:59',
								{minValue:'2009/09/23 00:00:01',maxValue:'2009/09/23 23:59:59'}
							);

							Uize.Date.inRange (             // produces the result false
								'2009/09/24 00:00:00',
								{minValue:'2009/09/23 00:00:01',maxValue:'2009/09/23 23:59:59'}
							);
							..................................................................

							Precision to the Millisecond
								It is important to note that the =Uize.Date.inRange= method considers all components of the boundary dates in the date range supplied to it.

								This includes the hours, minutes, seconds, and even milliseconds. Consider the example where you want to determine if a specified date is today or later. If you just specify the value =new Date= for the =minValue= property of the date range object, you may miss some dates that are today but whose time is before the time when the =new Date= value is created for the =minValue= property.

								What you can do in such cases is "snap" a date to a neat boundary using the =Uize.Date.getRangeAround= method. Then you can take only the =minValue= or =maxValue= property of the returned date range in order to produce a new date range that's missing one of its boundaries, as shown in the example below...

								EXAMPLE
								.............................................................
								function isTodayOrLater (date) {
									return Uize.Date.inRange (
										date,
										{minValue:Uize.Date.getRangeAround ('','day').minValue}
									);
								}
								.............................................................

								The call to the =Uize.Date.getRangeAround= method here produces a date range with a =minValue= that is at the start of today, and a =maxValue= that is at the end of today. Then we use just the =minValue= property to create a new date range that has no =maxValue=, and we supply this date range with no upper bound to the =Uize.Date.inRange= method.

							NOTES
							- see the related =Uize.Date.getRangeAround= static method
							- this method supports `Boundless Date Ranges`
							- when the value =''= (empty string), =null=, or =undefined= is specified for the =dateSTRorOBJ= parameter, then this parameter will be defaulted to the date at the time that the method is called (today's date, essentially)
				*/
			};

			_package.isLeapYear = function (_year) {
				return _year % 4 == 0 && (_year % 100 != 0 || _year % 400 == 0);
				/*?
					Static Methods
						Uize.Date.isLeapYear
							Returns a boolean, indicating whether or not the specified year is a leap year.

							SYNTAX
							................................................
							isLeapYearBOOL = Uize.Date.isLeapYear (yearINT);
							................................................

							EXAMPLES
							................................................................................
							Uize.Date.isLeapYear (2008);   // returns true, because 2008 is a leap year
							Uize.Date.isLeapYear (2009);   // returns false, because 2009 is not a leap year
							................................................................................

							NOTES
							- see the related =Uize.Date.getDaysInMonth= static method
				*/
			};

			_package.getDaysInMonth = function (_month,_year) {
				return 30 + ((2773 >> _month) & 1) - (_month == 1 && (2 - _package.isLeapYear (_year)));
				/* NOTE:
					2773 is 101011010101 in binary, which flags the 31 day months, and we use a binary shift right to "index" into the flags, with a binary and on 1 to mask out unwanted crud
				*/
				/*?
					Static Methods
						Uize.Date.getDaysInMonth
							Returns an integer, indicating the number of days in the specified month of the specified year.

							SYNTAX
							.............................................................
							daysInMonthINT = Uize.Date.getDaysInMonth (monthINT,yearINT);
							.............................................................

							The value of the =monthINT= parameter should be a number in the range of =0= to =11=, where =0= represents January, and =11= represents December.

							EXAMPLES
							...................................................................................
							Uize.Date.getDaysInMonth (1,2008);   // returns 29, because 2008 is a leap year
							Uize.Date.getDaysInMonth (1,2009);   // returns 28, because 2009 is not a leap year
							Uize.Date.getDaysInMonth (3,1876);   // returns 30 for April of any year
							Uize.Date.getDaysInMonth (11,1989);  // returns 31 for December of any year
							...................................................................................

							NOTES
							- see the related =Uize.Date.isLeapYear= static method
				*/
			};

			_package.isRecent = function (_date,_recencyWindowDays) {
				return Math.round (_convert (new Date - _resolve (_date),'ms','days')) <= _recencyWindowDays;
				/*?
					Static Methods
						Uize.Date.isRecent
							Returns a boolean, indicating whether or not the specified date is within the specified window of recency (as specified in days).

							SYNTAX
							......................................................................
							isRecentBOOL = Uize.Date.isRecent (dateSTRorOBJ,recencyWindowDaysINT);
							......................................................................

							The date to be tested for recency can be specified using the =dateSTRorOBJ= value type. This method can be useful for filtering content to highlight as new or recent, based upon release date.
				*/
			};

		/*** Public Static Properties ***/
			var
				_dayNames = _package.dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
					/*?
						Static Properties
							Uize.Date.dayNames
								An array of strings, representing the English names of the days of the week, starting with Sunday.

								SYNTAX
								...............................................
								dayNameSTR = Uize.Date.dayNames [dayOfWeekINT];
								...............................................

								EXAMPLE
								..............................................................
								var todaysDayName = Uize.Date.dayNames [(new Date).getDay ()];
								..............................................................

								In the above example, the variable =todaysDayName= would be left with the name of the day of the week during which the code is executed.

								NOTES
								- see also the companion =Uize.Date.monthNames= static property
					*/
				_monthNames = _package.monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
					/*?
						Static Properties
							Uize.Date.monthNames
								An array of strings, representing the English names of the months of the year, starting with January.

								SYNTAX
								.....................................................
								monthNameSTR = Uize.Date.monthNames [monthOfYearINT];
								.....................................................

								EXAMPLE
								....................................................................
								var todaysMonthName = Uize.Date.monthNames [(new Date).getMonth ()];
								....................................................................

								In the above example, the variable =todaysMonthName= would be left with the name of the month of the year during which the code is executed.

								NOTES
								- see also the companion =Uize.Date.dayNames= static property
					*/
			;

		/*?
			Value Types
				The following parameters are common to a number of methods and warrant separate, shared explanations...

				dateSTRorOBJ
					A string in =ISO 8601= format (YYYY-MM-DD), a =Date= object instance, or a string that can be parsed by the =Date= object.

					Methods accepting this value type for a parameter may resolve the value =''= (empty string), =null=, or =undefined= to the date at the time that the method is called (today's date, essentially), or they may provide an alternate defaulting behavior.

					EXAMPLES
					......................................................................................
					'Thu Sep 10 2009'             // string that can be parsed by JavaScript's Date object
					'2009-09-10'                  // ISO 8601
					new Date ('Thu Sep 10 2009')  // JavaScript Date object instance
					......................................................................................

					The above example are all valid ways to specify the same date using the =dateSTRorOBJ= value type.

				dateRangeOBJ
					An object, containing =minValue= and =maxValue= properties, where the value of these properties are of the type =dateSTRorOBJ=, and where the =minValue= property specifies the start of the date range, and the =maxValue= property specifies the end of the range.

					STRUCTURE
					.......................................................................
					{
						minValue:startDateSTRorOBJ,  // instance of JavaScript's Date object
						maxValue:endDateSTRorOBJ     // instance of JavaScript's Date object
					}
					.......................................................................

					Various methods deal with values of the =dateRangeOBJ= type. One example is the =Uize.Date.getRangeAround= method, which returns a =dateRangeOBJ= value specifying the "neat" date range of the specified range size around the specified date. Another example is the =Uize.Date.inRange= method, which returns a boolean, indicating whether or not the specified date is within the date range specified by a =dateRangeOBJ= value.

					Boundless Date Ranges
						Methods that accept a value of type =dateRangeOBJ= should treat the absence of a property specifying a value for a boundary, or specifying the value =null= or =undefined= for a boundary, as indicating that the date range is not bounded on that end of its range.

						So, specifying no value for the =minValue= property (or specifying the value =null= or =undefined=) would mean that the date range has no lower bound. Similarly, specifying no value for the =maxValue= property (or specifying the value =null= or =undefined=) would mean that the date range has no upper bound. Not specifying values for either of the =minValue= or =maxValue= properties would mean that the date range is unbounded - all dates would fall within such a date range.

						EXAMPLES
						.........................................................................
						// no upper bound

						Uize.Date.inRange ('2009-08-10',{minValue:'2009-09-01'});        // false
						Uize.Date.inRange ('2009-09-01',{minValue:'2009-09-01'});        // true
						Uize.Date.inRange ('2009-09-10',{minValue:'2009-09-01'});        // true


						// no lower bound

						Uize.Date.inRange ('2009-08-10',{maxValue:'2009-09-01'});        // true
						Uize.Date.inRange ('2009-09-01',{maxValue:'2009-09-01'});        // true
						Uize.Date.inRange ('2009-09-10',{maxValue:'2009-09-01'});        // false


						// no bound at all

						Uize.Date.inRange ('2009-09-10',{});                             // true
						Uize.Date.inRange ('2009-09-10',{minValue:null});                // true
						Uize.Date.inRange ('2009-09-10',{maxValue:null});                // true
						Uize.Date.inRange ('2009-09-10',{minValue:null,maxValue:null});  // true
						.........................................................................
		*/

		return _package;
	}
});

