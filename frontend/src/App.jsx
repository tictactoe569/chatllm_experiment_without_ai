const {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} = React;

function createMessageId() {
  return `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 10)}`;
}

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("access_token")
  );
  const [userEmail, setUserEmail] = useState(
    localStorage.getItem("user_email") || ""
  );

  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const [instructionsOpen, setInstructionsOpen] = useState(false);
  const [instructions, setInstructions] = useState("");
  const [instructionsAreCustom, setInstructionsAreCustom] =
    useState(false);
  const [instructionsLoading, setInstructionsLoading] =
    useState(false);
  const [instructionsSaving, setInstructionsSaving] =
    useState(false);
  const [instructionsError, setInstructionsError] =
    useState("");
  const [instructionsSaved, setInstructionsSaved] =
    useState(false);

  const messagesRef = useRef(null);
  const abortControllerRef = useRef(null);

  const chatHistory = useMemo(
    () =>
      messages.filter(
        (msg) =>
          msg.role === "user" || msg.role === "assistant"
      ),
    [messages]
  );

  useEffect(() => {
    const el = messagesRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    if (!instructionsOpen) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape" && !instructionsSaving) {
        setInstructionsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () =>
      window.removeEventListener("keydown", onKeyDown);
  }, [instructionsOpen, instructionsSaving]);

  const loadSessions = useCallback(async () => {
    try {
      const sessionList = await listSessions();
      setSessions(sessionList);

      if (sessionList.length > 0) {
        const sid = sessionList[0].id;
        setActiveSessionId(sid);

        const msgs = await getSessionMessages(sid);
        if (msgs.length > 0) {
          setMessages(
            msgs.map((message) => ({
              id: message.id,
              role: message.role,
              content: message.content,
            }))
          );
        } else {
          setMessages([
            {
              id: createMessageId(),
              role: "assistant",
              content:
                "Bem-vindo ao ChatLLM Lab. Como posso ajudar voce hoje?",
            },
          ]);
        }
      } else {
        const newSession = await createSession();
        setSessions([newSession]);
        setActiveSessionId(newSession.id);
        setMessages([
          {
            id: createMessageId(),
            role: "assistant",
            content:
              "Bem-vindo ao ChatLLM Lab. Como posso ajudar voce hoje?",
          },
        ]);
      }
    } catch {
      try {
        const newSession = await createSession();
        setSessions([newSession]);
        setActiveSessionId(newSession.id);
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (token) {
      loadSessions();
    }
  }, [token, loadSessions]);

  const selectSession = useCallback(async (sessionId) => {
    setActiveSessionId(sessionId);

    try {
      const msgs = await getSessionMessages(sessionId);

      if (msgs.length === 0) {
        setMessages([
          {
            id: createMessageId(),
            role: "assistant",
            content:
              "Bem-vindo ao ChatLLM Lab. Como posso ajudar voce hoje?",
          },
        ]);
      } else {
        setMessages(
          msgs.map((message) => ({
            id: message.id,
            role: message.role,
            content: message.content,
          }))
        );
      }
    } catch {
      setMessages([
        {
          id: createMessageId(),
          role: "assistant",
          content:
            "Bem-vindo ao ChatLLM Lab. Como posso ajudar voce hoje?",
        },
      ]);
    }
  }, []);

  const onAuthSuccess = async (newToken, email) => {
    setToken(newToken);
    setUserEmail(email);
  };

  const refreshSessions = useCallback(async () => {
    try {
      setSessions(await listSessions());
    } catch {}
  }, []);

  const handleNewSession = async () => {
    try {
      const newSession = await createSession();
      setSessions((prev) => [newSession, ...prev]);
      selectSession(newSession.id);
    } catch {
      setError("Erro ao criar sessao");
    }
  };

  const handleDeleteSession = async (sessionId) => {
    try {
      await deleteSession(sessionId);
      const newList = sessions.filter(
        (session) => session.id !== sessionId
      );
      setSessions(newList);

      if (activeSessionId === sessionId) {
        if (newList.length > 0) {
          selectSession(newList[0].id);
        } else {
          handleNewSession();
        }
      }
    } catch {
      setError("Erro ao excluir sessao");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch {}

    localStorage.removeItem("access_token");
    localStorage.removeItem("user_email");

    setToken(null);
    setUserEmail("");
    setSessions([]);
    setActiveSessionId(null);
    setMessages([]);
    setError("");
  };

  const openInstructions = async () => {
    setInstructionsOpen(true);
    setInstructionsLoading(true);
    setInstructionsError("");
    setInstructionsSaved(false);

    try {
      const data = await getCustomInstructions();
      setInstructions(data.content || "");
      setInstructionsAreCustom(Boolean(data.is_custom));
    } catch (err) {
      setInstructionsError(
        err.message || "Nao foi possivel carregar as instrucoes."
      );
    } finally {
      setInstructionsLoading(false);
    }
  };

  const handleSaveInstructions = async () => {
    setInstructionsSaving(true);
    setInstructionsError("");
    setInstructionsSaved(false);

    try {
      const data = await saveCustomInstructions(instructions);
      setInstructions(data.content || "");
      setInstructionsAreCustom(Boolean(data.is_custom));
      setInstructionsSaved(true);
    } catch (err) {
      setInstructionsError(
        err.message || "Nao foi possivel salvar as instrucoes."
      );
    } finally {
      setInstructionsSaving(false);
    }
  };

  const handleRestoreDefault = async () => {
    setInstructionsSaving(true);
    setInstructionsError("");
    setInstructionsSaved(false);

    try {
      const data = await saveCustomInstructions("");
      setInstructions(data.content || "");
      setInstructionsAreCustom(false);
      setInstructionsSaved(true);
    } catch (err) {
      setInstructionsError(
        err.message || "Nao foi possivel restaurar o padrao."
      );
    } finally {
      setInstructionsSaving(false);
    }
  };

  const onStop = () => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    setBusy(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const cleaned = text.trim();
    if (!cleaned || busy) return;

    setError("");

    const userMessage = {
      id: createMessageId(),
      role: "user",
      content: cleaned,
    };
    const assistantMessageId = createMessageId();

    setMessages((prev) => [
      ...prev,
      userMessage,
      {
        id: assistantMessageId,
        role: "assistant",
        content: "",
      },
    ]);

    setText("");
    setBusy(true);

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      const result = await sendMessageStream({
        message: cleaned,
        history: chatHistory,
        session_id: activeSessionId,
        signal: abortController.signal,
        onDelta: (delta) => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? {
                    ...msg,
                    content: `${msg.content}${delta}`,
                  }
                : msg
            )
          );
        },
      });

      if (result?.session_id) {
        setActiveSessionId(result.session_id);

        if (result.title) {
          setSessions((prev) =>
            prev.map((session) =>
              session.id === result.session_id
                ? {
                    ...session,
                    title: result.title,
                  }
                : session
            )
          );
        }
      }

      refreshSessions();

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessageId &&
          !msg.content.trim()
            ? {
                ...msg,
                content:
                  "Nao foi possivel obter resposta do modelo agora.",
              }
            : msg
        )
      );
    } catch (err) {
      const aborted = err?.name === "AbortError";

      if (!aborted) {
        setError(
          err.message ||
            "Falha inesperada ao gerar resposta."
        );

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? {
                  ...msg,
                  content: msg.content.trim()
                    ? msg.content
                    : "Nao foi possivel obter resposta do modelo agora.",
                }
              : msg
          )
        );
      } else {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId &&
            !msg.content.trim()
              ? {
                  ...msg,
                  content: "Resposta interrompida.",
                }
              : msg
          )
        );
      }
    } finally {
      refreshSessions();
      abortControllerRef.current = null;
      setBusy(false);
    }
  };

  if (!token) {
    return <Auth onAuthSuccess={onAuthSuccess} />;
  }

  return (
    <>
      <div className="app-layout">
        <Sidebar
          sessions={sessions}
          activeSessionId={activeSessionId}
          onSelectSession={selectSession}
          onNewSession={handleNewSession}
          onDeleteSession={handleDeleteSession}
        />

        <main className="app-shell">
          <header className="app-header">
            <div className="brand">ChatLLM Lab</div>

            <div className="header-right">
              <button
                className="secondary-btn"
                onClick={openInstructions}
              >
                Instrucoes
              </button>

              <span className="user-email">
                {userEmail}
              </span>

              <button
                className="secondary-btn"
                onClick={handleLogout}
              >
                Sair
              </button>
            </div>
          </header>

          <section
            className="messages"
            aria-live="polite"
            ref={messagesRef}
          >
            <div className="messages-inner">
              {messages.map((msg) => (
                <article
                  key={msg.id}
                  className={`bubble ${msg.role}`}
                >
                  <MessageContent content={msg.content} />
                </article>
              ))}
            </div>
          </section>

          <Composer
            text={text}
            busy={busy}
            error={error}
            onChangeText={setText}
            onSubmit={onSubmit}
            onStop={onStop}
          />
        </main>
      </div>

      {instructionsOpen && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget &&
              !instructionsSaving
            ) {
              setInstructionsOpen(false);
            }
          }}
        >
          <section
            className="modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="instructions-title"
          >
            <div className="modal-header">
              <div>
                <h2 id="instructions-title">
                  Instrucoes personalizadas
                </h2>
                <p>
                  Este texto sera enviado como system prompt
                  nas suas conversas.
                </p>
              </div>

              <button
                className="icon-btn"
                onClick={() =>
                  setInstructionsOpen(false)
                }
                disabled={instructionsSaving}
                aria-label="Fechar"
              >
                ×
              </button>
            </div>

            {instructionsLoading ? (
              <div className="modal-loading">
                Carregando...
              </div>
            ) : (
              <>
                <div className="instructions-status">
                  {instructionsAreCustom
                    ? "Usando instrucoes personalizadas"
                    : "Usando prompt padrao"}
                </div>

                <textarea
                  className="instructions-textarea"
                  value={instructions}
                  onChange={(event) => {
                    setInstructions(event.target.value);
                    setInstructionsSaved(false);
                  }}
                  maxLength={12000}
                  disabled={instructionsSaving}
                  autoFocus
                />

                <div className="modal-meta">
                  <span>
                    {instructions.length}/12000
                  </span>

                  {instructionsSaved && (
                    <span className="success-text">
                      Salvo.
                    </span>
                  )}

                  {instructionsError && (
                    <span className="error-text">
                      {instructionsError}
                    </span>
                  )}
                </div>

                <div className="modal-actions">
                  <button
                    className="danger-light-btn"
                    onClick={handleRestoreDefault}
                    disabled={instructionsSaving}
                  >
                    Restaurar padrao
                  </button>

                  <div className="modal-actions-right">
                    <button
                      className="secondary-btn"
                      onClick={() =>
                        setInstructionsOpen(false)
                      }
                      disabled={instructionsSaving}
                    >
                      Fechar
                    </button>

                    <button
                      className="primary-btn"
                      onClick={handleSaveInstructions}
                      disabled={instructionsSaving}
                    >
                      {instructionsSaving
                        ? "Salvando..."
                        : "Salvar"}
                    </button>
                  </div>
                </div>
              </>
            )}
          </section>
        </div>
      )}
    </>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(<App />);