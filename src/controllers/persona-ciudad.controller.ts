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
  Ciudad,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaCiudadController {
  constructor(
    @repository(PersonaRepository)
    public personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/ciudad', {
    responses: {
      '200': {
        description: 'Ciudad belonging to Persona',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ciudad)},
          },
        },
      },
    },
  })
  async getCiudad(
    @param.path.number('id') id: typeof Persona.prototype.id,
  ): Promise<Ciudad> {
    return this.personaRepository.ciudad(id);
  }
}
