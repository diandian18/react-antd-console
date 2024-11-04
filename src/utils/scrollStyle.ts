interface Opts {
  style?: Style;
  force?: boolean;
}

export interface Style {
  color?: string;
  hoverColor?: string;
}

export const defaultLightMode = {
  color: 'rgba(0, 0, 0, 0.2)',
  hoverColor: 'rgba(0, 0, 0, 0.4)',
};

export const defaultDarkMode = {
  color: 'rgba(255, 255, 255, 0.3)',
  hoverColor: 'rgba(255, 255, 255, 0.5)',
};

export function setScrollStyle(opts?: Opts) {
  const { force = false, style } = opts ?? {};
  const { color = defaultLightMode.color, hoverColor = defaultLightMode.hoverColor } = style ?? {};
  const styleDom = document.querySelector('#scrollStyle') ?? document.createElement('style');
  if (!force && styleDom.id) return;
  styleDom.id = 'scrollStyle';
  styleDom.innerHTML = `
    /* Works on Firefox */
    * {
      scrollbar-width: auto;
      scrollbar-color: ${color};
    }

    /* Works on Chrome, Edge, and Safari */
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }

    ::-webkit-scrollbar-track {
      display: none;
    }

    ::-webkit-scrollbar-thumb {
      background-color: ${color};
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: ${hoverColor};
    }
  `;
  document.body.appendChild(styleDom);
}

export function initScrollStyle() {
  setScrollStyle();
}
