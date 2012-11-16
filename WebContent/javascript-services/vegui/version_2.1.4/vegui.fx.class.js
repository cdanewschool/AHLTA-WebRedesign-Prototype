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
 * VegUI FX Manager and effect objects
 *
 * Notes: Tutorials
 *
 * http://www.vegui.org/site/blog/28/vegui-tutorial-17---the-fx-engine.html
 */

/******************************************************************************
 * G L O B A L S **************************************************************
 *****************************************************************************/

/*  Effect 
 *
 *	VUI_FX_TRIGGER - effect that will be triggered right away and
 *	will be removed once done
 *	VUI_FX_HOOK - effect that will be hooked to an element and
 *	be active until removed manually
 */

var VUI_FX_TRIGGER = 1;
var VUI_FX_HOOK = 2;

/* Constants: Effect types
 * 
 *	VUI_FX_FADEIN - fades the element in 
 *	VUI_FX_FADEOUT - fades the element out
 * 	VUI_FX_SHADOW - adds a shadow to the element
 *	VUI_FX_SCALE - grow or shrink an element
 */

var VUI_FX_FADEOUT = 1;
var VUI_FX_FADEIN = 2;
var VUI_FX_SHADOW = 3;
var VUI_FX_SCALE = 4;

/******************************************************************************
 * V E G U I  F X  M A N A G E R **********************************************
 *****************************************************************************/
/** Class: VegUIFXManager
  *
  * Effect manager
  *
  * Properties: Object Properties
  *
  *	Timer - *Interval* , the fx interval
  *	interval - *int*, interval speed (ms) 
  *	effectNum - *int*, number of active effects
  *	Effects - *Array*, holds active effects
  *	Manager - VegUIManager element that the fx manager belongs to
  */

/*****************************************************************************/
/** Constructor: VegUIFXManager 
  *
  * *constructor*
  *
  * Parameters:
  *
  *	VegUIManager Manager - VegUI manager object
  *
  */

function VegUIFXManager(Manager) {
 
  this.Timer = 0;
  this.interval = 20;
  this.effectNum = 0;
  this.Effects = [];
  this.Manager = Manager;
 
  /***************************************************************************/
  /** Method: initialize
    *
    * Initializes the manager at the set interval, note that this does not
    * start the interval timer, it just sets the speed.
    *
    * Paramters:
    *
    *	int interval - fx timer interval (ms)
    *
    * Example:
    *
    * (start code)
    * // initialize the fx manager's effect interval to run at 50 ms
    *
    * FX.init(50);
    * (end)
    *
    */

  this.init = function(interval) {
    this.interval = interval;
  };

  /***************************************************************************/
  /** Method: start
    *
    * Activates the fx timer if any effects are currently active
    *
    * Returns:
    *
    *	null - if Timer is already running
    *   int - *0*, if no effects are queued
    *
    * See Also:
    *
    *	<stop>
    *
    */

  this.start = function() {
    
    if(this.effectNum <= 0)
      return this.stop();
    else if(this.Timer)
      return null;
    
    var FX = this;
    this.Timer = setInterval(function() { FX.poll(); }, this.interval);
  };

  /***************************************************************************/
  /** Method: stop
    *
    * Stops the fx timer
    *
    * Returns:
    *
    *	int - *0*
    */

  this.stop = function() {
    this.Timer = clearInterval(this.Timer);
    this.Timer = null;
    return 0;
  };

  /***************************************************************************/
  /** Method: effect_add
    *
    * Adds an effect to a certain vegui element. Effects are added
    * as objects
    *
    * Parameters:
    *
    *	VegUIElement Element - the vegui element that the effect should hook on
    *	VegUIEffect Effect - the effect
    *	<function onhalt> - if submitted this function will be called when
    *	the effect is done
    *
    * Code example:
    *
    * (start code)
    * FX.effect_add(myNode, new VegUIFxFadeOut(2000));
    * (end)
    *
    * Returns:
    *
    *	VegUIEffect - the effect object
    */

  this.effect_add = function(Element, Effect, onhalt) {
    if(!this.Effects[Element.eleIdx])
      this.Effects[Element.eleIdx] = [];
  
    Effect.collides(this.Effects[Element.eleIdx], true);
    Effect.init(Element, this);

    if(onhalt)
      Effect.onhalt = onhalt;
    
    if(!Element.Effects)
      Element.Effects = [];

    Element.Effects[Effect.type] = Effect;
    
    if(!Effect.isPassive) {
      this.Effects[Element.eleIdx][Effect.type] = Effect;
      this.effectNum++;
      this.start();
    } else {
      
      Effect.execute();

      /* since the effect is passive it wont be added to the processing
       * loop of the fx engine, we still need to make sure it gets
       * halted when the element ceases to exist we do that by adding
       * a onkill event to the element
       */

      Element.event_add(
        'onkill', function() { Effect.halt(); }, 'fx_kill_'+Effect.type
      );
      
    }
    
    return Effect;
  };

  /***************************************************************************/
  /** Method: effect_pop
    * 
    * a certain effect for the element with the submited element index
    *
    * Parameters:
    *
    *	int eleIdx - element index of the vegui element
    *	int type - effect type
    *
    * Example:
    *
    * (start code)
    * // add fade out effect to myNode
    * FX.effect_add(myNode, new VegUIFxFadeOut(2000));
    *
    * // remove fade out effect from myNode
    * FX.effect_pop(myNode.eleIdx, VUI_FX_FADEOUT);
    * (end)
    */

  this.effect_pop = function(eleIdx, type) {
    if(this.Effects[eleIdx] && this.Effects[eleIdx][type]) {
      var E = this.Effects[eleIdx][type];
      
      if(E.isPassive) {
        E.Element.onkill.free('fx_kill_'+E.type);
      }
      
      delete this.Effects[eleIdx][type];
      this.effectNum--;
    }
    if(this.effectNum<=0)
      this.stop();
  };

  /***************************************************************************/
  /** Method: poll
    *
    * This is the function that is repeatedly called by the fx timer. It
    * polls the Effects array for any active effects and executes them
    * 
    * *private function*
    *
    */

  this.poll = function() {


    if(this.effectNum <= 0)
      return this.stop();
    
    var i, n, e, effect, element;

    for(i in this.Effects) {
      e = this.Effects[i];
      for(n in e) {
        effect = e[n];
	if(!effect.Element || !effect.Element.Base)
	  this.effect_pop(parseInt(i),effect.type);
	else
	  effect.execute();
      } 
    }
   

  };
}

