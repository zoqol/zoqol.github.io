// Generated by Haxe 4.2.1+bf9ff69
(function ($global) { "use strict";
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var Point = function(x,y) {
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	this.y = 0;
	this.x = 0;
	this.x = x;
	this.y = y;
};
Point.__name__ = true;
Point.prototype = {
	__class__: Point
};
var Main = function() {
	this.m = new Point(0,0);
	this.isDown = false;
	var canv = js_Boot.__cast(window.document.getElementById("canv") , HTMLCanvasElement);
	this.ctx = canv.getContext("2d",null);
	this.ps = [];
	this.cs = [];
	Main.w = 800;
	Main.h = 450;
	this.sprms = [];
	var n = 4;
	var r = Main.h;
	var _g = 0;
	var _g1 = n;
	while(_g < _g1) {
		var i = _g++;
		var s = new Esperm();
		var t = i / n * Math.PI * 2;
		var cos = Math.cos(t) * r + Main.w / 2;
		var sin = Math.sin(t) * r + Main.h / 2;
		s.setPos(cos,sin);
		var p = new Point(Main.w / 2 - cos,Main.h / 2 - sin);
		var pMag = Math.sqrt(p.x * p.x + p.y * p.y);
		p.y /= pMag;
		p.x /= pMag;
		var l = 7 + Math.random() * 6;
		p.x *= l;
		p.y *= l;
		s.velocity = new Point(p.x,p.y);
		this.sprms.push(s);
	}
	var nx = 22;
	var _g = 0;
	var _g1 = nx;
	while(_g < _g1) {
		var i = _g++;
		var phi = i / nx * Math.PI * 2 + Math.PI / 2;
		var cs = Math.cos(phi) * 100 + Main.w / 2;
		var si = Math.sin(phi) * 100 + Main.h / 2;
		var o = new Obj(cs,si);
		this.ps.push(o);
	}
	this.objcent = new Obj(Main.w / 2,Main.h / 2);
	var _g = 0;
	var _g1 = this.ps.length;
	while(_g < _g1) {
		var i = _g++;
		var p1 = this.ps[i];
		var p2 = this.ps[(i + 1) % this.ps.length];
		this.cs.push(new Constraint(p1,p2));
		var cso = new Constraint(this.objcent,p1);
		cso.K = .2;
		cso.Damp = .08;
		this.cs.push(cso);
	}
	var cso = new Constraint(this.objcent,this.ps[this.ps.length - 1]);
	cso.K = .25;
	cso.Damp = .07;
	this.cs.push(cso);
	this.ps.push(this.objcent);
	var timer = new haxe_Timer(30);
	timer.run = $bind(this,this.loop);
	canv.addEventListener("pointerdown",$bind(this,this.ond));
};
Main.__name__ = true;
Main.main = function() {
	new Main();
};
Main.prototype = {
	onmov: function(e) {
	}
	,onup: function(e) {
		this.isDown = false;
		this.curentObj = null;
	}
	,ond: function(e) {
		this.addSperm(e.offsetX,e.offsetY);
		this.isDown = true;
	}
	,addSperm: function(x,y) {
		var dxx = x - this.objcent.x.x;
		var dyy = y - this.objcent.x.y;
		var sqrt = dxx * dxx + dyy * dyy;
		if(sqrt < 27200) {
			return;
		}
		var s = new Esperm();
		var m = new Point(x,y);
		var vel = new Point(m.x - this.objcent.x.x,m.y - this.objcent.x.y);
		var mag = -Math.sqrt(vel.x * vel.x + vel.y * vel.y);
		var l = 7 + Math.random() * 5;
		vel.x *= l / mag;
		vel.y *= l / mag;
		s.velocity = vel;
		if(Math.random() > .5) {
			s.speed = .3 + Math.random() * .6;
			s.ample = 3 + Math.random() * 4;
		}
		s.setPos(m.x,m.y);
		this.sprms.push(s);
	}
	,loop: function() {
		var g = this.ctx;
		g.clearRect(0,0,Main.w,Main.h);
		var m = new Point(0,0);
		var tmp = this.isDown;
		g.arc(this.ps[this.ps.length - 1].x.x,this.ps[this.ps.length - 1].x.y,5,0,Math.PI * 2);
		g.beginPath();
		var x;
		var y;
		var _g = 0;
		var _g1 = this.ps.length - 2;
		while(_g < _g1) {
			var i = _g++;
			var p = this.ps[i];
			x = p.x.x;
			y = p.x.y;
			var idx = (i + 1) % (this.ps.length - 1);
			g.bezierCurveTo(x,y,x,y,x + (this.ps[idx].x.x - x) / 2,y + (this.ps[idx].x.y - y) / 2);
		}
		x = this.ps[this.ps.length - 2].x.x;
		y = this.ps[this.ps.length - 2].x.y;
		var idx = 0;
		g.bezierCurveTo(x,y,x,y,x + (this.ps[idx].x.x - x) / 2,y + (this.ps[idx].x.y - y) / 2);
		g.closePath();
		g.fill();
		var _g = 0;
		var _g1 = this.ps.length;
		while(_g < _g1) {
			var i = _g++;
			var p = this.ps[i];
			p.update();
		}
		var _g = 0;
		var _g1 = this.cs.length;
		while(_g < _g1) {
			var i = _g++;
			var c = this.cs[i];
			c.update();
		}
		var _g = 0;
		var _g1 = this.sprms.length;
		while(_g < _g1) {
			var i = _g++;
			var s = this.sprms[i];
			var h = s.tail[s.tail.length - 1];
			var q = this.ps[this.ps.length - 1];
			var dx = h.x - q.x.x;
			var dy = h.y - q.x.y;
			var d = Math.sqrt(dx * dx + dy * dy);
			if(d < 70) {
				s.setPos(-1000,-1000);
				s.velocity = new Point(0,0);
				s.ignore = true;
				console.log("src/Main.hx:261:","fuck");
			}
		}
		var _g = 0;
		var _g1 = this.sprms.length;
		while(_g < _g1) {
			var i = _g++;
			var s = this.sprms[i];
			var h = s.tail[0];
			var _g2 = 0;
			var _g3 = this.ps.length - 1;
			while(_g2 < _g3) {
				var j = _g2++;
				var q = this.ps[j];
				var dx = h.x - q.x.x;
				var dy = h.y - q.x.y;
				var d = Math.sqrt(dx * dx + dy * dy);
				if(d < 15 && s.collided == false) {
					s.collided = true;
					var n = new Point(s.velocity.x,s.velocity.y);
					var nl = Math.sqrt(n.x * n.x + n.y * n.y);
					n.x *= 10 / nl;
					n.y *= 10 / nl;
					s.velocity.x *= 1.5;
					s.velocity.y *= 1.5;
					s.ample *= 2;
					s.speed *= 1.2;
					q.excertF(n);
				}
			}
		}
		var _g = 0;
		var _g1 = this.sprms.length;
		while(_g < _g1) {
			var i = _g++;
			var s = this.sprms[i];
			if(!s.ignore) {
				s.update();
				s.render(g);
			}
		}
	}
	,__class__: Main
};
var Esperm = function() {
	this.ignore = false;
	this.collided = false;
	this.speed = .5;
	this.spermSize = 10;
	this.height = 10;
	this.ample = 3;
	this.angle = 0;
	this.phi = 0;
	this.len = 15;
	this.tail = [];
	this.velocity = new Point();
	var _g = 0;
	var _g1 = this.len;
	while(_g < _g1) {
		var i = _g++;
		this.tail.push(new Point(0,0));
	}
};
Esperm.__name__ = true;
Esperm.prototype = {
	setPos: function(x,y) {
		this.tail[0].x = x;
		this.tail[0].y = y;
	}
	,render: function(g) {
		g.beginPath();
		g.lineWidth = 5;
		g.moveTo(this.tail[1].x,this.tail[1].y);
		g.lineJoin = "round";
		g.lineCap = "round";
		var _g = 2;
		var _g1 = this.tail.length;
		while(_g < _g1) {
			var i = _g++;
			var p = this.tail[i];
			g.lineWidth = 2 * this.tail.length / i;
			g.lineTo(p.x,p.y);
			g.stroke();
		}
		g.closePath();
	}
	,update: function() {
		var head = this.tail[0];
		var mas = this.tail[1];
		this.angle = Math.atan2(this.velocity.y,this.velocity.x) + Math.PI / 2;
		head.x += this.velocity.x;
		head.y += this.velocity.y;
		mas.y = this.height;
		mas.x = Math.cos(this.phi) * this.ample;
		var tt = this.angle;
		var cost = Math.cos(tt);
		var sint = Math.sin(tt);
		var _y = mas.y * cost + mas.x * sint;
		var _x = mas.x * cost - mas.y * sint;
		mas.x = _x + head.x;
		mas.y = _y + head.y;
		this.phi += this.speed;
		var _g = 2;
		var _g1 = this.tail.length;
		while(_g < _g1) {
			var i = _g++;
			var p = this.tail[i];
			var dx = p.x - this.tail[i - 2].x;
			var dy = p.y - this.tail[i - 2].y;
			var d = Math.sqrt(dx * dx + dy * dy);
			p.x = this.tail[i - 1].x + this.spermSize * dx / d;
			p.y = this.tail[i - 1].y + this.spermSize * dy / d;
		}
	}
	,__class__: Esperm
};
var Obj = function(x,y) {
	this.pinned = false;
	this.m = 1.9;
	this.x = new Point(x,y);
	this.v = new Point();
	this.a = new Point();
};
Obj.__name__ = true;
Obj.prototype = {
	update: function() {
		if(this.pinned) {
			this.v.x = this.v.y = 0;
			this.a.x = this.a.y = 0;
		}
		this.v.x += this.a.x;
		this.v.y += this.a.y;
		this.limit();
		this.x.x += this.v.x;
		this.x.y += this.v.y;
		this.a.x = 0;
		this.a.y = 0;
	}
	,excertF: function(f) {
		var fn = new Point(f.x,f.y);
		fn.x *= 1 / this.m;
		fn.y *= 1 / this.m;
		this.a.x += fn.x;
		this.a.y += fn.y;
	}
	,render: function(g) {
		g.lineWidth = 1;
		g.beginPath();
		g.arc(this.x.x,this.x.y,5,0,Math.PI * 2);
		g.closePath();
		g.fill();
	}
	,limit: function() {
		var vl = Math.sqrt(this.v.x * this.v.x + this.v.y * this.v.y);
		if(vl > 20) {
			this.v.x *= 20 / vl;
			this.v.y *= 20 / vl;
		}
		if(this.x.x > Main.w) {
			this.x.x = Main.w;
		}
		if(this.x.x < 0) {
			this.x.x = 0;
			this.v.x *= -1;
		}
		if(this.x.y < 0) {
			this.x.y = 0;
			this.v.y *= -1;
		}
		if(this.x.y > Main.h) {
			this.x.y = Main.h;
			this.v.y *= -1;
		}
	}
	,isClicked: function(p) {
		var q = new Point(p.x - this.x.x,p.y - this.x.y);
		var l = Math.sqrt(q.x * q.x + q.y * q.y);
		if(l < 10) {
			return true;
		}
		return false;
	}
	,__class__: Obj
};
var Constraint = function(p1,p2) {
	this.Damp = .001;
	this.K = .8;
	this.p1 = p1;
	this.p2 = p2;
	var q = new Point(p1.x.x - p2.x.x,p1.x.y - p2.x.y);
	this.len = Math.sqrt(q.x * q.x + q.y * q.y);
};
Constraint.__name__ = true;
Constraint.prototype = {
	render: function(g) {
	}
	,update: function() {
		var s = new Point(this.p2.x.x - this.p1.x.x,this.p2.x.y - this.p1.x.y);
		var clen = Math.sqrt(s.x * s.x + s.y * s.y);
		this.X = clen - this.len;
		var fs = this.K * this.X;
		s.x *= fs / clen;
		s.y *= fs / clen;
		var damping = new Point(this.p2.v.x - this.p1.v.x,this.p2.v.y - this.p1.v.y);
		damping.x *= this.Damp;
		damping.y *= this.Damp;
		this.p1.excertF(s);
		this.p1.excertF(damping);
		s.x *= -1;
		s.y *= -1;
		damping.x *= -1;
		damping.y *= -1;
		this.p2.excertF(s);
		this.p2.excertF(damping);
	}
	,__class__: Constraint
};
Math.__name__ = true;
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
var haxe_Exception = function(message,previous,native) {
	Error.call(this,message);
	this.message = message;
	this.__previousException = previous;
	this.__nativeException = native != null ? native : this;
};
haxe_Exception.__name__ = true;
haxe_Exception.thrown = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value.get_native();
	} else if(((value) instanceof Error)) {
		return value;
	} else {
		var e = new haxe_ValueException(value);
		return e;
	}
};
haxe_Exception.__super__ = Error;
haxe_Exception.prototype = $extend(Error.prototype,{
	get_native: function() {
		return this.__nativeException;
	}
	,__class__: haxe_Exception
});
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe_Timer.__name__ = true;
haxe_Timer.prototype = {
	run: function() {
	}
	,__class__: haxe_Timer
};
var haxe_ValueException = function(value,previous,native) {
	haxe_Exception.call(this,String(value),previous,native);
	this.value = value;
};
haxe_ValueException.__name__ = true;
haxe_ValueException.__super__ = haxe_Exception;
haxe_ValueException.prototype = $extend(haxe_Exception.prototype,{
	__class__: haxe_ValueException
});
var haxe_iterators_ArrayIterator = function(array) {
	this.current = 0;
	this.array = array;
};
haxe_iterators_ArrayIterator.__name__ = true;
haxe_iterators_ArrayIterator.prototype = {
	hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return this.array[this.current++];
	}
	,__class__: haxe_iterators_ArrayIterator
};
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if(o == null) {
		return null;
	} else if(((o) instanceof Array)) {
		return Array;
	} else {
		var cl = o.__class__;
		if(cl != null) {
			return cl;
		}
		var name = js_Boot.__nativeClassName(o);
		if(name != null) {
			return js_Boot.__resolveNativeClass(name);
		}
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(((o) instanceof Array)) {
			var str = "[";
			s += "\t";
			var _g = 0;
			var _g1 = o.length;
			while(_g < _g1) {
				var i = _g++;
				str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( _g ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		var k = null;
		for( k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) {
			str += ", \n";
		}
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
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
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) {
		return false;
	}
	if(cc == cl) {
		return true;
	}
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g = 0;
		var _g1 = intf.length;
		while(_g < _g1) {
			var i = _g++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) {
				return true;
			}
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) {
		return false;
	}
	switch(cl) {
	case Array:
		return ((o) instanceof Array);
	case Bool:
		return typeof(o) == "boolean";
	case Dynamic:
		return o != null;
	case Float:
		return typeof(o) == "number";
	case Int:
		if(typeof(o) == "number") {
			return ((o | 0) === o);
		} else {
			return false;
		}
		break;
	case String:
		return typeof(o) == "string";
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(js_Boot.__downcastCheck(o,cl)) {
					return true;
				}
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(((o) instanceof cl)) {
					return true;
				}
			}
		} else {
			return false;
		}
		if(cl == Class ? o.__name__ != null : false) {
			return true;
		}
		if(cl == Enum ? o.__ename__ != null : false) {
			return true;
		}
		return false;
	}
};
js_Boot.__downcastCheck = function(o,cl) {
	if(!((o) instanceof cl)) {
		if(cl.__isInterface__) {
			return js_Boot.__interfLoop(js_Boot.getClass(o),cl);
		} else {
			return false;
		}
	} else {
		return true;
	}
};
js_Boot.__cast = function(o,t) {
	if(o == null || js_Boot.__instanceof(o,t)) {
		return o;
	} else {
		throw haxe_Exception.thrown("Cannot cast " + Std.string(o) + " to " + Std.string(t));
	}
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") {
		return null;
	}
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
Math.__name__ = true;
var $_;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
var Int = { };
var Dynamic = { };
var Float = Number;
var Bool = Boolean;
var Class = { };
var Enum = { };
js_Boot.__toStr = ({ }).toString;
Main.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
