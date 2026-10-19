import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Bell,
  BookOpen,
  Bot,
  Boxes,
  BrainCircuit,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  Clock3,
  Code2,
  Command,
  Cpu,
  Database,
  ExternalLink,
  FileCheck2,
  FileCode2,
  FlaskConical,
  Gauge,
  GitBranch,
  Globe2,
  History,
  KeyRound,
  Layers3,
  LockKeyhole,
  Menu,
  MoreHorizontal,
  Network,
  PanelLeft,
  Play,
  Plus,
  RefreshCw,
  Rocket,
  Search,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  TerminalSquare,
  TimerReset,
  ToggleLeft,
  WandSparkles,
  Workflow,
  X,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";

type ViewKey =
  | "Command center"
  | "Projects"
  | "Agents"
  | "Models & providers"
  | "Tools & environments"
  | "Research"
  | "Automations"
  | "Security & audit"
  | "Metrics & release"
  | "Settings";
type Status = "running" | "ready" | "waiting" | "blocked" | "complete";

const nav = [
  { label: "Command center", icon: Activity },
  { label: "Projects", icon: Layers3 },
  { label: "Agents", icon: Network },
  { label: "Models & providers", icon: Cpu },
  { label: "Tools & environments", icon: TerminalSquare },
  { label: "Research", icon: BookOpen },
  { label: "Automations", icon: Workflow },
  { label: "Security & audit", icon: ShieldCheck },
  { label: "Metrics & release", icon: BarChart3 },
];

const statusMeta: Record<Status, { label: string; tone: string; dot: string }> = {
  running: { label: "Running", tone: "text-[#82e5bc]", dot: "status-live" },
  ready: { label: "Ready", tone: "text-[#aeb7ff]", dot: "status-live" },
  waiting: { label: "Waiting", tone: "text-[#e9c282]", dot: "status-warn" },
  blocked: { label: "Blocked", tone: "text-[#ff8992]", dot: "status-danger" },
  complete: { label: "Complete", tone: "text-[#aab1c3]", dot: "status-muted" },
};

const agents = [
  { name: "Orchestrator", role: "Planning & delegation", model: "Claude 3.7 Sonnet", status: "running" as Status, progress: 78, task: "Refining implementation graph", initials: "OR", color: "#7a88ff" },
  { name: "Systems", role: "Architecture review", model: "GPT-5 reasoning", status: "complete" as Status, progress: 100, task: "Contract boundary check", initials: "SY", color: "#75d7ba" },
  { name: "Builder", role: "Frontend implementation", model: "Claude 3.5 Haiku", status: "running" as Status, progress: 64, task: "Composing workspace shell", initials: "BU", color: "#d6a9ff" },
  { name: "Verifier", role: "Tests & evidence", model: "GPT-5 mini", status: "waiting" as Status, progress: 42, task: "Awaiting build artifact", initials: "VE", color: "#efbf76" },
];

const projectSeed = [
  { id: "lumen-042", name: "Lumen workspace", type: "Web app", status: "running" as Status, progress: 72, updated: "2 min ago", branch: "feature/workspace-shell", owner: "You" },
  { id: "atlas-009", name: "Atlas research kit", type: "Research", status: "ready" as Status, progress: 100, updated: "18 min ago", branch: "main", owner: "You" },
  { id: "relay-117", name: "Relay automations", type: "Service", status: "waiting" as Status, progress: 38, updated: "1 hr ago", branch: "recovery/policy-v2", owner: "Team" },
];

const providerSeed = [
  { name: "Anthropic", description: "Primary reasoning and orchestration", models: "3 active models", latency: "1.8s", cost: "$0.42 / run", enabled: true, mark: "A" },
  { name: "OpenAI", description: "Verification and structured outputs", models: "4 active models", latency: "1.2s", cost: "$0.19 / run", enabled: true, mark: "O" },
  { name: "Manus Built-in", description: "Workspace-native model gateway", models: "6 available models", latency: "0.9s", cost: "Included", enabled: true, mark: "M" },
  { name: "Google", description: "Disabled provider connection", models: "0 active models", latency: "—", cost: "—", enabled: false, mark: "G" },
];

const toolSeed = [
  { name: "Local runtime", kind: "Execution", detail: "Node 22 · pnpm 10", status: "ready" as Status, permission: "Workspace write", checked: "Just now" },
  { name: "GitHub connector", kind: "Repository", detail: "aura-x · main", status: "ready" as Status, permission: "Read + PR", checked: "6 min ago" },
  { name: "Browser research", kind: "Knowledge", detail: "Chromium · isolated", status: "ready" as Status, permission: "External read", checked: "11 min ago" },
  { name: "Production deploy", kind: "Delivery", detail: "Not connected", status: "blocked" as Status, permission: "Needs approval", checked: "Never" },
];

const auditSeed = [
  { event: "Provider key reference rotated", actor: "Workspace admin", severity: "Review", time: "Today, 04:39", icon: KeyRound },
  { event: "Build runner permission granted", actor: "You", severity: "Info", time: "Today, 04:21", icon: TerminalSquare },
  { event: "Release check blocked: deploy target", actor: "Verifier", severity: "Blocked", time: "Today, 03:58", icon: CircleAlert },
  { event: "Research source set attached", actor: "Researcher", severity: "Info", time: "Yesterday, 19:12", icon: BookOpen },
];

const formatViewTitle = (view: ViewKey) => {
  if (view === "Command center") return "Command center";
  return view;
};

