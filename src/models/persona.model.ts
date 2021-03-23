import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Habilidad} from './habilidad.model';
import {HabilidadesPersona} from './habilidades-persona.model';
import {Documento} from './documento.model';
import {SolicitudEmpresaPersona} from './solicitud-empresa-persona.model';
import {Estado} from './estado.model';
import {Ciudad} from './ciudad.model';
import {ProfesionPersona} from './profesion-persona.model';

@model({
  settings: {
    foreignKeys :{
      fk_cuidad_id : {
        name : 'fk_cuidad_id',
        entity: 'Ciudad',
        entityKey: 'id',
        foreignKey: 'cuidadId',
      },
      fk_estado_id : {
        name : 'fk_estado_id',
        entity: 'Estado',
        entityKey: 'id',
        foreignKey: 'estadoId',
      }
    },
  },
})
export class Persona extends Entity {
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
  documento: string;

  @property({
    type: 'string',
    required: true,
  })
  primer_nombre: string;

  @property({
    type: 'string',
    required: false,
  })
  segundo_nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  primer_apellido: string;

  @property({
    type: 'string',
  })
  segundo_apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  correo_electronico: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'string',
    required: true,
  })
  imagen: string;

  @property({
    type: 'string',
    required: true,
  })
  perfil_profesional: string;

  @hasMany(() => Habilidad, {through: {model: () => HabilidadesPersona}})
  habilidades: Habilidad[];

  @hasMany(() => Documento)
  documentos: Documento[];

  @hasMany(() => SolicitudEmpresaPersona)
  solicitudEmpresaPersonas: SolicitudEmpresaPersona[];

  @belongsTo(() => Estado)
  estadoId: number;

  @belongsTo(() => Ciudad)
  ciudadId: number;

  @hasMany(() => ProfesionPersona)
  profesionPersonas: ProfesionPersona[];

  constructor(data?: Partial<Persona>) {
    super(data);
  }
}

export interface PersonaRelations {
  // describe navigational properties here
}

export type PersonaWithRelations = Persona & PersonaRelations;
