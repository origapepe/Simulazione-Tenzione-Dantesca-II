let pEstr = document.getElementById("pEstr");
let ps = [];
let pinfo = document.getElementById("info");
let n = undefined;
let show = false;
let nInfo = 0;
let msg = [
"Premere invio per vedere le 3 terzine successive",
"Premere invio per estrarre una nuova terzina"
];
let c = 1; // canto

let players = [];
let points = [];
let pIndex = -1;
let pMax;

var data = prompt("Inserire giocatori \n(saparati da uno spazio)");
data=data.split(' ');
players=data;
for(let i = 0; i < players.length; i++)points[i]=0;

pMax = parseInt(prompt("A quanti punti si arriva?"));

for(let i = 0; i < 4; i++){
	ps.push(document.getElementById("p"+i));
}

function estrazione(){
	n = Math.floor(Math.random()*(arr[c].length-3));
	p0.innerHTML = arr[c][n];	
	pEstr.innerHTML = "Terzina Estratta (n. "+(n+1)+")";
	for(let i = 1; i < 4; i++){
		ps[i].innerHTML="";
	}
}

function seguenti(){
	for(let i = 0; i < 4; i++){
		if(arr[c][i+n])ps[i].innerHTML=arr[c][n+i];
	}
	pIndex++;
}

function run(){
	if(show){
		show=false;
		seguenti();
		clock=maxT;
		clearInterval(inter);
	}else{
		show=true;
		estrazione();
		inter = setInterval(Clock,1000);
	}

	pinfo.innerHTML=msg[nInfo];
	nInfo=(nInfo+1)%msg.length;
}

document.onkeypress = function(e){
	if(e.code=="Enter"){
		run();
		alpha=1;
	}
}

document.addEventListener("touchstart", run);
document.addEventListener("ontouchstart", run);

console.log("Totale versi imparati: "+3*arr[c].length);

//https://origapepe.github.io/Simulazione-Tenzone-Dantesca/
//full screen: f11