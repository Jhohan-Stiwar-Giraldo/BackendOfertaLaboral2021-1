import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {SolicitudEmpresaPersona, SolicitudEmpresaPersonaRelations} from '../models';

export class SolicitudEmpresaPersonaRepository extends DefaultCrudRepository<
  SolicitudEmpresaPersona,
  typeof SolicitudEmpresaPersona.prototype.id,
  SolicitudEmpresaPersonaRelations
> {
  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource,
  ) {
    super(SolicitudEmpresaPersona, dataSource);
  }
}
