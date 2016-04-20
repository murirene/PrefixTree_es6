"use strict"
/* Unit Tests for validating the PrefixTree */
var expect = require('chai').expect;
var PrefixTree = require('./trie');

describe('PrefixTree', function() {
	var preTree = new PrefixTree();
    before(function() {
		preTree.addWord("merry");
		preTree.addWord("merit");
		preTree.addWord("mettle");
		preTree.addWord("addition");
		preTree.addWord("addison");
		preTree.addWord("arizona");
    });
	
    it('should return words with the prefix met.', function () {
      	expect(preTree.autocomplete("met")).to.deep.equal(["mettle"]);
    });
	
    it('should return words with the prefix  m.', function () {	
    	expect(preTree.autocomplete("m")).to.deep.equal(["merry", "merit", "mettle"]);
	});
	
	it('should return words with the prefix. ad', function () {		
    	expect(preTree.autocomplete("ad")).to.deep.equal(["addition", "addison"]);
	});

	it('should return no words with the prefix. z', function () {					
		expect(preTree.autocomplete("z")).to.deep.equal([]);
	});		
});