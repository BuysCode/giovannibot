import { useNavigate } from 'react-router-dom';
import { Sparkles, Home } from 'lucide-react';
import '../region.css';

export default function Header({ currentRegion }) {
    const navigate = useNavigate();

    return (
        <header className="gemini-header">
            <div className="gemini-header-content">
                <div className="gemini-header-left">
                    <Sparkles size={24} className="gemini-logo-icon" />
                    <div className="gemini-header-text">
                        <h1 className="gemini-title">Giovanni Bot</h1>
                        <p className="gemini-subtitle">{currentRegion}</p>
                    </div>
                </div>
                <button onClick={() => navigate('/')} className="gemini-home-btn">
                    <Home size={20} />
                </button>
            </div>
        </header>
    )
}