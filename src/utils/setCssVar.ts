export function setCssVar(vars: Record<string, string>) {
  Object.keys(vars).forEach(key => {
    document.documentElement.style.setProperty(key, vars[key]);
  });
}
