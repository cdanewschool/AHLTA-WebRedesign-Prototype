/*
 
 Copyright (c) 2005,2006,2007 Stefan Pratter

 Permission is hereby granted, free of charge, to any person
 obtaining a copy of this software and associated documentation
 files (the "Software"), to deal in the Software without
 restriction, including without limitation the rights to use,
 copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the
 Software is furnished to do so, subject to the following
 conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 OTHER DEALINGS IN THE SOFTWARE.

 */

/******************************************************************************
 * G L O B A L S **************************************************************
 *****************************************************************************/

/** Constant: VUI_SELECTOR
  * VegUI element type for <VegUISelector>
  */

var VUI_SELECTOR = 35;

vui_module_add(VUI_SELECTOR, VegUISelector, 'vegui.selector.class.js');

/******************************************************************************
 * V E G U I  S E L E C T O R *************************************************
 *****************************************************************************/
/* Class: VegUISelector
 * a widget that lets the user select a value by clicking two buttons (left
 * and right) with a label in the middle
 *
 * Notes: Hierarchy
 *
 *	*extends VegUINode*
 *
 *	Inherits all functions and methods from <VegUINode>
 *
 * (start code)
 * VegUINode
 *    |
 *    |
 *    +--> VegUISelector
 * (end)
 *
 * Notes: Type
 *
 *	<VUI_SELECTOR>
 *
 * Notes: Child Elements
 *
 *	Btn1 - <VegUIButton>, Button to select the next item to the left
 *	Btn2 - <VegUIButton>, Button to select the next item to the right
 *	Label - <VegUINode>, Label to display the selected item
 *
 *
 * Notes: Items Array
 *
 *	The items array holds value, name pairs meaning a valid items
 *	array would look like this:
 *
 *	(start code)
 *	var items = [
 *	  [1,'First Item'],
 *	  [2,'Second Item']
 *	];
 *	(end)
 *
 * Notes: Tutorials
 *
 * http://www.vegui.org/site/blog/21/vegui-tutorial-12---the-selector-widget.html
 *
 * Properties: Object Properties
 *
 *	value - *variable*, holds the currently selected value
 *	Items - *Array*, holds the items in the form of value, name pairs
 *	idxPtr - *int*, index pointer
 *
 */

/*****************************************************************************/
/** Constructor: VegUISelector
  *
  * *Constructor*
  *
  * See Parent Class:
  *
  *	<VegUINode::VegUINode>
  *
  */
 
