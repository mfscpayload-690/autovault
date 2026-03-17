import { useState } from 'react';

export default function ImageUpload({ imageUrl, onUrlChange, onFileChange }) {
  const [mode, setMode] = useState('url'); // 'url' or 'upload'
  const [preview, setPreview] = useState(imageUrl || '');

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileChange(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUrlChange = (e) => {
    onUrlChange(e.target.value);
    setPreview(e.target.value);
  };

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <button
          type="button"
          onClick={() => setMode('url')}
          className={`text-xs px-3 py-1 rounded ${mode === 'url' ? 'bg-accent text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
        >
          Paste URL
        </button>
        <button
          type="button"
          onClick={() => setMode('upload')}
          className={`text-xs px-3 py-1 rounded ${mode === 'upload' ? 'bg-accent text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
        >
          Upload File
        </button>
      </div>

      {mode === 'url' ? (
        <input
          type="text"
          value={imageUrl || ''}
          onChange={handleUrlChange}
          placeholder="https://example.com/image.jpg"
          className="w-full px-2 py-1.5 text-sm rounded border border-border-light dark:border-border-dark bg-white dark:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-accent/30"
        />
      ) : (
        <div className="border-2 border-dashed border-border-light dark:border-border-dark rounded-lg p-4 text-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="text-sm"
          />
          <p className="text-xs text-gray-400 mt-1">Max 5MB, image files only</p>
        </div>
      )}

      {preview && (
        <div className="mt-2">
          <img src={preview} alt="Preview" className="w-24 h-16 object-cover rounded border border-border-light dark:border-border-dark" />
        </div>
      )}
    </div>
  );
}
