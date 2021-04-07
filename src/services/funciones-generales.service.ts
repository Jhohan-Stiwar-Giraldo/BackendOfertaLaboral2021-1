import { /* inject, */ BindingScope, injectable} from '@loopback/core';
const generator = require('generate-password');
const cryptoJS = require('crypto-js');

@injectable({scope: BindingScope.TRANSIENT})
export class FuncionesGeneralesService {
  constructor(/* Add @inject to inject parameters */) { }

  GenerarClaveAleatoria(): string {

    let clave = generator.generate({
      length: 10,
      numbers: true,
      Symbol: false,
      uppercase: true,
      lowercase: true
    });
    return clave;
  }

  /**funcion para cifar una cadena */
  CifrarTexto(texto: string): string {
    let textoCrifrado = cryptoJS.MD5(texto).toString();
    return textoCrifrado;
  }
}
