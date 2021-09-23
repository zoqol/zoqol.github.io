const { Panel,Knob, Button, Canvas, HBox, Toggle, Defaults, Dropdown, Label,Window } = mc2;
const holder=document.querySelector('#holder');

const win = new Window(document.body, "Window", 480, 20, 485, 100);


for( [i,r] of Globals.R.entries()){
    console.log(r,i)
    var perc=r*100;
    const f1 = new Knob(win,
        10+i*480/8, 10, "", r*100, 0, 100,render);
        f1.index=i;
        
}

  function render(v){
     
      
      Globals.R[v.target.index]=v.detail/100;
  }