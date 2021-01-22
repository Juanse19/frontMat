export interface MachineColor{
    colorMartin1228 :string,
    colorWARD15000  :string,
    colorLaminadora  :string,
    colorImpresora36  :string,
    colorJS  :string,
    color924  :string,
    colorSYS  :string,
}

export interface PackagesWIP{
    order :string,
    description  :string,
    valor  :string,
    idMaquina: number,
    name:string,
    visible:boolean,
}

export const IdMaquinas = {
    Martin1228 :22,
    WARD15000  : 39,
    Laminadora : 40,
    Impresora36 : 41,
    JS  : 43,
    M924  : 44 ,
    SYS  : 45,
}

export const IdWip = {
    ST1:20,
ST2:21,
ST3:23,
ST4:24,
ST5:25,
ST6:26,
ST7:30,
ST8:31,
ST9:32,
ST10:33,
ST11:34,
ST12:35,
ST13:36,
ST14:37,
ST15:38,
CT2:48,
CT1:49,
TM:54,

    
}