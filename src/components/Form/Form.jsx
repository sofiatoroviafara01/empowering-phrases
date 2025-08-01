import { useState } from "react";
import "./form.css"; 

function MotivationalPhrases() {
  const [phrases, setPhrases] = useState([]);
  const [author, setAuthor] = useState("");
  const [phraseText, setPhraseText] = useState("");
  const [editingPhraseId, setEditingPhraseId] = useState(null);

  const handleEdit = (id) => {
    const phraseToEdit = phrases.find((phrase) => phrase.id === id);
    if (phraseToEdit) {
      setAuthor(phraseToEdit.author);
      setPhraseText(phraseToEdit.phrase);
      setEditingPhraseId(id);
    }
  };

  const handleUpdatePhrase = (id, updatedData) => {
    setPhrases(
      phrases.map((phrase) =>
        phrase.id === id ? { ...phrase, ...updatedData } : phrase
      )
    );
    setEditingPhraseId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta frase?")) {
      setPhrases(phrases.filter((phrase) => phrase.id !== id));
      if (editingPhraseId === id) {
        setEditingPhraseId(null);
        setAuthor("");
        setPhraseText("");
      }
    }
  };

 const handleSubmit = (e) => {
  e.preventDefault();

  if (!phraseText.trim()) return;

  const finalAuthor = author.trim() ? author : "Anónimo";

  if (editingPhraseId) {
    handleUpdatePhrase(editingPhraseId, {
      author: finalAuthor,
      phrase: phraseText,
    });
  } else {
    const newPhrase = {
      id: Date.now(),
      author: finalAuthor,
      phrase: phraseText,
    };
    setPhrases([...phrases, newPhrase]);
  }

  setAuthor("");
  setPhraseText("");
};


  return (
    <div className="form-container">
      <div className="form-quote">
  {phrases.length > 0
    ? `“${phrases[Math.floor(Math.random() * phrases.length)].phrase}”`
    : '“Agrega tu primera frase motivadora”'}
</div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Autor"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="form-input"
        />
        <input
          type="text"
          placeholder="Frase"
          value={phraseText}
          onChange={(e) => setPhraseText(e.target.value)}
          className="form-input"
        />
        <button type="submit" className="form-button">
          {editingPhraseId ? "Actualizar Frase" : "Agregar Frase"}
        </button>
      </form>
      <ul>
        {phrases.map((item) => (
          <li key={item.id}>
            <strong>{item.author}:</strong> "{item.phrase}"
            <button className="form-edit-btn" onClick={() => handleEdit(item.id)}>
              Editar
            </button>
            <button
              className="form-delete-btn"
              onClick={() => handleDelete(item.id)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <div className="form-footer">© copyright</div>
    </div>
  );
}

export default MotivationalPhrases;


