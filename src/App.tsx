import React, { useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');

  function generateTypeScriptInterface(obj: Record<string, any>): string {
    let interfaceString = '{\n';
    for (const key in obj) {
      const type = typeof obj[key];
      interfaceString += `  ${key}: ${type};\n`;
    }
    interfaceString += '}';
    return interfaceString;
  }



  const parseText = (text: string): Record<string, any> => {
    const result: Record<string, any> = {};
    const lines = text.split('\n').map(line => line.trim()).filter(line => line);

    for (let i = 0; i < lines.length; i++) {
      const key = lines[i].replace(':', '').trim();
      if (i + 1 < lines.length && lines[i + 1].startsWith(':')) {
        const value = lines[i + 2]?.replace(/^"|"$/g, '').trim();
        result[key] = isNaN(Number(value)) ? value : Number(value);
        i += 2; // Move the index forward to skip processed lines
      }
    }

    return result;
  };

  const handleParse = () => {
    const parsedObject = parseText(inputText);
    const typescript = generateTypeScriptInterface(parsedObject)
    setOutputText(typescript); // Pretty-print JSON
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Text Parser</h1>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Paste your text here"
        style={{
          width: '100%',
          height: '150px',
          marginBottom: '10px',
          fontFamily: 'monospace',
        }}
      />
      <button onClick={handleParse} style={{ marginBottom: '10px', padding: '10px 20px' }}>
        Parse Text
      </button>
      <textarea
        value={outputText}
        readOnly
        placeholder="Output will appear here"
        style={{
          width: '100%',
          height: '150px',
          fontFamily: 'monospace',
        }}
      />
    </div>
  );
};

export default App;
