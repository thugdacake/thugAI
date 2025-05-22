import React, { useState } from 'react';
import { LibraryExplorerProps } from '../types';
import { useTheme } from '../hooks/useTheme';

const defaultLibraries = [
  {
    id: '1',
    name: 'Core',
    path: '/packages/core',
    description: 'Biblioteca principal do Cérebro Operante'
  },
  {
    id: '2',
    name: 'Web Explorer',
    path: '/packages/web-explorer',
    description: 'Interface web para o Cérebro Operante'
  },
  {
    id: '3',
    name: 'CLI',
    path: '/packages/cli',
    description: 'Interface de linha de comando'
  }
];

export const LibraryExplorer: React.FC<LibraryExplorerProps> = ({
  onSelect,
  theme
}) => {
  const [selectedLibrary, setSelectedLibrary] = useState<string | null>(null);
  const { currentTheme } = useTheme(theme);

  const handleLibraryClick = (path: string) => {
    setSelectedLibrary(path);
    onSelect?.(path);
  };

  return (
    <div
      className="library-explorer"
      data-testid="library-explorer"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: currentTheme.background,
        color: currentTheme.text
      }}
    >
      <div
        className="libraries-list"
        data-testid="libraries-list"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}
      >
        {defaultLibraries.map(library => (
          <div
            key={library.id}
            className={`library-item ${selectedLibrary === library.path ? 'selected' : ''}`}
            data-testid={`library-item-${library.id}`}
            onClick={() => handleLibraryClick(library.path)}
            style={{
              padding: '1rem',
              borderRadius: '0.5rem',
              backgroundColor:
                selectedLibrary === library.path
                  ? currentTheme.primary
                  : currentTheme.secondary,
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
          >
            <h3
              className="library-name"
              data-testid={`library-name-${library.id}`}
              style={{
                margin: 0,
                fontSize: '1.1rem',
                fontWeight: 'bold'
              }}
            >
              {library.name}
            </h3>
            <p
              className="library-description"
              data-testid={`library-description-${library.id}`}
              style={{
                margin: '0.5rem 0 0',
                fontSize: '0.9rem',
                opacity: 0.8
              }}
            >
              {library.description}
            </p>
            <code
              className="library-path"
              data-testid={`library-path-${library.id}`}
              style={{
                display: 'block',
                margin: '0.5rem 0 0',
                fontSize: '0.8rem',
                opacity: 0.6
              }}
            >
              {library.path}
            </code>
          </div>
        ))}
      </div>
    </div>
  );
};
