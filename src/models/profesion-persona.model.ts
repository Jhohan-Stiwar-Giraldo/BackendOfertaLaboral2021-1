import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Trabaja} from './trabaja.model';
import {Profesion} from './profesion.model';

@model()
export class ProfesionPersona extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @belongsTo(() => Trabaja)
  trabajaId: number;

  @belongsTo(() => Profesion)
  profesionId: number;

  @property({
    type: 'number',
  })
  personaId?: number;

  constructor(data?: Partial<ProfesionPersona>) {
    super(data);
  }
}

export interface ProfesionPersonaRelations {
  // describe navigational properties here
}

export type ProfesionPersonaWithRelations = ProfesionPersona & ProfesionPersonaRelations;
