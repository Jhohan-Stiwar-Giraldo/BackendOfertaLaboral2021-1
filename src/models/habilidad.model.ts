import {Entity, model, property} from '@loopback/repository';

@model()
export class Habilidad extends Entity {
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


  constructor(data?: Partial<Habilidad>) {
    super(data);
  }
}

export interface HabilidadRelations {
  // describe navigational properties here
}

export type HabilidadWithRelations = Habilidad & HabilidadRelations;
