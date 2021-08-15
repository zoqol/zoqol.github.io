/**
 * Created by ZoQol on 12/31/2014.
 */
const N=10;
const X=2;
const dopi=Math.PI*2;
const f=3;
 Easing={
      linear:{
        eIn:function (i,T,x0,dt,dn){
            return dt * i * T + x0;
        }
      }
     ,x2:{
         eIn:function (i,T,x0,dt,dn){
             var x = i * T;
             var fx = x * x;
             return dt * fx + x0;
         }
         ,eOut:function (i,T,x0,dt,dn){
             var x = i * T;
             var fx = 1 - (x -= 1) * x;
             return dt * fx + x0;
         },
         eInOut:function (i,T,x0,dt,dn){
             var x = i * (T * 2);
             if (x < 1) return dt * (x * x) * .5 + x0;
             else {
                 x -= 1;
                 return dt * ((1 - (x -= 1) * x) * .5 + .5)+ x0;
             }

         }
     }
     ,x3:{
         eIn:function (i,T,x0,dt,dn){
             var x = i * T;
             var fx = x * x * x;
             return dt * fx + x0;
         }
         ,eOut:function (i,T,x0,dt,dn){
             var x = i * T;
             var fx = 1 + (x -= 1) * x * x;
             return dt * fx + x0;
         },
         eInOut:function (i,T,x0,dt,dn){
             var x = i * (T * 2);
             if (x < 1) return dt * (x * x * x) * .5 + x0;
             else {
                 x -= 1;
                 return dt * ((1 + (x -= 1) * x * x) * .5 + .5)+ x0;
             }

         }
     }
     ,x4:{
         eIn:function (i,T,x0,dt,dn){
             var x = i * T;
             var fx = x * x * x * x;
             return dt * fx + x0;
         }
         ,eOut:function (i,T,x0,dt,dn){
             var x = i * T;
             var fx = 1 - (x -= 1) * x * x * x;
             return dt * fx + x0;
         },
         eInOut:function (i,T,x0,dt,dn){
             var x = i * (T * 2);
             if (x < 1) return dt * (x * x * x * x) * .5 + x0;
             else {
                 x -= 1;
                 return dt * ((1 - (x -= 1) * x * x * x) * .5 + .5) + x0;
             }

         }
     }
     ,x5:{
         eIn:function (i,T,x0,dt,dn){
             var x = i * T;
             var fx = x * x * x * x * x;
             return dt * fx + x0;
         }
         ,eOut:function (i,T,x0,dt,dn){
             var x = i * T;
             var fx = 1 + (x -= 1) * x * x * x * x;
             return dt * fx + x0;
         },
         eInOut:function (i,T,x0,dt,dn){
             var x = i * (T * 2);
             if (x < 1) return dt * (x * x * x * x * x) * .5 + x0;
             else {
                 x -= 1;
                 return dt * ((1 + (x -= 1) * x * x * x * x) * .5 + .5) + x0;
             }

         }
     },
     back:{
         eIn:function (i,T,x0,dt,dn){
             var sf = (dn)?dn.sf:1.5;
             var x = i * T;
             var fx = x * x * ((sf + 1) * x - sf);
             return dt * fx + x0;
         }
         ,eOut:function (i,T,x0,dt,dn){
             var sf = (dn)?dn.sf:1.5;
             var x =i * T;
             x = 1 - x;
             var fx = 1-x * x * ((sf+1)*x-sf);
             return dt * fx + x0;
         },
         eInOut:function (i,T,x0,dt,dn){
             var sf = (dn)?dn.sf:1.5;
             var x = i * (T * 2);
             if (x < 1) return dt * (x * x * ((sf+1)*x-sf)) * .5 + x0;
             else {
                 //x -= 1;
                 x = 2 - x;
                 return dt * ((1-x * x * ((sf+1)*x-sf)) * .5 + .5)+ x0;
             }
         }
     }
     ,expo:{
         eIn:function (i,T,x0,dt,dn){
             var x = i * T;
             var fx = Math.pow(2,(x-1)*N);
             return dt * fx + x0;
         }
         ,eOut:function (i,T,x0,dt,dn){
             var x = i * T;
             var fx = 1 - Math.pow(2,-x*N);
             return dt * fx + x0;
         },
         eInOut:function (i,T,x0,dt,dn){
             var x = i * (T * 2);
             if (x < 1) return dt * (Math.pow(2,(x-1)*N)) * .5 + x0;
             else {
                 x -= 1;
                 return dt * ((1 - Math.pow(2,-x*N)) * .5 + .5) + x0;
             }
         }
     }
     ,elastic:{
         eIn:function (i,T,x0,dt,dn){
             var x = i * T;

             x -= 1;
             var cx = Math.sin(x * f * dopi) / (x * f * dopi);
             if (isNaN(cx)) cx=1;
             var fx = cx;
             return dt * fx + x0;
         },
         eIn2:function (i,T,x0,dt,dn){
             var n = f;
             var x = i * T;
             x -= 1;
             var t = 1 - (1 / (n*2));
             var cx = Math.sin(x * f * dopi) / (x * f * dopi);
             if (isNaN(cx)) cx=1;
             var fx = cx;
             if ((x += 1) >= t) {var gx = 2 * n * x - 2 * n + 1;fx = gx; }
             return dt * fx + x0;
         }
         ,eOut:function (i,T,x0,dt,dn){
             var x = i * T;
             var cx = Math.sin(x * f * dopi) / (x * f * dopi);
             if (isNaN(cx)) cx=1;
             var fx = -cx+1;
             return dt * fx + x0;
         },
         eInOut:function (i,T,x0,dt,dn){
             var x = i * (T * 2);

             if (x < 1) {
                 x -= 1;
                 var cx = Math.sin(x * f * dopi) / (x * f * dopi);
                 if (isNaN(cx)) cx=1;
                 var fx = cx*.5;
                 return dt * fx + x0;

             }
             else {
                 x -= 1;
                 var cx = Math.sin(x * f * dopi) / (x * f * dopi);
                 if (isNaN(cx)) cx=1;
                 var fx = (-cx+1)*.5+.5;
                 return dt * fx + x0;
             }
         }
     },
     circ:{
         eIn:function (i,T,x0,dt,dn){
             var x = i * T;
             var fx =1-Math.sqrt(1-(x*x));
             return dt * fx + x0;
         }
         ,eOut:function (i,T,x0,dt,dn){
             var x = i * T;
             x -= 1;
             var fx =Math.sqrt(1-(x*x));
             return dt * fx + x0;
         },
         eInOut:function (i,T,x0,dt,dn){
             var x = i * (T * 2);
             if (x < 1) return dt * (1-Math.sqrt(1-(x*x))) * .5 + x0;
             else {
                 x -= 2;
                 return dt * ((Math.sqrt(1-(x*x))) * .5 + .5) + x0;
             }
         }
     }


};
TwableObj=function (obj,props,duration,ease,onFinish,onUpdate,easeProps){

    this.obj=obj;
    this.T=duration;
    this.t=this.T+1;
    var invT=1/this.T;
    this.isEnable=false;
    this.isPaused=false;
    this.onFinish=onFinish;
    this.onUpdate=onUpdate;
    this.props=props;
    this.eProps=easeProps;
    if(ease==null) ease= Easing.linear.eIn;
    this.ease=ease;
    this.oth={};
    for (var i in this.props){

        var x0=obj[i];
         //x0=parseFloat(x0);
      //  console.log(x0);
        var delt=this.props[i]-x0;
        this.oth[i]={delta:delt,x0:x0}
    }

    this.start=function (){

        this.isEnable=true;
        this.isPaused=false;
        this.t=0;
    }
    this.stop=function (){

        this.t=this.T+1;

    }
    this.pause=function(){

        this.isPaused=true;
    }
    this.play=function(){

        this.isPaused=false;
    }
    var oo={};
    this.setEasing=function (ease){
        if(ease==null) ease=Easing.linear.eIn;
        this.ease=ease;

    };
    this.setProps=function(props){

        this.props=props;
        this.oth={};
        this.stop();
        for (i in props){

            var x0=this.obj[i];
            var delt=this.props[i]-x0;
            this.oth[i]={delta:delt,x0:x0};
        }

    };
    this.addProps=function (props){
        for ( i in props){

            this.props[i]=props[i];
        }
        for (i in this.props){
            var x0=this.obj[i];
            var delt=this.props[i]-x0;
            this.oth[i]={delta:delt,x0:x0};
        }


    }
    this.setT=function (T){
        this.T=T;
        invT=1/T;
    }
    this.update=function (){
        if(this.isPaused) return;
        if(this.t>this.T){
            this.isEnable=false;
            if(this.onFinish!=null) this.onFinish(this);
            return;
        }
        if(this.onUpdate!=null) this.onUpdate(this);

        for (i in this.props){
            var o=this.oth[i];
            var p=this.ease(this.t,invT, o.x0, o.delta,this.eProps);
           // console.log(this.obj[i]);
            this.obj[i]=p;
        }
        this.t++;

    }



}
Twin=(function(){
var map={};
return {
    go: function (id,obj,props,duration,ease,onFinish,onUpdate,easeProps) {
        var tobj;
        if(map[id]!=null){

            tobj=map[id];
            tobj.obj=obj;
            tobj.setProps(props);
            tobj.setEasing(ease);
            tobj.setT(duration);
            tobj.t=0;
            tobj.onFinish=onFinish;
            tobj.onUpdate=onUpdate;

            tobj.start();
        }
        else {
           tobj =new TwableObj(obj,props,duration,ease,onFinish,onUpdate,easeProps);
            map[id]=tobj;
            tobj.start();
        }
    },
    init:function (){
        setInterval(update,10);
    },
    getObject:function (id){

        return map[id];
    }
}
 function update(){
     for(o in map){
         if(map[o].isEnable) map[o].update();
     }

 }
})();
