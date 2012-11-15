/* dom-to-xhtml-tests.js is part of Aloha Editor project http://aloha-editor.org
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

define([],function(){function e(e,t,n){n=n||"test-editable";var r=jQuery("#"+n);null!=t&&r.html(t),r.aloha();var i=Aloha.getEditableById(n);e(i),i.destroy()}function t(t,n){e(function(e){var t=e.getContents();if(jQuery.isArray(n)){var r=!1;for(var i=0;i<n.length;i++)if(t==n[i]){r=!0;break}r?ok(!0):equal(t,n[0])}else equal(t,n)},t)}function n(t,n){e(function(e){var n=e.obj.children().eq(0),r={};for(var i in t)if(t.hasOwnProperty(i)){var s=t[i];r[i]=$.isArray(s)?s[0]:s}n.css(r);var o=e.getContents(),u=$(o).eq(0);for(var i in t)if(t.hasOwnProperty(i)){var a=u.css(i),s=t[i];if($.isArray(s)){var f=!1;for(var l=0;l<s.length;l++)a==s[l]&&(f=!0);f?ok(!0):equal(a,s[0])}else equal(a,s)}},n)}Aloha.ready(function(){module("Serialization"),test("links",function(){t('<a href="http://www.example.com">link</a>',['<a href="http://www.example.com">link</a>','<a href="http://www.example.com/">link</a>']),t('<a href="http://www.example.com/?#anchor">link</a>','<a href="http://www.example.com/?#anchor">link</a>'
)}),test("empty elements without closing tag",function(){t("some <br>text","some <br/>text"),t('some<img src="http://www.example.com/img.jpg">text','some<img src="http://www.example.com/img.jpg"/>text')}),test("tables",function(){t("<table><tr><th>one<th>two<tr><td>three<td>four</table>",["<table><tbody><tr><th>one</th><th>two</th></tr><tr><td>three</td><td>four</td></tr></tbody></table>","<table><tbody><tr><th>one </th><th>two </th></tr><tr><td>three </td><td>four</td></tr></tbody></table>"])}),test("lists",function(){t("<ul><li><ol><li>one<li>two</ol></ul>",["<ul><li><ol><li>one</li><li>two</li></ol></li></ul>","<ul><li><ol><li>one </li><li>two</li></ol></li></ul>"])}),test("empty elements with closing tag",function(){t("some<span></span>text","some<span></span>text"),t("some<div></div>text",["some<div></div>text","some <div></div>text"])}),test("boolean attributes",function(){t('<input type="checkbox" checked>',['<input type="checkbox" checked="checked"/>','<input checked="checked" type="checkbox"/>'
,'<input type="checkbox" checked="checked" value="on"/>','<input value="on" checked="checked" type="checkbox"/>','<input type="checkbox" value="on" checked="checked"/>']),t("<button disabled>",['<button disabled="disabled"></button>','<button disabled="disabled" type="submit"></button>'])}),test('"pre" preserves spaces tabs and newlines',function(){var t="<pre>\n		two leading tabs\n        leading whitespace\n</pre>";e(function(e){equal(e.getContents().replace(/\n/g,"\r"),"<pre>		two leading tabs\n        leading whitespace\n</pre>".replace(/\n/g,"\r"))},t);var n='<span style="white-space: pre">\n		two leading tabs\n        leading whitespace\n</span>';e(function(e){},n)}),test("special characters in attributes",function(){t('<img src="http://www.example.com/?one=two&three&&amp;four">','<img src="http://www.example.com/?one=two&amp;three&amp;&amp;four"/>'),t('<img alt="left << middle >> right">','<img alt="left &lt;&lt; middle >> right"/>'),t("<img alt='some \"quoted\" text'>",'<img alt="some &quot;quoted&quot; text"/>'
)}),test("special characters in intra-element text",function(){t("<span>big < bigger < biggest</span>","<span>big &lt; bigger &lt; biggest</span>"),t("<span>You&Me&You</span>","<span>You&amp;Me&amp;You</span>")}),test("script tags",function(){t("<div>pre-script<script> if (1 < 2 && true) { } else { } </script>post-script</div>","<div>pre-scriptpost-script</div>")}),test("IE conditional includes",function(){var e="<div><!--[if IE 8 ]> <span> some text </span> <![endif]--></div>"}),test("normal comments",function(){var e="<span>x<!-- some comment --></span>";t(e,e)}),test("serializing dynamically set css attributes",function(){n({color:["green","rgb(0, 128, 0)"],width:"5px"},"<div></div>")}),test("namespaced XML",function(){var e='<div xmlns:books="urn:loc.gov:books"><books:book xmlns:isbn="urn:ISBN:0-395-36341-6"><isbn:number>1568491379</isbn:number><books:notes> <p xmlns="http://www.w3.org/1999/xhtml">This is also available <a href="http://www.w3.org/">online</a>.</p></books:notes></books:book></div>'
;t(e,e)}),test("IE unrecognized XML",function(){var e='x<ie-unrecognized-1 some-attr="some-value"><ie-unrecognized-2><ie-unrecognized-3><span>some text</span></ie-unrecognized-3><ie-unrecognized-4>more text <span>even more text</span><!-- comment --></ie-unrecognized-4></ie-unrecognized-2><ie-unrecognized-5><span> one more text</span></ie-unrecognized-5></ie-unrecognized-1>';t(e,e)}),test("classes and styles",function(){t('<P class="article">','<p class="article"></p>'),t('<BR class="aloha-end-br">','<br class="aloha-end-br"/>'),t('<P style="color:red">',['<p style="color:red"></p>','<p style="color: red"></p>']),t('<BR style="color:red">',['<br style="color:red"/>','<br style="color: red"/>'])})})})