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

// Injeção automática do aviso de reembolso
document.addEventListener("DOMContentLoaded", function() {
    const btnBuy = document.querySelector('.btn-buy');

    if (btnBuy) {
        const aviso = document.createElement('p');
        aviso.className = 'aviso-reembolso-dinamico';
        aviso.innerText = '* Após a entrega do Gift Card, o valor não poderá ser reembolsado.';
        
        // Estilização com o verde do site (Mint)
        aviso.style.fontSize = '11px'; // Ajustado levemente para não quebrar layout em telas pequenas
        aviso.style.color = '#00ffcc'; // Verde menta
        aviso.style.marginTop = '15px';
        aviso.style.textAlign = 'center';
        aviso.style.fontFamily = "'Inter', sans-serif";
        aviso.style.fontWeight = '600';
        aviso.style.textTransform = 'uppercase';
        aviso.style.letterSpacing = '0.5px';
        aviso.style.lineHeight = '1.4';

        // Insere o aviso logo após o botão de compra
        btnBuy.parentNode.insertBefore(aviso, btnBuy.nextSibling);
    }
});
