import {Entity, model, property} from '@loopback/repository';

@model()
export class Persona extends Entity {
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
  documento: string;

  @property({
    type: 'string',
    required: true,
  })
  primer_nombre: string;

  @property({
    type: 'string',
    required: false,
  })
  segundo_nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  primer_apellido: string;

  @property({
    type: 'string',
  })
  segundo_apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  correo_electronico: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'string',
    required: true,
  })
  imagen: string;

  @property({
    type: 'string',
    required: true,
  })
  perfil_profesional: string;


  constructor(data?: Partial<Persona>) {
    super(data);
  }
}

export interface PersonaRelations {
  // describe navigational properties here
}

export type PersonaWithRelations = Persona & PersonaRelations;
