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

/** Constant: VUI_SCOLL
  * vegUI element type for <VegUIScrollbar>
  */

var VUI_SCROLL = 6;

vui_module_add(VUI_SCROLL, VegUIScrollbar, 'vegui.scrollbar.class.js');

/******************************************************************************
 * V E G U I  S C R O L L B A R
 *****************************************************************************/
/** Class: VegUIScrollbar
  *
  * *extends VegUINode*
  *
  * Inherits properties and functions from: <VegUINode>
  *
  * (start code)
  * VegUINode
  *	|
  *	|
  *	+--> VegUIScrollbar
  * (end)
  * 
  * Type:
  *
  *	<VUI_SCROLL>
  *
  * Child Elements:
  *
  *	These children are all accessable over *this.[child_name]*
  *
  *	Btn1 - *VUI_BUTTON*, Button to scroll up or left
  *	Btn2 - *VUI_BUTTON*, Button to scroll up or right
  *	Btn3 - *VUU_BUTTON*, Button that can be dragged to scroll
  *
  * Properties: Object Properties
  *
  *	CHolder - *VegUIElement*, the content holder element this scroll bar is linked 
  *	to
  *	Content - *VegUIElement*, the content element this scroll bar is linked to
  *	scrollSpeed - *int*, interval of timer when auto scroll is on
  *	scrollStep - *int*, pixels moved each scroll step
  *	dir - *char*, direction type of the scrollbar, 'y' or 'x'
  *	scrollInterval - *Interval*, holds the interval object when auto scroll is on
  *	bDrag - *bool*, is true if scrollbar is in drag mode
  *	skipButtonAlign - *bool*, if true buttons will not be aligned automatically
  *	on <build_scroll>
  *
  * Properties: Template Properties
  *
  *	T.scrollSpeed - <scrollSpeed>
  *	T.scrollStep - <scrollStep>
  *	T.scrollDir - <dir>
  *	T.skipButtonAlign - <skipButtonAlign>
  */
  
/***************************************************/
/** Constructor */

