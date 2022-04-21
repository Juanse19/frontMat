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

export interface showStatusMachinesAlarms {
        
    StatusMartin: boolean,        
    StatusJs: boolean,        
    Status924: boolean,        
    StatusSyS: boolean,        
    StatusLaminadora: boolean,        
    StatusWard: boolean,
    Impresora: boolean,         
    StatusiD_12: boolean,        
    StatusiD_22: boolean,        
    StatussT1: boolean,        
    StatussT2: boolean,       
    StatusiM1: boolean,       
    StatussT3: boolean,       
    StatussT4: boolean,       
    StatussT5: boolean,       
    StatussT6: boolean,       
    StatussT7: boolean,       
    StatussT8: boolean,       
    StatussT9: boolean,       
    StatussT10: boolean,      
    StatussT11: boolean,       
    StatussT12: boolean,      
    StatussT13: boolean,      
    StatussT14: boolean,       
    StatussT15: boolean,      
    StatusiM2: boolean,      
    StatusiM3: boolean,       
    StatusiM4: boolean,       
    StatusiM5: boolean,       
    StatusiM6: boolean,       
    StatusiM7: boolean,       
    StatuscT2: boolean,       
    StatuscT1: boolean,       
    Statustm: boolean,       
    StatustF1: boolean,       
    StatustF2: boolean,
    StatusPrefeeder_Martin: boolean,
    StatusPrefeeder_Js: boolean,
    StatusPrefeeder_925: boolean,
    StatusPrefeeder_Sys: boolean,
    StatusPrefeeder_Ward15000: boolean,
    StatusPrefeeder_Eterna: boolean,
    StatusPrefeeder_Impresora36: boolean,
    StatusPrefeeder_Laminadora: boolean,
    StatusTornamesa: boolean,
    StatusCt: boolean,
    StatusCt1: boolean,
    StatusCt2: boolean
}

export interface RouteCTS {
  RutaCtA: string,
  RutaCtB: string,
  RutaCt1: string,
  RutaCt2: string,
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
  y?: number,
  height?:number,
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
  width: number;
  lenght: number;
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

export interface Sic {
  id: number,
  listaCorteSIC: number,
  listaCorrtrim: number,
  orden: number,
  pedido: number,
  tarjeta: string,
  longitudOrden_Planeado: number,
  numeroCortes: number,
  largoLamina_Planeado: number,
  anchoLamina_Planeado: number,
  espesorLamina_Planeado: number,
  origen: string,
  destino: string,
  hojasParaHacer_Planeado: number,
  estado: string
  }

export interface Syncro {
  id: number,
  position: string,
  setupID: string,
  modID: string,
  webWidth: string,
  trimType: string,
  valid: string,
  scoreGap: string,
  qualityID: string,
  trim: string,
  slitsTandem: string,
  scoresTandem: string,
  shaftMask: string,
  constantSystem: string,
  tandem: string,
  knifeOnly: string,
  noChange_STK_0: string,
  noChange_STK_1: string,
  noChange_STK_2: string,
  cutToMark0: string,
  cutToMark1: string,
  cutToMark2: string,
  orderNumber0: string,
  delivery0: string,
  customerName0: string,
  sheetWidth0: string,
  outs0: string,
  scoreMeasures0: string,
  scoreType0: string,
  positType0: string,
  teleTwinOffset0: string,
  scoreGap0: string,
  levelName0: string,
  sheetLength0: string,
  segmentSheetCount0: string,
  sheetsPerStack0: string,
  stacksPerPallet0: string,
  sending0: string,
  orderNumber1: string,
  delivery1: string,
  customerName1: string,
  sheetWidth1: string,
  outs1: string,
  scoreMeasures1: string,
  scoreType1: string,
  positType1: string,
  teleTwinOffset1: string,
  scoreGap1: string,
  levelName1: string,
  sheetLength1: string,
  segmentSheetCount1: string,
  sheetsPerStack1: string,
  stacksPerPallet1: string,
  sending1: string,
  orderNumber2: string,
  deliver2: string,
  customerName2: string,
  sheetWidth2: string,
  outs2: string,
  scoreMeasures2: string,
  scoreType2: string,
  positType2: string,
  teleTwinOffset2: string,
  scoreGap2: string,
  levelName2: string,
  sheetLength2: string,
  segmentSheetCount2: string,
  sheetsPerStack2: string,
  stacksPerPallet2: string,
  sending2: string,
  plungedSlitMask: string,
  sepSlitMask: string,
  slitPosition: string,
  startScorer: string,
  scoreCount: string,
  supportScore: string,
  scorePosition: string,
  _x0032_LevelWebDirMask: string,
  _x0033_LevelWebDirMask: string,
  rcsSectorMask: string,
  tearTapePosition: string,
  tearTapeCount: string,
  cutToPattern0: string,
  dataToPrint0_1: string,
  dataToPrint0_2: string,
  dataToPrint0_3: string,
  dataToPrint0_4: string,
  stackerContStack0: string,
  stackerPallet0: string,
  stackerNote0: string,
  custAddress0: string,
  mthCode0: string,
  mthNextMachine0: string,
  numberOfPalletLayout0: string,
  amountOfPalletCopy0: string,
  numberOfPastOrderLayout0: string,
  amountOfPastOrderCopy0: string,
  prePrint0: string,
  dischargeSide0: string,
  balance0: string,
  stackOrBundle0: string,
  cutToPattern1: string,
  dataToPrint1_1: string,
  dataToPrint1_2: string,
  dataToPrint1_3: string,
  dataToPrint1_4: string,
  stackerContStack1: string,
  stackerPallet1: string,
  stackerNote1: string,
  custAddress1: string,
  mthCode1: string,
  mthNextMachine1: string,
  numberOfPalletLayout1: string,
  amountOfPalletCopy1: string,
  numberOfPastOrderLayout1: string,
  amountOfPastOrderCopy1: string,
  prePrint1: string,
  dischargeSide1: string,
  balance1: string,
  stackOrBundle1: string,
  cutToPattern2: string,
  dataToPrint2_1: string,
  dataToPrint2_2: string,
  dataToPrint2_3: string,
  dataToPrint2_4: string,
  stackerContStack2: string,
  stackerPallet2: string,
  stackerNote2: string,
  custAddress2: string,
  mthCode2: string,
  mthNextMachine2: string,
  numberOfPalletLayout2: string,
  amountOfPalletCopy2: string,
  numberOfPastOrderLayout2: string,
  amountOfPastOrderCopy2: string,
  prePrint2: string,
  dischargeSide2: string,
  balance2: string,
  stackOrBundle2: string,
  officeID: string
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

