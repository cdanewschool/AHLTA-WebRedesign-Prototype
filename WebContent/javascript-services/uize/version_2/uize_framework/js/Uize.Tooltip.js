/*
	UIZE JAVASCRIPT FRAMEWORK 2010-01-24

	http://www.uize.com/reference/Uize.Tooltip.html
	Available under MIT License or GNU General Public License -- http://www.uize.com/license.html
*/
Uize.module({name:'Uize.Tooltip',required:['Uize.Node','Uize.Fade'],builder:function(){var _a=function(){},_b=true,_c=false,_d=Uize.Node;var _e=Uize.getGuid(),_f=[],_g,_h=16;function _i(){_d.setAbsPos(_g,_d.getEventAbsPos(),_h);}function _j(_k){if(_k!=_g){if(_k){if(_g){_l.stop();_m();}_d.wire(document.body,'scroll',_i,_e);_d.wire(document.documentElement,'mousemove',_i,_e);_g=_k;_d.setStyle(_g,{position:'absolute',zIndex:5000,left:-50000,top:-50000});_d.display(_g);_i();}else{_l.get('duration')>0?_l.start():_m();}}else if(_k){_l.stop();_d.setOpacity(_g,1);}}_a.showTooltip=function(_k,_n){if(_k=_d.getById(typeof _k=='function'?_k():_k)){if(_n!==_c){_f.push(_k);}else{var _o=Uize.indexIn(_f,_k,_b);_o> -1&&_f.splice(_o,1);}_j(_f[_f.length-1]);}};_a.hideTooltip=function(_p){_a.showTooltip(_p,_c)};var _l=_a.fade=new Uize.Fade({duration:0});function _m(){_d.unwireEventsByOwnerId(_e);_d.display(_g,_c);_d.setOpacity(_g,1);_g=null;}_l.wire({'Changed.value':function(){_d.setOpacity(_g,1-_l.get('progress'))},Done:_m});
return _a;}});