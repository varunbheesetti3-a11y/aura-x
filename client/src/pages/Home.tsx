import {
  ArrowUp,
  AudioLines,
  Bot,
  BrainCircuit,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleStop,
  Command,
  Ellipsis,
  FileCode2,
  Folder,
  GitBranch,
  Globe2,
  Image as ImageIcon,
  KeyRound,
  LayoutDashboard,
  LibraryBig,
  Menu,
  Mic,
  MoreHorizontal,
  Paperclip,
  PanelLeft,
  Play,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  SquareTerminal,
  SlidersHorizontal,
  Terminal,
  WandSparkles,
  Workflow,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

type Mode = "CHAT" | "AGENT WORK" | "AUTO";
type AgentState = "thinking" | "working" | "searching" | "breathing" | "complete";

type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  text: string;
  time: string;
  agent?: string;
  state?: AgentState;
  attachment?: string;
};

const history = [
  { title: "Workspace command center", time: "Now", active: true },
  { title: "Launch verification suite", time: "Today" },
  { title: "Research provider fallback", time: "Yesterday" },
  { title: "Build a release checklist", time: "Yesterday" },
  { title: "Agent permission boundaries", time: "Oct 17" },
];

const workspaceTools = [
  { label: "Command center", icon: LayoutDashboard, detail: "Active runs and evidence" },
  { label: "Projects", icon: Folder, detail: "3 workspaces" },
  { label: "Agent mesh", icon: Bot, detail: "4 agents online" },
  { label: "Models & providers", icon: BrainCircuit, detail: "Evidence-first routing" },
  { label: "Tools & environments", icon: SquareTerminal, detail: "3 ready · 1 blocked" },
  { label: "Research library", icon: LibraryBig, detail: "12 indexed sources" },
  { label: "Automations", icon: Workflow, detail: "2 enabled" },
  { label: "Security & audit", icon: ShieldCheck, detail: "11 / 12 passing" },
  { label: "Metrics & release", icon: Zap, detail: "RC-07 in progress" },
];

const starterPrompts = [
  { label: "Build a workspace", icon: WandSparkles, text: "Build an evidence-first workspace for a small product team." },
  { label: "Run research", icon: Globe2, text: "Research the safest provider fallback pattern for tool-using agents." },
  { label: "Review a release", icon: CheckCircle2, text: "Review the current release candidate and list the missing evidence." },
];

function Orb({ state = "thinking", size = "small" }: { state?: AgentState; size?: "small" | "large" }) {
  return <span className={`thinking-orb thinking-orb-${size} orb-${state}`} aria-label={`Agent ${state}`}><span /><span /><span /><span /><span /><span /><span /><span /></span>;
}

function BotAvatar({ working = false }: { working?: boolean }) {
  return <span className={`bot-avatar ${working ? "bot-working" : ""}`}><span className="bot-eye bot-eye-left" /><span className="bot-eye bot-eye-right" /><span className="bot-mouth" /></span>;
}

function Beam({ children, active = false, className = "" }: { children: ReactNode; active?: boolean; className?: string }) {
  return <div className={`border-beam ${active ? "border-beam-active" : ""} ${className}`}>{children}</div>;
}

