const disclaimerBtn = document.getElementById("disclaimer-btn");
const disclaimer = document.querySelector(".disclaimer");
disclaimerBtn.addEventListener("click", function() {
  disclaimer.style.display = "none";
});

// Wrapper 1
const carousel1 = document.querySelector('#wrapper1 #image-carousel');
const handle1 = carousel1.querySelector('.handle');
const slides1 = carousel1.querySelectorAll('.slide');
const paginationItems1 = carousel1.querySelectorAll('.pagination li');

// Wrapper 2
const carousel2 = document.querySelector('#wrapper2 #image-carousel');
const handle2 = carousel2.querySelector('.handle');
const slides2 = carousel2.querySelectorAll('.slide');
const paginationItems2 = carousel2.querySelectorAll('.pagination li');

const slideHeight = 100 / slides1.length;
let currentIndex1 = 0;
let currentIndex2 = 0;
let intervalId1;
let intervalId2;

// Wrapper 1
handle1.style.height = `${slides1.length * 100}%`;
slides1.forEach(slide => slide.style.height = `${slideHeight}%`);

paginationItems1.forEach((item, index) => {
  item.addEventListener('click', () => {
    currentIndex1 = index;
    handle1.style.transform = `translateY(-${slideHeight * currentIndex1}%)`;
    paginationItems1.forEach(item => item.classList.remove('active'));
    paginationItems1[currentIndex1].classList.add('active');
    clearInterval(intervalId1);
    intervalId1 = setInterval(changeSlide1, 5000);
  });
});

// Wrapper 2
handle2.style.height = `${slides2.length * 100}%`;
slides2.forEach(slide => slide.style.height = `${slideHeight}%`);

paginationItems2.forEach((item, index) => {
  item.addEventListener('click', () => {
    currentIndex2 = index;
    handle2.style.transform = `translateY(-${slideHeight * currentIndex2}%)`;
    paginationItems2.forEach(item => item.classList.remove('active'));
    paginationItems2[currentIndex2].classList.add('active');
    clearInterval(intervalId2);
    intervalId2 = setInterval(changeSlide2, 5000);
  });
});

function changeSlide1() {
  currentIndex1 = (currentIndex1 + 1) % slides1.length;
  handle1.style.transform = `translateY(-${slideHeight * currentIndex1}%)`;

  paginationItems1.forEach(item => item.classList.remove('active'));
  paginationItems1[currentIndex1].classList.add('active');
}

function changeSlide2() {
  currentIndex2 = (currentIndex2 + 1) % slides2.length;
  handle2.style.transform = `translateY(-${slideHeight * currentIndex2}%)`;

  paginationItems2.forEach(item => item.classList.remove('active'));
  paginationItems2[currentIndex2].classList.add('active');
}

intervalId1 = setInterval(changeSlide1, 5000);
intervalId2 = setInterval(changeSlide2, 5000);