/******************************************************************************
 * V E G U I  E F F E C T *****************************************************
 *****************************************************************************/
/** Class: VegUIEffect
  *
  * The base object for any effect
  *
  * Properties: Object Properties
  *
  *	Element - VegUIElement, the element this effect is affecting
  *	type - *int*, effect type
  *	Manager - <VegUIFXManager>, FX manager that controls this effect
  *	isPassive - *bool*, if true the effect will be executed when it
  *	is created and will not be added to the processing loop of the
  *	fx engine
  *
  */

/*****************************************************************************/
/** Constructor: VegUIEffect
  *
  * *constructor*
  */
  
function VegUIEffect() {

  this.Element = null;
  this.effectType = VUI_FX_TRIGGER;
  this.type = 0;
  this.Manager = null;
  
  this.Collision = [];

  this.onhalt = function() { return 1; };
  this.execute = function() { return 1; }; 

  /**************************************************************************/
  /** Method: collides
    *
    * Check if effect type exists in an array that collides with this
    * array. When effects collide it means that they can not be affecting
    * the same target at the same time, and one will have to be canceled
    *
    * Parameters:
    *
    *	Array effects - the array holding the effect objects
    *	bool cancelOther - if true the effect in the effects array will be
    *   canceled if false 1 will be returned
    *
    * Returns:
    *
    *	int - *1* if there were coliding effects and cancelOther was
    *	false
    */

  this.collides = function(Effects, cancelOther) {
  
    var i, E; 

    for(i in Effects) {
      E = Effects[i];
      if(E == this) 
        continue;
      if(this.Collision[E.type]) {
	if(!cancelOther) {
	  return 1;
	} else {
          E.halt(true);
	}
      } 
    }
  
  };

  /**************************************************************************/
  /** Method: init 
    *
    * Initialize effect
    *
    * Parameters:
    *
    *	VegUIElement Element - element this effect is affecting
    *	VegUIFXManager Manager - Manager that controls this effect
    */

  this.init = function(Element, Manager) {
    this.Element = Element;
    this.Manager = Manager;
  };

  /**************************************************************************/
  /** Method: halt_effect
    *
    * Alias:
    *
    *	halt()
    *
    * Halts this effect, effectivly removing it
    *
    * Parameters:
    *
    *	bool noOnHalt - if true <onhalt> will not be called
    */

  this.halt = this.halt_effect = function(noOnHalt) {
    this.Manager.effect_pop(this.Element.eleIdx, this.type);
    if(!noOnHalt && this.onhalt) {
      this.onhalt();
    }
  };

}

