<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Checkout - Finalize sua compra</title>
    <meta name="description" content="Finalize sua compra de forma rápida e segura. Aceitamos Pix e ofertas exclusivas para você.">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.6.0/axios.min.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #f7f7f7;
            color: #262626;
            line-height: 1.5;
        }

        .container {
            max-width: 448px;
            margin: 0 auto;
            padding: 24px 16px 96px;
        }

        .card {
            background: white;
            border-radius: 12px;
            padding: 16px;
            margin-bottom: 16px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .card-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 16px;
        }

        .card-title {
            font-size: 18px;
            font-weight: 600;
        }

        .dot {
            width: 8px;
            height: 8px;
            background-color: #262626;
            border-radius: 50%;
        }

        .section-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 16px;
        }

        .icon-circle {
            width: 32px;
            height: 32px;
            background-color: #e91e63;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
        }

        .cart-item {
            display: flex;
            gap: 12px;
            margin-bottom: 16px;
        }

        .product-image {
            flex-shrink: 0;
            width: 64px;
            height: 64px;
            background: linear-gradient(135deg, rgba(233, 30, 99, 0.2), rgba(233, 30, 99, 0.2));
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
        }

        .product-info {
            flex: 1;
        }

        .product-name {
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 4px;
        }

        .product-stock {
            font-size: 12px;
            color: #737373;
        }

        .quantity-controls {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-top: 8px;
        }

        .qty-btn {
            width: 24px;
            height: 24px;
            border: none;
            background: transparent;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
            transition: background-color 0.2s;
        }

        .qty-btn:hover {
            background-color: #f5f5f5;
        }

        .qty-value {
            font-size: 14px;
            font-weight: 500;
            width: 32px;
            text-align: center;
        }

        .price-row {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            padding: 8px 0;
        }

        .price-row.total {
            font-size: 16px;
            font-weight: 600;
            border-top: 1px solid #e5e5e5;
            padding-top: 12px;
            margin-top: 8px;
        }

        .text-muted {
            color: #737373;
        }

        .input-group {
            margin-bottom: 16px;
        }

        label {
            display: block;
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 6px;
        }

        input, select {
            width: 100%;
            padding: 10px 12px;
            font-size: 14px;
            border: 1px solid #e5e5e5;
            border-radius: 8px;
            background-color: #f5f5f5;
            transition: border-color 0.2s;
        }

        input:focus, select:focus {
            outline: none;
            border-color: #e91e63;
        }

        .section-title {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 12px;
        }

        .offer-card {
            background: white;
            border: 2px solid rgba(233, 30, 99, 0.2);
            border-radius: 12px;
            padding: 16px;
            margin-bottom: 12px;
        }

        .offer-badge {
            background-color: #262626;
            color: white;
            padding: 4px 12px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 600;
            display: inline-block;
            margin-bottom: 12px;
        }

        .offer-content {
            display: flex;
            gap: 12px;
        }

        .offer-image {
            flex-shrink: 0;
            width: 64px;
            height: 64px;
            background-color: #f5f5f5;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
        }

        .offer-info {
            flex: 1;
        }

        .offer-title {
            font-weight: 600;
            font-size: 14px;
            margin-bottom: 4px;
        }

        .old-price {
            font-size: 12px;
            color: #dc2626;
            text-decoration: line-through;
            margin-bottom: 4px;
        }

        .new-price {
            font-size: 18px;
            font-weight: 700;
            color: #16a34a;
        }

        .offer-btn {
            background-color: #16a34a;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            align-self: center;
            transition: background-color 0.2s;
        }

        .offer-btn:hover {
            background-color: #15803d;
        }

        .payment-option {
            background: white;
            border-radius: 12px;
            padding: 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            border: 2px solid transparent;
            transition: border-color 0.2s;
        }

        .payment-option:hover {
            border-color: #e91e63;
        }

        .payment-option.selected {
            border-color: #e91e63;
        }

        .payment-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .payment-icon {
            width: 48px;
            height: 48px;
            background-color: #f5f5f5;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
        }

        .payment-label {
            font-weight: 600;
            font-size: 14px;
        }

        .payment-desc {
            font-size: 12px;
            color: #737373;
        }

        .radio {
            width: 20px;
            height: 20px;
            border: 2px solid #e91e63;
            border-radius: 50%;
            position: relative;
        }

        .radio.selected::after {
            content: '';
            position: absolute;
            width: 10px;
            height: 10px;
            background-color: #e91e63;
            border-radius: 50%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        .pay-button {
            width: 100%;
            background-color: #e91e63;
            color: white;
            border: none;
            padding: 20px;
            font-size: 18px;
            font-weight: 600;
            border-radius: 12px;
            cursor: pointer;
            margin-bottom: 12px;
            transition: background-color 0.2s;
        }

        .pay-button:hover {
            background-color: #c2185b;
        }

        .pay-button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }

        .terms-text {
            font-size: 12px;
            color: #737373;
            text-align: center;
            margin-bottom: 24px;
        }

        .review-card {
            background: white;
            border-radius: 12px;
            padding: 16px;
            margin-bottom: 12px;
        }

        .review-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 8px;
        }

        .review-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: linear-gradient(135deg, rgba(233, 30, 99, 0.3), rgba(233, 30, 99, 0.3));
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
        }

        .review-name {
            font-weight: 600;
            font-size: 14px;
        }

        .stars {
            display: flex;
            gap: 2px;
        }

        .star {
            color: #fbbf24;
            font-size: 14px;
        }

        .star.empty {
            color: #d1d5db;
        }

        .review-text {
            font-size: 14px;
            color: #737373;
        }

        /* Modal Pix */
        .pix-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            z-index: 1000;
            overflow-y: auto;
            padding: 20px;
        }

        .pix-modal.active {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .pix-content {
            background: white;
            border-radius: 12px;
            padding: 24px;
            max-width: 448px;
            width: 100%;
            position: relative;
        }

        .pix-close {
            position: absolute;
            top: 16px;
            right: 16px;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #737373;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background-color 0.2s;
        }

        .pix-close:hover {
            background-color: #f5f5f5;
        }

        .pix-header {
            text-align: center;
            margin-bottom: 24px;
        }

        .pix-title {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 8px;
        }

        .pix-status {
            display: inline-block;
            background-color: #fef3c7;
            color: #92400e;
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 600;
        }

        .qrcode-container {
            background-color: white;
            padding: 20px;
            border-radius: 12px;
            margin: 20px 0;
            text-align: center;
            border: 2px solid #e5e5e5;
        }

        .qrcode-container img {
            max-width: 280px;
            width: 100%;
            height: auto;
        }

        .pix-code {
            background-color: #f5f5f5;
            padding: 12px;
            border-radius: 8px;
            margin: 16px 0;
            word-break: break-all;
            font-family: monospace;
            font-size: 11px;
            color: #262626;
            border: 1px dashed #e91e63;
            max-height: 100px;
            overflow-y: auto;
        }

        .copy-btn {
            width: 100%;
            background-color: #16a34a;
            color: white;
            border: none;
            padding: 12px;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.2s;
            margin-bottom: 12px;
        }

        .copy-btn:hover {
            background-color: #15803d;
        }

        .copy-btn.copied {
            background-color: #0891b2;
        }

        .pix-info {
            background-color: #f0f9ff;
            padding: 12px;
            border-radius: 8px;
            font-size: 13px;
            color: #075985;
            margin-top: 16px;
            line-height: 1.5;
        }

        .pix-expiration {
            text-align: center;
            color: #dc2626;
            font-weight: 600;
            margin-top: 16px;
            font-size: 14px;
        }

        .loading-spinner {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid #f3f3f3;
            border-top: 3px solid #e91e63;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .error-message {
            background-color: #fee;
            color: #dc2626;
            padding: 12px;
            border-radius: 8px;
            margin: 16px 0;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Carrinho -->
        <div class="card">
            <div class="card-header">
                <h2 class="card-title">Seu carrinho</h2>
                <div class="dot"></div>
            </div>

            <div class="cart-item">
                <div class="product-image">📱</div>
                <div class="product-info">
                    <div class="product-name">iPad 6ª geração A2696 10.9" 64GB rosa 4GB de memória RAM</div>
                    <div class="product-stock">Últimas Unidades</div>
                    <div class="quantity-controls">
                        <button class="qty-btn" onclick="updateQuantity(-1)">
                            <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
                            </svg>
                        </button>
                        <span class="qty-value"><span id="quantity">1</span>x</span>
                        <button class="qty-btn" onclick="updateQuantity(1)">
                            <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div style="border-top: 1px solid #e5e5e5; padding-top: 12px;">
                <div class="price-row">
                    <span class="text-muted">Subtotal</span>
                    <span id="subtotal">R$ 69,90</span>
                </div>
                <div class="price-row">
                    <span class="text-muted">Frete:</span>
                    <span class="text-muted">-</span>
                </div>
                <div class="price-row total">
                    <span>Total</span>
                    <span id="total">R$ 69,90</span>
                </div>
            </div>
        </div>

        <!-- Identificação -->
        <div class="card">
            <div class="section-header">
                <div class="icon-circle">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                    </svg>
                </div>
                <h2 class="card-title">Identificação</h2>
            </div>

            <div class="input-group">
                <label for="name">Nome completo</label>
                <input type="text" id="name" placeholder="Nome e sobrenome">
            </div>

            <div class="input-group">
                <label for="email">E-mail</label>
                <input type="email" id="email" placeholder="seu@email.com">
            </div>

            <div class="input-group">
                <label for="document">CPF/CNPJ</label>
                <input type="text" id="document" placeholder="Número do documento" maxlength="14">
            </div>
        </div>

        <!-- Endereço -->
        <div class="card">
            <div class="section-header">
                <div class="icon-circle">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                    </svg>
                </div>
                <h2 class="card-title">Endereço</h2>
            </div>

            <div class="input-group">
                <input type="text" id="cep" placeholder="CEP">
            </div>

            <div class="input-group">
                <input type="text" id="number" placeholder="N da residência">
            </div>

            <div class="input-group">
                <input type="text" id="street" placeholder="Rua">
            </div>

            <div class="input-group">
                <input type="text" id="city" placeholder="Cidade">
            </div>

            <div class="input-group">
                <select id="state">
                    <option value="">Estado</option>
                    <option value="AC">AC</option>
                    <option value="AL">AL</option>
                    <option value="AP">AP</option>
                    <option value="AM">AM</option>
                    <option value="BA">BA</option>
                    <option value="CE">CE</option>
                    <option value="DF">DF</option>
                    <option value="ES">ES</option>
                    <option value="GO">GO</option>
                    <option value="MA">MA</option>
                    <option value="MT">MT</option>
                    <option value="MS">MS</option>
                    <option value="MG">MG</option>
                    <option value="PA">PA</option>
                    <option value="PB">PB</option>
                    <option value="PR">PR</option>
                    <option value="PE">PE</option>
                    <option value="PI">PI</option>
                    <option value="RJ">RJ</option>
                    <option value="RN">RN</option>
                    <option value="RS">RS</option>
                    <option value="RO">RO</option>
                    <option value="RR">RR</option>
                    <option value="SC">SC</option>
                    <option value="SP">SP</option>
                    <option value="SE">SE</option>
                    <option value="TO">TO</option>
                </select>
            </div>

            <div class="input-group">
                <input type="text" id="complement" placeholder="Complemento (opcional)">
            </div>
        </div>

        <!-- Método de Pagamento -->
        <div>
            <h2 class="section-title">Escolha um método de pagamento...</h2>

            <div class="offer-card">
                <div class="offer-badge">Oferta exclusiva para você!</div>
                <div class="offer-content">
                    <div class="offer-image">⌨️</div>
                    <div class="offer-info">
                        <div class="offer-title">Magic Keyboard para Mini iPad</div>
                        <div class="old-price">de R$ 159,90</div>
                        <div class="new-price">R$ 39,90</div>
                    </div>
                    <button class="offer-btn" onclick="addOffer()">Eu quero!</button>
                </div>
            </div>

            <div class="payment-option selected" onclick="selectPayment(this)">
                <div class="payment-content">
                    <div class="payment-icon">💳</div>
                    <div>
                        <div class="payment-label">Pagamento via Pix</div>
                        <div class="payment-desc">Aprovação imediata.</div>
                    </div>
                </div>
                <div class="radio selected"></div>
            </div>
        </div>

        <!-- Botão Pagar -->
        <button class="pay-button" id="payButton" onclick="processPayment()">Pagar</button>

        <p class="terms-text">
            Ao finalizar o pagamento você concorda com nossos termos de uso e privacidade.
        </p>

        <!-- Avaliações -->
        <div class="review-card">
            <div class="review-header">
                <div class="review-avatar">👩</div>
                <div style="flex: 1;">
                    <div class="review-name">Carla Alves</div>
                    <div class="stars">
                        <span class="star">★</span>
                        <span class="star">★</span>
                        <span class="star">★</span>
                        <span class="star">★</span>
                        <span class="star empty">★</span>
                    </div>
                </div>
            </div>
            <p class="review-text">"Maravilhoooooo, aproveite e peguei, chegou super rápido, é perfeito!"</p>
        </div>

        <div class="review-card">
            <div class="review-header">
                <div class="review-avatar">👨</div>
                <div style="flex: 1;">
                    <div class="review-name">André Silva</div>
                    <div class="stars">
                        <span class="star">★</span>
                        <span class="star">★</span>
                        <span class="star">★</span>
                        <span class="star">★</span>
                        <span class="star">★</span>
                    </div>
                </div>
            </div>
            <p class="review-text">"Produto excelente, recomendo demais!"</p>
        </div>
    </div>

    <!-- Modal Pix -->
    <div class="pix-modal" id="pixModal">
        <div class="pix-content">
            <button class="pix-close" onclick="closePixModal()">×</button>
            
            <div id="pixLoading" style="display: none; text-align: center;">
                <div class="loading-spinner" style="margin: 20px auto;"></div>
                <p>Gerando seu Pix...</p>
            </div>

            <div id="pixSuccess" style="display: none;">
                <div class="pix-header">
                    <h2 class="pix-title">✅ Pix Gerado!</h2>
                    <div class="pix-status">Aguardando Pagamento</div>
                </div>
                
                <p style="text-align: center; color: #737373; font-size: 14px; margin-bottom: 16px;">
                    Escaneie o QR Code ou copie o código:
                </p>
                
                <div class="qrcode-container">
                    <img id="qrcodeImage" src="" alt="QR Code Pix">
                </div>

                <div class="pix-code" id="pixCode"></div>

                <button class="copy-btn" id="copyBtn" onclick="copyPixCode()">
                    📋 Copiar Código Pix
                </button>

                <div class="pix-expiration">
                    ⏰ Expira em: <span id="expirationDate"></span>
                </div>

                <div class="pix-info">
                    💡 Após realizar o pagamento, você receberá a confirmação por e-mail e seu pedido será processado automaticamente.
                </div>
            </div>

            <div id="pixError" style="display: none; text-align: center;">
                <h2 class="pix-title">❌ Erro ao Gerar Pix</h2>
                <div class="error-message" id="errorMessage"></div>
                <button class="pay-button" onclick="closePixModal()">Tentar Novamente</button>
            </div>
        </div>
    </div>

    <script>
        // ⚠️ ATENÇÃO: ESTA CONFIGURAÇÃO DEVE ESTAR NO BACKEND EM PRODUÇÃO!
        const NIVUS_API_URL = 'https://api.nivuspayments.com.br/v1/transactions';
        const NIVUS_API_KEY = 'Basic cGtfMUh3RFJGd3hVakhudXdUbE5zMVVHMTZOUXhhNS05MUlwV0ZpT0ZHd2JqVG82cE5JOnNrX1BqSjJPdlJzRmZDeXB5a3dCdzV3SjNUUHFJa09EbVJDU19ORi1IVk83dDk2c1p3OA==';

        let quantity = 1;
        const basePrice = 69.90;
        let currentPixCode = '';

        // Máscara para CPF
        document.getElementById('document').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                value = value.replace(/(\d{3})(\d)/, '$1.$2');
                value = value.replace(/(\d{3})(\d)/, '$1.$2');
                value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            }
            e.target.value = value;
        });

        function updateQuantity(delta) {
            quantity = Math.max(1, quantity + delta);
            document.getElementById('quantity').textContent = quantity;
            updatePrices();
        }

        function updatePrices() {
            const total = (basePrice * quantity).toFixed(2).replace('.', ',');
            document.getElementById('subtotal').textContent = `R$ ${total}`;
            document.getElementById('total').textContent = `R$ ${total}`;
        }

        function selectPayment(element) {
            document.querySelectorAll('.payment-option').forEach(option => {
                option.classList.remove('selected');
                option.querySelector('.radio').classList.remove('selected');
            });
            element.classList.add('selected');
            element.querySelector('.radio').classList.add('selected');
        }

        function addOffer() {
            alert('Oferta adicionada ao carrinho!');
        }

        async function processPayment() {
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const document = document.getElementById('document').value.replace(/\D/g, '');
            const cep = document.getElementById('cep').value.trim();
            const street = document.getElementById('street').value.trim();
            const city = document.getElementById('city').value.trim();
            const state = document.getElementById('state').value;

            // Validações
            if (!name || !email || !document || !cep || !street || !city || !state) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }

            if (document.length !== 11) {
                alert('CPF inválido! Digite os 11 dígitos.');
                return;
            }

            // Validação básica de email
            if (!email.includes('@')) {
                alert('E-mail inválido!');
                return;
            }

            // Desabilita botão e mostra modal com loading
            const payButton = document.getElementById('payButton');
            payButton.disabled = true;
            payButton.innerHTML = '<span class="loading-spinner"></span> Processando...';

            document.getElementById('pixModal').classList.add('active');
            document.getElementById('pixLoading').style.display = 'block';
            document.getElementById('pixSuccess').style.display = 'none';
            document.getElementById('pixError').style.display = 'none';

            try {
                // Calcula valor total em centavos
                const totalAmount = Math.round(basePrice * quantity * 100);

                // Cria pagamento Pix na Nivus
                const response = await axios.post(NIVUS_API_URL, {
                    paymentMethod: 'pix',
                    pix: { expiresInDays: 1 },
                    items: [{
                        title: 'iPad 6ª geração A2696 10.9" 64GB rosa',
                        unitPrice: Math.round(basePrice * 100),
                        quantity: quantity,
                        tangible: true
                    }],
                    customer: {
                        name: name,
                        email: email,
                        document: {
                            type: 'cpf',
                            number: document
                        }
                    },
                    amount: totalAmount
                }, {
                    headers: {
                        'accept': 'application/json',
                        'authorization': NIVUS_API_KEY,
                        'content-type': 'application/json'
                    }
                });

                console.log('Resposta Nivus:', response.data);

                // Esconde loading e mostra sucesso
                document.getElementById('pixLoading').style.display = 'none';
                document.getElementById('pixSuccess').style.display = 'block';

                // Preenche os dados do Pix
                const pixData = response.data.pix;
                
                // Gera QR Code
                const qrcodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(pixData.qrcode)}`;
                document.getElementById('qrcodeImage').src = qrcodeUrl;
                
                // Código Pix
                document.getElementById('pixCode').textContent = pixData.qrcode;
                currentPixCode = pixData.qrcode;
                
                // Data de expiração
                const expirationDate = new Date(pixData.expirationDate);
                document.getElementById('expirationDate').textContent = expirationDate.toLocaleDateString('pt-BR');

            } catch (error) {
                console.error('Erro ao criar pagamento:', error);
                
                document.getElementById('pixLoading').style.display = 'none';
                document.getElementById('pixError').style.display = 'block';
                
                let errorMsg = 'Ocorreu um erro ao gerar o Pix. Por favor, tente novamente.';
                if (error.response?.data?.message) {
                    errorMsg = error.response.data.message;
                }
                document.getElementById('errorMessage').textContent = errorMsg;
            } finally {
                payButton.disabled = false;
                payButton.innerHTML = 'Pagar';
            }
        }

        function copyPixCode() {
            const copyBtn = document.getElementById('copyBtn');
            navigator.clipboard.writeText(currentPixCode).then(() => {
                copyBtn.textContent = '✅ Copiado!';
                copyBtn.classList.add('copied');
                
                setTimeout(() => {
                    copyBtn.textContent = '📋 Copiar Código Pix';
                    copyBtn.classList.remove('copied');
                }, 2000);
            }).catch(() => {
                alert('Erro ao copiar. Tente selecionar o texto manualmente.');
            });
        }

        function closePixModal() {
            document.getElementById('pixModal').classList.remove('active');
        }

        // Fecha modal ao clicar fora
        document.getElementById('pixModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closePixModal();
            }
        });
    </script>
</body>
</html>
