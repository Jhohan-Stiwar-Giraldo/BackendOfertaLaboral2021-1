import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Trabaja, TrabajaRelations} from '../models';

export class TrabajaRepository extends DefaultCrudRepository<
  Trabaja,
  typeof Trabaja.prototype.id,
  TrabajaRelations
> {
  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource,
  ) {
    super(Trabaja, dataSource);
  }
}
