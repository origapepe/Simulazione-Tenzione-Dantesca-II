function Particle(x,y,vx,vy, col,t){
	this.pos=new Vector(x,y)
	this.vel=new Vector(vx,vy);
	this.acc=new Vector(0,0.4);

	this.col=col;
	this.w=random(15,20);
	this.h=random(15,20);
	this.type=t;
	this.mvx=vx;
	this.a=0;//random();

	this.update=function(){
		this.vel.add(this.acc);
		this.pos.add(this.vel);

		if(this.type==0)this.vel.x*=0.98;
		
		if(this.type==1){
			this.w*=0.97;
			this.h*=0.97;
			this.vel.x=this.mvx*cos(this.a)*0.96;
			this.a+=0.2;
		}
	}

	this.show=function(){
		fill(this.col);
		rect(this.pos.x, this.pos.y, this.w,this.h);
	}

	this.over=function(){
		if(this.pos.y>=height||this.w<=1||this.h<=1)return true;
		return false;
	}
}