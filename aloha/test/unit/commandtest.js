/* commandtest.js is part of Aloha Editor project http://aloha-editor.org
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

define(["testutils"],function(e){var t=window.jQuery,n,r;t.browser.msie?n="msie":t.browser.webkit?n="webkit":t.browser.opera?n="opera":t.browser.mozilla&&(n="mozilla"),r=n+t.browser.version,asyncTest("Aloha Startup Test",function(){var e=setTimeout(function(){ok(!1,"Aloha was not initialized within 60 seconds"),start()},6e4);Aloha.ready(function(){clearTimeout(e),ok(!0,"Aloha Event was fired"),start()})}),Aloha.ready(function(){var i=t("#edit"),s=t("<div>"),o=t("<div>");i.aloha();for(var u=0;u<tests.tests.length;u++){var a=tests.tests[u],f=!1;typeof a=="undefined"&&(a={}),typeof a.exclude=="undefined"&&(a.exclude=!1),typeof a.include=="undefined"&&(a.include=!1),a.exclude&&typeof a.exclude=="string"&&(a.exclude=[a.exclude]),a.include&&typeof a.include=="string"&&(a.include=[a.include]),a.exclude&&(a.exclude.indexOf(n)!==-1||a.exclude.indexOf(r)!==-1)&&(f=!0),a.include&&a.include.indexOf(n)===-1&&a.include.indexOf(r)===-1&&(f=!0),a.value=typeof a.value!="undefined"?a.value:tests.defaultValue
,a.attributes=typeof a.attributes!="undefined"?a.attributes:tests.defaultAttributes,o.text(a.start);var l=o.html();o.text(a.value);var c=o.html();s.text(a.execResult);var h=s.html(),p='"'+l+'" &rarr; "'+h+'"';c&&c!==l&&(p+=' ("'+c+'")');var d=a.name||p;module(tests.defaultCommand+" "+(u+1)+(f?" (EX)":""),{setup:function(){i.html(this.check.start),i.focus()},teardown:function(){}}),f?test(d,{check:a},function(){}):test(d,{check:a},function(){var r=this.check,s=r.command||tests.defaultCommand,o=e.addRange(i),u,a,f,l;l=Aloha.createRange(),l.setStart(o.startContainer,o.startOffset),l.setEnd(o.endContainer,o.endOffset),Aloha.getSelection().removeAllRanges(),Aloha.getSelection().addRange(l),typeof r.indetermStart!="undefined"&&(f=Aloha.queryCommandIndeterm(s),deepEqual(f,r.indetermStart,"queryCommandIndeterm start")),typeof r.stateStart!="undefined"&&(f=Aloha.queryCommandState(s),deepEqual(f,r.stateStart,"queryCommanState start")),typeof r.valueStart!="undefined"&&(f=Aloha.queryCommandValue(s
),deepEqual(f,r.valueStart,"queryCommandValue start"));if(typeof r.execResult!="undefined"){Aloha.execCommand(s,!1,r.value,o),o=rangy.getSelection().getRangeAt(0),e.addBrackets(o),f=Aloha.editables[0].obj.clone(!1);var c=f.html();f.html(c),f=f.contents(),u=t("<div>"+r.execResult+"</div>"),n&&u.find('[data-test-exclude~="'+n+'"]').remove(),u=u.contents(),deepEqual(f.extractHTML(r.attributes),u.extractHTML(r.attributes),"execCommand result")}typeof r.indetermResult!="undefined"&&(f=Aloha.queryCommandIndeterm(s),deepEqual(f,r.indetermResult,"queryCommandIndeterm result")),typeof r.stateResult!="undefined"&&(f=Aloha.queryCommandState(s),deepEqual(f,r.stateResult,"queryCommanState result")),typeof r.valueResult!="undefined"&&(f=Aloha.queryCommandValue(s),deepEqual(f,r.valueResult,"queryCommandValue result")),r.execToggle&&(o=e.addRange(i),l=Aloha.createRange(),l.setStart(o.startContainer,o.startOffset),l.setEnd(o.endContainer,o.endOffset),Aloha.getSelection().removeAllRanges(),Aloha.getSelection
().addRange(l),typeof r.execToggle!="undefined"&&(f=Aloha.execCommand(s,!1,r.value),o=rangy.getSelection().getRangeAt(0),e.addBrackets(o),f=Aloha.editables[0].getContents(!0),a=t("<div>"+r.execToggle+"</div>").contents(),deepEqual(f.extractHTML(r.attributes),a.extractHTML(r.attributes),"execCommand toggle result")),typeof r.indetermToggle!="undefined"&&(f=Aloha.queryCommandIndeterm(s),deepEqual(f,r.indetermToggle,"queryCommandIndeterm toggle result")),typeof r.stateToggle!="undefined"&&(f=Aloha.queryCommandState(s),deepEqual(f,r.stateToggle,"queryCommanState toggle result")),typeof r.valueResult!="undefined"&&(f=Aloha.queryCommandValue(s),deepEqual(f,r.valueToggle,"queryCommandValue toggle result")))})}})})