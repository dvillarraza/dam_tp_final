export class Medicion{

    private _medicionId: number;
    private _fecha: string;
    private _valor: number;
    private _dispositivoId: number;
  
    constructor(medicionId: number, fecha: string, valor: number, dispositivoId: number){
        this.medicionId = medicionId;
        this.fecha = fecha;
        this.valor = valor;
        this.dispositivoId = dispositivoId; 
    }

    get medicionId(): number{
        return this._medicionId;
    }
    set medicionId(value: number){
        this._medicionId = value;
    }
  
     get fecha(): string{
      return this._fecha;
    }
    set fecha(value: string){
       this._fecha = value;
    }
  
    get valor(): number{
      return this._valor;
    }
    set valor(value: number){
       this._valor = value;
    }
  
    get dispositivoId(): number{
        return this._dispositivoId;
      }
    set dispositivoId(value: number){
        this._dispositivoId = value;
    }
    
  }