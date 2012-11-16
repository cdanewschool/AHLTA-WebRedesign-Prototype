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
 

/**
 * Constants: Flags
 *
 * Bitmask flags that can be set on the flags property of the VegUIContentBox widget
 *
 * These flags need to be set before the element is built
 *
 * VUI_HIDE_SCROLLX - hide the x axis scrollbar
 * VUI_HIDE_SCROLLY - hide the y axis scrollbar
 * VUI_HIDE_SCROLLS - hide both scrollbars
 */

var VUI_HIDE_SCROLLX = 0x80;
var VUI_HIDE_SCROLLY = 0x100;
var VUI_HIDE_SCROLLS = VUI_HIDE_SCROLLX | VUI_HIDE_SCROLLY;

/** 
 * Constant: VUI_CBOX
 * vegUI element type for <VegUIContentBox> */

var VUI_CBOX = 5;

vui_module_add(VUI_CBOX, VegUIContentBox, 'vegui.cbox.class.js');

/******************************************************************************
 * V E G U I C O N T E N T B O X
 *****************************************************************************/
/** Class: VegUIContentBox
  *
  * A scrollable frame to display content in. 
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
  *    +--> VegUIContentBox
  * (end)
  *
  * Notes: Type
  *
  *	<VUI_CBOX>
  *
  * Notes: Requires
  *
  *	file - <vegui.scrollbar.class.js>
  *
  * Notes: Flags
  *
  *	These flags are turned on for this element by default
  *
  *	<VUI_HMOUSE_WHEEL> | <VUI_HMOUSE_OVER> | <VUI_HMOUSE_OUT>
  *
  *
  * Notes: Properties
  *
  *	noKeyScrolling - *bool*, if true, scrolling via keyboard keys will be disabled
  *
  * Notes: Template Properties
  *
  *	T.noKeyScrolling - <noKeyScrolling>
  *
  * Notes: Child Elements
  *
  *	These elements are all accessable over *this.[child_name]* even
  *	though they may not all be direct children of this element
  *
  *	CHolder - <VegUINode>, Content holder node, the frame
  *	Content - <VegUINode>, Content node
  *	ScrollX - <VegUIScrollbar>, X Axis Scroll
  *	ScrollY - <VegUIScrollbar>, Y Axis Scroll
  *
  * Notes: Tutorials
  *
  * http://www.vegui.org/site/blog/14/vegui-tutorial-09---the-content-box-widget.html
  */

/***************************************************/
/** Constructor */

