// Audio and DOM element references
const audio = new Audio("mina-song.mp3");
const lockBtnScreen = document.querySelector(".fa-lock");
const volumeIncrease = document.querySelector(".volume-increase");
const volumeDecrease = document.querySelector(".volume-decrease");
const lightBulb = document.querySelector(".fa-lightbulb");
const play = document.querySelector(".fa-play");
const seekBar = document.querySelector(".range");
const timeDisplay = document.querySelector(".time-display");
const lockBtnBody = document.querySelector(".lock-button");
const bar = document.querySelector(".bar");
const phone = document.querySelector(".phone");
const previous = document.querySelector(".fa-backward");
const next = document.querySelector(".fa-forward");
const camera = document.querySelector(".fa-camera");

// Event listeners

// Update seekBar on audio timeupdate
audio.addEventListener("timeupdate", () => {
  let aC = audio.currentTime;
  let aD = audio.duration;
  seekBar.value = (aC * 100) / aD;

  if (aC === aD) {
    audio.play();
  }
});

// Previous and next button functionality
previous.addEventListener("click", () => {
  audio.currentTime = 0;
});

next.addEventListener("click", () => {
  audio.currentTime = audio.duration;
});

// Update audio time on seekBar input change
seekBar.addEventListener("input", () => {
  const aD = audio.duration;
  const newTime = (seekBar.value * aD) / 100;
  audio.currentTime = newTime;
});

// Update time display every second
setInterval(() => {
  const now = new Date();
  let hours = now.getHours() % 12 || 12;
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  timeDisplay.innerText = `${hours}:${minutes}`;
}, 1000);

// Update date display every day
// Update date display every second (for testing purposes)
setInterval(updateDate, 1000);

function updateDate() {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const now = new Date();
  const dayOfWeek = daysOfWeek[now.getDay()];
  const dayOfMonth = now.getDate();
  const month = monthsOfYear[now.getMonth()];

  const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month}`;
  document.querySelector("#day").innerText = formattedDate;
}

// Toggle shake animation on lockBtnScreen click
lockBtnScreen.addEventListener("click", () => {
  lockBtnScreen.classList.toggle("fa-shake");
  setTimeout(() => {
    lockBtnScreen.classList.toggle("fa-shake");
  }, 1000);
});
// Handle bar click animation
bar.addEventListener("click", () => {
  // play.classList.toggle(".fa-play")
  setTimeout(() => {
    const afterElement = document.createElement("div");
    afterElement.classList.add("blur-overlay");
    phone.appendChild(afterElement);
  }, 200);
  lockBtnScreen.classList.add("fa-lock-open");
  setTimeout(() => {
    document.querySelector(".music-player").style.transform =
      "translateY(-800%)";
    timeDisplay.style.transform = "translateY(-100%)";
    lockBtnScreen.style.transform = "translateY(-400%)";
    document.querySelector(".day").style.transform = "translateY(-800%)";
    lightBulb.style.transform = "translateX(-200%)";
    camera.style.transform = "translateX(200%)";
    bar.classList.remove("bounce");
  }, 400);
  // document.querySelector(".status").style.transform = "translatexY(0%)";
  // audio.pause();
  setTimeout(() => {
    document.querySelector(".music-player").style.opacity = "0";
  }, 200);

  document.querySelector(".body-2").style.top = "120px";
  document.querySelector(".body-2").style.left = "600px";
  setTimeout(() => {
    document.querySelector(".body-2").style.opacity = "1";
  }, 250);
  bar.style.setProperty("--bar-content", "none");
});

// Handle lockBtnBody click animation
lockBtnBody.addEventListener("click", () => {
  bar.style.setProperty("--bar-content", '"Swipe up to unlock"');
  document.querySelector(".body-2").style.opacity = "0";
  const afterElement = document.querySelector(".blur-overlay");
  if (afterElement) {
    phone.removeChild(afterElement); // Remove the blur overlay
  }
  // document.querySelector(".body-2").style.opacity = "0";
  setTimeout(() => {
    document.querySelector(".body-2").style.top = "800px";
  }, 300);
  setTimeout(() => {
    document.querySelector(".music-player").style.transform = "translateY(0%)";
    lightBulb.style.transform = "translateX(0%)";
    camera.style.transform = "translateX(0%)";
    timeDisplay.style.transform = "translateX(0%)";
    lockBtnScreen.style.transform = "translateY(0%)";
    setTimeout(() => {
      document.querySelector(".day").style.transform = "translateY(0%)";
      document.querySelector(".music-player").style.opacity = "1";
    }, 100);
  }, 100);
  lockBtnScreen.classList.remove("fa-lock-open");
  lockBtnScreen.classList.add("fa-lock");
  bar.classList.add("bounce");
});


// Toggle light bulb icon and background color
lightBulb.addEventListener("click", () => {
  lightBulb.classList.toggle("fa-solid");
  lightBulb.classList.toggle("fa-regular");
  if (lightBulb.classList.contains("fa-regular")) {
    document.body.style.backgroundColor = "rgb(40, 40, 40)";
    document.querySelector(".phone-container").classList.add("shadow");
  } else {
    document.body.style.backgroundColor = "white";
    document.querySelector(".phone-container").classList.remove("shadow");
  }
});

// Toggle play/pause and rotate icon on play click
play.addEventListener("click", () => {
  play.classList.toggle("fa-pause");
  play.classList.toggle("fa-play");
  if (play.classList.contains("fa-pause")) {
    audio.play();
    document.querySelector(".fa-circle-notch").classList.add("rotate");
    document.querySelector("#trav").classList.toggle("traversing");
  } else {
    audio.pause();
    document.querySelector(".fa-circle-notch").classList.remove("rotate");
    document.querySelector("#trav").classList.toggle("traversing");
  }
});

// Increase volume on volumeIncrease click
volumeIncrease.addEventListener("click", () => {
  audio.volume += 0.1;
});

// Decrease volume on volumeDecrease click
volumeDecrease.addEventListener("click", () => {
  audio.volume -= 0.1;
});