/******************************************************************************
 * V E G U I  E F F E C T  F A D E  O U T *************************************
 *****************************************************************************/
/** Class: VegUIFXFadeOut
  *
  * fades the target element out, gradually reducing its transparency value
  * to 0
  *
  * Notes: Hierarchy
  *
  *	*extends VegUIEffect*
  *
  *	Inherits all properties and methods from <VegUIEffect>
  *
  * Notes: Type
  *
  *	<VUI_FX_FADEOUT>
  *
  * Notes: Example
  *
  * (start code) 
  * // add fade out effect to myNode with a duration of 1000 ms
  * 
  * FX.effect_add(myNode, new VegUIFXFadeOut(1000));
  *
  * // add fade out effect to myNode with a duration of 1000 ms and
  * // stop the effect when a transparency of 50% is reached
  *
  * FX.effect_add(myNode, new VegUIFXFadeOut(1000, 50));
  * (end)
  *
  * Properties: Object Properties
  *
  *	fadeSpeed - *int*, speed of fading (ms)
  *	limit - *int*, effect will stop when this amount of transparency
  *	is reached
  *
  */

/******************************************************************************/
/** Constructor: VegUIFXFadeOut
  *
  * *concstructor*
  *
  * Parameters:
  *
  *	int fadeSpeed - speed of fading (ms)
  *	int limit - effect will stopped when this amount of transparency
  *	is reached
  */

function VegUIFXFadeOut(fadeSpeed, limit) {

  this.constructor = VegUIEffect;
  this.constructor();

  this.type = VUI_FX_FADEOUT;
  
  this.limit = limit || 0;
  this.fadeSpeed = fadeSpeed || 1000;

  this.Collision[VUI_FX_FADEOUT] = true;
  this.Collision[VUI_FX_FADEIN] = true;

  /***************************************************************************/
  /** Method: execute
    *
    * Execute effect
    */

  this.execute = function() {
    if(!this.Element || !this.Element.Base || !this.Manager)
      return null;

    var interval = 100 / (this.fadeSpeed / this.Manager.interval);
     
    var t = this.Element.transparency;

    if(t > this.limit) 
      this.Element.set_transparency(t-interval);
    else
      this.halt();
  };

}
VegUIFXFadeOut.prototype = VegUIEffect;

/******************************************************************************
 * V E G U I  E F F E C T  F A D E  I N ***************************************
 *****************************************************************************/
/** Class: VegUIFXFadeIn
  * fades the target element in, gradually increasing its transparency value
  * to 100
  *
  * Notes: Hierarchy
  *
  *	*extends VegUIEffect*
  *	
  *	Inherits all properties and methods from <VegUIEffect>
  *
  * Notes: Type
  *
  *	<VUI_FX_FADEIN>
  *
  * Notes: Example
  *
  * (start code)
  * // add the fade in effect with a duration of 1000 ms to myNode
  *
  * FX.effect_add(myNode, new VegUIFXFadeIn(1000));
  *
  * // add the fade in effect with a duration of 1000 ms to myNode, and
  * // make it stop when a transparency of 50% is reached
  *
  * FX.effect_add(myNode, new VegUIFXFadeIn(1000, 50));
  * (end)
  *
  * Properties: Object Properties
  *
  *	fadeSpeed - *int*, speed of fading (ms)
  *	limit - *int*, effect will stop when this transparency value is
  *	reached
  *
  */

/*****************************************************************************/
/** Constructor: VegUIFXFadeIn
  *
  * *constructor*
  *
  * Parameters:
  *
  *	int fadeSpeed - speed of fading (ms)
  *	int limit - stop when limit is reached (min 0, max 100) 
  */

