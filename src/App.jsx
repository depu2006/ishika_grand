import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

const benefits = [
  {
    title: 'Fast delivery',
    text: 'Launch polished experiences without losing momentum.',
  },
  {
    title: 'Thoughtful design',
    text: 'Every section balances clarity, spacing, and visual rhythm.',
  },
  {
    title: 'Reliable support',
    text: 'Stay connected with a team that keeps details moving.',
  },
]

const links = [
  {
    name: 'Explore Vite',
    url: 'https://vite.dev/',
    icon: viteLogo,
    alt: 'Vite logo',
  },
  {
    name: 'Learn React',
    url: 'https://react.dev/',
    icon: reactLogo,
    alt: 'React logo',
  },
]

function App() {
  return (
    <main className="app-shell">
      <section className="hero-panel">
        <div className="hero-copy">
          <span className="eyebrow">Welcome to Ishika Grand</span>
          <h1>Build a beautiful experience people remember.</h1>
          <p>
            Turn simple pages into confident, polished journeys with modern
            layouts, clear hierarchy, and purposeful visuals.
          </p>
          <div className="hero-actions">
            <a href="#learn-more" className="primary-btn">
              Get started
            </a>
            <a href="#resources" className="secondary-btn">
              View resources
            </a>
          </div>
          <ul className="stats-list">
            <li>
              <strong>98%</strong>
              <span>Client satisfaction</span>
            </li>
            <li>
              <strong>12k+</strong>
              <span>Monthly visitors</span>
            </li>
            <li>
              <strong>4.9/5</strong>
              <span>Average rating</span>
            </li>
          </ul>
        </div>

        <div className="hero-visual">
          <div className="visual-card">
            <img
              src={heroImg}
              className="hero-image"
              alt="Illustration representing Ishika Grand"
            />
            <span className="pill pill-top">New launch</span>
            <span className="pill pill-bottom">Live updates</span>
          </div>
        </div>
      </section>

      <section className="benefit-row" id="learn-more">
        {benefits.map((item) => (
          <article key={item.title} className="benefit-card">
            <h2>{item.title}</h2>
            <p>{item.text}</p>
          </article>
        ))}
      </section>

      <section className="content-grid" id="resources">
        <article className="info-card">
          <div className="card-top">
            <span className="card-label">Documentation</span>
            <span className="card-dot"></span>
          </div>
          <h2>Everything you need to move faster</h2>
          <p>
            From setup tips to launch checklists, keep every detail aligned and
            easy to follow.
          </p>
          <div className="image-placeholder">
            <img src={viteLogo} alt="Vite logo" />
          </div>
        </article>

        <article className="info-card accent-card">
          <div className="card-top">
            <span className="card-label">Community</span>
            <span className="card-dot"></span>
          </div>
          <h2>Stay connected with the people building next</h2>
          <p>
            Follow the latest updates, ideas, and conversations from the
            creative community.
          </p>
          <div className="links-list">
            {links.map((link) => (
              <a key={link.name} href={link.url} target="_blank" rel="noreferrer">
                <img src={link.icon} alt={link.alt} />
                <span>{link.name}</span>
              </a>
            ))}
          </div>
        </article>
      </section>
    </main>
  )
}

export default App
