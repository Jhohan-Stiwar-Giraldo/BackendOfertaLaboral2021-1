import {Entity, model, property, hasMany} from '@loopback/repository';
import {SolicitudEmpresaPersona} from './solicitud-empresa-persona.model';

@model()
export class Empresa extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nit: string;

  @property({
    type: 'string',
    required: true,
  })
  razon_social: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono_contacto: string;

  @property({
    type: 'string',
    required: true,
  })
  correo_electronico: string;

  @hasMany(() => SolicitudEmpresaPersona)
  solicitudEmpresaPersonas: SolicitudEmpresaPersona[];

  constructor(data?: Partial<Empresa>) {
    super(data);
  }
}

export interface EmpresaRelations {
  // describe navigational properties here
}

export type EmpresaWithRelations = Empresa & EmpresaRelations;
