let canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d'),
	width = canvas.width = window.innerWidth,
	height = canvas.height = window.innerHeight,
	stop = false;


let particles = [];
let cols=[];
let timer;
let shoot;
let counter;
let maxT;
let clock;
let alpha;
let inter;


function setup(){
	cols=[["#ee4035",
		"#f37736",
		"#fdf498",
		"#7bc043",
		"#0392cf"],
		["#ff0000",
		"#bf0000",	
		"#800000",	
		"#400000",	
		"#000000"]
		];

		

	timer=0;
	counter=0;
	shoot=false;
	maxT=30;
	clock=maxT;
	alpha=1;

}

function loop(){
	fill(255,255,255,alpha);
	rect(0,0,width, height);

	fill(0,0,0);
	ctx.font='35px Monospace';
	ctx.fillText("Tempo: "+clock, 30,100);
	for(let i = 0; i < players.length; i++){
		ctx.font='30px Monospace';
		if(i==(pIndex%players.length))ctx.font='bold 30px Monospace';
		ctx.fillText(players[i]+" "+points[i], 30, 200+35*i);
	}

	if(points[pIndex%players.length]==pMax-1){
		let text=players[pIndex%players.length]; 
		fill(0,0,0);
		ctx.font='40px Monospace';
		ctx.fillText(text, 110, height/2-30);
		ctx.fillText(text, width-270, height/2-30);
		text="sta per vincere!";
		ctx.fillText(text, 30, height/2+20);
		ctx.fillText(text, width-350, height/2+20);
	}

	if(points[pIndex%players.length]==pMax)fireworks(Infinity);

	for(let i = 0; i < particles.length; i++){
		particles[i].update();
		particles[i].show();

		if(particles[i].over()){
			particles.splice(i,1);
		}
	}

	if(shoot==1)confetti(5);
	if(shoot==2)shame(600);

	timer++;

	if(!stop){
		requestAnimationFrame(loop);
	}

}

function confetti(lim){
	alpha=1;
	if(timer%15==0){
		for(let i = 0; i < 40; i++){
			particles.push(new Particle(0,600,random(9,20),random(10,20)*-1, random(cols[0]),0));
		}
		for(let i = 0; i < 40; i++){
			particles.push(new Particle(width,600,-1*random(9,20),random(10,20)*-1, random(cols[0]),0));
		}

		for(let i = 0; i < 40; i++){
			particles.push(new Particle(0,300,random(7,15),random(10,16)*-1, random(cols[0]),0));
		}

		for(let i = 0; i < 40; i++){
			particles.push(new Particle(width,300,-1*random(7,15),random(10,16)*-1, random(cols[0]),0));
		}
		counter++;
	}
	if(counter>=lim){
		counter=0;
		shoot=0;
	}
}

function fireworks(lim){
	alpha=1;
	for(let i = 0; i < 5; i++){
		particles.push(new Particle(0.17*width,height/2-200,2*random(-10,10),2*random(-10,10), random(cols[0]),0));
	}
	for(let i = 0; i < 5; i++){
		particles.push(new Particle(0.83*width,height/2-200,2*random(-10,10),2*random(-10,10), random(cols[0]),0));
		counter++;
	}
	
	if(counter>=lim){
		counter=0;
		shoot=0;
	}
}

function shame(lim){
	alpha=0.5;
	for(let i = 0; i < 5; i++){
		particles.push(new Particle(random()*width,-10,random(5),0, random(cols[1]),1));
		counter++;
	}

	if(counter>=lim){
		counter=0;
		shoot=0;
	}
}

document.addEventListener("click", function() {
 	//inter = setInterval(Clock,1000);
});

document.addEventListener("keypress", function(e){
	//console.log(e.keyCode) 
	if(e.keyCode==99||e.keyCode==103){
		shoot=1;
		points[pIndex%players.length]++;
		if(points[pIndex%players.length]==pMax){
			let audio = new Audio("Finale.mp3");
			audio.play();
		}
	}if(e.keyCode==101||e.keyCode==115){
		shoot=2;
	}
});

function Clock(){
	clock--
	if(clock<=0){
		clock=maxT;
		clearInterval(inter);
		run();
		alpha=1;
	}
}

setup();
loop();