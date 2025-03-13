import { validarQuantidade, extrairValorProduto, criarElementoProduto } from './app';

describe('Testes da aplicação', () => {
  test('deve validar a quantidade corretamente', () => {
    expect(validarQuantidade(5)).toBe(true);
    expect(validarQuantidade(0)).toBe(false);
    expect(validarQuantidade(-1)).toBe(false);
    expect(validarQuantidade('abc')).toBe(false);
  });

  test('deve extrair o valor do produto corretamente', () => {
    expect(extrairValorProduto('Produto - R$100')).toBe(100);
    expect(extrairValorProduto('Produto - R$0')).toBe(NaN);
    expect(extrairValorProduto('Produto - R$abc')).toBe(NaN);
  });

  test('deve criar um elemento de produto corretamente', () => {
    const produtoInfo = { nome: 'Produto', quantidade: 2, valorTotal: 200 };
    const elemento = criarElementoProduto(produtoInfo);
    expect(elemento).toBeInstanceOf(HTMLElement);
    expect(elemento.className).toBe('carrinho__produtos__produto');
    expect(elemento.innerHTML).toBe('<span class="texto-azul">2x</span> Produto <span class="texto-azul">R$200</span>');
  });
});