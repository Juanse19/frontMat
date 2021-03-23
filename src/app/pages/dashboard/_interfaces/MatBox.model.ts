export interface MachineColor {
  colorMartin1228: string,
  colorWARD15000: string,
  colorLaminadora: string,
  colorImpresora36: string,
  colorJS: string,
  color924: string,
  colorSYS: string,
}

export interface WipName {
  iD_12: string,
  iD_22: string,
  sT1: string,
  sT2: string,
  iM1: string,
  sT3: string,
  sT4: string,
  sT5: string,
  sT6: string,
  sT7: string,
  sT8: string,
  sT9: string,
  sT10: string,
  sT11: string,
  sT12: string,
  sT13: string,
  sT14: string,
  sT15: string,
  iM2: string,
  iM3: string,
  iM4: string,
  iM5: string,
  iM6: string,
  iM7: string,
  cT2: string,
  cT1: string,
  cT_1: string,
  cT_2: string,
  tm: string,
  tF1: string,
  tF2: string,
}

export interface WipColor {
  colorST1: string,
  colorST2: string,
  colorST3: string,
  colorST4: string,
  colorST5: string,
  colorST6: string,
  colorST7: string,
  colorST8: string,
  colorST9: string,
  colorST10: string,
  colorST11: string,
  colorST12: string,
  colorST13: string,
  colorST14: string,
  colorST15: string,
}

export interface PackagesWIP {
  id: number,
  order: string,
  description: string,
  valor: string,
  idMaquina: number,
  name: string,
  visible: boolean,
  cutLength: number,
  state: number,
  ngStyle: NgStyle
}

export interface NgStyle {
  fill: string,
  width: number,
  x: number,
  fillOpacity: number,
}

//--- Interface Dashboard 
export interface Ordenes {
  id?: number;
  order: string;
  name: string;
  description: string;
  reference: string;
  orderLength: number;
}

export interface Propiedades {
  id?: number;
  name: string;
  description: string;
  isOn: boolean;
  type: string;
  valor: string;
  prioridad: number;
}

export interface Wip {
  id?: number;
  name: string;
  description: string;
}

export interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
}


export interface SearchResult2 {
  ordenes: Ordenes[];
  total: number;
}



export const IdMaquinas = {
  Martin1228: 22,
  WARD15000: 39,
  Laminadora: 40,
  Impresora36: 41,
  JS: 43,
  M924: 44,
  SYS: 45,
}

export const IdWip = {
  ST1: 20,
  ST2: 21,
  ST3: 23,
  ST4: 24,
  ST5: 25,
  ST6: 26,
  ST7: 30,
  ST8: 31,
  ST9: 32,
  ST10: 33,
  ST11: 34,
  ST12: 35,
  ST13: 36,
  ST14: 37,
  ST15: 38,
  CT2: 48,
  CT1: 49,
  TM: 54,
  CT_1: 51,
  CT_2: 52,
  ID12: 14,
  ID22: 18,
  TF1: 56,
  TF2: 58,
  IM1: 22,
  IM2: 39,
  IM3: 40,
  IM4: 41,
  IM5: 43,
  IM6: 44,
  IM7: 45,
}

export interface OrderProcess {
  Id: number,
  Order: string,
}