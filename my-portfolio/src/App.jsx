import React, { useState, useEffect, useRef } from 'react';
import {
    Cpu,
    Zap,
    GitBranch,
    Terminal,
    Database,
    BrainCircuit,
    Layers,
    Globe,
    Server,
    Code2,
    X,
    Workflow,
    Bot,
    ShieldCheck,
    Network,
    Activity,
    Filter,
    Power,
    Sun,
    Moon,
    Wrench,
    Brain,
    TrendingUp,
    Gauge,
    Search,
    BarChart,
    Smartphone,
    Linkedin,
    Mail,
    ExternalLink,
    FileDown,
    Printer,
    FileText,
    Trophy, Medal, Star, Award
} from 'lucide-react';

// --- Constants & Data ---
const SKILLS = [
    { title: "AI and Data", skills: ["Deep Learning (ANN)", "LangChain", "LangGraph", "MS Agent Framework", "Vector DBs", "Semantic Search"] },
    { title: "DevOps & Infra", skills: ["Kubernetes", "Helm", "Docker", "GitHub Actions", "Linux Kernel", "Bash"] },
    { title: "Backend & Systems", skills: ["Python", "Rust", "C# .NET", "Next.js", "Microsoft SQL Server", "Tauri"] },
    { title: "Algorithms", skills: ["Two-Tower Arch", "Recommendation Systems", "Purchase Prediction", "Clustering"] }
]
const DOMAINS = {
    foundation: { label: 'FOUNDATION', color: 'text-slate-400', border: 'border-slate-500', shadow: 'shadow-slate-500/50' },
    ai: { label: 'AI / ML', color: 'text-purple-400', border: 'border-purple-500', shadow: 'shadow-purple-500/50' },
    core: { label: 'CORE ENG', color: 'text-orange-400', border: 'border-orange-500', shadow: 'shadow-orange-500/50' },
    backend: { label: 'BACKEND', color: 'text-blue-400', border: 'border-blue-500', shadow: 'shadow-blue-500/50' },
    devops: { label: 'DEVOPS', color: 'text-emerald-400', border: 'border-emerald-500', shadow: 'shadow-emerald-500/50' },
    lead: { label: 'LEADERSHIP', color: 'text-rose-400', border: 'border-rose-500', shadow: 'shadow-rose-500/50' },
    hobby: { label: 'R&D / HACK', color: 'text-indigo-400', border: 'border-indigo-500', shadow: 'shadow-indigo-500/50' },
};
const EXPERIENCE = [
    {
        company: "Amla Commerce",
        role: "Software Engineer",
        period: "Jan 2024 - Present",
        highlights: [
            {
                title: "Nelli AI Platform (Leadership)",
                desc: "Spearheaded the evolution of Nelli from a personal proof-of-concept to a deployable Kubernetes-based product. Architecting with LangChain, Python, and MS Agent Framework."
            },
            {
                title: "AI & Data Intelligence",
                desc: "Designed intelligent systems including Recommendation Engines (Two-Tower), Semantic Search (Vector DBs), and Predictive Analytics (ANN) for purchase prediction."
            },
            {
                title: "Performance Optimization & Governance",
                desc: "Optimized critical paths (DB queries, APIs) improving system responsiveness. Served on Governance Team to enforce code quality and minimize breaking changes."
            },
            {
                title: "Infrastructure & Automation",
                desc: "Created 'Znode CLI' for automated on-prem deployments. Built internal tools automating Jira and Git operations using Python and Bash."
            }
        ]
    }
];
const ACHIEVEMENTS = [
    {
        id: 'award_rookie',
        title: "Rockstar Rookie Award",
        org: "Amla Commerce",
        date: "2024",
        desc: "Awarded 'Best Junior Developer' for outstanding impact, rapid learning, and ownership of critical platform features (Nelli).",
        icon: Trophy,
        color: "text-yellow-500",
        border: "border-yellow-500/50",
        bg: "bg-yellow-500/10"
    },
    {
        id: 'award_top3',
        title: "Top 3 Academic Performer",
        org: "College Dept.",
        date: "2020-2024",
        desc: "Consistently ranked in the Top 3 of the Computer Technology department throughout the BTech degree program.",
        icon: Medal,
        color: "text-sky-400",
        border: "border-sky-500/50",
        bg: "bg-sky-500/10"
    },
    {
        id: 'award_co',
        title: "Best Performer: Co-Curricular",
        org: "College",
        date: "2023",
        desc: "Recognized for outstanding leadership in technical clubs and fostering a coding culture on campus. As well as learning new skills and raising awareness about it.",
        icon: Star,
        color: "text-purple-400",
        border: "border-purple-500/50",
        bg: "bg-purple-500/10"
    }
];
const TIMELINE_NODES = [
    {
        id: 'college_java',
        title: "Foundation & DSA",
        type: 'foundation',
        date: 'Pre-2024',
        icon: Code2,
        tech: "Java, Algorithms",
        desc: "Solved 170+ DSA problems."
    },
    {
        id: 'college_blood_bank',
        title: "Blood Bank Management",
        type: 'foundation',
        date: 'College',
        icon: BrainCircuit,
        tech: "Django, Python",
        desc: "Academic project utilizing Django for advanced management systems."
    },
    {
        id: 'college_cust_seg',
        title: "Customer Segmentation",
        type: 'foundation',
        date: 'College',
        icon: Database,
        tech: "Streamlit, ANN, Python, ML",
        desc: "Customer segmentation and purchase prediction system built with the Streamlit, Keras, and Tensorflow."
    },
    {
        id: 'pro_genai',
        title: "GenAI Integration",
        type: 'ai',
        date: 'Apr 2024',
        icon: Bot,
        tech: ".NET, React, Gemini",
        desc: "First professional GenAI project. Built and deployed a content generation feature to production."
    },
    {
        id: 'pro_rec',
        title: "Recommendation Engine",
        type: 'ai',
        date: 'May 2024',
        icon: Network,
        tech: "Two Tower Architecture, Collaborative Filtering, Python",
        desc: "Implemented Collaborative & Content filtering. Explored Two Tower architecture for high-scale retrieval."
    },
    {
        id: 'pro_search',
        title: "Semantic Search",
        type: 'ai',
        date: 'Jun 2024',
        icon: Globe,
        tech: "Elasticsearch, Vector Embeddings, Python",
        desc: "Replaced keyword search with semantic capabilities using ElasticSearch as the data and vector source."
    },
    {
        id: 'pro_ml_redux',
        title: "ML in Production",
        type: 'ai',
        date: 'July 2024',
        icon: BrainCircuit,
        tech: "Predictive Models, Python, ML",
        desc: "Re-implemented Customer Segmentation & Purchase Prediction, adapting academic concepts for production scale."
    },
    {
        id: 'pro_perf',
        title: "Performance Engineering",
        type: 'core',
        date: 'Aug 2024',
        icon: Zap,
        tech: "SQL, EF Core, Governance",
        desc: "Optimized critical paths: 'Product Publish' & Bulk Import/Export. Tuned Database SPs. Enforced code quality with Governance team."
    },
    {
        id: 'pro_erp',
        title: "ERP System",
        type: 'backend',
        date: 'Sep 2024',
        icon: Database,
        tech: "System Arch, Integration, .NET",
        desc: "Built a customization request system connecting the core product to 3rd party ERPs."
    },
    {
        id: 'pro_tools_1',
        title: "Workflow Automation",
        type: 'devops',
        date: 'Oct 2024',
        icon: Workflow,
        tech: "Jira API, Git Automation, .Net, Python",
        desc: "Created internal tools to ease developer workloads, automating Jira transitions and Git operations."
    },
    {
        id: 'pro_tools_2',
        title: "Automation: Code and API Documentation",
        type: 'devops',
        date: 'Nov 2024',
        icon: Bot,
        tech: "Deterministic Logic, AI, Typescript, React",
        desc: "Built a hybrid AI/Logic tool to automatically generate and improve Code & API documentation."
    },
    {
        id: 'pro_cli',
        title: "DevOps CLI",
        type: 'devops',
        date: 'Jan 2025',
        icon: Terminal,
        tech: "K8s, Docker, AKS, CLI",
        desc: "Created a custom CLI tool for automating complex on-premise deployments and container orchestration."
    },
    {
        id: 'pro_nelli_proto',
        title: "Nelli Agentic AI Prototype",
        type: 'ai',
        date: 'Apr 2025',
        icon: Layers,
        tech: "LangGraph, N8N, AI Agents",
        desc: "R&D phase for Agentic Platform. Built prototypes using N8N for API automation and LangChain."
    },
    {
        id: 'pro_nelli_prod',
        title: "Nelli Agentic AI Platform",
        type: 'lead',
        date: 'Current',
        icon: Cpu,
        tech: "Microsoft Agent, MCP, CopilotKit, React",
        desc: "Leading 'Nelli'. Architecting end-to-end agent system with MCPs, Gateways, MS Agent Framework, and CopilotKit frontend."
    },
    {
        id: 'hobby_kernel',
        title: "Mobile Server",
        type: 'hobby',
        date: 'Parallel',
        icon: ShieldCheck,
        tech: "Linux Kernel, Android, Docker, K8s",
        desc: "Modified, Compiled and Flashed custom Linux kernel on Android to run native Docker/K8s cluster on a phone."
    }
];

