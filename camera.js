const imageScaleFactor = 0.2;
const outputStride = 16;
const flipHorizontal = false;
const stats = new Stats();
const VideoWidth = 800;
const VideoHeight = 600;

let imageScale = 1;
let imageFace = new Image();
imageFace.src = "image.png"

// カメラのセットアップ
async function setupCamera() {
    const video = document.getElementById('video');
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
            'audio': false,
            'video': true});
        video.srcObject = stream;

        return new Promise(resolve => {
            video.onloadedmetadata = () => {
                resolve(video);
            };
        });
    } else {
        const errorMessage = "This browser does not support video capture, or this device does not have a camera";
        alert(errorMessage);
        return Promise.reject(errorMessage);
    }
}

// ビデオの起動
async function loadVideo() {
    const video = await setupCamera();
    video.play();
    return video;
}

// 姿勢予測
function detectPoseInRealTime(video, net) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const flipHorizontal = true; 
    // since images are being fed from a webcam

    async function poseDetectionFrame() {
        stats.begin();
        let poses = [];
        const pose = await net.estimateSinglePose(video, imageScaleFactor, flipHorizontal, outputStride);
        // 複数人での認識はここを修正する
        poses.push(pose);

        ctx.clearRect(0, 0, VideoWidth,VideoHeight);

        ctx.save();
        ctx.scale(-1, 1);
        ctx.translate(-VideoWidth, 0);
        ctx.drawImage(video, 0, 0, VideoWidth, VideoHeight);
        ctx.restore();

        poses.forEach(({score, keypoints }) => {
            drawFace(keypoints[0], keypoints[1], ctx);
            drawWristPoint(keypoints[0],ctx);　// nose
            drawWristPoint(keypoints[1],ctx);  // left Eye
            drawWristPoint(keypoints[2],ctx);  // right Eye
            drawWristPoint(keypoints[3],ctx);  // left Ear
            drawWristPoint(keypoints[4],ctx);  // right Ear
            drawWristPoint(keypoints[5],ctx);  // left Shoulder
            drawWristPoint(keypoints[6],ctx);  // right Shoulder
            drawWristPoint(keypoints[7],ctx);  // left Elbow
            drawWristPoint(keypoints[8],ctx);  // right Elbow
            drawWristPoint(keypoints[9],ctx);  // left Wrist
            drawWristPoint(keypoints[10],ctx);  // right Wrist
            drawWristPoint(keypoints[11],ctx);  // left Hip
            drawWristPoint(keypoints[12],ctx);  // right Hip
            drawWristPoint(keypoints[13],ctx);  // left Knee
            drawWristPoint(keypoints[14],ctx);  // right Knee
            drawWristPoint(keypoints[15],ctx);  // left Ankle
            drawWristPoint(keypoints[16],ctx);  // right Ankle
        });

        stats.end();

        requestAnimationFrame(poseDetectionFrame);
    }
    poseDetectionFrame();
}

// Posenetのモデルを読み込んでカメラを開始する
async function bindPage() {
    const net = await posenet.load(); // posenetの呼び出し
    let video;
    try {
        video = await loadVideo(); // video属性をロード
    } catch(e) {
        console.error(e);
        return;
    }
    detectPoseInRealTime(video, net);
}

// 与えられたKeypointをcanvasに描画する
function drawWristPoint(wrist,ctx){
    ctx.beginPath();
    ctx.arc(wrist.position.x , wrist.position.y, 3, 0, 2 * Math.PI);
    ctx.fillStyle = "pink";
    ctx.fill();
}

// 顔に写真を貼り付ける
function drawFace(nose, leye, ctx){
    imageScale = (leye.position.x - nose.position.x - 50) / 50;
    if (imageScale < 0.7) imageScale = 0.7;
    let nw = imageFace.width * imageScale;
    let nh = imageFace.height * imageScale;
    ctx.drawImage(imageFace,nose.position.x - nh / 2 , nose.position.y - nh / 1.5, nw, nh);
}

bindPage();