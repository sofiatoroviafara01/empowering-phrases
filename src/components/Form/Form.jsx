 import { useState } from "react";
 import './Form.css'
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
    if (
      window.confirm("¿Estás seguro de que quieres eliminar esta frase?")
    ) {
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
    if (!author.trim() || !phraseText.trim()) return;

    if (editingPhraseId) {
      handleUpdatePhrase(editingPhraseId, {
        author,
        phrase: phraseText,
      });
    } else {
      const newPhrase = {
        id: Date.now(),
        author,
        phrase: phraseText,
      };
      setPhrases([...phrases, newPhrase]);
    }

    setAuthor("");
    setPhraseText("");
  };

  return (
    <div>
      <h1>Frases Motivacionales</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Autor"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="text"
          placeholder="Frase"
          value={phraseText}
          onChange={(e) => setPhraseText(e.target.value)}
        />
        <button type="submit">
          {editingPhraseId ? "Actualizar Frase" : "Agregar Frase"}
        </button>
      </form>
      <ul>
        {phrases.map((item) => (
          <li key={item.id}>
            <strong>{item.author}:</strong> "{item.phrase}"{" "}
            <button onClick={() => handleEdit(item.id)}>Editar</button>{" "}
            <button onClick={() => handleDelete(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MotivationalPhrases;

