import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Persona, PersonaRelations, Habilidad, HabilidadesPersona, Documento, SolicitudEmpresaPersona, Estado, Ciudad, ProfesionPersona} from '../models';
import {HabilidadesPersonaRepository} from './habilidades-persona.repository';
import {HabilidadRepository} from './habilidad.repository';
import {DocumentoRepository} from './documento.repository';
import {SolicitudEmpresaPersonaRepository} from './solicitud-empresa-persona.repository';
import {EstadoRepository} from './estado.repository';
import {CiudadRepository} from './ciudad.repository';
import {ProfesionPersonaRepository} from './profesion-persona.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {

  public readonly habilidades: HasManyThroughRepositoryFactory<Habilidad, typeof Habilidad.prototype.id,
          HabilidadesPersona,
          typeof Persona.prototype.id
        >;

  public readonly documentos: HasManyRepositoryFactory<Documento, typeof Persona.prototype.id>;

  public readonly solicitudEmpresaPersonas: HasManyRepositoryFactory<SolicitudEmpresaPersona, typeof Persona.prototype.id>;

  public readonly estado: BelongsToAccessor<Estado, typeof Persona.prototype.id>;

  public readonly ciudad: BelongsToAccessor<Ciudad, typeof Persona.prototype.id>;

  public readonly profesionPersonas: HasManyRepositoryFactory<ProfesionPersona, typeof Persona.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('HabilidadesPersonaRepository') protected habilidadesPersonaRepositoryGetter: Getter<HabilidadesPersonaRepository>, @repository.getter('HabilidadRepository') protected habilidadRepositoryGetter: Getter<HabilidadRepository>, @repository.getter('DocumentoRepository') protected documentoRepositoryGetter: Getter<DocumentoRepository>, @repository.getter('SolicitudEmpresaPersonaRepository') protected solicitudEmpresaPersonaRepositoryGetter: Getter<SolicitudEmpresaPersonaRepository>, @repository.getter('EstadoRepository') protected estadoRepositoryGetter: Getter<EstadoRepository>, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('ProfesionPersonaRepository') protected profesionPersonaRepositoryGetter: Getter<ProfesionPersonaRepository>,
  ) {
    super(Persona, dataSource);
    this.profesionPersonas = this.createHasManyRepositoryFactoryFor('profesionPersonas', profesionPersonaRepositoryGetter,);
    this.registerInclusionResolver('profesionPersonas', this.profesionPersonas.inclusionResolver);
    this.ciudad = this.createBelongsToAccessorFor('ciudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
    this.estado = this.createBelongsToAccessorFor('estado', estadoRepositoryGetter,);
    this.registerInclusionResolver('estado', this.estado.inclusionResolver);
    this.solicitudEmpresaPersonas = this.createHasManyRepositoryFactoryFor('solicitudEmpresaPersonas', solicitudEmpresaPersonaRepositoryGetter,);
    this.registerInclusionResolver('solicitudEmpresaPersonas', this.solicitudEmpresaPersonas.inclusionResolver);
    this.documentos = this.createHasManyRepositoryFactoryFor('documentos', documentoRepositoryGetter,);
    this.registerInclusionResolver('documentos', this.documentos.inclusionResolver);
    this.habilidades = this.createHasManyThroughRepositoryFactoryFor('habilidades', habilidadRepositoryGetter, habilidadesPersonaRepositoryGetter,);
    this.registerInclusionResolver('habilidades', this.habilidades.inclusionResolver);
  }
}
