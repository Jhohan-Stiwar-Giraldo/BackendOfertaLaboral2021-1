export namespace keys {
  export const origenCorreoE = 'jhohan.1701821033@ucaldas.edu.co'
  export const asuntoNuevoUsuario = '[Nuevo usuario oferta laboral] mensaje de bienvenida'
  export const tiempoVenciomientoJWT = Math.floor(Date.now() / 1000) + (60 * 60 * 1);
  export const llaveSecretaJWT = 'dsfjkads';
  export const twilioPhone = '+12568031577';
  export const carpetaImagenPersonas = '../../archivos/personas';
  export const nombreCampoImagenPersona = 'file';
  export const extensionesPermitidasIMG: string[] = ['.PNG', '.JPG', '.JPEG', '.SVG'];
  export const tamMaxImagenPersona = 1024 * 1024;
  export const carpetaDocumentoPersona = '../../archivos/documentos';
  export const nombreCampoDocumentoPersona = 'file';
  export const extensionesPermitidasDOC: string[] = ['.PDF', '.DOC', '.DOCX', '.XLS', '.XLSX'];
}
