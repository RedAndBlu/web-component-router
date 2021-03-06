export class Link extends HTMLAnchorElement {
  constructor() {
    super();
    this.switcher = this.getSwitcher();
  }

  getRouter(from) {
    const router = from.closest("e-router");

    if (router) {
      return router;
    }
    if (document.getRootNode() instanceof HTMLDocument) {
      throw new Error("e-link isn't located in any e-router");
    }

    return this.getRouter(from.getRootNode().host);
  }

  getSwitcher() {
    return this.getRouter(this).shadowRoot.firstElementChild;
  }

  handleClick() {
    this.onclick = () => {
      window.history.pushState({}, "", this.href);
      this.switcher.dispatchEvent(new CustomEvent("switch-path"));
      return false;
    };
  }

  connectedCallback() {
    if (this.isConnected) {
      this.handleClick();
    }
  }

  disconnectedCallback() {
    this.onclick = null;
  }
}
