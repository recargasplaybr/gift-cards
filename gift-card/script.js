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

// Funções globais do Recargas Play
function toggleText(id){
  const el = document.getElementById(id);
  if(!el) return;
  const btn = el.nextElementSibling;
  el.classList.toggle("expanded");
  if(btn && btn.tagName === "BUTTON"){
    btn.innerText = el.classList.contains("expanded") ? "VER MENOS" : "VEJA MAIS";
  }
}

document.addEventListener("DOMContentLoaded", function() {
    const btnBuy = document.querySelector('.btn-buy');
    if (!btnBuy) return;

    // 1. Criar o container do Checkbox (Caixinha Roxa)
    const containerCheck = document.createElement('div');
    containerCheck.style.background = 'rgba(106, 27, 154, 0.2)'; // Roxo suave transparente
    containerCheck.style.border = '1px solid #7b2cbf'; // Borda roxa
    containerCheck.style.padding = '12px';
    containerCheck.style.borderRadius = '8px';
    containerCheck.style.marginBottom = '15px';
    containerCheck.style.display = 'flex';
    containerCheck.style.alignItems = 'center';
    containerCheck.style.cursor = 'pointer';
    containerCheck.id = 'area-check';
    containerCheck.style.transition = 'all 0.3s';

    // 2. Criar o Checkbox real
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'check-reembolso';
    checkbox.style.marginRight = '12px';
    checkbox.style.cursor = 'pointer';
    checkbox.style.accentColor = '#00ffcc'; // Check fica verde ao marcar
    checkbox.style.width = '18px';
    checkbox.style.height = '18px';

    // 3. Criar o texto do aviso
    const label = document.createElement('label');
    label.htmlFor = 'check-reembolso';
    label.innerText = 'Estou ciente que após a entrega do Gift Card, não haverá reembolso.';
    label.style.fontSize = '12px';
    label.style.color = '#fff';
    label.style.fontFamily = "'Inter', sans-serif";
    label.style.cursor = 'pointer';
    label.style.fontWeight = '600';

    // Montar a estrutura
    containerCheck.appendChild(checkbox);
    containerCheck.appendChild(label);
    btnBuy.parentNode.insertBefore(containerCheck, btnBuy);

    // 4. Estilo inicial do botão (Meio apagado)
    btnBuy.style.opacity = '0.5';
    btnBuy.style.cursor = 'not-allowed';

    // 5. Evento para validar o Checkbox
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            btnBuy.style.opacity = '1';
            btnBuy.style.cursor = 'pointer';
            containerCheck.style.borderColor = '#00ffcc'; // Borda fica verde ao marcar
            containerCheck.style.background = 'rgba(0, 255, 204, 0.1)';
        } else {
            btnBuy.style.opacity = '0.5';
            btnBuy.style.cursor = 'not-allowed';
            containerCheck.style.borderColor = '#7b2cbf';
            containerCheck.style.background = 'rgba(106, 27, 154, 0.2)';
        }
    });

    // 6. Impedir o clique no botão se não estiver marcado
    const originalOnClick = btnBuy.onclick;
    btnBuy.onclick = function(e) {
        if (!checkbox.checked) {
            // Efeito de destaque caso a pessoa tente comprar sem marcar
            containerCheck.style.transform = 'scale(1.05)';
            containerCheck.style.borderColor = '#ff4d4d'; // Borda vermelha de erro
            setTimeout(() => {
                containerCheck.style.transform = 'scale(1)';
                if(!checkbox.checked) containerCheck.style.borderColor = '#7b2cbf';
            }, 300);
            
            alert("Por favor, marque a caixa confirmando que está ciente da política de reembolso.");
            return false;
        }
        if (typeof originalOnClick === 'function') {
            originalOnClick.apply(this, arguments);
        }
    };
});
