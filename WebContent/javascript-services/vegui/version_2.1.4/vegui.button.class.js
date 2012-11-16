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
 * G L O B A L S
 *****************************************************************************/

/** Constant: VUI_BUTTON
  * vegUI element type for <VegUIButton>
  */

var VUI_BUTTON = 4;

vui_module_add(VUI_BUTTON, VegUIButton, 'vegui.button.class.js');

/******************************************************************************
 * V E G U I B U T T O N
 *****************************************************************************/
/** Class: VegUIButton
  *
  * Notes: Hierachy
  *
  * *extends VegUINode*
  *
  * Inherits properties and functions from: <VegUINode>
  * 
  * (start code)
  * VegUINode
  *     |
  *     +--> VegUIButton
  * (end)
  *
  * The button widget
  *
  * Notes: Type
  *
  *	<VUI_BUTTON>
  *
  * Notes: Flags
  *
  *	These flags are turned on for this element by default
  *
  *	<VUI_HMOUSE_DOWN>
  *
  * Notes: Tutorials
  *
  * http://www.vegui.org/site/blog/12/vegui-tutorial-07---the-button-widget.html
  *
  * Properties: Template Properties
  *	
  *	T.caption - *string*, if set the button will be filled with a textnode
  *	T.captionChildName - *string*, if set the child with this name will
  *	be used to hold the caption text. This is useful when you add one
  *	or more skin childs to the button
  *
  */

/*****************************************************************************/
/** Constructor: VegUIButton
  *
  * *Constructor*
  *
  * Parameters:
  *
  *	string refName - name of the element
  *	<VegUIElement Parent> - Parent element
  *	VegUIElement Manager - Manager element
  *
  * See also:
  *
  *	<VegUINode::VegUINode>
  */

function VegUIButton(refName, Parent, Manager) {
  this.constructor = VegUINode;
  this.constructor(refName, Parent, Manager);
 
  /**
   * Properties
   */
   
  this.type = VUI_BUTTON;
  
  this.flags |= VUI_HMOUSE_DOWN;
  this.T.micon = 'pointer';
 
  /**
   * Methods
   */
  
  /***************************************************************************/
  /** Method: build_button
    *
    * Builds the button element
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
    *
    */
  
  this.build = this.build_button = function(toNode) {
  
    this.origW = this.T.w;
    this.origH = this.T.h;
    this.captionChildName = this.T.captionChildName;

    if(this.T.caption) {
      var SelBlock = this.add_skin('SelectionBlocker',0,0,0,0,0,0,0);
      SelBlock.T.z = 50;
    }

    if(!this.build_node())
      return null;
    
    this.States[VUI_MOUSE_DOWN].Scripts.add(
      function(argArr) { 
        argArr[0].Manager.Base.ondragstart = function() { return false };
        argArr[0].Manager.Base.onselectstart = function() { return false };
      }
    );

    this.States[VUI_MOUSE_UP].Scripts.add(
      function(argArr) {
        argArr[0].Manager.Base.ondragstart = null;
        argArr[0].Manager.Base.onselectstart = null;
      }
    );
    
    this.Base.ondrag = function() { return false; };
    this.Base.onselectstart = function() { return false; };
   
    if(this.T.caption) {
      var n = document.createTextNode(this.T.caption);
      if(!this.captionChildName) {
        this.Base.appendChild(n);
      } else {
        this.C[this.captionChildName].Base.appendChild(n);
      }
      this.Css.overflow = 'hidden';
    }

    this.dock(toNode);
    return 1;
  };
  
  /***************************************************************************/
  /** Method: disable_button
    *
    * Similar to <VegUINode::disable_node> only that this method also prohibits the mouse
    * cursor from changing to a pointer when hovering over the button element
    * if the button is disabled
    *
    * Alias:
    *
    *	disable()
    *
    * Parameters:
    *
    *	bool b - disable (true) or enable (false)
    *
    * See also
    *
    *	<VegUINode::disable_node>
    *
    * Examples:
    *
    * (start code)
    * myButton.disable(true); // events will no longer be captured
    * myButton.disable(false); // events will be captured again
    * (end)
    */
  
  this.disable = this.disable_button = function(b) {
    this.disable_node(b);
    this.Css.cursor = b ? 'default' : 'pointer';
  };  
  
  /***************************************************************************/
  /** Method: hevent_button
    *
    * Similar to <VegUINode::hevent_node> only that this function also handles the
    * focus status of the button, giving it active focus when it is clicked
    * and taking the focus when the mouse button is released again
    *
    * *private function*
    *
    * Alias:
    *
    *	hevent()
    *
    * Parameters:
    *
    *	int eventType - <Mouse and keyboard event types>
    *	Event mEvent - javascript event object
    *
    * See also:
    *
    *	<VegUINode::hevent_node>
    */
  
  this.hevent = this.hevent_button = function (eventType, mEvent) {

    if(eventType == VUI_MOUSE_DOWN)
      this.set_focus(VUI_FOCUS_ACTIVE);
    else if(eventType == VUI_MOUSE_UP && this.Manager.focusedElement == this) {
      this.lose_focus();
    }
    var _state = this.hevent_node(eventType, mEvent);
    return _state;
  };
  
  /***************************************************************************/
  /** Method: set_button
    * 
    * sets the most common template properties for the button
    *
    * Alias:
    *
    *	set()
    *
    * Parameters:
    *
    *	int x - position on the x axis (pixels)
    *	int y - position on the y axis (pixels)
    *	int w - width (pixels)
    *	int h - height (pixels)
    *	string cssNormal - css class to be used when button is not clicked
    *	string cssMDown - css class to be used when button is clicked
    *	string c - caption
    *
    * See also:
    *
    *	<VegUINode::set_node>
    *
    * Example:
    *
    * (start code)
    * // will set up the button to be positioned at 5, 5 with the size
    * // of 75x18. When the button is in a normal state the css
    * // class 'button_normal' will be used, when the button is 
    * // being clicked the css class 'button_click' will be used
    *
    * myButton.set(5, 5, 75, 18, 'button_normal', 'button_click');
    *
    * (end)
    */
  
  this.set = this.set_button = function(x, y, w, h, cssNormal, cssMDown, c) {
    this.set_node(null, w, h, x, y);
    if(cssNormal) {
      this.States[VUI_MOUSE_UP].P.className = cssNormal;
      this.T.className = cssNormal;
    }
    if(cssMDown)
      this.States[VUI_MOUSE_DOWN].P.className = cssMDown;
    this.T.caption = c;
  };
  

}
VegUIButton.prototype = VegUINode;
