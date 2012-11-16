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
|    /    O /   |    MODULE : UizeDotCom.Page.Doc.library Library Module
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2009-2010 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/

/*?
	Introduction
		The =UizeDotCom.Page.Doc.library= module is a library module that bundles together various JavaScript modules common to the SimpleDoc pages of the UIZE JavaScript Framework's Web site.

		*DEVELOPERS:* `Chris van Rensburg`
*/

Uize.module ({
	required:'UizeDotCom.Page.library',
	builder:function () {
		

Uize.module({name:'Uize.Tooltip',required:['Uize.Node','Uize.Fade'],builder:function(){var _a=function(){},_b=true,_c=false,_d=Uize.Node;var _e=Uize.getGuid(),_f=[],_g,_h=16;function _i(){_d.setAbsPos(_g,_d.getEventAbsPos(),_h);}function _j(_k){if(_k!=_g){if(_k){if(_g){_l.stop();_m();}_d.wire(document.body,'scroll',_i,_e);_d.wire(document.documentElement,'mousemove',_i,_e);_g=_k;_d.setStyle(_g,{position:'absolute',zIndex:5000,left:-50000,top:-50000});_d.display(_g);_i();}else{_l.get('duration')>0?_l.start():_m();}}else if(_k){_l.stop();_d.setOpacity(_g,1);}}_a.showTooltip=function(_k,_n){if(_k=_d.getById(typeof _k=='function'?_k():_k)){if(_n!==_c){_f.push(_k);}else{var _o=Uize.indexIn(_f,_k,_b);_o> -1&&_f.splice(_o,1);}_j(_f[_f.length-1]);}};_a.hideTooltip=function(_p){_a.showTooltip(_p,_c)};var _l=_a.fade=new Uize.Fade({duration:0});function _m(){_d.unwireEventsByOwnerId(_e);_d.display(_g,_c);_d.setOpacity(_g,1);_g=null;}_l.wire({'Changed.value':function(){_d.setOpacity(_g,1-_l.get('progress'))},Done:_m});
return _a;}});


Uize.module({name:'Uize.Widget.Tree.List',required:['Uize.Node','Uize.Tooltip','Uize.Xml'],builder:function(d_a){var d_b,d_c=true,d_d=false,d_e=Uize.pathToResources+'Uize_Widget_Tree_List/',d_f=Uize.Node,d_g=Uize.Tooltip,d_h=Uize.Xml.toAttributeValue;var d_i=d_a.subclass(),d_j=d_i.prototype;d_j.setItemExpanded=function(d_k,d_l){var d_m=this;if(d_m.isWired){var d_n=d_m.getItemFromSpecifier(d_k);d_m.displayNode(d_k+'Children',d_n.expanded=typeof d_l=='boolean'?d_l:d_n.expanded===d_d);d_m.setNodeProperties(d_k+'Toggler',{src:d_m.d_o(d_n),title:d_m.d_p(d_n)});}else{d_a.prototype.setItemExpanded.call(d_m,d_k,d_l);}};d_j.d_o=function(d_n){return d_e+this.d_q+'-'+(d_n.expanded===d_d?'collapsed':'expanded')+'.gif';};d_j.d_p=function(d_n){return'Click to '+(d_n.expanded===d_d?'expand':'collapse');};d_j.wireUi=function(){var d_m=this;if(!d_m.isWired){var d_r=d_m.d_r;d_m.traverseTree({itemHandler:function(d_n,d_k){d_r&&d_m.wireNode(d_k+'TitleLink',{mouseover:function(){var d_s=Uize.Node.getById(d_r),d_t=d_n.description;
if(d_s&&d_t){d_f.setInnerHtml(d_s,d_h(d_t));d_g.showTooltip(d_s,d_c);}},mouseout:function(){d_g.showTooltip(d_m.d_r,d_d)}});},beforeSubItemsHandler:function(d_n,d_k){d_m.wireNode([d_k+'TogglerLink',!d_n.link||d_m.d_u?(d_k+'TitleLink'):d_b],{click:function(d_v){if(d_v.shiftKey||d_v.ctrlKey||d_v.metaKey){d_m.setExpandedDepth(d_m.getItemFromSpecifier(d_k).expanded!==d_d?0:(d_v.shiftKey?1:1000),d_k);d_v.cancelBubble=d_c;}else{d_m.setItemExpanded(d_k);}},focus:function(){this.blur()}});}});d_a.prototype.wireUi.call(d_m);}};d_i.registerProperties({d_w:{name:'alwaysLinkHeadings',value:d_d},d_x:{name:'iconBgColor',value:'#aaa'},d_q:{name:'iconTheme',value:'arrows'},d_y:{name:'levelClasses',value:[]},d_u:{name:'linksAlwaysToggleExpanded',value:d_d},d_z:{name:'spaceBeforeText',value:7},d_r:'tooltip'});d_i.set({html:{process:function(input){var d_m=this,d_A=[],d_B=input.idPrefix,d_C=d_i.getBlankImageUrl(),d_D='<img src="'+d_C+'" class="divider" align="center"/>',
d_E='style="'+(input.iconBgColor?('background:'+input.iconBgColor+'; '):'')+'width:9px; height:9px;"',d_y=input.levelClasses,d_F=d_y.length-1;d_m.traverseTree({itemHandler:function(d_n,d_k,d_G){var d_H=d_n.link,d_I=d_i.itemHasChildren(d_n),d_J='<img src="'+d_C+'" width="'+(d_G*(10+input.spaceBeforeText))+'" height="10"/>',d_K=d_y[Math.min(d_G,d_F)];d_A.push('<nobr>'+d_J+(d_i.itemIsDivider(d_n)?d_D:('<span style="width:10px; height:10px; padding-right:'+input.spaceBeforeText+'px;">'+(d_I?('<a id="'+d_B+'-'+d_k+'TogglerLink" href="javascript://"><img id="'+d_B+'-'+d_k+'Toggler" src="'+d_m.d_o(d_n)+'" '+d_E+' border="0" title="'+d_m.d_p(d_n)+'"/></a>'):'<img src="'+d_e+input.iconTheme+'-bullet.gif" '+d_E+'"/>')+'</span>'+(d_H||(d_I&&input.alwaysLinkHeadings)?('<a id="'+d_B+'-'+d_k+'TitleLink" class="'+d_K+'" href="'+(d_H||'javascript://')+'">'+d_n.title+'</a>'):('<span class="'+d_K+'">'+d_n.title+'</span>'))))+'</nobr><br/>');},beforeSubItemsHandler:function(d_n,d_k){
d_A.push('<span id="'+d_B+'-'+d_k+'Children" style="display:'+(d_n.expanded!==d_d?'block':'none')+';">');},afterSubItemsHandler:function(){d_A.push('</span>\n')}});return d_A.join('');}}});return d_i;}});


Uize.module({name:'UizeDotCom.Page.Doc',required:['Uize.Widget.Tree.List','Uize.Node'],builder:function(e_a){var e_b=e_a.subclass(null,function(){var e_c=this;e_c.addChild('contents',Uize.Widget.Tree.List,{levelClasses:['contents-tree-level1','contents-tree-level2','contents-tree-level3','contents-tree-level4'],iconTheme:'arrows-orange',iconBgColor:'',tooltip:'contentsTooltip',built:false});}),e_d=e_b.prototype;e_d.wireUi=function(){var e_c=this;if(!e_c.isWired){var e_e=e_c.children.contents,
e_f=Uize.Widget.Tree.List.getTreeFromList(e_e.getNode());e_c.set({contentsTreeItems:e_f});e_e.set({items:e_f});e_e.setExpandedDepth(1);Uize.Node.injectHtml(document.body,'<div id="contentsTooltip" class="contents-tooltip"></div>');var e_g=document.title.match(/^\s*(.*?)\s*\|/)[1];e_c.wireNode('search','click',function(){location.href=e_c.getPathToRoot()+'search-sections.html?'+e_g;});e_c.wireNode('examples','click',function(){e_c.performSearch('"'+e_g+'"','/examples')});var e_h=Uize.Node.find({tagName:'h1',className:'document-title'})[0];Uize.Node.getStyle(e_h,'position')=='fixed'&&e_c.wireNode(document.body,'click',function(e_i){var e_j=e_i.target||e_i.srcElement;function e_k(e_l){var e_m=e_l.indexOf('#');return e_m> -1?e_l.slice(0,e_m):e_l;}if(e_j.tagName=='A'){var e_n=e_j.getAttribute('href');if(e_n.charCodeAt(0)==35||(e_n.indexOf('#')> -1&&e_k(e_n)==e_k(location.href))){setTimeout(function(){(Uize.Node.isSafari?document.body:document.documentElement).scrollTop-=48;},100);}}});
e_a.prototype.wireUi.call(e_c);e_e.setNodeStyle('',{maxHeight:'none',overflow:'visible'});}};return e_b;}});
		Uize.module ({name:'UizeDotCom.Page.Doc.library'});
	}
});

