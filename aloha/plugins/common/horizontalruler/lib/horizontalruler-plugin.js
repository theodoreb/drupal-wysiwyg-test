/* horizontalruler-plugin.js is part of Aloha Editor project http://aloha-editor.org
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

define(["aloha","jquery","aloha/plugin","ui/ui","ui/button","i18n!horizontalruler/nls/i18n","i18n!aloha/nls/i18n"],function(e,t,n,r,i,s,o){var u=window.GENTICS;return n.create("horizontalruler",{_constructor:function(){this._super("horizontalruler")},config:["hr"],init:function(){var n=this;this._insertHorizontalRuleButton=r.adopt("insertHorizontalRule",i,{tooltip:s.t("button.addhr.tooltip"),iconOnly:!0,icon:"aloha-icon-horizontalruler",scope:"Aloha.continuoustext",click:function(){n.insertHR()}}),e.bind("aloha-editable-activated",function(r,i){if(e.activeEditable){n.cfg=n.getEditableConfig(e.activeEditable.obj);if(t.inArray("hr",n.cfg)==-1){n._insertHorizontalRuleButton.show(!1);return}n._insertHorizontalRuleButton.show(!0)}})},insertHR:function(n){var r=this,i=e.Selection.getRangeObject();if(e.activeEditable){var s=t("<hr>");u.Utils.Dom.insertIntoDOM(s,i,t(e.activeEditable.obj),!0),i.select()}}})})