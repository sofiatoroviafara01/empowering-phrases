import { useState } from 'react';
import './PhraseCard.css';

function PhraseCard({ phrase, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(phrase.text);
  const [editedAuthor, setEditedAuthor] = useState(phrase.author);

  const handleSave = () => {
    onUpdate({ text: editedText, author: editedAuthor || 'Anónimo' });
    setIsEditing(false);
  };

  return (
    <div className="phrase-card">
      {isEditing ? (
        <>
          <textarea value={editedText} onChange={(e) => setEditedText(e.target.value)} />
          <input value={editedAuthor} onChange={(e) => setEditedAuthor(e.target.value)} />
          <div className="btn-group">
            <button onClick={handleSave}>to save</button>
            <button onClick={() => setIsEditing(false)}>❌ Cancel</button>
          </div>
        </>
      ) : (
        <>
          <p className="phrase-text">“{phrase.text}”</p>
          <p className="phrase-author">- {phrase.author}</p>
          <div className="btn-group">
            <button onClick={() => setIsEditing(true)}>✏️ Editar</button>
            <button onClick={onDelete}>🗑 Eliminar</button>
          </div>
        </>
      )}
    </div>
  );
}

export default PhraseCard;

