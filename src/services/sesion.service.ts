import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {keys as llaves} from '../config/keys';
import {Usuario} from '../models';
var jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class SesionService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * funcion que genrar un token jwt
   */
  GenerarToken(usuario: Usuario): string {
    let tk = jwt.sign({
      exp: llaves.tiempoVenciomientoJWT,
      data: {
        username: usuario.nombre_usuario,
        role: usuario.tipoUsuarioId,
      }
    }, llaves.llaveSecretaJWT);
    return tk
  }

  /**
   * funcion para verificar la valides de un token jwy
   */
  VerificarTokenJWT(token: string) {
    try {
      let decoded = jwt.verify(token, llaves.llaveSecretaJWT);
      return decoded
    } catch {
      return null
    }
  }

}
