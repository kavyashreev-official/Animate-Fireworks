// avatar-toggle.js
const image = document.getElementById("avatar");

image.addEventListener("click", function () {
  if (image.src.includes("santa.png")) {
    image.src = "./assets/reindeer.png";
  } else if (image.src.includes("reindeer.png")) {
    image.src = "./assets/bear.png";
  } else if (image.src.includes("bear.png")) {
    image.src = "./assets/cookie.png";
  } else {
    image.src = "./assets/santa.png";
  }
});