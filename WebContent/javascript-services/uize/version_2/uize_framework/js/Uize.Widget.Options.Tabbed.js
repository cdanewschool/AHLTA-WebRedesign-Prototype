/*
	UIZE JAVASCRIPT FRAMEWORK 2010-01-24

	http://www.uize.com/reference/Uize.Widget.Options.Tabbed.html
	Available under MIT License or GNU General Public License -- http://www.uize.com/license.html
*/
Uize.module({name:'Uize.Widget.Options.Tabbed',builder:function(d_a){var d_b=d_a.subclass(null,function(){var d_c=this;d_c.wire('Changed.value',function(){d_c.d_d()});}),d_e=d_b.prototype;d_e.d_f=function(d_g){return d_b.isNumber(d_g)?d_g:this.getValueNoFromValue(d_g);};d_e.d_h=function(d_g){return this.getNode('option'+this.d_f(d_g)+'TabBody')};d_e.d_i=function(d_j){return this.tabExists(d_j)&&this.getOptionButton(d_j).get('enabled')};d_e.d_d=function(){var d_c=this;if(d_c.isWired){var d_k=d_c.get('valueNo');if(d_c.d_i(d_k)){d_c.updateUiTabState(d_c.d_l,d_c.d_l=d_k);}else{for(var d_m= -1,d_n=d_c.get('values'),d_o=d_n.length;++d_m<d_o;){if(d_c.d_i(d_m)){d_c.set({value:d_n[d_m]});break;}}}}};d_e.enableTab=function(d_j,d_p){this.getOptionButton(d_j).set({enabled:d_p?'inherit':false});this.d_d();};d_e.getOptionButton=function(d_g){return this.children['option'+this.d_f(d_g)];};d_e.getTabBodyNode=d_e.d_h;d_e.tabExists=function(d_g){var d_q=this.getOptionButton(d_g);return(d_q&&(d_q.getNode()||this.d_h(d_g))?true
:false);};d_e.updateUiTabState=function(d_l,d_k){var d_c=this;function d_r(d_m){d_m> -1&&d_c.setNodeProperties(d_c.d_h(d_m),{className:d_m==d_k?d_c.d_s:d_c.d_t});}d_r(d_l);d_r(d_k);};d_e.wireUi=function(){var d_c=this;if(!d_c.isWired){d_a.prototype.wireUi.call(d_c);d_c.d_l=d_c.get('valueNo');d_c.d_d();}};d_b.registerProperties({d_s:'bodyClassActive',d_t:'bodyClassInactive'});return d_b;}});