import {Entity, model, property} from '@loopback/repository';

@model()
export class HabilidadesPersona extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  personaId?: number;

  @property({
    type: 'number',
  })
  habilidadId?: number;

  constructor(data?: Partial<HabilidadesPersona>) {
    super(data);
  }
}

export interface HabilidadesPersonaRelations {
  // describe navigational properties here
}

export type HabilidadesPersonaWithRelations = HabilidadesPersona & HabilidadesPersonaRelations;
