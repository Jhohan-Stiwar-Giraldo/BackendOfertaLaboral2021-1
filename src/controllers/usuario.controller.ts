import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param,


  patch, post,




  put,

  requestBody,
  response
} from '@loopback/rest';
import {keys as llaves} from '../config/keys';
import {Usuario} from '../models';
import {Credenciales} from '../models/credenciales.model';
import {UsuarioRepository} from '../repositories';
import {FuncionesGeneralesService, NotificacionesService, SesionService} from '../services';

export class UsuarioController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
    @service(FuncionesGeneralesService)
    public servicioFunciones: FuncionesGeneralesService,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService,
    @service(SesionService)
    public servicioSesion: SesionService
  ) { }

  @post('/usuarios')
  @response(200, {
    description: 'Usuario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuario',
            exclude: ['id', 'clave'],
          }),
        },
      },
    })
    usuario: Omit<Usuario, 'id'>,
  ): Promise<Usuario> {

    let claveAleatoria = this.servicioFunciones.GenerarClaveAleatoria();
    console.log(claveAleatoria);
    let claveCifrada = this.servicioFunciones.CifrarTexto(claveAleatoria);
    console.log(claveCifrada);

    usuario.clave = claveCifrada;
    let usuarioCreado = await this.usuarioRepository.create(usuario);
    if (usuarioCreado) {
      let contenido = `Hola,
      buen dìa
      <br />
      Usted se ha registrado en la platafomra oferta laboral`
      this.servicioNotificaciones.EnviarCorreoElectronico(usuarioCreado.nombre_usuario,
        llaves.asuntoNuevoUsuario, contenido);
    }

    return usuarioCreado
  }


  @post('identificar-usuario')
  async validar(
    @requestBody(
      {
        content: {
          'application/json': {
            schema: getModelSchemaRef(Credential)
          }
        }
      }
    )
    credentiales: Credenciales
  ): Promise<object> {
    let usuario = await this.usuarioRepository.findOne({where: {nombre_usuario: credentiales.nombre_usuario, clave: credentiales.clave}});
    if (usuario) {
      //genrear un token
      let token = this.servicioSesion.GenerarToken(usuario);
      return {
        user: {
          username: usuario.nombre_usuario,
          role: usuario.tipoUsuarioId
        },
        tk: token
      };
    } else {
      //error
      throw new HttpErrors[401]("las credenciales no son correctas");
    }

  }

  @get('/usuarios/count')
  @response(200, {
    description: 'Usuario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.count(where);
  }

  @get('/usuarios')
  @response(200, {
    description: 'Array of Usuario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usuario) filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.usuarioRepository.find(filter);
  }

  @patch('/usuarios')
  @response(200, {
    description: 'Usuario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.updateAll(usuario, where);
  }

  @get('/usuarios/{id}')
  @response(200, {
    description: 'Usuario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Usuario, {exclude: 'where'}) filter?: FilterExcludingWhere<Usuario>
  ): Promise<Usuario> {
    return this.usuarioRepository.findById(id, filter);
  }

  @patch('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.updateById(id, usuario);
  }

  @put('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.replaceById(id, usuario);
  }

  @del('/usuarios/{id}')
  @response(204, {
    description: 'Usuario DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usuarioRepository.deleteById(id);
  }
}
