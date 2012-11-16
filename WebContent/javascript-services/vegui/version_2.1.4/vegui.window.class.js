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

/** Constant: VUI_WIN
  * VegUI element type for <VegUIWindow>
  */

var VUI_WIN = 7;

vui_module_add(VUI_WIN, VegUIWindow, 'vegui.window.class.js');

/** Constant: WINSHAD_CLASS
  * The css class to use for <VegUIManager>.WinShadow
  */

var WINSHAD_CLASS = 'win_shad';

/** Constant: VUI_WIN_Z
  * the minimum z-level of windows
  */

var VUI_WIN_Z = 500;

/** Constant: VUI_WIN_Z_SPACE
  * the z level space between windows
  */

var VUI_WIN_Z_SPACE = 5;

/**
 * Constants: Flags
 *
 * Bitmask flags that can be set on the flags property of the VegUIWindow widget
 *
 * VUI_KILL_ON_CLOSE - Window is destroyed when the close() method is called
 * VUI_NORESIZE_W - Window's width can not be resized
 * VUI_NORESIZE_H - Window's height can not be resized
 * VUI_NORESIZE - Window can not be resized
 * VUI_NOMOVE_X - Window cannot be moved along the x axis
 * VUI_NOMOVE_Y - Window cannot be moved along the y axis
 * VUI_NOMOVE - Window cannot be moved
 * VUI_MOMAXIMIZE - Window cannot be maximized
 * VUI_NOMINIMIZE - Window cannot be minimized
 * VUI_NOTASK - Window will not be added to taskbar if there is one
 */

var VUI_KILL_ON_CLOSE = 0x200;
var VUI_NORESIZE_W = 0x400;
var VUI_NORESIZE_H = 0x800;
var VUI_NORESIZE = VUI_NORESIZE_W | VUI_NORESIZE_H;
var VUI_NOMOVE_X = 0x1000;
var VUI_NOMOVE_Y = 0x2000;
var VUI_NOMOVE = VUI_NOMOVE_X | VUI_NOMOVE_Y;
var VUI_NOMAXIMIZE = 0x40000;
var VUI_NOMINIMIZE = 0x80000;
var VUI_NOTASK = 0x100000;

/******************************************************************************
 * V E G U I W I N D O W
 *****************************************************************************/
/** Class: VegUIWindow
  *
  * A dragable, resizeable window widget with a header component
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
  *    +--> VegUIWindow
  * (end)
  *
  * Notes: Type
  *
  *	<VUI_WIN>
  *
  * Notes: Required
  *
  *	file - <vegui.button.class.js>
  *
  * Notes: Flags
  *
  *	These flags are turned on by default for this element
  *
  *	<VUI_HMOUSE_DOWN>
  *
  * Notes: Child Elements
  *
  *	These elements are all directly accessable by *this.[child_name]*
  *	even though they may not be direct childs of this element.
  *
  *	Skin - <VegUINode>, Skin node
  *	Ui - <VegUINode>, UI node, add any childs that need interaction
  *	to this.
  *	Header - <VegUIButton>, Header node (Child of Ui)
  * 	Caption - <VegUINode>, holds window caption (Child of Header)
  *	RC_R - <VegUIButton>, resize capture right (Child of Ui)
  *	RC_B - <VegUIButton>, resize capture bottom (Child of Ui)
  *	RC_RB - <VegUIButton>, resize capture right-bottom (Child of Ui)
  *	BtnClose - <VegUIButton>, closes the window (Child of Ui)
  *	BtnMaximize - <VegUIButton>, maximizes the window (Child of Ui)
  *	BtnMinimize - <VegUIButton>, minimizes the window (Child of Ui)
  *	
  * Notes: Tutorials
  *
  * http://www.vegui.org/site/blog/26/vegui-tutorial-15---the-window-element.html
  *
  * Properties: Object Properties
  *
  *	minW - *int*, minimum width (pixels)
  *	maxW - *int*, maximum width (pixels)
  *	minH - *int*, minimum height (pixels)
  *	maxH - *int*, maximum height (pixels)
  *	maxX - *int*, x position of the window when maximized
  *	maxY - *int*, y position of the window when maximized
  *	bMaximized - *bool*, set to true if the window is currently maximized
  *	origW - *int*, original width of window (set by <maximize>)
  *	origH - *int*, original height of window (set by <maximize>)
  *	origX - *int*, original x position of window (set by <maximize>)
  *	origY - *int*, original y position of window (set by <minimize>)
  *	pushZ - *int*, push z index (pixels)
  *	title - *string*, read-only, current window title
  *	WinShadow - <VegUINode>, link to WinShadow in the window's manager
  *	winIdx - *int*, read-only, index of the window
  *
  * Properties: Template Properties
  *
  *	T.minW - <minW>
  *	T.minH - <minH>
  *	T.maxW - <maxW>
  *	T.maxH - <maxH>
  *	T.winTitle - <title>
  *	T.pushZ - <pushZ>
  *
  */

