import { useState, useCallback, useRef, useMemo } from "react";
import Sidebar from "./Sidebar";
import { Tab, Workspace, Bookmark, BookmarkFolder, FrecencyResult } from "./types";
import "./demo.css";

const WS_COLORS = ["#6366f1", "#f43f5e", "#22c55e", "#f59e0b", "#06b6d4", "#a855f7", "#ec4899", "#14b8a6"];

const favicon = (domain: string) =>
  `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;

// --- pre-populated demo data ---
let _id = 0;
const id = (prefix = "tab") => `${prefix}-${++_id}`;

const INIT_WORKSPACES: Workspace[] = [
  { id: "ws-1", name: "Research",    color: "#6366f1", activeTabId: "tab-2" },
  { id: "ws-2", name: "Development", color: "#22c55e", activeTabId: "tab-5" },
  { id: "ws-3", name: "Personal",    color: "#f59e0b", activeTabId: "tab-8" },
];

const INIT_TABS: Tab[] = [
  { id: "tab-1", url: "https://github.com",                              title: "GitHub",                            loading: false, favicon: favicon("github.com"),        pinned: true,  blockedCount: 24, workspaceId: "ws-1" },
  { id: "tab-2", url: "https://stackoverflow.com/questions/rust-webview", title: "Stack Overflow \u2014 Rust WebView2 bindings", loading: false, favicon: favicon("stackoverflow.com"), pinned: false, blockedCount: 8,  workspaceId: "ws-1" },
  { id: "tab-3", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout", title: "MDN Web Docs \u2014 CSS Grid Layout",    loading: false, favicon: favicon("developer.mozilla.org"), pinned: false, blockedCount: 3,  workspaceId: "ws-1" },
  { id: "tab-4", url: "https://en.wikipedia.org/wiki/Bushido",           title: "Wikipedia \u2014 Bushido",                     loading: false, favicon: favicon("en.wikipedia.org"),  pinned: false, blockedCount: 5,  workspaceId: "ws-1" },
  { id: "tab-5", url: "http://localhost:1420",                            title: "Bushido Dev",                       loading: false, favicon: favicon("localhost"),          pinned: false, blockedCount: 0,  workspaceId: "ws-2" },
  { id: "tab-6", url: "https://docs.rs/tauri",                           title: "docs.rs \u2014 Tauri",                         loading: false, favicon: favicon("docs.rs"),           pinned: false, blockedCount: 2,  workspaceId: "ws-2" },
  { id: "tab-7", url: "https://crates.io/crates/wry",                    title: "crates.io \u2014 wry",                         loading: false, favicon: favicon("crates.io"),         pinned: false, blockedCount: 1,  workspaceId: "ws-2" },
  { id: "tab-8", url: "https://www.youtube.com",                         title: "YouTube",                           loading: false, favicon: favicon("youtube.com"),       pinned: false, blockedCount: 42, workspaceId: "ws-3" },
  { id: "tab-9", url: "https://www.reddit.com/r/rust",                   title: "Reddit \u2014 r/rust",                         loading: false, favicon: favicon("reddit.com"),        pinned: false, blockedCount: 18, workspaceId: "ws-3" },
];

_id = 9;

let wsCounter = 3;
const genWsId = () => `ws-${++wsCounter}`;

// demo bookmarks
const DEMO_BOOKMARKS: Bookmark[] = [
  { id: "bm-1", url: "https://github.com", title: "GitHub", favicon: favicon("github.com"), folderId: "", createdAt: Date.now() },
  { id: "bm-2", url: "https://docs.rs", title: "docs.rs", favicon: favicon("docs.rs"), folderId: "", createdAt: Date.now() },
];

const EMPTY_FOLDERS: BookmarkFolder[] = [];
const EMPTY_SUGGESTIONS: FrecencyResult[] = [];
const EMPTY_TOPSITES: FrecencyResult[] = [];

export default function BrowserDemo() {
  const [tabs, setTabs] = useState<Tab[]>(INIT_TABS);
  const [workspaces, setWorkspaces] = useState<Workspace[]>(INIT_WORKSPACES);
  const [activeWorkspaceId, setActiveWorkspaceId] = useState("ws-1");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(DEMO_BOOKMARKS);
  const urlBarRef = useRef<HTMLInputElement>(null);

  // derived
  const activeWs = useMemo(() => workspaces.find(w => w.id === activeWorkspaceId), [workspaces, activeWorkspaceId]);
  const activeTab = activeWs?.activeTabId || "";
  const currentWsTabs = useMemo(() => tabs.filter(t => t.workspaceId === activeWorkspaceId), [tabs, activeWorkspaceId]);
  const pinnedTabs = useMemo(() => currentWsTabs.filter(t => t.pinned), [currentWsTabs]);
  const regularTabs = useMemo(() => currentWsTabs.filter(t => !t.pinned), [currentWsTabs]);
  const current = useMemo(() => tabs.find(t => t.id === activeTab), [tabs, activeTab]);

  // --- workspace operations ---
  const switchWorkspace = useCallback((wsId: string) => {
    setActiveWorkspaceId(wsId);
  }, []);

  const addWorkspace = useCallback(() => {
    const wsId = genWsId();
    const tabId = id();
    const colorIdx = workspaces.length % WS_COLORS.length;
    const ws: Workspace = { id: wsId, name: `Space ${workspaces.length + 1}`, color: WS_COLORS[colorIdx], activeTabId: tabId };
    const tab: Tab = { id: tabId, url: "https://www.google.com", title: "New Tab", loading: false, workspaceId: wsId };
    setWorkspaces(prev => [...prev, ws]);
    setTabs(prev => [...prev, tab]);
    setActiveWorkspaceId(wsId);
  }, [workspaces.length]);

  const deleteWorkspace = useCallback((wsId: string) => {
    if (workspaces.length <= 1) return;
    setTabs(prev => prev.filter(t => t.workspaceId !== wsId));
    setWorkspaces(prev => {
      const next = prev.filter(w => w.id !== wsId);
      if (activeWorkspaceId === wsId && next.length > 0) {
        setActiveWorkspaceId(next[0].id);
      }
      return next;
    });
  }, [workspaces.length, activeWorkspaceId]);

  const renameWorkspace = useCallback((wsId: string, name: string) => {
    setWorkspaces(prev => prev.map(w => w.id === wsId ? { ...w, name } : w));
  }, []);

  const recolorWorkspace = useCallback((wsId: string, color: string) => {
    setWorkspaces(prev => prev.map(w => w.id === wsId ? { ...w, color } : w));
  }, []);

  const moveTabToWorkspace = useCallback((tabId: string, targetWsId: string) => {
    setTabs(prev => {
      const tab = prev.find(t => t.id === tabId);
      if (!tab) return prev;
      const sourceWsId = tab.workspaceId;
      const next = prev.map(t => t.id === tabId ? { ...t, workspaceId: targetWsId, parentId: undefined } : t);

      setWorkspaces(wsList => wsList.map(w => {
        if (w.id === sourceWsId && w.activeTabId === tabId) {
          const remaining = next.filter(t => t.workspaceId === sourceWsId);
          return { ...w, activeTabId: remaining.length > 0 ? remaining[0].id : "" };
        }
        if (w.id === targetWsId) {
          return { ...w, activeTabId: tabId };
        }
        return w;
      }));

      return next;
    });
  }, []);

  // --- tab operations ---
  const addTab = useCallback(() => {
    const tabId = id();
    const tab: Tab = { id: tabId, url: "https://www.google.com", title: "New Tab", loading: false, workspaceId: activeWorkspaceId };
    setTabs(prev => [...prev, tab]);
    setWorkspaces(prev => prev.map(w => w.id === activeWorkspaceId ? { ...w, activeTabId: tabId } : w));
  }, [activeWorkspaceId]);

  const closeTab = useCallback((tabId: string) => {
    setTabs(prev => {
      const tab = prev.find(t => t.id === tabId);
      if (!tab) return prev;
      const wsId = tab.workspaceId;
      const wsTabs = prev.filter(t => t.workspaceId === wsId);
      const next = prev.filter(t => t.id !== tabId).map(t =>
        t.parentId === tabId ? { ...t, parentId: tab.parentId } : t
      );

      if (wsTabs.length <= 1) {
        const newId = id();
        const newTab: Tab = { id: newId, url: "https://www.google.com", title: "New Tab", loading: false, workspaceId: wsId };
        setWorkspaces(ws => ws.map(w => w.id === wsId ? { ...w, activeTabId: newId } : w));
        return [...next, newTab];
      }

      setWorkspaces(ws => ws.map(w => {
        if (w.id === wsId && w.activeTabId === tabId) {
          const wsTabsInNext = next.filter(t => t.workspaceId === wsId);
          const oldIdx = wsTabs.findIndex(t => t.id === tabId);
          const newActive = wsTabsInNext[Math.min(oldIdx, wsTabsInNext.length - 1)];
          return { ...w, activeTabId: newActive?.id || "" };
        }
        return w;
      }));

      return next;
    });
  }, []);

  const selectTab = useCallback((tabId: string) => {
    setWorkspaces(prev => prev.map(w => w.id === activeWorkspaceId ? { ...w, activeTabId: tabId } : w));
  }, [activeWorkspaceId]);

  const pinTab = useCallback((tabId: string) => {
    setTabs(prev => prev.map(t => t.id === tabId ? { ...t, pinned: !t.pinned } : t));
  }, []);

  const toggleCollapse = useCallback((tabId: string) => {
    setTabs(prev => prev.map(t => t.id === tabId ? { ...t, collapsed: !t.collapsed } : t));
  }, []);

  const reorderTabs = useCallback((from: number, to: number) => {
    setTabs(prev => {
      const wsTabs = prev.filter(t => t.workspaceId === activeWorkspaceId && !t.pinned);
      const otherTabs = prev.filter(t => t.workspaceId !== activeWorkspaceId || t.pinned);
      const item = wsTabs[from];
      if (!item) return prev;
      wsTabs.splice(from, 1);
      wsTabs.splice(to, 0, item);
      const wsPinned = prev.filter(t => t.workspaceId === activeWorkspaceId && t.pinned);
      return [...wsPinned, ...wsTabs, ...otherTabs.filter(t => t.workspaceId !== activeWorkspaceId)];
    });
  }, [activeWorkspaceId]);

  const addChildTab = useCallback((parentId: string) => {
    const tabId = id();
    const tab: Tab = { id: tabId, url: "https://www.google.com", title: "New Tab", loading: false, workspaceId: activeWorkspaceId, parentId };
    setTabs(prev => [...prev, tab]);
    setWorkspaces(prev => prev.map(w => w.id === activeWorkspaceId ? { ...w, activeTabId: tabId } : w));
  }, [activeWorkspaceId]);

  // bookmark operations
  const isBookmarked = current ? bookmarks.some(b => b.url === current.url) : false;

  const toggleBookmark = useCallback(() => {
    if (!current) return;
    const existing = bookmarks.find(b => b.url === current.url);
    if (existing) {
      setBookmarks(prev => prev.filter(b => b.id !== existing.id));
    } else {
      setBookmarks(prev => [...prev, { id: `bm-${Date.now()}`, url: current.url, title: current.title, favicon: current.favicon, folderId: "", createdAt: Date.now() }]);
    }
  }, [current, bookmarks]);

  const removeBookmark = useCallback((bmId: string) => {
    setBookmarks(prev => prev.filter(b => b.id !== bmId));
  }, []);

  // no-ops
  const noop = useCallback(() => {}, []);
  const navigate = useCallback((_url: string) => {}, []);
  const noopInput = useCallback((_q: string) => {}, []);

  const toggleSidebar = useCallback(() => setSidebarOpen(p => !p), []);

  return (
    <div className="demo">
      <div className="browser">
        <div className="browser-body">
          <Sidebar
            tabs={regularTabs}
            pinnedTabs={pinnedTabs}
            activeTab={activeTab}
            open={sidebarOpen}
            compact={false}
            onSelect={selectTab}
            onClose={closeTab}
            onPin={pinTab}
            onNew={addTab}
            onReorder={reorderTabs}
            onToggle={toggleSidebar}
            workspaces={workspaces}
            activeWorkspaceId={activeWorkspaceId}
            onSwitchWorkspace={switchWorkspace}
            onAddWorkspace={addWorkspace}
            onDeleteWorkspace={deleteWorkspace}
            onRenameWorkspace={renameWorkspace}
            onRecolorWorkspace={recolorWorkspace}
            onToggleCollapse={toggleCollapse}
            onAddChildTab={addChildTab}
            onMoveTabToWorkspace={moveTabToWorkspace}
            bookmarks={bookmarks}
            bookmarkFolders={EMPTY_FOLDERS}
            onSelectBookmark={noop}
            onRemoveBookmark={removeBookmark}
            onToggleHistory={noop}
            onBack={noop}
            onForward={noop}
            onReload={noop}
            url={current?.url || ""}
            onNavigate={navigate}
            loading={current?.loading || false}
            inputRef={urlBarRef}
            blockedCount={current?.blockedCount || 0}
            whitelisted={current?.whitelisted || false}
            onToggleWhitelist={noop}
            suggestions={EMPTY_SUGGESTIONS}
            topSites={EMPTY_TOPSITES}
            onSuggestionSelect={noop}
            onInputChange={noopInput}
            isBookmarked={isBookmarked}
            onToggleBookmark={toggleBookmark}
          />
          <div className={`sidebar-spacer ${sidebarOpen ? "" : "collapsed"}`} />
          <div className="main">
            <div className="webview-placeholder">
              <img className="webview-placeholder-logo" src="/logo.png" alt="" />
              <div className="webview-placeholder-text">
                switch workspaces &middot; click tabs &middot; right-click for menus
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
