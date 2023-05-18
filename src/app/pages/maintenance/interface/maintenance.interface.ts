export interface maintenance {
    Id: number,
    Line: number,
    Device: string,
    Sequence: number,
    RegisterDateInitialOperation: string,
    TimeOperationTotal: number,
    TimeOperationPartial: number,
    TimeNewMaintenance: number,
    TimeResertMaintenance: string,
    TimeIniForPartial: number
  }