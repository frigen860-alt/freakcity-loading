/*=========================================================
    Z-MUSORKA LOADING SCREEN
    SCRIPT.JS
    PART 1 / 3
=========================================================*/

/*=========================================================
    PLAYLIST
=========================================================*/

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

const serverName = document.getElementById("server-name");
const serverMap = document.getElementById("server-map");

const loadingFiles = document.getElementById("loading-files");

const background = document.getElementById("background");

const ambient = document.getElementById("ambient-light");

const backgroundLogo = document.getElementById("background-logo");

/*=========================================================
    VARIABLES
=========================================================*/

let currentTrack = START_TRACK;

let filesNeeded = 1;

let filesTotal = 1;

let filesDownloaded = 0;

let visualProgress = 0;

let mouseX = 0;

let mouseY = 0;

/*=========================================================
    HELPERS
=========================================================*/

function clamp(value,min,max){

    return Math.max(min,Math.min(max,value));

}

function formatTime(sec){

    if(isNaN(sec))
        return "00:00";

    const m = Math.floor(sec / 60);

    const s = Math.floor(sec % 60);

    return String(m).padStart(2,"0") +
        ":" +
        String(s).padStart(2,"0");

}

/*=========================================================
    MUSIC
=========================================================*/

function loadTrack(index){

    currentTrack = index;

    const track = PLAYLIST[currentTrack];

    music.pause();

    music.src = track.file + "?v=" + Date.now();

    music.load();

    title.textContent = track.title;

    author.textContent = track.artist;

    playlistCounter.textContent =
        (currentTrack + 1) +
        " / " +
        PLAYLIST.length;

}

function playTrack(){

    music.volume = DEFAULT_VOLUME;

    music.play().catch(()=>{});

    playButton.textContent = "⏸";

}

function pauseTrack(){

    music.pause();

    playButton.textContent = "▶";

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

    if(currentTrack >= PLAYLIST.length){

        currentTrack = 0;

    }

    loadTrack(currentTrack);

    playTrack();

}

function previousTrack(){

    currentTrack--;

    if(currentTrack < 0){

        currentTrack = PLAYLIST.length - 1;

    }

    loadTrack(currentTrack);

    playTrack();

}

/*=========================================================
    BUTTONS
=========================================================*/

playButton.onclick = toggleMusic;

nextButton.onclick = nextTrack;

prevButton.onclick = previousTrack;

/*=========================================================
    AUDIO EVENTS
=========================================================*/

music.addEventListener("loadedmetadata",()=>{

    durationLabel.textContent =
        formatTime(music.duration);

});

music.addEventListener("timeupdate",()=>{

    currentTimeLabel.textContent =
        formatTime(music.currentTime);

    if(music.duration){

        musicProgress.style.width =
            (music.currentTime /
            music.duration * 100) + "%";

    }

});

music.addEventListener("play",()=>{

    playButton.textContent = "⏸";

});

music.addEventListener("pause",()=>{

    playButton.textContent = "▶";

});

music.addEventListener("ended",()=>{

    if(AUTO_NEXT){

        nextTrack();

    }else{

        pauseTrack();

    }

});
/*=========================================================
    Z-MUSORKA LOADING SCREEN
    SCRIPT.JS
    PART 1 / 3
=========================================================*/

/*=========================================================
    PLAYLIST
=========================================================*/

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

const serverName = document.getElementById("server-name");
const serverMap = document.getElementById("server-map");

const loadingFiles = document.getElementById("loading-files");

const background = document.getElementById("background");

const ambient = document.getElementById("ambient-light");

const backgroundLogo = document.getElementById("background-logo");

/*=========================================================
    VARIABLES
=========================================================*/

let currentTrack = START_TRACK;

let filesNeeded = 1;

let filesTotal = 1;

let filesDownloaded = 0;

let visualProgress = 0;

let mouseX = 0;

let mouseY = 0;

/*=========================================================
    HELPERS
=========================================================*/

function clamp(value,min,max){

    return Math.max(min,Math.min(max,value));

}

function formatTime(sec){

    if(isNaN(sec))
        return "00:00";

    const m = Math.floor(sec / 60);

    const s = Math.floor(sec % 60);

    return String(m).padStart(2,"0") +
        ":" +
        String(s).padStart(2,"0");

}

/*=========================================================
    MUSIC
=========================================================*/

function loadTrack(index){

    currentTrack = index;

    const track = PLAYLIST[currentTrack];

    music.pause();

    music.src = track.file + "?v=" + Date.now();

    music.load();

    title.textContent = track.title;

    author.textContent = track.artist;

    playlistCounter.textContent =
        (currentTrack + 1) +
        " / " +
        PLAYLIST.length;

}

function playTrack(){

    music.volume = DEFAULT_VOLUME;

    music.play().catch(()=>{});

    playButton.textContent = "⏸";

}

function pauseTrack(){

    music.pause();

    playButton.textContent = "▶";

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

    if(currentTrack >= PLAYLIST.length){

        currentTrack = 0;

    }

    loadTrack(currentTrack);

    playTrack();

}

function previousTrack(){

    currentTrack--;

    if(currentTrack < 0){

        currentTrack = PLAYLIST.length - 1;

    }

    loadTrack(currentTrack);

    playTrack();

}

