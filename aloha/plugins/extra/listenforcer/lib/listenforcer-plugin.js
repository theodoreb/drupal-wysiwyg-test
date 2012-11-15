/* listenforcer-plugin.js is part of Aloha Editor project http://aloha-editor.org
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

define(["aloha","jquery","aloha/plugin","aloha/console"],function(e,t,n,r){function i(e,n){if(t.inArray(e[0],s)===-1)return;e.find(".aloha-end-br").remove();var r=!1;e.find("li").each(function(){if(t.trim(t(this).text())!=="")return r=!0,!1}),r||e.html(n);var i=e.find(">ul,>ol"),o=i.length,u;if(o>1){var a=t(i[0]);for(u=1;u<o;++u)a.append(t(i[u]).find(">li")),t(i[u]).remove()}e.find(">*:not(ul,ol)").remove()}var s=[];return n.create("listenforcer",{_constructor:function(){this._super("listenforcer")},init:function(){var n=this,s=this.settings.editables||[],o,u,a=s.length;for(u=0;u<a;u++)o=s[u],typeof o=="string"||o.nodeName||o instanceof t?t(o).each(function(){n.addEditableToEnforcementList(this)}):r.warn("Aloha List Enforcer Plugin",'Object "'+o.toString()+'" can not '+"be used as a jQuery selector with which to register"+" an editable to be list enforced.");e.bind("aloha-editable-activated",function(e,t){i(t.editable.obj,"<ul><li><br /></li></ul>")}),e.bind("aloha-editable-deactivated"
,function(e,t){i(t.editable.obj,"")}),e.bind("aloha-smart-content-changed",function(t,n){e.activeEditable&&e.activeEditable.isActive===!0&&i(n.editable.obj,"<ul><li><br /></li></ul>")})},addEditableToEnforcementList:function(e){e&&s.push(e)}})})