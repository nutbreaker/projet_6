import { Form, redirect, useActionData, useNavigation } from "react-router";
import LoginForm from "../components/login-form";
import LogoLink from "../components/logo-link";

const API_BASE = import.meta.env.VITE_API_URL || "";

export async function clientAction({ request }) {
  const formData = await request.formData();
  const loginData = Object.fromEntries(formData);
  const response = await fetch(`${API_BASE}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginData),
  });

  if (!response.ok) {
    return { error: "Adresse e-mail ou mot de passe invalide" };
  }

  const data = await response.json();

  localStorage.setItem("token", data.token);

  return redirect("/profil");
}


export default function Login() {

  return (
    <main className="login">
      <div className="login-panel">
        <LogoLink />

        <div className="form-container">
          <p>Transformez <br /> vos stats en résultats</p>
          <LoginForm actionData />
        </div>

      </div>
      <div className="side-image-panel">
        <img src="/img/login.jpg" />

        <p>
          Analysez vos performances en un clin d'oeil, suivez vos progrès et atteignez vos objectifs.
        </p>
      </div>
    </main>
  );
}
