const musics = [
  {
    musicName: "You dont know",
    singerName: "50Cent-eminem-rihanna",
    url: "assets/music/01.50cent.eminem.rihanna.mp3",
    poster: "assets/img/you-dont-know.jpg",
  },
  {
    musicName: "Goddamn",
    singerName: "Baggie-2Pac",
    url: "assets/music/01.2Pac Biggie Tyga - Goddamn.mp3",
    poster: "assets/img/freestyle-2pacBaggi.jpg",
  },
  {
    musicName: "Tuesday",
    singerName: "Borakyeter-2Pac",
    url: "assets/music/2pac & Burak Yeter - Tuesday.mp3",
    poster: "assets/img/burak-yuter.jpg",
  },
  {
    musicName: "Rap God",
    singerName: "Eminem",
    url: "assets/music/Eminem - Rap God.mp3",
    poster: "assets/img/rap-god-eminem.jpg",
  },
  {
    musicName: "Love The Way You Lie",
    singerName: "Eminem ft Rihanna",
    url: "assets/music/03.Eminem - Love The Way You Lie (ft. Rihanna).mp3",
    poster: "assets/img/Love-The-Way-You-Lie.jpg",
  },
  {
    musicName: "LOCK AT ME",
    singerName: "XXXTentacion",
    url: "assets/music/04.XXXTENTACION - Look At Me (Sakura Remix).mp3",
    poster: "assets/img/look-at-me.jpg",
  },
  {
    musicName: "Only fear of death",
    singerName: "2Pac",
    url: "assets/music/05.2Pac @AHANG_SiSTEM - Only Fear of Death (HAYASA G Remix).mp3",
    poster: "assets/img/Only-Fear-of-Death.jpg",
  },
];

// Elements
const audio = document.getElementById("audio");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const playPauseBtn = document.getElementById("play-pause-btn");
const singerNameEl = document.querySelector(".singer-name");
const musicNameEl = document.querySelector(".music-name");
const imageCoverEl = document.querySelector(".img-cover");
const totalTimeEl = document.querySelector(".total-time");
const currentTimeEl = document.querySelector(".current-time");
const volumeSlider = document.querySelector(".volume-slider");
const seekSlider = document.querySelector(".seek-slider");
const shuffleBtn = document.querySelector(".shuffle-buttons");
const repeatBtn = document.querySelector(".repeat");
const shuffleBtnText = document.querySelector(".shuffle-text");
const playlistEl = document.querySelector(".playlist-items");
const playlistBtn = document.querySelectorAll(".playlist-btn");
const menuShuffleBtn = document.querySelector(".menu-shuffle-btn");
const menuPlayBtn = document.querySelector(".menu-play-btn");

let index = 0;
let isPlaying = false;
let random = false;
let isRepeat = false;
// creat playlist
function showPlaylist(music) {
  music.forEach((el) => {
    const { musicName, singerName, url, poster } = el;
    const item = `<div class="music-item">
    <img class="music-poster" src="${poster}" alt="${musicName}" />
    <div class="music-info">
    <p class="music-song-name">${musicName}</p>
    <p class="music-singer-name">${singerName}</p>
    </div>
    </div>`;
    playlistEl.innerHTML += item;
  });
}
showPlaylist(musics);

// load playlist musics
const musicItems = document.querySelectorAll(".music-item");
musicItems.forEach((item, i) => {
  item.addEventListener("click", () => {
    musicItems.forEach((item) => item.classList.remove("active"));
    loadMusic(musics[i], i);
    showMenu();
    playPauseAudio();
  });
});

function showMenu() {
  playlistEl.parentNode.classList.toggle("active");
}

function loadMusic(el, i = 0) {
  const { musicName, singerName, url, poster } = el;
  musicNameEl.textContent = musicName;
  singerNameEl.textContent = singerName;
  imageCoverEl.setAttribute("src", poster);
  imageCoverEl.setAttribute("alt", musicName);
  audio.setAttribute("src", url);
  musicItems[i].classList.add("active");
}

function changePlayMode() {
  isPlaying = !isPlaying;
  playPauseAudio();
}

function playPauseAudio() {
  if (isPlaying) {
    document.body.classList.add("active");
    playPauseBtn.classList.add("active");
    audio.play();
  } else {
    document.body.classList.remove("active");
    playPauseBtn.classList.remove("active");
    audio.pause();
  }
}

function nextAudio() {
  if (random) randomIndex();
  else {
    index++;
    if (index > musics.length - 1) index = 0;
  }
  loadMusic(musics[index]);
  playPauseAudio();
  musicItems.forEach((item) => item.classList.remove("active"));
  musicItems[index].classList.add("active");
}

function prevAudio() {
  if (random) randomIndex();
  else {
    index--;
    if (index < 0) index = musics.length - 1;
  }

  loadMusic(musics[index]);
  playPauseAudio();
  musicItems.forEach((item) => item.classList.remove("active"));
  musicItems[index].classList.add("active");
}

function randomIndex() {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * musics.length);
  } while (newIndex === index);
  index = newIndex;
  return index;
}

function formatTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function randomMusic() {
  random = !random;
  shuffleBtn.classList.toggle("active");
  shuffleBtn.classList.contains("active")
    ? (shuffleBtnText.textContent = "shuffle-On")
    : (shuffleBtnText.textContent = "shuffle-Off");
}

// RESET MUSIC INFORMATION WHEN AUDIO ENDS
playlistBtn.forEach((btn) => {
  btn.addEventListener("click", showMenu);
});
menuPlayBtn.addEventListener("click", changePlayMode);
menuShuffleBtn.addEventListener("click", randomMusic);
playPauseBtn.addEventListener("click", changePlayMode);
nextBtn.addEventListener("click", nextAudio);
prevBtn.addEventListener("click", prevAudio);
shuffleBtn.addEventListener("click", randomMusic);

// HANDLE MUSIC SOUNDS
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

// SEEK TO CURRENT PART OF MUSIC
seekSlider.addEventListener("input", () => {
  const newTime = audio.duration * (seekSlider.value / 100);
  audio.currentTime = newTime;
});

audio.addEventListener("timeupdate", () => {
  const percentage = (audio.currentTime / audio.duration) * 100 || 0;

  if (percentage) {
    seekSlider.value = percentage;
  }

  currentTimeEl.textContent = formatTime(audio.currentTime);
});

// show total music time
audio.addEventListener("loadedmetadata", () => {
  totalTimeEl.textContent = formatTime(audio.duration);
});

repeatBtn.addEventListener("click", () => {
  repeatBtn.classList.toggle("active");
  isRepeat = !isRepeat;
});

// RESET MUSIC INFORMATION WHEN AUDIO ENDS
audio.addEventListener("ended", () => {
  if (isRepeat) {
    setTimeout(() => {
      playPauseAudio();
    }, 800);
  } else {
    if (isPlaying) nextAudio();
  }
});

loadMusic(musics[index]);
