let filesNeeded = 1;
let filesTotal = 1;
let filesDownloaded = 0;

const fill = document.getElementById("progress-fill");
const percent = document.getElementById("percent");
const track = document.getElementById("track-name");
const music = document.getElementById("music");

function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
}

function updateProgress(value) {
    value = clamp(Math.round(value || 0), 0, 100);
    fill.style.width = value + "%";
    percent.innerText = value + "%";
}

function niceTrackName(name) {
    if (!name) return "music.ogg";
    name = String(name).split("/").pop();
    name = name.replace(/\.[^/.]+$/, "");
    name = decodeURIComponent(name);
    name = name.replace(/[_-]+/g, " ");
    return name.trim() || "music.ogg";
}

function SetFilesNeeded(needed) {
    filesNeeded = Math.max(Number(needed) || 1, 1);
    filesTotal = filesNeeded;
    filesDownloaded = 0;
    updateProgress(0);
}

function SetFilesTotal(total) {
    filesTotal = Math.max(Number(total) || filesTotal || 1, 1);
}

function DownloadingFile(fileName) {
    filesDownloaded++;
    const total = filesTotal || filesNeeded || 1;
    updateProgress((filesDownloaded / total) * 100);
}

function SetStatusChanged(status) {
    const s = String(status || "").toLowerCase();

    if (
        s.includes("sending client info") ||
        s.includes("client info") ||
        s.includes("starting lua") ||
        s.includes("workshop complete")
    ) {
        updateProgress(100);
    }
}

function GameDetails(servername, url, mapname, maxplayers, steamid, gamemode) {
    // Не выводим подключение, карту и режим — только фон, загрузка и трек.
}

function tryPlayMusic() {
    if (!music) return;

    music.volume = 0.35;

    const p = music.play();
    if (p && p.catch) {
        p.catch(() => {
            document.body.addEventListener("click", () => music.play(), { once: true });
            document.body.addEventListener("keydown", () => music.play(), { once: true });
        });
    }
}

window.addEventListener("load", () => {
    updateProgress(0);

    const source = music ? music.querySelector("source") : null;
    if (track && source) {
        track.innerText = niceTrackName(source.getAttribute("src"));
    }

    if (music) {
        music.volume = 0.10; // 10% громкости
    }

    tryPlayMusic();
});
