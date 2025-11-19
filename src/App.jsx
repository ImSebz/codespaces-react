import { useAuth } from './hooks/useAuth';
import LoginForm from './components/LoginForm';
import DataTable from './components/DataTable';
import './App.css';


function App() {
  const { isAuthenticated, isLoading, error, login, logout } = useAuth();

  return (
    // Manejo de vistas según estado
    <div className="App">
      {!isAuthenticated ? (
        <LoginForm 
          onLogin={login}
          isLoading={isLoading}
          error={error}
        />
      ) : (
        <DataTable onLogout={logout} />
      )}
    </div>
  );
}

export default App;
