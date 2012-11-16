/*
	UIZE JAVASCRIPT FRAMEWORK 2010-01-24

	http://www.uize.com/reference/Uize.Widget.Picker.html
	Available under MIT License or GNU General Public License -- http://www.uize.com/license.html
*/
Uize.module({name:'Uize.Widget.Picker',superclass:'Uize.Widget.FormElement',required:['Uize.Widget.Button','Uize.Node.Event'],builder:function(d_a){var d_b=d_a.subclass(null,function(){var d_c=this;function d_d(){d_c.blur();var d_e=d_c.children.selector.getNode()||d_c.getNode('input'),d_f=Uize.Node.getDimensions(d_e);function d_g(){d_c.d_h&&d_c.focus();}d_c.callInherited('useDialog')({widgetClassName:d_c.d_i,widgetProperties:d_b.copyInto({name:'dialog'+d_c.d_i.replace(/\./g,''),mooringNode:d_e,offsetX:d_f.width>>1,offsetY:d_f.height>>1},d_c.get(['value'].concat(d_c.d_j||[]))),submitHandler:function(d_k,d_l){d_c.set({value:d_k!=null?(d_c.d_m?d_c.d_m.call(d_c,d_k):d_k):''});d_l.keepOpen||d_g();},dismissHandler:d_g});}d_c.wire('Focus',function(){!d_c.d_h&&d_d()});d_c.wireNode('input','mousedown',function(d_l){if(!d_c.d_h){Uize.Node.Event.abort(d_l);d_d();}});d_c.addChild('selector',Uize.Widget.Button).wire('Click',d_d);}),d_n=d_b.prototype;d_b.registerProperties({d_i:'dialogWidgetClass',d_h:{
name:'allowManualEntry',value:true},d_j:'pipedProperties',d_m:'valueFormatter'});d_b.set({value:null});return d_b;}});