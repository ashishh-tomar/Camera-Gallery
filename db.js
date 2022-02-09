let db;

let openRequest=indexedDB.open("myDataBase");

openRequest.addEventListener("success",(e)=>{
    console.log("DB success");
    db=openRequest.result; // if db already existed then upgradNeeded function will not be called, only succes will be called so we have to initalize db;
});

openRequest.addEventListener("error",(e)=>{
    console.log("DB ERROR");
});

openRequest.addEventListener("upgradeneeded",(e)=>{
    console.log("DB Upgraded and also for initial DB creation");
    db=openRequest.result;

    db.createObjectStore("video",{keyPath : "id"});
    db.createObjectStore("image",{keyPath : "id"});
});