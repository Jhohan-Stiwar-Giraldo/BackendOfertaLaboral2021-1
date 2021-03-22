import {Entity, model, property} from '@loopback/repository';

@model()
export class ProfesionPersona extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;


  constructor(data?: Partial<ProfesionPersona>) {
    super(data);
  }
}

export interface ProfesionPersonaRelations {
  // describe navigational properties here
}

export type ProfesionPersonaWithRelations = ProfesionPersona & ProfesionPersonaRelations;
