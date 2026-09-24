const { useEffect, useState } = React;

function SystemPromptModal({ text, busy, onChangeText, onSubmit}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (!busy) {
      inputRef.current?.focus();
    }
  }, [busy]);

  const handleSubmit = (event) => {
    onSubmit(event, inputRef);
  };

  return (
    <div className="modal">
      <form className="system-prompt" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          value={text}
          onChange={(event) => onChangeText(event.target.value)}
          placeholder="Escreva seu system prompt"
          maxLength={8000}
          disabled={busy}
          autoFocus
        />
        <button
          type={busy ? "button" : "submit"}
          disabled={!busy && !text.trim()}
        >
          Salvar
        </button>
      </form>
    </div>
  );
}