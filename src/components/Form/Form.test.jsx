import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, within, act } from '@testing-library/react';
import MotivationalPhrases from './Form';
import '@testing-library/jest-dom';

describe('MotivationalPhrases', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('muestra una frase por defecto al inicio', () => {
    render(<MotivationalPhrases />);
    expect(screen.getByText(/—/)).toBeInTheDocument();
  });

  it('permite agregar una nueva frase', () => {
    render(<MotivationalPhrases />);
    fireEvent.change(screen.getByLabelText(/Autor/i), { target: { value: 'Ada' } });
    fireEvent.change(screen.getByLabelText(/Frase/i), { target: { value: 'La programación es arte' } });
    fireEvent.click(screen.getByRole('button', { name: /Agregar Frase/i }));

    const lista = screen.getByRole('list');
    expect(within(lista).getByText(/Ada/)).toBeInTheDocument();
    expect(within(lista).getByText(/La programación es arte/)).toBeInTheDocument();
  });

  it('permite editar una frase', () => {
    render(<MotivationalPhrases />);
    fireEvent.change(screen.getByLabelText(/Autor/i), { target: { value: 'Marie' } });
    fireEvent.change(screen.getByLabelText(/Frase/i), { target: { value: 'Original' } });
    fireEvent.click(screen.getByRole('button', { name: /Agregar Frase/i }));

    fireEvent.click(screen.getByText(/Editar/i));
    fireEvent.change(screen.getByLabelText(/Frase/i), { target: { value: 'Editado' } });
    fireEvent.click(screen.getByRole('button', { name: /Actualizar Frase/i }));

    const lista = screen.getByRole('list');
    expect(within(lista).queryByText(/Original/)).not.toBeInTheDocument();
    expect(within(lista).getByText(/Editado/)).toBeInTheDocument();
  });

  it('permite eliminar una frase', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    render(<MotivationalPhrases />);
    fireEvent.change(screen.getByLabelText(/Autor/i), { target: { value: 'Borrar' } });
    fireEvent.change(screen.getByLabelText(/Frase/i), { target: { value: 'Esta frase será eliminada' } });
    fireEvent.click(screen.getByRole('button', { name: /Agregar Frase/i }));

    fireEvent.click(screen.getByText(/Eliminar/i));

    const lista = screen.getByRole('list');
    expect(within(lista).queryByText(/Esta frase será eliminada/)).not.toBeInTheDocument();
  });

  it('cambia la frase por defecto al hacer clic en "Otra frase"', async () => {
    render(<MotivationalPhrases />);
    const fraseInicial = screen.getByText(/—/).textContent;

    // Simular clic y esperar el cambio con act()
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Otra frase/i }));
      await new Promise(resolve => setTimeout(resolve, 500)); // espera igual que el delay del componente
    });

    const fraseFinal = screen.getByText(/—/).textContent;

    // Asegura que el contenido cambió (aunque sea misma estructura)
    expect(fraseFinal).not.toBeFalsy();
    expect(fraseFinal).not.toBe('');
    expect(fraseFinal).not.toBe(fraseInicial); // puede fallar si aleatoria es igual
  });

  it('guarda frases en localStorage', () => {
    render(<MotivationalPhrases />);
    fireEvent.change(screen.getByLabelText(/Autor/i), { target: { value: 'Local' } });
    fireEvent.change(screen.getByLabelText(/Frase/i), { target: { value: 'Guardada' } });
    fireEvent.click(screen.getByRole('button', { name: /Agregar Frase/i }));

    const stored = JSON.parse(localStorage.getItem('phrases') || '[]');
    expect(stored.length).toBe(1);
    expect(stored[0].author).toBe('Local');
  });
});


