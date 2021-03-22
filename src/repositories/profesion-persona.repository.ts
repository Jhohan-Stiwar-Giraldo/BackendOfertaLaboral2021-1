import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {ProfesionPersona, ProfesionPersonaRelations} from '../models';

export class ProfesionPersonaRepository extends DefaultCrudRepository<
  ProfesionPersona,
  typeof ProfesionPersona.prototype.id,
  ProfesionPersonaRelations
> {
  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource,
  ) {
    super(ProfesionPersona, dataSource);
  }
}
