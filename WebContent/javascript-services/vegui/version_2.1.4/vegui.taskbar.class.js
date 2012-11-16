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

/* Constant: VUI_TASKBAR
 * vegUI element type for <VegUITaskBar>
 */

var VUI_TASKBAR = 20;

vui_module_add(VUI_TASKBAR, VegUITaskBar, 'vegui.taskbar.class.js');

/* Constant: Taskbar Order Types
 *
 * 	VUI_TB_HORIZONTAL - tasks get ordered horizontally
 *	VUI_TB_VERTICAL - tasks get order vertically
 */

var VUI_TB_HORIZONTAL = 1;
var VUI_TB_VERTICAL = 2;

/******************************************************************************
 * T A S K B A R **************************************************************
 *****************************************************************************/
/** Class: VegUITaskBar
  *
  * A task bar that holds one button for each window spawned. Clicking
  * the button will give focus to the window
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
  *    +--> VegUITaskBar
  * (end)
  *
  * Notes: Type
  *
  *	<VUI_TASKBAR>
  *
  * Notes: Dependencies
  *
  *	file - <vegui.button.class.js>
  *
  * Notes: Automatic adding of windows to taskbar
  *
  * If you set the Taskbar property of the vegUIManager element to point
  * to your taskbar then any windows will have task buttons added automatically
  * when they are built:
  *
  * (start code)
  * Manager.Taskbar = Manager.get_new(VUI_TASKBAR);
  * Manager.Taskbar.set(500,20,0,0,VUI_TB_HORIZONTAL,5);
  * Manager.build_element(Manager.Taskbar);
  * (end)
  * 
  * Child Elements:
  *
  *	All of these child elements are accessable by *this.[child_name]* even
  *	though they may not be all direct children of this element
  *
  *	TplButton - <VegUIButton>, all task buttons will be cloned from
  *	this button
  *
  * Properties: Object Properties
  *
  *	Btns - *object*, holds all the buttons in the taskbar
  *	buttonSpace - *int*, space between task buttons 
  *	tbType - *int*, taskbar type
  *	btnNum - *int*, button counter
  *	btnOffset - *int*, offset position
  *
  * Properties: Template Properties
  *
  *	T.buttonSpace - <buttonSpace>
  *	T.tbType - <tbType>
  *	T.btnOffset - <btnOffset>
  */

/*****************************************************************************/
/** Constructor: VegUITaskBar
  *
  * *constructor*
  *
  * See Parent:
  *
  *	<VegUINode::VegUINode>
  */

