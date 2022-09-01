export default interface SourceMap {
  version: number;
  sources: string[];
  sourcesContent: string[];
  names: string[];
  mappings: string;
}
