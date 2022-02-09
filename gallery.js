

setTimeout(() => {
    if (db) {

        //Video Retrieval
        let dbTransactionVideo = db.transaction("video", "readonly");
        let videoStore = dbTransactionVideo.objectStore("video");
        let videoRequest = videoStore.getAll();
        videoRequest.onsuccess = (e) => {
            let videoResult = videoRequest.result;
            let galleryCont=document.querySelector(".gallery-cont");
            //console.log(videoResult);
            videoResult.forEach((videoObj) => {
                let mediaEle=document.createElement("div");
                mediaEle.setAttribute("class","media-cont");
                mediaEle.setAttribute("id",videoObj.id);
                let url=URL.createObjectURL(videoObj.blobData);

                mediaEle.innerHTML=`
                <div class="media">
                <video autoplay loop src="${url}"></video>
                </div>
                <div class="download action-btn">DOWNLOAD</div>
                <div class="delete action-btn">DELETE</div>
                `;

                galleryCont.appendChild(mediaEle);


                //Listeners
                let deleteBtn=mediaEle.querySelector(".delete");
                deleteBtn.addEventListener("click",deleteListener);

                let downloadBtn=mediaEle.querySelector(".download");
                downloadBtn.addEventListener("click",downloadListener);
                
            });
        }



        //Image Retrival

        let dbTransactionImage = db.transaction("image", "readonly");
        let imageStore = dbTransactionImage.objectStore("image");
        let imageRequest = imageStore.getAll();
        imageRequest.onsuccess = (e) => {
            let imageResult = imageRequest.result;
            let galleryCont=document.querySelector(".gallery-cont");
            //console.log(videoResult);
            imageResult.forEach((imageObj) => {
                let mediaEle=document.createElement("div");
                mediaEle.setAttribute("class","media-cont");
                mediaEle.setAttribute("id",imageObj.id);
                let url=imageObj.url;

                mediaEle.innerHTML=`
                <div class="media">
                <img src="${url}">
                </div>
                <div class="download action-btn">DOWNLOAD</div>
                <div class="delete action-btn">DELETE</div>
                `;

                galleryCont.appendChild(mediaEle);

                //Listeners
                let deleteBtn=mediaEle.querySelector(".delete");
                deleteBtn.addEventListener("click",deleteListener);

                let downloadBtn=mediaEle.querySelector(".download");
                downloadBtn.addEventListener("click",downloadListener);
            });
        }


    }

}, 100);

//UI remove, db remove
function deleteListener(e){

    //DB removal
    let id=e.target.parentElement.getAttribute("id");
    let type=id.slice(0,3);
    if(type==="vid")
    {
        let dbTransactionVideo = db.transaction("video", "readwrite");
        let videoStore = dbTransactionVideo.objectStore("video");
        videoStore.delete(id);
    }
    else if(type==="img"){
        let dbTransactionImage = db.transaction("image", "readwrite");
        let imageStore = dbTransactionImage.objectStore("image");
        imageStore.delete(id);
    }

    //UI removal
    e.target.parentElement.remove();
}

function downloadListener(e){

    let id=e.target.parentElement.getAttribute("id");
    let type=id.slice(0,3);
    if(type==="vid")
    {
        let dbTransactionVideo = db.transaction("video", "readwrite");
        let videoStore = dbTransactionVideo.objectStore("video");
        
        let videoRequest=videoStore.get(id);
        videoRequest.onsuccess= (e)=>{
            let videoResult=videoRequest.result;
            let videoUrl=URL.createObjectURL(videoResult.blobData);
            let a=document.createElement("a");
            a.href=videoUrl;
            a.download="stream.mp4";
            a.click();
        }
    }
    else if(type==="img"){
        let dbTransactionImage = db.transaction("image", "readwrite");
        let imageStore = dbTransactionImage.objectStore("image");
        
        let imageRequest=imageStore.get(id);
        imageRequest.onsuccess= (e)=>{
            let imageResult=imageRequest.result;
            let imageUrl=imageResult.url;
            let a=document.createElement("a");
            a.href=imageUrl;
            a.download="image.jpg";
            a.click();
        }
    }
}