import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {HabilidadesPersona, HabilidadesPersonaRelations} from '../models';

export class HabilidadesPersonaRepository extends DefaultCrudRepository<
  HabilidadesPersona,
  typeof HabilidadesPersona.prototype.id,
  HabilidadesPersonaRelations
> {
  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource,
  ) {
    super(HabilidadesPersona, dataSource);
  }
}
