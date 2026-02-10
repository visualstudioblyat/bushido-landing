export interface Tab {
  id: string;
  url: string;
  title: string;
  loading: boolean;
  favicon?: string;
  pinned?: boolean;
  blockedCount?: number;
  whitelisted?: boolean;
  workspaceId: string;
  parentId?: string;
  collapsed?: boolean;
  suspended?: boolean;
  lastActiveAt?: number;
}

export interface Workspace {
  id: string;
  name: string;
  color: string;
  activeTabId: string;
}

export interface Bookmark {
  id: string;
  url: string;
  title: string;
  favicon?: string;
  folderId: string;
  createdAt: number;
}

export interface BookmarkFolder {
  id: string;
  name: string;
  parentId: string;
  order: number;
}

export interface FrecencyResult {
  url: string;
  title: string;
  favicon?: string;
  score: number;
  type: 'history' | 'bookmark';
}