function ModeSelect({ mode, setMode }: { mode: Mode; setMode: (mode: Mode) => void }) {
  return <div className="mode-select"><span className="mode-spark"><Sparkles size={12} /></span><select value={mode} onChange={event => setMode(event.target.value as Mode)} aria-label="Operating mode"><option>CHAT</option><option>AGENT WORK</option><option>AUTO</option></select><ChevronDown size={12} /></div>;
}

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(() => typeof window === "undefined" || window.innerWidth > 850);
  const [mode, setMode] = useState<Mode>(() => (localStorage.getItem("aurax-mode") as Mode) || "AUTO");
  const [prompt, setPrompt] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [activeTool, setActiveTool] = useState("Command center");
  const [thinking, setThinking] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [notice, setNotice] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, role: "user", text: "Help me turn Aura-X into a workspace where autonomous work stays visible from request to release.", time: "10:31 AM", attachment: "Aura_X_Complete_Documentation_Volumes_1-16.pdf" },
    { id: 2, role: "assistant", text: "I’ve mapped the workspace into a visible chain: request → plan → delegated agents → tools → evidence → release. The active build is ready for the next handoff.", time: "10:31 AM", agent: "Orchestrator", state: "complete" },
    { id: 3, role: "assistant", text: "What would you like Aura-X to work on next?", time: "10:31 AM", agent: "Aura-X", state: "complete" },
  ]);

  useEffect(() => { localStorage.setItem("aurax-mode", mode); }, [mode]);

  const assistantReply = useMemo(() => {
    if (mode === "CHAT") return "I’ll keep this in conversation mode and return a structured answer with the relevant evidence attached.";
    if (mode === "AGENT WORK") return "I’ll turn this into a tracked run, delegate the work, and keep each handoff visible in the workspace.";
    return "I’ll classify the request, choose the safest execution path, and stop at any permission or evidence boundary that needs you.";
  }, [mode]);

  const sendMessage = () => {
    const clean = prompt.trim();
    if (!clean || thinking) return;
    const nextId = messages.length + 1;
    setMessages(current => [...current, { id: nextId, role: "user", text: clean, time: "Now" }]);
    setPrompt("");
    setThinking(true);
    window.setTimeout(() => {
      setMessages(current => [...current, { id: nextId + 1, role: "assistant", text: assistantReply, time: "Now", agent: mode === "CHAT" ? "Aura-X" : "Orchestrator", state: "complete" }]);
      setThinking(false);
    }, 900);
  };

  const usePrompt = (text: string) => { setPrompt(text); document.getElementById("chat-input")?.focus(); };
  const toggleVoice = () => { setVoiceActive(current => !current); setNotice(voiceActive ? "Voice input paused" : "Listening · speak your request"); };
  const selectTool = (label: string) => { setActiveTool(label); setWorkspaceOpen(false); setNotice(`${label} opened · chat context preserved`); };

  return <div className="chat-shell">
    <aside className={`chat-sidebar ${sidebarOpen ? "chat-sidebar-open" : "chat-sidebar-closed"}`}>
      <div className="sidebar-top"><button className="brand-mark" aria-label="Aura-X home" onClick={() => setActiveTool("Command center")}><Sparkles size={17} /></button>{sidebarOpen && <div className="brand-copy"><strong>Aura-X</strong><span>Autonomous workspace</span></div>}<button className="icon-button sidebar-collapse" onClick={() => setSidebarOpen(current => !current)} aria-label="Toggle sidebar"><PanelLeft size={16} /></button></div>
      {sidebarOpen && <>
        <button onClick={() => { setMessages([]); setNotice("New conversation ready"); }} className="new-chat-button"><Plus size={15} /> <span>New conversation</span><span className="shortcut">⌘ K</span></button>
        <div className="sidebar-label">Recent chats</div>
        <div className="chat-history">{history.map(item => <button key={item.title} onClick={() => setNotice(`${item.title} loaded`)} className={`history-item ${item.active ? "history-item-active" : ""}`}><span className="history-glyph">{item.active ? <Sparkles size={13} /> : <MessageGlyph />}</span><span className="history-text">{item.title}</span><span className="history-time">{item.time}</span></button>)}</div>
        <div className="sidebar-label sidebar-label-workspace">Workspace</div>
        <button onClick={() => setWorkspaceOpen(true)} className="workspace-switcher"><span className="workspace-avatar"><Bot size={14} /></span><span><strong>Lumen workspace</strong><small>aura-x / main</small></span><ChevronDown size={14} /></button>
        <div className="sidebar-footer"><button className="sidebar-footer-button" onClick={() => setSettingsOpen(true)}><Settings2 size={15} /> Settings</button><button className="sidebar-footer-button" onClick={() => setNotice("Aura-X owner workspace · demo state")}><MoreHorizontal size={15} /> Account</button><div className="profile-row"><span className="profile-avatar">VB</span><span><strong>Varun B.</strong><small>Owner · Prototyping</small></span><span className="status-dot status-live" /></div></div>
      </>}
    </aside>

    <main className="chat-main">
      <header className="chat-header"><div className="header-left"><button className="icon-button mobile-sidebar-button" onClick={() => setSidebarOpen(current => !current)} aria-label="Open sidebar"><Menu size={17} /></button><div className="header-context"><span className="header-context-dot" /><span>{activeTool}</span><span className="header-slash">/</span><span className="header-muted">Lumen workspace</span></div></div><div className="header-actions"><div className="secure-pill"><span className="status-dot status-live" /> Runtime ready</div><button className="icon-button" onClick={() => setNotice("No new notifications")} aria-label="Notifications"><AudioLines size={16} /></button><button className="icon-button" onClick={() => setSettingsOpen(true)} aria-label="Open settings"><SlidersHorizontal size={16} /></button></div></header>

      <div className="chat-scroll"><div className="chat-column">
        <div className="welcome-block"><div className="welcome-orb"><Orb state={thinking ? "thinking" : "breathing"} size="large" /></div><div className="welcome-eyebrow">{mode === "AUTO" ? "Auto mode · evidence-first" : `${mode} mode`}</div><h1>What are we building<br /><span>together today?</span></h1><p>Aura-X keeps autonomous work visible from first prompt to final proof.</p></div>
        {messages.length === 0 ? <div className="starter-grid">{starterPrompts.map(item => { const Icon = item.icon; return <button key={item.label} onClick={() => usePrompt(item.text)} className="starter-card"><span className="starter-icon"><Icon size={16} /></span><span><strong>{item.label}</strong><small>{item.text}</small></span><ArrowUp size={14} /></button>; })}</div> : <div className="message-list">{messages.map(message => <Message key={message.id} message={message} onUsePrompt={usePrompt} />)}{thinking && <div className="assistant-row"><div className="assistant-avatar"><BotAvatar working /></div><div className="message-body"><div className="message-meta"><strong>Orchestrator</strong><span>is working</span><Orb state="working" size="small" /></div><div className="thinking-card"><Orb state="searching" size="small" /><div><strong>Thinking through the request…</strong><span>Checking workspace context and safe next actions</span></div><span className="thinking-dots">•••</span></div></div></div>}</div>}
        <div className="composer-spacer" />
      </div></div>

      <div className={`composer-wrap ${voiceActive ? "composer-voice-active" : ""}`}><div className="voice-glow" /><Beam active={Boolean(prompt) || voiceActive} className="composer-beam"><div className="chat-composer"><div className="composer-toolbar"><button className="composer-tool" onClick={() => setNotice("Attach a workspace file") } aria-label="Attach file"><Paperclip size={17} /></button><button className="composer-tool" onClick={() => setImageLoading(current => !current)} aria-label="Generate image"><ImageIcon size={17} /></button><button className="composer-tool" onClick={() => setWorkspaceOpen(true)} aria-label="Open tools"><Terminal size={17} /></button><span className="composer-hint">{notice || (voiceActive ? "Listening…" : "Ask Aura-X anything")}</span><ModeSelect mode={mode} setMode={setMode} /></div><textarea id="chat-input" value={prompt} onChange={event => setPrompt(event.target.value)} onKeyDown={event => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); sendMessage(); } }} placeholder="Message Aura-X…" rows={1} /><div className="composer-footer"><div className="composer-context"><span className="context-chip"><GitBranch size={12} /> aura-x / main</span><span className="context-chip"><ShieldCheck size={12} /> scoped write</span></div><div className="composer-actions"><button className={`mic-button ${voiceActive ? "mic-button-active" : ""}`} onClick={toggleVoice} aria-label="Voice input"><Mic size={16} /></button><button className="metal-send" onClick={thinking ? () => setThinking(false) : sendMessage} aria-label={thinking ? "Stop response" : "Send message"}>{thinking ? <CircleStop size={17} /> : <ArrowUp size={17} />}</button></div></div></div></Beam><div className="composer-disclaimer">Aura-X can make mistakes. Verify important decisions. <button onClick={() => setNotice("Evidence mode keeps source and state visible")} >Learn about evidence mode</button></div></div>
    </main>

    {imageLoading && <div className="image-loader"><div className="image-mosaic" /><div><div className="eyebrow">Image engine</div><strong>Preparing visual workspace</strong><span>Pixel mosaic loader · demo state</span></div><button onClick={() => setImageLoading(false)} aria-label="Close image loader"><X size={15} /></button></div>}
    {workspaceOpen && <WorkspaceDrawer activeTool={activeTool} selectTool={selectTool} onClose={() => setWorkspaceOpen(false)} />}
    {settingsOpen && <SettingsPanel onClose={() => setSettingsOpen(false)} onNotice={setNotice} />}
  </div>;
}

