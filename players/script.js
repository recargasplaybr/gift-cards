// Funções globais do Recargas Play

function toggleText(id){
  const el = document.getElementById(id);
  if(!el) return;

  const btn = el.nextElementSibling;
  el.classList.toggle("expanded");

  if(btn && btn.tagName === "BUTTON"){
    btn.innerText =
      el.classList.contains("expanded")
      ? "VER MENOS"
      : "VEJA MAIS";
  }
}

document.addEventListener("DOMContentLoaded", function() {

    const btnBuy = document.querySelector('.btn-buy');
    if (!btnBuy) return;

    // =========================
    // ESTILOS
    // =========================

    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        @keyframes shake {
            0% { transform: translateX(0); }
            20% { transform: translateX(-8px); }
            40% { transform: translateX(8px); }
            60% { transform: translateX(-8px); }
            80% { transform: translateX(8px); }
            100% { transform: translateX(0); }
        }

        .shake-error {
            animation: shake 0.45s ease-in-out;
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
            color: #ffcc00;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            text-align: center;
        }

        /* MODAL */
        .modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.75);
            backdrop-filter: blur(4px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 999999;
            opacity: 0;
            visibility: hidden;
            transition: 0.25s;
            padding: 20px;
        }

        .modal-overlay.active {
            opacity: 1;
            visibility: visible;
        }

        .modal-box {
            width: 100%;
            max-width: 460px;
            background: #111;
            border: 2px solid #7b2cbf;
            border-radius: 14px;
            padding: 22px;
            box-shadow: 0 0 30px rgba(0,0,0,0.6);
            transform: scale(0.9);
            transition: 0.25s;
            max-height: 90vh;
            overflow-y: auto;
        }

        .modal-overlay.active .modal-box {
            transform: scale(1);
        }

        .modal-buttons {
            display: flex;
            gap: 10px;
            margin-top: 20px;
        }

        .modal-btn {
            flex: 1;
            border: none;
            border-radius: 10px;
            padding: 14px;
            font-weight: 800;
            cursor: pointer;
            transition: 0.2s;
            color: #fff;
            font-size: 13px;
        }

        .btn-confirm {
            background: #00b26f;
        }

        .btn-confirm:hover {
            transform: scale(1.03);
            background: #00cc7f;
        }

        .btn-cancel {
            background: #cc2d2d;
        }

        .btn-cancel:hover {
            transform: scale(1.03);
            background: #ff3d3d;
        }
    `;
    document.head.appendChild(styleSheet);

    // =========================
    // CHECKBOX (Texto Alterado para Foco no Player)
    // =========================

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
    label.innerText = 'ESTOU CIENTE QUE ESTOU COMPRANDO APENAS A ATIVAÇÃO DO APLICATIVO E QUE A RECARGAS PLAY NÃO FORNECE CANAIS, FILMES OU LISTAS.';
    label.style.fontSize = '11px';
    label.style.color = '#fff';
    label.style.fontFamily = "'Inter', sans-serif";
    label.style.cursor = 'pointer';
    label.style.fontWeight = '700';
    label.style.lineHeight = '1.2';

    containerCheck.appendChild(checkbox);
    containerCheck.appendChild(label);

    // =========================
    // AVISO
    // =========================

    const regionNotice = document.createElement('div');
    regionNotice.className = 'region-badge';
    regionNotice.innerHTML = `NÃO ACEITAMOS REEMBOLSO APÓS O ENVIO DO CÓDIGO DO GIFT CARD.`;

    // =========================
    // MODAL (Texto Alterado para Esclarecimento de IPTV)
    // =========================

    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';

    const modalBox = document.createElement('div');
    modalBox.className = 'modal-box';

    const modalText = document.createElement('div');
    modalText.innerHTML = `
        <div style="text-align:left; line-height:1.6; color:#d8d8d8; font-size:13px;">
            <div style="font-size:16px; font-weight:900; color:#00ffcc; margin-bottom:16px; text-align:center;">
                AVISO IMPORTANTE: SOBRE O PRODUTO
            </div>
            <div style="margin-bottom:16px; text-align: center;">
                Este produto trata-se <span style="color:#00ffcc; font-weight:800;">EXCLUSIVAMENTE da licença/ativação do aplicativo (Player).</span>
            </div>
            <div style="margin-bottom:16px; background: rgba(255, 77, 77, 0.1); border: 1px solid rgba(255, 77, 77, 0.3); padding: 12px; border-radius: 8px; color: #fff;">
                ⚠️ <span style="color:#ff4d4d; font-weight:800;">ATENÇÃO:</span> A Recargas Play <b>NÃO vende listas de canais, não fornece servidores de IPTV, nem conteúdos de TV, filmes ou séries.</b> O fornecimento e a configuração do conteúdo são de responsabilidade total do usuário.
            </div>
            <div style="background:rgba(0,255,204,0.08); border:1px solid rgba(0,255,204,0.25); padding:14px; border-radius:10px; margin-bottom:14px; color:#fff;">
                <div style="font-size:14px; font-weight:800; color:#00ffcc; margin-bottom:8px;">
                    ✔ CONFIRMAÇÃO DO CLIENTE
                </div>
                <div style="font-size:13px; line-height:1.5; color:#d8d8d8;">
                    Ao clicar em <b>"ESTOU DE ACORDO"</b>, você confirma que já possui a sua própria lista de reprodução e entende que está adquirindo apenas a ativação do app.
                </div>
            </div>
        </div>
    `;

    const modalButtons = document.createElement('div');
    modalButtons.className = 'modal-buttons';

    const btnConfirm = document.createElement('button');
    btnConfirm.className = 'modal-btn btn-confirm';
    btnConfirm.innerText = '✅ ESTOU DE ACORDO';

    const btnCancel = document.createElement('button');
    btnCancel.className = 'modal-btn btn-cancel';
    btnCancel.innerText = '❌ NÃO COMPREENDERAM';

    modalButtons.appendChild(btnConfirm);
    modalButtons.appendChild(btnCancel);

    modalBox.appendChild(modalText);
    modalBox.appendChild(modalButtons);
    modalOverlay.appendChild(modalBox);
    document.body.appendChild(modalOverlay);

    // =========================
    // INSERIR ELEMENTOS
    // =========================

    btnBuy.parentNode.insertBefore(containerCheck, btnBuy);
    btnBuy.parentNode.insertBefore(regionNotice, btnBuy);

    // =========================
    // ABRIR MODAL
    // =========================

    containerCheck.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        if (checkbox.checked) return;
        checkbox.checked = false;
        modalOverlay.classList.add('active');
    });

    checkbox.addEventListener('click', function(e){
        e.preventDefault();
        this.checked = false;
    });

    // =========================
    // BOTÃO VERDE (Confirmar ciência)
    // =========================

    btnConfirm.addEventListener('click', function(){
        checkbox.checked = true;
        containerCheck.style.borderColor = '#00ffcc';
        containerCheck.style.background = 'rgba(0,255,204,0.08)';
        modalOverlay.classList.remove('active');
    });

    // =========================
    // BOTÃO VERMELHO (Cancelar)
    // =========================

    btnCancel.addEventListener('click', function(){
        checkbox.checked = false;
        containerCheck.style.borderColor = '#7b2cbf';
        containerCheck.style.background = 'rgba(106,27,154,0.25)';
        modalOverlay.classList.remove('active');
    });

    // =========================
    // FECHAR CLICANDO FORA
    // =========================

    modalOverlay.addEventListener('click', function(e){
        if(e.target === modalOverlay){
            modalOverlay.classList.remove('active');
        }
    });

    // =========================
    // BOTÃO COMPRAR
    // =========================

    const originalOnClick = btnBuy.onclick;
    btnBuy.onclick = function(e){
        if (!checkbox.checked){
            e.preventDefault();
            containerCheck.classList.remove('shake-error');
            void containerCheck.offsetWidth;
            containerCheck.classList.add('shake-error');
            return false;
        }

        if (typeof originalOnClick === 'function'){
            originalOnClick.apply(this, arguments);
        }
    };

});
