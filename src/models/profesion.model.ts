import {Entity, model, property, hasMany} from '@loopback/repository';
import {ProfesionPersona} from './profesion-persona.model';

@model()
export class Profesion extends Entity {
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
  nombre: string;

  @hasMany(() => ProfesionPersona)
  profesionPersonas: ProfesionPersona[];

  constructor(data?: Partial<Profesion>) {
    super(data);
  }
}

export interface ProfesionRelations {
  // describe navigational properties here
}

export type ProfesionWithRelations = Profesion & ProfesionRelations;
