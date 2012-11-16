/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : Uize.Tooltip Package
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2006-2010 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/

/*ScruncherSettings Mappings="=" LineCompacting="TRUE"*/

/* Module Meta Data
	type: Package
	importance: 5
	codeCompleteness: 100
	testCompleteness: 0
	docCompleteness: 2
*/

/*?
	Introduction
		The =Uize.Tooltip= module manages the display of decorated HTML tooltips that follow the mouse as it moves and that are positioned to always be in view.

		*DEVELOPERS:* `Chris van Rensburg`

		The =Uize.Tooltip= module is a package under the =Uize= namespace.
*/

Uize.module ({
	name:'Uize.Tooltip',
	required:[
		'Uize.Node',
		'Uize.Fade'
	],
	builder:function () {
		/*** Variables for Scruncher Optimization ***/
			var
				_package = function () {},
				_true = true,
				_false = false,
				_Uize_Node = Uize.Node
			;

		/*** Global Variables ***/
			var
				_packageGuid = Uize.getGuid (),
				_tooltipNodes = [],
				_shownTooltipNode,
				_tooltipBreatherMargin = 16
			;

		/*** Tooltip Display Management Functions ***/
			function _updateTooltipPos () {
				_Uize_Node.setAbsPos (_shownTooltipNode,_Uize_Node.getEventAbsPos (),_tooltipBreatherMargin);
			}
			function _setTooltip (_tooltipNode) {
				if (_tooltipNode != _shownTooltipNode) {
					if (_tooltipNode) {
						if (_shownTooltipNode) {
							_fade.stop ();
							_endFade ();
						}
						_Uize_Node.wire (document.body,'scroll',_updateTooltipPos,_packageGuid);
						_Uize_Node.wire (document.documentElement,'mousemove',_updateTooltipPos,_packageGuid);
						_shownTooltipNode = _tooltipNode;
						_Uize_Node.setStyle (
							_shownTooltipNode,
							{position:'absolute',zIndex:5000,left:-50000,top:-50000}
						);
						_Uize_Node.display (_shownTooltipNode);
						_updateTooltipPos ();
					} else {
						_fade.get ('duration') > 0 ? _fade.start () : _endFade ();
					}
				} else if (_tooltipNode) {
					_fade.stop ();
					_Uize_Node.setOpacity (_shownTooltipNode,1);
				}
			}

		/*** Public Static Methods ***/
			_package.showTooltip = function (_tooltipNode,_mustShow) {
				if (
					_tooltipNode = _Uize_Node.getById (typeof _tooltipNode == 'function' ? _tooltipNode () : _tooltipNode)
				) {
					if (_mustShow !== _false) {
						_tooltipNodes.push (_tooltipNode);
					} else {
						var _tooltipNodeNo = Uize.indexIn (_tooltipNodes,_tooltipNode,_true);
						_tooltipNodeNo > -1 && _tooltipNodes.splice (_tooltipNodeNo,1);
					}
					_setTooltip (_tooltipNodes [_tooltipNodes.length - 1]);
				}
			};

			_package.hideTooltip = function (_tooltip) {_package.showTooltip (_tooltip,_false)};

		/*** Fadeout Management ***/
			var _fade = _package.fade = new Uize.Fade ({duration:0});
			function _endFade () {
				_Uize_Node.unwireEventsByOwnerId (_packageGuid);
				_Uize_Node.display (_shownTooltipNode,_false);
				_Uize_Node.setOpacity (_shownTooltipNode,1);
				_shownTooltipNode = null;
			}
			_fade.wire ({
				'Changed.value':function () {_Uize_Node.setOpacity (_shownTooltipNode,1 - _fade.get ('progress'))},
				Done:_endFade
			});

		return _package;
	}
});

