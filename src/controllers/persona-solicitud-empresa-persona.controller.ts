import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Persona,
  SolicitudEmpresaPersona,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaSolicitudEmpresaPersonaController {
  constructor(
    @repository(PersonaRepository) protected personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/solicitud-empresa-personas', {
    responses: {
      '200': {
        description: 'Array of Persona has many SolicitudEmpresaPersona',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SolicitudEmpresaPersona)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<SolicitudEmpresaPersona>,
  ): Promise<SolicitudEmpresaPersona[]> {
    return this.personaRepository.solicitudEmpresaPersonas(id).find(filter);
  }

  @post('/personas/{id}/solicitud-empresa-personas', {
    responses: {
      '200': {
        description: 'Persona model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudEmpresaPersona)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Persona.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudEmpresaPersona, {
            title: 'NewSolicitudEmpresaPersonaInPersona',
            exclude: ['id'],
            optional: ['personaId']
          }),
        },
      },
    }) solicitudEmpresaPersona: Omit<SolicitudEmpresaPersona, 'id'>,
  ): Promise<SolicitudEmpresaPersona> {
    return this.personaRepository.solicitudEmpresaPersonas(id).create(solicitudEmpresaPersona);
  }

  @patch('/personas/{id}/solicitud-empresa-personas', {
    responses: {
      '200': {
        description: 'Persona.SolicitudEmpresaPersona PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudEmpresaPersona, {partial: true}),
        },
      },
    })
    solicitudEmpresaPersona: Partial<SolicitudEmpresaPersona>,
    @param.query.object('where', getWhereSchemaFor(SolicitudEmpresaPersona)) where?: Where<SolicitudEmpresaPersona>,
  ): Promise<Count> {
    return this.personaRepository.solicitudEmpresaPersonas(id).patch(solicitudEmpresaPersona, where);
  }

  @del('/personas/{id}/solicitud-empresa-personas', {
    responses: {
      '200': {
        description: 'Persona.SolicitudEmpresaPersona DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(SolicitudEmpresaPersona)) where?: Where<SolicitudEmpresaPersona>,
  ): Promise<Count> {
    return this.personaRepository.solicitudEmpresaPersonas(id).delete(where);
  }
}
