import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {SolicitudEmpresaPersona, SolicitudEmpresaPersonaRelations, Empresa, Persona} from '../models';
import {EmpresaRepository} from './empresa.repository';
import {PersonaRepository} from './persona.repository';

export class SolicitudEmpresaPersonaRepository extends DefaultCrudRepository<
  SolicitudEmpresaPersona,
  typeof SolicitudEmpresaPersona.prototype.id,
  SolicitudEmpresaPersonaRelations
> {

  public readonly empresa: BelongsToAccessor<Empresa, typeof SolicitudEmpresaPersona.prototype.id>;

  public readonly persona: BelongsToAccessor<Persona, typeof SolicitudEmpresaPersona.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('EmpresaRepository') protected empresaRepositoryGetter: Getter<EmpresaRepository>, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>,
  ) {
    super(SolicitudEmpresaPersona, dataSource);
    this.persona = this.createBelongsToAccessorFor('persona', personaRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
    this.empresa = this.createBelongsToAccessorFor('empresa', empresaRepositoryGetter,);
    this.registerInclusionResolver('empresa', this.empresa.inclusionResolver);
  }
}
