#!/bin/bash

#
# To "compile" vegui without certain modules simply
# remove the files you do not wish to use, the only
# file required to use vegUI in its most basic
# form is vegui.std.js
#
# However, be aware that certain modules depend
# on other modules. Read the API docs for
# more information: http://doc.vegui.org
#

cat 	vegui.std.js\
	vegui.window.class.js\
	vegui.tabbeddialog.class.js\
	vegui.scrollbar.class.js\
	vegui.menu.class.js\
	vegui.list.class.js\
	vegui.fx.class.js\
	vegui.checkbox.class.js\
	vegui.cbox.class.js\
	vegui.button.class.js\
	vegui.bridge.class.js\
	vegui.selector.class.js\
	vegui.propertyset.class.js\
	vegui.taskbar.class.js\
> compiled/vegui.js
