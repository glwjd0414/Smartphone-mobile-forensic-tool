// Imports the Google Cloud Video Intelligence library + Node's fs library
const video = require('@google-cloud/video-intelligence').v1;
const fs = require('fs');
const util = require('util');
async function getinfo(){
    console.log('before client');
    // Creates a client
    const client = new video.VideoIntelligenceServiceClient();
    console.log('after client');

    /**
     * TODO(developer): Uncomment the following line before running the sample.
     */
    const path = 'C:/Users/yunyoung/Desktop/temp/2016104137/source/forensic_tool/20190525_113617.mp4';

    // Reads a local video file and converts it to base64
    const readFile = util.promisify(fs.readFile);
    const file = await readFile(path);
    const inputContent = file.toString('base64');

    // Constructs request
    const request = {
    inputContent: inputContent,
    features: ['LABEL_DETECTION'],
    };

    // Detects labels in a video
    const [operation] = await client.annotateVideo(request);
    console.log('Waiting for operation to complete...');
    const [operationResult] = await operation.promise();
    // Gets annotations for video
    const annotations = operationResult.annotationResults[0];

    const labels = annotations.segmentLabelAnnotations;
    labels.forEach(label => {
        console.log(`Label ${label.entity.description} occurs at:`);
        label.segments.forEach(segment => {
            const time = segment.segment;
            if (time.startTimeOffset.seconds === undefined) {
            time.startTimeOffset.seconds = 0;
            }
            if (time.startTimeOffset.nanos === undefined) {
            time.startTimeOffset.nanos = 0;
            }
            if (time.endTimeOffset.seconds === undefined) {
            time.endTimeOffset.seconds = 0;
            }
            if (time.endTimeOffset.nanos === undefined) {
            time.endTimeOffset.nanos = 0;
            }
            console.log(
            `\tStart: ${time.startTimeOffset.seconds}` +
                `.${(time.startTimeOffset.nanos / 1e6).toFixed(0)}s`
            );
            console.log(
            `\tEnd: ${time.endTimeOffset.seconds}.` +
                `${(time.endTimeOffset.nanos / 1e6).toFixed(0)}s`
            );
            console.log(`\tConfidence: ${segment.confidence}`);
        });
    });
}
//getinfo();
//get_videosaftey();
async function get_videosaftey(){
    // Imports the Google Cloud Video Intelligence library
    const video = require('@google-cloud/video-intelligence').v1;
    console.log('before client');
    // Creates a client
    const client = new video.VideoIntelligenceServiceClient();
    console.log('after client');

    /**
     * TODO(developer): Uncomment the following line before running the sample.
     */
    // const gcsUri = 'GCS URI of video to analyze, e.g. gs://my-bucket/my-video.mp4';
    const path = 'C:/Users/yunyoung/Videos/20190525_113617.mp4';

    // Reads a local video file and converts it to base64
    const readFile = util.promisify(fs.readFile);
    const file = await readFile(path);
    const inputContent = file.toString('base64');

    const request = {
    inputContent: inputContent,
    features: ['EXPLICIT_CONTENT_DETECTION'],
    };

    // Human-readable likelihoods
    const likelihoods = [
    'UNKNOWN',
    'VERY_UNLIKELY',
    'UNLIKELY',
    'POSSIBLE',
    'LIKELY',
    'VERY_LIKELY',
    ];

    // Detects unsafe content
    const [opertaion] = await client.annotateVideo(request);
    console.log('Waiting for operation to complete...');
    const [operationResult] = await opertaion.promise();
    // Gets unsafe content
    const explicitContentResults =
    operationResult.annotationResults[0].explicitAnnotation;
    console.log('Explicit annotation results:');
    explicitContentResults.frames.forEach(result => {
        if (result.timeOffset === undefined) {
            result.timeOffset = {};
        }
        if (result.timeOffset.seconds === undefined) {
            result.timeOffset.seconds = 0;
        }
        if (result.timeOffset.nanos === undefined) {
            result.timeOffset.nanos = 0;
        }
        console.log(
            `\tTime: ${result.timeOffset.seconds}` +
            `.${(result.timeOffset.nanos / 1e6).toFixed(0)}s`
        );
        console.log(
            `\t\tPornography likelihood: ${likelihoods[result.pornographyLikelihood]}`
        );
    });
}

// var ss = `C:\\Users\\yunyoung\\Desktop\\temp\\2016104137\\source\\forensic_tool\\20190215_152731.mp4`
// var h = ss.split('\\');
// var c = '';
// for(var i = 0; i < h.length; i++){
//     c += h[i] + '/';
// }
// console.log(c);
// const l = c.slice(0,-1);
// console.log(l);
// console.log(ss);
// var hell = ss.replace('/\\/g','/');
// console.log(hell);

const labels = [['landmark',[['0.0','17.17'],['0.0','17.17'],['0.0','17.17']]],['tourist destination',[['0.0','17.17'],['0.0','17.17'],['0.0','17.17']]],['tourism',[['0.0','17.17'],['0.0','17.17'],['0.0','17.17']]],['historic site',[['0.0','17.17'],['0.0','17.17'],['0.0','17.17']]],['building',[['0.0','17.17'],['0.0','17.17'],['0.0','17.17']]]];
console.log(labels);
var content = {video : '2020',labels : []}
labels.forEach(label => {
    content['labels'].push(label[0]);
    content[label[0]] = [];
    label[1].forEach(segment => {
        var temp = [segment[0],segment[1]];
        content[label[0]].push(temp);
    });
});

console.log(content);
var array = content['labels'];

array.forEach(label =>{
    for(var i = 0; i < content[label].length; i++){
        console.log(content[label][i]);
    }
});

var likelihood_index = {'UNKNOWN': 0,'VERY_UNLIKELY': 1,'UNLIKELY': 2,'POSSIBLE': 3,'LIKELY': 4,'VERY_LIKELY': 5};
        var det_dataset = [0,0,0,0,0,0]
        
        det_dataset[likelihood_index[dt_dict['likelihood'][i][1]]] +=1;

var ctx = document.getElementById('det_piechart_'+lb_dict['video']);
    var config = {
                type: 'pie',
                data: {
                    labels: ["UNKNOWN", "VERY_UNLIKELY", "UNLIKELY", "POSSIBLE","LIKELY",'VERY_LIKELY'],
                    datasets: [{
                    data: det_dataset,
                    backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1"],
                    hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5"]
                    }]
                },
                options: {
                    responsive: true
                }
            }