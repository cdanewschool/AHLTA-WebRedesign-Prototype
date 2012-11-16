/*
	UIZE JAVASCRIPT FRAMEWORK 2010-01-24

	http://www.uize.com/reference/Uize.Widget.Dialog.Picker.Date.html
	Available under MIT License or GNU General Public License -- http://www.uize.com/license.html
*/
Uize.module({name:'Uize.Widget.Dialog.Picker.Date',required:'Uize.Widget.Calendar',builder:function(e_a){var e_b=e_a.subclass();e_b.set({valueWidgetClass:Uize.Widget.Calendar,pipedProperties:['maxValue','minValue']});return e_b;}});