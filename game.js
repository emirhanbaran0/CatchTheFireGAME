canvas = document.getElementById("canvas");
canvas.width = document.body.clientWidth; 
canvas.height = document.body.clientHeight; 
const ctx=canvas.getContext("2d");

width = canvas.width;
height = canvas.height;

//Oyundaki topa vuran kutuların boyutları
oyuncuH=160;
oyuncuG=30;

//Oyuncuların Skorları
player1Score=0;
player2Score=0;

//top yarıçapı
radius=20;

//top'un hareket etmesi için koordinatlarına eklenecek olan x ve y değişkenleri
vx=-5;
vy=5;

//topun zamanla hızlanmasını sağlayacak değişken  
veloce=1;

//oyunun bitip bitmediğinin kontrolü
gameStatus=true;


//oyuncu1'in başlangıç pozisyonu
delta1X=30;
delta1Y=(height/2)-(oyuncuH/2);

//oyuncu2'in başlangıç pozisyonu
delta2X=width-oyuncuG-30;
delta2Y=(height/2)-(oyuncuH/2);

//Top'un başlangıç pozisyonu
ballX=width/2;
ballY=(height/2)-10;


//gol müziği
var gameTheme=new Audio("gol.mp3")

window.addEventListener("keydown", keysPressed, false);
window.addEventListener("keyup", keysReleased, false);

var keys = [];

//bu fonksiyon ile klaveden girdi alarak oyuncuların yönlenmesi sağlandı;
function keysPressed(e) {
  // klavyeye basılan girdiler kaydolur
  keys[e.keyCode] = true;

  // left player1 
  if (keys[65]) {   //65 68 83 87
    if(delta1X>0)
    {
      delta1X -= 7;
    }
  }

  // right player1
  if (keys[68]) {
    if(delta1X<(width/2)-(oyuncuG/2))
    {
      delta1X += 7;
    }
    
  }

  // up player1
  if (keys[87]) {
    if(delta1Y>0)
    {
      delta1Y -= 7;
    }
    
  }

  // down player1
  if (keys[83]) {
    if(delta1Y<455)
    {
      delta1Y += 7;
    }
  }


  // left player2
  if (keys[37]) {   //37 39 38 40
    if(delta2X>(width/2)+(oyuncuG/2))
    delta2X -= 7;
  }

   // right player2
   if (keys[39]) {
    if(delta2X<width-oyuncuG)
    delta2X += 7;
   }
  // down player2
  if (keys[40]) {
    if(delta2Y<455){
      delta2Y += 7;
    }
    
  }

 // up player2
 if (keys[38]) {
  if(delta2Y>0 ){
    delta2Y -= 7;
  }
    
  }

  //replay
  if(keys[13] && gameStatus==false){
    window.location.reload();
  }
  //Start
  if (keys[32]) {
     startTheGame();
      
    }
  e.preventDefault();
}

//On Key Up
function keysReleased(e) {
  // mark keys that were released
  keys[e.keyCode] = false;
}

//topun oyuncuların kutularına veya yan duvarlara çarptığı zaman nasıl yönleneceği bu fonksiyon ile ele alındı
function ballControl(){

  if(gameStatus==true){

    if((( ballX <= delta1X + oyuncuG)  && ballX>delta1X-oyuncuG ) && ( ballY > ( delta1Y ) && ballY< (delta1Y+oyuncuH)) ){   //player1 topu yakaldımı kontrolü yapılır
      veloce=veloce*1.01;  //veloce'nin değeri  oyuncuların her  vuruşunda 0.1 artırılarak topun hızlanması sağlanır.
      vx=(5)*veloce;
     }
 
    if(  (ballX <= delta2X +oyuncuG/2    && ballX> delta2X- oyuncuG/2 ) &&  ( ballY > ( delta2Y) && ballY< (delta2Y+oyuncuH))  ){     //player2 topu yakaldımı kontrolü yapılır
      veloce=veloce*1.01;
     vx=(-5)*veloce;
     
    }
 
   
    if(ballY>height-radius){
     veloce*=1.01;  //veloce değeri her bir duvara vuruşta 0.1 artar.
     vy=-5*veloce;
    }
    if(ballY<0+radius){
     veloce*=1.01;
    vy=5*veloce;
   }
     if(ballX>=width){     //oyuncu1'in gol atıp atmadığının kontrolü yapılır.
       gameTheme.play();
       player1Score++;
       startPositions();
     }
 
     if(ballX<=0){       //oyuncu2'in gol atıp atmadığının kontrolü yapılır.
       gameTheme.play();
       player2Score++;
       startPositions();
     }

  }
}
  //gol olduktan sonra oyuncular ve top başlangıç pozisyonlarına dönmesi için yazılan fonksiyondur.
  function startPositions(){  

    if(ballX>=width){
      vx=5;

      if(ballX%2==1){
        vy=5;
      }else{
        vy=-5;
      }
    }

    if(ballX<=0){
      vx=-5;
      
      if(ballX%2==1){
        vy=-5;
      }else{
        vy=+5;
      }
    }
    veloce=1;

    delta1X=30;
    delta1Y=(height/2)-(oyuncuH/2);
    
    delta2X=width-oyuncuG-30;
    delta2Y=(height/2)-(oyuncuH/2);

    ballX=width/2;
    ballY=(height/2)-10;
    
    
    
  }

  //oyun bittikten sonra kazananı yazdıran fonksiyondur.
  function writeWinner(){

    if(player1Score==3 && player2Score<3){
      
      ctx.font = "40px Arial";
      ctx.fillStyle="Red";
      ctx.fillText("! Red Player Won The Game Congratulations !", (width/2)-450, (height/2)+5);
      ctx.fillStyle = "Black";
      ctx.fillRect((width/2)-50,(height/2)+40,100,40);
      ctx.font = "20px Arial";
      ctx.fillStyle="Black";
      ctx.fillText("Click Enter for replay",  (width/2)-107, (height/2)+120);
      ballX=50;
      ballY=-20;
      gameStatus=false;
      vx=0;
      vy=0;
      
  }

   if(player2Score==3 && player1Score<3){
    ctx.font = "40px Arial";
    ctx.fillStyle="White";
    ctx.fillText("!£  White Player Won The Game Congratulations  £!",  (width/2)-450, (height/2)+5);
    ctx.fillStyle = "Black";
    ctx.fillRect((width/2)-50,(height/2)+40,100,40);
    ctx.font = "20px Arial";
    ctx.fillStyle="Black";
    ctx.fillText("Click ENTER for replay",  (width/2)-107, (height/2)+120);
    ballX=50;
    ballY=-20;
    gameStatus=false;
    vx=0;
    vy=0;
}
}


