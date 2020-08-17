export class Electrovalvula{

    private _electrovalvulaId: number;
    private _nombre: string;
  
    constructor(electrovalvulaId: number, nombre: string){
        this.electrovalvulaId = electrovalvulaId;
        this.nombre = nombre;
    }

    get electrovalvulaId(): number{
        return this._electrovalvulaId;
    }
    set electrovalvulaId(value: number){
        this._electrovalvulaId = value;
    }
    
  
    get nombre(): string{
      return this._nombre;
    }
    set nombre(value: string){
       this._nombre = value;
    }
  
  }