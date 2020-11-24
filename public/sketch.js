let socket = io();
let myColor = "white";

socket.on("connect", newConnection); //quando mi connetto, chiama funzione newConnection
socket.on("mouseBroadcast", drawOtherMouse); //quando arriva messaggio "mouseBroadcast", drawOtherMouse()
socket.on("color", setColor) //quando arriva sms "color", setColor();
socket.on("newPlayer", newPlayer) //quando arriva sms "color", setColor();


function newConnection() {
  console.log("your ID: " + socket.id) //mostra mio codice connessione
}

function drawOtherMouse(data) { //disegna ellissi di altri client
  fill(data.color);
  ellipse(data.x, data.y, 10)
}

function newPlayer(newPlayerColor){

  push();
  rectMode(CENTER);
  fill("red");
  noStroke();
  rect(width / 2, height / 2, 200, 50);
  pop();

  push();
  textAlign("center");
  fill(newPlayerColor);
  text("New player joined" + newPlayerColor, width / 2, height / 2);
  pop();
}

function setColor(assignedColor) { //assegna un  colore a variabile new color
  myColor = assignedColor;

  //welcome
  push();
  textAlign("center");
  fill(myColor);
  text("Welcome" + myColor, width / 2, height / 2);
  pop();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("red");
}

function draw() {}

function mouseMoved() {
  push();
  fill(myColor);
  ellipse(mouseX, mouseY, 20);
  pop();
  //crea messaggio
  let message = {
    x: mouseX,
    y: mouseY,
    color: myColor
  };
  //send to the server
  socket.emit("mouse", message);
}
