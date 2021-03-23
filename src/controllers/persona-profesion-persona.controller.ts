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
  ProfesionPersona,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaProfesionPersonaController {
  constructor(
    @repository(PersonaRepository) protected personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/profesion-personas', {
    responses: {
      '200': {
        description: 'Array of Persona has many ProfesionPersona',
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
    return this.personaRepository.profesionPersonas(id).find(filter);
  }

  @post('/personas/{id}/profesion-personas', {
    responses: {
      '200': {
        description: 'Persona model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProfesionPersona)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Persona.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProfesionPersona, {
            title: 'NewProfesionPersonaInPersona',
            exclude: ['id'],
            optional: ['personaId']
          }),
        },
      },
    }) profesionPersona: Omit<ProfesionPersona, 'id'>,
  ): Promise<ProfesionPersona> {
    return this.personaRepository.profesionPersonas(id).create(profesionPersona);
  }

  @patch('/personas/{id}/profesion-personas', {
    responses: {
      '200': {
        description: 'Persona.ProfesionPersona PATCH success count',
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
    return this.personaRepository.profesionPersonas(id).patch(profesionPersona, where);
  }

  @del('/personas/{id}/profesion-personas', {
    responses: {
      '200': {
        description: 'Persona.ProfesionPersona DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ProfesionPersona)) where?: Where<ProfesionPersona>,
  ): Promise<Count> {
    return this.personaRepository.profesionPersonas(id).delete(where);
  }
}
