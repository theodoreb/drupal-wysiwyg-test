/* linklist.js is part of Aloha Editor project http://aloha-editor.org
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

//(c) Steven Levithan <stevenlevithan.com>

define(["aloha","aloha/jquery"],function(e,t){var n=[{name:"Aloha Editor - The HTML5 Editor",url:"http://aloha-editor.org",type:"website"},{name:"Aloha Editor - Wiki",url:"http://github.com/alohaeditor/Aloha-Editor/wiki",type:"website"},{name:"Aloha Editor - GitHub",url:"http://github.com/alohaeditor/Aloha-Editor",type:"website"},{name:"Aloha Logo",url:"http://www.aloha-editor.com/images/aloha-editor-logo.png",type:"image"}];new(e.AbstractRepository.extend({_constructor:function(){this._super("linklist")},folder:[],init:function(){e.settings.repositories&&e.settings.repositories.linklist&&e.settings.repositories.linklist.data&&(n=n.concat(e.settings.repositories.linklist.data)),"filter"in Array.prototype||(n.filter=function(e,t){var n=[],r,i=0,s=this.length;for(;i<s;i++)i in this&&e.call(t,r=this[i],i,this)&&n.push(r);return n});var t=n.length;for(var r=0;r<t;++r){var i=n[r];i.repositoryId=this.repositoryId,i.id=i.id?i.id:i.url;var s=i.uri=this.parseUri(i.url),o=this.addFolder("",s.host
),u=s.path.split("/");for(var a=0;a<u.length;a++)u[a]&&u[a].lastIndexOf(".")<0&&(o=this.addFolder(o,u[a]));i.parentId=o,n[r]=new e.RepositoryDocument(i)}this.repositoryName="Linklist"},addFolder:function(t,n){var r=t?"folder":"hostname",i=t?t+"/"+n:n;return n&&!this.folder[i]&&(this.folder[i]=new e.RepositoryFolder({id:i,name:n||i,parentId:t,type:"host",repositoryId:this.repositoryId})),i},query:function(e,r){var i=new RegExp(e.queryString,"i"),s=n.filter(function(n,r,s){return(!e.queryString||n.name.match(i)||n.url.match(i))&&(!e.objectTypeFilter||!e.objectTypeFilter.length||t.inArray(n.type,e.objectTypeFilter)>-1)&&!0});r.call(this,s)},getChildren:function(e,t){var n=[],r;for(r in this.folder){var i=this.folder[r].parentId;typeof this.folder[r]!="function"&&(this.folder[r].parentId==e.inFolderId||!this.folder[r].parentId&&e.inFolderId==this.repositoryId)&&n.push(this.folder[r])}t.call(this,n)},parseUri:function(e){var t={strictMode:!1,key:["source","protocol","authority","userInfo","user"
,"password","host","port","relative","path","directory","file","query","anchor"],q:{name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}},n=t.parser[t.strictMode?"strict":"loose"].exec(e),r={},i=14;while(i--)r[t.key[i]]=n[i]||"";return r[t.q.name]={},r[t.key[12]].replace(t.q.parser,function(e,n,i){n&&(r[t.q.name][n]=i)}),r},getObjectById:function(e,t){var r=0,i=n.length,s=[];for(;r<i;r++)n[r].id==e&&s.push(n[r]);t.call(this,s)}}))})