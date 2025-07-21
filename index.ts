import { estoqueService } from "./service/serviceEstoque";
import { Item } from "./model/interface";
const prompt = require("prompt-sync")({ sigint: true });
import {
  criar,
  removerItem,
  listarItens,
  valorTotal,
  pesoTotal,
  mediaValor,
  mediaPeso,
  totalItens,
  totalItensUnicos,
} from "./controller/controleEstoque";

async function menu() {
  console.log(`
    ===== MENU PRINCIPAL =====
    1. Cadastrar item
    2. Remover item
    3. Listar itens
    4. Valor total
    5. Peso total do estoque
    6. Média de valor
    7. Média de peso
    8. Total de itens do estoque
    9. Total de produtos únicos
    `);
}

async function main() {
  let opcao: number;
  do {
    menu();
    opcao = parseInt(prompt("Digite a opção desejada: "));

    switch (opcao) {
      case 1:
        await criar();
        break;
      case 2:
        await removerItem();
        break;
      case 3:
        await listarItens();
        break;
      case 4:
        await valorTotal();
        break;
      case 5:
        await pesoTotal();
        break;
      case 6:
        await mediaValor();
        break;
      case 7:
        await mediaPeso();
        break;
      case 8:
        await totalItens();
        break;
      case 9:
        await totalItensUnicos();
        break;
      default:
        console.log("Opção inválida. Tente novamente");
    }
    if (opcao !== 0) {
      prompt("\nPressione enter para continuar");
    }
  } while (opcao !== 0);
}
main();
