// ========= 1. API TOP 100 =========
async function getTop100() {
  const res = await fetch(
    "https://itunes.apple.com/search?term=vietnamese+pop&limit=100"
  );
  const data = await res.json();

  return data.results.map((item) => ({
    title: item.trackName,
    artist: item.artistName,
    image: item.artworkUrl100.replace("100x100", "300x300"),
    file: item.previewUrl,
  }));
}

// ========= 2. DOM =========
const songList = document.getElementById("songList");
const audio = document.getElementById("audio");

const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const footerCover = document.getElementById("footerCover");
const footerTitle = document.getElementById("footerTitle");
const footerArtist = document.getElementById("footerArtist");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const progressBar = document.getElementById("progressBar");

// ========= 3. STATE =========
let allSongs = []; // <-- Lưu danh sách API
let currentIndex = 0;
let isPlaying = false;

// ========= 4. Load danh sách từ API =========
getTop100().then((data) => {
  allSongs = data; // <-- Lưu lại danh sách
  renderList(data);
});

function renderList(songs) {
  songList.innerHTML = "";

  songs.forEach((song, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${song.image}">
      <h4>${song.title}</h4>
      <p>${song.artist}</p>
    `;

    card.onclick = () => {
      currentIndex = index;
      loadSong(allSongs[currentIndex]);
      playSong();
    };

    songList.appendChild(card);
  });
}

// ========= 5. LOAD SONG =========
function loadSong(song) {
  audio.src = song.file;
  cover.src = song.image;
  title.textContent = song.title;
  artist.textContent = song.artist;

  footerCover.src = song.image;
  footerTitle.textContent = song.title;
  footerArtist.textContent = song.artist;
}

// ========= 6. PLAY / PAUSE =========
function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.textContent = "⏸️";
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.textContent = "▶️";
}

playBtn.onclick = () => {
  isPlaying ? pauseSong() : playSong();
};

// ========= 7. NEXT / PREV =========
nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % allSongs.length;
  loadSong(allSongs[currentIndex]);
  playSong();
};

prevBtn.onclick = () => {
  currentIndex = (currentIndex - 1 + allSongs.length) % allSongs.length;
  loadSong(allSongs[currentIndex]);
  playSong();
};

// ========= 8. PROGRESS BAR =========
audio.ontimeupdate = () => {
  if (!audio.duration) return;
  progressBar.value = (audio.currentTime / audio.duration) * 100;
};

progressBar.oninput = () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
};
