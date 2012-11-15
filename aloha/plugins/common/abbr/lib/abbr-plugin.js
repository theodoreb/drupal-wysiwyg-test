/* abbr-plugin.js is part of Aloha Editor project http://aloha-editor.org
 *
 * Aloha Editor is a WYSIWYG HTML5 inline editing library and editor. 
 * Copyright (c) 2010-2012 Gentics Software GmbH, Vienna, Austria.
 * Contributors http://aloha-editor.org/contribution.php 
 * 
 * Aloha Editor is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or any later version.
 *
 * Aloha Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 * 
 * As an additional permission to the GNU GPL version 2, you may distribute
 * non-source (e.g., minimized or compacted) forms of the Aloha-Editor
 * source code without the copy of the GNU GPL normally required,
 * provided you include this license notice and a URL through which
 * recipients can access the Corresponding Source.
 */

define(["aloha","jquery","aloha/plugin","ui/ui","ui/toggleButton","ui/button","ui/scopes","ui/port-helper-attribute-field","i18n!abbr/nls/i18n","i18n!aloha/nls/i18n"],function(e,t,n,r,i,s,o,u,a,f){var l=window.GENTICS;return n.create("abbr",{config:["abbr"],init:function(){this.createButtons(),this.subscribeEvents(),this.bindInteractions()},createButtons:function(){var e=this;this._formatAbbrButton=r.adopt("formatAbbr",i,{tooltip:a.t("button.abbr.tooltip"),icon:"aloha-icon aloha-icon-abbr",scope:"Aloha.continuoustext",click:function(){e.formatAbbr()}}),this._insertAbbrButton=r.adopt("insertAbbr",s,{tooltip:a.t("button.addabbr.tooltip"),icon:"aloha-icon aloha-icon-abbr",scope:"Aloha.continuoustext",click:function(){e.insertAbbr(!1)}}),o.createScope("abbr","Aloha.continuoustext"),this.abbrField=u({width:320,name:"abbrText",scope:"abbr"}),this.remAbbrButton=r.adopt("removeAbbr",s,{tooltip:a.t("button.remabbr.tooltip"),icon:"aloha-icon aloha-icon-abbr-rem",scope:"abbr",click:function(){e.removeAbbr
()}})},bindInteractions:function(){var t=this;this.abbrField.addListener("blur",function(e,n){this.getValue()==""&&t.removeAbbr()});for(var n=0;n<e.editables.length;n++)e.editables[n].obj.keydown(function(e){if(e.metaKey&&e.which==71)return t.findAbbrMarkup()?(t.abbrField.foreground(),t.abbrField.focus()):t.insertAbbr(),e.stopPropagation(),e.preventDefault(),!1})},subscribeEvents:function(){var n=this,r={};e.bind("aloha-editable-activated",function(){if(!e.activeEditable||!e.activeEditable.obj)return;var i=n.getEditableConfig(e.activeEditable.obj);r[e.activeEditable.getId()]=t.inArray("abbr",i)!==-1}),e.bind("aloha-editable-destroyed",function(){e.activeEditable&&e.activeEditable.obj&&delete r[e.activeEditable.getId()],delete r[e.activeEditable.getId()]}),e.bind("aloha-selection-changed",function(t,i){if(!e.activeEditable)return;if(!r[e.activeEditable.getId()]){n._formatAbbrButton.hide(),n._insertAbbrButton.hide();return}n._formatAbbrButton.show(),n._insertAbbrButton.show();var s=n.findAbbrMarkup
(i);s?(n._insertAbbrButton.hide(),n._formatAbbrButton.setState(!0),o.setScope("abbr"),n.abbrField.setTargetObject(s,"title")):(n._formatAbbrButton.setState(!1),n.abbrField.setTargetObject(null))})},findAbbrMarkup:function(t){if(typeof t=="undefined")var t=e.Selection.getRangeObject();return e.activeEditable?t.findMarkup(function(){return this.nodeName.toLowerCase()=="abbr"},e.activeEditable.obj):null},formatAbbr:function(){var t=e.Selection.getRangeObject();e.activeEditable&&(this.findAbbrMarkup(t)?this.removeAbbr():this.insertAbbr())},insertAbbr:function(n){var r=e.Selection.getRangeObject();if(this.findAbbrMarkup(r))return;r.isCollapsed()&&n!=0&&l.Utils.Dom.extendToWord(r);if(r.isCollapsed()){var i=a.t("newabbr.defaulttext"),s=t('<abbr title="">'+i+"</abbr>");l.Utils.Dom.insertIntoDOM(s,r,t(e.activeEditable.obj)),r.startContainer=r.endContainer=s.contents().get(0),r.startOffset=0,r.endOffset=i.length}else{var s=t('<abbr title=""></abbr>');l.Utils.Dom.addMarkup(r,s,!1)}r.select(),this.
abbrField.foreground(),this.abbrField.focus()},removeAbbr:function(){var t=e.Selection.getRangeObject(),n=this.findAbbrMarkup();n&&(l.Utils.Dom.removeFromDOM(n,t,!0),t.select())},makeClean:function(e){},toString:function(){return"abbr"}})})