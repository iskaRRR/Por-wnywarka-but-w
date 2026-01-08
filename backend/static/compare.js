function compare(){
  const q = searchInput.value.trim();
  if(!q) return;

  fetch(`/api/compare?query=${encodeURIComponent(q)}`)
    .then(r=>r.json())
    .then(data=>render(data));
}