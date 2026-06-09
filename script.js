let filesNeeded = 1;
let filesTotal = 1;
let filesDownloaded = 0;

const fill = document.getElementById("progress-fill");
const percent = document.getElementById("percent");

function updateProgress(value) {
    value = Math.max(0, Math.min(100, Math.round(value)));
    fill.style.width = value + "%";
    percent.innerText = value + "%";
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

    let total = filesTotal || filesNeeded || 1;
    updateProgress((filesDownloaded / total) * 100);
}

function SetStatusChanged(status) {
    const text = String(status || "").toLowerCase();

    if (
        text.includes("sending client info") ||
        text.includes("starting lua") ||
        text.includes("client info")
    ) {
        updateProgress(100);
    }
}

function GameDetails(servername, url, mapname, maxplayers, steamid, gamemode) {
    // Тут можно вывести карту или режим, если захочешь.
}

window.addEventListener("load", () => {
    updateProgress(0);

    const track = document.getElementById("track-name");
    if (track) {
        track.innerText = "music.ogg";
    }
});
