import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Habilidad, HabilidadRelations} from '../models';

export class HabilidadRepository extends DefaultCrudRepository<
  Habilidad,
  typeof Habilidad.prototype.id,
  HabilidadRelations
> {
  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource,
  ) {
    super(Habilidad, dataSource);
  }
}
