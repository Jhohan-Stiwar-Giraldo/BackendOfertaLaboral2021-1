import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {SesionService} from '../services';


export class AdminStrategy implements AuthenticationStrategy {
  name: string = 'admin';

  constructor(@service(SesionService)
  public servicioSesion: SesionService) {

  }
  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const token = parseBearerToken(request)
    if (!token) {
      throw new HttpErrors[401]("usted no ha suminstrado un token");
    }
    let datos = this.servicioSesion.VerificarTokenJWT(token);
    if (datos) {
      if (datos.data.role == "606b1571d935297e96dbb8d9") {
        let perfil: UserProfile = Object.assign({
          nombre_usuario: datos.data.username,
          rol: datos.data.role
        });
        return perfil;
      } else {
        throw new HttpErrors[401]("usted no tiene el rol para cumplir esta solicitud")
      }
    } else {
      throw new HttpErrors[401]("usted no tiene un token valido");
    }

  }

}
