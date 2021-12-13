objects = [];
status = "";

function setup()
{
    canvas = createCanvas(460 , 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function draw()
{
    image(video , 0 , 0 , 460 , 400);

    if(status != "")
    {
        objectDetector.detect(video ,gotResult);
    for(i = 0 ; i < objects.length ; i++)
    {
        document.getElementById("status").innerHTML = "Status : Objects Detected";

        fill("#87CEEB")
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%" , objects[i].x + 15 , objects[i].y + 15);
        noFill();
        stroke("#FF00FF");
        rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);

        if(objects[i].label == 'input')
        {
            video.stop();
            objectDetector.detect(gotResult);
           var synth = window.SpeechSynthesis();
            speak_data = input + " Found ";
            var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    document.getElementById("number_obj").innerHTML = objects[i].label + "Found";

        }
        else
        {
            document.getElementById("number_obj").innerHTML = objects[i].label + " Not Found ";
        }
    }
   }
    }



function start()
{
    objectDetector = ml5.objectDetector("cocossd" , modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}


function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}


function gotResult(error , results)
{
    if(error)
    {
        console.error(error);
    }
    else{
        console.log(results)
        objects = results;
    }
}