window.onload = function() {
    var introduction = document.querySelector('.introduction');
    introduction.classList.add('fade-in-left');
};
const loginBtn = document.getElementById('login-btn');

const logoutBtn = document.getElementById('logout-btn');


const provider = new firebase.auth.GoogleAuthProvider();

loginBtn.onclick = function() {
    console.log("logare...");
    auth.signInWithPopup(provider).then(refresh);
}

logoutBtn.onclick = function() {
    auth.signOut();
}

auth.onAuthStateChanged(function(fuser) {
    user = fuser;
    console.log(user);

    if (user != null) { 
        loginBtn.style.display = "none";
        logoutBtn.style.display = "inline-block";
       

    }
    else {
        loginBtn.style.display = "inline-block";
        logoutBtn.style.display = "none";
        
        
    }
})

