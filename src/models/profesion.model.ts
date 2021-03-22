import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Profesion>) {
    super(data);
  }
}

export interface ProfesionRelations {
  // describe navigational properties here
}

export type ProfesionWithRelations = Profesion & ProfesionRelations;
