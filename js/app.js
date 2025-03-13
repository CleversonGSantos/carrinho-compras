/**
 * Valida a quantidade inserida.
 * @param {number} quantidade - A quantidade do produto.
 * @returns {boolean} - Retorna true se a quantidade for válida, caso contrário, false.
 */
function validarQuantidade(quantidade) {
    if (isNaN(quantidade)) {
        alert("Por favor, insira uma quantidade válida.");
        return false;
    }
    return true;
}

/**
 * Extrai e valida o valor do produto.
 * @param {string} produto - A string do produto no formato "Produto - R$Valor".
 * @returns {number} - O valor do produto ou NaN se o valor for inválido.
 */
function extrairValorProduto(produto) {
    let valor = parseInt(produto.split('-').pop().trim().replace('R$', ''));
    if (isNaN(valor)) {
        alert("Por favor, insira um valor válido para o produto: " + produto);
    }
    return valor;
}

/**
 * Cria um elemento de produto para adicionar ao carrinho.
 * @param {Object} produtoInfo - As informações do produto.
 * @returns {HTMLElement} - O elemento do produto.
 */
function criarElementoProduto(produtoInfo) {
    let item = document.createElement('section');
    item.className = 'carrinho__produtos__produto';
    item.innerHTML = `<span class="texto-azul">${produtoInfo.quantidade}x</span> ${produtoInfo.nome} <span class="texto-azul">R$${produtoInfo.valorTotal}</span>`;
    return item;
}

/**
 * Adiciona produtos ao carrinho de compras.
 * Obtém os valores dos campos de entrada, valida-os e atualiza a lista de produtos e o valor total no carrinho.
 */
function adicionar() {
    let produtoSelecionado = document.getElementById('produto').value.trim();
    let quantidade = parseInt(document.getElementById('quantidade').value.trim());
    let valorTotal = parseInt(document.getElementById('valor-total').textContent.trim().replace('R$', '')) || 0;
    let listaCarrinho = document.getElementById('lista-produtos');
    let produtos = produtoSelecionado.split(',');

    if (!validarQuantidade(quantidade)) {
        return;
    }

    for (let i = 0; i < produtos.length; i++) {
        let produtoAtual = produtos[i].trim();
        let valor = extrairValorProduto(produtoAtual);
        
        if (isNaN(valor)) {
            return;
        }
        
        let produtoInfo = {
            nome: produtoAtual.split('-')[0].trim(),
            quantidade: quantidade,
            valor: valor,
            valorTotal: quantidade * valor
        };
        
        let item = criarElementoProduto(produtoInfo);
        listaCarrinho.appendChild(item);

        valorTotal += produtoInfo.valorTotal;
    }

    document.getElementById('valor-total').textContent = `R$${valorTotal}`;
}

function limpar() { 
    document.getElementById('lista-produtos').innerHTML = '';
    document.getElementById('valor-total').textContent = 'R$0';
    document.getElementById('quantidade').value = '';
}