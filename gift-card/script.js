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

    // 1. Injetar a animação de tremida (Shake) no documento
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-8px); }
            50% { transform: translateX(8px); }
            75% { transform: translateX(-8px); }
            100% { transform: translateX(0); }
        }
        .shake-error {
            animation: shake 0.4s ease-in-out;
            border-color: #ff4d4d !important;
            box-shadow: 0 0 10px rgba(255, 77, 77, 0.5);
        }
    `;
    document.head.appendChild(styleSheet);

    // 2. Criar o container do Checkbox (Caixinha Roxa)
    const containerCheck = document.createElement('div');
    containerCheck.style.background = 'rgba(106, 27, 154, 0.2)'; 
    containerCheck.style.border = '2px solid #7b2cbf'; 
    containerCheck.style.padding = '12px';
    containerCheck.style.borderRadius = '8px';
    containerCheck.style.marginBottom = '15px';
    containerCheck.style.display = 'flex';
    containerCheck.style.alignItems = 'center';
    containerCheck.style.cursor = 'pointer';
    containerCheck.style.transition = 'all 0.3s';
    containerCheck.id = 'area-check';

    // 3. Criar o Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'check-reembolso';
    checkbox.style.marginRight = '12px';
    checkbox.style.cursor = 'pointer';
    checkbox.style.accentColor = '#00ffcc'; 
    checkbox.style.width = '20px';
    checkbox.style.height = '20px';

    // 4. Criar o texto do aviso
    const label = document.createElement('label');
    label.htmlFor = 'check-reembolso';
    label.innerText = 'Estou ciente que após a entrega do Gift Card, o dinheiro não pode ser reembolsado.';
    label.style.fontSize = '12px';
    label.style.color = '#fff';
    label.style.fontFamily = "'Inter', sans-serif";
    label.style.cursor = 'pointer';
    label.style.fontWeight = '600';
    label.style.lineHeight = '1.3';

    containerCheck.appendChild(checkbox);
    containerCheck.appendChild(label);
    btnBuy.parentNode.insertBefore(containerCheck, btnBuy);

    // Estado inicial do botão
    btnBuy.style.opacity = '0.5';
    btnBuy.style.filter = 'grayscale(1)';

    // Evento para validar e liberar
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            btnBuy.style.opacity = '1';
            btnBuy.style.filter = 'none';
            containerCheck.style.borderColor = '#00ffcc'; 
            containerCheck.style.background = 'rgba(0, 255, 204, 0.1)';
        } else {
            btnBuy.style.opacity = '0.5';
            btnBuy.style.filter = 'grayscale(1)';
            containerCheck.style.borderColor = '#7b2cbf';
            containerCheck.style.background = 'rgba(106, 27, 154, 0.2)';
        }
    });

    // 5. Efeito de Tremida ao tentar comprar sem marcar
    const originalOnClick = btnBuy.onclick;
    btnBuy.onclick = function(e) {
        if (!checkbox.checked) {
            e.preventDefault();
            // Adiciona a classe de erro para tremer
            containerCheck.classList.add('shake-error');
            
            // Remove a classe após a animação para poder repetir depois
            setTimeout(() => {
                containerCheck.classList.remove('shake-error');
            }, 400);
            
            return false;
        }
        if (typeof originalOnClick === 'function') {
            originalOnClick.apply(this, arguments);
        }
    };

    // Permitir clicar na caixinha toda para marcar
    containerCheck.onclick = function(e) {
        if (e.target !== checkbox) {
            checkbox.checked = !checkbox.checked;
            checkbox.dispatchEvent(new Event('change'));
        }
    };
});
