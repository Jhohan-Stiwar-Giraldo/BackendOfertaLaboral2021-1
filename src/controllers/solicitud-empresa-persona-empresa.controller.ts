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
  Empresa,
} from '../models';
import {SolicitudEmpresaPersonaRepository} from '../repositories';

export class SolicitudEmpresaPersonaEmpresaController {
  constructor(
    @repository(SolicitudEmpresaPersonaRepository)
    public solicitudEmpresaPersonaRepository: SolicitudEmpresaPersonaRepository,
  ) { }

  @get('/solicitud-empresa-personas/{id}/empresa', {
    responses: {
      '200': {
        description: 'Empresa belonging to SolicitudEmpresaPersona',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empresa)},
          },
        },
      },
    },
  })
  async getEmpresa(
    @param.path.number('id') id: typeof SolicitudEmpresaPersona.prototype.id,
  ): Promise<Empresa> {
    return this.solicitudEmpresaPersonaRepository.empresa(id);
  }
}
