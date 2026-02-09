// Funções globais do Recargas Play (não mexe no buy() de cada página)
function toggleText(id){
  const el = document.getElementById(id);
  if(!el) return;
  const btn = el.nextElementSibling;
  el.classList.toggle("expanded");
  if(btn && btn.tagName === "BUTTON"){
    btn.innerText = el.classList.contains("expanded") ? "VER MENOS" : "VEJA MAIS";
  }
}
