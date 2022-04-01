var ball = {
}
let opa = 150; //opacidad estrella fugas
let tiempoEstrella = 0; // tiempo de aparicion de estrella fugas

let auxmov = 1; //bandera
let colorR,colorG,colorB;//cambio de color fondo
let opacidad; // opacidad del fondo 

let nubesx4 = -220;  //posicion de nubes
let nubesx3 = 600;
let nubesx2 = 300;
let nubesx = 100;
let speedNx = 0.3; //velocidad de nubes
let prende; //luces encendio apagado

let solLunaX=800; //posicion del sol/luna
let solLunaY=100;
let tamSolLuna = 40;
let arribaSolLuna;

let pX=900; //posicion pelota
let pY=565;
let tamP = 17;
let arribaPelota;
let movPelota = 54;

let portonX=570; //posicion porton
let portonY=500;
let tamañoPorton= 110;
let tamañoPortonY=90;
let arribaPorton;

let parX=240; //posicion parlantes
let parY=530;
let tamPar = 50;
let arribaParlante;
let tamOnda;
let ondaR,ondaG,ondaB;
let sonido=1;

let x1 = 45; //movimiento de luces de noche
let x3 = 130;
let xA1 = 900;
let xB1 = 800;
let movimientoLuz = 0.1; // velocidad del movimiento de luces

let bubble,bubble2,bubble3,bubble4,bubble5,bubble6,bubble7,bubble8,bubble9,bubble10,bubble11,bubble12,bubble13,bubble14,bubble15,bubble16,bubble17,bubble18,bubble19,bubble20;
let estrella, estrella2,estrella3,estrella4,estrella5,estrella6,estrella7,estrella8,estrella9,estrella10,estrella12,estrella13,estrella14,estrella15;
let pic1, pic2, pic3, pelota, parlantes;
let NubesPic, NubesPic2, NubesPic3, NubesPic4;
let sonidoPelota,sonidoParlante,sonidoAmbiente, sonidoPerros, sonidoNoche;

function preload() {  //para agregar imagen 
  pic1 = loadImage('v31.png');
  pic2 = loadImage('v31Noche.png');
  pic3 = loadImage('v31columnas.png');
  pelota = loadImage('pelota.png'); 
  parlantes = loadImage('parlantes.png');
  NubesPic = loadImage('nube.png');
  NubesPic2 = loadImage('nube2.png');
  NubesPic3 = loadImage('nube3.png');
  NubesPic4 = loadImage('nube4.png');
  sonidoPelota = loadSound('sfx-swoosh1.mp3');  
  sonidoParlante = loadSound('cumbia_nena.mp3');
  sonidoAmbiente = loadSound('vendedor_1.mp3')
  sonidoPerros = loadSound('perros.mp3');
  sonidoNoche = loadSound('noche.mp3');
}

function setup() {
  createCanvas(1000, 600); 
  cantEstrellas();
  cantEstaticas();
  w = windowWidth;
  h = windowHeight; 
}

