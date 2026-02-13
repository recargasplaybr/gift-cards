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

    // 1. Estilos da Animação e Elementos
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
            box-shadow: 0 0 15px rgba(255, 77, 77, 0.4);
        }
        .region-badge {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            margin-bottom: 15px;
            font-size: 11px;
            font-weight: 700;
            color: #00ffcc;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
    `;
    document.head.appendChild(styleSheet);

    // 2. Criar o container do Checkbox (Focado no Reembolso)
    const containerCheck = document.createElement('div');
    containerCheck.style.background = 'rgba(106, 27, 154, 0.25)'; 
    containerCheck.style.border = '2px solid #7b2cbf'; 
    containerCheck.style.padding = '14px';
    containerCheck.style.borderRadius = '8px';
    containerCheck.style.marginBottom = '10px';
    containerCheck.style.display = 'flex';
    containerCheck.style.alignItems = 'center';
    containerCheck.style.cursor = 'pointer';
    containerCheck.style.transition = 'all 0.3s';
    containerCheck.id = 'area-check';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'check-reembolso';
    checkbox.style.marginRight = '12px';
    checkbox.style.cursor = 'pointer';
    checkbox.style.accentColor = '#00ffcc'; 
    checkbox.style.width = '18px';
    checkbox.style.height = '18px';
    checkbox.style.flexShrink = '0';

    const label = document.createElement('label');
    label.htmlFor = 'check-reembolso';
    label.innerText = 'ESTOU CIENTE QUE APÓS A ENTREGA DO GIFT CARD, NÃO HÁ REEMBOLSO.';
    label.style.fontSize = '11px';
    label.style.color = '#fff';
    label.style.fontFamily = "'Inter', sans-serif";
    label.style.cursor = 'pointer';
    label.style.fontWeight = '700';
    label.style.lineHeight = '1.2';

    containerCheck.appendChild(checkbox);
    containerCheck.appendChild(label);

    // 3. Criar o Aviso de Região (Fora da caixa)
    const regionNotice = document.createElement('div');
    regionNotice.className = 'region-badge';
    regionNotice.innerHTML = `
        <img src="https://flagcdn.com/w40/br.png" width="18" alt="Brasil" style="border-radius: 2px;">
        VÁLIDO APENAS PARA CONTAS BRASILEIRAS.
    `;

    // Inserir os elementos antes do botão de compra
    btnBuy.parentNode.insertBefore(containerCheck, btnBuy);
    btnBuy.parentNode.insertBefore(regionNotice, btnBuy);

    // 4. Lógica de Ativação
    btnBuy.style.opacity = '0.6';
    btnBuy.style.transition = 'opacity 0.3s';

    checkbox.addEventListener('change', function() {
        if (this.checked) {
            btnBuy.style.opacity = '1';
            containerCheck.style.borderColor = '#00ffcc'; 
            containerCheck.style.background = 'rgba(0, 255, 204, 0.1)';
        } else {
            btnBuy.style.opacity = '0.6';
            containerCheck.style.borderColor = '#7b2cbf';
            containerCheck.style.background = 'rgba(106, 27, 154, 0.25)';
        }
    });

    // 5. Impedir compra sem o check
    const originalOnClick = btnBuy.onclick;
    btnBuy.onclick = function(e) {
        if (!checkbox.checked) {
            e.preventDefault();
            containerCheck.classList.add('shake-error');
            setTimeout(() => { containerCheck.classList.remove('shake-error'); }, 400);
            return false;
        }
        if (typeof originalOnClick === 'function') {
            originalOnClick.apply(this, arguments);
        }
    };

    // Clique em qualquer lugar da caixinha
    containerCheck.onclick = function(e) {
        if (e.target !== checkbox) {
            checkbox.checked = !checkbox.checked;
            checkbox.dispatchEvent(new Event('change'));
        }
    };
});
