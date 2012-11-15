/* contenthandlertest.js is part of Aloha Editor project http://aloha-editor.org
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

define(["testutils"],function(e){var t=Aloha.jQuery;asyncTest("Aloha Startup Test",function(){var e=setTimeout(function(){ok(!1,"Aloha was not initialized within 60 seconds"),start()},6e4);Aloha.ready(function(){clearTimeout(e),ok(!0,"Aloha Event was fired"),start()})}),Aloha.ready(function(){var n=t("#edit"),r=t("<div>");n.aloha();for(var i=0;i<tests.tests.length;i++){var s=tests.tests[i];if(!s)continue;var o=r.text(s.start).html()+" -> "+r.text(s.expected).html(),u=typeof s.value!="undefined"?s.value:tests.defaultValue,a=s.name||'"'+r.text(u).html()+'": '+o;module("Commmand "+(i+1)+" "+tests.defaultCommand,{setup:function(){n.html(this.check.start),n.focus()},teardown:function(){}}),test(a,{check:s},function(){var r=this.check,i=r.command||tests.defaultCommand,s=typeof r.value!="undefined"?r.value:tests.defaultValue,o=t("<div>"+r.expected+"</div>").contents(),u=e.rangeFromMarker(n),a;u.select(),Aloha.execCommand(i,!1,s),u=rangy.getSelection().getRangeAt(0),e.addBrackets(u),a=Aloha.editables
[0].getContents(!0),deepEqual(a.extractHTML(),o.extractHTML(),"Check Operation Result")})}})})