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
  Documento,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaDocumentoController {
  constructor(
    @repository(PersonaRepository) protected personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/documentos', {
    responses: {
      '200': {
        description: 'Array of Persona has many Documento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Documento)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Documento>,
  ): Promise<Documento[]> {
    return this.personaRepository.documentos(id).find(filter);
  }

  @post('/personas/{id}/documentos', {
    responses: {
      '200': {
        description: 'Persona model instance',
        content: {'application/json': {schema: getModelSchemaRef(Documento)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Persona.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Documento, {
            title: 'NewDocumentoInPersona',
            exclude: ['id'],
            optional: ['personaId']
          }),
        },
      },
    }) documento: Omit<Documento, 'id'>,
  ): Promise<Documento> {
    return this.personaRepository.documentos(id).create(documento);
  }

  @patch('/personas/{id}/documentos', {
    responses: {
      '200': {
        description: 'Persona.Documento PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Documento, {partial: true}),
        },
      },
    })
    documento: Partial<Documento>,
    @param.query.object('where', getWhereSchemaFor(Documento)) where?: Where<Documento>,
  ): Promise<Count> {
    return this.personaRepository.documentos(id).patch(documento, where);
  }

  @del('/personas/{id}/documentos', {
    responses: {
      '200': {
        description: 'Persona.Documento DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Documento)) where?: Where<Documento>,
  ): Promise<Count> {
    return this.personaRepository.documentos(id).delete(where);
  }
}
