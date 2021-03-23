import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Empresa, EmpresaRelations, SolicitudEmpresaPersona} from '../models';
import {SolicitudEmpresaPersonaRepository} from './solicitud-empresa-persona.repository';

export class EmpresaRepository extends DefaultCrudRepository<
  Empresa,
  typeof Empresa.prototype.id,
  EmpresaRelations
> {

  public readonly solicitudEmpresaPersonas: HasManyRepositoryFactory<SolicitudEmpresaPersona, typeof Empresa.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('SolicitudEmpresaPersonaRepository') protected solicitudEmpresaPersonaRepositoryGetter: Getter<SolicitudEmpresaPersonaRepository>,
  ) {
    super(Empresa, dataSource);
    this.solicitudEmpresaPersonas = this.createHasManyRepositoryFactoryFor('solicitudEmpresaPersonas', solicitudEmpresaPersonaRepositoryGetter,);
    this.registerInclusionResolver('solicitudEmpresaPersonas', this.solicitudEmpresaPersonas.inclusionResolver);
  }
}
