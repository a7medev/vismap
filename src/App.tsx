import { useState, ChangeEvent, MouseEvent } from 'react';

import SourceMap from './types/SourceMap';
import parseSourceMapFile from './utils/parseSourceMapFile';

const emptySourceMap: SourceMap = {
  version: 3,
  sources: [],
  sourcesContent: [],
  names: [],
  mappings: '',
};

function App() {
  const [sourceMap, setSourceMap] = useState<SourceMap>(emptySourceMap);
  const [sourceContent, setSourceContent] = useState<string>('');

  function handleOpenFile(index: number) {
    return (e: MouseEvent) => {
      e.preventDefault();
      setSourceContent(sourceMap.sourcesContent[index]);
    };
  }

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target;
    if (!input.files) {
      return setSourceMap(emptySourceMap);
    }
    const _sourceMap = await parseSourceMapFile(input.files[0]);
    setSourceMap(_sourceMap);
  }

  return (
    <div>
      <h1>Welcome to MapVis</h1>

      <input type="file" onChange={handleFileChange} />

      <ul>
        {sourceMap.sources.map((file, index) => (
          <li>
            <a href="#" onClick={handleOpenFile(index)}>
              {file}
            </a>
          </li>
        ))}
      </ul>

      <pre>{sourceContent}</pre>
    </div>
  );
}

export default App;
