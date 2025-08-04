import { useState, useEffect } from "react";
import "./form.css";

function MotivationalPhrases() {
  const defaultPhrases = [
    "Nada en la vida debe ser temido, solo comprendido. — Marie Curie",
    "El conocimiento es poder. — Frances Wright",
    "No puedes esperar a tener una vida sencilla, crea una vida fuerte. — Eleanor Roosevelt",
    "Las mujeres que cambian el mundo no esperan permiso. — Amelia Earhart",
    "La innovación no es un lujo, es una necesidad para avanzar. — Ada Lovelace",
    "Las oportunidades no pasan, las creas. — Coco Chanel",
    "Sé valiente y actúa como si fuera imposible fallar. — Dorothy Sayers",
    "Piensa como una reina. Una reina no tiene miedo de fracasar. — Oprah Winfrey",
    "El futuro pertenece a quienes creen en la belleza de sus sueños. — Eleanor Roosevelt",
    "Lo importante es no dejar de cuestionar. — Maria Mitchell",
    "He aprendido que el coraje no es la ausencia de miedo, sino el triunfo sobre él. — Maya Angelou"
  ];

  const [phrases, setPhrases] = useState([]);
  const [author, setAuthor] = useState("");
  const [phraseText, setPhraseText] = useState("");
  const [editingPhraseId, setEditingPhraseId] = useState(null);
  const [defaultPhraseIndex, setDefaultPhraseIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState("fade-in");

  useEffect(() => {
    const storedPhrases = localStorage.getItem("phrases");
    if (storedPhrases) {
      setPhrases(JSON.parse(storedPhrases));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("phrases", JSON.stringify(phrases));
  }, [phrases]);

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

  const handleRefreshDefaultPhrase = () => {
    setFadeClass("fade-out");
    setTimeout(() => {
      setDefaultPhraseIndex((prevIndex) => (prevIndex + 1) % defaultPhrases.length);
      setFadeClass("fade-in");
    }, 300); 
  };

  const displayedPhrase =
    phrases.length > 0
      ? `“${phrases[Math.floor(Math.random() * phrases.length)].phrase}”`
      : `“${defaultPhrases[defaultPhraseIndex]}”`;

  return (
    <div className="form-container">
      <div className={`form-quote ${fadeClass}`}>{displayedPhrase}</div>

      {phrases.length === 0 && (
        <button className="refresh-button" onClick={handleRefreshDefaultPhrase}>
          Otra frase
        </button>
      )}

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
            <button
              className="form-edit-btn"
              onClick={() => handleEdit(item.id)}
            >
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
      <div className="form-footer">Glow Up ©</div>

    <img src="/iconoInstagram.svg" alt="Instagram" className="social-icon" />
    </div>

    
  );
}

export default MotivationalPhrases;