function Message({ message, onUsePrompt }: { message: ChatMessage; onUsePrompt: (text: string) => void }) {
  if (message.role === "user") return <div className="user-row"><div className="user-bubble"><p>{message.text}</p>{message.attachment && <div className="attachment-chip"><FileCode2 size={14} /><span>{message.attachment}</span><Check size={12} /></div>}</div><span className="message-time">{message.time}</span></div>;
  return <div className="assistant-row"><div className="assistant-avatar"><BotAvatar /></div><div className="message-body"><div className="message-meta"><strong>{message.agent || "Aura-X"}</strong><span>{message.state === "complete" ? "completed" : "responded"}</span><span className="message-time">{message.time}</span></div><div className="assistant-copy">{message.text}</div>{message.id === 3 && <div className="quick-actions"><button onClick={() => onUsePrompt("Show me the current agent handoffs and blocked evidence.")}><GitBranch size={13} /> Show agent handoffs</button><button onClick={() => onUsePrompt("Review the current release readiness.")}><CheckCircle2 size={13} /> Review release</button></div>}</div></div>;
}

function WorkspaceDrawer({ activeTool, selectTool, onClose }: { activeTool: string; selectTool: (label: string) => void; onClose: () => void }) {
  return <div className="drawer-backdrop" onClick={onClose}><aside className="workspace-drawer" onClick={event => event.stopPropagation()}><div className="drawer-header"><div><div className="eyebrow">Workspace surfaces</div><strong>Keep the control room close</strong></div><button className="icon-button" onClick={onClose} aria-label="Close workspace panel"><X size={16} /></button></div><div className="drawer-project"><span className="workspace-avatar"><Bot size={15} /></span><span><strong>Lumen workspace</strong><small>Demo state · managed runtime</small></span><span className="status-dot status-live" /></div><div className="drawer-list">{workspaceTools.map(item => { const Icon = item.icon; return <button key={item.label} onClick={() => selectTool(item.label)} className={`drawer-item ${activeTool === item.label ? "drawer-item-active" : ""}`}><span className="drawer-item-icon"><Icon size={15} /></span><span><strong>{item.label}</strong><small>{item.detail}</small></span><ArrowUp size={13} /></button>; })}</div><div className="drawer-footer"><div className="eyebrow">Runtime signal</div><div className="runtime-signal"><Orb state="breathing" size="small" /><span><strong>All systems nominal</strong><small>3 tools ready · 1 approval needed</small></span></div></div></aside></div>;
}

