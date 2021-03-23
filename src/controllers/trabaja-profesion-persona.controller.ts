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
  Trabaja,
  ProfesionPersona,
} from '../models';
import {TrabajaRepository} from '../repositories';

export class TrabajaProfesionPersonaController {
  constructor(
    @repository(TrabajaRepository) protected trabajaRepository: TrabajaRepository,
  ) { }

  @get('/trabajas/{id}/profesion-personas', {
    responses: {
      '200': {
        description: 'Array of Trabaja has many ProfesionPersona',
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
    return this.trabajaRepository.profesionPersonas(id).find(filter);
  }

  @post('/trabajas/{id}/profesion-personas', {
    responses: {
      '200': {
        description: 'Trabaja model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProfesionPersona)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Trabaja.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProfesionPersona, {
            title: 'NewProfesionPersonaInTrabaja',
            exclude: ['id'],
            optional: ['trabajaId']
          }),
        },
      },
    }) profesionPersona: Omit<ProfesionPersona, 'id'>,
  ): Promise<ProfesionPersona> {
    return this.trabajaRepository.profesionPersonas(id).create(profesionPersona);
  }

  @patch('/trabajas/{id}/profesion-personas', {
    responses: {
      '200': {
        description: 'Trabaja.ProfesionPersona PATCH success count',
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
    return this.trabajaRepository.profesionPersonas(id).patch(profesionPersona, where);
  }

  @del('/trabajas/{id}/profesion-personas', {
    responses: {
      '200': {
        description: 'Trabaja.ProfesionPersona DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ProfesionPersona)) where?: Where<ProfesionPersona>,
  ): Promise<Count> {
    return this.trabajaRepository.profesionPersonas(id).delete(where);
  }
}
