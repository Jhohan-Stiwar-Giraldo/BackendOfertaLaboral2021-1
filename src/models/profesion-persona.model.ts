import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Profesion} from './profesion.model';
import {Trabaja} from './trabaja.model';

@model({
  settings: {
    foreignKeys: {
      fk_persona_id: {
        name: 'fk_persona_prof_per_id',
        entity: 'Persona',
        entityKey: 'id',
        foreignKey: 'personaId',
      },
      fk_trabaja_id: {
        name: 'fk_trabaja_prof_per_id',
        entity: 'Trabaja',
        entityKey: 'id',
        foreignKey: 'trabajaId',
      },
      fk_profesion_id: {
        name: 'fk_profesion_prof_per_id',
        entity: 'Profesion',
        entityKey: 'id',
        foreignKey: 'profesionId',
      },
    },
  },
})
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
