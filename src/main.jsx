import React, { useEffect, useState, useRef, useCallback } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowRight, Bot, Box, ChevronDown, CloudCog, Code2, Coins, GitBranch,
  Gauge, Layers3, Menu, Moon, Network, ShieldCheck, Sparkles, Sun,
  TerminalSquare, X, Zap, ClipboardList, Hammer, Rocket, Activity, TrendingUp
} from 'lucide-react'
import './styles.css'

const capabilities = [
  { icon: GitBranch, tag: 'TRANSFORM', title: 'Repo & Pipeline Migrator', text: 'Move repositories and delivery workflows without disruption.', detail: 'Automated discovery, dependency mapping, fidelity checks and policy-aware migration across Git and CI/CD ecosystems.', stat: '70%', statText: 'faster migrations' },
  { icon: Code2, tag: 'ACCELERATE', title: 'PR Review Agent', text: 'Ship safer code with intelligent, contextual reviews.', detail: 'AI reviews every change for quality, security and standards while learning the context of your engineering organization.', stat: '4×', statText: 'review velocity' },
  { icon: Bot, tag: 'AUTOMATE', title: 'Agentic DevOps', text: 'Deploy autonomous agents across the delivery lifecycle.', detail: 'Goal-oriented agents plan and execute multi-step operations with human approvals, evidence trails and enterprise controls.', stat: '42%', statText: 'less toil' },
  { icon: Box, tag: 'BUILD', title: 'EnvGen / Terraform IaC', text: 'Generate governed environments on demand.', detail: 'Turn architecture intent into reusable Terraform, validate it against policy and provision consistent environments anywhere.', stat: '10×', statText: 'faster setup' },
  { icon: Coins, tag: 'OPTIMIZE', title: 'FinOps', text: 'Make every cloud dollar visible and accountable.', detail: 'Allocate spend, detect anomalies and surface rightsizing actions with business context teams can act on immediately.', stat: '28%', statText: 'cloud savings' },
  { icon: Gauge, tag: 'RELIABILITY', title: 'SRE IntelliOps', text: 'Unify logs, signals and intelligent operations.', detail: 'Aggregate telemetry, correlate incidents and accelerate root-cause analysis with an AI-assisted operational command center.', stat: '61%', statText: 'lower MTTR' },
  { icon: Layers3, tag: 'INSIGHT', title: 'DevOpstics Dashboard', text: 'See delivery health from commit to customer.', detail: 'Executive and engineering views bring DORA, risk, cost, reliability and flow metrics into a shared source of truth.', stat: '100%', statText: 'delivery clarity' }
]

const lifecycle = [
  { n: '01', title: 'PLAN', desc: 'Align work to outcomes', icon: ClipboardList, color: '#a78bfa' },
  { n: '02', title: 'CODE', desc: 'Review smarter', icon: Code2, color: '#818cf8' },
  { n: '03', title: 'BUILD', desc: 'Automate safely', icon: Hammer, color: '#6366f1' },
  { n: '04', title: 'DEPLOY', desc: 'Release reliably', icon: Rocket, color: '#805dff' },
  { n: '05', title: 'OPERATE', desc: 'Resolve faster', icon: Activity, color: '#7c3aed' },
  { n: '06', title: 'OPTIMIZE', desc: 'Improve always', icon: TrendingUp, color: '#6d28d9' }
]

/* ─── Intersection Observer Hook ─── */
function useStaggerReveal(threshold = 0.15) {
  const containerRef = useRef(null)
  const [visibleMap, setVisibleMap] = useState({})

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const children = Array.from(el.querySelectorAll('[data-reveal]'))
    if (!children.length) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = entry.target.dataset.reveal
            setVisibleMap((prev) => ({ ...prev, [idx]: true }))
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    )
    children.forEach((c) => obs.observe(c))
    return () => obs.disconnect()
  }, [threshold])

  return { containerRef, visibleMap }
}

