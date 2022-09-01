import { useState, ChangeEvent, MouseEvent } from 'react';

import SourceMap from './types/SourceMap';
import parseSourceMapFile from './utils/parseSourceMapFile';
import styles from './App.module.css';
import FilesList from './components/FilesList';

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
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

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

      <div className={styles.explorer}>
        <FilesList
          files={sourceMap.sources}
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
        />

        <pre className={styles.code}>
          {sourceMap.sourcesContent[selectedIndex]}
        </pre>
      </div>
    </div>
  );
}

export default App;
