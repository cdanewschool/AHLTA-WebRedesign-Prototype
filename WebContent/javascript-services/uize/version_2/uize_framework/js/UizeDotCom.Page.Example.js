/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : UizeDotCom.Page.Example
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2008-2010 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/
Uize.module({name:'UizeDotCom.Page.Example',required:['Uize.Node','Uize.Url'],builder:function(e_a){var e_b=e_a.subclass(),e_c=e_b.prototype;e_c.wireUi=function(){var e_d=this;if(!e_d.isWired){e_d.wireNode('viewSource','click',function(){e_d.viewSource(location.href,'SOURCE CODE FOR &gt;&gt; '+document.title);});e_d.e_e&&e_d.wireNode(Uize.Node.find({tagName:'A',className:/\blinkedJs\b/}),'click',function(){e_d.e_e(this.title||this.innerHTML)});e_a.prototype.wireUi.call(e_d);var e_f=Uize.Url.fromParams(location.href).tour;
e_f&&Uize.module({required:['UizeDotCom.Templates.Tour','Uize.Tooltip','Uize.Url','UizeDotCom.Examples'],builder:function(){Uize.Node.injectHtml(document.body,UizeDotCom.Templates.Tour.process({tour:e_f,pageUrl:location.href}));function e_g(e_h){var e_i=arguments.callee.e_j;if(!e_i){e_i=arguments.callee.e_j={};for(var e_k= -1,e_l=UizeDotCom.Examples(),e_m=e_l.length;++e_k<e_m;){var e_n=e_l[e_k];e_i[Uize.Url.from(e_n.path).fileName]=e_n;}}return e_i[Uize.Url.from(e_h).fileName];}e_d.wireNode(Uize.Node.find({tagName:'a',className:/\b(tourPage|tourButton)\b/}),{mouseover:function(){var e_n=e_g(this.getAttribute('href'));e_d.setNodeValue('tourPageTooltip-title',e_n.title);e_d.setNodeValue('tourPageTooltip-description',e_n.description);e_d.setNodeValue('tourPageTooltip-keywords',e_n.keywords||'-- NONE --');Uize.Tooltip.showTooltip('page-tourPageTooltip');},mouseout:function(){Uize.Tooltip.showTooltip('page-tourPageTooltip',false)}});}});}};e_b.registerProperties({e_e:'evaluator'});e_b.set({showFooter:false});
return e_b;}});