function VegUISelector(refName, Parent, Manager) {
 
  this.constructor = VegUINode;
  this.constructor(refName, Parent, Manager);
 
  /**
   * properties
   */

  this.type = VUI_SELECTOR;
  this.value = null;
  this.Items = [];
  this.idxPtr = 0;
  
  this.T.btnWidth = 0;
  this.T.btnHeight = 0;
  
  /**
   * child elements
   */
 
  this.Btn1 = this.add_child('Btn1', VUI_BUTTON);
  this.Btn2 = this.add_child('Btn2', VUI_BUTTON);
  this.Label = this.add_child('Label', VUI_NODE);

  /** 
   * methods
   */

  /***************************************************************************/
  /** Method: build_selector
    *
    * Builds the selector
    *
    * *private function*
    *
    * You should always use the <VegUIManager::build_element> to build vegUI
    * elements
    *
    * Alias:
    *
    *	build()
    *
    * Parameters:
    *
    *	<HTMLnode toNode> - if submitted the created HTML node will be
    *	appended to toNode
    *
    * Returns:
    *
    *	null - on failure
    *	int - *1* on success
    *
    * See Parent:
    *
    +	<VegUINode::build_node>
    */

  this.build = this.build_selector = function(toNode) {
  
    this.btnWidth = this.Btn1.T.w;
    this.btnHeight = this.Btn1.T.h;

    /* position the label and the buttons */

    this.Label.set(
      'div',this.T.w - (this.btnWidth * 2), this.T.h, this.btnWidth
    );
    this.Label.set_marg(this.btnWidth);
    this.Btn2.set_marg(null,null,0);
 
    if(!this.build_node())
      return null;

    var VS = this;

    /* button states */

    this.Btn1.States[VUI_MOUSE_DOWN].Scripts.add(
      function() { VS.go(VUI_LEFT); }
    );

    this.Btn2.States[VUI_MOUSE_DOWN].Scripts.add(
      function() { VS.go(VUI_RIGHT); }
    );

    /* if there are items in the array, update the label */
  
    if(this.Items.length)
      this.update_label();

    this.dock(toNode);
    return 0;
  
  };
  
  /***************************************************************************/
  /** Method: flush
    *
    * Clears the <Items> array and calls <update_label>
    */
  
  this.flush = function() {
    this.Items = [];
    this.update_label();
  };
  
  /***************************************************************************/
  /** Method: go
    *
    * Select either the next (right) or the previous (left) item
    * .Calls <VegUINode::onchange>
    *
    * Parameters:
    *
    *	int dir - direction for selection, <Generic directions>
    *
    * See also:
    *
    *	<select_idx>, <select_value>
    *
    * Example:
    *
    * (start code)
    * // move the selection to the item on the left
    * Selector.go(VUI_LEFT);
    *
    * // move the selection to the item on the right
    * Selector.go(VUI_RIGHT);
    * (end)
    */
  
  this.go = function(dir) {
    switch(dir) {
      case VUI_LEFT:
        /* go back */
        if(this.idxPtr > 0)
  	  this.select_idx(this.idxPtr - 1);
      break;

      case VUI_RIGHT:
        /* go forward */
        if(this.idxPtr < (this.Items.length)-1)
          this.select_idx(this.idxPtr + 1);
      break;
      default: return null;
    }
  };

  
  /***************************************************************************/
  /** Method: select_idx
    *
    * Select an item using its index in the array, calls <VegUINode::onchange>
    *
    * Parameters:
    *
    *	int idx - array index
    *
    * See also:
    *
    *	<select_value>, <go>
    *
    * Example:
    *
    * (start code)
    * // select the third item
    * Selector.select_idx(2);
    * (end)
    **/
  
  this.select_idx = function(idx) {
    if(!this.Items[idx])
      return null;

    this.idxPtr = idx;
    this.value = this.Items[this.idxPtr][0];
    this.update_label();
    this.event_execute('onchange');
  };

  /***************************************************************************/
  /** method: select_value
    *
    * Selects the first item with the requested value, calls <VegUINode::onchange>
    *
    * Parameters:
    *
    *	variable value - the value to search for
    *
    * See also:
    *
    *   <select_idx>, <go>
    *
    * Example:
    *
    * (start code)
    * // select the item with the value 22
    * Selector.select_value(22);
    * (end)
    */
  
  this.select_value = function(value) {
  
    /* find the first occurance of value */

    var i, idx = -1;
    for(i in this.Items) {
      if(this.Items[i][0] == value) {
        idx = i;
        break;
      }
    }
    this.select_idx(idx);
  };
  
  /***************************************************************************/
  /** Method: set_selector
    *
    * Sets the most common Template Properties of the selector
    *
    * Alias:
    *
    *	set()
    *
    * Parameters:
    *
    *	int w - width (pixels)
    *	int h - height (pixels)
    *	int x - position x (pixels)
    *	int y - position y (pixels)
    *
    * See Parent:
    *
    *	<VegUINode::set_node>
    *
    */
  
  this.set = this.set_selector = function(w,h,x,y) {
    this.set_node('div',w,h,x,y);
  };
  
  /***************************************************************************/
  /** Method: update_label
    *
    * Sets the text of the Label child to the currently selected item name
    *
    */
  
  this.update_label = function() {
    if(!this.Items[this.idxPtr])
      this.Label.clear(txtnode(''));
    else {
      var item = this.Items[this.idxPtr];
      this.Label.clear(txtnode(item[1]));
    }
  };

}
VegUISelector.prototype = VegUINode;