function VegUIFXFadeIn(fadeSpeed, limit) {

  this.constructor = VegUIEffect;
  this.constructor();

  this.type = VUI_FX_FADEIN;

  this.fadeSpeed = fadeSpeed || 1000;
  this.limit = limit || 100;

  this.Collision[VUI_FX_FADEOUT] = true;
  this.Collision[VUI_FX_FADEIN] = true;

  /***************************************************************************/
  /** Method: execute
    * Executes effect
    */

  this.execute = function() {
    if(!this.Element || !this.Element.Base || !this.Manager) {
      return null;
    }

    var interval = 100 / (this.fadeSpeed / this.Manager.interval);

    var t = this.Element.transparency;

    if(t < this.limit) 
      this.Element.set_transparency(t+interval);
    else
      this.halt();
  };

}
VegUIFXFadeIn.prototype = VegUIEffect;

/*****************************************************************************/
/** Class: VegUIFXShadow
  *
  * Adds a shadow effect to a specified vegUI element
  *
  * Notes: Hierarchy
  *
  *	*extends VegUIEffect*
  *	
  *	Inherits all properties and methods from <VegUIEffect>
  *
  * Notes: Type
  *
  *	<VUI_FX_SHADOW>
  *
  * Notes: Tutorials
  *
  *	http://www.vegui.org/site/blog/51/applying-effects-to-template-elements.html
  *
  * Notes: Example
  *
  * (start code)
  * // add shadow effect to myNode at an off set of 5 pixels on the x axis
  * // and 10 pixels on the y axis, with an opacity of 50% and the color
  * // black
  *
  * FX.effect_add(myNode, new VegUIFXShadow(5,10,50,'#000');
  * (end)
  *
  * Properties: Object Properties
  *
  *	x - *int*, x offset of the shadow
  *	y - *int*, y offset of the shadow
  *	opacity - *int*, the opacity of the outer shadow
  *	color - *string*, color of the shadow (css value)
  *	shadowNode - *VegUINode*, holds the shadow node
  *
  */
/*****************************************************************************/
/** Constructor: VegUIFXShadow */

function VegUIFXShadow(x, y, opacity, color) {
  
  /*
   * constructor
   */

  this.constructor = VegUIEffect;
  this.constructor();

  /*
   * properties
   */

  this.type = VUI_FX_SHADOW;
  this.x = x || 8;
  this.y = y || 8;
  this.opacity = opacity || 15;
  this.color = color || '#000';

  this.ShadowNode = null;

  this.isPassive = true;

  /*
   * methods
   */

  /***************************************************************************/
  /** Method: execute 
    * executes effect
    */

  this.execute = function() {
    if(!this.Manager || this.ShadowNode)
      return;

    var M = this.Element.Manager;

    /* create shadow node */
    
    var SN = this.ShadowNode = M.get_new(VUI_NODE);
    SN.T.Css.backgroundColor = this.color;
    SN.T.t = this.opacity;
    SN.set('div', this.Element.width(), this.Element.height());

    /* attach shadow node to the element */
    
    this.Element.attach(this.ShadowNode, this.x, this.y, VUI_BACK);
    
    /* make sure shadow node is resized correctly with the element */

    this.Element.event_add(
      'onresize',
      function(a) { SN.resize(a[0].width(), a[0].height()); },
      'fx_shadow'
    );

    this.Element.event_add(
      'onhide',
      function(a) { SN.hide(a[0].is_hidden()); },
      'fx_shadow'
    );

    M.build_element(
      this.ShadowNode, this.Element.Base.parentNode
    );
  };

  /***************************************************************************/
  /** Method: halt_fx_shadow
    *
    * Alias:
    *
    *	halt()
    *
    * Parameters:
    *
    *	<bool noOnHalt> - if true the onhalt event of the effect will not
    *	be fired
    *
    * See Also:
    *
    *	<VegUIEffect::halt>
    */

  this.halt = this.halt_fx_shadow = function(noOnHalt) {
    
    this.ShadowNode.kill(1);
    
    this.halt_effect(noOnHalt);
  };

}
VegUIFXShadow.prototype = VegUIEffect;

