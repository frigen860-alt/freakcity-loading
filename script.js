const PLAYLIST = [

{
    file: "music.ogg",
    title: "Леди Совершенство",
    artist: "Мэри Поппинс"
},

{
    file: "music2.ogg",
    title: "Второй трек",
    artist: "Исполнитель"
},

{
    file: "music3.ogg",
    title: "Третий трек",
    artist: "Исполнитель"
}

];

/*
0 = music1
1 = music2
2 = music3
*/

const START_TRACK = 0;

let filesNeeded = 1;
let filesTotal = 1;
let filesDownloaded = 0;

const progressFill = document.getElementById("progress-fill");
const percent = document.getElementById("percent");

const music = document.getElementById("music");

const title = document.getElementById("music-title");
const author = document.getElementById("music-author");
const prevBtn = document.getElementById("prev-track");
const nextBtn = document.getElementById("next-track");
const playBtn = document.getElementById("play-track");

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

let currentTrack = START_TRACK;

function loadMusic(){

    const track = PLAYLIST[currentTrack];

    title.innerText = track.title;
    author.innerText = track.artist;

    music.src = track.file;

}

function playMusic(){

    music.volume = 0.10;

    music.currentTime = 0;

    music.play().catch(()=>{

        const resume = ()=>{

            music.play();

        };

        document.body.addEventListener("click",resume,{once:true});
        document.body.addEventListener("keydown",resume,{once:true});

    });

}

/* -------------------------------------- */

window.onload = ()=>{

    updateProgress(0);

    loadMusic();
    music.load();

    playMusic();

};


music.addEventListener("ended",()=>{

    console.log("Трек закончился.");

});

prevBtn.onclick = ()=>{

    currentTrack--;

    if(currentTrack < 0)
        currentTrack = PLAYLIST.length - 1;

    loadMusic();
    music.load();
    music.play();

};

nextBtn.onclick = ()=>{

    currentTrack++;

    if(currentTrack >= PLAYLIST.length)
        currentTrack = 0;

    loadMusic();
    music.load();
    music.play();

};

playBtn.onclick = ()=>{

    if(music.paused)
        music.play();
    else
        music.pause();

};
