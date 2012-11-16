/*
	UIZE JAVASCRIPT FRAMEWORK 2010-01-24

	http://www.uize.com/reference/Uize.Widget.Flip.html
	Available under MIT License or GNU General Public License -- http://www.uize.com/license.html
*/
Uize.module({name:'Uize.Widget.Flip',required:'Uize.Fade',builder:function(c_a){var c_b=c_a.subclass(function(){this.c_c='idle';this.fade=new Uize.Fade({duration:400});}),c_d=c_b.prototype;c_d.changeContent=function(c_e,c_f){var c_g=this;if(c_e!=c_g.c_h){c_g.c_h=c_e;c_g.c_c='out';c_g.set({c_f:c_f});c_g.fade.start({startValue:0,endValue:c_g.c_f=='down'?0-c_g.c_i:c_g.c_i-0,acceleration:1,deceleration:0});}};c_d.wireUi=function(){var c_g=this;if(!c_g.isWired){c_g.fade.wire({'Changed.value':function(){c_g.setNodeStyle('',{top:Math.round(c_g.fade)})},Done:function(){if(c_g.c_c=='out'){c_g.setNodeInnerHtml('',c_g.c_h);c_g.fade.set({startValue:c_g.c_f=='down'?c_g.c_i-0:0-c_g.c_i,endValue:0,acceleration:0,deceleration:1});c_g.c_c='in';c_g.fade.start();c_g.fire('Content Changed');}else if(c_g.c_c=='in'){c_g.c_c='idle';c_g.fire('Updated');}}});c_a.prototype.wireUi.call(c_g);}};c_b.registerProperties({c_f:{name:'direction',value:'down'},c_i:{name:'offset',value:'20'}});return c_b;}});