function draw() {
  background(colorR, colorG, colorB, opacidad);
  arribaSolLuna = false; 
  arribaPelota = false;
  arribaParlante = false;  
  sonido = false;
  arribaPorton =false;

  
  if (mouseX > portonX  && mouseX < portonX + tamañoPorton && mouseY > portonY  && mouseY < portonY + tamañoPortonY) {  //posicion mouse sobre luna
    arribaPorton= true;   
  }

  if (auxmov < 0) { //NOCHE   
    sonidoAmbiente.stop();   
    if (!sonidoNoche.isPlaying()){
      sonidoNoche.play();
    }
    mostrarEstrellas(); 
    mostrarEstaticas();  
    prenderLuces();  
    
    colorR = 32; colorG = 35; colorB = 85; opacidad = 255; //color violeta 
    
    tiempoEstrella += 1;  // tiempo de aparicion estrella
    if (tiempoEstrella > 150) {
      estrellaFugas();           
    }
       
    noStroke(); // luna
    fill(255, 230, 230);
    ellipse(800, 100, 100);

    if (mouseX > solLunaX - tamSolLuna && mouseX < solLunaX + tamSolLuna && mouseY > solLunaY - tamSolLuna && mouseY < solLunaY + tamSolLuna) {  //posicion mouse sobre luna
      arribaSolLuna = true;   
    }    
    image(pic2,0,0, 1000, 600);   //edificio 
    moverLuz();
    image(pic3,0,0, 1000, 600); //alumbrado
    image(parlantes,parX,parY,60,50);

    if(sonidoParlante.isPlaying()){
        ondaB = random(0,255);
        ondaG = random(0,255);
        ondaR = random(0,255);
        tamOnda = random(30,90);
        fill(ondaR,ondaG,ondaB,95);
        ellipse (270,560,tamOnda);  
    }
    

    if (mouseX > parX  && mouseX < parX + tamPar && mouseY > parY  && mouseY < parY + tamPar) {  //posicion mouse sobre luna
      arribaParlante= true;   
    }

  }else{   //DIA
    sonidoNoche.stop();
    if (!sonidoAmbiente.isPlaying()){
      sonidoAmbiente.play();
    }   

    tiempoEstrella = 0;  //estrella fugas vuelve accionarse     
    sonidoParlante.stop();  
    colorR = 45; colorG = 172; colorB = 203; opacidad = 255;    //color celeste del cielo
    ventanasDia();

    noStroke(); //sol
    fill(255,165,0);
    ellipse(800, 100, 100);
    if (mouseX > solLunaX - tamSolLuna && mouseX < solLunaX + tamSolLuna && mouseY > solLunaY - tamSolLuna && mouseY < solLunaY + tamSolLuna) {  //posicion mouse sobre sol
      arribaSolLuna = true;   
    } 

    movimientoNubes(); //nubes 
    image(NubesPic, nubesx, 120, 200, 100); //ultima
    image(NubesPic2, nubesx2, 100, 350, 200);
    image(NubesPic3, nubesx3, 100, 200, 100);
    image(NubesPic4, nubesx4, 150, 200, 100);
    image(pic1,0,0, 1000, 600);  
    image(pelota,pX,pY,17,17); 
   
  
    if(mouseX > pX - tamP && mouseX < pX + tamP && mouseY > pY - tamP && mouseY < pY + tamP ){  //posicion mouse sobre la pelota    
    arribaPelota = true;   
    }
  }
  
}
function mousePressed() {
  if (arribaSolLuna)  {
    if(mouseIsPressed) {  
     auxmov*= -1;  
     opa = 100;  
     ball.x = 100;
     ball.y = 80;
     ball.xspeed = 4;
     ball.yspeed = 3;  
    } 
  }

  if (arribaPelota) { 
    if(mouseIsPressed) {  
      arribaPelota= false; 
      pX-=movPelota;    
      sonidoPelota.play();
    }
    if(pX<750){
      movPelota*=-1;     
    }
    if(pX>985){
      movPelota*=-1;
      pX= 986;
    }  
  }
if(arribaPorton){
  if(mouseIsPressed){
    arribaPorton=false;
    if(!sonidoPerros.isPlaying()){
      sonidoPerros.play();
    }
  }
}

  if (arribaParlante) { 
    if(mouseIsPressed) {  
      arribaParlante= false; 
        if(sonidoParlante.isPlaying()){
          sonidoParlante.stop();         
        }else{
        sonidoParlante.play();           
        }
    }
  }  
  

}


function moverLuz(){
  x1 += movimientoLuz;
  x3 += movimientoLuz;
  xA1 += movimientoLuz;
  xB1 += movimientoLuz;

  noStroke();
  fill(237,222,117,190);
  triangle(88, 412, x1, 588, x3, 588); 
  triangle(854, 412.5, xA1, 588, xB1, 588); 
    if ( x1 >60){
      movimientoLuz *= -1;
    } 
    if(x3<120){
      movimientoLuz *= -1;
    }
}
function ventanasDia(){
  fill(237,255,255);
  rect(600,220,60,50);
  rect(300,305,60,50);
  rect(340,395,170,100); 
  rect(300,500,60,50);
  rect(500,315,60,50);
  rect(600,300,60,50); 
  rect(600,415,60,50);
  rect(660,495,40,40);
}
function prenderLuces(){
  if(mouseX<125 || mouseX>875){       
    fill(237,222,117);
    rectangulo1 = rect(600,220,60,50);
  }else{
    fill(0,0,0);
    rectangulo1 = rect(600,220,60,50);
  }

  if(mouseX<250 && mouseX>125 || mouseX<750 && mouseX>625){
    fill(237,222,117);
    rectangulo1 = rect(300,305,60,50);
  }else{
    fill(0,0,0);
    rectangulo1 = rect(300,305,60,50);
  }

  if(mouseX<500  && mouseX>250 || mouseY>300){
    fill(237,222,117);
   rectangulo1 = rect(340,395,160,100);
  }else{
    fill(0,0,0);
    rectangulo1 = rect(340,395,160,100);
  }

  if(mouseX<500  && mouseX>350){
    fill(237,222,117);
    rectangulo1 = rect(300,505,60,50);
  }else{
    fill(0,0,0);
    rectangulo1 = rect(300,505,60,50);
  }

  if(mouseX<625 && mouseX>500){
    fill(237,222,117);
    rectangulo1 = rect(500,315,60,50);
  }else{
    fill(0,0,0);
    rectangulo1 =rect(500,315,60,50);
  }

  if(mouseX<750 && mouseX>625){
    fill(237,222,117);
    rectangulo1 = rect(600,300,60,50); 
  }
  else{
    fill(0,0,0);
    rectangulo1 = rect(600,300,60,50); 
  }
  
  if(mouseX<875 && mouseX>750 || mouseY<300){
    fill(237,222,117);
    rectangulo1 = rect(600,415,60,50);
  }else{
    fill(0,0,0);
    rectangulo1 =  rect(600,415,60,50);
  }
  if(mouseX<1000 && mouseX>875){
    fill(237,222,117);
    rectangulo1 = rect(660,495,40,40);
  }else{
    fill(0,0,0);
    rectangulo1 = rect(660,495,40,40);
  }
}
function movimientoNubes() {
  nubesx += speedNx;
  nubesx2 += speedNx;
  nubesx3 += speedNx;
  nubesx4 += speedNx;

  if (nubesx > width) {
    nubesx = -400; 
  }
  if(nubesx2>width){
    nubesx2 = -300;    
  }
  if(nubesx3>width){
    nubesx3 = -160;
  }
  if(nubesx4>width){
    nubesx4 = -100;
  }
}
function estrellaFugas() {
  ball.x = ball.x + ball.xspeed;
  ball.y = ball.y + ball.yspeed;
  noStroke();
  fill(255, 255, 255, opa);
  ellipse(ball.x, ball.y, 4, 4);
  opa -= 1;
}