/*=========================================================
    BUTTONS
=========================================================*/

playButton.onclick = toggleMusic;

nextButton.onclick = nextTrack;

prevButton.onclick = previousTrack;

/*=========================================================
    AUDIO EVENTS
=========================================================*/

music.addEventListener("loadedmetadata",()=>{

    durationLabel.textContent =
        formatTime(music.duration);

});

music.addEventListener("timeupdate",()=>{

    currentTimeLabel.textContent =
        formatTime(music.currentTime);

    if(music.duration){

        musicProgress.style.width =
            (music.currentTime /
            music.duration * 100) + "%";

    }

});

music.addEventListener("play",()=>{

    playButton.textContent = "⏸";

});

music.addEventListener("pause",()=>{

    playButton.textContent = "▶";

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

    target = clamp(target,0,100);

    visualProgress +=
        (target - visualProgress) * 0.12;

    progressFill.style.width =
        visualProgress + "%";

    percent.textContent =
        Math.floor(visualProgress) + "%";

    if(loadingFiles){

        loadingFiles.textContent =
            filesDownloaded +
            " / " +
            filesTotal +
            " FILES";

    }

    if(Math.abs(target - visualProgress) > 0.05){

        requestAnimationFrame(function(){

            updateProgress(target);

        });

    }

}

/*=========================================================
    GMOD
=========================================================*/

function SetFilesNeeded(count){

    filesNeeded =
        Math.max(1,Number(count)||1);

    filesTotal = filesNeeded;

    filesDownloaded = 0;

    updateProgress(0);

}

function SetFilesTotal(total){

    filesTotal =
        Math.max(
            Number(total)||filesNeeded,
            1
        );

}

function DownloadingFile(file){

    filesDownloaded++;

    loadingStatus.textContent =
        "DOWNLOADING FILES";

    updateProgress(

        filesDownloaded /
        filesTotal *
        100

    );

}

function SetStatusChanged(status){

    loadingStatus.textContent =
        status;

    const s =
        String(status).toLowerCase();

    if(

        s.indexOf("sending client info")!=-1 ||

        s.indexOf("client info")!=-1 ||

        s.indexOf("starting lua")!=-1 ||

        s.indexOf("workshop complete")!=-1 ||

        s.indexOf("finished")!=-1

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

    if(serverName){

        serverName.textContent =
            servername ||
            "Z-MUSORKA";

    }

    if(serverMap){

        serverMap.textContent =
            mapname ||
            "Loading...";

    }

}

/*=========================================================
    PARALLAX
=========================================================*/

document.addEventListener(

    "mousemove",

    function(e){

        mouseX =
            e.clientX /
            window.innerWidth;

        mouseY =
            e.clientY /
            window.innerHeight;

    }

);

function updateParallax(){

    const px =
        (mouseX - .5) * 18;

    const py =
        (mouseY - .5) * 18;

    if(background){

        background.style.transform =
            "translate("+
            (px*.15)+"px,"+
            (py*.15)+"px)";

    }

    if(backgroundLogo){

        backgroundLogo.style.transform =
            "translate(calc(-50% + "+
            (px*.35)+
            "px),calc(-50% + "+
            (py*.35)+
            "px))";

    }

    if(ambient){

        ambient.style.transform =
            "translate("+
            (px*.25)+"px,"+
            (py*.25)+"px)";

    }

    requestAnimationFrame(
        updateParallax
    );

}
/*=========================================================
    STARTUP
=========================================================*/

window.addEventListener("load",function(){

    loadTrack(START_TRACK);

    updateProgress(0);

    updateParallax();

    music.volume = DEFAULT_VOLUME;

    music.play().catch(function(){

        function resume(){

            music.play().catch(function(){});

        }

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

document.addEventListener("keydown",function(e){

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
    BACKGROUND ANIMATION
=========================================================*/

(function(){

    const glow =
        document.getElementById("bg-glow");

    const light =
        document.getElementById("grid-light");

    let t = 0;

    function animate(){

        t += 0.01;

        if(glow){

            glow.style.opacity =
                0.85 + Math.sin(t)*0.15;

            glow.style.filter =
                "blur(" +
                (90 + Math.sin(t*0.6)*15) +
                "px)";

        }

        if(light){

            light.style.backgroundPosition =
                (t*80) + "px " +
                (t*45) + "px";

        }

        requestAnimationFrame(animate);

    }

    animate();

})();

/*=========================================================
    ERRORS
=========================================================*/

music.addEventListener("error",function(){

    console.warn(
        "[Z-MUSORKA] Music error:",
        music.src
    );

});

window.onerror = function(msg){

    console.warn(
        "[Z-MUSORKA]",
        msg
    );

};

window.onunhandledrejection = function(e){

    console.warn(
        "[Z-MUSORKA]",
        e.reason
    );

};

/*=========================================================
    GMOD EXPORT
=========================================================*/

window.SetFilesNeeded = SetFilesNeeded;
window.SetFilesTotal = SetFilesTotal;
window.DownloadingFile = DownloadingFile;
window.SetStatusChanged = SetStatusChanged;
window.GameDetails = GameDetails;

/*=========================================================
    DEBUG
=========================================================*/

console.log(
    "[Z-MUSORKA] Ready"
);
