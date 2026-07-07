const MUSIC_INFO = {
    title: "Your Track Name",
    artist: "Your Artist"
};

let filesNeeded = 1;
let filesTotal = 1;
let filesDownloaded = 0;

const progressFill = document.getElementById("progress-fill");
const percent = document.getElementById("percent");

const music = document.getElementById("music");

const title = document.getElementById("music-title");
const author = document.getElementById("music-author");

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function updateProgress(value) {

    value = clamp(Math.round(value),0,100);

    progressFill.style.width = value + "%";

    percent.innerText = value + "%";

}

/* -------------------------------------- */
/* GMod Loading */
/* -------------------------------------- */

function SetFilesNeeded(needed){

    filesNeeded = Math.max(Number(needed) || 1,1);

    filesTotal = filesNeeded;

    filesDownloaded = 0;

    updateProgress(0);

}

function SetFilesTotal(total){

    filesTotal = Math.max(Number(total) || filesNeeded,1);

}

function DownloadingFile(file){

    filesDownloaded++;

    let progress = (filesDownloaded / filesTotal) * 100;

    updateProgress(progress);

}

function SetStatusChanged(status){

    status = String(status).toLowerCase();

    if(
        status.includes("starting lua") ||
        status.includes("sending client info") ||
        status.includes("client info") ||
        status.includes("workshop complete")
    ){

        updateProgress(100);

    }

}

function GameDetails(servername,url,mapname,maxplayers,steamid,gamemode){

}

/* -------------------------------------- */
/* Music */
/* -------------------------------------- */

function loadMusic(){

    title.innerText = MUSIC_INFO.title;

    author.innerText = MUSIC_INFO.artist;

}

function playMusic(){

    music.volume = 0.10;

    const promise = music.play();

    if(promise){

        promise.catch(()=>{

            const resume = ()=>{

                music.play();

            };

            document.body.addEventListener("click",resume,{once:true});

            document.body.addEventListener("keydown",resume,{once:true});

        });

    }

}

/* -------------------------------------- */

window.onload = ()=>{

    updateProgress(0);

    loadMusic();

    playMusic();

};
