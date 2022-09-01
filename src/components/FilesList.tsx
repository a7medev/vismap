import { MouseEvent } from 'react';

import styles from './FilesList.module.css';

interface FilesListProps {
  files: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

const FilesList: React.FC<FilesListProps> = ({
  files,
  selectedIndex,
  onSelect,
}) => {
  function handleOpenFile(index: number) {
    return (e: MouseEvent) => {
      e.preventDefault();
      onSelect(index);
    };
  }

  return (
    <ul className={styles.list}>
      {files.map((file, index) => (
        <li key={file}>
          <a
            href="#"
            onClick={handleOpenFile(index)}
            className={index === selectedIndex ? styles.selected : ''}
          >
            {file}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default FilesList;
