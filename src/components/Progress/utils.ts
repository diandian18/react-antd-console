interface Opts {
  force?: boolean;
}

export function setNProgressColor(color: string, opts?: Opts) {
  const { force = false } = opts ?? {};
  const styleDom = document.querySelector('#nprogressThemeColor') ?? document.createElement('style');
  if (!force && styleDom.id) return;
  styleDom.id = 'nprogressThemeColor';
  styleDom.innerHTML = `
    #nprogress .bar {
      background: ${color}!important;
      box-shadow: 0 0 2px ${color};
    }

    #nprogress .peg {
      box-shadow: 0 0 10px ${color}, 0 0 5px ${color};
    }

    #nprogress .spinner-icon {
      border-top-color: ${color};
      border-inline-start-color: ${color};
    }
  `;
  document.body.appendChild(styleDom);
}
