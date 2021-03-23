import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Persona,
  Estado,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaEstadoController {
  constructor(
    @repository(PersonaRepository)
    public personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/estado', {
    responses: {
      '200': {
        description: 'Estado belonging to Persona',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Estado)},
          },
        },
      },
    },
  })
  async getEstado(
    @param.path.number('id') id: typeof Persona.prototype.id,
  ): Promise<Estado> {
    return this.personaRepository.estado(id);
  }
}
