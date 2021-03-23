import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  SolicitudEmpresaPersona,
  Persona,
} from '../models';
import {SolicitudEmpresaPersonaRepository} from '../repositories';

export class SolicitudEmpresaPersonaPersonaController {
  constructor(
    @repository(SolicitudEmpresaPersonaRepository)
    public solicitudEmpresaPersonaRepository: SolicitudEmpresaPersonaRepository,
  ) { }

  @get('/solicitud-empresa-personas/{id}/persona', {
    responses: {
      '200': {
        description: 'Persona belonging to SolicitudEmpresaPersona',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async getPersona(
    @param.path.number('id') id: typeof SolicitudEmpresaPersona.prototype.id,
  ): Promise<Persona> {
    return this.solicitudEmpresaPersonaRepository.persona(id);
  }
}