function VegUITaskBar(refName, Parent, Manager) {

  /* constructor */

  this.constructor = VegUINode;
  this.constructor(refName, Parent, Manager);

  /* properties */

  this.type = VUI_TASKBAR;
  this.Btns = {};
  this.tbType = VUI_TB_HORIZONTAL;
  this.buttonSpace = 5;
  this.btnNum = 0;

  /* children */
  
  this.TplButton = this.add_child('TplButton', VUI_BUTTON);

  this.TplButton.flags |= VUI_TEMPLATE;

  /* methods */

  /**************************************************************************/
  /** Method: set_taskbar
    *
    * Sets the most common template properties for the taskbar
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
    *	int type - task bar type <Taskbar Order Types>
    *	int space - space between task buttons (pixels)
    *
    * See Parent:
    *
    *	<VegUINode::set_node>
    *
    * Example:
    *
    * (start code)
    * TaskBar.set(500,20,0,0,VUI_TB_HORIZONTAL,5);
    * (end)
    */

  this.set_taskbar = this.set = function(w,h,x,y,type,space) {
    this.set_node('div', w, h, x, y);
    if(type)
      this.T.tbType = type;
    if(!isNaN(space))
      this.T.buttonSpace = space;
  };

  /**************************************************************************/
  /** Method: build_taskbar
    *
    * builds the taskbar
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
    *	<HTMLNode toNode> - if submitted the created html node will be 
    *	appended to toNode
    *
    * Returns:
    *
    *	int - *1* on success
    *	null - on failure
    */

  this.build_taskbar = this.build = function(toNode) {
    
    this.tbType = this.T.tbType || VUI_TB_HORIZONTAL;
    this.buttonSpace = this.T.buttonSpace;
    this.btnOffset = this.T.btnOffset || 0;

    if(!this.build_node())
      return null;

    this.dock(toNode);
    return 1;
  };

  /**************************************************************************/
  /** Method: taskbutton_add
    *
    * Adds a taskbutton for a window
    *
    * Parameters:
    *
    *	VegUIWindow Win - the window element
    *
    * Returns:
    *
    *	VegUIButton - the created button
    *	null - if there already exists a button for the submitted window
    *	null - if the VUI_NOTASK flag is active on the window
    *
    * See also:
    *
    *	<taskbutton_remove>, <taskbutton_reorder>
    *
    * Example:
    *
    * (start code)
    * myWin = Manager.get_new(VUI_WIN);
    * Manager.build_element(myWin);
    * TaskBar.taskbutton_add(myWin);
    * (end)
    */

  this.taskbutton_add = function(Win) {
    if(this.taskbutton_exists(Win))
      return null;
    
    if(Win.flags & VUI_NOTASK)
      return null;
   
    var Btn = this.add_child('Btn_'+Win.winIdx, VUI_BUTTON);
    Btn.clone(this.TplButton);

    Btn.flags ^= VUI_TEMPLATE;
    
    Btn.set(null,null,0,0,0,0,Win.winTitle);
   
    Btn.build(this.Base);
  
    this.Btns[Win.winIdx]=Btn;
    this.btnNum++;
    this.taskbutton_reorder();   
   
    Btn.States[VUI_MOUSE_UP].Scripts.add(
      function() { 
        if(Win.Manager.FX && Win.is_hidden() && typeof vuiTpl_Scale !== 'undefined') {
	  var abs = Btn.abs_middle();
	  Win.Manager.FX.effect_add(
	    Win, new VegUIFXScale(abs[0], abs[1], 300, 0, vuiTpl_Scale, true, VUI_WIN_Z+100),
	    function() { Win.show(); }
	  );
	} else {
	  Win.show(); 
	}
      }
    );
    
    var TB = this;
 
    Win.event_add('onclose', function(args) { TB.taskbutton_remove(args[0]); });

    if(this.Manager.FX) {
    
      Win.event_add(
        'onminimize', function() {
	  if(typeof vuiTpl_Scale == 'undefined')
	    return;
	  var abs = Btn.abs_middle();
          Win.Manager.FX.effect_add(
	    Win, new VegUIFXScale(abs[0], abs[1], 300, 1, vuiTpl_Scale, true, VUI_WIN_Z+100)
	  );
	}
      );

    }
   
    return Btn;
  };

  /***************************************************************************/
  /** Method: taskbutton_exists
    * 
    * Checks if a task button exists for a certain window
    *
    * Parameters:
    *
    *	<VegUIWindow> Win - the window element
    *
    * Returns:
    *
    *	bool - *true* if taskbutton exists for the submitted window
    *	bool - *false* if taskbutton does not exists for the submitted window
    *
    * Example:
    *
    * (start code)
    * // create and build a window
    * myWin = Manager.get_new(VUI_WIN);
    * Manager.build_element(myWin);
    *
    * // add task button to taskbar for window
    * TaskBar.taskbutton_add(myWin)
    *
    * // then this will return true:
    * return TaskBar.taskbutton_exists(myWin);
    * (end)
    */

  this.taskbutton_exists = function(Win) {
    var winIdx = Win.winIdx;
    if(!this.Btns[winIdx])
      return false;
    return true;
  };

  /***************************************************************************/
  /** Method: taskbutton_reorder
    *
    * Reorders taskbuttons, removing any that dont have a window any
    * assigned to them any longer
    *
    */

  this.taskbutton_reorder = function() {
    var i, lastPos = this.buttonSpace, fsize;
     
    if(this.btnOffset)
      lastPos += this.btnOffset;
    
    /*
     * if the total width of the current buttons is wider than the
     * width of the task bar, shrink the buttons
     */

    switch(this.tbType) {
      case VUI_TB_HORIZONTAL:
        if(this.btnNum*this.TplButton.T.w > this.width()) {
          fsize = (this.width() / this.btnNum) - this.buttonSpace - ((this.buttonSpace*2) / this.btnNum);
        }
      break;

      case VUI_TB_VERTICAL:
        if(this.btnNum+this.TplButton.T.h > this.height()) {
          fsize = (this.height() / this.btnNum) - this.buttonSpace - ((this.buttonSpace*2) / this.btnNum);
	}
      break;
    }
   
    for(i in this.Btns) {
      var Btn = this.Btns[i];
      switch(this.tbType) {
        case VUI_TB_HORIZONTAL:
          Btn.move(lastPos, null);
	  if(fsize)
	    Btn.resize(fsize, null);
	break;
	case VUI_TB_VERTICAL:
          Btn.move(null, lastPos);
	  if(fsize)
	    Btn.resize(null, fsize);
	break;
      }
      
      lastPos+=Btn.width()+this.buttonSpace;
    }
  };

  /***************************************************************************/
  /** Method: taskbutton_remove
    *
    * Removes the taskbutton for a window
    *
    * Parameters:
    *
    *	VegUIWindow Win - the window element
    *
    * See also:
    *
    *	<taskbutton_add>
    *
    * Example:
    *
    * (start code)
    * // create and build window element
    * myWin = Manager.get(VUI_WIN);
    * Manager.build_element(myWin);
    *
    * // add taskbutton for window
    * TaskBar.taskbutton_add(myWin);
    *
    * // remove taskbutton from window
    * TaskBar.taskbutton_remove(myWin);
    * (end)
    */

  this.taskbutton_remove = function(Win) {
    var winIdx = Win.winIdx;
    if(!this.Btns[winIdx])
      return null;

    var Btn = this.Btns[winIdx];
    var Taskbar = this;
    
    if(this.Manager.FX) {
      var Effect = this.Manager.FX.effect_add(
        Btn, 
	new VegUIFXFadeOut(500),
        function() { 
          Btn.kill(1);
	  delete Taskbar.Btns[winIdx];
	  Taskbar.taskbutton_reorder(); 
	  Taskbar.btnNum--;
	}
      );
    } else  {
      this.Btns[winIdx].kill(1);
      delete this.Btns[winIdx];
      this.taskbutton_reorder();
      this.btnNum--;
    }
  };


}
VegUITaskBar.prototype = VegUINode;

