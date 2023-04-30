// Generated by Haxe 4.1.3
(function ($global) {
	"use strict";
	function $extend(from, fields) {
		var proto = Object.create(from);
		for (var name in fields) proto[name] = fields[name];
		if (fields.toString !== Object.prototype.toString) proto.toString = fields.toString;
		return proto;
	}
	var EReg = function (r, opt) {
		this.r = new RegExp(r, opt.split("u").join(""));
	};
	EReg.__name__ = true;
	EReg.prototype = {
		match: function (s) {
			if (this.r.global) {
				this.r.lastIndex = 0;
			}
			this.r.m = this.r.exec(s);
			this.r.s = s;
			return this.r.m != null;
		}
		, matchedPos: function () {
			if (this.r.m == null) {
				throw haxe_Exception.thrown("No string matched");
			}
			return { pos: this.r.m.index, len: this.r.m[0].length };
		}
		, matchSub: function (s, pos, len) {
			if (len == null) {
				len = -1;
			}
			if (this.r.global) {
				this.r.lastIndex = pos;
				this.r.m = this.r.exec(len < 0 ? s : HxOverrides.substr(s, 0, pos + len));
				var b = this.r.m != null;
				if (b) {
					this.r.s = s;
				}
				return b;
			} else {
				var b = this.match(len < 0 ? HxOverrides.substr(s, pos, null) : HxOverrides.substr(s, pos, len));
				if (b) {
					this.r.s = s;
					this.r.m.index += pos;
				}
				return b;
			}
		}
		, map: function (s, f) {
			var offset = 0;
			var buf_b = "";
			while (true) {
				if (offset >= s.length) {
					break;
				} else if (!this.matchSub(s, offset)) {
					buf_b += Std.string(HxOverrides.substr(s, offset, null));
					break;
				}
				var p = this.matchedPos();
				buf_b += Std.string(HxOverrides.substr(s, offset, p.pos - offset));
				buf_b += Std.string(f(this));
				if (p.len == 0) {
					buf_b += Std.string(HxOverrides.substr(s, p.pos, 1));
					offset = p.pos + 1;
				} else {
					offset = p.pos + p.len;
				}
				if (!this.r.global) {
					break;
				}
			}
			if (!this.r.global && offset > 0 && offset < s.length) {
				buf_b += Std.string(HxOverrides.substr(s, offset, null));
			}
			return buf_b;
		}
		, __class__: EReg
	};
	var HxOverrides = function () { };
	HxOverrides.__name__ = true;
	HxOverrides.substr = function (s, pos, len) {
		if (len == null) {
			len = s.length;
		} else if (len < 0) {
			if (pos == 0) {
				len = s.length + len;
			} else {
				return "";
			}
		}
		return s.substr(pos, len);
	};
	HxOverrides.now = function () {
		return Date.now();
	};
	var Main = function () { };
	Main.__name__ = true;
	Main.main = function () {
		/* console.log("src/Main.hx:35:","hello"); */


		sequent_core_Wff.LANGUAGE = new sequent_calculi_g3cp_ClassicalLanguage();
		var g3cp = new sequent_calculi_g3cp_G3cp();
		var wff = new sequent_core_Wff("(A>B)");
		var wff2 = new sequent_core_Wff("B>A");
		wff2.evaulate();
		wff.evaulate();
		var hash = HxOverrides.substr(window.location.hash, 3, null);
		var _this_r = new RegExp("%3E", "g".split("u").join(""));
		hash = hash.replace(_this_r, ">");
		var _this_r = new RegExp("%7C", "g".split("u").join(""));
		hash = hash.replace(_this_r, "|");
		var prefix = window.location.hash.substring(1, 2);
		console.log("src/Main.hx:60:", hash);
		var formula = "(((A>B)>A)>A)";
		if (hash != "") {
			/* console.log("src/Main.hx:63:",hash + " : hash"); */
			formula = "(" + hash + ")";
		}
		var st = new sequent_core_Wff(formula);
		st.evaulate();
		/* console.log("src/Main.hx:69:",st); */
		if (!st.isCorrect()) {
			window.alert("incorrect formula");
			return;
		}
		var pf = new sequent_core_Wff("f");
		var mlset = sequent_core_collection_Multiset.fromWffArray([st]);
		var wls = sequent_core_collection_Multiset.fromWffArray([]);
		var seq = new sequent_core_Sequent(wls, mlset);
		console.log("src/Main.hx:84:", Std.string(seq) + "");
		var calc = js_Boot.__cast(window.document.querySelector("#calc"), HTMLSelectElement);
		var g3cp = new sequent_calculi_g3cp_G3cp();
		var g4ip = new sequent_calculi_g4ip_G4ip();
		if (prefix == "i") {
			calc.value = "g4ip";
		} else if (prefix == "c") {
			calc.value = "g3cp";
		}
		var solution = "";
		if (calc.value == "g3cp") {
			console.log("src/Main.hx:103:", "g3cp");
			console.log("src/Main.hx:104:", g3cp.proofSearch(seq));
			var tree = g3cp.getProofTree(seq);
			if (tree == null) {
				tree = g3cp.toFrac(seq);
			}
			solution = sequent_core_Latex.toLatex(tree);
		} else if (calc.value == "g4ip") {
			console.log("src/Main.hx:111:", g4ip.proofSearch(seq));
			var tree = g4ip.getProofTree(seq);
			if (tree == null) {
				tree = g4ip.toFrac(seq);
			}
			solution = sequent_core_Latex.toLatex(tree);
		}
		var mathjaxcontainer = window.document.querySelector("#sd");
		var input = js_Boot.__cast(window.document.querySelector("#inpt"), HTMLInputElement);
		input.value = st.literal.substring(1, st.literal.length - 1);
		var btn = window.document.querySelector("#btn");
		btn.addEventListener("click", function () {
			console.log("src/Main.hx:126:", calc.value);
			var t = "i=";
			if (calc.value == "g3cp") {
				t = "c=";
			}
			window.document.location.hash = "#" + t + input.value;
			if (input.value == "") {
				return;
			}
			var wffinput = new sequent_core_Wff("(" + input.value + ")");
			wffinput.evaulate();
			if (!wffinput.isCorrect()) {
				window.alert("incorrect formula");
				return;
			}
			var multiset = sequent_core_collection_Multiset.fromWffArray([wffinput]);
			var seq = new sequent_core_Sequent(sequent_core_collection_Multiset.fromWffArray([]), multiset);
			var solution = "";
			if (calc.value == "g3cp") {
				console.log("src/Main.hx:140:", "g3cp");
				console.log("src/Main.hx:141:", g3cp.proofSearch(seq));
				var tree = g3cp.getProofTree(seq);
				if (tree == null) {
					tree = g3cp.toFrac(seq);
				}
				console.log("src/Main.hx:144:", tree);
				solution = sequent_core_Latex.toLatex(tree);
			} else if (calc.value == "g4ip") {
				console.log("src/Main.hx:148:", g4ip.proofSearch(seq));
				var tree = g4ip.getProofTree(seq);
				if (tree == null) {
					tree = g4ip.toFrac(seq);
				}
				console.log("src/Main.hx:151:", tree);
				solution = sequent_core_Latex.toLatex(tree);
			}

			//MathJax.Hub.queue.Push(["Text",math,solution]);
			mathjaxcontainer.textContent = `$ \\Huge ${solution}  $`;
			console.log(mathjaxcontainer.textContent)
			MathJax.typeset();
		});
		mathjaxcontainer.textContent = `$ \\Huge   ${solution}  $`;
		MathJax.typeset && MathJax.typeset();



	};
	Main.test = function (i) {
		return true;
	};
	Math.__name__ = true;
	var Std = function () { };
	Std.__name__ = true;
	Std.string = function (s) {
		return js_Boot.__string_rec(s, "");
	};
	Std.parseInt = function (x) {
		if (x != null) {
			var _g = 0;
			var _g1 = x.length;
			while (_g < _g1) {
				var i = _g++;
				var c = x.charCodeAt(i);
				if (c <= 8 || c >= 14 && c != 32 && c != 45) {
					var nc = x.charCodeAt(i + 1);
					var v = parseInt(x, nc == 120 || nc == 88 ? 16 : 10);
					if (isNaN(v)) {
						return null;
					} else {
						return v;
					}
				}
			}
		}
		return null;
	};
	var haxe_IMap = function () { };
	haxe_IMap.__name__ = true;
	haxe_IMap.__isInterface__ = true;
	haxe_IMap.prototype = {
		__class__: haxe_IMap
	};
	var haxe_Exception = function (message, previous, native) {
		Error.call(this, message);
		this.message = message;
		this.__previousException = previous;
		this.__nativeException = native != null ? native : this;
	};
	haxe_Exception.__name__ = true;
	haxe_Exception.thrown = function (value) {
		if (((value) instanceof haxe_Exception)) {
			return value.get_native();
		} else if (((value) instanceof Error)) {
			return value;
		} else {
			var e = new haxe_ValueException(value);
			return e;
		}
	};
	haxe_Exception.__super__ = Error;
	haxe_Exception.prototype = $extend(Error.prototype, {
		get_native: function () {
			return this.__nativeException;
		}
		, __class__: haxe_Exception
	});
	var haxe_Timer = function (time_ms) {
		var me = this;
		this.id = setInterval(function () {
			me.run();
		}, time_ms);
	};
	haxe_Timer.__name__ = true;
	haxe_Timer.delay = function (f, time_ms) {
		var t = new haxe_Timer(time_ms);
		t.run = function () {
			t.stop();
			f();
		};
		return t;
	};
	haxe_Timer.prototype = {
		stop: function () {
			if (this.id == null) {
				return;
			}
			clearInterval(this.id);
			this.id = null;
		}
		, run: function () {
		}
		, __class__: haxe_Timer
	};
	var haxe_ValueException = function (value, previous, native) {
		haxe_Exception.call(this, String(value), previous, native);
		this.value = value;
	};
	haxe_ValueException.__name__ = true;
	haxe_ValueException.__super__ = haxe_Exception;
	haxe_ValueException.prototype = $extend(haxe_Exception.prototype, {
		__class__: haxe_ValueException
	});
	var haxe_ds_IntMap = function () {
		this.h = {};
	};
	haxe_ds_IntMap.__name__ = true;
	haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
	haxe_ds_IntMap.prototype = {
		set: function (key, value) {
			this.h[key] = value;
		}
		, get: function (key) {
			return this.h[key];
		}
		, exists: function (key) {
			return this.h.hasOwnProperty(key);
		}
		, remove: function (key) {
			if (!this.h.hasOwnProperty(key)) {
				return false;
			}
			delete (this.h[key]);
			return true;
		}
		, keys: function () {
			var a = [];
			for (var key in this.h) if (this.h.hasOwnProperty(key)) a.push(key | 0);
			return new haxe_iterators_ArrayIterator(a);
		}
		, copy: function () {
			var copied = new haxe_ds_IntMap();
			var key = this.keys();
			while (key.hasNext()) {
				var key1 = key.next();
				copied.h[key1] = this.h[key1];
			}
			return copied;
		}
		, __class__: haxe_ds_IntMap
	};
	var haxe_ds_ObjectMap = function () {
		this.h = { __keys__: {} };
	};
	haxe_ds_ObjectMap.__name__ = true;
	haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
	haxe_ds_ObjectMap.prototype = {
		set: function (key, value) {
			var id = key.__id__;
			if (id == null) {
				id = (key.__id__ = $global.$haxeUID++);
			}
			this.h[id] = value;
			this.h.__keys__[id] = key;
		}
		, get: function (key) {
			return this.h[key.__id__];
		}
		, exists: function (key) {
			return this.h.__keys__[key.__id__] != null;
		}
		, remove: function (key) {
			var id = key.__id__;
			if (this.h.__keys__[id] == null) {
				return false;
			}
			delete (this.h[id]);
			delete (this.h.__keys__[id]);
			return true;
		}
		, keys: function () {
			var a = [];
			for (var key in this.h.__keys__) {
				if (this.h.hasOwnProperty(key)) {
					a.push(this.h.__keys__[key]);
				}
			}
			return new haxe_iterators_ArrayIterator(a);
		}
		, copy: function () {
			var copied = new haxe_ds_ObjectMap();
			var key = this.keys();
			while (key.hasNext()) {
				var key1 = key.next();
				copied.set(key1, this.h[key1.__id__]);
			}
			return copied;
		}
		, __class__: haxe_ds_ObjectMap
	};
	var haxe_iterators_ArrayIterator = function (array) {
		this.current = 0;
		this.array = array;
	};
	haxe_iterators_ArrayIterator.__name__ = true;
	haxe_iterators_ArrayIterator.prototype = {
		hasNext: function () {
			return this.current < this.array.length;
		}
		, next: function () {
			return this.array[this.current++];
		}
		, __class__: haxe_iterators_ArrayIterator
	};
	var haxe_iterators_MapKeyValueIterator = function (map) {
		this.map = map;
		this.keys = map.keys();
	};
	haxe_iterators_MapKeyValueIterator.__name__ = true;
	haxe_iterators_MapKeyValueIterator.prototype = {
		hasNext: function () {
			return this.keys.hasNext();
		}
		, next: function () {
			var key = this.keys.next();
			return { value: this.map.get(key), key: key };
		}
		, __class__: haxe_iterators_MapKeyValueIterator
	};
	var js_Boot = function () { };
	js_Boot.__name__ = true;
	js_Boot.getClass = function (o) {
		if (o == null) {
			return null;
		} else if (((o) instanceof Array)) {
			return Array;
		} else {
			var cl = o.__class__;
			if (cl != null) {
				return cl;
			}
			var name = js_Boot.__nativeClassName(o);
			if (name != null) {
				return js_Boot.__resolveNativeClass(name);
			}
			return null;
		}
	};
	js_Boot.__string_rec = function (o, s) {
		if (o == null) {
			return "null";
		}
		if (s.length >= 5) {
			return "<...>";
		}
		var t = typeof (o);
		if (t == "function" && (o.__name__ || o.__ename__)) {
			t = "object";
		}
		switch (t) {
			case "function":
				return "<function>";
			case "object":
				if (((o) instanceof Array)) {
					var str = "[";
					s += "\t";
					var _g = 0;
					var _g1 = o.length;
					while (_g < _g1) {
						var i = _g++;
						str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i], s);
					}
					str += "]";
					return str;
				}
				var tostr;
				try {
					tostr = o.toString;
				} catch (_g) {
					return "???";
				}
				if (tostr != null && tostr != Object.toString && typeof (tostr) == "function") {
					var s2 = o.toString();
					if (s2 != "[object Object]") {
						return s2;
					}
				}
				var str = "{\n";
				s += "\t";
				var hasp = o.hasOwnProperty != null;
				var k = null;
				for (k in o) {
					if (hasp && !o.hasOwnProperty(k)) {
						continue;
					}
					if (k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
						continue;
					}
					if (str.length != 2) {
						str += ", \n";
					}
					str += s + k + " : " + js_Boot.__string_rec(o[k], s);
				}
				s = s.substring(1);
				str += "\n" + s + "}";
				return str;
			case "string":
				return o;
			default:
				return String(o);
		}
	};
	js_Boot.__interfLoop = function (cc, cl) {
		if (cc == null) {
			return false;
		}
		if (cc == cl) {
			return true;
		}
		var intf = cc.__interfaces__;
		if (intf != null) {
			var _g = 0;
			var _g1 = intf.length;
			while (_g < _g1) {
				var i = _g++;
				var i1 = intf[i];
				if (i1 == cl || js_Boot.__interfLoop(i1, cl)) {
					return true;
				}
			}
		}
		return js_Boot.__interfLoop(cc.__super__, cl);
	};
	js_Boot.__instanceof = function (o, cl) {
		if (cl == null) {
			return false;
		}
		switch (cl) {
			case Array:
				return ((o) instanceof Array);
			case Bool:
				return typeof (o) == "boolean";
			case Dynamic:
				return o != null;
			case Float:
				return typeof (o) == "number";
			case Int:
				if (typeof (o) == "number") {
					return ((o | 0) === o);
				} else {
					return false;
				}
				break;
			case String:
				return typeof (o) == "string";
			default:
				if (o != null) {
					if (typeof (cl) == "function") {
						if (js_Boot.__downcastCheck(o, cl)) {
							return true;
						}
					} else if (typeof (cl) == "object" && js_Boot.__isNativeObj(cl)) {
						if (((o) instanceof cl)) {
							return true;
						}
					}
				} else {
					return false;
				}
				if (cl == Class ? o.__name__ != null : false) {
					return true;
				}
				if (cl == Enum ? o.__ename__ != null : false) {
					return true;
				}
				return false;
		}
	};
	js_Boot.__downcastCheck = function (o, cl) {
		if (!((o) instanceof cl)) {
			if (cl.__isInterface__) {
				return js_Boot.__interfLoop(js_Boot.getClass(o), cl);
			} else {
				return false;
			}
		} else {
			return true;
		}
	};
	js_Boot.__cast = function (o, t) {
		if (o == null || js_Boot.__instanceof(o, t)) {
			return o;
		} else {
			throw haxe_Exception.thrown("Cannot cast " + Std.string(o) + " to " + Std.string(t));
		}
	};
	js_Boot.__nativeClassName = function (o) {
		var name = js_Boot.__toStr.call(o).slice(8, -1);
		if (name == "Object" || name == "Function" || name == "Math" || name == "JSON") {
			return null;
		}
		return name;
	};
	js_Boot.__isNativeObj = function (o) {
		return js_Boot.__nativeClassName(o) != null;
	};
	js_Boot.__resolveNativeClass = function (name) {
		return $global[name];
	};
	var sequent_core_ILanugage = function () { };
	sequent_core_ILanugage.__name__ = true;
	sequent_core_ILanugage.__isInterface__ = true;
	sequent_core_ILanugage.prototype = {
		__class__: sequent_core_ILanugage
	};
	var sequent_calculi_g3cp_ClassicalLanguage = function () {
		this.IF = ">";
		this.OR = "|";
		this.AND = "&";
		this.falsum = "f";
		this.operators = "&|>";
		this.seperator = ",";
	};
	sequent_calculi_g3cp_ClassicalLanguage.__name__ = true;
	sequent_calculi_g3cp_ClassicalLanguage.__interfaces__ = [sequent_core_ILanugage];
	sequent_calculi_g3cp_ClassicalLanguage.prototype = {
		__class__: sequent_calculi_g3cp_ClassicalLanguage
	};
	var sequent_calculi_g3cp_G3cp = function () {
	};
	sequent_calculi_g3cp_G3cp.__name__ = true;
	sequent_calculi_g3cp_G3cp.prototype = {
		proofSearch: function (seq) {
			if (this.isAbsurd(seq) || this.isAxiom(seq)) {
				//console.log("src/sequent/calculi/g3cp/G3cp.hx:20:","is axiom or absurd");
				//console.log("src/sequent/calculi/g3cp/G3cp.hx:21:",Std.string(seq) + "");
				return true;
			}
			var ant = seq.antecedent;
			var succ = seq.succedent;
			//console.log("src/sequent/calculi/g3cp/G3cp.hx:28:",Std.string(seq) + " p:");
			var _g = new haxe_iterators_MapKeyValueIterator(ant);
			while (_g.hasNext()) {
				var _g1 = _g.next();
				var c = _g1.key;
				var value = _g1.value;
				if (c.connective == sequent_core_Wff.LANGUAGE.AND) {
					var newSequent = this.leftAND(seq, c);
					seq.childs.unshift(newSequent);
					this.proofSearch(newSequent);
				}
				if (c.connective == sequent_core_Wff.LANGUAGE.OR) {
					var newSequents = this.leftOR(seq, c);
					seq.childs.unshift(newSequents);
					this.proofSearch(newSequents[0]);
					this.proofSearch(newSequents[1]);
				}
				if (c.connective == sequent_core_Wff.LANGUAGE.IF) {
					var newSequents1 = this.leftIF(seq, c);
					seq.childs.unshift(newSequents1);
					this.proofSearch(newSequents1[0]);
					this.proofSearch(newSequents1[1]);
				}
			}
			var _g = new haxe_iterators_MapKeyValueIterator(succ);
			while (_g.hasNext()) {
				var _g1 = _g.next();
				var c = _g1.key;
				var value = _g1.value;
				if (c.connective == sequent_core_Wff.LANGUAGE.AND) {
					var newSequents = this.rightAND(seq, c);
					seq.childs.unshift(newSequents);
					this.proofSearch(newSequents[0]);
					this.proofSearch(newSequents[1]);
				}
				if (c.connective == sequent_core_Wff.LANGUAGE.OR) {
					var newSequent = this.rightOR(seq, c);
					seq.childs.unshift(newSequent);
					this.proofSearch(newSequent);
				}
				if (c.connective == sequent_core_Wff.LANGUAGE.IF) {
					var newSequent1 = this.rightIF(seq, c);
					seq.childs.unshift(newSequent1);
					this.proofSearch(newSequent1);
				}
			}
			return false;
		}
		, getProofTree: function (seq) {
			if (seq.childs.length == 0) {
				if (this.isAxiom(seq) || this.isAbsurd(seq)) {
					return seq.toString();
				}
				return null;
			}
			var childs = seq.childs;
			var _g = 0;
			var _g1 = seq.childs.length;
			while (_g < _g1) {
				var i = _g++;
				var c = seq.childs[i];
				var bot = "{" + seq.toString() + "}";
				if (((c) instanceof Array)) {
					var l = c[0];
					var r = c[1];
					if (this.getProofTree(l) != null && this.getProofTree(r) != null) {
						return "\\frac{" + this.getProofTree(l) + "\\hspace{1cm}" + this.getProofTree(r) + "}" + bot + seq.rules[i];
					}
				} else if (this.getProofTree(c) != null) {
					return "\\frac{" + this.getProofTree(c) + "}" + bot + seq.rules[i];
				}
			}
			return null;
		}
		, toFrac: function (s) {
			if (s.childs.length == 0) {
				return s.toString();
			}
			var c = s.childs[0];
			var bot = "{" + s.toString() + "}";
			if (((c) instanceof Array)) {
				var l = c[0];
				var r = c[1];
				return "\\frac{" + this.toFrac(l) + "\\hspace{1cm}" + this.toFrac(r) + "}" + bot + s.rules[0];
			}
			return "\\frac{" + this.toFrac(c) + "}" + bot + s.rules[0];
		}
		, isAxiom: function (seq) {
			var _this = sequent_core_collection_Multiset.toArray(seq.antecedent);
			var result = new Array(_this.length);
			var _g = 0;
			var _g1 = _this.length;
			while (_g < _g1) {
				var i = _g++;
				result[i] = _this[i].literal;
			}
			var ant = result;
			var _this = sequent_core_collection_Multiset.toArray(seq.succedent);
			var result = new Array(_this.length);
			var _g = 0;
			var _g1 = _this.length;
			while (_g < _g1) {
				var i = _g++;
				result[i] = _this[i].literal;
			}
			var succ = result;
			var _g = 0;
			while (_g < ant.length) {
				var i = ant[_g];
				++_g;
				if (succ.indexOf(i) > -1) {
					return true;
				}
			}
			return false;
		}
		, isAbsurd: function (seq) {
			var _this = sequent_core_collection_Multiset.toArray(seq.antecedent);
			var result = new Array(_this.length);
			var _g = 0;
			var _g1 = _this.length;
			while (_g < _g1) {
				var i = _g++;
				result[i] = _this[i].literal;
			}
			return result.indexOf(sequent_core_Wff.LANGUAGE.falsum) > -1;
		}
		, leftAND: function (seq, wff) {
			seq.rules.unshift("L&");
			var antecedent = sequent_core_collection_Multiset.clone(seq.antecedent);
			sequent_core_collection_Multiset.delete(antecedent, wff);
			sequent_core_collection_Multiset.add(antecedent, wff.left);
			sequent_core_collection_Multiset.add(antecedent, wff.right);
			return new sequent_core_Sequent(antecedent, seq.succedent);
		}
		, rightAND: function (seq, wff) {
			seq.rules.unshift("R&");
			var rightSuccedent = sequent_core_collection_Multiset.clone(seq.succedent);
			sequent_core_collection_Multiset.delete(rightSuccedent, wff);
			var leftSuccedent = sequent_core_collection_Multiset.clone(rightSuccedent);
			sequent_core_collection_Multiset.add(leftSuccedent, wff.left);
			sequent_core_collection_Multiset.add(rightSuccedent, wff.right);
			var leftSequent = new sequent_core_Sequent(seq.antecedent, leftSuccedent);
			var rightSequent = new sequent_core_Sequent(seq.antecedent, rightSuccedent);
			return [leftSequent, rightSequent];
		}
		, rightOR: function (seq, wff) {
			seq.rules.unshift("R|");
			var succedent = sequent_core_collection_Multiset.clone(seq.succedent);
			sequent_core_collection_Multiset.delete(succedent, wff);
			sequent_core_collection_Multiset.add(succedent, wff.left);
			sequent_core_collection_Multiset.add(succedent, wff.right);
			return new sequent_core_Sequent(seq.antecedent, succedent);
		}
		, leftOR: function (seq, wff) {
			seq.rules.unshift("L|");
			var rightAntecedent = sequent_core_collection_Multiset.clone(seq.antecedent);
			sequent_core_collection_Multiset.delete(rightAntecedent, wff);
			var leftAntecedent = sequent_core_collection_Multiset.clone(rightAntecedent);
			sequent_core_collection_Multiset.add(leftAntecedent, wff.left);
			sequent_core_collection_Multiset.add(rightAntecedent, wff.right);
			var leftSequent = new sequent_core_Sequent(leftAntecedent, seq.succedent);
			var rightSequent = new sequent_core_Sequent(rightAntecedent, seq.succedent);
			return [leftSequent, rightSequent];
		}
		, leftIF: function (seq, wff) {
			seq.rules.unshift("L>");
			var leftSuccedent = sequent_core_collection_Multiset.clone(seq.succedent);
			sequent_core_collection_Multiset.add(leftSuccedent, wff.left);
			var rightAntecedent = sequent_core_collection_Multiset.clone(seq.antecedent);
			sequent_core_collection_Multiset.delete(rightAntecedent, wff);
			var leftAntecdent = sequent_core_collection_Multiset.clone(rightAntecedent);
			sequent_core_collection_Multiset.add(rightAntecedent, wff.right);
			var leftSequent = new sequent_core_Sequent(leftAntecdent, leftSuccedent);
			var rightSequent = new sequent_core_Sequent(rightAntecedent, seq.succedent);
			return [leftSequent, rightSequent];
		}
		, rightIF: function (seq, wff) {
			seq.rules.unshift("R>");
			var antecedent = sequent_core_collection_Multiset.clone(seq.antecedent);
			sequent_core_collection_Multiset.add(antecedent, wff.left);
			var succedent = sequent_core_collection_Multiset.clone(seq.succedent);
			sequent_core_collection_Multiset.delete(succedent, wff);
			sequent_core_collection_Multiset.add(succedent, wff.right);
			return new sequent_core_Sequent(antecedent, succedent);
		}
		, __class__: sequent_calculi_g3cp_G3cp
	};
	var sequent_calculi_g4ip_G4ip = function () {
		sequent_calculi_g3cp_G3cp.call(this);
	};
	sequent_calculi_g4ip_G4ip.__name__ = true;
	sequent_calculi_g4ip_G4ip.__super__ = sequent_calculi_g3cp_G3cp;
	sequent_calculi_g4ip_G4ip.prototype = $extend(sequent_calculi_g3cp_G3cp.prototype, {
		proofSearch: function (seq) {
			if (this.isAbsurd(seq) || this.isAxiom(seq)) {
				/* 	console.log("src/sequent/calculi/g4ip/G4ip.hx:23:","is axiom or absurd");
					console.log("src/sequent/calculi/g4ip/G4ip.hx:24:",Std.string(seq) + ""); */
				return true;
			}
			var ant = seq.antecedent;
			var succ = seq.succedent;
			/* 	console.log("src/sequent/calculi/g4ip/G4ip.hx:31:",Std.string(seq) + " p:"); */
			var _g = new haxe_iterators_MapKeyValueIterator(ant);
			while (_g.hasNext()) {
				var _g1 = _g.next();
				var c = _g1.key;
				var value = _g1.value;
				if (c.connective == sequent_core_Wff.LANGUAGE.AND) {
					var newSequent = this.leftAND(seq, c);
					seq.childs.unshift(newSequent);
					this.proofSearch(newSequent);
				}
				if (c.connective == sequent_core_Wff.LANGUAGE.OR) {
					var newSequents = this.leftOR(seq, c);
					seq.childs.unshift(newSequents);
					this.proofSearch(newSequents[0]);
					this.proofSearch(newSequents[1]);
				}
				if (c.connective == sequent_core_Wff.LANGUAGE.IF) {
					if (c.left.connective == "|") {
						var newSequent1 = this.leftIFOR(seq, c);
						seq.childs.unshift(newSequent1);
						this.proofSearch(newSequent1);
					}
					var _this = sequent_core_collection_Multiset.toArray(seq.antecedent);
					var result = new Array(_this.length);
					var _g2 = 0;
					var _g3 = _this.length;
					while (_g2 < _g3) {
						var i = _g2++;
						result[i] = _this[i].literal;
					}
					if (result.indexOf(c.left.literal) > -1) {
						var newSequent2 = this.leftIF0(seq, c);
						seq.childs.unshift(newSequent2);
						this.proofSearch(newSequent2);
					}
					if (c.left.connective == ">") {
						var newSequents1 = this.leftIFIF(seq, c);
						seq.childs.unshift(newSequents1);
						this.proofSearch(newSequents1[0]);
						this.proofSearch(newSequents1[1]);
					}
					if (c.left.connective == "&") {
						var newSequent3 = this.leftIFAND(seq, c);
						seq.childs.unshift(newSequent3);
						this.proofSearch(newSequent3);
					}
				}
			}
			var _g = new haxe_iterators_MapKeyValueIterator(succ);
			while (_g.hasNext()) {
				var _g1 = _g.next();
				var c = _g1.key;
				var value = _g1.value;
				if (c.connective == sequent_core_Wff.LANGUAGE.AND) {
					var newSequents = this.rightAND(seq, c);
					seq.childs.unshift(newSequents);
					this.proofSearch(newSequents[0]);
					this.proofSearch(newSequents[1]);
				}
				if (c.connective == sequent_core_Wff.LANGUAGE.OR) {
					var newSequent = this.rightOR1(seq, c);
					seq.childs.unshift(newSequent);
					if (this.proofSearch(newSequent)) {
						return true;
					}
					var newSequent2 = this.rightOR2(seq, c);
					seq.childs.unshift(newSequent2);
					if (this.proofSearch(newSequent2)) {
						return true;
					}
				}
				if (c.connective == sequent_core_Wff.LANGUAGE.IF) {
					var newSequent1 = this.rightIF(seq, c);
					seq.childs.unshift(newSequent1);
					this.proofSearch(newSequent1);
				}
			}
			return false;
		}
		, leftIFOR: function (seq, wff) {
			seq.rules.unshift("L>|");
			var f = wff;
			var o = "(" + f.left.left.literal + ">" + f.right.literal + ")";
			var g = "(" + f.left.right.literal + ">" + f.right.literal + ")";
			var _1 = new sequent_core_Wff(o);
			var _2 = new sequent_core_Wff(g);
			_1.evaulate();
			_2.evaulate();
			var antecedent = sequent_core_collection_Multiset.clone(seq.antecedent);
			sequent_core_collection_Multiset.delete(antecedent, wff);
			sequent_core_collection_Multiset.add(antecedent, _2);
			sequent_core_collection_Multiset.add(antecedent, _1);
			var newSequent = new sequent_core_Sequent(antecedent, seq.succedent);
			return newSequent;
		}
		, leftIFAND: function (seq, wff) {
			seq.rules.unshift("L>&");
			var f = wff;
			var o = "(" + f.left.left.literal + ">(" + f.left.right.literal + ">" + f.right.literal + "))";
			var _1 = new sequent_core_Wff(o);
			_1.evaulate();
			var antecedent = sequent_core_collection_Multiset.clone(seq.antecedent);
			sequent_core_collection_Multiset.delete(antecedent, wff);
			sequent_core_collection_Multiset.add(antecedent, _1);
			var newSequent = new sequent_core_Sequent(antecedent, seq.succedent);
			return newSequent;
		}
		, leftIF0: function (seq, wff) {
			seq.rules.unshift("L0>");
			var antecedent = sequent_core_collection_Multiset.clone(seq.antecedent);
			sequent_core_collection_Multiset.delete(antecedent, wff);
			sequent_core_collection_Multiset.add(antecedent, wff.right);
			var newSequent = new sequent_core_Sequent(antecedent, seq.succedent);
			return newSequent;
		}
		, leftIFIF: function (seq, wff) {
			seq.rules.unshift("L>>");
			var f = wff;
			var o = "(" + f.left.right.literal + ">" + f.right.literal + ")";
			var _1 = new sequent_core_Wff(o);
			_1.evaulate();
			var antecedent = sequent_core_collection_Multiset.clone(seq.antecedent);
			sequent_core_collection_Multiset.delete(antecedent, wff);
			var lseq = sequent_core_collection_Multiset.clone(antecedent);
			sequent_core_collection_Multiset.add(antecedent, f.right);
			sequent_core_collection_Multiset.add(lseq, f.left.left);
			sequent_core_collection_Multiset.add(lseq, _1);
			var sr = new sequent_core_Sequent(antecedent, seq.succedent);
			var multiseq = sequent_core_collection_Multiset.fromWffArray([f.left.right]);
			var sl = new sequent_core_Sequent(lseq, multiseq);
			return [sl, sr];
		}
		, rightOR1: function (seq, wff) {
			seq.rules.unshift("R|1");
			var succedent = sequent_core_collection_Multiset.clone(seq.succedent);
			sequent_core_collection_Multiset.delete(succedent, wff);
			sequent_core_collection_Multiset.add(succedent, wff.left);
			return new sequent_core_Sequent(seq.antecedent, succedent);
		}
		, rightOR2: function (seq, wff) {
			seq.rules.unshift("R|2");
			var succedent = sequent_core_collection_Multiset.clone(seq.succedent);
			sequent_core_collection_Multiset.delete(succedent, wff);
			sequent_core_collection_Multiset.add(succedent, wff.right);
			return new sequent_core_Sequent(seq.antecedent, succedent);
		}
		, __class__: sequent_calculi_g4ip_G4ip
	});
	var sequent_core_Latex = function () {
	};
	sequent_core_Latex.__name__ = true;
	sequent_core_Latex.toLatex = function (x) {
		var _this_r = new RegExp("&", "g".split("u").join(""));
		var a = x.replace(_this_r, "\\land ");
		var _this_r = new RegExp("\\|", "g".split("u").join(""));
		a = a.replace(_this_r, "\\lor ");
		var _this_r = new RegExp("&", "g".split("u").join(""));
		a = a.replace(_this_r, "*");
		var _this_r = new RegExp("\\(([A-Z]|[a-z])\\)", "g".split("u").join(""));
		a = a.replace(_this_r, "$1");
		var _this_r = new RegExp("=>", "g".split("u").join(""));
		a = a.replace(_this_r, "\\hspace{.1cm}\\vdash ");
		var _this_r = new RegExp(">", "g".split("u").join(""));
		a = a.replace(_this_r, "\\supset ");
		var _this_r = new RegExp("f([^r])", "g".split("u").join(""));
		a = a.replace(_this_r, "\\bot $1");
		return a;
	};
	sequent_core_Latex.prototype = {
		__class__: sequent_core_Latex
	};
	var sequent_core_Sequent = function (left, right) {
		this.antecedent = left;
		this.succedent = right;
		this.childs = [];
		this.rules = [];
	};
	sequent_core_Sequent.__name__ = true;
	sequent_core_Sequent.prototype = {
		toString: function () {
			return (this.antecedent == null ? "null" : sequent_core_collection_Multiset.toString(this.antecedent)) + "=>" + (this.succedent == null ? "null" : sequent_core_collection_Multiset.toString(this.succedent));
		}
		, __class__: sequent_core_Sequent
	};
	var sequent_core_Wff = function (str) {
		this.right = null;
		this.left = null;
		this.parent = null;
		this.literal = str;
	};
	sequent_core_Wff.__name__ = true;
	sequent_core_Wff.hasEqualParentheses = function (s) {
		var left = new EReg("\\)", "g");
		var right = new EReg("\\(", "g");
		var leftCount = 0;
		var rightCount = 0;
		var leftMatch = left.match(s);
		var rightMatch = right.match(s);
		left.map(s, function (o) {
			leftCount += 1;
			return "";
		});
		right.map(s, function (o) {
			rightCount += 1;
			return "";
		});
		if (!(leftMatch && rightMatch && leftCount == rightCount)) {
			if (!leftMatch) {
				return !rightMatch;
			} else {
				return false;
			}
		} else {
			return true;
		}
	};
	sequent_core_Wff.parse = function (str, wff) {
		if (str.length <= 1) {
			return false;
		}
		str = str.substring(1, str.length - 1);
		var _g = 0;
		var _g1 = str.length;
		while (_g < _g1) {
			var i = _g++;
			var c = str.charAt(i);
			if (sequent_core_Wff.LANGUAGE.operators.indexOf(c) > -1) {
				var l = str.substring(0, i);
				var r = str.substring(i + 1, str.length);
				if (sequent_core_Wff.hasEqualParentheses(l) && sequent_core_Wff.hasEqualParentheses(r)) {
					var left = new sequent_core_Wff(l);
					var right = new sequent_core_Wff(r);
					left.parent = wff;
					right.parent = wff;
					wff.left = left;
					wff.right = right;
					wff.connective = c;
					sequent_core_Wff.parse(l, left);
					sequent_core_Wff.parse(r, right);
				}
			}
		}
		return true;
	};
	sequent_core_Wff.prototype = {
		evaulate: function () {
			sequent_core_Wff.parse(this.literal, this);
		}
		, toString: function () {
			return this.literal;
		}
		, isWff: function (wff) {
			if (wff.left == null || wff.right == null) {
				if (wff.literal.length == 0) {
					return false;
				}
				var _g = 0;
				var _g1 = sequent_core_Wff.LANGUAGE.operators.length;
				while (_g < _g1) {
					var i = _g++;
					var o = sequent_core_Wff.LANGUAGE.operators.charAt(i);
					if (wff.literal.indexOf(o) > -1) {
						return false;
					}
				}
				return true;
			}
			if (this.isWff(wff.left)) {
				return this.isWff(wff.right);
			} else {
				return false;
			}
		}
		, isCorrect: function () {
			return this.isWff(this);
		}
		, __class__: sequent_core_Wff
	};
	var sequent_core_collection_Multiset = {};
	sequent_core_collection_Multiset._new = function (map) {
		var this1 = map;
		return this1;
	};
	sequent_core_collection_Multiset.fromArray = function (s) {
		var map = new haxe_ds_IntMap();
		var i = $getIterator(s);
		while (i.hasNext()) {
			var i1 = i.next();
			if (map.h.hasOwnProperty(i1)) {
				map.h[i1] += 1;
			} else {
				map.h[i1] = 1;
			}
		}
		var this1 = map;
		return this1;
	};
	sequent_core_collection_Multiset.fromWffArray = function (s) {
		var map = new haxe_ds_ObjectMap();
		var i = $getIterator(s);
		while (i.hasNext()) {
			var i1 = i.next();
			if (map.h.__keys__[i1.__id__] != null) {
				map.set(i1, map.h[i1.__id__] + 1);
			} else {
				i1.evaulate();
				map.set(i1, 1);
			}
		}
		var this1 = map;
		return this1;
	};
	sequent_core_collection_Multiset.toArray = function (this1) {
		var arr = [];
		var k = this1.keys();
		while (k.hasNext()) {
			var k1 = k.next();
			var _g = 0;
			var _g1 = this1.get(k1);
			while (_g < _g1) {
				var i = _g++;
				arr.push(k1);
			}
		}
		return arr;
	};
	sequent_core_collection_Multiset.clone = function (this1) {
		var this2 = this1.copy();
		return this2;
	};
	sequent_core_collection_Multiset.add = function (this1, t) {
		var k = this1.get(t);
		if (k >= 1) {
			this1.set(t, k + 1);
		} else {
			this1.set(t, 1);
		}
	};
	sequent_core_collection_Multiset.delete = function (this1, t) {
		var k = this1.get(t);
		if (k > 1) {
			this1.set(t, k - 1);
		}
		if (k == 1) {
			this1.remove(t);
		}
	};
	sequent_core_collection_Multiset.toString = function (this1) {
		return "" + sequent_core_collection_Multiset.toArray(this1).toString() + "";
	};
	var sequent_core_collection_Set = {};
	sequent_core_collection_Set._new = function (map) {
		var this1 = map;
		return this1;
	};
	sequent_core_collection_Set.fromArray = function (s) {
		var map = new haxe_ds_IntMap();
		var i = $getIterator(s);
		while (i.hasNext()) {
			var i1 = i.next();
			map.h[i1] = true;
		}
		var this1 = map;
		return this1;
	};
	sequent_core_collection_Set.contains = function (this1, s) {
		return this1.exists(s);
	};
	sequent_core_collection_Set.toString = function (this1) {
		return "{" + sequent_core_collection_Set.toArray(this1).join(", ") + "}";
	};
	sequent_core_collection_Set.toArray = function (this1) {
		var arr = [];
		var k = this1.keys();
		while (k.hasNext()) {
			var k1 = k.next();
			arr.push(k1);
		}
		return arr;
	};
	function $getIterator(o) { if (o instanceof Array) return new haxe_iterators_ArrayIterator(o); else return o.iterator(); }
	$global.$haxeUID |= 0;
	if (typeof (performance) != "undefined" ? typeof (performance.now) == "function" : false) {
		HxOverrides.now = performance.now.bind(performance);
	}
	String.prototype.__class__ = String;
	String.__name__ = true;
	Array.__name__ = true;
	var Int = {};
	var Dynamic = {};
	var Float = Number;
	var Bool = Boolean;
	var Class = {};
	var Enum = {};
	haxe_ds_ObjectMap.count = 0;
	js_Boot.__toStr = ({}).toString;
	Main.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
