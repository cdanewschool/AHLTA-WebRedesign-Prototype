/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : UizeDotCom.ParamsInspector
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2009-2010 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/
Uize.module({name:'UizeDotCom.ParamsInspector',superclass:'Uize.Widget',required:['Uize.Widget.Options.Tabbed','Uize.Data','Uize.Json','Uize.Node.Form','UizeDotCom.Templates.ParamsInspector'],builder:function(c_a){var c_b=c_a.subclass(null,function(){var c_c=this;c_c.addChild('tabs',Uize.Widget.Options.Tabbed,{bodyClassActive:'tabBodyActive',bodyClassInactive:'tabBodyInactive',values:['presets','params'],value:'presets'});c_c.addChild('preview',Uize.Widget.Button).wire('Click',function(){c_c.c_d()});}),c_e=c_b.prototype;
c_e.c_f=function(c_g){var c_c=this,c_h=c_c.c_h;Uize.Node.Form.setValues(Uize.Data.map(function(c_i,c_j){return c_h[c_j]=='json'?Uize.Json.to(c_i,'mini'):c_i},c_c.c_k[c_g]),c_c.get('idPrefix')+'_');};c_e.c_d=function(){this.fire('Preset Selected');};c_e.getValues=function(){var c_h=this.c_h;return(Uize.Data.map(function(c_i,c_j){var c_l=c_h[c_j];return(c_l=='json'?Uize.Json.from(c_i):Uize.isArray(c_l)?c_i:c_l=='integer'||c_l=='number'||typeof c_l=='object'? +c_i:c_i);},Uize.Node.Form.getValues(this.getNode(),true,this.get('idPrefix')+'_'),false));};c_e.wireUi=function(){var c_c=this;if(!c_c.isWired){c_a.prototype.wireUi.call(c_c);c_c.wireNode('presets','click',function(c_m){var c_n=c_m.target||c_m.srcElement;if(c_n.tagName=='A'){c_c.c_f(Uize.Node.getText(c_n));c_c.c_d();}});for(var c_g in c_c.c_k)break;c_c.c_f(c_g);c_c.c_d();}};c_b.registerProperties({c_h:{name:'params',value:{}},c_k:{name:'presets',value:{}}});c_b.set({built:false,html:UizeDotCom.Templates.ParamsInspector});return c_b;}});