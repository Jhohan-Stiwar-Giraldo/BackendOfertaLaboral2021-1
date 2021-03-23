import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Profesion, ProfesionRelations, ProfesionPersona} from '../models';
import {ProfesionPersonaRepository} from './profesion-persona.repository';

export class ProfesionRepository extends DefaultCrudRepository<
  Profesion,
  typeof Profesion.prototype.id,
  ProfesionRelations
> {

  public readonly profesionPersonas: HasManyRepositoryFactory<ProfesionPersona, typeof Profesion.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('ProfesionPersonaRepository') protected profesionPersonaRepositoryGetter: Getter<ProfesionPersonaRepository>,
  ) {
    super(Profesion, dataSource);
    this.profesionPersonas = this.createHasManyRepositoryFactoryFor('profesionPersonas', profesionPersonaRepositoryGetter,);
    this.registerInclusionResolver('profesionPersonas', this.profesionPersonas.inclusionResolver);
  }
}
