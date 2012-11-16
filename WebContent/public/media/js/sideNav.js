
/**
 * factory class to generate the instances needed for navigation menus
 * currently there is only one instance, the side nav, but this might be 
 * generalize to top nav as well
 * @calls none
 * @calledby static inline declaration see bottom of this file
 */
var sideMenu;

try {
	sideMenu = Class.create();
} catch (ex) {
	alert('excpt in Class create of filemenu:: ' + ex.message);
}
/**
 * the declaration of the the class sideMenu
 */
sideMenu.prototype = {
	foo : function (e) {
		alert('sideMenu Foof ' + e);
	} ,
	/**
	 * constant for the item spacing margin 
	 * @calledby subfolderClick, folderClick
	 */
	FOLDER_ITEMS_MARGIN : 3,

	/**
	 * member variable for the active folder
	 * @calledby closeSubfldr, subfolderClick, 
	 * folderClick, activateFolder, pageMousedown
	 */
	_curFolder : null,
	
	/**
	 * member variable for the currently active sub-folder
	 * @calledby closeAnySubs, subfolderClick
	 */
	_activeSubFolder : null,

	/**
	 * initializer automatically called by Prototype 
	 * framework when instance is created
	 * @param elt a class object to be treated as this superclass of the 
	 * instance
	 * @return void
	 */
	initialize : function(elt) {
		if (Browser.doInit) {
			Browser.initialize();
		}
	},

	/**
	 * top level menus cannot proceed unless any sub-menus are closed
	 * @return void
	 * @calls this.closeSubfldr
	 * @calledby subfolderClick, folderClick, loadContent, inactivateFolder, pageMousedown
	 */
	closeAnySubs : function() {
		if (null != this._activeSubFolder) {
			this.closeSubfldr(this._activeSubFolder);
			this._activeSubFolder = null;
		}
	},

	/**
	 * do the work of closing the sub-folder and its containing box
	 * @param p_submenuItems the id of the sub-menu to close
	 * @return void
	 * @calls none
	 * @calledby closeAnySubs, subfolderClick
	 */
	closeSubfldr : function(p_submenuItems) {
		if (null != p_submenuItems) {
			bkImg = (p_submenuItems.parentFolderLabel == this._curFolder) 
				? 'url(WebContent/public/media/images/sideNav/gr_ModuleNav_Background-Active_200x24.gif)'
				: 'url(WebContent/public/media/images/sideNav/gr_ModuleNav_Background-Inactive_200x24.gif)';
			p_submenuItems.setStyle( { display : 'none' } );
			var topFolder = $(p_submenuItems.parentFolderLabelId);
			topFolder.setStyle( { backgroundImage : bkImg,
				width : '198px', backgroundColor : '#FAAF40' });
			// style the big box
			p_submenuItems.parentNode.setStyle( { width : '198px'
				, height : p_submenuItems.parentNode.origY + 'px'
			});
		}
	},

	/**
	 * a link was clicked that has a sub folder -- to display a subfolder
	 * we have the original box which has the link that was clicked
	 * and we have the box that has the subfolder -- these two little boxes 
	 * are next to each other and there is a third box, a bigger box that
	 * contains these two little boxes.
	 * 
	 * @param e the onclick event as created by the browser
	 * @param p_subItemsId the submenu that will be displayed or hidden
	 * @param p_wasClicked the href that was clicked
	 * @param p_sideFolderSub the id of the box the link is a child of
	 * @return false to stop the bubble
	 * @calls Prototype framwork's Element.getHeight, this.closeSubfldr,
	 * this.inactivateFolder, this.activateFolder, this.closeAnySubs,
	 * @calledby inline markup text onclick event handler
	 */
	subfolderClick : function(e, p_subItemsId, p_wasClicked, p_sideFolderSub) {
		var firstLittleBox = $(p_sideFolderSub);
		var secondLittleBox = $(p_subItemsId);
		var bigBox = $(firstLittleBox.parentNode.id);
		if (!bigBox.origY) {
			bigBox.origY = Element.getHeight(bigBox);
		}
		if (!bigBox.upperBoxY) {
			bigBox.upperBoxY = Element.getHeight(bigBox) - Element.getHeight(firstLittleBox);
		}
		var firstIsBigger = 
			(Element.getHeight(firstLittleBox) > Element.getHeight(secondLittleBox)) ? true : false;
		var biggestLittleBoxY = 
			(firstIsBigger) ? Element.getHeight(firstLittleBox) : Element.getHeight(secondLittleBox);
		if (! secondLittleBox.parentFolderLabelId) {
			secondLittleBox.parentFolderLabelId = p_sideFolderSub + 'Folder';
		}
		if (secondLittleBox == this._activeSubFolder) {
			this.closeSubfldr(secondLittleBox);
			this._activeSubFolder = null;
		} else {
			if (this._curFolder
					&& this._curFolder != $(secondLittleBox.parentFolderLabelId)) {
				this.inactivateFolder(this._curFolder);
				this.activateFolder($(secondLittleBox.parentFolderLabelId));
			}
			// close any open subfolder
			this.closeAnySubs();
			// style the big box
			bigBox.setStyle( {
				width : '369px',
				height : (biggestLittleBoxY + bigBox.upperBoxY) + 'px'
			});
			// style the parent folder label
			$(secondLittleBox.parentFolderLabelId).setStyle({ 
				backgroundImage : 'url(WebContent/public/media/images/sideNav/menu_on_secondary.gif)',
				width : '369px'	});
			if (firstIsBigger) {
				firstLittleBox.setStyle({ borderRight : ' 1px solid black' });
				secondLittleBox.setStyle({ borderLeft : 'none' });
			} else {
				secondLittleBox.setStyle({ borderLeft : ' 1px solid black' });
				firstLittleBox.setStyle({ borderRight : 'none' });
			}
			// style the subfolder
			secondLittleBox.setStyle( {
				position : 'relative',
				top : (-1 * (Element.getHeight(firstLittleBox) 	+ this.FOLDER_ITEMS_MARGIN)) + 'px',
				left : '199px',
				display : 'block'
			});
			this._activeSubFolder = secondLittleBox;
		}
		return (false);
	},

	/**
	 * a tip-top level link was clicked.  these links control the 
	 * expanding and collapsing of the whole menu group.  there are
	 * three of these links controlling three groups
	 * 
	 * @param e the onclick event as created by the browser
	 * @param p_id the id of the high level link which is linked to the 
	 * folder itself by its name
	 * @return false to stop bubble
	 * @calls this.closeAnySubs, this.inactivateFolder, this.closeFolder
	 * this.activateFolder
	 * @calledby inline markup text onclick event handler
	 */
	folderClick : function(e, p_id) {
		var folder = $(p_id + 'Folder');
		folder.blur();
		var items = $(p_id);
		this.closeAnySubs();
		if (folder == this._curFolder) { // close me
			this.inactivateFolder(this._curFolder);
			this.closeFolder(this._curFolder);
			this._curFolder = null;
		} else { // not current
			if ('block' == items.getStyle('display')) { 
				this.closeFolder(folder);
			} else { // NOT CURRENT AND NOT OPEN -- open the folder and make
				items.setStyle( { display : 'block' } );
				var p = $(p_id + 'Item');
				if (p.origY) {
					p.setStyle( { height : p.origY + 'px' });
				}
				this.activateFolder(folder);
				folder.parentNode.setStyle( {
					marginBottom : this.FOLDER_ITEMS_MARGIN + 'px'
				});
			}
		}
		return (false);
	},

	/**
	 * a link was clicked that references the main content window, this will
	 * trigger an ajax request further, the main content may have associated 
	 * javascript that will need to do some setup, particularly setting
	 * up local event handlers
	 *  
	 * @param e the onclick event as generated by the the browser
	 * @param p_folder the containing group of the link that was clicked which 
	 * has to be activated if it was was not already active 
	 * @param p_uri the uri to get the main content
	 * @param p_collaborator a collaborator for the main content which
	 * can then be initialized as needed
	 * @return false to stop bubble
	 * @calls this.closeAnySubs, this.activateFolder, 
	 * p_collaborator.initContent
	 * @calledby inline markup text onclick event handler
	 */
	loadContent : function(e, p_folder, p_uri, p_collaborator) {
		var folder = $(p_folder + 'Folder');
		this.closeAnySubs();
		this.activateFolder(folder);
		if ('undefined' == typeof p_uri) {
			return (false);
		}
		var obj = $('mainContentDisplay');
		if (obj) {
			new Ajax.Request(p_uri, {
				method : 'get',
				onSuccess : function(xResp) {
					obj.innerHTML = xResp.responseText;
					if (p_collaborator && p_collaborator.initContent) {
						p_collaborator.initContent();
					}
				}, onFailure : function(xResp) {
					obj.innerHTML = 'data unavailable';//xResp.responseText;
				}, onExecption : function(req, ex) {
//					alert(ex.mssage);
				}
			});
		}
		return (false);
	},

	/**
	 * isolate the process of setting the making the containing folder item grey
	 * @param p_folder the high level folder heading
	 * @return void
	 * @call none
	 * @calledby folderClick, subfolderClick, activateFolder
	 */
	inactivateFolder : function(p_folder) {
		if (p_folder) {
			this.closeAnySubs();
			p_folder.setStyle( {
				backgroundImage : 'url(WebContent/public/media/images/sideNav/gr_ModuleNav_Background-Inactive_200x24.gif)',
				backgroundColor : '#D7D7D7'
			});
		}
	},
	
	/**
	 * activate the top level menu item by inactivating whatever is active and then setting 
	 * the background and arrow
	 * 
	 * @param p_folder the folder item to activate
	 * @return void
	 * @calls this.inactivateFolder
	 * @calledby loadContent, folderClick, subfolderClick
	 */
	activateFolder : function(p_folder) {
		if (p_folder) {
			if ((null != this._curFolder) && (p_folder != this._curFolder)) {
				this.inactivateFolder(this._curFolder);
			}
			p_folder.setStyle( {
				backgroundImage : 'url(WebContent/public/media/images/sideNav/gr_ModuleNav_Background-Active_200x24.gif)',
				backgroundColor : '#FAAF40'
			});
			$(p_folder.id.split('Folder')[0] + 'Arrow').setStyle({
				backgroundImage : 'url(WebContent/public/media/images/sideNav/gr_ArrowDown_10x8.gif)'
			});
			this._curFolder = p_folder;
		}
	},
	
	/**
	 * close a high level folder by setting its display to none, changing
	 * the arrow, and closing teh box until it just wraps the folder
	 * control
	 * @param p_folder the dom element for the folder box to close
	 * @return void
	 * @calls none
	 * @calledby folderClick
	 */
	closeFolder : function(p_folder) {
		var itemsStr = p_folder.id.split('Folder')[0];
		var items = $(itemsStr);
		if (items) {
			items.setStyle( { display : 'none' });
		}
		$(itemsStr + 'Arrow').setStyle( {
			backgroundImage : 'url(WebContent/public/media/images/sideNav/gr_ArrowRight_8x10.gif)'
		});
		p_folder.parentNode.setStyle( { marginBottom : '0px' });
		var prnt = $(itemsStr + 'Item');
		if (prnt.upperBoxY) {
			prnt.setStyle({ height : '24px' });
		}
	},

	
	/**
	 * starting with the current element search up the dom tree until
	 * an element matches the give tag and class name and return that 
	 * element
	 * @param p_elt the dom node we are inspecting
	 * @param p_tagName the tag we are looking for
	 * @param p_classname the name of the css class we are interested in
	 * @return either the node we are looking for or null
	 */
	goUpUntil : function(p_elt, p_tagName, p_classname) {
		while (p_elt) {
			if (p_elt.tagName && p_elt.tagName == p_tagName
					&& $(p_elt).hasClassName(p_classname)) {
				return (p_elt);
			} else {
				p_elt = p_elt.parentNode;
			}
		}
		return (p_elt);
	} ,
	
	/**
	 * binding function to update Patient Medical Record (PMR) which is a high
	 * level menu this is an observer function.  this has handling for both
	 * IE and w3c event models
	 * @param e the DOMAttributeModified event or PropertyChange event
	 * @return true to continue bubble
	 * @calls none
	 * @calledby appLoader static curPatDispatcher
	 */
	patientSelected : function(e) {
		var currentPatientId = null;
		if (('undefined' == (typeof e.srcElement))
				&& ('patient_id' == e.attrName)) {
			currentPatientId = e.newValue;
		} else {
			currentPatientId = e.srcElement.getAttribute('patient_id');
		}
		if (null != currentPatientId) {
			this.getPatFrmServer(currentPatientId);
		}
		return (true);
	} 
	
	/**
	 * encapsulate the interaction for the ajax call
	 */
	, getPatFrmServer: function (p_currentPatientId) {
		try {
			new Ajax.Request('spring/currentPatient', {
				method: 'get' , parameters:	'kind=name&currentPatientId=' + escape(p_currentPatientId) 
				, onSuccess: function(xResp) {
					$('curPatientNav').innerHTML = xResp.responseText;
				}, onFailure: function(xResp) {
					$('current_patient').innerHTML = 'data unavailable';//xResp.responseText;
				}, onexception: function(theReq, ex) {
//					alert(ex.message);	
				}
			});
			return (false);
		} catch (ex) {
//			alert('patientDetails err:: ' + ex.message);
			throw(ex);
		}
	} , 
	
	/**
	 * a click has appeared somewhere on the page, if necessary, close any subs
	 * @param e the onclick event as created by the browser
	 * @return true to continue bubble
	 */
	pageMousedown : function(e) {
		if (null != this._curFolder) {
			var targ = null;
			if (Browser.isIE) {
				targ = window.event.srcElement;
			} else {
				targ = ((e.target.tagName) ? e.target : e.target.parentNode);
			}
			if (this._curFolder == targ) {
				return;
			}
			if (!goUpUntil(targ, 'UL', 'sideFolderSub')) {
				this.closeAnySubs();
			}
			return (true); // bubble
		}
		return (true);
	}

};

/**
 * the instance variable representing side navigation
 */
var sideNav;

try {
	sideNav = new sideMenu('fileMenu');
} catch (ex) {
	alert('excpt instantiating menu:: ' + ex.message);
}

/**
 * test all mousedown events for if they occur on the sidenav
 */
try {
	Event.observe(document, 'mousedown', sideNav.pageMousedown);
} catch (ex) {
	alert(ex.message);
}
