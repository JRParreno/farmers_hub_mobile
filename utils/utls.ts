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
  return firstName.split(" ").map((n: string) => {
    return n.split("")[0].toLocaleUpperCase();
  });
}