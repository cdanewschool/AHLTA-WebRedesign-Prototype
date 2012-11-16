/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : UizeDotCom.Page.Doc
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2008-2010 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/
Uize.module({name:'UizeDotCom.Page.Doc',required:['Uize.Widget.Tree.List','Uize.Node'],builder:function(e_a){var e_b=e_a.subclass(null,function(){var e_c=this;e_c.addChild('contents',Uize.Widget.Tree.List,{levelClasses:['contents-tree-level1','contents-tree-level2','contents-tree-level3','contents-tree-level4'],iconTheme:'arrows-orange',iconBgColor:'',tooltip:'contentsTooltip',built:false});}),e_d=e_b.prototype;e_d.wireUi=function(){var e_c=this;if(!e_c.isWired){var e_e=e_c.children.contents,
e_f=Uize.Widget.Tree.List.getTreeFromList(e_e.getNode());e_c.set({contentsTreeItems:e_f});e_e.set({items:e_f});e_e.setExpandedDepth(1);Uize.Node.injectHtml(document.body,'<div id="contentsTooltip" class="contents-tooltip"></div>');var e_g=document.title.match(/^\s*(.*?)\s*\|/)[1];e_c.wireNode('search','click',function(){location.href=e_c.getPathToRoot()+'search-sections.html?'+e_g;});e_c.wireNode('examples','click',function(){e_c.performSearch('"'+e_g+'"','/examples')});var e_h=Uize.Node.find({tagName:'h1',className:'document-title'})[0];Uize.Node.getStyle(e_h,'position')=='fixed'&&e_c.wireNode(document.body,'click',function(e_i){var e_j=e_i.target||e_i.srcElement;function e_k(e_l){var e_m=e_l.indexOf('#');return e_m> -1?e_l.slice(0,e_m):e_l;}if(e_j.tagName=='A'){var e_n=e_j.getAttribute('href');if(e_n.charCodeAt(0)==35||(e_n.indexOf('#')> -1&&e_k(e_n)==e_k(location.href))){setTimeout(function(){(Uize.Node.isSafari?document.body:document.documentElement).scrollTop-=48;},100);}}});
e_a.prototype.wireUi.call(e_c);e_e.setNodeStyle('',{maxHeight:'none',overflow:'visible'});}};return e_b;}});