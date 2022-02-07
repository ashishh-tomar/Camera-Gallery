let video=document.querySelector("video");
let recordBtn=document.querySelector(".record-btn");
let captureBtn=document.querySelector(".capture-btn");
let recordCont=document.querySelector(".record-cont");
let captureCont=document.querySelector(".capture-cont");
let recordFlag=false;
let captureFlag=false;



let recorder;
let chunks=[];

let constraints={
    video:true,
    audio:true
}
navigator.mediaDevices.getUserMedia(constraints).then((stream)=>{
    video.srcObject=stream;

    recorder=new MediaRecorder(stream);

    recorder.addEventListener("start",(e)=>{
        chunks=[];
    })

    recorder.addEventListener("dataavailable",(e)=>{
        chunks.push(e.data);
    });

    recorder.addEventListener("stop",(e)=>{
        //conversion of media chunks to video
        let blob=new Blob(chunks,{type : "video/mp4"});
        let videoUrl=URL.createObjectURL(blob);
        let a=document.createElement("a");
        a.href=videoUrl;
        a.download="stream.mp4";
        a.click();
    })
})

recordCont.addEventListener("click",(e)=>{
    if(!recorder) return;

    recordFlag=!recordFlag;

    if(recordFlag=== true)
    {
        recorder.start();
        recordBtn.classList.add("scale-record");
        startTimer();
    }
    else
    {
        recorder.stop();
        recordBtn.classList.remove("scale-record");
        stopTimer();
    }

});

let timerId;
let counter=0;
let timer=document.querySelector(".timer");
function startTimer(){
    timer.style.display="block";
    function displayTimer(){
        

        let totalSeconds=counter;
        let hour=Number.parseInt(totalSeconds/3600);
        let balance=Number.parseInt(totalSeconds%3600);
        let minute=Number.parseInt(balance/60);
        let second=Number.parseInt(balance % 60);

        hour=(hour < 10)?`0${hour}`:hour;
        minute=(minute < 10)?`0${minute}`:minute;
        second=(second < 10)?`0${second}`:second;

        let time=`${hour} : ${minute} : ${second}`;
        timer.innerText=time;

        counter++;
    }

     timerId=setInterval(displayTimer,1000);
}

function stopTimer(){
    
    clearInterval(timerId);
    timer.innerText="00:00:00";
    timer.style.display="none";
}

