import { Form, useNavigation, useActionData } from "react-router";
import FormField from "./form-field";

/**
 * Renders the login form for user authentication.
 * 
 * @returns {JSX.Element}
 */
export default function LoginForm() {
    // https://reactrouter.com/api/hooks/useNavigation
    const navigation = useNavigation();
    // https://reactrouter.com/api/hooks/useActionData#useactiondata
    const actionData = useActionData();

    const isSubmitting = navigation.state === "submitting";

    return (
        <Form className="login-form" method="POST" discover="none">
            <h2>Se connecter</h2>

            {actionData?.error && (
                <p style={{ color: 'var(--error-color)', fontSize: '1.4rem', margin: 0 }}>{actionData.error}</p>
            )}

            <FormField id="username" name="username" label="Adresse email" isSubmitting={isSubmitting} />
            <FormField id="password" name="password" type="password" label="Mot de passe" isSubmitting={isSubmitting} />

            <button type="submit" className="login-button" disabled={isSubmitting}>
                 Se connecter
            </button>

            <a href="/forgot-password" className="forgot-password-link">
                Mot de passe oublié ?
            </a>
        </Form>
    );
}