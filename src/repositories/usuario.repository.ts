import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbdsDataSource} from '../datasources';
import {Usuario, UsuarioRelations, TipoUsuario} from '../models';
import {TipoUsuarioRepository} from './tipo-usuario.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly tipoUsuario: BelongsToAccessor<TipoUsuario, typeof Usuario.prototype.id>;

  constructor(
    @inject('datasources.mongodbds') dataSource: MongodbdsDataSource, @repository.getter('TipoUsuarioRepository') protected tipoUsuarioRepositoryGetter: Getter<TipoUsuarioRepository>,
  ) {
    super(Usuario, dataSource);
    this.tipoUsuario = this.createBelongsToAccessorFor('tipoUsuario', tipoUsuarioRepositoryGetter,);
    this.registerInclusionResolver('tipoUsuario', this.tipoUsuario.inclusionResolver);
  }
}
