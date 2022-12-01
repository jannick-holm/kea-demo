import ReactDOM from 'react-dom/client'
import { AuthProvider } from './context/auth.jsx';
import './index.scss';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <App />
    </AuthProvider>
)
