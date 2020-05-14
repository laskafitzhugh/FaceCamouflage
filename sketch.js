p5.disableFriendlyErrors = true;

let video;
let poseNet;
let color = [255, 0, 0];

//initialize important variables
let leftEarX = 0;
let leftEarY = 0;
let rightEarX = 0;
let rightEarY = 0;
let headWidth = 100;
let headHeight = 150;

//set up webcam input and call on poseNet AI
function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  console.log(ml5);
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses);
}

//set up face variables
function gotPoses(poses) {
  //console.log(poses);
  if (poses.length > 0) {
    //face data points and math:
    leftEarX = poses[0].pose.keypoints[3].position.x;
    leftEarY = poses[0].pose.keypoints[3].position.y;
    rightEarX = poses[0].pose.keypoints[4].position.x;
    rightEarY = poses[0].pose.keypoints[4].position.y;
    headWidth = rightEarX - leftEarX; //making this abs val messes up ellipse location
    headHeight = (headWidth * 3)/2;
  }
}

//check that poseNet has loaded in properly
function modelReady() {
  console.log('model ready');
}

//if mouse was clicked set color to color of pixel selected
function mousePressed(){
  color = get(mouseX, mouseY);
}

//compute center of face from poseNet variables and draw ellipse
function drawFace(color) {
  fill(color);
  noStroke();
  ellipse(leftEarX+(headWidth/2), lerp(leftEarY, rightEarY, 0.5), headWidth, headHeight);
}

function draw() {
  background(220);
  image(video, 0, 0);
  drawFace(color);
}
