/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : UizeDotCom.Page.Home
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2009-2010 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/

/*ScruncherSettings Mappings="=e" LineCompacting="TRUE"*/

/*?
	Introduction
		A subclass of the =UizeDotCom.Page= class, designed exclusively for the very important homepage of the *uize.com* Web site.

		*DEVELOPERS:* `Chris van Rensburg`
*/

Uize.module ({
	name:'UizeDotCom.Page.Home',
	required:[
		'Uize.Node.Event',
		'Uize.Widget.HoverFader',
		'Uize.Widget.Scrolly',
		'Uize.Widget.AutoTooltip',
		'Uize.Template',
		'Uize.Fx',
		'Uize.Fx.xTextShadow',
		'Uize.Curve',
		'Uize.Curve.Rubber'
	],
	builder:function (_superclass) {
		/*** Class Constructor ***/
			var
				_class = _superclass.subclass (
					null,
					function () {
						var _this = this;

						/*** add the demos scrolly ***/
							_this.addChild ('demosScrolly',Uize.Widget.Scrolly)
								.fade.set ({curve:Uize.Curve.Rubber.easeOutBounce (3,.5),duration:1000});
				
						/*** add the demo info auto tooltip behavior ***/
							_this.addChild ('demoInfoTooltip',Uize.Widget.AutoTooltip,{nodes:{className:/\bdemosItem\b/},html:true});
				
						/*** add hover fader for demos items and pod sections highlight effect ***/
							_this.addChild (
								'borderHoverFader',
								Uize.Widget.HoverFader,
								{
									nodes:{className:/\b(subPod|demosItem)\b/},
									defaultStyle:{borderColor:'000'},
									hoverStyle:{borderColor:'f'},
									fadeIn:{
										duration:800,
										curve:{borderColor:[Uize.Curve.easeOutPow (9),Uize.Curve.easeInPow (2),Uize.Curve.easeInPow (6)]}
									},
									fadeOut:{
										duration:1200,
										curve:{borderColor:[Uize.Curve.easeOutPow (4),null,Uize.Curve.easeInPow (3)]}
									}
								}
							);

						/*** add hover fader for pod heading highlight effect ***/
							_this.addChild (
								'podHeadingHoverFader',
								Uize.Widget.HoverFader,
								{
									nodes:{className:/\bpodHeading\b/},
									defaultStyle:{
										textShadow:[
											'0em 0em 0em #0',
											'0em 0em 0em #0',
											'0em 0em 0em #0',
											'0em 0em 0em #0'
										].join (',')
									},
									hoverStyle:{
										textShadow:[
											'-1.5em 0em 1.5em #f',
											'1.5em 0em 1.5em #f',
											'0em -.3em 1.5em #abc',
											'0em .3em 1em #def'
										].join (',')
									},
									fadeIn:{
										duration:700,
										curve:{textShadow:Uize.Curve.easeOutPow (4)}
									},
									fadeOut:{
										duration:1800,
										curve:{textShadow:Uize.Curve.easeInOutPow (2)}
									}
								}
							);
					}
				),
				_classPrototype = _class.prototype
			;

			/*** Public Instance Methods ***/
				_classPrototype.wireUi = function () {
					var _this = this;
					if (!_this.isWired) {

						/*** wire up non-JavaScript links without explicit target to open up in new window ***/
							page.wireNode (
								Uize.Node.find ({
									tagName:'A',
									self:function () {return !this.target && this.getAttribute ('href') != 'javascript://'}
								}),
								'click',
								function (_event) {
									page.launchPopup ({url:this.href,width:895,height:595,name:'newWindow'});
									Uize.Node.Event.abort (_event);
								}
							);

						_superclass.prototype.wireUi.call (_this);

						/*** reveal the mantle image ***/
							Uize.Fx.fadeStyle (
								page.getNode ('mantleImage'),
								{opacity:.01,clip:[50,450,50,450]},
								{opacity:1,clip:[0,900,100,0]},
								2000,
								{curve:Uize.Curve.easeInOutPow (4)}
							);
					}
				};

		/*** Override Initial Values for Inherited Set-Get Properties ***/
			_class.set ({
				showFooter:false,
				showShareThisPanel:false
			});

		return _class;
	}
});

