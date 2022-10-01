import { ChemicalInsecticide } from "../models/Infestation";

export const handleGetNames = (insecticides: Array<ChemicalInsecticide>) => {
    let names = "";
    if (insecticides.length > 0) {
      insecticides.map((data: ChemicalInsecticide) => {
        names += `${data.insecticide.name} ${data.percentage}% `;
      });
    }
    return names;
  };
