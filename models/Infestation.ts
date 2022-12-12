export default class Infestation {
  pk: string;
  insect: Insect;
  recommendation_description: string;
  organic_control: string;
  link: string;
  symptoms: Array<Symptom>;
  prevent_measures: Array<PreventMeasure>;
  chemical_controls: Array<ChemicalControls>;
  insect_stage: string;

  constructor(
    pk: string,
    insect: Insect,
    recommendation_description: string,
    organic_control: string,
    link: string,
    symptoms: Array<Symptom>,
    prevent_measures: Array<PreventMeasure>,
    chemical_controls: Array<ChemicalControls>,
    insect_stage: string,
  ) {
    this.pk = pk
    this.insect = insect
    this.recommendation_description = recommendation_description
    this.organic_control = organic_control
    this.link = link
    this.symptoms = symptoms
    this.prevent_measures = prevent_measures
    this.chemical_controls = chemical_controls
    this.insect_stage = insect_stage
  }

}

export class Insect {
  pk: string;
  name: string;
  link: string;
  insect_image: string;

  constructor(
    pk: string,
    name: string,
    link: string,
    insect_image: string
  ) {
    this.pk = pk
    this.name = name
    this.link = link
    this.insect_image = insect_image
  }
}

export class ChemicalControls {
  pk: string;
  reminder: string;
  link: string;
  instructions: Array<Instruction>;
  safety_precautions: Array<SafetyPrecaution>;
  insecticides: Array<ChemicalInsecticide>;
  hazard_level: string;

  constructor(
    pk: string,
    reminder: string,
    link: string,
    instructions: Array<Instruction>,
    safety_precautions: Array<SafetyPrecaution>,
    insecticides: Array<ChemicalInsecticide>,
    hazard_level: string
  ) {
    this.pk = pk
    this.reminder = reminder
    this.link = link
    this.instructions = instructions
    this.safety_precautions = safety_precautions
    this.insecticides = insecticides
    this.hazard_level = hazard_level
  }

}

export class Insecticide {
  pk: string;
  name: string;
  acronym: string;
  link: string;
  insecticide_image: string;

  constructor(
    pk: string,
    name: string,
    acronym: string,
    link: string,
    insecticide_image: string
  ) {
    this.pk = pk
    this.name = name
    this.acronym = acronym
    this.link = link
    this.insecticide_image = insecticide_image
  }

}

export class ChemicalInsecticide {
  pk: string;
  insecticide: Insecticide;
  percentage: string;


  constructor(pk: string, insecticide: Insecticide, percentage: string) {
    this.pk = pk
    this.insecticide = insecticide
    this.percentage = percentage
  }

}

export class SafetyPrecaution {
  pk: string;
  description: string;
  icon_image: string;
  link: string;

  constructor(
    pk: string,
    description: string,
    icon_image: string,
    link: string,
  ) {
    this.pk = pk
    this.description = description
    this.icon_image = icon_image
    this.link = link
  }

}

export class Instruction {
  pk: string;
  description: string;
  icon_image: string;
  link: string;

  constructor(
    pk: string,
    description: string,
    icon_image: string,
    link: string
  ) {
    this.pk = pk
    this.description = description
    this.icon_image = icon_image
    this.link = link
  }
}

export class PreventMeasure {
  id: string;
  description: string;
  link: string;
  prevent_image: string;
  constructor(
    id: string,
    description: string,
    link: string,
    prevent_image: string
  ) {
    this.id = id
    this.description = description
    this.link = link
    this.prevent_image = prevent_image
  }
}

export class Symptom {
  id: string;
  description: string;
  link: string;
  symptom_image: string;

  constructor(
    id: string,
    description: string,
    link: string,
    symptom_image: string
  ) {
    this.id = id
    this.description = description
    this.link = link
    this.symptom_image = symptom_image
  }

}