import { readCSV } from "../model/readCSV";
import { writeCSV } from "../model/writeCSV";
import { Item } from "../model/interface";
import fs from "fs";

const filePath = "./db/estoque.csv";

// Método para adicionar um item ao estoque
export class estoqueService {
  async criar(item: Item) {
    if (typeof item.nome !== "string" || item.nome.trim() === "") {
      throw new Error("Digite um texto válido");
    }
    if (isNaN(item.peso) || item.peso <= 0) {
      throw new Error("O peso deve ser um número positivo");
    }
    if (isNaN(item.valor) || item.valor <= 0) {
      throw new Error("O valor deve ser um número positivo");
    }
    if (!Number.isInteger(item.quantidade) || item.quantidade <= 0) {
      throw new Error("A quantidade deve ser um número inteiro e positivo");
    }

    // Verifica se o item já existe no estoque
    const itensExistentes = await readCSV(filePath);
    const itemExistente = itensExistentes.find((i) => i.nome === item.nome);
    if (itemExistente) {
      throw new Error("O item já existe no estoque.");
    }

    // Adiciona o item e salva
    itensExistentes.push(item);
    await writeCSV(filePath, itensExistentes);
  }

  // Método para remover itens
  async remover(nome: string) {
    const estoqueAtual = await readCSV(filePath);
    const itemEncontrado = estoqueAtual.find((item) => item.nome === nome);

    if (!itemEncontrado) {
      throw new Error("Item não encontrado no estoque");
    }

    const estoqueAtualizado = estoqueAtual.filter((item) => item.nome !== nome);
    await writeCSV(filePath, estoqueAtualizado);
    return true;
  }

  // Listar os itens
  async listarItens() {
    const itens = await readCSV(filePath);
    return itens;
  }

  // Valor total dos itens
  async valorTotal() {
    const itens: Item[] = await readCSV(filePath);
    let total = 0;
    for (const item of itens) {
      total += item.valor * item.quantidade;
    }
    return total;
  }

  // Peso total dos itens
  async pesoTotal() {
    const itens: Item[] = await readCSV(filePath);
    let pesoTotal = 0;

    for (const item of itens) {
      pesoTotal += item.peso * item.quantidade;
    }
    return pesoTotal;
  }

  // Média de valor dos itens
  async mediaValor() {
    const itens: Item[] = await readCSV(filePath);
    if (itens.length === 0) {
      return 0;
    }
    let somaValores = 0;
    let totalItens = 0;
    for (const item of itens) {
      somaValores += item.valor * item.quantidade;
      totalItens += item.quantidade;
    }
    return somaValores / totalItens;
  }

  // Média de peso dos itens
  async mediaPeso() {
    const itens: Item[] = await readCSV(filePath);
    if (itens.length === 0) {
      return 0;
    }
    let totalPeso = 0;
    let totalItens = 0;

    for (const item of itens) {
      totalPeso += item.peso * item.quantidade;
      totalItens += item.quantidade;
    }
    return totalPeso / totalItens;
  }

  // Quantidade total de itens
  async totalItens() {
    const itens: Item[] = await readCSV(filePath);
    let total = 0;
    for (const item of itens) {
      total += item.quantidade;
    }
    return total;
  }
  // Quantidade total de itens únicos
  async totalItensUnicos() {
    const itens: Item[] = await readCSV(filePath);
    return itens.length;
  }
}