class Estrella{
  constructor() {
    this.x = random(width);
    this.y = random(0,300); 
    this.t = 0;
    this.o=0;
   } 

  move(){
    this.x = this.x + random(-0.2,0.2);
    this.y = this.y + random(0.2,-0.2);    
  } 

  show(){
   this.t = random(1,3);
   this.o = random(70,200);
    noStroke();
    fill(255,255,255,this.o);
    ellipse(this.x, this.y,this.t,this.t);
  }
 }
function cantEstrellas(){
  bubble = new Estrella();
  bubble2 = new Estrella();  
  bubble3= new Estrella(); 
  bubble4 = new Estrella(); 
  bubble5 = new Estrella(); 
  bubble6 = new Estrella(); 
  bubble7 = new Estrella(); 
  bubble8 = new Estrella(); 
  bubble9 = new Estrella(); 
  bubble10 = new Estrella(); 
  bubble11= new Estrella(); 
  bubble12 = new Estrella(); 
  bubble13 = new Estrella(); 
  bubble14 = new Estrella(); 
  bubble15 = new Estrella(); 
  bubble16 = new Estrella(); 
  bubble17 = new Estrella(); 
  bubble18 = new Estrella(); 
  bubble19 = new Estrella(); 
  bubble20 = new Estrella(); 

}
function mostrarEstrellas(){
  bubble.move();
  bubble.show();
  bubble2.move();
  bubble2.show();
  bubble3.move();
  bubble3.show();
  bubble4.move();
  bubble4.show();
  bubble5.move();
  bubble5.show();
  bubble6.move();
  bubble6.show();
  bubble7.move();
  bubble7.show();
  bubble8.move();
  bubble8.show();
  bubble9.move();
  bubble9.show();
  bubble10.move();
  bubble10.show();
  bubble11.move();
  bubble11.show();
  bubble12.move();
  bubble12.show();
  bubble13.move();
  bubble13.show();
  bubble14.move();
  bubble14.show();
  bubble15.move();
  bubble15.show();
  bubble16.move();
  bubble16.show();
  bubble17.move();
  bubble17.show();
  bubble18.move();
  bubble18.show();
  bubble19.move();
  bubble19.show();
  bubble20.move();
  bubble20.show();
}

class Estaticas{
  constructor(){
    this.x= random(width);
    this.y= random(0,350);
  }
  show(){
     noStroke();
     fill(255,255,255,this.o);
     ellipse(this.x, this.y,2,2);
   }
}
function cantEstaticas(){
  estrella = new Estaticas();
  estrella2 = new Estaticas();
  estrella3 = new Estaticas();
  estrella4 = new Estaticas();
  estrella5 = new Estaticas();
  estrella6 = new Estaticas();
  estrella7 = new Estaticas();
  estrella8 = new Estaticas();
  estrella9 = new Estaticas();
  estrella10 = new Estaticas();
  estrella11 = new Estaticas();
  estrella12 = new Estaticas();
  estrella13 = new Estaticas();
  estrella14 = new Estaticas();
  estrella15 = new Estaticas();

}
function mostrarEstaticas(){
  estrella.show();
  estrella2.show();
  estrella3.show();
  estrella4.show();
  estrella5.show();
  estrella6.show();
  estrella7.show();
  estrella8.show();
  estrella9.show();
  estrella10.show();
  estrella11.show();
  estrella12.show();
  estrella13.show();
  estrella14.show();
  estrella15.show();

}
  //rebote en el marco
  // if (ball.x > width || ball.x < 0 ){
  //   ball.xspeed = ball.xspeed * -1;
  // }
  // if (ball.y >height || ball.y<0){
  //   ball.yspeed = ball.yspeed * -1;
  // }
  // ball.x = ball.x + ball.xspeed;
  // ball.y = ball.y + ball.yspeed;
  //estrellas   
  
  //mapea el tamaño del lienzo con el rango de numero de los colores
  // color = map(mouseY, 60, 400, 0, 255);
  // color2 = map(mouseY, 60, 400, 255, 0);