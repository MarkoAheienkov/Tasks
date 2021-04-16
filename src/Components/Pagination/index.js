/**
 * Webcomponent for creating pagination
*/
class Pagination extends HTMLElement {
  /**
   */
  constructor() {
    super();
    this.isEventListenersRegistered = false;
    this.clickPage = this.clickPage.bind(this);
  }
  /**
  * @param {Array} - array of attribute names to monitor for changes
  */
  static get observedAttributes() {
    return ['count', 'active'];
  }
  /**
   * Set count for pagination
   * @param {number} newCount - new count value
   */
  set count(newCount) {
    this.setAttribute('count', newCount);
  }
  /**
   * Get count
   * @return {string} - count of pages
   */
  get count() {
    return this.getAttribute('count');
  }
  /**
   * Set active for pagination
   * @param {number} newActive - new active value
   */
  set active(newActive) {
    this.setAttribute('active', newActive);
  }
  /**
   * Get active page
   * @return {number} - active page
   */
  get active() {
    return +this.getAttribute('active');
  }
  /**
   * Called when one of attributes listed above is modified
   * @param {string} name - attribute name
   * @param {string} oldValue - attribute old value
   * @param {string} newValue - attribute new value
   */
  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }
  /**
   * Calls this method when the element is added to the document
   */
  connectedCallback() {
    this.render();
    if (!this.isEventListenersRegistered) {
      this.addEvents();
    }
  }
  /**
   * Get Page classes
   * @param {number} number - page number
   * @return {string} - strig of page classes
   */
  getPageClasses(number) {
    const classes = [];
    if (number === this.active) {
      classes.push('active');
    }
    return classes.join(' ');
  }
  /**
   * Generate page
   * @param {number} number - number of page
   * @return {string} - page template
   */
  generatePage(number) {
    const classes = this.getPageClasses(number);
    return `<a href="?page=${number}" 
      data-number="${number}"
      class="${classes}"
      >${number}</a>`;
  }
  /**
   * Generate pages
   * @return {string[]} - pages template
   */
  generatePages() {
    const pages = [];
    for (let i = 1; i <= this.count; i++) {
      const page = this.generatePage(i);
      pages.push(page);
    }
    return pages;
  }
  /**
   * Remove parents event listeners
   */
  removeEvents() {
    this.removeEventListener('click', this.clickPage);
  }
  /**
  *  Calls this method when the element is removed from the document
  */
  disconnectedCallback() {
    this.removeEvents();
  }
  /**
   * Add event listener
   */
  addEvents() {
    this.addEventListener('click', this.clickPage);
    this.isEventListenersRegistered = true;
  }
  /**
   * Click page
   * @param {Event} event
   */
  clickPage(event) {
    const {number} = event.target.dataset;
    if (number) {
      event.preventDefault();
      const pageClickEvent = new Event('pageclick');
      pageClickEvent.number = number;
      this.active = number;
      this.dispatchEvent(pageClickEvent);
      history.pushState(null, 'click page', event.target.href);
    }
  }
  /**
   * Render our element
   */
  render() {
    const pages = this.generatePages();
    this.innerHTML = `
      ${pages.join('')}
    `;
  }
}

customElements.define('user-pagination', Pagination);

export default Pagination;
