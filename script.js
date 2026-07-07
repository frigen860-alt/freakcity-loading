/*=========================================================
    Z-MUSORKA LOADING SCREEN
    PART 1 / 3
=========================================================*/

/*=========================================================
    PLAYLIST
=========================================================*/

const PLAYLIST = [

{
    file:"music.ogg",
    title:"Леди Совершенство",
    artist:"Мэри Поппинс"
},

{
    file:"music2.ogg",
    title:"Второй трек",
    artist:"Исполнитель"
},

{
    file:"music3.ogg",
    title:"Третий трек",
    artist:"Исполнитель"
}

];

/*=========================================================
    SETTINGS
=========================================================*/

const START_TRACK = 0;

const AUTO_NEXT = false;

const DEFAULT_VOLUME = 0.10;

/*=========================================================
    ELEMENTS
=========================================================*/

const music = document.getElementById("music");

const title = document.getElementById("music-title");
const author = document.getElementById("music-author");

const playButton = document.getElementById("play-track");
const nextButton = document.getElementById("next-track");
const prevButton = document.getElementById("prev-track");

const playlistCounter = document.getElementById("playlist-count");

const currentTimeLabel = document.getElementById("current-time");
const durationLabel = document.getElementById("duration");

const musicProgress = document.getElementById("music-progress-fill");

const progressFill = document.getElementById("progress-fill");
const percent = document.getElementById("percent");
const loadingStatus = document.getElementById("loading-status");

/*=========================================================
    VARIABLES
=========================================================*/

let currentTrack = START_TRACK;

let filesNeeded = 1;
let filesTotal = 1;
let filesDownloaded = 0;

let visualProgress = 0;

/*=========================================================
    HELPERS
=========================================================*/

function clamp(v,min,max){

    return Math.max(min,Math.min(max,v));

}

function formatTime(sec){

    if(isNaN(sec)) return "00:00";

    const m=Math.floor(sec/60);
    const s=Math.floor(sec%60);

    return String(m).padStart(2,"0")+":"+
           String(s).padStart(2,"0");

}

/*=========================================================
    MUSIC
=========================================================*/

function loadTrack(index){

    currentTrack=index;

    const track=PLAYLIST[currentTrack];

    music.pause();

    music.src=track.file+"?v="+Date.now();

    music.load();

    title.textContent=track.title;
    author.textContent=track.artist;

    playlistCounter.textContent=
        (currentTrack+1)+" / "+PLAYLIST.length;

}

function playTrack(){

    music.volume=DEFAULT_VOLUME;

    music.play().catch(()=>{});

    playButton.textContent="⏸";

}

function pauseTrack(){

    music.pause();

    playButton.textContent="▶";

}

function toggleMusic(){

    if(music.paused){

        playTrack();

    }else{

        pauseTrack();

    }

}

function nextTrack(){

    currentTrack++;

    if(currentTrack>=PLAYLIST.length)
        currentTrack=0;

    loadTrack(currentTrack);

    playTrack();

}

function previousTrack(){

    currentTrack--;

    if(currentTrack<0)
        currentTrack=PLAYLIST.length-1;

    loadTrack(currentTrack);

    playTrack();

}

/*=========================================================
    BUTTONS
=========================================================*/

playButton.onclick=toggleMusic;

nextButton.onclick=nextTrack;

prevButton.onclick=previousTrack;

/*=========================================================
    AUDIO EVENTS
=========================================================*/

music.addEventListener("loadedmetadata",()=>{

    durationLabel.textContent=
        formatTime(music.duration);

});

music.addEventListener("timeupdate",()=>{

    currentTimeLabel.textContent=
        formatTime(music.currentTime);

    if(music.duration){

        musicProgress.style.width=

            (music.currentTime/music.duration*100)+"%";

    }

});

music.addEventListener("play",()=>{

    playButton.textContent="⏸";

});

music.addEventListener("pause",()=>{

    playButton.textContent="▶";

});

music.addEventListener("ended",()=>{

    if(AUTO_NEXT){

        nextTrack();

    }else{

        pauseTrack();

    }

});

/*=========================================================
    LOADING BAR
=========================================================*/

function updateProgress(target){

    target=clamp(target,0,100);

    visualProgress+=

        (target-visualProgress)*0.12;

    progressFill.style.width=

        visualProgress+"%";

    percent.textContent=

        Math.floor(visualProgress)+"%";

    if(Math.abs(target-visualProgress)>0.05){

        requestAnimationFrame(()=>{

            updateProgress(target);

        });

    }

}

/*=========================================================
    GARRY'S MOD
=========================================================*/

function SetFilesNeeded(count){

    filesNeeded=Math.max(1,Number(count)||1);

    filesDownloaded=0;

    updateProgress(0);

}

function SetFilesTotal(total){

    filesTotal=Math.max(

        Number(total)||filesNeeded,

        1

    );

}

function DownloadingFile(file){

    filesDownloaded++;

    loadingStatus.textContent=

        "DOWNLOADING FILES";

    updateProgress(

        filesDownloaded/filesTotal*100

    );

}

function SetStatusChanged(status){

    const s=String(status).toLowerCase();

    loadingStatus.textContent=status;

    if(

        s.includes("sending client info") ||

        s.includes("client info")

    ){

        updateProgress(100);

    }

    if(

        s.includes("starting lua")

    ){

        updateProgress(100);

    }

    if(

        s.includes("workshop complete")

    ){

        updateProgress(100);

    }

}

function GameDetails(

    servername,

    serverurl,

    mapname,

    maxplayers,

    steamid,

    gamemode

){

}
/*=========================================================
    STARTUP
=========================================================*/

window.addEventListener("load",()=>{

    loadTrack(START_TRACK);

    updateProgress(0);

    music.volume=DEFAULT_VOLUME;

    music.play().catch(()=>{

        const resume=()=>{

            music.play().catch(()=>{});

        };

        document.body.addEventListener(
            "click",
            resume,
            {once:true}
        );

        document.body.addEventListener(
            "keydown",
            resume,
            {once:true}
        );

    });

});

/*=========================================================
    HOTKEYS
=========================================================*/

document.addEventListener("keydown",(e)=>{

    switch(e.code){

        case "Space":

            e.preventDefault();

            toggleMusic();

        break;

        case "ArrowRight":

            nextTrack();

        break;

        case "ArrowLeft":

            previousTrack();

        break;

    }

});

/*=========================================================
    EXTRA
=========================================================*/

music.addEventListener("error",()=>{

    console.warn(
        "[Z-MUSORKA] Не удалось загрузить:",
        music.src
    );

});

window.onerror=function(message){

    console.warn(
        "[Z-MUSORKA]",
        message
    );

};

window.onunhandledrejection=function(e){

    console.warn(
        "[Z-MUSORKA]",
        e.reason
    );

};

/*=========================================================
    GMod Compatibility
=========================================================*/

window.SetFilesNeeded=SetFilesNeeded;
window.SetFilesTotal=SetFilesTotal;
window.DownloadingFile=DownloadingFile;
window.SetStatusChanged=SetStatusChanged;
window.GameDetails=GameDetails;

/*=========================================================
    Debug
=========================================================*/

console.log(
    "[Z-MUSORKA] Loading Screen Ready"
);
