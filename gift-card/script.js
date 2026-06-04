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

    // =========================
    // ESTILOS
    // =========================

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
            margin-top: 22px;
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
    // CHECKBOX
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
    label.innerText = 'ESTOU CIENTE QUE APÓS A ENTREGA DO GIFT CARD, NÃO HÁ REEMBOLSO.';
    label.style.fontSize = '11px';
    label.style.color = '#fff';
    label.style.fontFamily = "'Inter', sans-serif";
    label.style.cursor = 'pointer';
    label.style.fontWeight = '700';
    label.style.lineHeight = '1.2';

    containerCheck.appendChild(checkbox);
    containerCheck.appendChild(label);

    // =========================
    // AVISO REGIÃO
    // =========================

    const regionNotice = document.createElement('div');

    regionNotice.className = 'region-badge';

    regionNotice.innerHTML = `
        <img src="https://flagcdn.com/w40/br.png" width="18" alt="Brasil" style="border-radius:2px;">
        VÁLIDO APENAS PARA CONTAS BRASILEIRAS.
    `;

    // =========================
    // MODAL
    // =========================

    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';

    const modalBox = document.createElement('div');
    modalBox.className = 'modal-box';

    const modalText = document.createElement('div');

    modalText.innerHTML = `
        <div style="text-align:left; line-height:1.6; color:#d8d8d8; font-size:13px;">

            <div style="
                font-size:16px;
                font-weight:900;
                color:#00ffcc;
                margin-bottom:14px;
                text-align:center;
            ">
                👾 TERMO DE SEGURANÇA - RECARGAS PLAY
            </div>

            <div style="margin-bottom:14px;">
                Por ser um produto digital de envio imediato,
                <span style="color:#ff4d4d;font-weight:800;">
                    NÃO há reembolso ou cancelamento
                </span>
                após a entrega do código.
            </div>

            <div style="margin-bottom:14px;">
                Ao responder
                <span style="color:#00ffcc;font-weight:800;">
                    "SIM"
                </span>,
                você declara estar ciente de que a entrega do produto é definitiva e que abrir contestação falsa ou MED no banco após receber o card configura fraude, sendo o seu IP e dados acionados judicialmente.
            </div>

            <div style="
                background:rgba(0,255,204,0.08);
                border:1px solid rgba(0,255,204,0.25);
                padding:12px;
                border-radius:10px;
                margin-bottom:14px;
                font-weight:700;
                color:#fff;
            ">
                Ao clicar em "SIM , ESTOU DE ACORDO", você confirma que leu e concorda com os termos acima para prosseguir com a compra:
                <br><br>

                <span style="
                    color:#00ffcc;
                    font-size:15px;
                    font-weight:900;
                ">
                   ESTOU DE ACORDO.
                </span>
            </div>

            <div style="
                text-align:center;
                font-size:12px;
                color:#aaa;
                font-style:italic;
            ">
                (Aguardando sua confirmação para prosseguir com o atendimento...)
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
    btnCancel.innerText = '❌ NÃO ESTOU DE ACORDO';

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
    // BOTÃO DESABILITADO
    // =========================

    btnBuy.style.opacity = '0.6';
    btnBuy.style.transition = '0.3s';
    btnBuy.style.pointerEvents = 'none';

    // =========================
    // ABRIR MODAL
    // =========================

    containerCheck.addEventListener('click', function(e){

        // impede checkbox automático
        e.preventDefault();
        e.stopPropagation();

        // se já estiver marcado, ignora
        if (checkbox.checked) return;

        // garante desmarcado
        checkbox.checked = false;

        // abre modal
        modalOverlay.classList.add('active');
    });

    // impede clicar direto no checkbox
    checkbox.addEventListener('click', function(e){
        e.preventDefault();
        this.checked = false;
    });

    // =========================
    // BOTÃO VERDE
    // =========================

    btnConfirm.addEventListener('click', function(){

        checkbox.checked = true;

        btnBuy.style.opacity = '1';
        btnBuy.style.pointerEvents = 'auto';

        containerCheck.style.borderColor = '#00ffcc';
        containerCheck.style.background = 'rgba(0,255,204,0.08)';

        modalOverlay.classList.remove('active');
    });

    // =========================
    // BOTÃO VERMELHO
    // =========================

    btnCancel.addEventListener('click', function(){

        checkbox.checked = false;

        btnBuy.style.opacity = '0.6';
        btnBuy.style.pointerEvents = 'none';

        containerCheck.style.borderColor = '#7b2cbf';
        containerCheck.style.background = 'rgba(106, 27, 154, 0.25)';

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
    // IMPEDIR COMPRA
    // =========================

    const originalOnClick = btnBuy.onclick;

    btnBuy.onclick = function(e){

        if (!checkbox.checked){

            e.preventDefault();

            containerCheck.classList.add('shake-error');

            setTimeout(() => {
                containerCheck.classList.remove('shake-error');
            }, 400);

            return false;
        }

        if (typeof originalOnClick === 'function'){
            originalOnClick.apply(this, arguments);
        }
    };

});
