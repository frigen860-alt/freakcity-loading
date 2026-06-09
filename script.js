let filesNeeded = 1;
let filesDownloaded = 0;

const fill = document.getElementById("progress-fill");
const percent = document.getElementById("percent");
const track = document.getElementById("track-name");

function niceTrackName(name) {
    if (!name) return "music.ogg";

    name = name.split("/").pop();
    name = name.replace(/\.[^/.]+$/, "");
    name = decodeURIComponent(name);
    name = name.replace(/[_-]+/g, " ");

    return name.trim() || "music.mp3";
}

function updateProgress(value) {
    value = Math.max(0, Math.min(100, Math.round(value)));
    fill.style.width = value + "%";
    percent.innerText = value + "%";
}

function SetFilesNeeded(needed) {
    filesNeeded = Math.max(Number(needed) || 1, 1);
    filesDownloaded = 0;
    updateProgress(0);
}

function DownloadingFile(fileName) {
    filesDownloaded++;
    updateProgress((filesDownloaded / filesNeeded) * 100);
}

function SetStatusChanged(status) {
    if (!status) return;

    const lower = String(status).toLowerCase();

    if (lower.includes("sending client info") || lower.includes("client info")) {
        updateProgress(100);
    }
}

function GameDetails(servername, url, map, maxplayers, steamid, gamemode) {
    // Можно дописать вывод карты/режима, если захочешь.
}

window.addEventListener("load", () => {
    updateProgress(0);

    const audio = document.getElementById("music");
    const source = audio ? audio.querySelector("source") : null;

    if (source && source.getAttribute("src")) {
        track.innerText = niceTrackName(source.getAttribute("src"));
    }

    // На случай если GMod не отдаёт события загрузки сразу — лёгкая стартовая анимация.
    let fake = 0;
    const fakeTimer = setInterval(() => {
        if (filesDownloaded > 0) {
            clearInterval(fakeTimer);
            return;
        }

        fake = Math.min(fake + 1, 18);
        updateProgress(fake);

        if (fake >= 18) clearInterval(fakeTimer);
    }, 180);
});
