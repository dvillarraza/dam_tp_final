export class Dispositivo{

  private _dispositivoId: number;
  private _nombre: string;
  private _ubicacion: string;
  private _electrovalvulaId: number;

  constructor(dispositivoId: number, nombre: string, ubicacion: string, electrovalvulaId: number){
    this.dispositivoId = dispositivoId;
    this.nombre = nombre;
    this.ubicacion = ubicacion;
    this.electrovalvulaId = electrovalvulaId;
  }

  get dispositivoId(): number{
    return this._dispositivoId;
  }
  set dispositivoId(value: number){
     this._dispositivoId = value;
  }

  get nombre(): string{
    return this._nombre;
  }
  set nombre(value: string){
     this._nombre = value;
  }

  get ubicacion(): string{
    return this._ubicacion;
  }
  set ubicacion(value: string){
     this._ubicacion = value;
  }

  get electrovalvulaId(): number{
    return this._electrovalvulaId;
  }
  set electrovalvulaId(value: number){
     this._electrovalvulaId = value;
  }
}

/*
export interface Intdispositivo{
    dispositivoId: number;
    nombre: string;
    ubicacion: string;
    electrovalvulaId: number;
}*/