/*****************************************************************************/
/** Class: VegUIFXScale
  *
  * Adds a scaling effect to a vegui element that lets it either grow
  * into view or shrink out of view.
  *
  * Notes: Hierarchy
  *
  *	extends <VegUIEffect>
  *
  *	Inherits all properties and methods from <VegUIEffect>
  *
  * Notes: Type
  *
  *	<VUI_FX_SCALE>
  *
  * Notes: Example
  *
  * (start code)
  * // First we define the stunt node, the stunt node is the element
  * // that we will use to visualize the effect
  * 
  * var StuntNode = Manager.get_new(VUI_NODE);
  *
  * // you can style it whichever way you want but we will just give
  * // it a white border in our example
  *
  * StuntNode.T.Css.border = '1px #fff solid';
  * Manager.build_element(StuntNode);
  *
  * // add the effect to shrink the node towards the coordinates
  * // 50,50 in 500 ms. The stunt node will be placed at
  * // z-index of 1000
  *
  * FX.effect_add(50,50,500,1,StuntNode,true,1000);
  * (end)
  *
  * Object Properties:
  *
  *	x - *int*, when growing the effect will start from here, when
  *	shrinking it will end here (x axis)
  *	y - *int*, when growing the effect will start from here, when
  *	shrinking it will end here (y axis)
  *	speed - *int*, scaling time (ms)
  *	StuntNodeTemplate - *VegUIElement*, template that will be used to clone the node
  *     that will be shown instead of the target element when unreasonable small sizes are reached
  *	StuntNode - *VegUIElement*, holds the built StuntNode element while
  *	the effect is active
  *	phase - *int*, the current phase of the effect
  *	scaleType - *int*, defines if the effect grows or shrinks the element
  *	(0 = grow, 1 = shrink)
  *	useFade - *bool*, if true the stunt node will be faded in/out as
  *	it moves
  *	fadeLimit - *int*, fade limit, if useFade is active fadeLimit prevents
  *	the fading past a certain value
  *	z - *int*, z index of the stunt node
  */

/*****************************************************************************/
/** Constructor: VegUIFXScale */