function VegUIScrollbar(refName, Parent, Manager) {
  this.constructor = VegUINode;
  this.constructor(refName, Parent, Manager);
  
  this.type = VUI_SCROLL;
  this.T.scrollDir = 'y';
  this.CHolder = null;
  this.Content = null;
 
  this.Btn1 = this.add_child('Btn1', VUI_BUTTON);
  this.Btn2 = this.add_child('Btn2', VUI_BUTTON);
  this.Btn3 = this.add_child('Btn3', VUI_BUTTON);
  
  this.Btn1.T.z = 2;
  this.Btn2.T.z = 2;
  this.Btn3.T.z = 0;
  
  this.T.scrollSpeed = 20;
  this.T.scrollStep = 5;
 
 
  /**
   * Methods
   */
  
  /***************************************************************************/
  /** Method: asa
    *
    * Returns the size of the active scroll area in the scrolbar. The active
    * scroll area is the are between Btn1 and Btn2. If the scrollbar is
    * of type 'x' then width is returned else height
    *
    * Returns:
    *
    *	int - avtice scroll area size (pixels)
    */
  
  this.asa = function() {
    return (!this.is_x() ? (this.height() - this.Btn1.height() - this.Btn2.height()) : (this.width() - this.Btn1.width() - this.Btn2.width()));
  };
  
  /***************************************************************************/
  /** Method: build_scroll
    * 
    * Builds the scrollbar
    *
    * Alias: 
    *
    *	build()
    *
    * Parameters:
    *
    *	<HTMLnode> toNode - if submitted the created HTML node will be appended
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
  
  this.build = this.build_scroll = function(toNode) {
  
    this.dir = this.T.scrollDir;
    
    this.skipButtonAlign = this.T.skipButtonAlign;

    if(!this.skipButtonAlign) {
      if(!this.is_x()) {
        this.Btn2.T.bmarg_nr = 0;
        this.Btn3.T.rmarg = 0; 
      } else {
        this.Btn2.T.rmarg_nr = 0;
        this.Btn3.T.bmarg = 0; 
      }
    }
  
    this.scrollSpeed = this.T.scrollSpeed;
    this.scrollStep = this.T.scrollStep;
  
    if(!this.build_node())
      return null;
  
    /* Set up button events */
    
    this.Btn1.States[VUI_MOUSE_DOWN].Scripts.add(
      function(argArr) { argArr[0].Parent.tgl_scroll(1,0); }
    );
    this.Btn2.States[VUI_MOUSE_DOWN].Scripts.add(
      function(argArr) { argArr[0].Parent.tgl_scroll(1,1); }
    );
    this.Btn1.States[VUI_MOUSE_UP].Scripts.add(
      function(argArr) { argArr[0].Parent.tgl_scroll(0); }
    );
    this.Btn2.States[VUI_MOUSE_UP].Scripts.add(
      function(argArr) { argArr[0].Parent.tgl_scroll(0); }
    );
    this.Btn3.States[VUI_MOUSE_UP].Scripts.add(
      function(argArr) { argArr[0].Parent.tgl_drag(0); }
    );
    this.Btn3.States[VUI_MOUSE_DOWN].Scripts.add(
      function(argArr) { argArr[0].Parent.tgl_drag(1); }
    ); 
  
    /* 
     * Set up bounding boxes for button 3
     */

    if(!this.is_x()) {
      this.Btn3.onresize = function() {
        this.BBox.set(
          0,
          this.Parent.Btn1.height(),
          this.Parent.width(),
          this.Parent.asa(),
          true,
          true
        );
      };
    } else {
      this.Btn3.onresize = function() {
        this.BBox.set(
          this.Parent.Btn1.width(),
	  0,
	  this.Parent.asa(),
	  this.Parent.height(),
	  true,
          true
        );
      };
    }

    this.sync();
  
    this.Css.overflow = 'hidden';
    this.dock(toNode);
    return 1;
  };

  /****************************************************************************/
  /** Method: disable_scroll
    *
    * Similar to the <VegUINode::disable_node> method but makes sure all
    * children will be disabled as well.
    *
    * Alias:
    *
    *	disable()
    *
    * Parameters:
    *
    *	bool b - true (disable) false (enable)
    *
    * See also
    *
    *	<VegUINode::disable_node>
    */
  
  this.disable = this.disable_scroll = function(b) {
    this.disable_node(b);
    this.Btn1.disable(b);
    this.Btn2.disable(b);
    this.Btn3.disable(b);
  };  
  
  /***************************************************************************/
  /** Method: drag
    *
    * Move Btn3 to a new position and sync the content element's position to it
    *
    * Parameters:
    *
    *	int x - new x position of the Btn3
    *	int y - new y position of the Btn3
    *
    * See also:
    *
    *	<tgl_drag>, <scroll>
    */
  
  this.drag = function(x, y) {
    if(!this.bDrag)
      return;
  
    if(!this.is_x()) {
      this.Btn3.move(null, this.Btn3.y() - (this.lastDragY - y));
      this.lastDragY = y;
    } else {
      this.Btn3.move(this.Btn3.x() - (this.lastDragX - x), null);
      this.lastDragX = x;
    }
    this.sync(1);
  };
  
  /****************************************************************************/
  /** Method: is_x
    *
    * Checks if scroll bar is an x axis or an y axis scroll bar
    * 
    * Returns:
    *
    *	bool - true if direction is x
    *	bool - false if direction is y
    */
  
  this.is_x = function() {
    return (this.dir == 'x' ? true : false);
  };
  
  /***************************************************************************/
  /** Method: link
    *
    * Links two VegUIElement as CHolder and Content. The Content element should
    * be a child of the CHolder element
    *
    * Parameters:
    *
    *	VegUIElement CHolder - The content holder element that holds the content
    *	to be scrolled
    *	VegUIElement Content - The element that holds the content
    *
    * See also:
    *
    *	<sync>
    */
  
  this.link = function(CHolder, Content) {
    this.CHolder = CHolder;
    this.Content = Content;
    this.update_content_boundary();
    this.sync();
  };
  
  /***************************************************************************/
  /** Method: overflow
    * 
    * Calculate content overflow ratio
    *
    * Returns:
    *
    *	int - content overflow ration 
    */
    
  this.overflow = function() {
    if(!this.CHolder || !this.Content)
      return 0;
    var res = (!this.is_x() ? (this.Content.height() / this.CHolder.height()) : (this.Content.width() / this.CHolder.width()));
    if(isNaN(res))
      res = 0;
    return (res < 1?0:res);
  };
  
  /***************************************************************************/
  /** Method: scroll
    *
    * Scrolls content into the specified direction
    *
    * Parameters:
    *
    *	bool dir - false = up/left, true = down/right
    *	<int rep> - repeat scroll n times
    *
    * See also:
    *
    *	<tgl_scroll>, <drag>
    */
  
  this.scroll = function(dir, rep) {
    if(!this.is_x()) {
      if(!dir) {
        if(this.Content.y() < 0)
	  this.Content.move(null, this.Content.y() + this.scrollStep);
      } else
        this.Content.move(null, this.Content.y() - this.scrollStep);
    } else {
      if(!dir) {
        if(this.Content.x() < 0)
	  this.Content.move(this.Content.x() + this.scrollStep, null);
      } else
        this.Content.move(this.Content.x() - this.scrollStep, null);
    }

    this.sync();
    if(this.Content.BBox.bumped || this.Btn3.BBox.bumped) {
      this.tgl_scroll(0);
    } else if(!isNaN(rep) && rep)
      this.scroll(dir, (rep-1));
    
  };
  
  /***************************************************************************/
  /** Method: set_scroll
    * 
    * Sets the most common template properties for the scrollbar
    *
    * Alias:
    *
    *	set()
    *
    * Parameters:
    *
    *	char dir - direction type of the scrollbar 'x' or 'y'
    *	int x - x position of the scroll bar (pixels)
    *	int y - y position of the scroll bar (pixels)
    *	int w - width of the scroll bar (pixels)
    *	int h - height of the scroll bar (pixels)
    *
    * See also:
    *
    *	<VegUINode::set_node>
    */
  
  this.set = this.set_scroll = function(dir, x, y, w, h) {
    if(dir)
      this.T.scrollDir = dir; 
    this.set_node(null, w, h, x, y);
  };
  
  /***************************************************************************/
  /** Method: sync
    *
    * Syncs the position and proportions of Btn3 to the Contenr overflow
    * ratio of the CHolder and Content elements. Can also sync the position
    * of the content element to the position of Btn3
    *
    * Parameters:
    *
    *	bool b - if true content is sync'd to scroll bar, if false Btn3 is
    *	synced to content
    * 
    * See also:
    *
    *	<link>
    */
  
  this.sync = function(b) {
    var mod;
    if(!b) {
      
      /* Sync Scrollbar to content */
      
      if(!this.is_x()) {
        if(this.overflow() <= 1) {
          
	  /* No content overflow */
          
	  this.Btn3.move(0, this.Btn1.height());
          this.Btn3.resize(0, this.asa()); 
      
        } else {
          
	  var f = (this.asa() / this.overflow());
        
	  /*
	   * make sure the button does not get resized smaller than its
	   * original scale
	   */

	  if( f >= this.Btn3.origH)
            this.Btn3.resize(null, f);
	  else 
            this.Btn3.resize(null, this.Btn3.origH);
        
	  /* figure out sync ratio */

          var cov_bar = this.Btn3.height() / (this.asa() / 100);
	  var cov_con = this.CHolder.height() / (this.Content.height() / 100);
          
	  if(cov_bar > cov_con)
	    var cov_diff = 1 - (Math.abs(cov_bar - cov_con) / 100);
	  else
	    var cov_diff = 1 + (Math.abs(cov_bar - cov_con) / 100);
	
	  var pos_bcon = Math.abs(this.Content.y())  / ( this.Content.height() / 100);
	  mod = ( (this.asa() / 100) * (pos_bcon*cov_diff)) + this.Btn1.height(); 
        
	  /* sync */
    
          this.Btn3.BBox.enabled = false;
          this.Btn3.move(null, mod);
          this.Btn3.BBox.enabled = true;
          this.Btn3.BBox.correct();
        }
      
      } else {
       
        if(this.overflow() <= 1) {
        
	  this.Btn3.move(this.Btn1.width(), 0);
	  this.Btn3.resize(this.asa(), 0);
        
	} else {
        
	  var f = (this.asa() / this.overflow());
        
	  /*
	   * make sure the button does not get resized smaller than its
	   * original scale
	   */

	  if( f >= this.Btn3.origW)
            this.Btn3.resize(f, null);
	  else 
            this.Btn3.resize(this.Btn3.origW, null);
        
	  /* figure out sync ratio */

          var cov_bar = this.Btn3.width() / (this.asa() / 100);
	  var cov_con = this.CHolder.width() / (this.Content.width() / 100);
         
	  if(cov_bar > cov_con)
	    var cov_diff = 1 - (Math.abs(cov_bar - cov_con) / 100);
	  else
	    var cov_diff = 1 + (Math.abs(cov_bar - cov_con) / 100);
	
	  var pos_bcon = Math.abs(this.Content.x())  / ( this.Content.width() / 100);
	  mod = ( (this.asa() / 100) * (pos_bcon*cov_diff)) + this.Btn1.width(); 
        
	  /* sync */
  
          this.Btn3.BBox.enabled = false;
          this.Btn3.move(mod,null);
          this.Btn3.BBox.enabled = true;
          this.Btn3.BBox.correct();

        }
      }
    } else {
      
      /* Sync Content to scrollbar */
    
      if(!this.is_x()) {
        var pos_bar = (this.Btn3.y()-this.Btn1.height()) / ( (this.asa() - this.Btn3.height()) / 100);
        mod = -(( (this.Content.height() - this.CHolder.height()) / 100)*pos_bar);
        this.Content.move(null, mod);
      } else {
        var pos_bar = (this.Btn3.x()-this.Btn1.width()) / ( (this.asa() - this.Btn3.width()) / 100);
        mod = -(( (this.Content.width() - this.CHolder.width()) / 100)*pos_bar);
        this.Content.move(mod, null);
      }
    }
    this.disable(this.overflow() <= 1);
  };

  /**************************************************************************/
  /** Method: tgl_drag
    *
    * Toggles drag mode on or off. While in drag mode Btn3 will follow 
    * mouse movements
    *
    * Parameters:
    *
    *	bool b - true (on) false (off)
    *
    * See also:
    *
    *	<drag>, <tgl_scroll>
    */
    
  this.tgl_drag = function(b) {
    if(b) {
      var _Scroll = this;
      this.Manager.States[VUI_MOUSE_MOVE].Scripts.add(
        function(argArr) { _Scroll.drag(mouseX, mouseY); },
        'scrldrg'
      );
      this.lastDragX = mouseX;
      this.lastDragY = mouseY;
    } else {
      this.Manager.States[VUI_MOUSE_MOVE].Scripts.free('scrldrg');
    }
    this.bDrag = b;
  };
  
  /***************************************************************************/
  /** Method: tgl_scroll
    *
    * Toggles auto scroll mode on or off. If the scrollbar is in auto scroll
    * mode then the content will be scrolled until it is either toggled off
    * again or the content's BBox bumped
    *
    * Parameters:
    *
    *	bool b - true (on) false (off)
    *	bool dir - false = up/left , true = down/right
    *
    * See also:
    *
    *	<scroll>
    */
  
  this.tgl_scroll = function(b, dir) {
    if(b) {
      this.tgl_scroll(0);
      var SB = this;
      this.scrollInterval = setInterval(
        function() { SB.scroll(dir); },
        this.scrollSpeed
      );
    } else {
      clearInterval(this.scrollInterval);
      this.scrollIntervall = null;
    }
  };
  
  /**************************************************************************/
  /** Method: update_content_boundary
    *
    * Updates the BBox settings for the Content element that is linked
    * to this scrollbar
    *
    */
  
  this.update_content_boundary = function() {
    if(!this.Content)
      return;

    var y_diff = this.Content.height() - this.CHolder.height();  
    var x_diff = this.Content.width() - this.CHolder.width();
   
    if(x_diff < 1) x_diff = 0;
    if(y_diff < 1) y_diff = 0;
  
    this.Content.BBox.set(
      (0 - x_diff) - 5,
      (0 - y_diff) - 5,
      this.CHolder.width() + (x_diff * 2) + 5, 
      this.CHolder.height() + (y_diff * 2) + 5,
      true,
      true
    );
  };
 
}
VegUIScrollbar.prototype = VegUINode;
