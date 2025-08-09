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

let index = 0;

function showData(el) {
  const { musicName, singerName, url, poster } = el;
  musicNameEl.textContent = musicName;
  singerNameEl.textContent = singerName;
  imageCoverEl.setAttribute("src", poster);
  imageCoverEl.setAttribute("alt", musicName);
  audio.setAttribute("src", url);
}

function playPauseAudio() {
  if (audio.paused) {
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
  index++;
  if (index > musics.length - 1) index = 0;
  showData(musics[index]);
  setTimeout(playPauseAudio, 500);
}

function prevAudio() {
  index--;
  if (index < 0) index = musics.length - 1;
  showData(musics[index]);
  setTimeout(playPauseAudio, 500);
}

// HANDLE MUSIC SOUNDS
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

// SEEK TO CURRENT PART OF MUSIC
seekSlider.addEventListener("input", () => {
  const newTime = audio.duration * (seekSlider.value / 100);
  audio.currentTime = newTime;
  console.log(newTime);
});

audio.addEventListener("timeupdate", () => {
  const currentTime = audio.currentTime;
  const totalTime = audio.duration;

  const percentage = (currentTime / totalTime) * 100;

  if (percentage) {
    seekSlider.value = percentage;
  }

  if ((currentTime, totalTime)) {
    currentTimeEl.textContent = formatTime(currentTime);
    totalTimeEl.textContent = formatTime(totalTime);
  }
});

const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

// RESET MUSIC INFORMATION WHEN AUDIO ENDS
audio.addEventListener("ended", () => {
  audio.pause();
  document.body.classList.remove("active");
  playPauseBtn.classList.remove("active");
});

playPauseBtn.addEventListener("click", playPauseAudio);
nextBtn.addEventListener("click", nextAudio);
prevBtn.addEventListener("click", prevAudio);
// shuffleBtn.addEventListener("click", random);

audio.addEventListener("loadedmetadata", () => {
  totalTimeEl.textContent = formatTime(audio.duration);
});
showData(musics[index]);
