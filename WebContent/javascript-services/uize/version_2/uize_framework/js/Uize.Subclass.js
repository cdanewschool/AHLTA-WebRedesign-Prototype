/*
	UIZE JAVASCRIPT FRAMEWORK 2010-01-24

	http://www.uize.com/reference/Uize.Subclass.html
	Available under MIT License or GNU General Public License -- http://www.uize.com/license.html
*/
Uize.module({name:'Uize.Subclass',builder:function(b_a){var b_b=b_a.subclass(null,function(b_c){var b_d=this;b_d.b_e=0;}),b_f=b_b.prototype;b_f.b_g=function(){var b_d=this;};b_f.publicInstanceMethod=function(){var b_d=this;};b_b.b_h=b_f.b_h=function(){};b_b.publicStaticInstanceMethod=b_f.publicStaticInstanceMethod=function(){};b_b.publicStaticMethod=function(){};b_b.registerProperties({b_i:'property1',b_j:{name:'property2',onChange:function(){},value:0}});return b_b;}});