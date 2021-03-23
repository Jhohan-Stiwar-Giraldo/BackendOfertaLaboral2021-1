import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ProfesionPersona,
  Profesion,
} from '../models';
import {ProfesionPersonaRepository} from '../repositories';

export class ProfesionPersonaProfesionController {
  constructor(
    @repository(ProfesionPersonaRepository)
    public profesionPersonaRepository: ProfesionPersonaRepository,
  ) { }

  @get('/profesion-personas/{id}/profesion', {
    responses: {
      '200': {
        description: 'Profesion belonging to ProfesionPersona',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Profesion)},
          },
        },
      },
    },
  })
  async getProfesion(
    @param.path.number('id') id: typeof ProfesionPersona.prototype.id,
  ): Promise<Profesion> {
    return this.profesionPersonaRepository.profesion(id);
  }
}
