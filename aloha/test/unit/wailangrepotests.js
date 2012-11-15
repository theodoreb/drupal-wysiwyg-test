/*!
 * This file is part of Aloha Editor
 * Author & Copyright (c) 2010 Gentics Software GmbH, aloha@gentics.com
 * Licensed unter the terms of http://www.aloha-editor.com/license.html
 */

define([],function(){function e(e){return e.replace(/\s+/g," ")}function t(){if(a.length){var e=a.shift();typeof e=="function"&&e()}}function n(e){module("Basic Tests"),test("Test registering of repository",function(){equal(o.repositories.length,1,"Check that repository manager contains 1 registered repository."),equal(o.repositories[0]&&o.repositories[0].repositoryId,i,'Check that the id of the first registered repository is "'+i+'."'),t()})}function r(){module("Query tests (WAI-LANG repository)"),asyncTest("Test querying the wai-lang repository.",function(){var e=new Date;o.query({queryString:"de",query:"de",objectTypeFilter:["language"]},function(e){ok(e&&typeof e=="object","Check that repository manager returns a response object."),ok(e.results>0,"Check that the response contains results."),start(),t()})})}var i="wai-languages",s=5e3,o,u,a=[n,r];asyncTest("Aloha.require repository modules.",function(){var e=setTimeout(function(){ok(!1,"Aloha was not initialized within 60 seconds"),start
()},1e4);Aloha.require(["aloha/repository","aloha/repositorymanager"],function(n,r){o=r,u=n,Aloha.ready(t),clearTimeout(e),ok(!0,"Aloha Event was fired"),start()})})})