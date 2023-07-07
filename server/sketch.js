let video;
let poseNet;
let poses = [];

let url = new URL(window.location.href);
let params = new URLSearchParams(url.search);

let width = params.get("width") || 640;
let height = params.get("height") || 480;
let enableSkeleton = params.get("enableSkeleton") || true;
let enableKeyPoints = params.get("enableKeyPoints") || true;
let color = params.get("color") || "255, 0, 255";
let mode = params.get("mode") || "multiple";
let score = params.get("score") || 0.5;
let isBackCamera = params.get("isBackCamera") || false;
let flipHorizontal = params.get("flipHorizontal") || false;
let RR = color.split(",")[0];
let GG = color.split(",")[1];
let BB = color.split(",")[2];

function setup() {
  createCanvas(width, height);
  video = createCapture({
    audio: false,
    video: {
      facingMode: isBackCamera ? "environment" : "user",
      width: width,
      height: height,
    },
  });
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, mode, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on("pose", function (results) {
    poses = results;
    window?.ReactNativeWebView?.postMessage(JSON.stringify(poses));
    // console.log(poses);
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  console.log("Model Ready");
}

function draw() {
  if (flipHorizontal === "true") {
    translate(width, 0);
    scale(-1, 1);
  }
  image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  if (enableKeyPoints !== 'false') drawKeypoints();
  if (enableSkeleton !== 'false') drawSkeleton();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  // Loop through all the poses detected
  // console.log(poses);
  for (let i = 0; i < poses.length; i += 1) {
    // For each pose detected, loop through all the keypoints
    const pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j += 1) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      const keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > score) {
        fill(RR, GG, BB);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i += 1) {
    const skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j += 1) {
      const partA = skeleton[j][0];
      const partB = skeleton[j][1];
      stroke(RR, GG, BB);
      line(
        partA.position.x,
        partA.position.y,
        partB.position.x,
        partB.position.y
      );
    }
  }
}
