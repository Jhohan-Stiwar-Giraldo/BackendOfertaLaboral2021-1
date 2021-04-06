import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Profesion} from '../models';
import {ProfesionRepository} from '../repositories';

export class ProfesionController {
  constructor(
    @repository(ProfesionRepository)
    public profesionRepository : ProfesionRepository,
  ) {}

  @post('/profesiones')
  @response(200, {
    description: 'Profesion model instance',
    content: {'application/json': {schema: getModelSchemaRef(Profesion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Profesion, {
            title: 'NewProfesion',
            exclude: ['id'],
          }),
        },
      },
    })
    profesion: Omit<Profesion, 'id'>,
  ): Promise<Profesion> {
    return this.profesionRepository.create(profesion);
  }

  @get('/profesiones/count')
  @response(200, {
    description: 'Profesion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Profesion) where?: Where<Profesion>,
  ): Promise<Count> {
    return this.profesionRepository.count(where);
  }

  @get('/profesiones')
  @response(200, {
    description: 'Array of Profesion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Profesion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Profesion) filter?: Filter<Profesion>,
  ): Promise<Profesion[]> {
    return this.profesionRepository.find(filter);
  }

  @patch('/profesiones')
  @response(200, {
    description: 'Profesion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Profesion, {partial: true}),
        },
      },
    })
    profesion: Profesion,
    @param.where(Profesion) where?: Where<Profesion>,
  ): Promise<Count> {
    return this.profesionRepository.updateAll(profesion, where);
  }

  @get('/profesiones/{id}')
  @response(200, {
    description: 'Profesion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Profesion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Profesion, {exclude: 'where'}) filter?: FilterExcludingWhere<Profesion>
  ): Promise<Profesion> {
    return this.profesionRepository.findById(id, filter);
  }

  @patch('/profesiones/{id}')
  @response(204, {
    description: 'Profesion PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Profesion, {partial: true}),
        },
      },
    })
    profesion: Profesion,
  ): Promise<void> {
    await this.profesionRepository.updateById(id, profesion);
  }

  @put('/profesiones/{id}')
  @response(204, {
    description: 'Profesion PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() profesion: Profesion,
  ): Promise<void> {
    await this.profesionRepository.replaceById(id, profesion);
  }

  @del('/profesiones/{id}')
  @response(204, {
    description: 'Profesion DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.profesionRepository.deleteById(id);
  }
}
