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

/** Constant: VUI_CHECKBOX
  * VegUI element type for <VegUICheckBox>
  */

var VUI_CHECKBOX = 13;

vui_module_add(VUI_CHECKBOX, VegUICheckBox, 'vegui.checkbox.class.js');

/******************************************************************************
 * V E G U I  C H E C K B O X *************************************************
 *****************************************************************************/
/** Class: VegUICheckBox
  *
  * The checkbox widget
  *
  * Notes: Hierarchy
  *
  *	*extends VegUINode*
  *
  *	Inherits all properties and methods from <VegUINode>
  *
  * (start code)
  * VegUINode
  *    |
  *    |
  *    +--> VegUICheckBox
  * (end)
  *
  * Notes: Type
  *
  *	<VUI_CHECKBOX>
  *
  * Notes: Child Elements:
  *
  *	These child elements are all accessable over *this.[child_name]
  *	even though they may not all be direct children of this element
  *
  *	BtnCheck - *VUI_BUTTON* Button that represents the check box
  *	Label - *VUI_NODE* Node that holds the text that appears besides the buttton
  *
  * Notes: Tutorials
  *
  * http://www.vegui.org/site/blog/13/vegui-tutorial-08---the-checkbox-widget.html
  *
  * Properties: Object Properties
  *
  *	isChecked - *bool* holds the checked status of the checkbox, true if
  *	it is checked, false if it is unchecked
  *	labelTxt - *string* text of the label
  *	cClass - *string* Css class to use for BtnCheck when checked
  *	ucClass - *string* Css class to use for BtnCheck when unchecked
  *
  * Properties: Template Properties
  *
  *	T.labelTxt - <labelTxt>
  *	T.cClass - <cClass>
  *	T.ucClass - <ucClass>
  *	T.checked - *bool* if ture checkbox will be checked by default
  *
  */
  
/*****************************************************************************/
/** Constructor: VegUICheckBox
  *
  * *Constructor*
  *
  * Parameters:
  *
  * 	string refName - name of the object
  *	<VegUIElement Parent> - parent element of the object
  *	VegUIElement Manager - manager element of the object
  *
  * See also:
  *
  *	<VegUINode::VegUINode>
  */

function VegUICheckBox(refName, Parent, Manager) {
  this.constructor = VegUINode;
  this.constructor(refName, Parent, Manager);

  /** 
   * Properties
   */

  this.type = VUI_CHECKBOX;
  this.isChecked = 0;

  /**
   * Child elements
   */

  this.BtnCheck = this.add_child('BtnCheck', VUI_BUTTON);
  this.Label = this.add_child('Label', VUI_NODE);
  this.BtnLabel = this.add_child('BtnLabel', VUI_BUTTON);

  this.Label.set('div', null, 14, 15, 0);
  this.Label.set_marg(0);


  this.BtnCheck.States[VUI_MOUSE_DOWN].Scripts.add(
    function(argArr) {
      argArr[0].Parent.tgl_check();
    }
  );

  /**
   * Methods
   */

  /***************************************************************************/
  /** Method: build_cb
    *
    * Builds the checkbox
    *
    * *private function*
    *
    * You should always use the <VegUIManager::build_element> function
    * to build elements.
    *
    * Alias:
    *
    *	build()
    *
    * Parameters:
    *
    *	<HTMLNode toNode> - if submitted the created HTML node will be appended
    *	to toNode
    *
    * Returns:
    *
    *	null - on failure
    *	int - *1* on success
    *
    * See also:
    *
    *	<VegUINode::build_node> 
    */

  this.build = this.build_cb = function(toNode) {
    this.labelTxt = this.T.labelTxt;
    this.isChecked = this.T.checked ^ 1;
    this.cClass = this.T.cClass;
    this.ucClass = this.T.ucClass;
    
    var BL = this.BtnLabel;
    this.Label.event_add(
      'onresize',
      function(a) { BL.resize(a[0].width(), a[0].height()); }
    );

    if(!this.build_node(toNode))
      return null;

    this.Label.attach(this.BtnLabel,0,0,VUI_FRONT, 1);
    this.BtnLabel.States[VUI_MOUSE_DOWN].Scripts.add(
      function(a) { 
        a[0].Parent.tgl_check();
      }
    );

    this.tgl_check();

    this.Label.clear(document.createTextNode(this.labelTxt));

    this.dock(toNode);
    return 1;
  };
  
  /***************************************************************************/
  /** Method: set_cb
    *
    * Sets the most common template properties for the checkbox
    *
    * Alias:
    *
    *	set()
    *
    * Parameters:
    *
    *	int x - x position (pixels)
    *	int y - y position (pixels)
    *	int w - width (pixels)
    *	int h - height (pixels)
    *	string label - text to be displayed in the label
    *	bool checked - if true the checkbox will be checked by default
    *	string cClass - CSS class to use for BtnCheck when checked
    *	string ucClass - CSS class to use for BtnCheck when unchecked
    *
    * See also:
    *
    *	<VegUINode::set_node>
    *
    * Example:
    *
    * (start code)
    * myCheckBox.set(5,5,150,20,'Enable Something!',false,'cb_checked','ch_unchecked');
    * (end)
    */
  
  this.set = this.set_cb = function(x,y,w,h,label, checked, cClass, ucClass) {
    this.set_node('div', w, h, x, y);
    if(label) this.T.labelTxt = label;
    if(checked !== null) this.T.checked = parseInt(checked);
    if(cClass) this.T.cClass = cClass;
    if(ucClass) this.T.ucClass = ucClass;
  };
  
  /***************************************************************************/
  /** Method: tgl_check
    *
    * Toggles checkbox to be checked or unchecked
    *
    * Parameters:
    *
    *	bool b - true = checked , false = unchecked
    *	bool noOnChange - if true will prevent <VegUINode::onchange> from 
    *	being called
    *
    * Example:
    *
    * (start code)
    * // checkbox will be set to unchecked 
    * 
    * myCheckBox.tgl_check(false);
    *
    * // checkbox will be set to checked
    * 
    * myCheckBox.tgl_check(true);
    *
    * // set onchange event for the checkbox
    * 
    * myCheckBox.event_add('onchange', function(a) {
    *   alert(a[0].isChecked);
    * });
    *
    * // checkbox will be set to checked and the onchange
    * // event will fire
    *
    * myCheckBox.tgl_check(true);
    *
    * // onchange event will not fire 
    *
    * myCheckBox.tgl_check(true, true);
    * (end)
    *
    */
  
  this.tgl_check = function(b, noOnChange) {
  
    if(b != undefined)
      this.isChecked = (b ? 1 : 0) ^ 1;

    this.isChecked ^= 1;
    if(this.isChecked == 1) {
      this.BtnCheck.Base.className = this.cClass;
    } else if(this.isChecked == 0)
      this.BtnCheck.Base.className = this.ucClass;
    if(!noOnChange)
      this.event_execute('onchange');
  };

  
}
VegUICheckBox.prototype = VegUINode;
