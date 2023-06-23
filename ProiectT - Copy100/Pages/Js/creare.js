window.addEventListener('load', function () {
    var container = document.querySelector('.container');
    container.classList.add('show');

    var labels = document.querySelectorAll('label');
    labels.forEach(function (label) {
        label.classList.add('show');
    });
});



let ckeditorDiv = document.getElementById('ckeditor', {
    mediaEmbed: {
        previewsInData: true
    }
});

const titleInput = document.getElementById('titlul');
const imgInput = document.getElementById('link-img');
const pageInput = document.getElementById('page-input');
const createBtn = document.getElementById('creare-btn');
const form = document.getElementById('tema-form');
const price = document.getElementById('price')
let editor;

ClassicEditor.create(ckeditorDiv).then(saveEditor);

function showAlert() {
    var customAlert = document.getElementById("custom-alert");
    customAlert.classList.add("show");
    setTimeout(function () {
      customAlert.classList.remove("show");
    }, 5000);
  }

createBtn.onclick = function (e) {
    e.preventDefault();

    if (form.checkValidity() == false) {
        form.reportValidity();
    } else {

        let data = new Date();

        let item = {
            nume: titleInput.value,
            img: imgInput.value,
            page: Number(pageInput.value),
            continut: editor.getData(),
            creat: data.getTime(),
            pret: Number(price.value)
        }

        console.log(item);

        form.reset();

        if (item.page === 1) {
            bauturiDb.add(item)

        } else if (item.page === 2) {
            gustariDb.add(item)
        }
    }
    showAlert();

    e.preventDefault();



}



function saveEditor(e) {
    editor = e;
}


