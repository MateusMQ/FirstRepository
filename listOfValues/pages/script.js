import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [words, setWords] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addWord = () => {
    if (inputValue.trim()) {
      setWords([...words, inputValue]);
      setInputValue('');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lista de Valores</h1>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={styles.input}
          placeholder="Digite uma palavra"
        />
        <button onClick={addWord} className={styles.button}>Adicionar</button>
      </div>
      <ul className={styles.wordList}>
        {words.map((word, index) => (
          <li key={index} className={styles.wordItem}>{word}</li>
        ))}
      </ul>
    </div>
  );
}
