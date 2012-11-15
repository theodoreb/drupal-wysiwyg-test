/* contenthandlermanagertest.js is part of Aloha Editor project http://aloha-editor.org
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

define(["testutils"],function(e){asyncTest("Aloha Startup Test",function(){var e=window.setTimeout(function(){ok(!1,"Aloha was not initialized within 60 seconds"),start()},6e4);Aloha.ready(function(){window.clearTimeout(e),ok(!0,"Aloha Event was fired"),start()})}),Aloha.ready(function(){Aloha.require(["aloha/contenthandlermanager"],function(t){var n,r=t.getIds();for(n in r)r.hasOwnProperty(n)&&t.unregister(r[n]);t.register("one",t.createHandler({handleContent:function(e){return e+",one"}})),t.register("two",t.createHandler({handleContent:function(e){return e+",two"}})),t.register("three",t.createHandler({handleContent:function(e){return e+",three"}})),t.register("four",t.createHandler({handleContent:function(e){return e+",four"}})),test("Test ContentHandlerManager.get",function(){ok(t.get("one"),'Found contenthandler "one"'),ok(t.get("two"),'Found contenthandler "two"'),ok(t.get("three"),'Found contenthandler "three"'),ok(t.get("four"),'Found contenthandler "four"'),equal(t.get("five")
,undefined,'Not found non-existent contenthandler "five"')}),test("Test ContentHandlerManager.has",function(){equal(t.has("one"),!0,'Found contenthandler "one"'),equal(t.has("two"),!0,'Found contenthandler "two"'),equal(t.has("three"),!0,'Found contenthandler "three"'),equal(t.has("four"),!0,'Found contenthandler "four"'),equal(t.has("five"),!1,'Not found non-existent contenthandler "five"')}),test("Test ContentHandlerManager.getEntries",function(){var e=t.getEntries();ok(e.one,'Found contenthandler "one"'),ok(e.two,'Found contenthandler "two"'),ok(e.three,'Found contenthandler "three"'),ok(e.four,'Found contenthandler "four"'),equal(e.five,undefined,'Not found non-existent contenthandler "five"')}),test("Test ContentHandlerManager.getIds",function(){deepEqual(t.getIds(),["one","two","three","four"],"Array of registered ids in correct order")}),test("Test handling content with all handlers",function(){var e="content",n=t.handleContent(e,{});equal(n,"content,one,two,three,four","Test handled content"
)});var i,s,o=e.permutations(["one","two","three","four"]);for(i in o)o.hasOwnProperty(i)&&(s=o[i],function(e){test("Test handling contenthandlers "+e.join(","),function(){var n="content",r=n+","+e.join(","),i=t.handleContent(n,{contenthandler:e});equal(i,r,"Test handled content")})}(s))})})})