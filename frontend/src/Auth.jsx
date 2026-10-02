const { useState } = React;

function Auth({ onAuthSuccess }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (mode === "signup" && password !== confirmPassword) {
      setError("Senhas nao conferem");
      return;
    }

    setLoading(true);
    try {
      const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/signup";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Erro ao autenticar");
        return;
      }

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user_email", data.email);
      onAuthSuccess(data.access_token, data.email);
    } catch (err) {
      setError("Erro de conexao com o servidor");
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    setError("");
  };

  return (
    <main className="auth-shell">
      <div className="auth-card">
        <h1 className="auth-brand">ChatLLM Labasdasdasd</h1>
        <h2 className="auth-title">
          {mode === "login" ? "Entrar" : "Criar Conta"}
        </h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          {mode === "signup" && (
            <input
              type="password"
              placeholder="Confirmar senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
            />
          )}

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" disabled={loading}>
            {loading
              ? "Aguarde..."
              : mode === "login"
              ? "Entrar"
              : "Criar Conta"}
          </button>
        </form>

        <p className="auth-toggle">
          {mode === "login" ? (
            <>
              Nao tem conta?{" "}
              <a href="#" onClick={(e) => { e.preventDefault(); toggleMode(); }}>
                Cadastre-se
              </a>
            </>
          ) : (
            <>
              Ja tem conta?{" "}
              <a href="#" onClick={(e) => { e.preventDefault(); toggleMode(); }}>
                Fazer login
              </a>
            </>
          )}
        </p>
      </div>
    </main>
  );
}