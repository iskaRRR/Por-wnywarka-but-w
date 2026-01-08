function render(data){
  const results=document.getElementById("results");
  results.innerHTML="";

  if(!data || data.length===0){
    results.innerHTML="<p>Brak wyników</p>";
    return;
  }

  const item=data[0];
  const sk=item.prices.skstore;
  const goat=item.prices.goat;
  const stockx=item.prices.stockx;

  function row(store, price){
    const diff = Number((price - sk).toFixed(2));
    const sign = diff > 0 ? "+" : "-";
    const diffText = `${sign}${Math.abs(diff)} zł`;

    return `
      <div class="price-box ${cls}">
        <span>${store}</span>
        <strong>${price} zł</strong>
        <span class="diff-label ${cls}">
          ${diff>0?"Drożej o ":"Taniej o "}${Math.abs(diff)} zł
        </span>
        <button class="add-btn"
          onclick="addToCart({
            model:'${item.model}',
            store:'${store}',
            price:${price},
            sk:${sk},
            image:'${item.image}'
          })">
          Dodaj
        </button>
      </div>`;
  }

  results.innerHTML = `
  <div class="hero-card">
    <div class="hero-image">
      <img src="${item.image}">
    </div>

    <div>
      <div class="model">${item.model}</div>

      <div class="price-box">
        <span>SKStore</span>
        <strong>${item.prices.skstore} zł</strong>
      </div>

      <div class="price-box">
        <span>GOAT</span>
        <strong>${item.prices.goat} zł</strong>
        <span>${Number((item.prices.goat - item.prices.skstore).toFixed(2))} zł</span>
        <button onclick='addToCart({
          model: "${item.model}",
          store: "GOAT",
          price: ${item.prices.goat},
          sk: ${item.prices.skstore},
          image: "${item.image}"
        })'>Dodaj</button>
      </div>

      <div class="price-box">
        <span>StockX</span>
        <strong>${item.prices.stockx} zł</strong>
        <span>${Number((item.prices.stockx - item.prices.skstore).toFixed(2))} zł</span>
        <button onclick='addToCart({
          model: "${item.model}",
          store: "StockX",
          price: ${item.prices.stockx},
          sk: ${item.prices.skstore},
          image: "${item.image}"
        })'>Dodaj</button>
      </div>
    </div>
  </div>
`;


// ===== OPIS =====
const descBox = document.getElementById("description");
const descText = document.getElementById("descriptionText");

if (item.description) {
  descText.textContent = item.description;
  descBox.style.display = "block";
} else {
  descBox.style.display = "none";
}

// ===== PODOBNE MODELE =====
document.getElementById("similarSection").style.display = "block";
loadSimilar(item.sku);




}

