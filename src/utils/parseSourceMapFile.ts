import SourceMap from '../types/SourceMap';
import prettifyFilePaths from './prettifyFilePaths';

export default function parseSourceMapFile(file: File): Promise<SourceMap> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const sourceMap = JSON.parse(reader.result as string);
        let isValid = true;
        if (typeof sourceMap !== 'object') isValid = false;
        if (!Array.isArray(sourceMap.sources)) isValid = false;
        if (!Array.isArray(sourceMap.sourcesContent)) isValid = false;
        sourceMap.sources = prettifyFilePaths(
          sourceMap.sources,
          sourceMap.sources[0] === '__perlude__'
        );
        if (isValid) resolve(sourceMap);
        else
          reject(new TypeError("File doesn't seem to be a valid source map"));
      } catch (err) {
        reject(err);
      }
    };

    reader.readAsText(file);
  });
}
