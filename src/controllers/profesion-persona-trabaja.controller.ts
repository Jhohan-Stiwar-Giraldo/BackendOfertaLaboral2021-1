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
  Trabaja,
} from '../models';
import {ProfesionPersonaRepository} from '../repositories';

export class ProfesionPersonaTrabajaController {
  constructor(
    @repository(ProfesionPersonaRepository)
    public profesionPersonaRepository: ProfesionPersonaRepository,
  ) { }

  @get('/profesion-personas/{id}/trabaja', {
    responses: {
      '200': {
        description: 'Trabaja belonging to ProfesionPersona',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Trabaja)},
          },
        },
      },
    },
  })
  async getTrabaja(
    @param.path.number('id') id: typeof ProfesionPersona.prototype.id,
  ): Promise<Trabaja> {
    return this.profesionPersonaRepository.trabaja(id);
  }
}
