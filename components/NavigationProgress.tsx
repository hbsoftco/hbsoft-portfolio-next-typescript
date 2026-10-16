"use client";

import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

type PendingNavigation = {
  from: string;
  target: string;
  superseded: Set<string>;
  committed: string | null;
  ready: string | null;
};

const NavigationProgressContext = createContext<(pathname: string) => void>(() => {});

export const useNavigationVisualReady = () => useContext(NavigationProgressContext);

export default function NavigationProgress({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lastPath = useRef(pathname);
  const pending = useRef<PendingNavigation | null>(null);
  const shown = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (interval.current) clearInterval(interval.current);
    interval.current = null;
  }, []);

  const cancel = useCallback(() => {
    pending.current = null;
    clearTimers();
    shown.current = false;
    setVisible(false);
    setProgress(0);
  }, [clearTimers]);

  const finish = useCallback(() => {
    pending.current = null;
    clearTimers();
    if (!shown.current) {
      setProgress(0);
      return;
    }
    setProgress(1);
    timers.current.push(setTimeout(() => {
      shown.current = false;
      setVisible(false);
      timers.current.push(setTimeout(() => setProgress(0), 220));
    }, 160));
  }, [clearTimers]);

  const maybeFinish = useCallback((path: string) => {
    const navigation = pending.current;
    if (navigation?.committed === path && navigation.ready === path && window.location.pathname === path) {
      finish();
    }
  }, [finish]);

  const onVisualReady = useCallback((path: string) => {
    const navigation = pending.current;
    if (!navigation || path === navigation.from || navigation.superseded.has(path)) return;
    navigation.ready = path;
    maybeFinish(path);
  }, [maybeFinish]);

  const start = useCallback((target: string, from: string) => {
    if (target === from) {
      if (pending.current) cancel();
      return;
    }
    const previous = pending.current;
    clearTimers();
    const superseded = new Set(previous?.superseded);
    if (previous?.target && previous.target !== target) superseded.add(previous.target);
    if (previous?.committed && previous.committed !== target) superseded.add(previous.committed);
    superseded.delete(target);
    const navigation: PendingNavigation = {
      from,
      target,
      superseded,
      committed: null,
      ready: null,
    };
    pending.current = navigation;
    if (shown.current) {
      setProgress((value) => Math.min(value, 0.9));
    } else {
      timers.current.push(setTimeout(() => {
        if (pending.current !== navigation) return;
        shown.current = true;
        setVisible(true);
        setProgress(0.08);
        interval.current = setInterval(() => {
          setProgress((value) => Math.min(0.9, value + (0.9 - value) * 0.12));
        }, 160);
      }, 120));
    }
    timers.current.push(setTimeout(() => {
      if (pending.current === navigation) cancel();
    }, 15000));
  }, [cancel, clearTimers]);

  useEffect(() => {
    if (pathname === lastPath.current) return;
    lastPath.current = pathname;
    const navigation = pending.current;
    if (navigation && pathname !== navigation.from && !navigation.superseded.has(pathname)) {
      navigation.committed = pathname;
      maybeFinish(pathname);
    }
  }, [pathname, maybeFinish]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;
      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin) return;
      if (destination.pathname === window.location.pathname) {
        if (pending.current && !destination.hash) cancel();
        return;
      }
      start(destination.pathname, window.location.pathname);
    };
    const onPopState = () => start(window.location.pathname, lastPath.current);
    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPopState);
    window.addEventListener("pagehide", cancel);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("pagehide", cancel);
      clearTimers();
    };
  }, [cancel, clearTimers, start]);

  return (
    <NavigationProgressContext.Provider value={onVisualReady}>
      {children}
      <div
        data-testid="navigation-progress"
        role={visible ? "progressbar" : undefined}
        aria-label={visible ? "Loading page" : undefined}
        aria-hidden={!visible}
        dir="ltr"
        className={`pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] transition-opacity duration-200 motion-reduce:transition-none ${visible ? "opacity-100" : "opacity-0"}`}
      >
        <div
          className="h-full w-full bg-accent transition-transform duration-150 ease-linear motion-reduce:transition-none"
          style={{ transform: `scaleX(${progress})`, transformOrigin: "left center" }}
        />
      </div>
    </NavigationProgressContext.Provider>
  );
}
