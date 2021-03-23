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
  Profesion,
  ProfesionPersona,
} from '../models';
import {ProfesionRepository} from '../repositories';

export class ProfesionProfesionPersonaController {
  constructor(
    @repository(ProfesionRepository) protected profesionRepository: ProfesionRepository,
  ) { }

  @get('/profesions/{id}/profesion-personas', {
    responses: {
      '200': {
        description: 'Array of Profesion has many ProfesionPersona',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProfesionPersona)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ProfesionPersona>,
  ): Promise<ProfesionPersona[]> {
    return this.profesionRepository.profesionPersonas(id).find(filter);
  }

  @post('/profesions/{id}/profesion-personas', {
    responses: {
      '200': {
        description: 'Profesion model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProfesionPersona)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Profesion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProfesionPersona, {
            title: 'NewProfesionPersonaInProfesion',
            exclude: ['id'],
            optional: ['profesionId']
          }),
        },
      },
    }) profesionPersona: Omit<ProfesionPersona, 'id'>,
  ): Promise<ProfesionPersona> {
    return this.profesionRepository.profesionPersonas(id).create(profesionPersona);
  }

  @patch('/profesions/{id}/profesion-personas', {
    responses: {
      '200': {
        description: 'Profesion.ProfesionPersona PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProfesionPersona, {partial: true}),
        },
      },
    })
    profesionPersona: Partial<ProfesionPersona>,
    @param.query.object('where', getWhereSchemaFor(ProfesionPersona)) where?: Where<ProfesionPersona>,
  ): Promise<Count> {
    return this.profesionRepository.profesionPersonas(id).patch(profesionPersona, where);
  }

  @del('/profesions/{id}/profesion-personas', {
    responses: {
      '200': {
        description: 'Profesion.ProfesionPersona DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ProfesionPersona)) where?: Where<ProfesionPersona>,
  ): Promise<Count> {
    return this.profesionRepository.profesionPersonas(id).delete(where);
  }
}
