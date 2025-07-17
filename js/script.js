console.log("Script loaded successfully!");

// showWelcomePopup();

function showWelcomePopup() {
  let userName = prompt("Please enter your name:");
  if (userName != "") {
    document.getElementById("welcome-user").innerHTML = userName;
  }
}
