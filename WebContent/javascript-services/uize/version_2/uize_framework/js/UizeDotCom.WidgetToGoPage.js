/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : UizeDotCom.WidgetToGoPage
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2009-2010 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/
Uize.module({name:'UizeDotCom.WidgetToGoPage',superclass:'Uize.Widget.Page',required:'UizeDotCom.Templates.WidgetToGoTitle',builder:function(d_a){var d_b=d_a.subclass(),d_c=d_b.prototype;d_c.wireUi=function(){var d_d=this;if(!d_d.isWired){Uize.Node.injectHtml(document.body,UizeDotCom.Templates.WidgetToGoTitle.process({title:document.title}));Uize.module({required:[d_d.d_e,d_d.d_f],builder:function(){d_d.addChild('widget',eval(d_d.d_e),{built:false,html:eval(d_d.d_f)}).insertOrWireUi();}});d_d.wireNode('title','click',
function(){page.launchPopup({url:'http://www.uize.com',width:1010,height:690});});d_a.prototype.wireUi.call(d_d);}};d_b.registerProperties({d_e:'widgetClass',d_f:'widgetHtml',d_g:'title'});return d_b;}});