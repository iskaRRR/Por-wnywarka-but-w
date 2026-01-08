function loadSimilar(model){
  fetch(`/api/similar?model=${encodeURIComponent(model)}`)
    .then(r=>r.json())
    .then(data=>{
      const box=document.getElementById("similar");
      box.innerHTML="";
      data.forEach(i=>{
        const d=document.createElement("div");
        d.className="similar-card";
        d.innerHTML=`<img src="${i.image}"><p>${i.model}</p>`;
        d.onclick=()=>{searchInput.value=i.model;compare();}
        box.appendChild(d);
      });
    });
}