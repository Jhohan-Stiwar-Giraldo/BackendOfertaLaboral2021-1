import {Entity, model, property} from '@loopback/repository';

@model()
export class Documento extends Entity {
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

  @property({
    type: 'string',
    required: true,
  })
  archivo: string;


  constructor(data?: Partial<Documento>) {
    super(data);
  }
}

export interface DocumentoRelations {
  // describe navigational properties here
}

export type DocumentoWithRelations = Documento & DocumentoRelations;
