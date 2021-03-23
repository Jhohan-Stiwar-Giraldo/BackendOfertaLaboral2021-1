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
  Empresa,
  SolicitudEmpresaPersona,
} from '../models';
import {EmpresaRepository} from '../repositories';

export class EmpresaSolicitudEmpresaPersonaController {
  constructor(
    @repository(EmpresaRepository) protected empresaRepository: EmpresaRepository,
  ) { }

  @get('/empresas/{id}/solicitud-empresa-personas', {
    responses: {
      '200': {
        description: 'Array of Empresa has many SolicitudEmpresaPersona',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SolicitudEmpresaPersona)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<SolicitudEmpresaPersona>,
  ): Promise<SolicitudEmpresaPersona[]> {
    return this.empresaRepository.solicitudEmpresaPersonas(id).find(filter);
  }

  @post('/empresas/{id}/solicitud-empresa-personas', {
    responses: {
      '200': {
        description: 'Empresa model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudEmpresaPersona)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Empresa.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudEmpresaPersona, {
            title: 'NewSolicitudEmpresaPersonaInEmpresa',
            exclude: ['id'],
            optional: ['empresaId']
          }),
        },
      },
    }) solicitudEmpresaPersona: Omit<SolicitudEmpresaPersona, 'id'>,
  ): Promise<SolicitudEmpresaPersona> {
    return this.empresaRepository.solicitudEmpresaPersonas(id).create(solicitudEmpresaPersona);
  }

  @patch('/empresas/{id}/solicitud-empresa-personas', {
    responses: {
      '200': {
        description: 'Empresa.SolicitudEmpresaPersona PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudEmpresaPersona, {partial: true}),
        },
      },
    })
    solicitudEmpresaPersona: Partial<SolicitudEmpresaPersona>,
    @param.query.object('where', getWhereSchemaFor(SolicitudEmpresaPersona)) where?: Where<SolicitudEmpresaPersona>,
  ): Promise<Count> {
    return this.empresaRepository.solicitudEmpresaPersonas(id).patch(solicitudEmpresaPersona, where);
  }

  @del('/empresas/{id}/solicitud-empresa-personas', {
    responses: {
      '200': {
        description: 'Empresa.SolicitudEmpresaPersona DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(SolicitudEmpresaPersona)) where?: Where<SolicitudEmpresaPersona>,
  ): Promise<Count> {
    return this.empresaRepository.solicitudEmpresaPersonas(id).delete(where);
  }
}
