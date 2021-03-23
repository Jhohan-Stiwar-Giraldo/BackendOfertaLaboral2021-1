import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Usuario,
  TipoUsuario,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioTipoUsuarioController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/tipo-usuario', {
    responses: {
      '200': {
        description: 'TipoUsuario belonging to Usuario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TipoUsuario)},
          },
        },
      },
    },
  })
  async getTipoUsuario(
    @param.path.number('id') id: typeof Usuario.prototype.id,
  ): Promise<TipoUsuario> {
    return this.usuarioRepository.tipoUsuario(id);
  }
}
