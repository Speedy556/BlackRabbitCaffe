const CardDiv = document.querySelectorAll('.cards');
gustariDb.onSnapshot(extractProducts);
const url = window.location.href;

function extractProducts(snapshot) {
  console.log(snapshot);

  let docs = snapshot.docs;
  let products = {};

  for (let i = 0; i < docs.length; i++) {
    let produs = docs[i].data();
    produs.id = docs[i].id;

    console.log(produs);

    if (!(produs.clasa in products)) {
      products[produs.clasa] = [];
    }

    products[produs.clasa].push(produs);
  }

  console.log(products);

  renderObj(products);


}

function renderObj(products) {
  let html = '';
  const cardDivs = document.querySelectorAll('.cards');

  for (let item in products) {
    for (let gustari of products[item]) {
      html += `
      <li class="cardLi" data-item-id="${gustari.id}">
          <div class="card">
            <img src="${gustari.img}" class="card-img">
            <div class="card-overlay">
              <div class="card-header">
                <div class="card-header-text">
                  <h3 class="card-title">${gustari.nume}</h3>
                  <span class="product-price">${gustari.pret} MDL</span>
                  <span id="del" class="delete">
                  ${
                    user
                      ? `<i class="fas fa-trash" id="bin" onclick="sterge('${gustari.id}')"></i>`
                      : ''
                  }
                  </span>
                  <span class="add-btn">
                    <i class="fa-sharp fa-solid fa-basket-shopping"></i>
                  </span>
                </div>
              </div>
              <div class="card-description">
                ${gustari.continut}
              </div>
            </div>
          </div>
        </li>
      `;
    }

    cardDivs.forEach((cardDiv) => {
      cardDiv.innerHTML = html;
      const addButtons = cardDiv.querySelectorAll('.add-btn');
      addButtons.forEach((button) => {
        button.addEventListener('click', addToCartClicked);
      });
    });
  }
}


function sterge(id) {
  let isConfirmed = window.confirm('Ești sigur ?');
  if (isConfirmed) {
    gustariDb.doc(id).delete().then(() => {
        console.log('Item deleted');
      })
  }
}



