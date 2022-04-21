
//main name of zones and colors
export interface Zones {
    Zonas1: {
        Color: string,
        Name: string,
    },
    Zonas2: {
        Color: string,
        Name: string,
    },
    Zonas3: {
        Color: string,
        Name: string,
    }
}

// Name of bands by zone
export interface zons {
    idEquipo: string,
        Name: string,
}

// Band status by zone
export interface states {
    DeviceId: string;
    Estado: string;
    Color: string;
}

// Band information by zone
export interface teams{
    DeviceId?: string,
    Name?: string,
    Estado?: string,
    TiempoOn?: string,
    TiempoOff?: string
    Consumo?: string,
}

export interface Consumezone {
ZoneId?: number;
ZoneName?: string;
Estado?: string;
Consumo?: string;
ContadorMaletas?: string;
TiempoOn?: number;
TiempoOff?: number;
}

export const Zonass = {
    TX: 13,
  }
  

export interface departures {
    Id: string,
    DeviceId: string,
    Name: string,
    ICAO: string,
    Flight: string,
    Vuelos:string,
    STD: string,
    ETD: string,
    DATE: string,
}
export interface syste {
    idEquipo: string,
    estado: string,
    tiempoOn: string,
    tiempoOff: string
}

export interface Banda8 {
    b1: string,
    b2: string,
    b3: string,
    b4: string,
  }
  
  export interface Banda1 {
    b1: string,
    b2: string,
    b3: string,
    b4: string,
    b5: string,
    b6: string,
    b7: string,
    b8: string,
    b9: string,
    b10: string,
    b11: string,
    b12: string,
    b13: string,
    b14: string,
}

export interface Banda2 {
    b1: string,
    b2: string,
    b3: string,
    b4: string,
    b5: string,
    b6: string,
    b7: string,
    b8: string,
    b9: string,
    b10: string,
    b11: string,
    b12: string,
    b13: string,
    b14: string,
    b15: string,
    b16: string,
    b17: string,
    b18: string,
    b19: string,
    b20: string,
    b21: string,
    b22: string,
    b23: string,
    b24: string,
    b25: string,
    b26: string,
    b27: string,
    b28: string,
    b29: string,
    b30: string,
    b31: string,
    b32: string,
    b33: string,
    b34: string,
}

export interface Banda3 {
    b1: string,
    b2: string,
    b3: string,
    b4: string,
    b5: string,
    b6: string,
    b7: string,
    b8: string,
    b9: string,
    b10: string,
}

export interface Banda4 {
    b1: string,
    b2: string,
    b3: string,
    b4: string,
    b5: string,
    b6: string,
    b7: string,
    b8: string,
    b9: string,
    b10: string,
    b11: string,
    b12: string,
    b13: string,
    b14: string,
    b15: string,
    b16: string,
}

export interface Banda5 {
    b1: string,
    b2: string,
    b3: string,
    b4: string,
    b5: string,
    b6: string,
    b7: string,
    b8: string,
    b9: string,
    b10: string,
    b11: string,
    b12: string,
    b13: string,
    b14: string,
}

export interface Banda6 {
    b1: string,
    b2: string,
    b3: string,
    b4: string,
    b5: string,
    b6: string,
    b7: string,
    b8: string,
    b9: string,
    b10: string,
    b11: string,
    b12: string,
    b13: string,
    b14: string,
    b15: string,
    b16: string,
    b17: string,
    b18: string,
    b19: string,
    b20: string,
    b21: string,
    b22: string,
    b23: string,
    b24: string,
    b25: string,
    b26: string,
    b27: string,
    b28: string,
    b29: string,
    b30: string,
    b31: string,
    b32: string,
    b33: string,
    b34: string,
    b35: string,
    b36: string
}

export interface Banda7 {
    b1: string,
    b2: string,
    b3: string,
    b4: string,
    b5: string,
    b6: string,
    b7: string,
    b8: string,
    b9: string,
    b10: string,
    b11: string,
    b12: string,
    b13: string,
    b14: string,
    b15: string,
    b16: string,
    b17: string,
    b18: string,
    b19: string,
    b20: string,
    b21: string,
    b22: string,
    b23: string,
    b24: string,
    b25: string,
    b26: string,
}

export interface consume {
    slug?: string;
    ZoneName?: string;
    KWh?: number;
    porcent?: number;
    kwhTotal: number;
}

export interface BagData {
    CreatedDate: string;
    Name: string;
    Description: string;
}
