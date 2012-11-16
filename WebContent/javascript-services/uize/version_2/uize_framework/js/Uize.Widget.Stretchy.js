/*
	UIZE JAVASCRIPT FRAMEWORK 2010-01-24

	http://www.uize.com/reference/Uize.Widget.Stretchy.html
	Available under MIT License or GNU General Public License -- http://www.uize.com/license.html
*/
Uize.module({name:'Uize.Widget.Stretchy',required:['Uize.Node','Uize.Fade'],builder:function(c_a){var c_b=true,c_c=false,c_d=Uize.Node;var c_e=c_a.subclass(null,function(){var c_f=this;c_f.fade=new Uize.Fade({deceleration:1,duration:500,quantization:1});}),c_g=c_e.prototype;c_g.wireUi=function(){var c_f=this;if(!c_f.isWired){var c_h=c_f.getNode(),c_i=c_f.getNode('short'),c_j=c_f.getNode('long'),c_k=c_d.getCoords(c_i).height,c_l=0;c_m=c_i;c_d.setStyle(c_h,{height:c_d.getCoords(c_h).height,overflow:'hidden'});c_d.setStyle([c_i,c_j],{position:'absolute',top:0,left:0});c_f.fade.wire({'Changed.value':function(){c_d.setStyle(c_h,{height:c_f.fade});},Done:function(){if(c_m==c_i){c_f.displayNode(c_j,c_c);c_f.displayNode(c_i);}}});function c_n(){c_f.displayNode(c_i,c_c);c_f.displayNode(c_j);c_l=c_l||c_d.getCoords(c_j).height;c_m=c_j;c_f.fade.start({startValue:c_k,endValue:c_l});}function c_o(){c_m=c_i;c_l=c_l||c_d.getCoords(c_j).height;if(!c_k){c_f.displayNode(c_i);c_k=c_d.getCoords(c_i).height;
c_f.displayNode(c_i,c_c);}c_f.fade.start({startValue:c_l,endValue:c_k});}c_f.wireNode('expand','click',c_n);c_f.wireNode('contract','click',c_o);c_a.prototype.wireUi.call(c_f);}};return c_e;}});