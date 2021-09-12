interface IdText {
  id: string;
  text: string;
}

interface IdTextType extends IdText {
  type: string;
}

interface DomainRegionRegister extends IdText {
  domains: IdText[];
  regions: IdText[];
  registers: IdText[];
}

interface OdDerivative extends DomainRegionRegister {
  language: string;
}

interface OdVariantForm extends DomainRegionRegister {
  notes: IdTextType[];
  pronunciations: OdPronunciation[];
}

interface OdExample extends DomainRegionRegister {
  definitions: string[];
  notes: IdTextType[];
  senseIds: string[];
}

interface OdConstruction extends DomainRegionRegister {
  examples: OdExample[];
  notes: IdTextType[];
}

interface OdPronunciation extends DomainRegionRegister {
  audioFile: string;
  dialects: string[];
  phoneticNotation: string;
  phoneticSpelling: string;
}

interface OdSense extends OdConstruction, OdVariantForm {
  constructions: OdConstruction[];
  crossReferenceMarkers: string[];
  crossReferences: IdTextType[];
  definitions: string[];

  etymologies: string[];
  examples: OdExample[];
  shortDefinitions: string[];
  subsenses: OdSense[];
  thesaurusLinks: {
    entry_id: "string";
    sense_id: "string";
  }[];
  variantForms: OdVariantForm[];
}

interface OdEntry {
  etymologies: string[];
  grammaticalFeatures: IdTextType[];
  homographNumber: string;
  notes: IdTextType[];
  pronunciations: OdPronunciation[];
  senses: OdSense[];
  variantForms: OdVariantForm[];
}

interface OdLexicalEntry {
  // for Entries
  derivativeOf: OdDerivative[];
  derivatives: OdDerivative[];
  language: string;
  entries: OdEntry[];
  grammaticalFeatures: IdTextType[];
  lexicalCategory: IdText;
  notes: IdTextType[];
  pronunciations: OdPronunciation[];
  text: string;
  variantForms: OdVariantForm[];

  // for Lemmas
  inflectionOf: IdText[];
}

interface OxfordLemmas {
  metadata: {
    provider: string;
  };
  results: {
    id: string;
    language: string;
    lexicalEntries: OdLexicalEntry[];

    type: string;
    word: string;
  }[];
}

interface OxfordEntries {
  id: string;
  metadata: {
    operation: string;
    provider: string;
    schema: string;
  };
  results: {
    id: string;
    language: string;
    lexicalEntries: OdLexicalEntry[];
    pronunciations: OdPronunciation[];
    type: string;
    word: string;
  }[];
}

interface OxfordResponseCode {
  400: `Invalid value for filters such as lexicalCategory, registers, domains, etc.\n Invalid value for fields projections accepted, Let's say that we cannot project an non-existing field.`;
  404: `No entry was found matching the selection parameters; OR An invalid filter was specified.`;
  414: `URL is too long.`;
  500: `Internal Error. An error occurred during processing.`;
}

interface YcLexicalEntry {
  entries: string[];
  lexicalCategory: string;
  pronunciations: { audioFile: string; phoneticSpelling: string }[];
}
interface CheckEntriesResult {
  lexicalEntries: YcLexicalEntry[];
}

export {
  IdText,
  CheckEntriesResult,
  OxfordEntries,
  OxfordLemmas,
  OxfordResponseCode,
  OdPronunciation,
  YcLexicalEntry,
};
