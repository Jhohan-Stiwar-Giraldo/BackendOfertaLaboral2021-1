import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {ProfesionPersona, ProfesionPersonaRelations, Trabaja, Profesion} from '../models';
import {TrabajaRepository} from './trabaja.repository';
import {ProfesionRepository} from './profesion.repository';

export class ProfesionPersonaRepository extends DefaultCrudRepository<
  ProfesionPersona,
  typeof ProfesionPersona.prototype.id,
  ProfesionPersonaRelations
> {

  public readonly trabaja: BelongsToAccessor<Trabaja, typeof ProfesionPersona.prototype.id>;

  public readonly profesion: BelongsToAccessor<Profesion, typeof ProfesionPersona.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('TrabajaRepository') protected trabajaRepositoryGetter: Getter<TrabajaRepository>, @repository.getter('ProfesionRepository') protected profesionRepositoryGetter: Getter<ProfesionRepository>,
  ) {
    super(ProfesionPersona, dataSource);
    this.profesion = this.createBelongsToAccessorFor('profesion', profesionRepositoryGetter,);
    this.registerInclusionResolver('profesion', this.profesion.inclusionResolver);
    this.trabaja = this.createBelongsToAccessorFor('trabaja', trabajaRepositoryGetter,);
    this.registerInclusionResolver('trabaja', this.trabaja.inclusionResolver);
  }
}
