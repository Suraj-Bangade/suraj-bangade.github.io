import { ArrowUpRight, BrainCircuit, Check, Github, Linkedin, Mail, Menu, Network, Workflow, X } from 'lucide-react';
import { useState } from 'react';
import './App.css';

const focusAreas = [
  { number: '01', title: 'Retrieval systems', text: 'Designing practical RAG systems across different retrieval, grounding, and evaluation patterns.', icon: BrainCircuit, tags: ['RAG', 'Embeddings', 'Evaluation'] },
  { number: '02', title: 'Agentic workflows', text: 'Building agents that can reason through work, use tools, and stay useful beyond a single chat turn.', icon: Network, tags: ['Agents', 'Tools', 'MCP'] },
  { number: '03', title: 'AI automation', text: 'Connecting the tools teams already use so repetitive operational work becomes a dependable system.', icon: Workflow, tags: ['Jira', 'Slack', 'Confluence', 'Google Workspace'] },
];

const systems = [
  { title: 'Gantry', label: 'OPEN SOURCE / RUNTIME', text: 'Exploring a provider-neutral, self-hosted agent runtime for governed tools, channels, memory, and scheduled work.', href: 'https://github.com/knacklabs-ai/gantry', tone: 'blue' },
  { title: 'Hermes Agent', label: 'AGENT SYSTEMS', text: 'Working with agent runtimes and the practical edges between models, tools, context, and real workflows.', tone: 'violet' },
  { title: 'OpenClaw', label: 'AI TOOLING', text: 'Experimenting with new AI tools and interfaces that make capable systems more useful in day-to-day work.', tone: 'orange' },
];

const stack = ['Python', 'RAG', 'Agentic systems', 'LangGraph', 'MCP', 'Postgres', 'Jira', 'Slack', 'Confluence', 'Google Workspace', 'Cursor', 'Codex', 'Skills & plugins'];

function ExternalLink({ href, children }) { return <a className="inline-link" href={href} target="_blank" rel="noreferrer">{children}<ArrowUpRight size={15} /></a>; }

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  return <div className="site-shell">
    <header className="site-header"><a className="wordmark" href="#top" onClick={closeMenu}>SB<span>.</span></a><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X size={22} /> : <Menu size={22} />}</button><nav className={menuOpen ? 'nav-links is-open' : 'nav-links'}><a href="#work" onClick={closeMenu}>Work</a><a href="#systems" onClick={closeMenu}>Systems</a><a href="#about" onClick={closeMenu}>About</a><a className="nav-cta" href="mailto:surajbangade19@gmail.com" onClick={closeMenu}>Let’s talk <ArrowUpRight size={15} /></a></nav></header>
    <main id="top">
      <section className="hero section-wrap"><div className="hero-copy"><p className="eyebrow"><span className="status-dot" /> AI engineer · Pune, India</p><h1>I build AI systems that do more than <em>answer.</em></h1><p className="hero-lede">I’m Suraj Bangade — an engineer focused on RAG, agentic systems, and automation. I like turning messy workflows into reliable software that can actually ship.</p><div className="hero-actions"><a className="button button-primary" href="#work">See what I’m working on <ArrowUpRight size={17} /></a><a className="text-action" href="mailto:surajbangade19@gmail.com">Get in touch <ArrowUpRight size={16} /></a></div></div><div className="hero-art" aria-hidden="true"><div className="orb orb-one" /><div className="orb orb-two" /><div className="orb orb-three" /><div className="signal-card"><span className="signal-label">CURRENT SIGNAL</span><strong>Context → action</strong><span className="signal-line"><i /><i /><i /><i /><i /></span><small>Retrieval, reasoning, tools</small></div></div></section>
      <section className="proof-strip section-wrap"><span>Currently building with</span><a href="https://www.knacklabs.ai/" target="_blank" rel="noreferrer">KnackLabs <ArrowUpRight size={14} /></a><span className="strip-divider">for</span><a href="https://www.inmotionhosting.com/" target="_blank" rel="noreferrer">InMotion Hosting <ArrowUpRight size={14} /></a><span className="strip-date">Since March 2026</span></section>
      <section id="work" className="section-wrap section-block"><div className="section-heading"><p className="eyebrow">01 / What I do</p><h2>Useful intelligence, thoughtfully engineered.</h2></div><div className="focus-grid">{focusAreas.map(({ number, title, text, icon: Icon, tags }) => <article className="focus-card" key={title}><div className="card-top"><span>{number}</span><Icon size={22} /></div><h3>{title}</h3><p>{text}</p><div className="tag-row">{tags.map(tag => <span key={tag}>{tag}</span>)}</div></article>)}</div></section>
      <section id="systems" className="section-wrap section-block systems-section"><div className="section-heading split-heading"><div><p className="eyebrow">02 / Selected systems</p><h2>Recent work, in the real world.</h2></div><p className="heading-note">A snapshot of the systems and tools shaping my work right now.</p></div><div className="system-list">{systems.map(({ title, label, text, href, tone }) => <article className={`system-row ${tone}`} key={title}><div className="system-index">/</div><div className="system-body"><p className="eyebrow">{label}</p><h3>{title}</h3><p>{text}</p>{href && <ExternalLink href={href}>View on GitHub</ExternalLink>}</div><ArrowUpRight className="row-arrow" size={22} /></article>)}</div></section>
      <section id="about" className="about-section"><div className="section-wrap about-grid"><div><p className="eyebrow">03 / A little context</p><h2>Engineer first.<br /><em>Curious always.</em></h2></div><div className="about-copy"><p>My work sits at the intersection of software engineering and applied AI. I’m interested in the parts that make an AI product trustworthy: useful context, clear tool boundaries, observable behavior, and a workflow that makes sense to the person using it.</p><p>At KnackLabs, I’m getting to work on exactly that — building for a real client while learning how RAG, agents, automation, and open tooling fit together in production.</p><p>I’m also fluent in AI-native development: using Cursor and Codex deliberately, optimizing how I work with them, and creating and using skills and plugins to extend what these tools can do.</p><div className="timeline"><div><strong>Mar 2026 — now</strong><span>AI Engineer · KnackLabs</span></div><div><strong>2024 — 2026</strong><span>Software Engineer · Amla Commerce</span></div></div></div></div></section>
      <section className="section-wrap toolkit section-block"><div className="toolkit-heading"><p className="eyebrow">The toolkit</p><h2>Tools I reach for.</h2></div><div className="stack-list">{stack.map(item => <span key={item}><Check size={14} />{item}</span>)}</div></section>
      <section id="contact" className="contact-section section-wrap"><p className="eyebrow">Have a thoughtful problem?</p><h2>Let’s make something<br /><em>useful.</em></h2><a className="button button-primary" href="mailto:surajbangade19@gmail.com">Say hello <Mail size={17} /></a></section>
    </main>
    <footer className="site-footer section-wrap"><span>© 2026 Suraj Bangade</span><span>Built with curiosity & care</span><div className="socials"><a href="https://github.com/Suraj-Bangade" aria-label="GitHub"><Github size={18} /></a><a href="https://www.linkedin.com/in/suraj-bangade" aria-label="LinkedIn"><Linkedin size={18} /></a><a href="mailto:surajbangade19@gmail.com" aria-label="Email"><Mail size={18} /></a></div></footer>
  </div>;
}
export default App;
