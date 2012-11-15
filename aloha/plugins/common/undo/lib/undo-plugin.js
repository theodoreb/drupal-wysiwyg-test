/* undo-plugin.js is part of Aloha Editor project http://aloha-editor.org
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

define(["aloha","jquery","aloha/plugin","undo/vendor/undo","undo/vendor/diff_match_patch_uncompressed"],function(e,t,n){function s(e){var t=r.patch_deepCopy(e);for(var n=0;n<t.length;n++)for(var i=0;i<t[n].diffs.length;i++)t[n].diffs[i][0]=-t[n].diffs[i][0];return t}var r=new diff_match_patch,i=!1;return n.create("undo",{init:function(){this.stack=new Undo.Stack;var t=this,n=Undo.Command.extend({constructor:function(e,t){this.editable=e,this.patch=t},execute:function(){},undo:function(){this.phase(s(this.patch))},redo:function(){this.phase(this.patch)},phase:function(e){var t=this.editable.getContents(),n=r.patch_apply(e,t),i=n[0],s=n[1];s.length,this.reset(i)},reset:function(t){i=!0;var n=null;e.getActiveEditable()===this.editable&&(e.deactivateEditable(),n=this.editable),this.editable.obj.html(t),null!==n&&n.activate(),this.editable.smartContentChange({type:"blur"}),i=!1}});this.stack.changed=function(){},e.bind("aloha-editable-created",function(e,n){n.obj.bind("keydown","ctrl+z shift+ctrl+z"
,function(e){e.preventDefault(),e.shiftKey?t.redo():t.undo()})}),e.bind("aloha-smart-content-changed",function(e,s){var o=s.getSnapshotContent();if(i)return;var u=s.editable.getContents(),a=r.patch_make(o,u);0!==a.length&&t.stack.execute(new n(s.editable,a))})},toString:function(){return"undo"},undo:function(){null!==e.getActiveEditable()&&e.getActiveEditable().smartContentChange({type:"blur"}),this.stack.canUndo()&&this.stack.undo()},redo:function(){null!==e.getActiveEditable()&&e.getActiveEditable().smartContentChange({type:"blur"}),this.stack.canRedo()&&this.stack.redo()},stack:undefined})})