/*****************************************************************************/
/** Constructor: VegUIWindow
  *
  * *constructor*
  *
  * See Parent:
  *
  *	<VegUINode::VegUINode>
  */

function VegUIWindow(refName, Parent, Manager) {
  this.constructor = VegUINode;
  this.constructor(refName, Parent, Manager);

  /* objects */
  this.type = VUI_WIN;
  this.Skin = this.add_child('Skin', VUI_NODE);
  this.Ui = this.add_child('Ui', VUI_NODE);
  this.Header = this.Ui.add_child('Header', VUI_BUTTON);
  this.Caption = this.Header.add_child('Caption', VUI_NODE);
  this.RC_R = this.Ui.add_child('RC_R', VUI_BUTTON);
  this.RC_B = this.Ui.add_child('RC_B', VUI_BUTTON); 
  this.RC_RB = this.Ui.add_child('RC_RB', VUI_BUTTON);
  this.BtnClose = this.Ui.add_child('BtnClose', VUI_BUTTON);
  this.BtnMinimize = this.Ui.add_child('BtnMinimize', VUI_BUTTON);
  this.BtnMaximize = this.Ui.add_child('BtnMaximize', VUI_BUTTON);
 
  this.Skin.set_marg(0,0);
  this.Ui.set_marg(0,0);
  
  this.RC_R.T.rmarg_nr = -10;
  this.RC_R.T.bmarg = 5;
  this.RC_R.T.w = 13;
  this.RC_R.T.z = 255;
 
  this.RC_B.T.rmarg = 5;
  this.RC_B.T.bmarg_nr = -10;
  this.RC_B.T.h = 13;
  this.RC_B.T.z = 255;

  this.RC_RB.T.rmarg_nr = -10;
  this.RC_RB.T.bmarg_nr = -10;
  this.RC_RB.T.h = 15;
  this.RC_RB.T.w = 15;
  this.RC_RB.T.z = 255;

  this.Header.set_marg(-1);
  this.BtnClose.T.rmarg_nr = 2;
  this.BtnClose.set(0, 2);
  this.Caption.set(null, null, null, 10, 3);

  this.Header.T.h = 20;
  this.Header.T.micon = 'move';
  this.Header.T.z = 20;
  this.BtnClose.T.z = 21;
  this.BtnMinimize.T.z = 21;
  this.BtnMaximize.T.z = 21;
 
  this.Skin.T.z = 0;
  this.Ui.T.z = 1;
  
  this.bMaximized = 0;
 
  this.RC_B.flags = this.RC_RB.flags = (this.RC_R.flags |= VUI_HMOUSE_MOVE);

  this.WinShadow = this.Manager.WinShadow;

  this.flags |= VUI_HMOUSE_DOWN;

  /** 
   * Methods
   */
  
  /***************************************************************************/
  /** Method: build_win
    *
    * Builds the window
    *
    * *private function*
    * 
    * You should always use <VegUIManager::build_element> to build vegui
    * elements
    *
    * Alias:
    *
    *	build()
    *
    * Parameters:
    *
    *	<HTMLNode toNode> - if submitted the created HTML node will be appedned
    *	to toNode
    *
    * Returns:
    *
    *	int - *1* on success
    *	null - on failure
    *
    * See Parent:
    *
    * 	<VegUINode::build_node>
    */
  
  this.build = this.build_win = function(toNode) {
    
    var Win = this;
    
    if(!this.build_node())
      return null;
 
    /* set mouse states */
  
    this.Header.States[VUI_MOUSE_DOWN].Scripts.add(
      function() { Win.tgl_drag(1);}
    );
    this.Header.States[VUI_MOUSE_UP].Scripts.add(
      function() { Win.tgl_drag(0);}
    );

    this.BtnClose.States[VUI_MOUSE_UP].Scripts.add(
      function() { Win.close();}
    );
    
    this.BtnMaximize.States[VUI_MOUSE_UP].Scripts.add(
      function() { Win.maximize(); }
    );
     
    this.BtnMinimize.States[VUI_MOUSE_UP].Scripts.add(
      function() { Win.minimize(); }
    );
   
    this.RC_R.States[VUI_MOUSE_MOVE].Scripts.add(
      function(argArr) { argArr[0].Css.cursor = 'e-resize'; }
    );

    this.RC_B.States[VUI_MOUSE_MOVE].Scripts.add(
      function(argArr) { argArr[0].Css.cursor = 's-resize'; }
    );

    this.RC_RB.States[VUI_MOUSE_MOVE].Scripts.add(
      function(argArr) { argArr[0].Css.cursor = 'se-resize'; }
    );

    this.RC_R.States[VUI_MOUSE_OUT].Scripts.add(
      function(argArr) { argArr[0].Css.cursor = 'default'; }
    );

    this.RC_B.States[VUI_MOUSE_OUT].Scripts.add(
      function(argArr) { argArr[0].Css.cursor = 'default'; }
    );
  
    this.RC_RB.States[VUI_MOUSE_OUT].Scripts.add(
      function(argArr) { argArr[0].Css.cursor = 'default'; }
    );

    this.RC_R.States[VUI_MOUSE_DOWN].Scripts.add(
      function() { Win.tgl_resize(1); }
    );

    this.RC_R.States[VUI_MOUSE_UP].Scripts.add(
      function() { Win.tgl_resize(0); }
    );
  
    this.RC_B.States[VUI_MOUSE_DOWN].Scripts.add(
      function() { Win.tgl_resize(1); } 
    );
  
    this.RC_B.States[VUI_MOUSE_UP].Scripts.add(
      function() { Win.tgl_resize(0); }
    );

    this.RC_RB.States[VUI_MOUSE_DOWN].Scripts.add(
      function() { Win.tgl_resize(1); } 
    );
  
    this.RC_RB.States[VUI_MOUSE_UP].Scripts.add(
      function() { Win.tgl_resize(0); } 
    );
 
    this.States[VUI_MOUSE_DOWN].Scripts.add(
      function() { Win.set_focus(null,true); }
    );
  
    this.title = this.T.winTitle;
    this.minW = this.T.minW || 0;
    this.maxW = this.T.maxW || this.Manager.width();
    this.minH = this.T.minH || 0;
    this.maxH = this.T.maxH || this.Manager.height();
    this.maxX = this.T.maxX || 0;
    this.maxY = this.T.maxY || 0;

    this.pushZ = this.T.pushZ || 0;
  
    this.set_caption(this.title);
    this.dock(toNode);
    this.set_focus(null, true);
   
    if(this.Manager.Taskbar) {
      this.Manager.Taskbar.taskbutton_add(this);
    }
    
    return 1;
  };
  
  /***************************************************************************/
  /** Method: clone_win
    * 
    * Clones a window, calls clone_node() and also clones window specific
    * event handlers
    *
    * *private function*
    *
    * Alias:
    *
    *	clone()
    *
    * Parameters:
    *
    *	VegUIWindow Template - the template window to clone from
    *
    * Returns:
    *
    *	VegUIWindow - this 
    *
    * See Parent:
    *
    *	<VegUINode::clone_node>
    */

  this.clone = this.clone_win = function(Template) {
    this.clone_node(Template);

    this.ontofront = this.clone_event(Template.ontofront);
    this.ontoback = this.clone_event(Template.ontoback);
    this.onwinfocus = this.clone_event(Template.onwinfocus);
    this.onminimize = this.clone_event(Template.onminimize);
    this.onmaximize = this.clone_event(Template.onmaximize);

    return this;
  };
  
  /***************************************************************************/
  /** Method: close
    * 
    * Closes the window. If the <VUI_KILL_ON_CLOSE> flag is set it will also
    * destroy the window. Will trigger <onclose> event
    *
    * Example:
    *
    * (start code)
    * // window will be hidden and can be made visible again
    * // by calling the .show() method
    * myWin.close();
    *
    * // window will be destroyed
    * myWin.flags |= VUI_KILL_ON_CLOSE
    * myWin.close();
    * (end)
    */
  
  this.close = function() {
    if((this.flags & VUI_KILL_ON_CLOSE)) {
      this.kill(1);
    } else
      this.hide(1);

    var i,z=0,W,SW;
    for(i in this.Manager.W) {
      W = this.Manager.W[i];
      if(W && W.Css && !W.is_hidden() && W.eleIdx != this.eleIdx && parseInt(W.Css.zIndex) > z) {
	SW = this.Manager.W[i];
	z = parseInt(SW.Css.zIndex);
      }
    }

    if(SW) {
      SW.set_focus(VUI_FOCUS_ACTIVE, true);
    }
    
    this.event_execute('onclose');
  };
  
  /***************************************************************************/
  /** Method: drag
    *
    * This method is called when the mouse is moved while drag mode for
    * this window is on. It moves the WinShadow element to a new
    * position
    *
    * *private function*
    *
    * See also:
    *
    *	<tgl_drag>
    */
  
  this.drag = function() {
    
    var x = mouseX;
    var y = mouseY;
    
    if(!this.bDrag)
      return;
    this.WinShadow.move(
      (
        !(this.flags & VUI_NOMOVE_X) ?
        this.WinShadow.x() - (this.lastDragX - x) :
        null
      ),
      (
        !(this.flags & VUI_NOMOVE_Y) ?
        this.WinShadow.y() - (this.lastDragY - y) :
        null
      )
    );
    this.lastDragY = y;
    this.lastDragX = x;
  };

  /***************************************************************************/
  /** Method: maximize
    *
    * Maximizes the window, moving it to the position this.maxX,maxY and
    * resizing it to this.maxW, this.maxH
    *
    * If window is maximized when this method is called it will be restored
    * to its original proportions and position
    *
    * See Also:
    *
    *	<minimize>, <close>
    */

  this.maximize = function() {
    
    if(this.flags & VUI_NOMAXIMIZE)
      return 0;
 
    if(this.flags & VUI_NORESIZE_H || this.flags & VUI_NORESIZE_W)
      return 0;
  
    if(!this.bMaximized) {
      
      this.origX = this.x();
      this.origY = this.y();
      this.origW = this.width();
      this.origH = this.height();
      
      this.move(this.maxX, this.maxY);
      this.resize(this.maxW, this.maxH);
      
    } else {
      
      this.move(this.origX, this.origY);
      this.resize(this.origW, this.origH);
     
    }

    this.bMaximized ^= 1;

    if(this.onmaximize)
      this.onmaximize(this.bMaximized);
    
  };
 
  /***************************************************************************/
  /** Method: minimize
    *
    * Minimizes the window, hiding it from the user but never destroying 
    * it
    */

  this.minimize = function() {
    
    if(this.flags & VUI_NOMINIMIZE)
      return 0;
    
    this.hide(1);
    this.event_execute('onminimize');
  };

  /***************************************************************************/
  /** Method: mresize
    *
    * Resizes the WinShadow element in relation to the mouse cursor coordinates
    *
    * This function is called when the user clicks on one of the resize 
    * panels on the borders of the window
    *
    * *private function*
    *
    * Paramters:
    *
    *	string dir - resize direction, makes sure the window can only be
    *	resized in the given direction ('e-resize', 's-resize', 'se-resize')
    *
    * See also:
    *
    *	<tgl_resize>
    */
  
  this.mresize = function(dir) {
    
    var x = mouseX;
    var y = mouseY;
    var w = this.WinShadow.width() - (this.lastDragX - x);
    var h = this.WinShadow.height() - (this.lastDragY - y);

    if(dir == 'e-resize' && !(this.flags & VUI_NORESIZE_W) && w >= this.minW && w <= this.maxW)
      this.WinShadow.resize(w, null);
    else if(dir == 's-resize' && !(this.flags & VUI_NORESIZE_H) && h >= this.minH && h <= this.maxH)
      this.WinShadow.resize(null, h);
    else if(dir == 'se-resize') {
      this.WinShadow.resize(
        (
          (!(this.flags & VUI_NORESIZE_W) && w >= this.minW && w <= this.maxW) ?
          this.WinShadow.width() - (this.lastDragX - x) : 
          null
        ),
        ( 
          (!(this.flags & VUI_NORESIZE_H) && h >= this.minH && h <= this.maxH) ?
          this.WinShadow.height() - (this.lastDragY - y) :
          null
        )
      );
    }
    this.lastDragX = x;
    this.lastDragY = y;
  };
  
  /***************************************************************************/
  /** Method: put_shadow
    *
    * This makes the WinShadow element visible and molds it to fit the
    * window's proportions and position
    *
    * *private function*
    */
  
  this.put_shadow = function() {
    this.WinShadow.set_pos('absolute', VUI_WIN_Z*100);
    this.WinShadow.resize(this.width(), this.height());
    this.WinShadow.move(this.x(), this.y());
    this.WinShadow.hide(0);
  };
  
  /***************************************************************************/
  /** Method: set_win
    *
    * Sets the most common template properties of the window
    *
    * Alias:
    *
    *	set()
    *
    * Parameters:
    *
    *	string title - title of the window
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
    * myWin.set('Some Window!', 500, 300, 50, 50);
    * (end)
    */
  
  this.set = this.set_win = function(title, w, h, x, y) {
    if(title) this.T.winTitle = title;
    this.set_node(null, w, h, x, y);
  };
  
  /***************************************************************************/
  /** Method: set_caption
    *
    * Sets the title of the window
    *
    * Paramters: 
    *
    *	string txt - new title for the window
    *
    * Example:
    *
    * (start code)
    * myWin.set_caption('Another title for my window');
    * (end)
    */
  
  this.set_caption = function(txt) {
    this.winTitle = txt;
    this.Caption.clear(document.createTextNode(txt));
  };
 
  /***************************************************************************/
  /** Method: set_focus_win
    *
    * Similar to <VegUI::set_focus_node> but also has the option to bring
    * the window to the foreground and z-sort the other windows
    *
    * Alias:
    *
    *	set_focus()
    *
    * Parameters:
    *
    *	int focusType - <Focus types>
    *	bool bringToFron - if true the window is brough to the foreground
    *
    * See Parent:
    *
    *	<VegUINode::set_focus_node>
    */
  
  this.set_focus = this.set_focus_win = function(focusType, bringToFront) {
  
    var hadFocus, M = this.Manager;
 
    if(! (hadFocus = this.check_focus(focusType)) )
      this.set_focus_node(focusType);

    if(!bringToFront)
      return;

    this.set_pos(null, VUI_WIN_Z+this.pushZ);

    this.event_execute('ontofront');
   
    var lastZ = this.Css.zIndex;
    var w, z, i = 1, W, l;
 
    /*
     * decrement z-index on all windows that had
     * a z-index bigger than this window's original
     * z-index
     */
 
    var zArr = [];
 
    for(w in M.W) {
      W = M.W[w];
      if(W == this || !W.Css)
        continue;
      zArr.push(W);
    }

    zArr.sort(
      function(W1,W2) {
        return W2.Css.zIndex-W1.Css.zIndex; 
      }
    );

    for(w = 0, l = zArr.length; w < l; w++) {
      W = zArr[w];
      
      W.set_pos(null, lastZ - (i+=VUI_WIN_Z_SPACE));
      W.event_execute('ontoback');
    }  

    if(!hadFocus)
      this.event_execute('onwinfocus'); 
  };

  /***************************************************************************/
  /** Method: show
    *
    * Unhides the window and gives focus to it
    */

  this.show = function() {
    this.hide(0);
    this.set_focus(VUI_FOCUS_ACTIVE, true);
    if(this.Manager.Taskbar) {
      this.Manager.Taskbar.taskbutton_add(this);
    }
  };
  
  /***************************************************************************/
  /** Method: tgl_drag
    *
    * Toggles drag mode on or off, when the window is in drag mode the
    * WinShadow element is visible and moves with the mouse cursor
    *
    * Parameters:
    *
    *	bool b - true (on), false (off)
    *
    * See also:
    *
    *	<drag>
    *
    */
  
  this.tgl_drag = function(b) {
    this.Header.lockFocus = this.bDrag = b;
    var Win = this;
    if(b) {
      this.Manager.States[VUI_MOUSE_MOVE].Scripts.add(
        function(argArr) { Win.drag(); },
        'windrg'
      );
      this.lastDragX = mouseX;
      this.lastDragY = mouseY;
      this.put_shadow();
    } else {
      this.Manager.States[VUI_MOUSE_MOVE].Scripts.free('windrg');
      this.move(this.WinShadow.x(), this.WinShadow.y());
      this.WinShadow.hide(1);
    }
  };
  
  /***************************************************************************/
  /** Method: tgl_resize
    *
    * Toggles resize mode on or off. When resize mode is on the WinShadow
    * element resizes in relation to mouse cursor movements
    *
    * Parameters:
    *
    *	bool b - true (on) , false (off)
    *
    * See also:
    *
    *  <mresize>
    */
  
  this.tgl_resize = function(b) {
    if(this.bDrag)
      return;
    var cursor;
    var Win = this;

    this.RC_R.lockFocus = this.RC_B.lockFocus = this.RC_RB.lockFocus = b;

    if(this.RC_R.Css.cursor == 'e-resize')
      cursor = 'e-resize';
    else if(this.RC_B.Css.cursor == 's-resize')
      cursor = 's-resize';
    else if(this.RC_RB.Css.cursor = 'se-resize')
      cursor = 'se-resize';

    this.bResize = b;
    if(b && cursor) {
      this.Manager.States[VUI_MOUSE_MOVE].Scripts.add(
        function(argArr) { Win.mresize(cursor);},
        'winrsz'
      );
      this.lastDragX = mouseX;
      this.lastDragY = mouseY;
      this.put_shadow();
    } else {
      this.Manager.States[VUI_MOUSE_MOVE].Scripts.free('winrsz');
      this.resize(this.WinShadow.width(), this.WinShadow.height());
      this.WinShadow.hide(1);
    }
  };
  
  /**
   * Functions: Event Handlers
   *
   *	onclose - when <close> is called
   *	onwinfocus - when <set_focus_win> is called
   *	ontoback - when window is moved to the background
   *	ontofront - when window is brought to the front
   *	onmaximize - when <maximize> is called
   *	onminimize - when <minimize> is called
   */
  
  this.onclose = function() { return true; };
  this.onwinfocus = function() { return true; };
  
  this.ontofront = function() { return true; };
  this.ontoback = function() { return true; };
  this.onminimize = function() { return true; };
  this.onmaximize = function() { return true; };

  this.Manager.W[this.Manager.winIdx] = this;
  this.winIdx = this.Manager.winIdx;
  this.Manager.winIdx++;
}
VegUIWindow.prototype = VegUINode;