function SettingsPanel({ onClose, onNotice }: { onClose: () => void; onNotice: (message: string) => void }) {
  const tabs = [
    { label: "General", icon: SlidersHorizontal, detail: "Theme, mode, stream" },
    { label: "Providers", icon: KeyRound, detail: "11 provider slots" },
    { label: "Voice & audio", icon: Mic, detail: "Persona and speed" },
    { label: "Memory", icon: LibraryBig, detail: "Persistent facts" },
    { label: "Projects", icon: Folder, detail: "Repos and workspaces" },
    { label: "Security", icon: ShieldCheck, detail: "Encryption and privacy" },
    { label: "Shortcuts", icon: Command, detail: "Keyboard controls" },
  ];
  const [tab, setTab] = useState("General");
  return <div className="drawer-backdrop settings-backdrop" onClick={onClose}><section className="settings-panel" onClick={event => event.stopPropagation()}><header className="settings-header"><div><div className="eyebrow">Aura-X configuration</div><h2>Settings</h2></div><button className="icon-button" onClick={onClose} aria-label="Close settings"><X size={17} /></button></header><div className="settings-layout"><nav className="settings-tabs">{tabs.map(item => { const Icon = item.icon; return <button key={item.label} onClick={() => setTab(item.label)} className={tab === item.label ? "settings-tab-active" : ""}><Icon size={15} /><span><strong>{item.label}</strong><small>{item.detail}</small></span></button>; })}</nav><div className="settings-content"><div className="eyebrow">tab-{tab.toLowerCase().replaceAll(" ", "-")}</div><h3>{tab}</h3>{tab === "General" && <><p>Keep the new chat interface as the default while preserving the operating modes and workspace context.</p><SettingToggle label="Stream responses" detail="Show thinking and token state while Aura-X works" enabled /><SettingToggle label="Evidence-first mode" detail="Keep source, state, and next action visible" enabled /><SettingToggle label="Sound feedback" detail="Tactile UI response on send and completion" enabled={false} /></>}{tab === "Providers" && <><p>Provider credentials are represented by safe status references. Values never enter the client surface.</p><ProviderStatus name="Manus Built-in" status="Connected" /><ProviderStatus name="Anthropic" status="Connected" /><ProviderStatus name="OpenAI" status="Connected" /><ProviderStatus name="Google Gemini" status="Not connected" /></>}{tab === "Voice & audio" && <><p>Voice glow is active in the composer while recording. Choose a persona for future speech synthesis.</p><SettingToggle label="Message arrival chime" detail="Play a completion tone" enabled /><SettingToggle label="Desktop push alerts" detail="Notify on scheduled task completion" enabled={false} /></>}{tab === "Memory" && <><p>Persistent facts recalled across sessions stay visible and removable.</p><div className="memory-row"><span className="status-dot status-live" /><span><strong>Workspace preference</strong><small>Evidence before explanation</small></span><button onClick={() => onNotice("Memory export prepared")}><ArrowUp size={13} /></button></div><button className="settings-action" onClick={() => onNotice("Memory manager opened")}>Manage memory ledger</button></>}{tab === "Projects" && <><p>Switch workspace context without leaving the conversation surface.</p><div className="project-setting"><span className="workspace-avatar"><Bot size={14} /></span><span><strong>Lumen workspace</strong><small>aura-x / main · 3 active runs</small></span><Check size={14} className="text-[#7de0b0]" /></div><button className="settings-action" onClick={() => onNotice("Project manager opened")}>Open project manager</button></>}{tab === "Security" && <><p>Cloud keys, local mode, and external publish controls remain behind explicit boundaries.</p><SettingToggle label="Local model shield" detail="Block outbound cloud calls while local mode is engaged" enabled={false} /><SettingToggle label="Encrypt local vault" detail="AES-GCM for stored credential references" enabled /></>}{tab === "Shortcuts" && <><p>Quick controls for the new interface.</p><div className="shortcut-list"><span><kbd>Alt + S</kbd> Switch interface</span><span><kbd>Ctrl + K</kbd> Focus chat input</span><span><kbd>Ctrl + Shift + ,</kbd> Open settings</span><span><kbd>Ctrl + Shift + S</kbd> Toggle sidebar</span></div></>}{tab !== "General" && tab !== "Providers" && tab !== "Voice & audio" && tab !== "Memory" && tab !== "Projects" && tab !== "Security" && tab !== "Shortcuts" && <p>Configuration surface ready.</p>}</div></div><footer className="settings-footer"><span className="mono">localStorage · synced</span><button className="btn-primary settings-save" onClick={() => { onNotice(`${tab} settings saved`); onClose(); }}><Check size={14} /> Save changes</button></footer></section></div>;
}

function SettingToggle({ label, detail, enabled }: { label: string; detail: string; enabled: boolean }) {
  const [active, setActive] = useState(enabled);
  return <div className="setting-toggle-row"><span><strong>{label}</strong><small>{detail}</small></span><button onClick={() => setActive(current => !current)} className={`toggle-switch ${active ? "toggle-switch-on" : ""}`} aria-label={`Toggle ${label}`}><span /></button></div>;
}

function ProviderStatus({ name, status }: { name: string; status: string }) { return <div className="provider-status"><span className="provider-letter">{name[0]}</span><span><strong>{name}</strong><small>Model routing slot</small></span><span className={status === "Connected" ? "provider-connected" : "provider-disconnected"}>{status}</span></div>; }
function MessageGlyph() { return <span className="message-glyph" />; }