function Logo() {
  return <a href="#top" className="flex items-center gap-2.5 font-display text-lg font-extrabold tracking-tight">
    <span className="grid h-8 w-8 place-items-center rounded-lg bg-violet text-white logo-glow"><Network size={18} /></span>
    <span>DevOps<span className="text-violet">IQ</span></span>
  </a>
}

function Header({ dark, setDark }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${scrolled ? 'border-black/8 bg-white/85 shadow-lg shadow-black/[.03] backdrop-blur-2xl dark:border-white/10 dark:bg-ink/85' : 'border-transparent bg-transparent backdrop-blur-none'}`}>
    <div className="container flex h-18 items-center justify-between">
      <Logo />
      <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300 md:flex">
        {['platform', 'capabilities', 'outcomes', 'architecture'].map(x => (
          <a key={x} href={`#${x}`} className="nav-link capitalize">{x === 'capabilities' ? 'Solutions' : x}</a>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <button className="icon-btn" onClick={() => setDark(!dark)} aria-label="Toggle theme">{dark ? <Sun size={17} /> : <Moon size={17} />}</button>
        <a href="#contact" className="btn-primary hidden sm:inline-flex">Book a demo <ArrowRight size={15} /></a>
        <button className="icon-btn md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
      </div>
    </div>
    {open && <nav className="container flex flex-col gap-4 border-t border-black/5 py-5 text-sm font-semibold dark:border-white/10 md:hidden">
      {['platform', 'capabilities', 'outcomes', 'architecture'].map(x => <a key={x} href={`#${x}`} onClick={() => setOpen(false)} className="capitalize">{x}</a>)}
    </nav>}
  </header>
}

