import { estoqueService } from "../service/serviceEstoque";
const prompt = require("prompt-sync")({ sigint: true });

const serviceEstoque = new estoqueService();

export async function criar() {
  try {
    console.log("CADASTRAR ITEM");

    const nome = prompt("Nome: ");
    const peso = parseFloat(prompt("Peso (kg): "));
    const valor = parseFloat(prompt("Valor: "));
    const quantidade = parseInt(prompt("Quantidade: "));

    await serviceEstoque.criar({ nome, peso, valor, quantidade });
    console.log("O item foi cadastrado!");
  } catch (error) {
    console.log("Erro ao cadastrar item:", error);
  }
}

export async function removerItem() {
  try {
    const nome = prompt("Nome do item a remover: ");
    const estoqueAtual = await serviceEstoque.listarItens();
    const item = estoqueAtual.find((i) => i.nome === nome);

    if (!item) {
      console.log("Item não encontrado");
      return;
    }
    console.log(item);
    const confirmar = prompt("Confirmar remoção? (s/n): ");

    if (confirmar.toLowerCase() === "s") {
      await serviceEstoque.remover(nome);
      console.log("Item removido do estoque");
    } else {
      console.log("Remoção cancelada");
    }
  } catch (error) {
    console.log("Erro:", error);
  }
}

export async function listarItens() {
  try {
    const itens = await serviceEstoque.listarItens();
    if (itens.length === 0) {
      console.log("O estoque está vazio");
    } else {
      console.log("ITENS NO ESTOQUE: ");
      itens.forEach((item) => {
        console.log(
          `${item.nome}, ${item.quantidade} un., ${item.peso}kg, R$ ${item.valor}`
        );
      });
    }
  } catch (error) {
    console.log("Erro:", error);
  }
}

export async function valorTotal() {
  try {
    const total = await serviceEstoque.valorTotal();
    console.log(`Valor total R$${total.toFixed(2)}`);
  } catch (error) {
    console.log("Erro: ", error);
  }
}

export async function pesoTotal() {
  try {
    const pesoTotal = await serviceEstoque.pesoTotal();
    console.log(`Peso total: ${pesoTotal}kg`);
  } catch (error) {
    console.log("Erro:", error);
  }
}

export async function mediaValor() {
  try {
    const media = await serviceEstoque.mediaValor();
    console.log(`Média dos valores: R$${media.toFixed(2)}`);
  } catch (error) {
    console.log("Erro:", error);
  }
}

export async function mediaPeso() {
  try {
    const media = await serviceEstoque.mediaPeso();
    console.log(`Média de peso: ${media.toFixed(2)}kg`);
  } catch (error) {
    console.log("Erro:", error);
  }
}

export async function totalItens() {
  try {
    const total = await serviceEstoque.totalItens();
    console.log(`Quantidade total de itens no estoque: ${total}`);
  } catch (error) {
    console.log("Erro:", error);
  }
}

export async function totalItensUnicos() {
  try {
    const total = await serviceEstoque.totalItensUnicos();
    console.log(`Quantidade total de itens únicos: ${total}`);
  } catch (error) {
    console.log("Erro:", error);
  }
}