function VegUIFXScale(x, y, speed, scaleType, StuntNodeTemplate, useFade, z, fadeLimit) {

  /* 
   * Constructor
   */

  this.constructor = VegUIEffect;
  this.constructor();

  /*
   * Properties
   */

  this.type = VUI_FX_SCALE;
  this.x = x || 0;
  this.y = y || 0;
  this.speed = speed || 500;
  this.StuntNodeTemplate = StuntNodeTemplate || null;
  this.StuntNode = null;
  this.phase = 0;
  this.scaleType = scaleType || 0;
  this.useFade = useFade || false;
  this.rw = this.rh = this.mvx = this.mvy = 0;
  this.fadeLimit = 0;
  this.z = z || 0;

  /*
   * Methods
   */

  /***************************************************************************/
  /** Method: execute
    * executes/processes the effect
    */

  this.execute = function() {
    if(!this.Manager)
      return null;

    var M = this.Element.Manager;
    
    switch(this.phase) {
      
      /* 
       * Phase 0, effect has been created, StuntNode has not been created
       * yet.
       */
      
      case 0:
        
        if(!this.StuntNodeTemplate)
	  return;

        /* create StuntNode from StuntNodeTemplate */

	this.StuntNode = M.get_clone(this.StuntNodeTemplate);
	this.StuntNode.T.z = this.z;
	M.build_element(this.StuntNode, this.Element.Base.parentNode);
	
	if(!this.scaleType) {
	  this.StuntNode.move(this.x, this.y);
          this.StuntNode.resize(1,1);	
	  this.w = 1;
	  this.h = 1;
	  this.toW = this.Element.width();
	  this.toH = this.Element.height();
	  this.toX = this.Element.x();
	  this.toY = this.Element.y();
	  if(this.useFade)
	    this.StuntNode.set_transparency(1);
	} else {
	  this.StuntNode.move(this.Element.x(), this.Element.y());
          this.StuntNode.resize(this.Element.width(), this.Element.height());
	  this.toW = 1;
	  this.toH = 1;
	  this.w = this.Element.width();
	  this.h = this.Element.height();
	  this.toX = this.x;
	  this.toY = this.y;
	  this.x = this.Element.x();
	  this.y = this.Element.y();
	  if(this.useFade)
	    this.StuntNode.set_transparency(100);
	}
	 
	this.Element.hide(1);
        
        this.phase++;

      break;

      /*
       * Phase 1, StuntNode has been created and positioned start
       * scaling
       */

      case 1:
        
	/*
	 * resize node
	 */

        var r = (this.speed / this.Manager.interval);
        var N = this.StuntNode;

        this.rw += (Math.abs(this.toW - this.w) / r);
	this.rh += (Math.abs(this.toH - this.h) / r);

	/* check if the size is at the targeted size yet */
	  
	var w = (N.width() == this.toW);
	var h = (N.height() == this.toH);
          
	/* if not, grow node */

        if((!w && this.rw>=1) || (!h && this.rh>=1)) {
          
	  var rw = Math.floor(this.rw);
	  var rh = Math.floor(this.rh);
	
	  var uW = (!w ? (!this.scaleType ? N.width()+rw : N.width()-rw) : null);
	  var uH = (!h ? (!this.scaleType ? N.height()+rh : N.height()-rh) : null);
          N.resize(
	    (uW > -1 ? uW : 1) , (uH > -1 ? uH : 1)
	  );
	}

	if(this.rw >= 1)
	  this.rw = (this.rw - Math.floor(this.rw));
	if(this.rh >= 1)
	  this.rh = (this.rh - Math.floor(this.rh));

        /* check if node is bigger than targeted size, if so
	 * correct it to be the targeted size
	 */

        if(!w)
	  w = (!this.scaleType ? (N.width() > this.toW) : (N.width() < this.toW));
        if(!h)
	  h = (!this.scaleType ? (N.height() > this.toH) : (N.height() < this.toH));
       
        if(w || h) {
          N.resize(
	    (w ? this.toW : null),
	    (h ? this.toH : null)
	  );
	}

        /* 
  	 * Move node
	 */

	this.mvx += (Math.abs(this.x - this.toX) / r);
	this.mvy += (Math.abs(this.y - this.toY) / r);

	/* check if the position is at the targeted position yet */

	var x = (N.x() == this.toX);
	var y = (N.y() == this.toY);

	/* if not, move node */

	if((!x && this.mvx>=1) || (!y && this.mvy>=1)) {
          
	  var mx = Math.floor(this.mvx);
	  var my = Math.floor(this.mvy);
	
          N.move(
	    (!x ? (this.toX > N.x() ? N.x()+mx : N.x()-mx) : null),
	    (!y ? (this.toY > N.y() ? N.y()+my : N.y()-my) : null)
	  );
	}

	if(this.mvx >= 1)
	  this.mvx = (this.mvx - Math.floor(this.mvx));
	if(this.mvy >= 1)
	  this.mvy = (this.mvy - Math.floor(this.mvy));

	/* check if node is close to its target position if it is
	* move it there
	*/

	x = (Math.abs(N.x() - this.toX) <= (Math.abs(this.x - this.toX) / r));
	y = (Math.abs(N.y() - this.toY) <= (Math.abs(this.y - this.toY) / r));
     
        if(x || y) {
          N.move(
	    (x ? this.toX : null),
	    (y ? this.toY : null)
	  );
	}

	if(this.useFade) {
	  
	  if( !(this.scaleType && this.StuntNode.transparency <= this.fadeLimit) && !(!this.scaleType && this.StuntNode.transaprency >= this.fadeLimit)) {
	    this.StuntNode.set_transparency(
	      !this.scaleType ? 
	      this.StuntNode.transparency + (100 / r) :
	      this.StuntNode.transparency - (100 / r)
	    );
	  }
	}
        
	if(w && h && x && y)
	  this.halt();

      break;
      
    } 
  };

  /****************************************************************************/
  /** Method: halt_scale
    *
    * halts the event
    *
    * Alias:
    *
    *	halt()
    *
    * See also:
    *
    *	<VegUIEffect::halt>
    */

  this.halt_scale = this.halt = function() {
    if(!this.scaleType) {
      this.Element.move(this.StuntNode.x(), this.StuntNode.y());
      this.Element.resize(this.StuntNode.width(), this.StuntNode.height());
      this.Element.hide(0);
    }
    this.StuntNode.kill(1);
    this.halt_effect();
  };

}
VegUIFXScale.prototype = VegUIEffect;
