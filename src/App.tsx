import { useState } from 'react';

interface SourceMap {
  version: number;
  sources: string[];
  sourcesContent: string[];
  names: string[];
  mappings: string;
}

const emptySourceMap: SourceMap = {
  version: 3,
  sources: [],
  sourcesContent: [],
  names: [],
  mappings: '',
};

function App() {
  const [sourceMap, setSourceMap] = useState<SourceMap>(emptySourceMap);

  function handleFileChange(e: any) {
    const input = e.target;
    if (!input.files) {
      setSourceMap(emptySourceMap);
    }

    const reader = new FileReader();
    reader.onload = () => {
      try {
        setSourceMap(JSON.parse(reader.result as string));
      } catch (err) {
        console.error(err);
        alert('Failed to parse source map contents');
      }
    };
    reader.readAsText(input.files[0]);
  }

  return (
    <div>
      <h1>Welcome to MapVis</h1>

      <input type="file" onChange={handleFileChange} />

      <ul>
        {sourceMap.sources.map((file) => (
          <li>{file}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