//skoru yazdıran fonksiyondur
function writeScore(){
  ctx.font = "30px Comic Sans MS";
  ctx.fillStyle="Black"
  ctx.fillText("Red Player: "+ player1Score, 10, 50);
  ctx.font = "30px Comic Sans MS";
  ctx.fillStyle="Black"
  ctx.fillText("White Player: "+ player2Score, width-300, 50);
}

//oyun topunu çizen fonksiyondur
 function drawCircle() {
    
     ctx.beginPath();
     ballControl();
     ctx.arc(ballX, ballY, radius, 0, 2 * Math.PI);

     ctx.closePath();
     ctx.fillStyle ="yellow";
    
     ctx.fill();
     ballX+=vx;
     ballY+=vy;
   }

   //player1'i çizen fonksiyondur
  function drawPlayer1(x, y) {
    
    
    ctx.fillStyle = "red";
    ctx.fillRect(x,y,oyuncuG,oyuncuH);
    
  }
   //player2'i çizen fonksiyondur
  function drawPlayer2(x, y) {
    
    
    ctx.fillStyle = "white";
    ctx.fillRect(x,y,oyuncuG,oyuncuH);
    
  }

//Animasyon frame'ine request  atan fonksiyondur.
function animate() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  writeScore();
  writeWinner();
  drawPlayer1(delta1X, delta1Y);
  drawPlayer2(delta2X, delta2Y);
  //setInterval(drawCircle(),30);
  drawCircle();
  
  
  requestAnimationFrame(animate);
}


var executed = false;
function  startTheGame() {
          
      if (!executed) {
          executed = true;
          animate();
          
      }
  };

function rules(){
  //Head
  ctx.font = "40px Comic Sans MS";
  ctx.fillStyle="Black"
  ctx.fillText("Oyun Kuralları", 50, 150);

  //rule1
  ctx.font = "15px Comic Sans MS";
  ctx.fillStyle="Black"
  ctx.fillText("1- Kırmızı Oyuncu W A S D tuşlarını kullanarak kendi bloğuna yön verir.", 50, 180);


  ctx.font = "15px Comic Sans MS";
  ctx.fillStyle="Black"
  ctx.fillText("2- Beyaz Oyuncu Klavyedeki Ok  tuşlarını kullanarak kendi bloğuna yön verir.", 50, 210);

  ctx.font = "15px Comic Sans MS";
  ctx.fillStyle="Black"
  ctx.fillText("3- Her oyuncu kendilerine verilen  yarısahada siyah çizgiye kadar gidebilir.", 50, 240);

  ctx.font = "15px Comic Sans MS";
  ctx.fillStyle="Black"
  ctx.fillText("4- Oyuncu skor yapmak için karşı oyuncunun kalesine gol atmalıdır", 50, 270);


  ctx.font = "15px Comic Sans MS";
  ctx.fillStyle="Black"
  ctx.fillText("5- Skoru 3'e ulaşan oyuncu oyunu kazanır.", 50, 300);


  ctx.fillStyle = "Brown";
  ctx.fillRect((width/2)+150,(height/2)-110,150,50);
  ctx.font = "30px Arial";
  ctx.fillStyle="Black";
  ctx.fillText("Click Space to Start",  (width/2)+310, (height/2)-70);
  
  
}

rules();
