Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
Webcam.attach('#cameraContainer');
camera = document.getElementById("cameraContainer");

function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="snapshotImage" src="' + data_uri + '+/>';
    });
}
console.log('ml5 version: ', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/-mi-EMR5i/', modelLoaded);

function modelLoaded() {
    console.log('Model Loaded');
}

function check() {
    snapshot = document.getElementById('snapshotImage');
    classifier.classify(snapshot, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        document.getElementById("resultObjectLabel").innerHTML = results[0].label;
        document.getElementById("resultAccuracyLabel").innerHTML = results[0].confidence.toFixed(3);
    }
}