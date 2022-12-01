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


export const getInitialName = (firstName: string) => {
  const nameSplit = firstName.split(" ");
  if (1 < nameSplit.length) {
    return nameSplit.map((n: string) => {
      if (n.split("")[0] !== undefined) {
        return n.split("")[0].toLocaleUpperCase();
      }
      return "";
    }).join("");
  }
  return nameSplit.length === 0 ? "" : nameSplit[0].toLocaleUpperCase();
}