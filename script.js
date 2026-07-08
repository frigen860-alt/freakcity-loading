/*=========================================================
    Z-MUSORKA LOADING SCREEN
    SCRIPT.JS
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

const serverNameEl = document.getElementById("server-name");
const serverMapEl = document.getElementById("server-map");
const loadingFilesEl = document.getElementById("loading-files");

const gridCanvas = document.getElementById("grid-canvas");
const ctx = gridCanvas ? gridCanvas.getContext("2d") : null;

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

function clamp(v, min, max){
    return Math.max(min, Math.min(max, v));
}

function formatTime(sec){
    if(isNaN(sec)) return "00:00";

    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);

    return String(m).padStart(2, "0") + ":" +
           String(s).padStart(2, "0");
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
        (currentTrack + 1) + " / " + PLAYLIST.length;
}

function playTrack(){
    music.volume = DEFAULT_VOLUME;
    music.play().catch(() => {});
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

music.addEventListener("loadedmetadata", () => {
    durationLabel.textContent = formatTime(music.duration);
});

music.addEventListener("timeupdate", () => {
    currentTimeLabel.textContent = formatTime(music.currentTime);

    if(music.duration){
        musicProgress.style.width =
            (music.currentTime / music.duration * 100) + "%";
    }
});

music.addEventListener("play", () => {
    playButton.textContent = "⏸";
});

music.addEventListener("pause", () => {
    playButton.textContent = "▶";
});

music.addEventListener("ended", () => {
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
    target = clamp(target, 0, 100);

    visualProgress += (target - visualProgress) * 0.12;

    progressFill.style.width = visualProgress + "%";
    percent.textContent = Math.floor(visualProgress) + "%";

    if(loadingFilesEl){
        loadingFilesEl.textContent =
            filesDownloaded + " / " + filesTotal + " FILES";
    }

    if(Math.abs(target - visualProgress) > 0.05){
        requestAnimationFrame(() => {
            updateProgress(target);
        });
    }
}

/*=========================================================
    GMOD FUNCTIONS
=========================================================*/

function SetFilesNeeded(count){
    filesNeeded = Math.max(1, Number(count) || 1);
    filesTotal = filesNeeded;
    filesDownloaded = 0;

    updateProgress(0);
}

function SetFilesTotal(total){
    filesTotal = Math.max(Number(total) || filesNeeded, 1);
}

function DownloadingFile(file){
    filesDownloaded++;

    loadingStatus.textContent = "DOWNLOADING FILES";

    updateProgress(filesDownloaded / filesTotal * 100);
}

function SetStatusChanged(status){
    const s = String(status).toLowerCase();

    loadingStatus.textContent = status;

    if(
        s.includes("sending client info") ||
        s.includes("client info") ||
        s.includes("starting lua") ||
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
    if(serverNameEl){
        serverNameEl.textContent = servername || "Z-MUSORKA";
    }

    if(serverMapEl){
        serverMapEl.textContent = mapname || "Loading...";
    }
}

/*=========================================================
    CANVAS GRID
=========================================================*/

function resizeCanvas(){
    if(!gridCanvas || !ctx) return;

    gridCanvas.width = window.innerWidth;
    gridCanvas.height = window.innerHeight;
}

function drawGrid(){
    if(!gridCanvas || !ctx) return;

    const w = gridCanvas.width;
    const h = gridCanvas.height;

    ctx.clearRect(0, 0, w, h);

    const time = performance.now() * 0.001;

    const step = 54;
    const move = (time * 26) % step;

    const mx = (mouseX - 0.5) * 18;
    const my = (mouseY - 0.5) * 18;

    ctx.save();

    ctx.translate(mx, my);

    ctx.lineWidth = 1;

    ctx.strokeStyle = "rgba(255,150,45,0.075)";

    for(let x = -step; x < w + step; x += step){
        const xx = x + move;

        ctx.beginPath();
        ctx.moveTo(xx, 0);
        ctx.lineTo(xx, h);
        ctx.stroke();
    }

    for(let y = -step; y < h + step; y += step){
        const yy = y - move * 0.65;

        ctx.beginPath();
        ctx.moveTo(0, yy);
        ctx.lineTo(w, yy);
        ctx.stroke();
    }

    ctx.fillStyle = "rgba(255,180,75,0.12)";

    for(let x = -step; x < w + step; x += step * 4){
        for(let y = -step; y < h + step; y += step * 4){
            const pulse =
                0.5 + Math.sin(time * 2 + x * 0.01 + y * 0.01) * 0.5;

            ctx.globalAlpha = 0.08 + pulse * 0.12;

            ctx.fillRect(
                x + move - 1,
                y - move * 0.65 - 1,
                3,
                3
            );
        }
    }

    ctx.globalAlpha = 1;

    const waveX = (time * 180) % (w + 400) - 200;

    const grad = ctx.createLinearGradient(
        waveX - 220,
        0,
        waveX + 220,
        0
    );

    grad.addColorStop(0, "rgba(255,140,40,0)");
    grad.addColorStop(0.5, "rgba(255,160,60,0.09)");
    grad.addColorStop(1, "rgba(255,140,40,0)");

    ctx.fillStyle = grad;
    ctx.fillRect(waveX - 220, 0, 440, h);

    ctx.restore();

    requestAnimationFrame(drawGrid);
}

window.addEventListener("resize", resizeCanvas);

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
});

/*=========================================================
    STARTUP
=========================================================*/

window.addEventListener("load", () => {
    resizeCanvas();
    drawGrid();

    loadTrack(START_TRACK);
    updateProgress(0);

    music.volume = DEFAULT_VOLUME;

    music.play().catch(() => {
        const resume = () => {
            music.play().catch(() => {});
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

document.addEventListener("keydown", (e) => {
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
    ERRORS
=========================================================*/

music.addEventListener("error", () => {
    console.warn(
        "[Z-MUSORKA] Не удалось загрузить:",
        music.src
    );
});

window.onerror = function(message){
    console.warn(
        "[Z-MUSORKA]",
        message
    );
};

window.onunhandledrejection = function(e){
    console.warn(
        "[Z-MUSORKA]",
        e.reason
    );
};

/*=========================================================
    GMOD COMPATIBILITY
=========================================================*/

window.SetFilesNeeded = SetFilesNeeded;
window.SetFilesTotal = SetFilesTotal;
window.DownloadingFile = DownloadingFile;
window.SetStatusChanged = SetStatusChanged;
window.GameDetails = GameDetails;

/*=========================================================
    DEBUG
=========================================================*/

console.log("[Z-MUSORKA] Loading Screen Ready");
