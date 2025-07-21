import fs from "fs";
import csv from "csv-parser";
import { Item } from "./interface";

export const readCSV = async (filePath: string): Promise<Item[]> => {
  return new Promise((resolve, reject) => {
    const results: Item[] = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        const item: Item = {
          nome: data.NOME,
          peso: parseFloat(data.PESO),
          valor: parseFloat(data.VALOR),
          quantidade: parseInt(data.QUANTIDADE),
        };
        results.push(item);
      })
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
  });
};
