/* pluginapitests.js is part of Aloha Editor project http://aloha-editor.org
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

define([],function(){Aloha.ready(function(){function e(){if(f.length){var e=f.shift();typeof e=="function"&&e()}}function t(){asyncTest("Aloha plugin defaults and settings",function(){var t=Aloha.require("plugintest1/plugintest1-plugin");ok(t.settings.value2==2,"defaults"),ok(t.settings.value1==-1,"settings"),ok(t.settings.value3.valueB=="B","nested defaults"),ok(t.settings.value3.valueA=="Z","nested settings"),equal(t.settings.value3.valueC.length,1,"nested array settings length"),equal(t.settings.value3.valueC[0],"X","nested array settings"),equal(t.settings.value3.valueD.length,2,"nested array defaults length"),equal(t.settings.value3.valueD[0],"III","nested array defaults"),equal(t.settings.value3.valueD[1],"IV","nested array defaults"),start(),e()})}function n(){asyncTest("Aloha plugin paths [lib, vendor, nls, res, css]",function(){Aloha.require(["plugintest1/test","plugintest1/vendor/test","i18n!plugintest1/nls/i18n","plugintest1/test","plugintest1/css/test"],function(n,r,i,s,o){ok
(!0,"Plugin loaded with all path"),ok(n.status=="ok","lib ok"),ok(r.status=="ok","vendor ok"),ok(typeof i.t=="function","nls ok"),ok(s.status=="ok","res ok"),ok(o.status=="ok","css ok"),start(),clearTimeout(t),e()});var t=setTimeout(function(){ok(!1,"Aloha plugin localization did not return in 5 seconds"),start(),e()},5e3)})}function r(){asyncTest("Aloha relative bundle plugin resource loading",function(){var t=Aloha.getPluginUrl("plugintest1")+"/res/test.json";jQuery.ajax({url:t,dataType:"json",success:function(n){ok(!0,"Ressource1 loaded from "+t),ok(n.data=="ok","Loaded data is correct"),start(),e()},error:function(n){ok(!1,"Error: "+n.statusText+". URL was "+t),start(),e()}})})}function i(){asyncTest("Aloha absolute bundle plugin resource loading",function(){var t=Aloha.getPluginUrl("plugintest2")+"/res/test.json";jQuery.ajax({url:t,dataType:"json",success:function(n){ok(!0,"Ressource2 loaded from "+t),ok(n.data=="ok","Loaded data is correct"),start(),e()},error:function(n){ok(!1,"Failure loading plugin resource. URL was "+
t),start(),e()}})})}function s(){asyncTest("Aloha plugin default localization (fallback)",function(){Aloha.require(["i18n!plugintest2/nls/i18n"],function(n){var r=n.t("plugin2.test1");equal(r,"fallback","Fallback key was loaded for plugintest2, key plugin2.test1."),start(),clearTimeout(t),e()});var t=setTimeout(function(){ok(!1,"Aloha plugin localization did not return in 5 seconds"),start(),e()},5e3)})}function o(){asyncTest("Aloha plugin german localization",function(){Aloha.require(["i18n!plugintest1/nls/i18n"],function(n){var r=n.t("plugin1.test1");equal(r,"german","German key was loaded for plugintest1, key plugin1.test1."),start(),clearTimeout(t),e()});var t=setTimeout(function(){ok(!1,"Aloha plugin localization did not return in 5 seconds"),start(),e()},5e3)})}function u(){asyncTest("Aloha plugin async dynamic module loading",function(){Aloha.require(["plugintest1/component"],function(n){ok(!0,"module loaded."),ok(n.doOther()=="didOther","module function present."),ok(n.doSome()=="didSome"
,"function from dependend module present."),start(),clearTimeout(t),e()});var t=setTimeout(function(){ok(!1,"Aloha plugin dynamically async module loading did not return in 5 seconds"),start(),e()},5e3)})}function a(){asyncTest("Aloha cross plugin async dynamic module loading",function(){Aloha.require(["plugintest2/component"],function(n){ok(n.doSome()=="didSome","Sucessfully dynamically async loaded cross plugin module dependency."),start(),clearTimeout(t),e()});var t=setTimeout(function(){ok(!1,"Aloha plugin dynamically async module loading did not return in 5 seconds"),start(),e()},5e3)})}var f=[t,n,r,i,s,o,u,a];module("Plugin API test",{}),test("Aloha plugin invocation Test",function(){equal(window.AlohaPlugin1,"called","Checking window.AlohaPlugin1.")}),e()})})