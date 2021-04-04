import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_persona_id: {
        name: 'fk_persona_doc_id',
        entity: 'Persona',
        entityKey: 'id',
        foreignKey: 'personaId',
      }
    },
  },
})
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

  @property({
    type: 'number',
  })
  personaId?: number;

  constructor(data?: Partial<Documento>) {
    super(data);
  }
}

export interface DocumentoRelations {
  // describe navigational properties here
}

export type DocumentoWithRelations = Documento & DocumentoRelations;