function StatusPill({ status }: { status: Status }) {
  const meta = statusMeta[status];
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium ${meta.tone}`}>
      <span className={`status-dot ${meta.dot} ${status === "running" ? "pulse" : ""}`} />
      {meta.label}
    </span>
  );
}

function SectionHeading({ eyebrow, title, description, action }: { eyebrow: string; title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <div className="eyebrow mb-2">{eyebrow}</div>
        <h2 className="text-2xl font-semibold tracking-[-0.035em] text-white">{title}</h2>
        {description && <p className="mt-2 max-w-2xl text-sm leading-6 text-[#9299ad]">{description}</p>}
      </div>
      {action}
    </div>
  );
}

function Metric({ label, value, delta, icon: Icon, tone = "cobalt" }: { label: string; value: string; delta: string; icon: typeof Activity; tone?: "cobalt" | "mint" | "amber" | "violet" }) {
  const colors = { cobalt: "#7a88ff", mint: "#76dfb1", amber: "#eabe78", violet: "#d5a8ff" };
  return (
    <div className="panel panel-hover rounded-xl p-4">
      <div className="mb-5 flex items-center justify-between">
        <span className="eyebrow">{label}</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[.035]" style={{ color: colors[tone] }}><Icon size={15} /></span>
      </div>
      <div className="flex items-end justify-between gap-3">
        <div className="text-2xl font-semibold tracking-[-0.04em] text-white">{value}</div>
        <div className="mono text-[10px] text-[#8c94aa]">{delta}</div>
      </div>
    </div>
  );
}

function ProgressBar({ value, tone = "#7886ff" }: { value: number; tone?: string }) {
  return <div className="h-1.5 overflow-hidden rounded-full bg-white/[.07]"><div className="h-full rounded-full transition-all duration-500" style={{ width: `${value}%`, background: tone, boxShadow: `0 0 12px ${tone}66` }} /></div>;
}

function ActivityRow({ icon: Icon, title, detail, time, tone = "#7a88ff" }: { icon: typeof Activity; title: string; detail: string; time: string; tone?: string }) {
  return (
    <div className="flex gap-3 py-3.5">
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md" style={{ color: tone, background: `${tone}16` }}><Icon size={14} /></div>
      <div className="min-w-0 flex-1"><div className="text-sm font-medium text-[#e4e7f1]">{title}</div><div className="mt-1 text-xs text-[#858da2]">{detail}</div></div>
      <div className="mono shrink-0 text-[10px] text-[#6d7488]">{time}</div>
    </div>
  );
}

export default function Home() {
  const [view, setView] = useState<ViewKey>("Command center");
  const [projects, setProjects] = useState(projectSeed);
  const [providers, setProviders] = useState(providerSeed);
  const [automations, setAutomations] = useState([
    { name: "Nightly dependency scan", trigger: "Every day · 02:00 UTC", action: "Research → issue", status: true, last: "Today, 02:00", result: "Passed" },
    { name: "Recover blocked build", trigger: "When a run is blocked", action: "Retry with fallback model", status: true, last: "Yesterday, 18:44", result: "Recovered" },
    { name: "Release candidate digest", trigger: "On release-ready state", action: "Notify workspace", status: false, last: "Never", result: "Not configured" },
  ]);
  const [tools, setTools] = useState(toolSeed);
  const [query, setQuery] = useState("");
  const [composerOpen, setComposerOpen] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [notice, setNotice] = useState("Demo workspace · seeded state");
  const [request, setRequest] = useState("Build an evidence-first workspace for a small product team. Keep the plan, delegated work, and release checks visible.");

  const filteredSources = useMemo(() => {
    const sources = [
      { title: "Evidence-first agent workspaces", source: "Internal knowledge base", confidence: "0.94", type: "Brief", status: "Indexed" },
      { title: "Provider fallback patterns for tool-using agents", source: "Research collection · 12 sources", confidence: "0.88", type: "Synthesis", status: "Ready" },
      { title: "Safe autonomy: permission boundaries", source: "Security review notes", confidence: "0.81", type: "Review", status: "Needs citation" },
    ];
    return query ? sources.filter(item => `${item.title} ${item.source}`.toLowerCase().includes(query.toLowerCase())) : sources;
  }, [query]);

  const navTo = (next: ViewKey) => { setView(next); setMobileNav(false); };
  const createBuild = () => {
    const id = `run-${String(projects.length + 1).padStart(3, "0")}`;
    setProjects(current => [{ id, name: "New workspace build", type: "Web app", status: "running", progress: 8, updated: "Just now", branch: "agent/new-run", owner: "You" }, ...current]);
    setComposerOpen(false);
    setNotice("Run created · Orchestrator is drafting the plan");
    setView("Command center");
  };

  return (
    <div className="min-h-screen bg-[#080a11] text-[#f2f4fb]">
      <div className="flex min-h-screen">
        <aside className={`fixed inset-y-0 left-0 z-40 flex w-[258px] shrink-0 flex-col border-r border-white/[.08] bg-[#0b0d15] transition-transform lg:sticky lg:top-0 lg:translate-x-0 ${mobileNav ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex h-[78px] items-center border-b border-white/[.07] px-5">
            <div className="mr-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#6c7bff] text-[#090b12] shadow-[0_0_26px_rgba(108,123,255,.28)]"><Sparkles size={18} strokeWidth={2.5} /></div>
            <div><div className="text-[15px] font-semibold tracking-[-.02em]">Aura-X</div><div className="mono text-[9px] uppercase tracking-[.12em] text-[#70788d]">Autonomous workspace</div></div>
            <button className="ml-auto rounded-md p-1 text-[#788095] hover:bg-white/[.06] hover:text-white lg:hidden" onClick={() => setMobileNav(false)} aria-label="Close navigation"><X size={16} /></button>
          </div>
          <div className="flex-1 overflow-y-auto px-3 py-5">
            <div className="mb-3 flex items-center justify-between px-3"><span className="eyebrow">Workspace</span><button className="text-[#747c91] hover:text-white" aria-label="Workspace options"><MoreHorizontal size={15} /></button></div>
            <button className="mb-5 flex w-full items-center gap-3 rounded-lg border border-white/[.09] bg-white/[.035] px-3 py-2.5 text-left hover:border-[#6c7bff66]">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#6c7bff1c] text-[#8792ff]"><Boxes size={15} /></span><span className="min-w-0 flex-1"><span className="block truncate text-xs font-medium text-[#e8eaf2]">Lumen workspace</span><span className="mono mt-0.5 block text-[9px] text-[#737b90]">aura-x / main</span></span><ChevronDown size={14} className="text-[#697187]" />
            </button>
            <nav className="space-y-0.5">
              {nav.map(item => { const Icon = item.icon; const active = view === item.label; return <button key={item.label} onClick={() => navTo(item.label as ViewKey)} className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[12px] transition ${active ? "bg-[#6c7bff16] text-[#b9c1ff]" : "text-[#8b92a5] hover:bg-white/[.045] hover:text-[#e4e7f1]"}`}><Icon size={15} className={active ? "text-[#7f8cff]" : "text-[#687086] group-hover:text-[#aeb5c9]"} /><span className="flex-1">{item.label}</span>{item.label === "Agents" && <span className="mono rounded bg-[#6c7bff20] px-1.5 py-0.5 text-[9px] text-[#9da7ff]">4</span>}</button>; })}
            </nav>
            <div className="my-5 border-t border-white/[.07]" />
            <div className="mb-3 px-3"><span className="eyebrow">Workspace health</span></div>
            <div className="space-y-2 px-3">
              {[{ label: "Runtime", value: "Ready", tone: "status-live" }, { label: "Database", value: "Connected", tone: "status-live" }, { label: "Deploy target", value: "Needs setup", tone: "status-warn" }].map(item => <div key={item.label} className="flex items-center justify-between text-[11px]"><span className="text-[#777f93]">{item.label}</span><span className="flex items-center gap-1.5 text-[#aeb6c6]"><span className={`status-dot ${item.tone}`} />{item.value}</span></div>)}
            </div>
          </div>
          <div className="border-t border-white/[.07] p-3">
            <button onClick={() => navTo("Settings")} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs text-[#8b92a5] hover:bg-white/[.045] hover:text-white"><Settings2 size={15} className="text-[#697187]" /> Settings <span className="ml-auto mono text-[9px] text-[#697187]">⌘,</span></button>
            <div className="mt-2 flex items-center gap-2 rounded-lg bg-white/[.025] px-3 py-2.5"><div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#d7b0ff22] text-[10px] font-semibold text-[#d8b6ff]">VB</div><div className="min-w-0 flex-1"><div className="truncate text-[11px] font-medium">Varun B.</div><div className="mono text-[9px] text-[#697187]">Owner · Prototyping</div></div><MoreHorizontal size={14} className="text-[#697187]" /></div>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 flex h-[78px] items-center justify-between border-b border-white/[.07] bg-[#080a11e8] px-5 backdrop-blur-xl lg:px-9">
            <div className="flex items-center gap-3"><button className="rounded-lg p-2 text-[#8a91a5] hover:bg-white/[.06] hover:text-white lg:hidden" onClick={() => setMobileNav(true)} aria-label="Open navigation"><Menu size={18} /></button><div className="mobile-hide flex items-center gap-2 text-xs text-[#6f778c]"><span>Workspace</span><span className="text-[#42495a]">/</span><span className="text-[#c2c7d5]">{formatViewTitle(view)}</span></div><div className="desktop-only ml-3 flex items-center gap-2 rounded-md border border-white/[.08] bg-white/[.025] px-2.5 py-1.5 text-[10px] text-[#8c94a8]"><Command size={12} /> <span className="mono">K</span><span className="text-[#5f6679]">Search anything</span></div></div>
            <div className="flex items-center gap-2"><div className="hidden items-center gap-2 rounded-full bg-[#77dfb01a] px-3 py-1.5 text-[10px] text-[#8fe8bf] sm:flex"><span className="status-dot status-live pulse" /> All systems nominal</div><button className="rounded-lg p-2 text-[#81899d] hover:bg-white/[.06] hover:text-white" aria-label="Notifications"><Bell size={16} /></button><button onClick={() => setComposerOpen(true)} className="btn-primary flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold"><Plus size={14} /> <span className="mobile-hide">New build</span></button></div>
          </header>

          <div className="mx-auto max-w-[1460px] px-5 py-8 lg:px-9 lg:py-10">
            {notice && <div className="mb-5 flex items-center gap-2 text-[11px] text-[#788197]"><span className="signal-line h-3" />{notice}<button onClick={() => setNotice("")} className="ml-auto text-[#636b7e] hover:text-white" aria-label="Dismiss notice"><X size={13} /></button></div>}
            {view === "Command center" && <CommandCenter onStart={() => setComposerOpen(true)} projects={projects} />}
            {view === "Projects" && <Projects projects={projects} onStart={() => setComposerOpen(true)} />}
            {view === "Agents" && <AgentsView />}
            {view === "Models & providers" && <ProvidersView providers={providers} onToggle={name => setProviders(current => current.map(item => item.name === name ? { ...item, enabled: !item.enabled } : item))} />}
            {view === "Tools & environments" && <ToolsView tools={tools} onVerify={name => { setTools(current => current.map(item => item.name === name ? { ...item, status: "ready", checked: "Just now" } : item)); setNotice(`${name} verified · evidence recorded locally`); }} />}
            {view === "Research" && <ResearchView query={query} setQuery={setQuery} sources={filteredSources} />}
            {view === "Automations" && <AutomationsView automations={automations} onToggle={name => setAutomations(current => current.map(item => item.name === name ? { ...item, status: !item.status } : item))} />}
            {view === "Security & audit" && <SecurityView />}
            {view === "Metrics & release" && <MetricsView />}
            {view === "Settings" && <SettingsView />}
          </div>
        </main>
      </div>

      {composerOpen && <BuildComposer request={request} setRequest={setRequest} onClose={() => setComposerOpen(false)} onCreate={createBuild} />}
    </div>
  );
}

function CommandCenter({ onStart, projects }: { onStart: () => void; projects: typeof projectSeed }) {
  const active = projects[0];
  return <div className="page-in">
    <div className="mb-8 flex flex-col justify-between gap-5 xl:flex-row xl:items-end"><div><div className="eyebrow mb-3 flex items-center gap-2"><span className="signal-line h-3" />Active workspace · demo data</div><h1 className="max-w-3xl text-4xl font-semibold leading-[1.02] tracking-[-.055em] text-white sm:text-5xl">Build with intent.<br /><span className="text-[#8793ff]">Ship with evidence.</span></h1><p className="mt-4 max-w-xl text-sm leading-6 text-[#9299ad]">Aura-X keeps autonomous work visible from first request to release decision. Start a run, watch the handoffs, and keep the proof attached.</p></div><div className="flex items-center gap-2"><button onClick={onStart} className="btn-primary flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold"><WandSparkles size={15} /> Start a build</button><button className="btn-ghost flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-medium"><History size={14} /> View history</button></div></div>
    <div className="mb-7 grid grid-cols-2 gap-3 xl:grid-cols-4"><Metric label="Active runs" value="03" delta="+1 this hour" icon={Activity} /><Metric label="Agents online" value="04 / 05" delta="1 waiting" icon={Bot} tone="mint" /><Metric label="Evidence score" value="86%" delta="+8% this week" icon={FileCheck2} tone="violet" /><Metric label="Median cycle" value="18m" delta="−22% vs. last week" icon={Gauge} tone="amber" /></div>
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(330px,.85fr)]">
      <section className="panel rounded-xl"><div className="flex items-center justify-between border-b border-white/[.07] px-5 py-4"><div><div className="eyebrow">Primary workstream</div><div className="mt-1 flex items-center gap-2 text-sm font-semibold text-white"><span className="status-dot status-live pulse" /> {active.name}</div></div><button className="btn-ghost flex items-center gap-2 rounded-md px-2.5 py-1.5 text-[10px]">Open project <ArrowUpRight size={12} /></button></div><div className="p-5"><div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-3"><div><div className="eyebrow">Run ID</div><div className="mono mt-1 text-xs text-[#c6ccdb]">AX-2026-1042</div></div><div><div className="eyebrow">Current phase</div><div className="mt-1 text-xs text-[#c6ccdb]">Implementation</div></div><div><div className="eyebrow">Next handoff</div><div className="mt-1 text-xs text-[#c6ccdb]">Verifier · after build</div></div><div className="ml-auto min-w-[160px]"><div className="mb-1.5 flex justify-between text-[10px]"><span className="text-[#858da2]">Overall progress</span><span className="mono text-[#b4bcff]">{active.progress}%</span></div><ProgressBar value={active.progress} /></div></div><div className="mb-2 flex items-center justify-between"><div className="eyebrow">Execution plan</div><span className="mono text-[10px] text-[#757d91]">4 / 6 checks visible</span></div><div className="grid gap-2 sm:grid-cols-2">{[{ name: "Clarify request", detail: "Intent normalized", status: "complete" as Status }, { name: "Draft implementation graph", detail: "Orchestrator active", status: "running" as Status }, { name: "Build workspace shell", detail: "Builder · 64%", status: "running" as Status }, { name: "Run verification suite", detail: "Waiting for artifact", status: "waiting" as Status }].map((step, i) => <div key={step.name} className="flex items-center gap-3 rounded-lg border border-white/[.07] bg-white/[.02] p-3"><div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] ${step.status === "complete" ? "bg-[#75dfb11b] text-[#80e2b5]" : step.status === "running" ? "bg-[#6c7bff24] text-[#98a2ff]" : "bg-[#eabc781a] text-[#e8c483]"}`}>{step.status === "complete" ? <Check size={13} /> : i + 1}</div><div className="min-w-0 flex-1"><div className="truncate text-xs font-medium text-[#dfe3ed]">{step.name}</div><div className="mt-1 truncate text-[10px] text-[#7c8498]">{step.detail}</div></div><StatusPill status={step.status} /></div>)}</div></div></section>
      <section className="panel rounded-xl"><div className="flex items-center justify-between border-b border-white/[.07] px-5 py-4"><div><div className="eyebrow">Agent mesh</div><div className="mt-1 text-sm font-semibold text-white">Delegated now</div></div><button className="text-[#858da2] hover:text-white" aria-label="Agent mesh options"><MoreHorizontal size={16} /></button></div><div className="divide-y divide-white/[.06] px-5">{agents.map(agent => <div key={agent.name} className="flex gap-3 py-4"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[10px] font-semibold" style={{ background: `${agent.color}1b`, color: agent.color }}>{agent.initials}</div><div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-2"><span className="truncate text-xs font-medium text-[#e3e6ef]">{agent.name}</span><StatusPill status={agent.status} /></div><div className="mt-1 truncate text-[10px] text-[#7d8599]">{agent.task}</div><div className="mt-2 flex items-center gap-2"><div className="flex-1"><ProgressBar value={agent.progress} tone={agent.color} /></div><span className="mono text-[9px] text-[#777f92]">{agent.progress}%</span></div></div></div>)}</div><div className="border-t border-white/[.07] px-5 py-3"><button className="flex items-center gap-2 text-[11px] text-[#99a3ff] hover:text-white">Open agent graph <ArrowUpRight size={12} /></button></div></section>
    </div>
    <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,.65fr)]"><section className="panel rounded-xl"><div className="flex items-center justify-between border-b border-white/[.07] px-5 py-4"><div><div className="eyebrow">Activity stream</div><div className="mt-1 text-sm font-semibold text-white">What changed</div></div><button className="mono text-[10px] text-[#858da2] hover:text-white">View all</button></div><div className="divide-y divide-white/[.06] px-5"><ActivityRow icon={GitBranch} title="Builder created implementation checkpoint" detail="Evidence attached · commit ax-1042-impl" time="2m" /><ActivityRow icon={BrainCircuit} title="Orchestrator revised delegation order" detail="Verifier now waits for runtime artifact" time="5m" tone="#d5a8ff" /><ActivityRow icon={ShieldCheck} title="Permission boundary verified" detail="Workspace write scope · no external publish" time="8m" tone="#75dfb1" /></div></section><section className="panel bar-grid rounded-xl p-5"><div className="eyebrow">Release readiness</div><div className="mt-2 flex items-end justify-between"><div className="text-3xl font-semibold tracking-[-.05em] text-white">72<span className="text-base text-[#777f92]"> / 100</span></div><span className="rounded-full bg-[#eabc7819] px-2 py-1 text-[10px] text-[#e8c483]">In progress</span></div><div className="mt-4"><ProgressBar value={72} tone="#eabe78" /></div><div className="mt-5 space-y-2.5">{[{ label: "Plan is explicit", done: true }, { label: "Runtime evidence", done: true }, { label: "Tests attached", done: false }, { label: "Deploy target", done: false }].map(item => <div key={item.label} className="flex items-center gap-2.5 text-[11px] text-[#aab1c2]"><span className={`flex h-4 w-4 items-center justify-center rounded-full ${item.done ? "bg-[#75dfb11f] text-[#76dfb1]" : "border border-white/[.16] text-[#626a7e]"}`}>{item.done && <Check size={10} />}</span>{item.label}</div>)}</div></section></div>
  </div>;
}

