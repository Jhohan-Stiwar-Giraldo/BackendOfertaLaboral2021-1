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
HabilidadesPersona,
Habilidad,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaHabilidadController {
  constructor(
    @repository(PersonaRepository) protected personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/habilidads', {
    responses: {
      '200': {
        description: 'Array of Persona has many Habilidad through HabilidadesPersona',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Habilidad)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Habilidad>,
  ): Promise<Habilidad[]> {
    return this.personaRepository.habilidades(id).find(filter);
  }

  @post('/personas/{id}/habilidads', {
    responses: {
      '200': {
        description: 'create a Habilidad model instance',
        content: {'application/json': {schema: getModelSchemaRef(Habilidad)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Persona.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Habilidad, {
            title: 'NewHabilidadInPersona',
            exclude: ['id'],
          }),
        },
      },
    }) habilidad: Omit<Habilidad, 'id'>,
  ): Promise<Habilidad> {
    return this.personaRepository.habilidades(id).create(habilidad);
  }

  @patch('/personas/{id}/habilidads', {
    responses: {
      '200': {
        description: 'Persona.Habilidad PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Habilidad, {partial: true}),
        },
      },
    })
    habilidad: Partial<Habilidad>,
    @param.query.object('where', getWhereSchemaFor(Habilidad)) where?: Where<Habilidad>,
  ): Promise<Count> {
    return this.personaRepository.habilidades(id).patch(habilidad, where);
  }

  @del('/personas/{id}/habilidads', {
    responses: {
      '200': {
        description: 'Persona.Habilidad DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Habilidad)) where?: Where<Habilidad>,
  ): Promise<Count> {
    return this.personaRepository.habilidades(id).delete(where);
  }
}