function Eyebrow({ children }) { return <div className="eyebrow"><Sparkles size={13} />{children}</div> }
function SectionTitle({ eyebrow, title, body, center = false }) {
  return <div className={`mb-12 max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
    <div className={center ? 'flex justify-center' : ''}><Eyebrow>{eyebrow}</Eyebrow></div>
    <h2 className="section-title">{title}</h2><p className="section-copy">{body}</p>
  </div>
}

function HeroVisual() {
  const nodes = [
    {
      label: 'Migrate',
      icon: GitBranch,
      pos: 'top-[3%] left-[35%]',
      color: '#a78bfa',
      x: 42,
      y: 8,
      status: 'PR #418 scanned. 0 vulnerabilities found.',
      cmd: 'devopsiq scan --pr=418',
      log: 'Git topology scan... SUCCESS'
    },
    {
      label: 'Automate',
      icon: Bot,
      pos: 'top-[29%] right-0',
      color: '#818cf8',
      x: 82,
      y: 34,
      status: 'Regression tests passed. Coverage: 94.2%.',
      cmd: 'devopsiq pipeline run test-suite',
      log: 'CI/CD runner #12: Success'
    },
    {
      label: 'Optimize',
      icon: Coins,
      pos: 'bottom-[13%] right-[7%]',
      color: '#f472b6',
      x: 78,
      y: 82,
      status: 'Estimated savings: $1,420/mo.',
      cmd: 'devopsiq cost optimize --env=prod',
      log: 'Terminated 3 idle AWS nodes'
    },
    {
      label: 'Observe',
      icon: Gauge,
      pos: 'bottom-[5%] left-[20%]',
      color: '#38bdf8',
      x: 28,
      y: 90,
      status: 'Latency stable: 42ms. CPU: 18%.',
      cmd: 'devopsiq monitor health --gke',
      log: 'System latency optimized: 42ms'
    },
    {
      label: 'Provision',
      icon: Box,
      pos: 'top-[37%] left-0',
      color: '#a6dc32',
      x: 12,
      y: 42,
      status: 'Terraform run complete. 12 pods scaled.',
      cmd: 'devopsiq tf apply -auto-approve',
      log: 'GKE replica nodes configured'
    }
  ]

  const [hoveredIdx, setHoveredIdx] = useState(null)
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    if (hoveredIdx !== null) return
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % nodes.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [hoveredIdx])

  const currentIdx = hoveredIdx !== null ? hoveredIdx : activeIdx
  const currentNode = nodes[currentIdx]

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[530px] animate-float select-none">
      {/* Background glowing rings */}
      <div className="absolute inset-[8%] rounded-full border border-violet/25 bg-violet/5 shadow-glow animate-pulse-slow pointer-events-none" />
      <div className="absolute inset-[19%] rounded-full border border-dashed border-violet/40 animate-spin-slow pointer-events-none" />

      {/* SVG Connecting Flow Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0" viewBox="0 0 100 100">
        {nodes.map((node, idx) => {
          const isCurrent = idx === currentIdx
          return (
            <g key={node.label}>
              {/* Outer glow line */}
              <line
                x1={node.x}
                y1={node.y}
                x2="50"
                y2="50"
                stroke={node.color}
                strokeWidth={isCurrent ? "3" : "1.5"}
                opacity={isCurrent ? "0.3" : "0.1"}
                className="transition-all duration-300"
              />
              {/* Core thin line */}
              <line
                x1={node.x}
                y1={node.y}
                x2="50"
                y2="50"
                stroke={node.color}
                strokeWidth="1"
                opacity={isCurrent ? "0.8" : "0.3"}
                className="transition-all duration-300"
              />
              {/* Animated running particle along the path */}
              <line
                x1={node.x}
                y1={node.y}
                x2="50"
                y2="50"
                stroke={node.color}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="6 40"
                opacity={isCurrent ? "0.9" : "0.5"}
                className="dash-flow"
                style={{
                  animationDuration: isCurrent ? '1.5s' : '3s'
                }}
              />
            </g>
          )
        })}
      </svg>

      {/* Center Circle: DevOpsIQ Core & Interactive Status Feed */}
      <div className="absolute inset-[26%] flex flex-col justify-between rounded-[2rem] bg-ink/95 p-5 text-left text-white shadow-2xl ring-1 ring-white/15 dark:bg-white dark:text-ink hero-core-glow z-10 transition-all duration-300">
        <div className="flex items-center gap-2 border-b border-white/10 pb-2 dark:border-slate-200">
          <div className="grid h-7 w-7 place-items-center rounded-lg bg-violet/20 text-violet">
            <Network className="animate-pulse-slow" size={16} />
          </div>
          <div>
            <h3 className="font-display text-sm font-bold tracking-tight">DevOpsIQ Core</h3>
            <p className="text-[8px] uppercase tracking-wider text-white/50 dark:text-slate-500 font-semibold">Intelligence Fabric</p>
          </div>
        </div>

        {/* Console view */}
        <div className="flex-1 my-2 flex flex-col justify-center font-mono text-[9.5px] leading-relaxed">
          <div className="text-white/40 dark:text-slate-400 truncate">$ {currentNode.cmd}</div>
          <div className="text-acid mt-0.5 truncate font-semibold">&gt; {currentNode.log}</div>
          <div className="text-violet dark:text-[#6d28d9] mt-0.5 truncate">{currentNode.status}</div>
        </div>

        {/* Live System telemetry bar */}
        <div className="flex items-center justify-between text-[8px] font-bold tracking-wider pt-2 border-t border-white/10 dark:border-slate-200">
          <span className="text-white/40 dark:text-slate-400">AGENT LIVE FEED</span>
          <span className="flex items-center gap-1 text-acid live-pulse">
            <span className="h-1.5 w-1.5 rounded-full bg-acid animate-ping" /> LIVE
          </span>
        </div>
      </div>

      {/* Floating Decorative Glassmorphic Panels */}
      {/* Top Left: Cluster Status Panel */}
      <div className="absolute -left-12 top-[12%] w-44 p-3 rounded-xl border border-white/10 bg-slate-950/80 text-white font-mono text-[9px] shadow-2xl backdrop-blur-md hidden md:block select-none pointer-events-none">
        <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-1.5 text-white/40">
          <span>GKE_SYS_MONITOR</span>
          <span className="h-1.5 w-1.5 rounded-full bg-acid animate-pulse" />
        </div>
        <div className="space-y-0.5 text-white/80">
          <div>Cluster: gke-prod-us</div>
          <div>Pods: 142/142 running</div>
          <div className="text-acid">Ingress: 3,421 req/s</div>
          <div className="flex gap-1 mt-1 text-[8px] text-white/40">
            <span>CPU: 42%</span>
            <span>MEM: 61%</span>
          </div>
        </div>
      </div>

      {/* Bottom Right: DORA Metrics Widget */}
      <div className="absolute -right-8 bottom-[18%] w-44 p-3 rounded-xl border border-white/10 bg-slate-950/80 text-white font-mono text-[9px] shadow-2xl backdrop-blur-md hidden md:block select-none pointer-events-none">
        <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-1.5 text-white/40">
          <span>DORA_ANALYTICS</span>
          <span className="text-violet font-semibold">ELITE</span>
        </div>
        <div className="space-y-0.5 text-white/80">
          <div>Deploy Freq: 24.2 / day</div>
          <div>MTTR: 12.8 mins</div>
          <div>Change Failure: &lt; 0.5%</div>
          <div className="text-acid mt-1 font-bold">SLO Achievement: 99.98%</div>
        </div>
      </div>

      {/* Visual Nodes mapping */}
      {nodes.map((node, idx) => {
        const Icon = node.icon
        const isCurrent = idx === currentIdx
        return (
          <div
            key={node.label}
            className={`absolute ${node.pos} z-20 flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-bold shadow-xl transition-all duration-300 cursor-pointer ${isCurrent
                ? 'scale-110 border-violet bg-white text-violet dark:bg-[#1f1a3a] dark:text-white'
                : 'border-black/10 bg-white text-slate-700 dark:border-white/10 dark:bg-[#191925] dark:text-slate-300 hover:scale-105'
              }`}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            style={{
              boxShadow: isCurrent
                ? `0 10px 25px -5px ${node.color}35, 0 0 12px 1px ${node.color}25`
                : ''
            }}
          >
            <Icon size={15} style={{ color: node.color }} />
            <span>{node.label}</span>
          </div>
        )
      })}
    </div>
  )
}

/* ─── Capability Card with Floating Overlay ─── */
function CapabilityCard({ item, index, expandedIdx, setExpandedIdx, revealStyle }) {
  const Icon = item.icon
  const isExpanded = expandedIdx === index
  const cardRef = useRef(null)

  const toggleExpand = useCallback((e) => {
    e.stopPropagation()
    setExpandedIdx(isExpanded ? null : index)
  }, [isExpanded, index, setExpandedIdx])

  // Close on click outside
  useEffect(() => {
    if (!isExpanded) return
    const handleClickOutside = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setExpandedIdx(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isExpanded, setExpandedIdx])

  return (
    <article
      ref={cardRef}
      data-reveal={index}
      className={`cap-card group ${isExpanded ? 'cap-card--expanded' : ''}`}
      style={revealStyle}
    >
      <div className="flex items-start justify-between">
        <div className="cap-icon group-hover:cap-icon-glow"><Icon size={22} /></div>
        <span className="cap-tag">{item.tag}</span>
      </div>
      <h3 className="mt-6 font-display text-xl font-bold">{item.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{item.text}</p>

      <div className="mt-6 flex items-end justify-between border-t border-black/5 pt-5 dark:border-white/10">
        <div>
          <b className="font-display text-2xl text-violet cap-stat">{item.stat}</b>
          <span className="ml-2 text-xs text-slate-500">{item.statText}</span>
        </div>
        <button onClick={toggleExpand} className="explore-btn">
          {isExpanded ? 'Less' : 'Explore'} <ChevronDown size={14} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Floating overlay detail panel — does NOT affect sibling card layout */}
      <div className={`cap-detail-overlay ${isExpanded ? 'cap-detail-overlay--visible' : ''}`}>
        <div className="cap-detail-content">
          <div className="flex items-center gap-3 mb-3">
            <div className="cap-icon shrink-0"><Icon size={18} /></div>
            <h4 className="font-display font-bold text-sm">{item.title}</h4>
          </div>
          <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{item.detail}</p>
          <div className="mt-4 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-violet/10 px-3 py-1 text-xs font-bold text-violet">
              <Zap size={12} /> {item.stat} {item.statText}
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}

/* ─── Lifecycle Stage Card (DevOps Pipeline) ─── */
function LifecycleCard({ stage, i, revealStyle }) {
  const Icon = stage.icon
  return (
    <div className="pipeline-card group" data-reveal={i} style={revealStyle}>
      {/* Animated top border accent */}
      <div className="pipeline-card-accent" style={{ background: `linear-gradient(90deg, ${stage.color}40, ${stage.color}, ${stage.color}40)` }} />

      {/* Stage number badge with icon */}
      <div className="pipeline-badge" style={{ background: stage.color, boxShadow: `0 0 20px ${stage.color}40` }}>
        <Icon size={16} strokeWidth={2.5} />
      </div>

      {/* Step number */}
      <span className="pipeline-step-num">{stage.n}</span>

      <h3 className="mt-2 font-display text-sm font-bold group-hover:text-violet transition-colors duration-300">{stage.title}</h3>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{stage.desc}</p>

      {/* Status indicator */}
      <div className="pipeline-status">
        <span className="pipeline-status-dot" style={{ background: stage.color }} />
        <span className="text-[9px] font-bold tracking-wider" style={{ color: stage.color }}>ACTIVE</span>
      </div>

      {/* Connector arrow */}
      {i < 5 && (
        <div className="pipeline-connector">
          <div className="pipeline-connector-line" />
          <div className="pipeline-connector-pulse" style={{ background: stage.color }} />
          <ArrowRight size={14} className="pipeline-connector-arrow" style={{ color: stage.color }} />
        </div>
      )}
    </div>
  )
}

/* ─── Architecture Section with Animations ─── */
function ArchitectureSection() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const toolchain = ['Git', 'CI/CD', 'Cloud', 'ITSM', 'Telemetry']
  const actions = ['Migrate', 'Review', 'Provision', 'Resolve', 'Optimize']
  const pills = ['CONTEXT GRAPH', 'AGENT RUNTIME', 'POLICY ENGINE']

  return (
    <section id="architecture" className="section-space" ref={sectionRef}>
      <div className="container">
        <SectionTitle
          eyebrow="CONNECTED BY DESIGN"
          title="One intelligence layer. Every system."
          body="A secure platform fabric turns signals from your toolchain into context, decisions and governed action."
          center
        />
        <div className="arch-flow">
          {/* Left: Toolchain */}
          <div
            className="arch-group arch-group--animated"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'all 0.7s cubic-bezier(.22,1,.36,1) 0.1s'
            }}
          >
            <span>YOUR TOOLCHAIN</span>
            <div>
              {toolchain.map((x, i) => (
                <b
                  key={x}
                  className="arch-tag"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.9)',
                    transition: `all 0.5s cubic-bezier(.22,1,.36,1) ${0.3 + i * 0.08}s`
                  }}
                >
                  {x}
                </b>
              ))}
            </div>
          </div>

          {/* Left connector with flowing particles */}
          <div
            className="arch-connector"
            style={{
              opacity: inView ? 1 : 0,
              transition: 'opacity 0.5s ease 0.5s'
            }}
          >
            <div className="arch-connector-line" />
            <div className="arch-particle arch-particle-1" />
            <div className="arch-particle arch-particle-2" />
            <div className="arch-particle arch-particle-3" />
            <ArrowRight size={18} className="arch-connector-arrow" />
          </div>

          {/* Center: Intelligence Fabric */}
          <div
            className="arch-fabric"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'scale(1)' : 'scale(0.85)',
              transition: 'all 0.8s cubic-bezier(.22,1,.36,1) 0.4s'
            }}
          >
            <div className="arch-fabric-ring" />
            <div className="arch-fabric-ring arch-fabric-ring--outer" />
            <div className="relative z-10">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-violet text-white arch-fabric-icon">
                <Network />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold">DevOpsIQ Intelligence Fabric</h3>
              <div className="mt-4 flex flex-wrap justify-center gap-2 text-[10px] font-bold">
                {pills.map((p, i) => (
                  <span
                    key={p}
                    className="pill arch-pill"
                    style={{
                      opacity: inView ? 1 : 0,
                      transform: inView ? 'translateY(0)' : 'translateY(10px)',
                      transition: `all 0.5s cubic-bezier(.22,1,.36,1) ${0.7 + i * 0.1}s`
                    }}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right connector with flowing particles */}
          <div
            className="arch-connector"
            style={{
              opacity: inView ? 1 : 0,
              transition: 'opacity 0.5s ease 0.7s'
            }}
          >
            <div className="arch-connector-line" />
            <div className="arch-particle arch-particle-1" />
            <div className="arch-particle arch-particle-2" />
            <div className="arch-particle arch-particle-3" />
            <ArrowRight size={18} className="arch-connector-arrow" />
          </div>

          {/* Right: Actions */}
          <div
            className="arch-group arch-group--animated"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(40px)',
              transition: 'all 0.7s cubic-bezier(.22,1,.36,1) 0.6s'
            }}
          >
            <span>INTELLIGENT ACTION</span>
            <div>
              {actions.map((x, i) => (
                <b
                  key={x}
                  className="arch-tag"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.9)',
                    transition: `all 0.5s cubic-bezier(.22,1,.36,1) ${0.8 + i * 0.08}s`
                  }}
                >
                  {x}
                </b>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function App() {
  const [dark, setDark] = useState(true)
  const [expandedIdx, setExpandedIdx] = useState(null)

  // Lifecycle section stagger reveal
  const { containerRef: lifecycleRef, visibleMap: lifecycleVisible } = useStaggerReveal(0.12)
  // Capabilities section stagger reveal
  const { containerRef: capRef, visibleMap: capVisible } = useStaggerReveal(0.1)

  useEffect(() => { document.documentElement.classList.toggle('dark', dark) }, [dark])

  return <div id="top" className="min-h-screen overflow-hidden bg-[#f7f7fa] text-ink transition-colors dark:bg-ink dark:text-white">
    <Header dark={dark} setDark={setDark} />
    <main>
      {/* ─── Hero ─── */}
      <section className="relative pb-20 pt-36 lg:pb-28 lg:pt-44">
        <div className="hero-grid" /><div className="orb right-[5%] top-16 bg-violet" /><div className="orb -left-40 top-80 bg-acid" />
        <div className="container relative grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <div><Eyebrow>The intelligent DevOps control plane</Eyebrow>
            <h1 className="mt-7 max-w-3xl font-display text-5xl font-extrabold leading-[.98] tracking-[-.055em] sm:text-6xl lg:text-7xl">One platform.<br /><span className="gradient-text">Every DevOps motion.</span></h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">Unify migration, code intelligence, infrastructure, operations and cloud economics in a single agentic experience built for enterprise scale.</p>
            <div className="mt-9 flex flex-wrap gap-3"><a href="#contact" className="btn-primary">Explore the platform <ArrowRight size={17} /></a><a href="#architecture" className="btn-secondary"><TerminalSquare size={17} /> See how it works</a></div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-xs font-semibold text-slate-500 dark:text-slate-400">{['Enterprise secure', 'Cloud agnostic', 'Human governed'].map(x => <span key={x} className="flex items-center gap-2"><ShieldCheck size={15} className="text-violet" />{x}</span>)}</div>
          </div><HeroVisual />
        </div>
      </section>

      {/* ─── Stats banner ─── */}
      <section className="border-y border-black/5 bg-white/60 py-7 dark:border-white/10 dark:bg-white/[.025]">
        <div className="container grid grid-cols-2 gap-6 text-center sm:grid-cols-4">{[['7', 'Integrated solutions'], ['42%', 'Less operational toil'], ['61%', 'Faster resolution'], ['24/7', 'Intelligent operations']].map(([n, t]) => <div key={t}><b className="font-display text-2xl text-violet sm:text-3xl">{n}</b><p className="mt-1 text-xs text-slate-500">{t}</p></div>)}</div>
      </section>

      {/* ─── Lifecycle / Platform — DevOps Pipeline ─── */}
      <section id="platform" className="section-space">
        <div className="container">
          <SectionTitle eyebrow="ONE CONTINUOUS SYSTEM" title="From first commit to lasting impact" body="DevOpsIQ connects every stage with shared context, intelligent automation and measurable feedback." />
          <div ref={lifecycleRef} className="pipeline-grid">
            {/* Flowing pipeline beam */}
            <div className="pipeline-beam" />

            {lifecycle.map((stage, i) => (
              <LifecycleCard
                key={stage.title}
                stage={stage}
                i={i}
                revealStyle={{
                  opacity: lifecycleVisible[i] ? 1 : 0,
                  transform: lifecycleVisible[i] ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.92)',
                  transition: `opacity 0.6s cubic-bezier(.22,1,.36,1) ${i * 0.12}s, transform 0.6s cubic-bezier(.22,1,.36,1) ${i * 0.12}s`,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Capabilities ─── */}
      <section id="capabilities" className="section-space bg-white dark:bg-white/[.02]"><div className="container"><SectionTitle eyebrow="PLATFORM CAPABILITIES" title="Seven powers. One operating model." body="Replace fragmented tools and handoffs with an integrated intelligence layer for the entire software delivery organization." />
        <div ref={capRef} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((x, i) => (
            <CapabilityCard
              key={x.title}
              item={x}
              index={i}
              expandedIdx={expandedIdx}
              setExpandedIdx={setExpandedIdx}
              revealStyle={{
                opacity: capVisible[i] ? 1 : 0,
                transform: capVisible[i] ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.96)',
                transition: `opacity 0.6s cubic-bezier(.22,1,.36,1) ${i * 0.08}s, transform 0.6s cubic-bezier(.22,1,.36,1) ${i * 0.08}s`,
              }}
              data-reveal={i}
            />
          ))}
        </div>
      </div></section>

      {/* ─── Enterprise section ─── */}
      <section className="section-space"><div className="container grid gap-12 lg:grid-cols-2 lg:items-center">
        <div><SectionTitle eyebrow="BUILT FOR THE REAL WORLD" title="Intelligence that fits your enterprise" body="DevOpsIQ meets teams where they are, connects the stack they already use and makes every action traceable." />
          <div className="space-y-4">{[
            [CloudCog, 'Connect every cloud and tool', 'A flexible integration fabric across source, CI/CD, cloud, ITSM and observability.'],
            [ShieldCheck, 'Govern without slowing down', 'Policy, approvals and audit evidence embedded directly into automated workflows.'],
            [Bot, 'Keep humans in command', 'Transparent agent plans, confidence signals and precise control over every action.']
          ].map(([Icon, t, d]) => <div key={t} className="enterprise-feature-card"><div className="cap-icon shrink-0"><Icon size={20} /></div><div><h3 className="font-display font-bold">{t}</h3><p className="mt-1 text-sm leading-6 text-slate-500">{d}</p></div></div>)}</div>
        </div>
        <div className="relative rounded-[2rem] border border-black/5 bg-[#101019] p-5 shadow-2xl dark:border-white/10 terminal-glow">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 text-white"><div className="flex gap-2"><i className="h-2.5 w-2.5 rounded-full bg-red-400" /><i className="h-2.5 w-2.5 rounded-full bg-amber-300" /><i className="h-2.5 w-2.5 rounded-full bg-green-400" /></div><span className="text-[10px] font-bold tracking-widest text-white/40">INTELLIOPS / LIVE</span></div>
          <div className="mt-5 grid grid-cols-3 gap-3">{[['Deployments', '1,284', '+18%'], ['Change risk', 'Low', '−24%'], ['Availability', '99.99%', 'Healthy']].map(([a, b, c]) => <div key={a} className="terminal-stat-card"><span className="text-[10px] text-white/40">{a}</span><b className="mt-2 block text-lg text-white">{b}</b><small className="text-acid">{c}</small></div>)}</div>
          <div className="mt-3 rounded-xl bg-white/[.06] p-5"><div className="flex items-center justify-between text-xs text-white/50"><span>Delivery performance</span><span>Last 12 weeks</span></div><div className="mt-7 flex h-36 items-end gap-2">{[28, 46, 39, 55, 47, 67, 61, 75, 68, 82, 76, 94].map((h, i) => <div key={i} className="chart-bar" style={{ height: `${h}%`, animationDelay: `${i * 0.06}s` }} />)}</div></div>
        </div>
      </div></section>

      {/* ─── Outcomes ─── */}
      <section id="outcomes" className="outcomes-section section-space relative overflow-hidden">
        {/* Animated background elements */}
        <div className="outcomes-bg-gradient" />
        <div className="outcomes-grid-pattern" />
        <div className="outcomes-orb outcomes-orb-1" />
        <div className="outcomes-orb outcomes-orb-2" />

        <div className="container relative z-10">
          <SectionTitle
            eyebrow="BUSINESS OUTCOMES"
            title="Turn DevOps into business momentum"
            body="Move beyond tool activity. Give every team a direct line from engineering action to customer and financial impact."
            center
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['4×', 'Faster delivery', 'Automate the path from idea to production.', '🚀'],
              ['61%', 'Lower MTTR', 'Find root causes before they become outages.', '⚡'],
              ['28%', 'Cloud savings', 'Connect engineering decisions to spend.', '💰'],
              ['100%', 'Audit coverage', 'Generate evidence as work happens.', '🛡️']
            ].map(([n, t, d, emoji], i) => (
              <div key={t} className="outcome-card group" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="outcome-card-shine" />
                <div className="relative z-10">
                  <div className="outcome-emoji">{emoji}</div>
                  <b className="outcome-stat">{n}</b>
                  <h3 className="mt-3 text-base font-bold text-white/90">{t}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/50">{d}</p>
                </div>
                <div className="outcome-card-border" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Architecture ─── */}
      <ArchitectureSection />

      {/* ─── CTA ─── */}
      <section id="contact" className="pb-8"><div className="container"><div className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-16 text-center text-white dark:bg-white dark:text-ink sm:px-12"><div className="absolute inset-0 opacity-20 hero-grid" /><div className="relative"><Eyebrow>YOUR NEXT DEVOPS ERA</Eyebrow><h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Ready to make your entire lifecycle intelligent?</h2><p className="mx-auto mt-5 max-w-xl text-sm leading-7 opacity-65">See how DevOpsIQ can unify your tools, teams and delivery intelligence in one enterprise platform.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><a href="mailto:hello@devopsiq.ai" className="btn-primary">Book your platform tour <ArrowRight size={17} /></a><a href="#capabilities" className="btn-secondary !border-white/20 !text-current dark:!border-black/15">Explore solutions</a></div></div></div></div></section>
    </main>
    <footer className="py-10"><div className="container flex flex-col gap-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between"><Logo /><p>© 2026 DevOpsIQ. Intelligent delivery, unified.</p><div className="flex gap-5"><a href="#">Privacy</a><a href="#">Security</a><a href="#">Contact</a></div></div></footer>
  </div>
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)
