import { useAuthStore } from "../store/auth.store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function LoginPage() {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  const [name, setName] = useState("");

  function handleLogin() {
    if (!name) return;
    login(name);
    navigate("/dashboard");
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="space-y-4">
        <h1 className="text-xl font-bold">Login</h1>
        <input
          className="border p-2"
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="bg-black text-white px-4 py-2" onClick={handleLogin}>
          Entrar
        </button>
      </div>
    </div>
  );
}