function Projects({ projects, onStart }: { projects: typeof projectSeed; onStart: () => void }) {
  return <div className="page-in"><SectionHeading eyebrow="Workspace inventory" title="Projects" description="Every project carries its current state, branch, owner, and evidence posture." action={<button onClick={onStart} className="btn-primary flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold"><Plus size={14} /> New project</button>} /><div className="grid gap-4 lg:grid-cols-3">{projects.map(project => <div key={project.id} className="panel panel-hover rounded-xl p-5"><div className="flex items-start justify-between"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6c7bff19] text-[#9aa4ff]"><Code2 size={17} /></div><StatusPill status={project.status} /></div><div className="mt-6 text-base font-semibold text-white">{project.name}</div><div className="mt-1 text-xs text-[#81899d]">{project.type} · {project.owner}</div><div className="mt-5 flex items-center justify-between text-[10px]"><span className="text-[#7f879a]">Execution progress</span><span className="mono text-[#b4bcff]">{project.progress}%</span></div><div className="mt-2"><ProgressBar value={project.progress} /></div><div className="mt-5 flex items-center justify-between border-t border-white/[.07] pt-4"><span className="mono truncate text-[10px] text-[#777f91]">{project.branch}</span><span className="text-[10px] text-[#686f83]">{project.updated}</span></div></div>)}</div><div className="mt-6 panel rounded-xl p-5"><div className="flex items-center gap-3"><div className="signal-line h-7" /><div><div className="eyebrow">Project lifecycle</div><div className="mt-1 text-sm font-semibold text-white">State transitions are evidence-backed</div></div></div><p className="mt-4 max-w-2xl text-sm leading-6 text-[#9299ad]">Aura-X does not treat the presence of a response as completion. Projects move from intent to plan, execution, verification, and release only when each stage has an owner and attached evidence.</p></div></div>;
}

function AgentsView() {
  return <div className="page-in"><SectionHeading eyebrow="Planning & delegation" title="Agent mesh" description="Inspect who owns each piece of work, what model is assigned, and where a handoff is waiting." action={<button className="btn-ghost flex items-center gap-2 rounded-lg px-3 py-2 text-xs"><Network size={14} /> Open graph</button>} /><div className="grid gap-4 md:grid-cols-2">{agents.map(agent => <div key={agent.name} className="panel panel-hover rounded-xl p-5"><div className="flex items-start gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl text-xs font-semibold" style={{ background: `${agent.color}1b`, color: agent.color }}>{agent.initials}</div><div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-3"><div><div className="font-semibold text-white">{agent.name}</div><div className="mt-1 text-xs text-[#81899d]">{agent.role}</div></div><StatusPill status={agent.status} /></div></div></div><div className="mt-6 grid grid-cols-2 gap-3"><div className="rounded-lg border border-white/[.07] bg-white/[.02] p-3"><div className="eyebrow">Assigned model</div><div className="mt-2 truncate text-xs text-[#c8cedd]">{agent.model}</div></div><div className="rounded-lg border border-white/[.07] bg-white/[.02] p-3"><div className="eyebrow">Progress</div><div className="mt-2 mono text-xs text-[#c8cedd]">{agent.progress}%</div></div></div><div className="mt-4 text-xs text-[#9ca3b5]">{agent.task}</div><div className="mt-3"><ProgressBar value={agent.progress} tone={agent.color} /></div><div className="mt-4 flex items-center justify-between border-t border-white/[.07] pt-3"><span className="mono text-[10px] text-[#70788c]">handoff: {agent.status === "waiting" ? "blocked on evidence" : "none"}</span><button className="text-[#929dff] hover:text-white" aria-label={`Open ${agent.name}`}><ArrowUpRight size={14} /></button></div></div>)}</div></div>;
}

function ProvidersView({ providers, onToggle }: { providers: typeof providerSeed; onToggle: (name: string) => void }) {
  return <div className="page-in"><SectionHeading eyebrow="Model operations" title="Models & providers" description="Route work across providers without exposing credentials. Values below are seeded workspace metadata." action={<button className="btn-primary flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold"><Plus size={14} /> Add provider</button>} /><div className="mb-5 panel rounded-xl p-5"><div className="flex flex-wrap items-center gap-4"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6c7bff1b] text-[#97a1ff]"><SlidersHorizontal size={18} /></div><div className="min-w-[180px] flex-1"><div className="eyebrow">Active routing policy</div><div className="mt-1 text-sm font-semibold text-white">Evidence-first fallback</div><div className="mt-1 text-xs text-[#858da1]">Reasoning → build → verification, with automatic retry only when policy allows.</div></div><span className="rounded-full bg-[#75dfb118] px-2.5 py-1 text-[10px] text-[#82e5b7]">Policy active</span><button className="btn-ghost rounded-md px-3 py-2 text-[11px]">Edit policy</button></div></div><div className="grid gap-4 md:grid-cols-2">{providers.map(provider => <div key={provider.name} className={`panel panel-hover rounded-xl p-5 ${!provider.enabled ? "opacity-65" : ""}`}><div className="flex items-start justify-between"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[.06] text-sm font-semibold text-[#c8cfff]">{provider.mark}</div><div><div className="font-semibold text-white">{provider.name}</div><div className="mt-1 text-xs text-[#80889c]">{provider.description}</div></div></div><button onClick={() => onToggle(provider.name)} className={`relative h-5 w-9 rounded-full transition ${provider.enabled ? "bg-[#6c7bff]" : "bg-white/[.14]"}`} aria-label={`Toggle ${provider.name}`}><span className={`absolute top-1 h-3 w-3 rounded-full bg-white transition ${provider.enabled ? "left-5" : "left-1"}`} /></button></div><div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/[.07] pt-4"><div><div className="eyebrow">Models</div><div className="mt-1 text-xs text-[#c7ccda]">{provider.models}</div></div><div><div className="eyebrow">Latency</div><div className="mt-1 mono text-xs text-[#c7ccda]">{provider.latency}</div></div><div><div className="eyebrow">Cost</div><div className="mt-1 mono text-xs text-[#c7ccda]">{provider.cost}</div></div></div></div>)}</div></div>;
}

function ToolsView({ tools, onVerify }: { tools: typeof toolSeed; onVerify: (name: string) => void }) {
  return <div className="page-in"><SectionHeading eyebrow="Execution surface" title="Tools & environments" description="The agent can only claim work that the configured runtime and permission boundary can support." action={<button className="btn-ghost flex items-center gap-2 rounded-lg px-3 py-2 text-xs"><Settings2 size={14} /> Manage scopes</button>} /><div className="overflow-hidden rounded-xl border border-white/[.08] bg-[#10131d]"><div className="hidden grid-cols-[1.4fr_1fr_1fr_.8fr_.8fr] gap-4 border-b border-white/[.07] px-5 py-3 md:grid"><span className="eyebrow">Tool</span><span className="eyebrow">Capability</span><span className="eyebrow">Permission</span><span className="eyebrow">Last check</span><span /></div>{tools.map(tool => <div key={tool.name} className="grid gap-3 border-b border-white/[.06] px-5 py-4 last:border-0 md:grid-cols-[1.4fr_1fr_1fr_.8fr_.8fr] md:items-center md:gap-4"><div className="flex items-center gap-3"><div className={`flex h-8 w-8 items-center justify-center rounded-lg ${tool.status === "blocked" ? "bg-[#ff77811a] text-[#ff8992]" : "bg-[#75dfb11a] text-[#7de0b0]"}`}>{tool.status === "blocked" ? <LockKeyhole size={15} /> : <TerminalSquare size={15} />}</div><div><div className="text-xs font-medium text-[#e1e4ed]">{tool.name}</div><div className="mt-1 text-[10px] text-[#7e869a]">{tool.detail}</div></div></div><div className="text-xs text-[#adb4c4]">{tool.kind}</div><div className="text-xs text-[#adb4c4]">{tool.permission}</div><div className="mono text-[10px] text-[#7d8599]">{tool.checked}</div><button onClick={() => onVerify(tool.name)} disabled={tool.status === "blocked"} className="btn-ghost rounded-md px-2.5 py-1.5 text-[10px] disabled:cursor-not-allowed disabled:opacity-40">{tool.status === "blocked" ? "Blocked" : "Verify"}</button></div>)}</div></div>;
}

function ResearchView({ query, setQuery, sources }: { query: string; setQuery: (value: string) => void; sources: { title: string; source: string; confidence: string; type: string; status: string }[] }) {
  return <div className="page-in"><SectionHeading eyebrow="Knowledge loop" title="Research" description="Collect sources, preserve confidence, and attach evidence back to the run that requested it." action={<button className="btn-primary flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold"><Plus size={14} /> New research</button>} /><div className="mb-5 flex max-w-2xl items-center gap-3 rounded-xl border border-white/[.1] bg-[#10131d] px-4 py-3"><Search size={16} className="text-[#727b91]" /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search workspace knowledge…" className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[#626b80]" /><span className="mono text-[9px] text-[#687187]">⌘K</span></div><div className="mb-5 rounded-xl border border-[#6c7bff2b] bg-[#6c7bff0b] p-4"><div className="flex items-start gap-3"><div className="mt-0.5 text-[#8b97ff]"><FlaskConical size={16} /></div><div><div className="text-xs font-semibold text-[#c8ceff]">Research provider not connected</div><p className="mt-1 text-xs leading-5 text-[#8f97b0]">The records below are seeded demo sources. Connect a provider before treating them as external evidence.</p></div><button className="ml-auto shrink-0 text-[10px] text-[#a4adff] hover:text-white">Configure</button></div></div><div className="space-y-3">{sources.map(source => <div key={source.title} className="panel panel-hover flex flex-col gap-4 rounded-xl p-5 sm:flex-row sm:items-center"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#d5a8ff17] text-[#d2a6ff]"><BookOpen size={17} /></div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><div className="text-sm font-semibold text-white">{source.title}</div><span className="rounded bg-white/[.06] px-1.5 py-0.5 text-[9px] text-[#9ba3b8]">{source.type}</span></div><div className="mt-1 text-xs text-[#81899d]">{source.source}</div></div><div className="flex items-center gap-5 sm:ml-auto"><div><div className="eyebrow">Confidence</div><div className="mt-1 mono text-xs text-[#cdd3df]">{source.confidence}</div></div><div><div className="eyebrow">State</div><div className="mt-1 text-xs text-[#83dfb2]">{source.status}</div></div><button className="text-[#7f8cff] hover:text-white" aria-label={`Open ${source.title}`}><ExternalLink size={15} /></button></div></div>)}</div></div>;
}

function AutomationsView({ automations, onToggle }: { automations: { name: string; trigger: string; action: string; status: boolean; last: string; result: string }[]; onToggle: (name: string) => void }) {
  return <div className="page-in"><SectionHeading eyebrow="Automation & recovery" title="Automations" description="Keep recurring work and recovery policy observable. Every automation has a trigger, action, and last known result." action={<button className="btn-primary flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold"><Plus size={14} /> New automation</button>} /><div className="space-y-3">{automations.map(item => <div key={item.name} className="panel panel-hover rounded-xl p-5"><div className="flex flex-col gap-4 lg:flex-row lg:items-center"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eabe7817] text-[#e8c483]"><TimerReset size={18} /></div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><div className="text-sm font-semibold text-white">{item.name}</div><span className={`rounded-full px-2 py-0.5 text-[9px] ${item.status ? "bg-[#75dfb118] text-[#82dfb7]" : "bg-white/[.07] text-[#878fa3]"}`}>{item.status ? "Enabled" : "Disabled"}</span></div><div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-[#858da0]"><span><span className="eyebrow mr-1">Trigger</span>{item.trigger}</span><span><span className="eyebrow mr-1">Action</span>{item.action}</span></div></div><div className="flex items-center gap-5"><div className="text-right"><div className="eyebrow">Last run</div><div className="mt-1 mono text-[10px] text-[#aeb5c4]">{item.last}</div><div className="mt-1 text-[10px] text-[#82dfb2]">{item.result}</div></div><button onClick={() => onToggle(item.name)} className={`relative h-5 w-9 rounded-full transition ${item.status ? "bg-[#6c7bff]" : "bg-white/[.14]"}`} aria-label={`Toggle ${item.name}`}><span className={`absolute top-1 h-3 w-3 rounded-full bg-white transition ${item.status ? "left-5" : "left-1"}`} /></button><button className="text-[#70788c] hover:text-white" aria-label="Automation options"><MoreHorizontal size={16} /></button></div></div></div>)}</div></div>;
}

function SecurityView() {
  const controls = [{ name: "Scoped workspace permissions", detail: "Agents can write only to the active workspace", status: "Enforced", tone: "mint" }, { name: "Provider credentials", detail: "Stored as references; values never enter the client", status: "Enforced", tone: "mint" }, { name: "External publish gate", detail: "Requires an explicit release approval", status: "Needs setup", tone: "amber" }, { name: "Audit retention", detail: "Events retained for 30 days in demo mode", status: "Demo", tone: "violet" }];
  return <div className="page-in"><SectionHeading eyebrow="Trust & controls" title="Security & audit" description="Permissions, privacy boundaries, and audit events are part of the product surface—not hidden implementation details." action={<button className="btn-ghost flex items-center gap-2 rounded-lg px-3 py-2 text-xs"><LockKeyhole size={14} /> Policy settings</button>} /><div className="mb-5 grid gap-4 md:grid-cols-4"><Metric label="Controls passing" value="11 / 12" delta="1 needs action" icon={ShieldCheck} tone="mint" /><Metric label="Audit events" value="248" delta="Last 30 days" icon={History} tone="violet" /><Metric label="Open risks" value="01" delta="Deploy target" icon={CircleAlert} tone="amber" /><Metric label="Trust posture" value="B+" delta="Demo baseline" icon={LockKeyhole} /></div><div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(360px,.9fr)]"><section className="panel rounded-xl p-5"><div className="eyebrow">Control posture</div><div className="mt-4 space-y-2">{controls.map(control => <div key={control.name} className="flex items-center gap-3 rounded-lg border border-white/[.07] bg-white/[.02] p-3"><div className={`flex h-7 w-7 items-center justify-center rounded-md ${control.tone === "mint" ? "bg-[#75dfb119] text-[#7de0b0]" : control.tone === "amber" ? "bg-[#eabe781b] text-[#e8c483]" : "bg-[#d5a8ff1b] text-[#d3a8ff]"}`}>{control.tone === "amber" ? <CircleAlert size={14} /> : <CheckCircle2 size={14} />}</div><div className="min-w-0 flex-1"><div className="text-xs font-medium text-[#dce0e9]">{control.name}</div><div className="mt-1 text-[10px] text-[#81899d]">{control.detail}</div></div><span className={`text-[10px] ${control.tone === "mint" ? "text-[#81dfb2]" : control.tone === "amber" ? "text-[#e8c483]" : "text-[#d0a5ff]"}`}>{control.status}</span></div>)}</div></section><section className="panel rounded-xl p-5"><div className="flex items-center justify-between"><div><div className="eyebrow">Audit stream</div><div className="mt-1 text-sm font-semibold text-white">Recent events</div></div><button className="mono text-[10px] text-[#858da2] hover:text-white">Export</button></div><div className="mt-3 divide-y divide-white/[.06]">{auditSeed.map(item => { const Icon = item.icon; return <div key={item.event} className="flex gap-3 py-3"><div className="mt-0.5 text-[#8a95ff]"><Icon size={14} /></div><div className="min-w-0 flex-1"><div className="text-xs text-[#d6dae5]">{item.event}</div><div className="mt-1 text-[10px] text-[#7f879a]">{item.actor} · {item.time}</div></div><span className={`text-[9px] ${item.severity === "Blocked" ? "text-[#ff8992]" : item.severity === "Review" ? "text-[#e8c483]" : "text-[#81dfb1]"}`}>{item.severity}</span></div>; })}</div></section></div></div>;
}

function MetricsView() {
  const values = [52, 62, 56, 74, 68, 82, 88, 86, 94, 91, 96, 100];
  return <div className="page-in"><SectionHeading eyebrow="Delivery intelligence" title="Metrics & release" description="Measure cycle time, evidence quality, and release gates before an autonomous run is treated as shipped." action={<button className="btn-ghost flex items-center gap-2 rounded-lg px-3 py-2 text-xs"><RefreshCw size={14} /> Refresh metrics</button>} /><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><Metric label="Successful runs" value="84%" delta="+11% this month" icon={Rocket} tone="mint" /><Metric label="Evidence attached" value="91%" delta="+6% this month" icon={FileCheck2} tone="violet" /><Metric label="Avg. handoffs" value="3.4" delta="−0.8 this month" icon={Network} tone="cobalt" /><Metric label="Recovery rate" value="76%" delta="+14% this month" icon={RefreshCw} tone="amber" /></div><div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(330px,.65fr)]"><section className="panel rounded-xl p-5"><div className="flex items-start justify-between"><div><div className="eyebrow">Evidence score trend</div><div className="mt-1 text-sm font-semibold text-white">Last 12 delivery cycles</div></div><div className="mono text-xs text-[#82dfb2]">+18.4%</div></div><div className="mt-8 flex h-[190px] items-end gap-2 border-b border-l border-white/[.08] px-3 pb-0 pt-4">{values.map((value, i) => <div key={i} className="group relative flex h-full flex-1 items-end"><div className="w-full rounded-t-sm bg-gradient-to-t from-[#6c7bff] to-[#9aa4ff] opacity-80 transition-all group-hover:opacity-100" style={{ height: `${value}%` }} /><span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] text-[#777f92] opacity-0 transition group-hover:opacity-100">{value}</span></div>)}</div><div className="mt-3 flex justify-between px-2 mono text-[9px] text-[#646c7f]"><span>12 cycles ago</span><span>Now</span></div></section><section className="panel rounded-xl p-5"><div className="eyebrow">Release candidate</div><div className="mt-2 flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eabe7818] text-[#e8c483]"><Rocket size={18} /></div><div><div className="text-sm font-semibold text-white">RC-07 · Lumen</div><div className="mt-1 text-xs text-[#868ea2]">4 of 6 gates passing</div></div></div><div className="mt-6 space-y-3">{[{ label: "Scope locked", state: "Passed" }, { label: "Build artifact", state: "Passed" }, { label: "Verification suite", state: "In progress" }, { label: "Deploy target", state: "Blocked" }].map(item => <div key={item.label} className="flex items-center justify-between border-b border-white/[.06] pb-2.5 text-xs"><span className="text-[#abb2c3]">{item.label}</span><span className={item.state === "Passed" ? "text-[#80dfb2]" : item.state === "Blocked" ? "text-[#ff8992]" : "text-[#e8c483]"}>{item.state}</span></div>)}</div><button className="btn-ghost mt-5 w-full rounded-md px-3 py-2 text-[11px]">Open release checklist</button></section></div></div>;
}

function SettingsView() {
  const settings = [{ title: "Workspace identity", detail: "Lumen workspace · aura-x / main", icon: Boxes }, { title: "Default routing policy", detail: "Evidence-first fallback", icon: SlidersHorizontal }, { title: "Notifications", detail: "Owner only · in-app", icon: Bell }, { title: "Data retention", detail: "30 days · demo baseline", icon: Database }];
  return <div className="page-in"><SectionHeading eyebrow="Configuration" title="Settings" description="Manage workspace-level defaults. Secret values and external credentials are never displayed here." action={<button className="btn-primary flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold"><Check size={14} /> Save changes</button>} /><div className="grid gap-4 md:grid-cols-2">{settings.map(item => { const Icon = item.icon; return <div key={item.title} className="panel panel-hover rounded-xl p-5"><div className="flex items-start gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6c7bff19] text-[#96a0ff]"><Icon size={16} /></div><div className="flex-1"><div className="text-sm font-semibold text-white">{item.title}</div><div className="mt-1 text-xs text-[#848c9f]">{item.detail}</div></div><button className="text-[#70788c] hover:text-white"><ArrowUpRight size={14} /></button></div></div>; })}</div><div className="mt-5 panel rounded-xl p-5"><div className="eyebrow">Runtime contract</div><div className="mt-3 grid gap-3 sm:grid-cols-3">{[{ label: "Environment", value: "Sandbox / preview" }, { label: "Server", value: "Express + tRPC" }, { label: "Database", value: "Managed MySQL" }].map(item => <div key={item.label} className="rounded-lg border border-white/[.07] bg-white/[.02] p-3"><div className="eyebrow">{item.label}</div><div className="mt-2 text-xs text-[#c6ccda]">{item.value}</div></div>)}</div></div></div>;
}

function BuildComposer({ request, setRequest, onClose, onCreate }: { request: string; setRequest: (value: string) => void; onClose: () => void; onCreate: () => void }) {
  return <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-3 backdrop-blur-sm sm:items-center"><div className="panel w-full max-w-2xl rounded-2xl shadow-2xl"><div className="flex items-center justify-between border-b border-white/[.08] px-5 py-4"><div><div className="eyebrow">New autonomous run</div><div className="mt-1 text-sm font-semibold text-white">Start with intent, keep the chain visible</div></div><button onClick={onClose} className="rounded-md p-1.5 text-[#7b8397] hover:bg-white/[.06] hover:text-white" aria-label="Close build composer"><X size={16} /></button></div><div className="p-5"><label className="eyebrow" htmlFor="build-request">Build request</label><textarea id="build-request" value={request} onChange={event => setRequest(event.target.value)} className="mt-3 h-32 w-full resize-none rounded-xl border border-white/[.1] bg-[#0b0e16] p-4 text-sm leading-6 text-[#e7e9f1] outline-none placeholder:text-[#626a7e] focus:border-[#6c7bff88]" placeholder="Describe the outcome you want Aura-X to build…" /><div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="rounded-lg border border-white/[.07] bg-white/[.02] p-3"><div className="eyebrow">Mode</div><div className="mt-2 flex items-center gap-2 text-xs text-[#cdd2df]"><Sparkles size={13} className="text-[#9ba5ff]" /> Autonomous with review</div></div><div className="rounded-lg border border-white/[.07] bg-white/[.02] p-3"><div className="eyebrow">Workspace</div><div className="mt-2 flex items-center gap-2 text-xs text-[#cdd2df]"><Boxes size={13} className="text-[#9ba5ff]" /> Lumen / main</div></div><div className="rounded-lg border border-white/[.07] bg-white/[.02] p-3"><div className="eyebrow">Permission</div><div className="mt-2 flex items-center gap-2 text-xs text-[#82dfb2]"><ShieldCheck size={13} /> Workspace write</div></div></div></div><div className="flex items-center justify-between border-t border-white/[.08] px-5 py-4"><span className="mono text-[10px] text-[#6f778c]">Plan + evidence will be visible</span><div className="flex gap-2"><button onClick={onClose} className="btn-ghost rounded-lg px-3 py-2 text-xs">Cancel</button><button onClick={onCreate} className="btn-primary flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold"><Play size={13} fill="currentColor" /> Create run</button></div></div></div></div>;
}
