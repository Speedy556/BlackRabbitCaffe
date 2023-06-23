
window.addEventListener("load", function () {
  setTimeout(function () {
    document.getElementById("loading").style.display = "none";
  }, 500);
});

window.addEventListener("load", function () {
  const itemList = document.getElementById("item-list");

  setTimeout(function () {
    itemList.classList.add("slide-in");
  }, 300);
});


const body = document.querySelector("body"),
  sidebar = body.querySelector(".sidebar"),
  toggle = body.querySelector(".toggle"),
  modeSwitch = body.querySelector(".toggle-switch"),
  modeText = body.querySelector(".mode-text"),
  card = body.querySelectorAll(".cards, .card"),
  logoDark = body.querySelectorAll(".logo1, .logo2");

toggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
  localStorage.setItem("sidebarState", sidebar.classList.contains("close") ? "closed" : "open");
});

const savedSidebarState = localStorage.getItem("sidebarState");
if (savedSidebarState === "closed") {
  sidebar.classList.add("close");
} else {
  sidebar.classList.remove("close");
}

const darkMode = () => {
  body.classList.toggle("dark")
  logoDark.forEach(x => x.classList.toggle("dark"))
  card.forEach(x => x.classList.toggle("dark"))

  if (body.classList.contains("dark")) {
    modeText.innerText = "Light Mode"
  } else {
    modeText.innerText = "Dark Mode"
  }
};

modeSwitch.addEventListener("click", () => {
  setDarkMode = localStorage.getItem("dark");
  if (setDarkMode !== "on") {
    darkMode();
    setDarkMode = localStorage.setItem("dark", "on");
  } else {
    darkMode();
    setDarkMode = localStorage.setItem("dark", null);
  }
});

let setDarkMode = localStorage.getItem("dark");
if (setDarkMode === "on") {
  darkMode();
};

const firebaseConfig = {
  apiKey: "AIzaSyA_9WflTsdnpQRvKnWDNm1fWvr0EAVMNmA",
  authDomain: "blackrabbit-5337b.firebaseapp.com",
  projectId: "blackrabbit-5337b",
  storageBucket: "blackrabbit-5337b.appspot.com",
  messagingSenderId: "508396562203",
  appId: "1:508396562203:web:1891be1ca9cb908e1b55be",
  measurementId: "G-4F1VRE1M3J"
};

const postareBtn = document.querySelector(".nav-link1");
const adminBtn = document.querySelector(".nav-link2");
const admin1 = "KyqCizodJVMuQV3MbDfeBy83rgU2";
const admin2 = "5zuHLjEnw8TosEY3x5PA4oQsCRD2";


firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const gustariDb = db.collection("gustari");
const bauturiDb = db.collection("bauturi");

let user = null;

const yearElement = document.getElementById('year');

if (yearElement) {
  let date = new Date();

  yearElement.innerHTML = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " ©";
}

function mobileMenu() {
  var x = document.getElementById("navbar");
  if (x.className === "") {
    x.className = "mobile";
  } else {
    x.className = "";
  }
}

function refresh() {
  window.location.reload();
}

function isAdmin() {
  if (user == null) {
    return false;
  }

  return user.uid === admin1 || user.uid === admin2;
}

auth.onAuthStateChanged(function (fuser) {
  user = fuser;
  const isAdminUser = isAdmin();

  if (isAdminUser) {
    postareBtn.style.display = 'block';
    adminBtn.style.display = 'block';
  } else {
    postareBtn.style.display = 'none';
    adminBtn.style.display = 'none';
  }

  document.querySelector('body').style.display = 'block';
});








