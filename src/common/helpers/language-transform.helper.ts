import { Language } from '../enums/language.enum';

/**
 * Transforma una entidad con columnas por idioma a un objeto con solo el idioma solicitado.
 * Ejemplo: { title_es: 'Hola', title_en: 'Hello' } + lang='es' => { title: 'Hola' }
 */
export function transformLanguageFields<T extends Record<string, any>>(
  entity: T,
  lang: Language,
  translatedFields: string[],
): Record<string, any> {
  const result: Record<string, any> = {};

  for (const key of Object.keys(entity)) {
    const isTranslatedField = translatedFields.some(
      (field) => key === `${field}_es` || key === `${field}_en`,
    );

    if (!isTranslatedField) {
      result[key] = entity[key];
    }
  }

  for (const field of translatedFields) {
    result[field] = entity[`${field}_${lang}`];
  }

  return result;
}

/**
 * Transforma un array de entidades con columnas por idioma.
 */
export function transformLanguageArray<T extends Record<string, any>>(
  entities: T[],
  lang: Language,
  translatedFields: string[],
): Record<string, any>[] {
  return entities.map((entity) =>
    transformLanguageFields(entity, lang, translatedFields),
  );
}
