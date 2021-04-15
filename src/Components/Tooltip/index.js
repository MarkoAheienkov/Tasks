/**
 * Webcomponent for creating tooltip
*/
class Tooltip extends HTMLElement {
  /** */
  constructor() {
    super();
    this.addEvents = false;
  }
  /**
  * @param {Array} - array of attribute names to monitor for changes
  */
  static get observedAttributes() {
    return ['forSelector', 'content', 'right'];
  }
  /**
   * Set content of tooltip
   * @param {string} newContent - new content value
   */
  set content(newContent) {
    this.setAttribute('content', newContent);
  }
  /**
   * Get content of tooltip
   * @return {string} - Tooltip content
   */
  get content() {
    return this.getAttribute('content');
  }
  /**
   * Set forSelector of tooltip
   * @param {string} newForSelector - new forSelector value
   */
  set forSelector(newForSelector) {
    this.setAttribute('forSelector', newForSelector);
  }
  /**
   * Get forSelector of tooltip
   * @return {string} - Tooltip forSelector
   */
  get forSelector() {
    return this.getAttribute('forSelector');
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
    if (!this.addEvents) {
      this.addParentListeners();
    }
  }
  /**
   * Add event listeners to parent
   */
  addParentListeners() {
    this.parent = this.closest(`${this.forSelector}`);
    if (this.parent) {
      this.parent.addEventListener('mouseover', this.mouseOver);
      this.parent.addEventListener('mouseout', this.mouseOut);
    } else {
      throw new Error('No such parent');
    }
  }
  /**
   * Remove parents event listeners
   */
  removeParentListeners() {
    if (this.parent) {
      this.parent.removeEventListener('mouseover', this.mouseOver);
      this.parent.removeEventListener('mouseout', this.mouseOut);
    } else {
      throw new Error('No such parent');
    }
  }
  /**
   *  Calls this method when the element is removed from the document
   */
  disconnectedCallback() {
    this.removeParentListeners();
  }
  /**
   * Render our element
   */
  render() {
    this.hidden = true;
    this.innerHTML = `
      ${this.content}
    `;
  }
  /**
   * Set tooltip coords
   * @param {HTMLElement} parent - parent element
   */
  setTooltipPosition(parent) {
    const {width, height, top, left} = parent.getBoundingClientRect();
    this.style.top = top + height/2 + 'px';
    this.style.left = left + width + 'px';
  }
  /**
   * Parent mouseover
   */
  mouseOver = () => {
    this.hidden = false;
    if (this.right) {
      this.setTooltipPosition(this.parent);
    }
  };
  /**
   * Parent mouseout
   */
  mouseOut = () => {
    this.hidden = true;
  };
}

customElements.define('user-tooltip', Tooltip);

export default Tooltip;
