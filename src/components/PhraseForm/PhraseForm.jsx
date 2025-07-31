import { useState } from 'react';
import './PhraseForm.css';

function PhraseForm({ onAdd }) {
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    onAdd({ text, author: author || 'Anónimo' });
    setText('');
    setAuthor('');
  };

  return (
    <form onSubmit={handleSubmit} className="phrase-form">
      <textarea
        placeholder="Write a powerful sentence"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Author (a)"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <button type="submit">➕ Create your sentence</button>
    </form>
  );
}

export default PhraseForm;