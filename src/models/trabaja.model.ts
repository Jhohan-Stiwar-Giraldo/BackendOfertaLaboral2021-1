import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Trabaja>) {
    super(data);
  }
}

export interface TrabajaRelations {
  // describe navigational properties here
}

export type TrabajaWithRelations = Trabaja & TrabajaRelations;
