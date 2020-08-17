export class Riego{

    private _logRiegoId: number;
    private _fecha: string;
    private _apertura: number;
    private _electrovalvulaId: number;
  
    constructor(logRiegoId: number, fecha: string, apertura: number, electrovalvulaId: number){
        this.logRiegoId = logRiegoId;
        this.fecha = fecha;
        this.apertura = apertura;
        this.electrovalvulaId = electrovalvulaId; 
    }

    get logRiegoId(): number{
        return this._logRiegoId;
    }
    set logRiegoId(value: number){
        this._logRiegoId = value;
    }
  
     get fecha(): string{
      return this._fecha;
    }
    set fecha(value: string){
       this._fecha = value;
    }
  
    get apertura(): number{
      return this._apertura;
    }
    set apertura(value: number){
       this._apertura = value;
    }
  
    get electrovalvulaId(): number{
        return this._electrovalvulaId;
      }
    set electrovalvulaId(value: number){
        this._electrovalvulaId = value;
    }
    
  }