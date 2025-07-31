
import { useState } from 'react';
import PhraseForm from './components/PhraseForm/PhraseForm';
import PhraseCard from './components/PhraseCard/PhraseCard';

function App() {
  const [phrases, setPhrases] = useState([]);

  const addPhrase = (newPhrase) => {
    setPhrases([...phrases, newPhrase]);
  };

  const deletePhrase = (index) => {
    const updated = [...phrases];
    updated.splice(index, 1);
    setPhrases(updated);
  };

  const updatePhrase = (index, updatedPhrase) => {
    const updated = [...phrases];
    updated[index] = updatedPhrase;
    setPhrases(updated);
  };

  return (
    <div className="app-container">
      <h1>Glow Up</h1>
      <h2>Phrases Motivational</h2>
      <PhraseForm onAdd={addPhrase} />

      <div className="phrase-list">
        {phrases.map((phrase, index) => (
          <PhraseCard
            key={index}
            phrase={phrase}
            onDelete={() => deletePhrase(index)}
            onUpdate={(updatedPhrase) => updatePhrase(index, updatedPhrase)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;