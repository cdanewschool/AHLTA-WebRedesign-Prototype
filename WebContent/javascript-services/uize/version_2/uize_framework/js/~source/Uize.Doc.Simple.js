/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : Uize.Doc.Simple Package
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2004-2010 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/

/*ScruncherSettings Mappings="=" LineCompacting="TRUE"*/

/* Module Meta Data
	type: Package
	importance: 6
	codeCompleteness: 100
	testCompleteness: 0
	docCompleteness: 2
*/

/*?
	Introduction
		The =Uize.Doc.Simple= package provides a method for building HTML documentation from documentation that is written in the Wikitext-like SimpleDoc format.

		*DEVELOPERS:* `Chris van Rensburg`

		The =Uize.Doc.Simple= module is a package under the =Uize= namespace.
*/

Uize.module({
	name:'Uize.Doc.Simple',
	required:[
		'Uize.Data.Simple',
		'Uize.String',
		'Uize.Templates.List'
	],
	builder:function () {
		/*** Variables for Scruncher Optimization ***/
			var
				_undefined,
				_string = 'string',
				_package = function () {},
				_sacredEmptyObject = {},
				_Uize_String_limitLength = Uize.String.limitLength
			;

		/*** Global Variables ***/
			var
				_bulletCharRegExpStr = '[-\\*~:\\.]',
				_bulletCharRegExp = new RegExp (_bulletCharRegExpStr),
				_onlyBulletCharRegExp = new RegExp ('^\\s*' + _bulletCharRegExpStr + '\\s*$'),
				_orderingStyleRegExpStr = '([@#\\+a-zA-Z]|\\d+)',
				_orderingStyleRegExp = new RegExp (_orderingStyleRegExpStr),
				_listItemPrefixRegExp = new RegExp (
					'^([<\\(\\{\\[]*\\s*' + _orderingStyleRegExpStr + '?\\s*[>\\)\\}\\]]*\\s*' + _bulletCharRegExpStr + '*\\s+)'
				),
				_slashCharCodesMap = {47:1,92:1} // 47 is forward slash, 92 is backslash
			;

		/*** Public Static Methods ***/
			var _build = _package.build = function (_params) {
				/* PARAMETERS:
					canonicalizePeerSections
						A boolean, indicating whether or not the contents of multiple peer sections of the same name should be consolidated into a single section of that name.
					data
						the data object to be converted to HTML
					indentChars
						the characters to use for each level of indentation
					headingNumberingSeparator
						the characters to be placed between a heading's numbering and the heading's title, as in the following examples...
							1.2.3. This is the heading
							1.2.3: This is the heading
							1.2.3 - This is the heading
					headingNumberingDelimiter
						the characters to be placed between each point level in heading numbering, as in the following examples...
							1.2.3 - This is the heading
							1-2-3 - This is the heading
							1 > 2 > 3 - this is the heading
					sectionsToSort
						An array, containing the names of sections whose subsections should be sorted.
				*/
				function _defaultedStringParam (_paramName,_defaultValue) {
					var _paramValue = _params [_paramName];
					return typeof _paramValue == _string ? _paramValue : _defaultValue;
				}
				var
					_data = _params.data,
					_urlDictionary = _params.urlDictionary || _sacredEmptyObject,
					_pathToRoot = _params.pathToRoot || '',
					_indentChars = _defaultedStringParam ('indentChars','\t'),
					_headingNumberingSeparator = _defaultedStringParam ('headingNumberingSeparator','. '),
					_headingNumberingDelimiter = _defaultedStringParam ('headingNumberingDelimiter','.'),
					_levelHeaderNos = [0],
					_levelListItemNos = [0],
					_docLines = [],
					_contentsTree = {items:[]}
				;
				if (typeof _data == _string)
					_data = Uize.Data.Simple.parse ({simple:_data,parseName:false})
				;

				/*** support for canonicalizing peer sections of the same name ***/
					function _canonicalizePeerSections (_data) {
						var _children = _data.children;
						if (_children.length) {
							/*** collapse all same-named sections at this level ***/
								var _sectionsByTitle = {};
								for (var _childNo = -1; ++_childNo < _children.length;) {
									var
										_child = _children [_childNo],
										_childChildren = _child.children
									;
									if (_childChildren.length) {
										var
											_childSectionTitle = _child.value,
											_existingSectionOfSameName = _sectionsByTitle [_childSectionTitle]
										;
										if (_existingSectionOfSameName) {
											_existingSectionOfSameName.children =
												_existingSectionOfSameName.children.concat (_childChildren)
											;
											_children.splice (_childNo,1);
											_childNo--;
										} else {
											_sectionsByTitle [_childSectionTitle] = _child;
										}
									}
								}

							/*** perform canonicalizing within each of the peer sections ***/
								for (var _childNo = -1, _childrenLength = _children.length; ++_childNo < _childrenLength;)
									_canonicalizePeerSections (_children [_childNo])
								;
						}
					}
					_params.canonicalizePeerSections !== false &&
						_canonicalizePeerSections (_data)
					;

				/*** support for sorting of peer sections ***/
					var _sectionsToSort = _params.sectionsToSort;
					if (_sectionsToSort) {
						var
							_sectionsToSortLength = _sectionsToSort.length,
							_sectionsToSortMap = {}
						;
						for (var _sortedSectionNo = -1; ++_sortedSectionNo < _sectionsToSortLength;)
							_sectionsToSortMap [_sectionsToSort [_sortedSectionNo]] = 1
						;
						function _sortPeerSections (_data) {
							var
								_children = _data.children,
								_childrenLength = _children.length
							;
							if (_childrenLength) {
								/*** sort all the peer sections (if this section should be sorted) ***/
								_sectionsToSortMap [_data.value] &&
									_children.sort (
										function (_sectionA,_sectionB) {return _sectionA.value < _sectionB.value ? -1 : 1}
									)
								;

								/*** handle sorting within each of the peer sections ***/
									for (var _childNo = -1; ++_childNo < _childrenLength;)
										_sortPeerSections (_children [_childNo])
									;
							}
						}
						_sortPeerSections (_data);
					}

				/*** support code for intra-document section links ***/
					// populate hash with all section titles from all levels
					var
						_allSectionTitles = {},
						_sectionNoByLevel = [0]
					;
					function _buildAllSectionTitles (_data,_level,_parentSectionId) {
						/* TO DO:
							- ultimately, for improved disambiguation, this code should handle multiple sections at different places in the document tree sharing the same name. To this end, each entry in _allSectionTitles may need to be an array of one or more section profiles.
						*/
						if (typeof _level != 'number') _level = 0;
						if (typeof _parentSectionId != _string) _parentSectionId = '';
						var
							_children = _data.children,
							_value = _data.value,
							_sectionTitles = {}
						;
						if (_children.length) {
							_sectionNoByLevel [_level]++;
							var _sectionId = _level
								? (_parentSectionId + (_parentSectionId ? '_' : '') + _sectionNoByLevel [_level])
								: ''
							;
							_allSectionTitles [_value] = _sectionId;
							_sectionNoByLevel [_level + 1] = 0;
							for (var _childNo = -1, _childrenLength = _children.length; ++_childNo < _childrenLength;)
								_buildAllSectionTitles (_children [_childNo],_level + 1,_sectionId)
							;
						}
					}
					_buildAllSectionTitles (_data);

				function _translateInlineFormatting (_line,_stripFormatting) {
					function _format (_formattingPrefix,_text,_formattingSuffix,_linkType,_link) {
						if (_stripFormatting) return _text;

						var _linkTypeIsUrl = _linkType == 'url';
						if (_linkType && !_linkTypeIsUrl) {
							if (_linkType == 'text') _link = _text;
							var _sectionAnchor = _allSectionTitles [_link];
							_sectionAnchor
								? (_link = '#' + _sectionAnchor)
								: ((_link = _urlDictionary [_link] || '') && (_linkTypeIsUrl = true))
							;
						}
						if (_slashCharCodesMap [_link.charCodeAt (0)])
							_link = _pathToRoot + _link.slice (1)
						;
						return (
							_formattingPrefix +
							(
								_link
									? (
										'<a href="' + _link + '"' +
											(
												_linkTypeIsUrl && /^[a-zA-Z]+:/.test (_link)
													? ' target="_blank" class="externalSiteLink"'
													: ''
											) +
										'>' + _text + '</a>'
									)
									: _text
							) +
							_formattingSuffix
						);
					}
					return (
						_line.replace (
							/^#(\S*)/,
							function (_match,_anchorName) {return _format ('<a name="' + _anchorName + '">','','</a>')}
							/* support for anchors, of the form...
								#anchorName
							*/
						).replace (
							/\B\*.+?\*\B/g,
							function (_match) {return _format ('<b>',_match.slice (1,-1),'</b>','text')}
							/* support for bolding, of the form...
								This is some *bolded text*, and here is some more *bolded text*.
							*/
						).replace (
							/\b__.+?__\b/g,
							function (_match) {return _format ('<b><i>',_match.slice (2,-2),'</i></b>','text')}
							/* support for bolded italics, of the form...
								Here's some __bolded italics__, and here's more __bolded italics__.
							*/
						).replace (
							/\b_.+?_\b/g,
							function (_match) {return _format ('<i>',_match.slice (1,-1),'</i>','text')}
							/* support for italics, of the form...
								Here's some _italics_, and here's more _italics_.
							*/
						).replace (
							/\B==.+?==\B/g,
							function (_match) {return _format ('<code><b>',_match.slice (2,-2),'</b></code>','text')}
							/* support for bolded inline code, of the form...
								Here's some ==bolded inline code==. Ain't it purrrdy?
							*/
						).replace (
							/\B=.+?=\B/g,
							function (_match) {return _format ('<code>',_match.slice (1,-1),'</code>','text')}
							/* support for inline code, of the form...
								Here's some =inline code=. Ain't it purrrdy?
							*/
						).replace (
							/\B`.+?`\B/g,
							function (_match) {return _format ('',_match.slice (1,-1),'','text')}
							/* support for intra-document links to sections, of the form...
								See the `Mathematical Progressions` section for further details.
							*/
						).replace (
							/\[\[(#.+?|[a-zA-Z]+:.+?|.+?\.(?:htm|html|jpg|gif|png)(?:[\?#][^\]]*)?)\]\[(.+?)\]\]/g,
							function (_match,_linkHref,_linkText) {return _format ('',_linkText,'','url',_linkHref)}
							/* support for links, of the form...
								Visit [[http://www.tomkidding.com][Tom Kidding's Web site]]
								for further info, consult [[resume.html][Tom Kidding's Resume]]
							*/
						).replace (
							/\[\[(.+?)\]\[(.+?)\]\]/g,
							function (_match,_wikiWord,_linkText) {return _format ('',_linkText,'','section',_wikiWord)}
							/* support for intra-document links to sections, of the form...
								[[Mathematical Progressions][see the Mathematical Progressions section]] for further details
							*/
						).replace (
							/\[\[(#.+?|[a-zA-Z]+?:.+?)\]\]/g,
							function (_match,_linkHref) {return _format ('',_linkHref,'','url',_linkHref)}
							/* support for links, of the form...
								Visit [[http://www.tomkidding.com]]
							*/
						).replace (
							/\[\[(.+?)\]\]/g,
							function (_match,_wikiWord) {return _format ('',_wikiWord,'','text')}
							/* support for intra-document links to sections, of the form...
								See the [[Mathematical Progressions]] section for further details.
							*/
						)
					);
				}
				function _addDocLinesFromData (
					_data,_level,_parentContentsItem,_indentStr,_parentHeadingPrefix,_parentHeadingPath,_parentHeadingDisplayPrefix
				) {
					function _addDocLine (_docLine) {_docLines.push (_indentStr + _docLine)}
					function _closeListIfNeeded (_isNextLevel) {
						var _levelForList = _level + !!_isNextLevel;
						if (_levelListItemNos [_levelForList]) {
							_addDocLine ((_isNextLevel ? _indentChars : '') + '</table>');
							_levelListItemNos [_levelForList] = 0;
						}
					}
					var
						_children = _data.children,
						_value = _data.value,
						_listItemPrefixMatch
					;
					if (!_children.length) {
						if (/\r|\n|\r\n/.test (_value)) {
							/*** support for sample code blocks ***/
							_closeListIfNeeded ();
							_addDocLine ('');
							_addDocLine ('<pre class="sample-code">' + _toSampleCode (_value) + '</pre>');
							_addDocLine ('');
						} else if (/^={3,}$/.test (_value)) {
							/*** support for thick horizontal rule ***/
							_closeListIfNeeded ();
							_addDocLine ('<hr class="thick"/>');
						} else if (/^-{3,}$/.test (_value)) {
							/*** support for thin horizontal rule ***/
							_closeListIfNeeded ();
							_addDocLine ('<hr class="thin"/>');
						} else if (
							(_listItemPrefixMatch = _value.match (_listItemPrefixRegExp)) &&
							/[^\w\s\d]/.test (_listItemPrefixMatch [1])
						) {
							/* support for lists
								- bullet lists (unordered, decorated with a bullet character)
									- this is a list item
									* this is a list item
									~ this is a list item
									: this is a list item
									. this is a list item

								- ordered lists
									@ this is a list item
									# this is a list item
									+ this is a list item

								[@] this is a list item
								[a] this is a list item
								[A] this is a list item
								[1] this is a list item

								(@) this is a list item
								(a) this is a list item
								(A) this is a list item
								(1) this is a list item

								{@} this is a list item
								{a} this is a list item
								{A} this is a list item
								{1} this is a list item

								<@> this is a list item
								<a> this is a list item
								<A> this is a list item
								<1> this is a list item

								<< @ >> this is a list item
								<< a >> this is a list item
								<< A >> this is a list item
								<< 1 >> this is a list item

								@) this is a list item
								a) this is a list item
								A) this is a list item
								1) this is a list item

								@] this is a list item
								a] this is a list item
								A] this is a list item
								1] this is a list item

								@> this is a list item
								a> this is a list item
								A> this is a list item
								1> this is a list item

								@ - this is a list item
								a - this is a list item
								A - this is a list item
								1 - this is a list item

								@. this is a list item
								a. this is a list item
								A. this is a list item
								1. this is a list item

								@: this is a list item
								a: this is a list item
								A: this is a list item
								1: this is a list item
							*/
							var
								_listItemPrefix = _listItemPrefixMatch [1],
								_orderingStyleMatch = _listItemPrefix.match (_orderingStyleRegExp)
							;
							_levelListItemNos [_level] ||
								_addDocLine ('<table class="list">')
							;
							if (_orderingStyleMatch) {
								var
									_orderingStyle = _orderingStyleMatch [1],
									_orderingStr = ''
								;
								if (/[#\+]|\d+/.test (_orderingStyle)) {
									_orderingStr = _levelListItemNos [_level] + 1 + '';
								} else if (/[@a-z]/i.test (_orderingStyle)) {
									_orderingStr = 'abcdefghijklmnopqrstuvwxyz'.charAt (_levelListItemNos [_level]);
									if (/[A-Z]/.test (_orderingStyle))
										_orderingStr = _orderingStr.toUpperCase ()
									;
								}
								_listItemPrefix = _listItemPrefix.replace (_orderingStyleRegExp,_orderingStr)
							} else {
								_listItemPrefix = _onlyBulletCharRegExp.test (_listItemPrefix)
									? _listItemPrefix.replace (_bulletCharRegExp,'<span class="bullet"></span>')
									: _toSampleCode (_listItemPrefix)
								;
							}
							_addDocLine (
								'<tr valign="top">' +
									'<td><span style="white-space:nowrap;">' + _listItemPrefix + '</span></td>' +
									'<td>' + _translateInlineFormatting (_value.replace (_listItemPrefixRegExp,'')) + '</td>' +
								'</tr>'
							);
							_levelListItemNos [_level]++;
						} else {
							/*** support for paragraph ***/
							_closeListIfNeeded ();
							var _paragraph = _translateInlineFormatting (_value);
							if (/[A-Z]/.test (_paragraph) && !/[a-z]/.test (_paragraph))
								_paragraph = '<span class="allCaps">' + _paragraph + '</span>'
							;
							_addDocLine ('<p>' + _paragraph + '</p>');
							_addDocLine ('');
						}
					} else {
						_closeListIfNeeded ();
						_levelHeaderNos [_level]++;
						var
							_hasNumbering = _level > 0, /* IMPORTANT: also add switch for numbering at some point */
							_headingPrefix = _hasNumbering ? (_parentHeadingPrefix + (_parentHeadingPrefix ? '_' : '') + _levelHeaderNos [_level]) : '',
							_headingTitle =
								_headingPrefix.replace (/_/g,_headingNumberingDelimiter) +
								(_headingPrefix ? _headingNumberingSeparator : '') + _value,
							_headingPath = (_parentHeadingPath ? (_parentHeadingPath + ' -> ') : '') + _headingTitle,
							_headingDisplayPrefix = _hasNumbering
								? (
									(
										_parentHeadingDisplayPrefix
											? (_parentHeadingDisplayPrefix + _headingNumberingDelimiter)
											: ''
										) +
										'<a href="#' + _headingPrefix + '" title="' + _headingPath + '">'
											+ _levelHeaderNos [_level] +
										'</a>'
									)
								: '',
							_contentsItem = {
								title:_headingTitle || 'Contents',
								description:
									_children [0].children.length
										? ''
										: _Uize_String_limitLength (_translateInlineFormatting (_children [0].value,true),400),
								link:_headingPrefix ? ('#' + _headingPrefix) : '',
								items:[]
							}
						;
						_parentContentsItem.items.push (_contentsItem);
						if (_value) {
							var
								_hTag = 'h' + Math.min (_level,5),
								_headingNumber = _headingDisplayPrefix + _headingNumberingSeparator
							;
							_addDocLine ('<a name="' + _headingPrefix + '"></a>');
							_addDocLine (
								'<' + _hTag + ' class="heading' + _level + '" title="' + _headingPath + '">' +
									(
										_headingDisplayPrefix
											? '<span class="headingNumber">' + _headingNumber + '</span>'
											: ''
									) +
									_value +
								'</' + _hTag + '>'
							);
						}
						_addDocLine ('<div class="contents' + _level + '">');
						_levelHeaderNos [_level + 1] = _levelListItemNos [_level + 1] = 0;
						for (var _childNo = -1, _childrenLength = _children.length; ++_childNo < _childrenLength;)
							_addDocLinesFromData (
								_children [_childNo],
								_level + 1,
								_contentsItem,
								_indentStr + _indentChars,
								_headingPrefix,
								_headingPath,
								_headingDisplayPrefix
							)
						;
						_closeListIfNeeded (true);
						/\S/.test (_docLines [_docLines.length - 1]) || _docLines.pop ();
						_addDocLine ('</div>');
						_addDocLine ('');
					}
				}
				_addDocLinesFromData (_data,0,_contentsTree,'','','','');
				var
					_contentsTreeItems = _contentsTree.items,
					_html = (
						_params.contentsList !== false &&
						(
							/* NOTE:
								content tree must have some root items, and must either have more than one root item, or the single root item must have at least one child item
							*/
							_contentsTreeItems.length &&
							(_contentsTreeItems.length > 1 || _contentsTreeItems [0].items.length)
						)
							? (
								'<div id="page_contents" class="contents-tree-shell">\n' +
									Uize.Templates.List.process ({items:_contentsTreeItems}) + '\n' +
								'</div>\n' +
								'\n'
							)
							: ''
					) + _docLines.join ('\n')
				;
				return (
					_params.result == 'full'
						? {
							html:_html,
							contentsTreeItems:_contentsTreeItems
						}
						: _html
				);
			};

			_package.toDocument = function (_simple) {return _build ({data:_simple})};

			var _toSampleCode = _package.toSampleCode = function (_sourceStr) {
				return _sourceStr.replace (/\t/g,'  ').replace (/&/g,'&amp;').replace (/</g,'&lt;').replace (/>/g,'&gt;');
			};

			return _package;
	}
});

