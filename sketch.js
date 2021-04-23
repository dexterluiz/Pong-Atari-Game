// Variavel oara oponente errar
let chanceDeErrar = 0;

//Variaveis de som do jogo

let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3")
  ponto = loadSound ("ponto.mp3")
  raquetada = loadSound ("raquetada.mp3")
}

//Placar do jogo

let meusPontos = 0
let pontosOponente = 0

//Trem do Github

let colidiu = false

//Variaveis da bolinha

let xBolinha = 300;
let yBolinha = 200; 
let diametro = 15;
let raio = diametro / 2;

// Variaveis da Raquete aliada

let xRaquete = 5;
let yRaquete = 150;
let wRaquete = 10;
let hRaquete = 90;

//Variaveis da Raquete Inimiga

let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

//Velocidade da Bolinha

let velocidadeXBolinha = 6;                            
let velocidadeYBolinha = 6;

// Tamanho do Background

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

// Oque vai ser Desenhado

function draw() {
  background(0);                                                           
  mostraBolinha()                    
  movimentaBolinha()                                       
  verificaColisaoBorda()
  mostraRaquete(xRaquete,yRaquete)
  movimentaMinhaRaquete()
  //verificaColisaoRaquete()
  verificaColisaoRaqueteBiblioteca(xRaquete,yRaquete)
  mostraRaquete(xRaqueteOponente, yRaqueteOponente)
  movimentaRaqueteOponente()
  verificaColisaoRaqueteBiblioteca(xRaqueteOponente,yRaqueteOponente)
  incluiPlacar() 
  marcaPonto()
}

//Proporcoes da bolinha a ser desenhada

function mostraBolinha(){
  circle(xBolinha,yBolinha,diametro) 
  
}  

//Proporcoes da raquete a ser desenhada

function mostraRaquete(x,y){
  rect(x, y, wRaquete, hRaquete)
  
}





// Config do padrao de movimento da bolinha prara horizontal e vertical

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;                       
  yBolinha += velocidadeYBolinha;
  
}

// Config do padrao de movimentacao ao tocar as bordas

function verificaColisaoBorda (){
  if (xBolinha + raio > width ||
     xBolinha - raio < 0){                              
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height ||
      yBolinha - raio <0)                               
     velocidadeYBolinha *= -1;
}

//Config de movimentaçao vertical da raquete

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

//Padrao de movimentaçao da bolinha ao encostar na raquete

function verificaColisaoRaquete(){
  if(xBolinha - raio < xRaquete + wRaquete && yBolinha - raio < yRaquete + hRaquete && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

//Funcao do Github da colisao com a raquete

function verificaColisaoRaqueteBiblioteca(x,y){
  colidiu = 
  collideRectCircle(x, y, wRaquete, hRaquete,xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
  }
  
function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - wRaquete / 2- 30 
  yRaqueteOponente += velocidadeYOponente
  calculaChanceDeErrar()
}

function calculaChanceDeErrar(){
  if(pontosOponente >= meusPontos){
    chanceDeErrar += 1
    if(chanceDeErrar >= 39){
      chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
      chanceDeErrar = 35
    }
  }
}

//Localizacao do Placar e variaveis

function incluiPlacar(){
  stroke(255)
  textAlign(CENTER)
  textSize(16)
  
  fill(color(255,140,0));
  rect(150, 10, 40, 20)
  fill(255)
  text(meusPontos,170, 26)
  
  fill(color(255,140,0))
  rect(450, 10, 40, 20)
  fill(255)
  text(pontosOponente, 470,26)
 
}

//Variaveis da pontuacao do placar

function marcaPonto(){
  if(xBolinha > 590){
  meusPontos += 1;
    ponto.play();
}
  if(xBolinha < 10){
  pontosOponente += 1;
    ponto.play();
  }
}