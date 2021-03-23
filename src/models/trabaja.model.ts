import {Entity, model, property, hasMany} from '@loopback/repository';
import {ProfesionPersona} from './profesion-persona.model';

@model()
export class Trabaja extends Entity {
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

  constructor(data?: Partial<Trabaja>) {
    super(data);
  }
}

export interface TrabajaRelations {
  // describe navigational properties here
}

export type TrabajaWithRelations = Trabaja & TrabajaRelations;
