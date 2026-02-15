type NavigateOptions = {
  replace?: boolean;
};

type RouterLike = {
  navigate: (to: string, options?: NavigateOptions) => void | Promise<void>;
};

let routerRef: RouterLike | null = null;

export function setRouter(router: RouterLike) {
  routerRef = router;
}

export function navigateTo(path: string, options?: NavigateOptions): boolean {
  if (!routerRef?.navigate) return false;
  try {
    routerRef.navigate(path, options);
    return true;
  } catch (err) {
    void err;
    return false;
  }
}
