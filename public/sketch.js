let socket = io();
let myColor = "white";
let myImage;
let myNumber = 0;

socket.on("connect", newConnection); //quando mi connetto, chiama funzione newConnection
socket.on("mouseBroadcast", drawOtherMouse); //quando arriva messaggio "mouseBroadcast", drawOtherMouse()
socket.on("color", setColor) //quando arriva sms "color", setColor();
socket.on("newPlayer", newPlayer) //quando arriva sms "color", setColor();
socket.on("number", number) //quando arriva sms "myNumber", myNumber();



function newConnection() {
  console.log("your ID: " + socket.id) //mostra mio codice connessione
}

function drawOtherMouse(data) { //disegna ellissi di altri client
  push()
  noStroke();
  fill(data.color);
  ellipse(data.x, data.y, 20);
  pop()
}

function newPlayer(newPlayerData) {
  push();
  rectMode(CENTER);
  fill("white");
  noStroke();
  rect(width / 10*9, height / 20 * 19, 200, 50);
  pop();

  push();
  textAlign("center");
  fill(newPlayerData.clientColor);
  text("User " + newPlayerData.numberUser + " has joined", width / 10*9, height / 20 * 19);
  pop();
}

function number(assignedNumber) {
  myNumber = assignedNumber
}

function setColor(assignedColor) { //assegna un  colore a variabile new color
  myColor = assignedColor;
}

function preload() {
  myImage = loadImage("./addons/haring.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //welcome
  push();
  textAlign("center");
  fill(myColor);
  text("Welcome! let's color the guy n. " + myNumber, width / 2, height / 20 * 19);
  pop();
}

function draw() {
image(myImage, 0, 0, windowWidth);
}

function mouseDragged() {
  push();
  noStroke();
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
