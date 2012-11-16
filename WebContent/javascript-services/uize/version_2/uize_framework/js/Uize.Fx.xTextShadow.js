/*
	UIZE JAVASCRIPT FRAMEWORK 2010-01-24

	http://www.uize.com/reference/Uize.Fx.xTextShadow.html
	Available under MIT License or GNU General Public License -- http://www.uize.com/license.html
*/
Uize.module({name:'Uize.Fx.xTextShadow',required:'Uize.Color',builder:function(_a){var _b=function(){};for(var _c in{_d:1});_b._d=function(_e){var _f=[];for(var _g= -1,_h=_e.length,_i;++_g<_h;)_f.push((_i=_e[_g]).offsetX+_i.offsetXUnit+' '+_i.offsetY+_i.offsetYUnit+('blurRadius'in _i?(' '+_i.blurRadius+_i.blurRadiusUnit):'')+('color'in _i?(' '+Uize.Color.to(_i.color,'#hex')):''));return _f.join(',');};_a.defineStylePropertiesProfile({test:'textShadow',decoder:function(_e){if(Uize.isArray(_e))_e=_e.join(',');var _j=[],_k='(#[0-9a-f]{1,6}|(?:rgba?|hsla?)\\s*\\(.+?\\)|[a-z]+)?',_l='(?:(-?(?:\\d\\.?|\\.\\d)\\d*)(em|ex|px|in|cm|mm|pt|pc|))',_m='\\s+',_n='\\s*',_o=new RegExp('(?:^|)'+_n+'(?:'+_k+_m+_l+_m+_l+'(?:'+_m+_l+')?'+'|'+_l+_m+_l+'(?:'+_m+_l+')?'+'(?:'+_m+_k+')?'+')'+_n+'(?:$|,)','g'),_p;while(_p=_o.exec(_e)){var _q=_p[8],_r=_q?8:2,_i={offsetX:+_p[_r],offsetXUnit:_p[_r+1]||'px',offsetY:+_p[_r+2],offsetYUnit:_p[_r+3]||'px'},_s=_p[_q?14:1],_t=_p[_r+4];if(_s)_i.color=Uize.Color.to(_s,'RGB array');if(_t){
_i.blurRadius= +_t;_i.blurRadiusUnit=_p[_r+5]||'px';}_j.push(_i);}return _j;},encoderExpression:'Uize.Fx.xTextShadow.'+_c+'(VALUE)'});return _b;}});