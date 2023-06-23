var modal = document.getElementById("myModal");
var btn = document.getElementById("cartbtn");
var span = document.getElementById("close");
var span1 = document.getElementById("close1");
var popUp = document.getElementById("pop-up");
var buyBtn = document.getElementById("buy-btn");

btn.onclick = function() {
  modal.classList.add('show');
}

buyBtn.onclick = function() {
  popUp.style.display = "block";

}

span.onclick = function() {
  modal.classList.remove('show');
}
span1.onclick = function() {
  popUp.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.classList.remove('show');
  }
}