// --- Helper Components ---

// 1. Printable Resume
const PrintableResume = ({ customClass = "hidden print:block" }) => {
    // Filter for professional/significant projects only for the CV
    const professionalNodes = [...TIMELINE_NODES].reverse();

    return (
        <div className={`${customClass} bg-white text-black p-8 max-w-[210mm] mx-auto leading-normal shadow-2xl print:shadow-none`}>
            {/* Header */}
            <header className="border-b-2 border-slate-800 pb-4 mb-6">
                <h1 className="text-4xl font-bold uppercase tracking-wider mb-2">Suraj Bangade</h1>
                <div className="flex justify-between text-sm font-mono text-slate-600 mt-2">
                    <span className="font-bold">Software Engineer</span>
                    <div className="flex gap-2">
                        <a
                            href="mailto:surajbangade19@gmail.com"
                            className="hover:text-sky-600 hover:underline transition-colors"
                        >
                            surajbangade19@gmail.com
                        </a>
                        <span>•</span>
                        <a
                            href="https://www.linkedin.com/in/suraj-bangade"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-sky-600 hover:underline transition-colors"
                        >
                            linkedin.com/in/suraj-bangade
                        </a>
                    </div>
                </div>
            </header>

            {/* Professional Summary */}
            <section className="mb-6">
                <p className="text-sm text-slate-800 leading-relaxed">
                    Adaptable Engineer with a passion for deep technical research and problem-solving. I build end-to-end solutions, from low-level infrastructure to modern AI agents. My goal is simple: write clean code, automate repetitive tasks, and build reliable software that delivers real value.
                </p>

            </section>
            <section className="mb-6">
                <h3 className="font-bold text-sm uppercase border-b border-slate-300 mb-4 pb-1">Professional Experience</h3>
                <div className="space-y-6">
                    {EXPERIENCE.map((exp, index) => (
                        <div key={index}>
                            <div className="flex justify-between items-baseline mb-2">
                                <div>
                                    <span className="text-base font-bold text-slate-900">{exp.company}</span>
                                    <span className="mx-2 text-slate-400">|</span>
                                    <span className="text-sm font-semibold text-slate-700">{exp.role}</span>
                                </div>
                                <span className="text-xs font-mono text-slate-500">{exp.period}</span>
                            </div>
                            <ul className="list-disc ml-4 space-y-1">
                                {exp.highlights.map((h, i) => (
                                    <li key={i} className="text-sm text-slate-700 pl-1">
                                        <span className="font-semibold">{h.title}:</span> {h.desc}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
            {/* Skills Snapshot */}
            <section className="mb-6">
                <h3 className="font-bold text-sm uppercase border-b border-slate-300 mb-2 pb-1">Technical Arsenal</h3>
                <div className="text-sm text-slate-700 grid grid-cols-1 gap-1">
                    {SKILLS.map((group, index) => (
                        <div key={index}>
                            <span className="font-bold w-40 inline-block">
                                {group.title}:
                            </span>
                            <span>{group.skills.join(', ')}</span>
                        </div>
                    ))}
                </div>
            </section>
            <section className="mb-6">
                <h3 className="font-bold text-sm uppercase border-b border-slate-300 mb-2 pb-1">Honors & Awards</h3>
                <div className="space-y-2">
                    {ACHIEVEMENTS.map((item) => (
                        <div key={item.id} className="flex justify-between items-start text-sm">
                            <div>
                                <span className="font-bold text-slate-900">{item.title}</span>
                                <span className="text-slate-600 mx-1">|</span>
                                <span className="text-slate-700 italic">{item.org}</span>
                                <p className="text-xs text-slate-600 mt-0.5 leading-tight max-w-lg">{item.desc}</p>
                            </div>
                            <span className="font-mono text-xs text-slate-500">{item.date}</span>
                        </div>
                    ))}
                </div>
            </section>
            {/* Experience Loop */}
            <section>
                <h3 className="font-bold text-sm uppercase border-b border-slate-300 mb-4 pb-1">Engineering Timeline</h3>
                <div className="space-y-5">
                    {professionalNodes.map((node) => (
                        <div key={node.id} className="grid grid-cols-[1fr_5fr] gap-4">
                            <div className="text-xs font-mono pt-1 text-slate-500 whitespace-nowrap">
                                {node.date}
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-bold text-base">{node.title}</h4>
                                    <span className="text-[10px] px-2 py-0.5 border border-slate-400 rounded text-slate-600 uppercase font-mono tracking-wider">
                                        {DOMAINS[node.type]?.label}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-700 mb-1">{node.desc}</p>
                                <div className="text-xs text-slate-500 font-mono italic">
                                    <span className="font-semibold not-italic text-slate-600">Stack:</span> {node.tech}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <div className="mt-12 pt-4 border-t border-slate-200 text-center text-[10px] text-slate-400 font-mono">
                System generated CV • {new Date().getFullYear()}
            </div>
        </div>
    );
};

const AchievementsSection = ({ darkMode }) => {
    return (
        <section className={`py-12 border-b ${darkMode ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-white'}`}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {ACHIEVEMENTS.map((item) => (
                        <div
                            key={item.id}
                            className={`
                                relative p-6 rounded-xl border transition-all duration-300 hover:scale-[1.02]
                                ${darkMode ? `bg-slate-900 ${item.border}` : 'bg-white border-slate-200 shadow-sm'}
                            `}
                        >
                            {/* Glow Effect for Dark Mode */}
                            {darkMode && (
                                <div className={`absolute inset-0 rounded-xl blur-xl opacity-20 ${item.bg}`}></div>
                            )}

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-slate-950' : 'bg-slate-100'} ${item.color}`}>
                                        <item.icon size={24} />
                                    </div>
                                    <span className="font-mono text-xs text-slate-500 px-2 py-1 rounded border border-slate-700/30">
                                        {item.date}
                                    </span>
                                </div>
                                <h3 className={`text-lg font-bold mb-1 ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                                    {item.title}
                                </h3>
                                <div className="text-xs font-mono text-sky-500 mb-3 uppercase tracking-wider">
                                    {item.org}
                                </div>
                                <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- Boot Sequence ---
const BootTerminal = ({ onComplete }) => {
    const [lines, setLines] = useState([]);
    const bootText = [
        "INITIALIZING KERNEL...",
        "LOADING MODULES: [DSA, JAVA, PYTHON]... OK",
        "MOUNTING FILESYSTEM (PROJECTS_DB)... OK",
        "STARTING NEURAL ENGINE (AI_AGENTS)... OK",
        "CHECKING DEVOPS INTEGRITY... OK",
        "OPTIMIZING DATABASE SPs... OK",
        "SYSTEM READY. WELCOME, ARCHITECT."
    ];

    useEffect(() => {
        let delay = 0;
        bootText.forEach((line, index) => {
            delay += Math.random() * 100 + 50;
            setTimeout(() => {
                setLines(prev => [...prev, line]);
                if (index === bootText.length - 1) {
                    setTimeout(onComplete, 300);
                }
            }, delay);
        });
    }, []);

    return (
        <div className="fixed inset-0 z-[100] bg-black text-green-500 font-mono p-8 flex flex-col justify-end pb-20">
            {lines.map((line, i) => (
                <div key={i} className="mb-2 animate-in fade-in slide-in-from-bottom-1 duration-100">
                    <span className="mr-2 text-green-700">{`>`}</span>
                    {line}
                </div>
            ))}
            <div className="animate-pulse mt-2">_</div>
        </div>
    );
};

// --- Timeline Sub-Components ---

const TimelineChip = ({ node, index, isActive, isRelated, isDimmed, onClick, onHover, onLeave, darkMode }) => {
    const isLeft = index % 2 === 0;
    const Icon = node.icon || Terminal;
    const theme = DOMAINS[node.type] || DOMAINS.foundation;

    return (
        <div
            className={`relative flex items-center md:justify-center w-full mb-8 md:mb-24 transition-all duration-500 ${isDimmed ? 'opacity-20 blur-[1px] scale-95' : 'opacity-100 scale-100'}`}
            onMouseEnter={() => onHover(node)}
            onMouseLeave={onLeave}
        >
            {/* --- DESKTOP CIRCUIT TRACE (Hidden on Mobile) --- */}
            <div className={`absolute top-0 bottom-0 w-1/2 pointer-events-none hidden md:block ${isLeft ? 'left-0' : 'right-0'}`}>
                <svg className="w-full h-full absolute top-0 left-0 overflow-visible">
                    <path
                        d={isLeft
                            ? "M 100% 50% L 90% 50% L 80% 50% L 20% 50%"
                            : "M 0% 50% L 10% 50% L 20% 50% L 80% 50%"}
                        fill="none"
                        stroke={(isActive || isRelated) ? (isLeft ? "url(#gradLeft)" : "url(#gradRight)") : (darkMode ? "#1e293b" : "#e2e8f0")}
                        strokeWidth={(isActive || isRelated) ? "3" : "2"}
                        strokeLinecap="round"
                        strokeDasharray={isRelated ? "5,5" : "0"}
                        className="transition-all duration-500"
                    />
                    <defs>
                        <linearGradient id="gradLeft" x1="100%" y1="0%" x2="0%" y2="0%">
                            <stop offset="0%" stopColor="#22d3ee" />
                            <stop offset="100%" stopColor="#818cf8" />
                        </linearGradient>
                        <linearGradient id="gradRight" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#22d3ee" />
                            <stop offset="100%" stopColor="#f43f5e" />
                        </linearGradient>
                    </defs>
                </svg>
                <div className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 z-10 transition-all duration-500
                    ${isLeft ? '-right-[7px]' : '-left-[7px]'}
                    ${(isActive || isRelated) ? 'border-cyan-400 bg-cyan-950 scale-125' : (darkMode ? 'border-slate-700 bg-slate-950' : 'border-slate-300 bg-slate-50')}
                `} />
            </div>

            {/* --- MOBILE TRACE (Visible only on Mobile) --- */}
            <div className={`absolute left-6 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 z-20 md:hidden
                ${(isActive || isRelated) ? 'bg-cyan-400 border-cyan-400 shadow-[0_0_10px_cyan]' : (darkMode ? 'bg-slate-950 border-slate-700' : 'bg-slate-50 border-slate-300')}
            `} />
            <div className={`absolute left-6 top-1/2 -translate-y-1/2 h-0.5 md:hidden transition-all duration-500 z-0
                ${(isActive || isRelated) ? 'w-8 bg-cyan-500 shadow-[0_0_10px_cyan]' : 'w-8 bg-slate-700'}
            `} />

            {/* --- THE CARD --- */}
            <div
                onClick={() => onClick(node)}
                className={`
                    relative w-[calc(100%-3rem)] md:w-[40%] max-w-md p-[1px] rounded-lg
                    cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-1
                    ml-12 md:ml-0 
                    ${isLeft ? 'md:mr-auto md:ml-12' : 'md:ml-auto md:mr-12'} 
                    z-10
                    ${darkMode ? 'bg-gradient-to-br from-slate-800 to-slate-950' : 'bg-white border-slate-200 shadow-md'}
                `}
            >
                {(isActive || isRelated) && (
                    <div className={`absolute inset-0 rounded-lg blur-md opacity-50 transition-opacity duration-500 ${theme.color.replace('text-', 'bg-')}`}></div>
                )}

                <div className={`
                    relative h-full backdrop-blur-xl rounded-lg p-4 border
                    flex items-start gap-3 md:gap-4 overflow-hidden
                    ${darkMode ? 'bg-slate-900/95 border-slate-800' : 'bg-slate-50/95 border-slate-200'}
                    ${(isActive || isRelated) ? `${theme.border} shadow-lg ${theme.shadow}` : (darkMode ? 'border-slate-800 border-l-4 border-l-slate-700' : 'border-slate-200 border-l-4 border-l-slate-300')}
                `}>
                    <div className="absolute right-2 top-2 text-[10px] font-mono text-slate-500 opacity-50 select-none">
                        HEX:0x{index.toString(16).padStart(2, '0').toUpperCase()}
                    </div>

                    <div className={`p-2 md:p-3 rounded-md border shrink-0 ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'} ${(isActive || isRelated) ? theme.color : 'text-slate-500'}`}>
                        <Icon size={20} className="md:w-6 md:h-6" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-1">
                            <h3 className={`font-mono font-bold text-sm md:text-base leading-tight ${(isActive || isRelated) ? (darkMode ? 'text-white' : 'text-slate-900') : (darkMode ? 'text-slate-300' : 'text-slate-800')}`}>
                                {node.title}
                            </h3>
                            <span className={`text-[10px] md:text-xs font-mono md:ml-2 mt-1 md:mt-0 w-fit px-2 py-0.5 rounded border ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-500' : 'bg-white border-slate-200 text-slate-600'}`}>
                                {node.date}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={`text-[10px] uppercase font-bold tracking-wider ${theme.color}`}>
                                {DOMAINS[node.type]?.label || 'SYSTEM'}
                            </span>
                            {isRelated && !isActive && (
                                <span className="text-[9px] px-1 rounded bg-slate-800 text-slate-300 border border-slate-700 animate-pulse">
                                    LINKED
                                </span>
                            )}
                        </div>
                        <p className={`text-xs truncate font-mono mt-1 opacity-80 ${darkMode ? 'text-slate-500' : 'text-slate-600'}`}>
                            {node.tech}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DetailModal = ({ node, onClose, darkMode }) => {
    if (!node) return null;
    const Icon = node.icon || Terminal;
    const theme = DOMAINS[node.type];

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
            <div
                className={`w-full max-w-xl border ${theme.border} rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 ${darkMode ? 'bg-slate-900' : 'bg-white'}`}
                onClick={e => e.stopPropagation()}
            >
                <div className={`p-6 border-b flex justify-between items-start relative overflow-hidden ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <div className={`absolute inset-0 opacity-10 ${theme.color.replace('text-', 'bg-')}`} style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
                    <div className="flex items-center gap-4 relative z-10">
                        <div className={`p-3 rounded-lg border ${theme.border} ${theme.color} ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
                            <Icon size={32} />
                        </div>
                        <div>
                            <h2 className={`text-xl md:text-2xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>{node.title}</h2>
                            <p className={`${theme.color} font-mono text-sm`}>{node.date} • {DOMAINS[node.type].label}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className={`transition-colors relative z-10 ${darkMode ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}>
                        <X size={24} />
                    </button>
                </div>
                <div className="p-6 space-y-6">
                    <div>
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                            <Activity size={12} /> Architecture Logic
                        </label>
                        <p className={`leading-relaxed font-light text-sm md:text-base ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                            {node.desc}
                        </p>
                    </div>
                    <div>
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                            <Cpu size={12} /> Tech Stack
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {node.tech.split(',').map((t, i) => (
                                <span key={i} className={`px-3 py-1 rounded border text-sm font-mono transition-colors ${darkMode ? 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500' : 'bg-slate-100 border-slate-200 text-slate-700 hover:border-slate-400'}`}>
                                    {t.trim()}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className={`p-4 rounded border border-dashed font-mono text-xs overflow-x-auto ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'}`}>
                        <div className="flex items-center gap-2 text-yellow-500/80 mb-2">
                            <Terminal size={12} />
                            <span>EXECUTION_LOG</span>
                        </div>
                        <div className={`space-y-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                            <span className="block text-green-500/80 whitespace-nowrap">{`> Initializing ${node.id}... OK`}</span>
                            <span className="block whitespace-nowrap">{`> Loading modules: [${node.tech}]`}</span>
                            <span className="block text-blue-500/80 whitespace-nowrap">{`> Optimization protocols active.`}</span>
                            <span className="block animate-pulse">_</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TimelineSection = ({ darkMode }) => {
    const [activeNode, setActiveNode] = useState(null);
    const [filter, setFilter] = useState('all');
    const [hoveredNode, setHoveredNode] = useState(null);
    const [relatedNodes, setRelatedNodes] = useState([]);
    const sectionRef = React.useRef(null);
    const [lineHeight, setLineHeight] = useState('0%');

    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                // Calculate progress through this specific section
                const start = rect.top - windowHeight / 2;
                const end = rect.bottom - windowHeight / 2;
                const height = rect.height;

                if (rect.top < windowHeight / 2 && rect.bottom > 0) {
                    const progress = Math.min(100, Math.max(0, ((windowHeight / 2 - rect.top) / height) * 100));
                    setLineHeight(`${progress}%`);
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNodeHover = (node) => {
        setHoveredNode(node);
        if (!node) {
            setRelatedNodes([]);
            return;
        }
        const currentTech = node.tech.split(',').map(t => t.trim().toLowerCase());
        const related = TIMELINE_NODES.filter(n => {
            if (n.id === node.id) return false;
            const nTech = n.tech.split(',').map(t => t.trim().toLowerCase());
            const hasTechOverlap = currentTech.some(t => nTech.some(nt => nt.includes(t) || t.includes(nt)));
            return n.type === node.type || hasTechOverlap;
        }).map(n => n.id);
        setRelatedNodes(related);
    };

    const filters = [
        { id: 'all', label: 'ALL SYSTEMS' },
        { id: 'ai', label: 'AI / ML' },
        { id: 'devops', label: 'DEVOPS' },
        { id: 'core', label: 'CORE ENG' },
    ];

    return (
        <section id="timeline" className={`py-20 relative overflow-hidden transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-200' : 'bg-slate-50 text-slate-900'}`} ref={sectionRef}>
            {/* Background Grid */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, ${darkMode ? 'rgba(56, 189, 248, 0.3)' : 'rgba(148, 163, 184, 0.3)'} 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-12">
                    <h2 className={`text-3xl font-bold mb-4 flex items-center justify-center gap-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        <GitBranch className="text-cyan-400" /> Engineering Journey
                    </h2>
                    <p className={`${darkMode ? 'text-slate-400' : 'text-slate-600'} max-w-2xl mx-auto`}>
                        Visualizing the critical path of projects, architecture decisions, and skill acquisition.
                    </p>
                </div>

                <div className="flex justify-center mb-16 sticky top-20 z-40">
                    <div className={`flex gap-1 p-1 backdrop-blur-md border rounded-full shadow-2xl overflow-x-auto max-w-full ${darkMode ? 'bg-slate-900/80 border-slate-700' : 'bg-white/80 border-slate-200'}`}>
                        {filters.map(f => (
                            <button
                                key={f.id}
                                onClick={() => setFilter(f.id)}
                                className={`
                                    px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 whitespace-nowrap
                                    ${filter === f.id
                                        ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                                        : (darkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100')}
                                `}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    {/* --- DESKTOP CENTRAL BUS --- */}
                    <div className={`absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-2 border-x hidden md:block ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`} />
                    <div
                        className="absolute left-1/2 -translate-x-1/2 top-0 w-1 bg-gradient-to-b from-cyan-500 via-purple-500 to-rose-500 shadow-[0_0_20px_rgba(34,211,238,0.6)] transition-all duration-75 hidden md:block"
                        style={{ height: lineHeight }}
                    />

                    {/* --- MOBILE LEFT BUS --- */}
                    <div className={`absolute left-6 top-0 bottom-0 w-0.5 md:hidden ${darkMode ? 'bg-slate-800' : 'bg-slate-300'}`} />

                    <div className="relative pt-4">
                        {[...TIMELINE_NODES].reverse().map((node, index) => {
                            const isVisible = filter === 'all' || node.type === filter || (filter === 'core' && ['core', 'backend'].includes(node.type));
                            const isRelated = relatedNodes.includes(node.id);
                            const isHovering = hoveredNode !== null;
                            const isDimmed = !isVisible || (isHovering && hoveredNode.id !== node.id && !isRelated);

                            if (!isVisible && !isHovering) return null;

                            return (
                                <TimelineChip
                                    key={node.id}
                                    node={node}
                                    index={index}
                                    isActive={activeNode?.id === node.id || hoveredNode?.id === node.id}
                                    isRelated={isRelated}
                                    isDimmed={isDimmed}
                                    onClick={setActiveNode}
                                    onHover={handleNodeHover}
                                    onLeave={() => handleNodeHover(null)}
                                    darkMode={darkMode}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>

            <DetailModal node={activeNode} onClose={() => setActiveNode(null)} darkMode={darkMode} />
        </section>
    );
};

// --- Main App ---

export default function App() {
    const [booted, setBooted] = useState(false);
    const [darkMode, setDarkMode] = useState(true); // Default to dark
    const [showResume, setShowResume] = useState(false);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    if (!booted) {
        return <BootTerminal onComplete={() => setBooted(true)} />;
    }
    // --- RESUME PREVIEW MODE ---
    if (showResume) {
        return (
            <div className="bg-slate-100 min-h-screen text-slate-800">
                {/* Floating Toolbar */}
                <nav className="fixed top-0 w-full bg-slate-900 text-white p-4 z-50 flex justify-between items-center print:hidden shadow-lg">
                    <span className="font-bold font-mono tracking-tight flex items-center gap-2">
                        <FileText className="text-sky-500" /> Resume Preview
                    </span>
                    <div className="flex gap-4">
                        <button
                            onClick={() => window.print()}
                            className="px-4 py-2 bg-sky-600 rounded-md hover:bg-sky-500 transition-colors flex gap-2 items-center font-bold text-sm shadow-md"
                        >
                            <Printer size={16} /> Print / Save PDF
                        </button>
                        <button
                            onClick={() => setShowResume(false)}
                            className="px-4 py-2 bg-slate-700 rounded-md hover:bg-slate-600 transition-colors flex gap-2 items-center font-bold text-sm shadow-md"
                        >
                            <X size={16} /> Close
                        </button>
                    </div>
                </nav>

                {/* Resume Canvas */}
                <div className="pt-24 pb-12 print:pt-0 print:pb-0 px-4 overflow-y-auto">
                    <PrintableResume customClass="block" />
                </div>
            </div>
        )
    }
    return (
        <div className={`transition-colors duration-300 ${darkMode ? 'dark bg-slate-900 text-slate-200' : 'bg-slate-50 text-slate-800'}`}>

            {/* Navbar */}
            <nav className={`fixed w-full top-0 z-50 transition-colors duration-300 ${darkMode ? 'bg-slate-900/80 border-slate-700' : 'bg-white/80 border-slate-200'} backdrop-blur-md border-b`}>
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <a href="#" className="font-mono font-bold text-xl tracking-tighter">
                        &lt;Suraj/<span className="text-sky-500">Bangade</span>&gt;
                    </a>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex gap-6 text-sm font-medium">
                            <a href="#about" className="hover:text-sky-500 transition-colors">About</a>
                            <a href="#experience" className="hover:text-sky-500 transition-colors">Experience</a>
                            <a href="#timeline" className="hover:text-sky-500 transition-colors">Journey</a>
                        </div>
                        <button
                            onClick={() => setShowResume(true)}
                            className={`
                flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all border
                ${darkMode
                                    ? 'bg-slate-800 border-slate-700 text-sky-400 hover:bg-slate-700 hover:border-sky-500'
                                    : 'bg-slate-100 border-slate-200 text-sky-600 hover:bg-white hover:border-sky-500'}
                `}
                            title="Download Resume"
                        >
                            <FileDown size={14} />
                            <span className="hidden sm:inline">CV</span>
                        </button>
                        <button onClick={toggleTheme} className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`} aria-label="Toggle Dark Mode">
                            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header id="about" className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto min-h-[90vh] flex flex-col justify-center">
                <div className="font-mono text-sky-500 mb-4">
                    $ whoami
                </div>
                <h1 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight">
                    Suraj Bangade.<br />
                    <span className={`transition-colors ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Engineer. Researcher. Creator.</span>
                </h1>
                <p className={`text-lg md:text-xl max-w-2xl mb-8 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    I am passionate about the craft of <strong>creation</strong> and the pursuit of <strong>optimization</strong>.
                    My core skill isn't limited to a single stack—it is <strong>research, problem-solving, and adaptability</strong>.
                    I dive deep to understand challenges and build high-quality, efficient solutions using whatever tools the task demands.
                </p>

                <div className="flex flex-wrap gap-4">
                    <a href="#timeline" className={`px-6 py-3 font-bold rounded-lg hover:opacity-90 transition-opacity ${darkMode ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'}`}>
                        View Journey
                    </a>
                    <button
                        onClick={() => setShowResume(true)}
                        className={`px-6 py-3 font-bold border rounded-lg hover:bg-opacity-50 transition-colors flex items-center gap-2 ${darkMode ? 'border-sky-500 text-sky-500 hover:bg-sky-900/20' : 'border-sky-600 text-sky-600 hover:bg-sky-50'}`}
                    >
                        <FileText size={18} />
                        Download Resume
                    </button>
                    <a href="mailto:surajbangade19@gmail.com" className={`px-6 py-3 border rounded-lg hover:bg-opacity-50 transition-colors ${darkMode ? 'border-slate-600 hover:bg-slate-800' : 'border-slate-300 hover:bg-slate-100'}`}>
                        Contact Me
                    </a>
                </div>

                {/* Terminal Simulation */}
                <div className="mt-16 w-full max-w-3xl bg-slate-950 rounded-lg shadow-2xl overflow-hidden border border-slate-800">
                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 border-b border-slate-800">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="ml-2 font-mono text-xs text-slate-400">suraj@linux:~</span>
                    </div>
                    <div className="p-4 font-mono text-sm md:text-base text-slate-300">
                        <p className="mb-2"><span className="text-green-400">➜</span> <span className="text-blue-400">~</span> neofetch</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="text-slate-400 hidden md:block font-mono whitespace-pre leading-none select-none">
                                {`       .---.
      /     \\
      | O_O |
      |  _  |
      \\     /
       '-'
`}
                            </div>
                            <div>
                                <p><span className="text-sky-400 font-bold">Name:</span> Suraj Bangade</p>
                                <p><span className="text-sky-400 font-bold">Archetype:</span> Creator / Solver</p>
                                <p><span className="text-sky-400 font-bold">Priority:</span> Quality & Optimization</p>
                                <p><span className="text-sky-400 font-bold">Superpower:</span> Research & Adaptation</p>
                                <p><span className="text-sky-400 font-bold">Stack:</span> Agnostic / Adaptive</p>
                                <p><span className="text-sky-400 font-bold">Uptime:</span> Since Jan 2024 @ Amla</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <AchievementsSection darkMode={darkMode} />
            {/* Skills Section */}
            <section id="skills" className={`py-16 ${darkMode ? 'bg-slate-800/50' : 'bg-slate-100'}`}>
                <div className="px-6 md:px-12 max-w-7xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <Wrench className="text-sky-500" /> Tools of the Trade
                    </h2>
                    <p className={`mb-8 max-w-2xl ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        I learn and use whatever is needed to solve the problem efficiently. Here are the tools I am currently leveraging to build and optimize.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {SKILLS.map((group, idx) => (
                            <div key={idx}>
                                <h3 className={`font-mono font-bold mb-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>// {group.title}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {group.skills.map((skill, sIdx) => (
                                        <span key={sIdx} className={`px-3 py-1 rounded-full text-xs font-mono font-medium border ${darkMode ? 'bg-slate-700 text-slate-300 border-slate-600' : 'bg-white text-slate-700 border-slate-200'}`}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Professional Experience (Summary) */}
            <section id="experience" className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold mb-12">Professional Experience</h2>
                <div className={`relative border-l-2 ml-3 md:ml-6 space-y-12 ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
                    <div className="relative pl-8 md:pl-12">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-sky-500 border-4 border-white dark:border-slate-900"></div>
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                            <div>
                                <h3 className="text-xl font-bold">Software Engineer</h3>
                                <span className="text-sky-500 font-medium">Amla Commerce</span>
                            </div>
                            <span className="text-sm font-mono text-slate-500 mt-1 md:mt-0">Jan 2024 - Present</span>
                        </div>

                        <div className="space-y-6">
                            {[
                                {
                                    icon: Brain,
                                    title: "Nelli AI Platform (Leadership)",
                                    desc: "Spearheaded the evolution of Nelli from a personal proof-of-concept to a deployable Kubernetes-based product. Architecting with LangChain, Python, and MS Agent Framework."
                                },
                                {
                                    icon: TrendingUp,
                                    title: "AI & Data Intelligence",
                                    desc: "Designed intelligent systems including Recommendation Engines (Two-Tower), Semantic Search (Vector DBs), and Predictive Analytics (ANN) for purchase prediction."
                                },
                                {
                                    icon: Gauge,
                                    title: "Performance Optimization & Governance",
                                    desc: "Optimized critical paths (DB queries, APIs) improving system responsiveness. Served on Governance Team to enforce code quality and minimize breaking changes."
                                },
                                {
                                    icon: Terminal,
                                    title: "Infrastructure & Automation",
                                    desc: "Created 'Znode CLI' for automated on-prem deployments. Built internal tools automating Jira and Git operations using Python and Bash."
                                }
                            ].map((item, i) => (
                                <div key={i} className={`p-4 rounded-lg border ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-slate-200 shadow-sm'}`}>
                                    <h4 className="font-bold mb-2 flex items-center gap-2">
                                        <item.icon size={18} className="text-sky-500" />
                                        {item.title}
                                    </h4>
                                    <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* THE TIMELINE INTEGRATION */}
            <TimelineSection darkMode={darkMode} />

            {/* Footer */}
            <footer className={`py-12 text-center border-t ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-2xl font-bold mb-6">Ready to build something scalable?</h2>
                    <div className="flex justify-center gap-6 mb-8">
                        <a href="https://www.linkedin.com/in/suraj-bangade" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-600 transition-colors">
                            <Linkedin size={28} />
                        </a>
                        <a href="mailto:surajbangade19@gmail.com" className="text-slate-500 hover:text-red-500 transition-colors">
                            <Mail size={28} />
                        </a>
                    </div>
                    <p className="font-mono text-sm text-slate-400">
                        &copy; 2025 Suraj Bangade. Built with <span className="text-sky-500">Focus</span> & <span className="text-sky-500">Simplicity</span>.
                    </p>
                </div>
            </footer>
            <div className="hidden print:block">
                <PrintableResume customClass="block" />
            </div>
        </div>
    );
}
