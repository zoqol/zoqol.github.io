const N1=8;
var ii=0;
var delay=5;
var    vs = [
    { v:0, d:[1, 2, 3, 4, 5, 6, 7, 8] },
    { v:0, d:[1, 2, 3, 4, 5, 6, 7, 8] },
    { v:0, d:[1, 2, 3, 4, 5, 6, 7, 8] },
    { v:0, d:[1, 2, 3, 4, 5, 6, 7, 8] },
    { v:0, d:[1, 2, 3, 4, 5, 6, 7, 8] },
    { v:0, d:[1, 2, 3, 4, 5, 6, 7, 8] },
    { v:0, d:[1, 2, 3, 4, 5, 6, 7, 8] },
    { v:0, d:[1, 2, 3, 4, 5, 6, 7, 8] }];

btn.onclick=function (){
    search2(vs,ii) }

function updateBoard(){
    for(var i=0;i<vs.length;i++){
        var v=vs[i];
        var pq=qs[i];
        pq.setY(ys[v.v-1])
    }
}
 function search2(V,i) {
     var v = V[i];
     ii=i;

     if (v.d.length != 0) {
         v.v = v.d.shift();
         if (isConsistent(v)) {
             if (i == vs.length - 1) {
                 console.log("found");
             }
                else {
                 setTimeout(function () {search2(V, i + 1);}, delay);}
         }
            else {
                 setTimeout(function () {search2(V, i);}, delay);}
     } else {
         v.d = [1, 2, 3, 4, 5, 6, 7, 8];
         v.v = 0;
         setTimeout(function () {search2(V, i - 1);}, delay);
     }
     updateBoard();
 }

function isConsistent(o) {
    var i = vs.indexOf(o);
    var vi = o.v;

    for (var j=0;j<vs.length;j++) {
        if (j == i) continue;
        var vj = vs[j].v;
        if (vj == 0) continue;
        if (vj == vi) return false;
        if (Math.abs(i - j) == Math.abs(vi - vj)) return false;
    }
    return true;
}
