import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Map, MessageCircle, Globe, ArrowRight, Star } from 'lucide-react';
import './LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Map size={24} />,
      title: 'Mapa Interativo',
      description: 'Explore todas as 20 regiões da Itália com um clique'
    },
    {
      icon: <MessageCircle size={24} />,
      title: 'Chat Inteligente',
      description: 'Converse com IA especializada em cada região'
    },
    {
      icon: <Globe size={24} />,
      title: 'Informações Completas',
      description: 'História, cultura, gastronomia e pontos turísticos'
    }
  ];

  const regions = [
    { name: 'Toscana', emoji: '🏛️' },
    { name: 'Lazio', emoji: '🏛️' },
    { name: 'Lombardia', emoji: '🏔️' },
    { name: 'Veneto', emoji: '🚣' },
    { name: 'Sicília', emoji: '🌋' },
    { name: 'Campania', emoji: '🍕' }
  ];

  return (
    <div className="landing-page">
      {/* Header */}
      <header className={`landing-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="landing-header-content">
          <div className="landing-logo">
            <div className="logo-icon">
              <Sparkles size={20} />
            </div>
            <span className="logo-text">Guida Italiana</span>
          </div>

          <button onClick={() => navigate('/map')} className="header-cta-btn">
            Começar
            <ArrowRight size={16} />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        {/* Decorative Elements */}
        <div className="hero-decoration hero-decoration-1">🇮🇹</div>
        <div className="hero-decoration hero-decoration-2">🍝</div>

        <div className="hero-content">
          <div className="hero-badge">
            <Star size={16} />
            Descubra a Itália de forma interativa
          </div>

          <h1 className="hero-title">
            Explore a Itália
            <br />
            Região por Região
          </h1>

          <p className="hero-description">
            Descubra a história, cultura e gastronomia de cada região italiana através de um chat inteligente e interativo.
          </p>

          <div className="hero-buttons">
            <button onClick={() => navigate('/map')} className="btn-primary">
              Começar Agora
              <ArrowRight size={20} />
            </button>

            <button className="btn-secondary">
              Ver Regiões
            </button>
          </div>

          {/* Stats */}
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">20</div>
              <div className="stat-label">Regiões</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">IA</div>
              <div className="stat-label">Assistente</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">∞</div>
              <div className="stat-label">Possibilidades</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Como Funciona</h2>
            <p className="section-subtitle">
              Uma experiência única para explorar a Itália
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, idx) => (
              <div key={idx} className="feature-card">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regions Preview */}
      <section className="regions-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Regiões Populares</h2>
            <p className="section-subtitle">
              Comece sua jornada por estas regiões fascinantes
            </p>
          </div>

          <div className="regions-grid">
            {regions.map((region, idx) => (
              <button
                key={idx}
                onClick={() => navigate(`/region/${region.name.toLowerCase()}`)}
                className="region-card"
              >
                <div className="region-emoji">{region.emoji}</div>
                <div className="region-name">{region.name}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Pronto para Explorar?</h2>
          <p className="cta-description">
            Escolha uma região no mapa e comece a conversar com nossa IA especializada em cultura italiana.
          </p>
          <button onClick={() => navigate('/map')} className="cta-button">
            Começar Agora
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-logo">
          <div className="footer-logo-icon">
            <Sparkles size={16} />
          </div>
          <span className="footer-logo-text">Guida Italiana</span>
        </div>
        <p className="footer-text">
          © 2026 Guida Italiana. Descubra a Itália de forma interativa.
        </p>
      </footer>
    </div>
  );
}