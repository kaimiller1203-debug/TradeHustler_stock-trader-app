const KEY = 'tp_feed_v1';

export function loadFeed<T = unknown>(): T | null {
    if (typeof window === 'undefined') return null;
    try {
        const raw = localStorage.getItem(KEY);
        return raw ? (JSON.parse(raw) as T) : null;
    } catch {
        return null;
    }
}

export function saveFeed(value: unknown) {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(KEY, JSON.stringify(value));
    } catch {
        // ignore quota errors
    }
}