function VegUIContentBox(refName, Parent, Manager) {
  this.constructor = VegUINode;
  this.constructor(refName, Parent, Manager);
  
  this.type = VUI_CBOX;
  this.noKeyScrolling = false;
  
  this.CHolder = this.add_child('CHolder', VUI_NODE);
  this.Content = this.CHolder.add_child('Content', VUI_NODE);
  this.CHolder.T.rmarg = 15;
  this.CHolder.T.bmarg = 15;

  /* Set up Y Axis scrollbar */  
  
  this.ScrollY = this.add_child('ScrollY', VUI_SCROLL);
  this.ScrollY.set('y');
  this.ScrollY.T.rmarg_nr = 0;
  this.ScrollY.T.bmarg = 15;
  
  /* Set up X Axis scrollbar */
  
  this.ScrollX = this.add_child('ScrollX', VUI_SCROLL);
  this.ScrollX.set('x');
  this.ScrollX.T.bmarg_nr = 0;
  this.ScrollX.T.rmarg = 15;

  /**
   * Methods
   */

  /***************************************************************************/
  /** Method: build_cbox
    *
    * builds the content box
    *
    * *private function*
    *
    * Elements should always be build using the vegui manager
    *
    * <VegUIManager::build_element>, <VegUIManager::build_elements>
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
    * See Parent:
    *
    *	<VegUINode::build_node>
    */
 
  this.build = this.build_cbox = function(toNode) {
  
    var CB = this;
    var Man = this.Manager;

    this.flags |= VUI_HMOUSE_WHEEL | VUI_HMOUSE_OVER | VUI_HMOUSE_OUT;
    
    this.noKeyScrolling = this.T.noKeyScrolling;

    this.States[VUI_MOUSE_OVER].Scripts.add(
      function() {
	if(Man.focusedElement) {
	  if(Man.focusedElement == this)
	    return 0;
          if(Man.focusedElement.is_parent(CB))
	    return 0;
	}
	CB.set_focus(CB.ScrollY.overflow() ? VUI_FOCUS_ACTIVE : VUI_FOCUS_PASSIVE);
      }
    );

    this.States[VUI_MOUSE_OUT].Scripts.add(
      function() {
        if(has_parent(CB.toE, CB.Base))
	  return;
	  
	if(Man.focusedElement == CB) {
	  CB.lose_focus();
        }
      }
    );

    this.States[VUI_MOUSE_WHEEL].Scripts.add(
      function() {
	if(!CB.ScrollY.overflow())
          return;
        if(CB.delta > 0)
          CB.ScrollY.scroll(0,3);
        else if(CB.delta < 0)
          CB.ScrollY.scroll(1,3);
      }
    );
    
    this.States[VUI_KEY_DOWN].Scripts.add(
      function() { CB.handle_key(); }
    );
 
    this.event_add(
      'onfocusset', 
      function(args) {
        if(!CB.noKeyScrolling)
	  args[0].Manager.block_key([33,34,37,38,39,40]);
      }
    );

    this.event_add(
      'onfocuslose',
      function(args) {
        if(!CB.noKeyScrolling)
	  args[0].Manager.unblock_key([33,34,37,38,39,40]);
      }
    );
    
    if(!this.build_node())
      return null;
   
    if(this.flags & VUI_HIDE_SCROLLX)
      this.ScrollX.noAutoShow = true;
    
    if(this.flags & VUI_HIDE_SCROLLY)
      this.ScrollY.noAutoShow = true;
   
    this.CHolder.Css.overflow = 'hidden';
    this.ScrollY.link(this.CHolder, this.Content);
    this.ScrollX.link(this.CHolder, this.Content);
    this.ScrollX.hide((this.flags & VUI_HIDE_SCROLLX));
    this.ScrollY.hide((this.flags & VUI_HIDE_SCROLLY));
    this.dock(toNode);
    return 1;
  
  };
  
  /***************************************************************************/
  /** Method: fill
    *
    * Fills the Content child of the content box with an existing HTML node
    *
    * Parameters:
    *
    *	HTMLNode Node - Node that should be displayed by the content box
    *
    * Code example:
    *
    * (start code)
    * myCBox.fill(document.getElementById('stuff'));
    * (end)
    *
    * See also:
    *
    *	<fill_remote>
    *
    * Example:
    *
    * (start code)
    * // fill content box with existing node 
    *
    * myCBox.fill(document.getElementById('some_element'));
    *
    * // fill content box with new node 
    *
    * myCBox.fill(htmlnode('div'));
    * (end)
    */
  
  this.fill = function(Node) {
    if(!Node || !Node.nodeName || !this.Base)
      return null;

    this.Content.clear();
    this.Content.Base.appendChild(Node);

    /* set bounding box for content */
    this.update_bbox();
    this.ScrollY.sync();
    this.ScrollX.sync();
  };
  
  /***************************************************************************/
  /** Method: fill_remote
    *
    * Fills the content child of the content box with the contents of a html
    * file
    *
    * Requires:
    *
    *	file - <vegui.bridge.class.js>
    *	action - <VegUIManager::init_bridge> needs to have been called on
    *	the manager element
    *
    * Parameters:
    *
    *	string path - path of file to load. 
    *	<function ondone> - function to execute when done
    *
    * Note:
    *
    *	The file needs to be on the same server as the page where the content 
    *	box is located on is. The file's contents will be added as innerHTML to 
    *   the Content node so using HTML tags in the file is encouraged
    *
    * See also:
    *
    *	<fill>
    *
    * Example:
    *
    * (start code)
    * // fills the content box with the contents of file.html, note
    * // that it will be rendered correctly
    *
    * myCBox.fill_remote('file.html');
    *
    * // same as above, the function submitted will be executed once
    * // the content box has been filled
    *
    * myCBox.fill_remote('file.html', function() { alert('done'); });
    * (end)
    */
  
  this.fill_remote = function(path, ondone) {
 
    var CB = this, Bridge = this.Manager.Bridge;
  
    if(!Bridge) {
      CB.fill(txtnode('vegUI Error: no bridge found'));
      return;
    }
  
    /* define process function that will add the data
     * to the content box's content node
     */

    var pFunc = function() {
      var node = htmlnode('div');
      node.innerHTML = this.request.responseText;
      CB.Content.clear();
      CB.fill(node);
      if(ondone)
        ondone();
    };

    /* send request */

    Bridge.send(path, null, 'get', pFunc);
  
  };
   
  /***************************************************************************/
  /** Method: handle_key_cbox
    *
    * Handles key input on the element, this private function is called
    * whenever a key is hit on the keyboard while the element is focused.
    *
    * *private function*
    *
    * Alias:
    *
    *	<handle_key>
    *
    */

  this.handle_key = this.handle_key_cbox = function() {
    
    if(!this.mEvent)
      return;
    
    switch(this.aKey) {
      case 33:
        var d = Math.abs(this.Content.y());
	var i = (d < this.CHolder.height()) ? d : this.CHolder.height();
	this.Content.move(
	  this.Content.x(), this.Content.y()+i
	);
	this.ScrollY.sync();
      break;
      case 34:
        var d = this.Content.y2()-this.CHolder.height();
	var i = (d < this.CHolder.height()) ? d : this.CHolder.height();
	this.Content.move(
	  this.Content.x(), this.Content.y()-i
	);
	this.ScrollY.sync();
      break;
      break;
      case 37:
        if(!this.noKeyScrolling)
	  this.ScrollX.scroll(0,2);
      break;
      case 38:
        if(!this.noKeyScrolling)
          this.ScrollY.scroll(0,2);
      break;
      case 39:
        if(!this.noKeyScrolling)
	  this.ScrollX.scroll(1,2);
      break;
      case 40:
        if(!this.noKeyScrolling)
          this.ScrollY.scroll(1,2);
      break;
    }
    
  };
  
 
  /***************************************************************************/
  /** Method: set_cbox
    * 
    * Set the most common template properties for this element
    *
    * Alias:
    *
    *	set()
    *
    * Parameters:
    *
    *	int w - width (pixels)
    *	int h - height (pixels)
    *	int x - x position (pixels)
    *	int y - y position (pixels)
    *
    * See Parent:
    *
    *	<VegUINode::set_node>
    *
    * Example:
    *
    * (start code)
    * myCBox.set(500,500,5,5);
    * (end) 
    */
  
  this.set = this.set_cbox = function(w,h,x,y) {
    this.set_node(null,w,h,x,y);
  };
  
  /***************************************************************************/
  /** Method: update_bbox
    *
    * Updates bounding box of the content child
    *
    * This function actually gets called automatically when the 
    * <VegUINode::resize> method is called on it.
    *
    */
  
  this.update_bbox = function() {
    this.ScrollX.update_content_boundary();

    if(this.ScrollY.overflow() <= 1)
      this.Content.move(null, 0);
    if(this.ScrollX.overflow() <= 1)
      this.Content.move(0, null);
  };
  
  this.event_add('ondock', function(a) {
    a[0].ScrollY.sync();
    a[0].ScrollX.sync();
  });
  

  this.event_add('onresize', function(a) {
    if(!a[0].Base || !a[0].Base.parentNode)
      return;
    a[0].update_bbox();
    a[0].ScrollY.sync();
    a[0].ScrollX.sync();
  });
}
VegUIContentBox.prototype = VegUINode;
