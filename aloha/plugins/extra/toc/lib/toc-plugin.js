/* toc-plugin.js is part of Aloha Editor project http://aloha-editor.org
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

define(["aloha","aloha/plugin","jquery","ui/ui","ui/button","i18n!toc/nls/i18n","i18n!aloha/nls/i18n","aloha/console"],function(e,t,n,r,i,s,o,u){function a(e){return e[e.length-1]}function f(e){return e[0]}function l(e){return e.slice(1)}function c(e,t){return h(e,function(e){return e===t})}function h(e,t){for(var n=0;n<e.length;n++)if(t(e[n]))return e[n];return null}function p(e,t){var n=[];for(var r=0;r<e.length;r++)n.push(t(e[r]));return n}function d(e,t){p(e,t)}function v(){return n(p(e.editables,function(e){return document.getElementById(e.getId())}))}function m(e,t){return t?e.find('a[href $= "#'+t+'"]'):n()}function g(e){var t=e.attr("href");return t?t.match(/#(.*?)$/)[1]:null}function y(e){var t;typeof e=="object"?t=n(e).text().replace(/[^a-zA-Z-]+/g,"-").replace(/^[^a-zA-Z]+/,""):e&&(t=e);for(var r=0;;r++){var i=t;r&&(i+="-"+r);var s=document.getElementById(i);if(!s||typeof e=="object"&&s===e)return i}}var b=window.GENTICS,w="toc",E=null,S=[];return t.create(w,{minEntries:0,updateInterval
:5e3,config:["toc"],init:function(){var t=this;typeof this.settings.minEntries=="undefined"&&(this.settings.minEntries=this.minEntries),typeof this.settings.updateInterval=="undefined"&&(this.settings.updateInterval=this.updateInterval),e.bind("aloha-editable-activated",function(r,i){if(e.activeEditable){t.cfg=t.getEditableConfig(e.activeEditable.obj);if(n.inArray("toc",t.cfg)==-1){t._insertTocButton.show(!1);return}t._insertTocButton.show(!0)}}),this.initButtons(),n(document).ready(function(){t.spawn()})},initButtons:function(){var e=this;this._insertTocButton=r.adopt("insertToc",i,{tooltip:s.t("button.addtoc.tooltip"),icon:"aloha-icon aloha-icon-orderedlist",scope:"Aloha.continuoustext",click:function(){e.insertAtSelection(E)}})},register:function(e){E=e},insertAtSelection:function(t){t=t||v();var r=y("toc"),i=n("<ol class='toc_root'></ol>").attr("id",r).attr("contentEditable","false"),s=e.Selection.getRangeObject(),o=e.activeEditable,u=n(document.getElementById(o.getId()));b.Utils.Dom
.insertIntoDOM(i,s,u),this.create(r).register(t).update().tickTock()},spawn:function(e,t){e=e||n("body"),t=t||v(),e.find("ol.toc_root").each(function(){var e=n(this).attr("id");e||(e=y("toc"),n(this).attr("id",e)),that.create(e).register(t).tickTock()})},create:function(e){return S.push(this),{id:e,$containers:n(),settings:this.settings,root:function(){return n(document.getElementById(this.id))},register:function(e){var t=this;return t.$containers=t.$containers.add(e),t.$containers.filter(function(){return!n(this).data(w+"."+t.id+".listening")}).each(function(){var e=n(this);e.data(w+"."+t.id+".listening",!0),e.bind("blur",function(){t.cleanupIds(e.get(0)),t.update(e)})}),t},tickTock:function(e){var t=this;e=e||this.settings.updateInterval;if(!e)return;return window.setInterval(function(){t.register(v()),t.update()},e),t},cleanupIds:function(e){var t=[],r=this;return this.headings(this.$containers).each(function(){var r=n(this).attr("id");(r&&-1!=n.inArray(r,t)||e&&(n.contains(e,this)||
e===this))&&n(this).attr("id",y(this)),t.push(r)}),this},update:function(e){var t=this;e=e||t.$containers;var n=this.outline(t.$containers),r=[t.root()],i=[];a(r).empty(),function o(e){var n=[];d(e,function(e){var i=f(e),s=t.linkSection(i,r,n);r.push(s),o(l(e)),r.pop(),n.push(s)})}(l(n));var s=t.root().attr("data-TOC-minEntries")||this.settings.minEntries;return t.root().find("li").length>=s?t.root().show():t.root().hide(),this},linkSection:function(e,t,r){var i=e.eq(0).attr("id");i||(i=y(e.get(0)),e.eq(0).attr("id",i));var s=this.root(),o=m(s,i);o.length||(o=n("<li><a/></li>")),o.find("a").attr("href","#"+i).text(e.eq(0).text());if(a(r))a(r).after(o);else if(a(t).get(0)==s.get(0))s.append(o);else{var u=n("<ol/>").append(o);a(t).append(u)}return o},outline:function(e){var t=[n()],r=[t];return this.headings(e).each(function(){var e=n(this),t=this.nodeName.toLowerCase(),i=["h6","h5","h4","h3","h2","h1"],s=n.inArray(t,i),o=i.slice(s).join(","),u=e.nextUntil(o).andSelf(),a=[u],f=h(r,function(
t){var r=t[0];return!r.length||h(r,function(t){return e.get(0)===t||n.contains(t,e.get(0))})});f.push(a),r.splice(0,c(r,f),a)}),t},headings:function(e){return e.find(":header").add(e.filter(":header"))}}}})})