import {useState} from "react";

function MotivationalPhrases(){
    const[phrases, setPhrases] = useState ([]);
    const[author, setAuthor]= useState ("");
    const[text, setText]= useState ("");
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!author.trim() || !text.trim()) return;

        const newPhrase = {
            id: Date.now (),
            author,
            text
        };
        setPhrases ([...phrases, newPhrase]);
        setAuthor("");
    };

    return(
        <div>
            <h1>Frases Motivacionales</h1>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Autor"
                value={author}
                onChange={(e)=> setAuthor(e.target.value)}
                />
                <input
                type="text"
                placeholder="frase"
                value={text}
                onChange={(e)=> setText(e.target.value)}
                />
                <button type="submit">Agregar Frase</button>
            </form>
            <ul>
                {phrases.map((item)=>(
                    <li key={item.id}>
                        <strong>{item.id}:</strong> "{item.text}"
                    </li>

                ))}
            </ul>
        </div>
    );
}
export default MotivationalPhrases;