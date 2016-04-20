"use strict";

/* 
	PrefixTree Node
	
	Implementation:
		The Node keeps the children in a HashMap where the key is the letter value of the node 
		and the value are the children.
*/

class _Node {
	constructor(value) {
		this._children = new Map();
	}

	get children() { return this._children; }
	set children(child) { 
		this._children.set(child, new _Node(child)) 
	} 
}

/* 
	PrefixTree
	
	Implementation:
		The prefix tree has a root node pointing to the top of the tree.
		
	Methods:
		autocomplete - returns the list of words that match the prefix.
		addWord - Adds Word to the Prefix Tree.
		__autocomplete - private helper method that recursively collects the list of words 
			with the prefix.
		_addWord - private helper method that recursively adds the word to the Prefix Tree.
		_search - private internal method that returns the sub-tree under the Prefix.
		__search - private internal helper method that returns the sub-tree under teh Prefix.
	 
*/

module.exports =  class PrefixTree {		
	constructor(){
		this._root = new _Node();
	}
	
	addWord(word){
		this._addWord(this._root, word, 0);
	}
	
	_addWord(root, word, i) {
		if (word && word.length === i) {
			return;
		}
		
		if (!root.children.has(word[i])) {
			root.children = word[i];
		}

		this._addWord(root.children.get(word[i]), word, i + 1);
	}

	_search(prefix) {
		return this.__search(this._root, prefix, 0);
	}
		
	__search(root, prefix, i) {
		if(prefix.length === i ){
			return root;
		}
		
		if(root.children.has(prefix[i])) {
			return this.__search(root.children.get(prefix[i]), prefix, i + 1);
		} else {
			return undefined;
		}
		
		return root;
	}
	
	autocomplete(prefix) {
		let node = this._search(prefix);
		let list = [];		
		
		if (node && prefix) {
			this._autocomplete(node, prefix, list);
		}
		
		return list;
	}
	
	_autocomplete(root, word, list) {
		if (!root.children.size) {
			list.push(`${word}`);
			return;
		}
		
		for (let key of root.children.keys()){
			this._autocomplete(root.children.get(key), `${word}${key}`, list);			
		}
	}
}
