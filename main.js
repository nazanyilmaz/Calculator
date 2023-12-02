const harcamaInput = document.querySelector("#harcama");
const fiyatInput = document.querySelector("#fiyat");
const statusCheck = document.querySelector("#status-input");
const formBtn = document.querySelector(".ekle-btn");
const liste = document.querySelector(".liste");
const toplamBilgi = document.querySelector("#toplam-bilgi");
const selectFilter = document.querySelector("#filter-select");

//izleme islemleri
formBtn.addEventListener("click", addExpense);
liste.addEventListener("click", handleClick);
selectFilter.addEventListener("change", handleFilter);

//toplam state
let toplam = 0;

function updateToplam(fiyat) {
  toplam += Number(fiyat);
  toplamBilgi.innerText = toplam;
}

//harcama olusturma
function addExpense(e) {
  e.preventDefault();

  if (!fiyatInput.value || !harcamaInput.value === "") {
    return;
  }

  //div olusturma
  const harcamaDiv = document.createElement("div");

  //class ekleme
  harcamaDiv.classList.add("harcama");
  if (statusCheck.checked) {
    harcamaDiv.classList.add("payed");
  } else {
    harcamaDiv.classList.add("not-payed");
  }

  //icerigi ayarlama
  harcamaDiv.innerHTML = `    
  <h2>${harcamaInput.value}</h2>
  <h2  id="value"> ${fiyatInput.value} $</h2>
  <div class="buttons">
      <i class="fa-solid fa-credit-card" id="payment"></i>
      <i class="fa-regular fa-trash-can" id="remove"></i>
  </div> `;

  // olusan harcamayi listeye ekleme
  liste.appendChild(harcamaDiv);
  // toplami guncelleme

  updateToplam(fiyatInput.value);

  // formu temizleme
  harcamaInput.value = "";
  fiyatInput.value = "";
}
//listeye tiklanmayi yonetme
function handleClick(e) {
  const element = e.target;
  if (element.id === "remove") {
    //tiklanilan sil butonunun kapsayicisini alma

    const wrapperElement = element.parentElement.parentElement;

    //silinen elemanin fiyatini alma
    const deletedPrice = wrapperElement.querySelector("#value").innerText;

    // silinen fiyati toplamdan cikarma
    updateToplam(-Number(deletedPrice));

    // kapsayiciyi htmlden kaldirma
    wrapperElement.remove();
  }
}
//filtreleme isleme
function handleFilter(e) {
  const items = liste.children;

  for (const item of items) {
    switch (e.target.value) {
      case "all":
        item.style.display = "flex";
        break;

      case "payed":
        if (!item.classList.contains("payed")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        break;

      case "not-payed":
        if (!item.classList.contains("not-payed")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        break;
    }
  }
}
