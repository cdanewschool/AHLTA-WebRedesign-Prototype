/*______________
|       ______  |   B U I L T     O N     U I Z E     F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |   This JavaScript application is developed using the object
|   /    / /    |   oriented UIZE JavaScript framework as its foundation.
|  /    / /  /| |
| /____/ /__/_| |    ONLINE : http://www.uize.com
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/

/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : UizeDotCom.Page.Example.library Library Module
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2009-2010 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/

/*?
	Introduction
		The =UizeDotCom.Page.Example.library= module is a library module that bundles together various JavaScript modules common to the example pages of the UIZE JavaScript Framework's Web site.

		*DEVELOPERS:* `Chris van Rensburg`
*/

Uize.module ({
	required:'UizeDotCom.Page.library',
	builder:function () {
		

Uize.module({name:'UizeDotCom.Page.Example',required:['Uize.Node','Uize.Url'],builder:function(e_a){var e_b=e_a.subclass(),e_c=e_b.prototype;e_c.wireUi=function(){var e_d=this;if(!e_d.isWired){e_d.wireNode('viewSource','click',function(){e_d.viewSource(location.href,'SOURCE CODE FOR &gt;&gt; '+document.title);});e_d.e_e&&e_d.wireNode(Uize.Node.find({tagName:'A',className:/\blinkedJs\b/}),'click',function(){e_d.e_e(this.title||this.innerHTML)});e_a.prototype.wireUi.call(e_d);var e_f=Uize.Url.fromParams(location.href).tour;
e_f&&Uize.module({required:['UizeDotCom.Templates.Tour','Uize.Tooltip','Uize.Url','UizeDotCom.Examples'],builder:function(){Uize.Node.injectHtml(document.body,UizeDotCom.Templates.Tour.process({tour:e_f,pageUrl:location.href}));function e_g(e_h){var e_i=arguments.callee.e_j;if(!e_i){e_i=arguments.callee.e_j={};for(var e_k= -1,e_l=UizeDotCom.Examples(),e_m=e_l.length;++e_k<e_m;){var e_n=e_l[e_k];e_i[Uize.Url.from(e_n.path).fileName]=e_n;}}return e_i[Uize.Url.from(e_h).fileName];}e_d.wireNode(Uize.Node.find({tagName:'a',className:/\b(tourPage|tourButton)\b/}),{mouseover:function(){var e_n=e_g(this.getAttribute('href'));e_d.setNodeValue('tourPageTooltip-title',e_n.title);e_d.setNodeValue('tourPageTooltip-description',e_n.description);e_d.setNodeValue('tourPageTooltip-keywords',e_n.keywords||'-- NONE --');Uize.Tooltip.showTooltip('page-tourPageTooltip');},mouseout:function(){Uize.Tooltip.showTooltip('page-tourPageTooltip',false)}});}});}};e_b.registerProperties({e_e:'evaluator'});e_b.set({showFooter:false});
return e_b;}});


Uize.module({name:'Uize.Tooltip',required:['Uize.Node','Uize.Fade'],builder:function(){var _a=function(){},_b=true,_c=false,_d=Uize.Node;var _e=Uize.getGuid(),_f=[],_g,_h=16;function _i(){_d.setAbsPos(_g,_d.getEventAbsPos(),_h);}function _j(_k){if(_k!=_g){if(_k){if(_g){_l.stop();_m();}_d.wire(document.body,'scroll',_i,_e);_d.wire(document.documentElement,'mousemove',_i,_e);_g=_k;_d.setStyle(_g,{position:'absolute',zIndex:5000,left:-50000,top:-50000});_d.display(_g);_i();}else{_l.get('duration')>0?_l.start():_m();}}else if(_k){_l.stop();_d.setOpacity(_g,1);}}_a.showTooltip=function(_k,_n){if(_k=_d.getById(typeof _k=='function'?_k():_k)){if(_n!==_c){_f.push(_k);}else{var _o=Uize.indexIn(_f,_k,_b);_o> -1&&_f.splice(_o,1);}_j(_f[_f.length-1]);}};_a.hideTooltip=function(_p){_a.showTooltip(_p,_c)};var _l=_a.fade=new Uize.Fade({duration:0});function _m(){_d.unwireEventsByOwnerId(_e);_d.display(_g,_c);_d.setOpacity(_g,1);_g=null;}_l.wire({'Changed.value':function(){_d.setOpacity(_g,1-_l.get('progress'))},Done:_m});
return _a;}});
		Uize.module ({name:'UizeDotCom.Page.Example.library'});
	}
});

