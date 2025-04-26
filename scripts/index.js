const hackerText = document.getElementById("hacker-text");

const message = `> Hacking credentials... haha jk \n> wait give me a while`;
let index = 0;

function typeEffect() {
  if (index < message.length) {
    hackerText.textContent += message.charAt(index);
    index++;
    setTimeout(typeEffect, 50); // speed of typing
  } else {
    setTimeout(() => {
      window.location.href = "myprofile.html";
    }, 1200); // delay before redirect
  }
}

typeEffect();
