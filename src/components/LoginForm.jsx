import { useState } from "react";
import "../styles/LoginForm.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const LoginForm = ({ onLogin, isLoading, error }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!username.trim()) {
            newErrors.username = "El usuario es requerido";
        }

        if (!password.trim()) {
            newErrors.password = "La contraseña es requerida";
        } else if (password.length < 4) {
            newErrors.password = "La contraseña debe tener al menos 4 caracteres";
        }

        // Manejo de errores en formulario de login
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Manejo del envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            await onLogin(username, password);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h2>Iniciar Sesión</h2>
                    <p>Ingresa las credenciales</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="username">Usuario</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={errors.username ? "input-error" : ""}
                            placeholder="Usuario"
                            disabled={isLoading}
                        />
                        {errors.username && (
                            <span className="error-message">{errors.username}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <div className="password-input-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={errors.password ? "input-error" : ""}
                                placeholder="Contraseña"
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                                disabled={isLoading}
                            >
                                <i
                                    className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}
                                ></i>
                            </button>
                        </div>
                        {errors.password && (
                            <span className="error-message">{errors.password}</span>
                        )}
                    </div>

                    {error && <div className="auth-error">{error}</div>}

                    <button type="submit" className="login-button" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <span className="spinner"></span>
                                Cargando...
                            </>
                        ) : (
                            "Ingresar"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
