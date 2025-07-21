import { createObjectCsvWriter as createCsvWriter } from "csv-writer";
import { Item } from "./interface";

export const writeCSV = async (
  filePath: string,
  item: Item[]
): Promise<void> => {
  const csvWriter = createCsvWriter({
    path: filePath,
    header: [
      { id: "nome", title: "NOME" },
      { id: "peso", title: "PESO" },
      { id: "valor", title: "VALOR" },
      { id: "quantidade", title: "QUANTIDADE" },
    ],
  });
  await csvWriter.writeRecords(item);
};
