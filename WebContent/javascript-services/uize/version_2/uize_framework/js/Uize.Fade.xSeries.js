/*
	UIZE JAVASCRIPT FRAMEWORK 2010-01-24

	http://www.uize.com/reference/Uize.Fade.xSeries.html
	Available under MIT License or GNU General Public License -- http://www.uize.com/license.html
*/
Uize.module({name:'Uize.Fade.xSeries',builder:function(c_a){c_b.getSeries=function(c_c){var c_d=this,c_e=[],c_f=Math.max(c_c-1,1);for(var c_g= -1;++c_g<c_c;){c_d.set({c_h:c_g/c_f});c_e.push(c_a.clone(c_d.valueOf()));}return c_e;};c_a.getSeries=function(c_i,c_j,c_c,c_k){return(new c_a(c_a.copyInto({startValue:c_i,endValue:c_j},c_k)).getSeries(c_c));};}});