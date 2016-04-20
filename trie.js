"use strict";
class Node {
	constructor(value) {
		this._value = value;
		this._children = new Map();
	}
	
	get value() { return this._value; }
	set value(value) { return this._value = value; }
	get children() { return this._children; }
	set children(child) { 
		this._children.set(child, new Node(child)) 
	} 
}

class PrefixTree {
	constructor(){
		this._root = new Node();
	}
	
	addWord(word){
		this._addWord(this._root, word, 0);
	}
	
	traverse(){
		this._traverse(this._root);
	}
		
	_addWord(root, word, i) {
		if(word && word.length === i) {
			return;
		}
		
		if(!root.children.has(word[i])){
			root.children = word[i];
		}

		this._addWord(root.children.get(word[i]), word, i + 1);
	}
	
	_traverse(root) {
		if(!root) {
			return;
		}
		
		if(root.value) {
			console.log(root.value)
		}
		
		for(let node of root.children.values()) {
			this._traverse(node);
		}
	}
	
	_search(root, prefix, i) {
		
		if(root.children.has(prefix[i])) {
			
		}
		
		return root;
	}
	
	search(prefix) {
	
	}
	
	autocomplete(prefix) {
		let node = this.search(prefix);
		
		let list = [];		
		this._autocomplete(this._root, "", list);

		return list;
	}
	
	_autocomplete(root, word, list) {
		if(!root.children.size) {
			list.push(`${word}`);
			return;
		}
		
		for(let key of root.children.keys()){
			this._autocomplete(root.children.get(key), `${word}${key}`, list);			
		}
	}
}

let p = new PrefixTree();

p.addWord("merry");
p.addWord("merit");
p.addWord("mettle");
//p.traverse();
let l = p.autocomplete();
console.log(`${l}`);
console.log('done');