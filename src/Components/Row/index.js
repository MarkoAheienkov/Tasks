import {html, LitElement} from 'lit-element';

import rowStyle from './style';

/**
 * Webcomponent for creating rows in grid
*/
class Row extends LitElement {
  /**
   * Static method fot getting styles
   * @return {Object} - component`s styles
  */
  static get styles() {
    return rowStyle;
  }
  /**
   * Static method fot getting properties
   * @return {Object} - component`s properties
  */
  static get properties() {
    return {
      columns: {
        type: Array,
        reflect: true,
        attribute: true,
      },
      type: {
        type: String,
        reflect: true,
        attribute: true,
      },
    };
  }
  /**
  */
  constructor() {
    super();
    this.columns = [];
    this.type = '';
  }
  /** Set columns titles
   * @param {Array} columns - columns titles
  */
  setColumns(columns) {
    this.columns = [...columns];
  }
  /**
   * Create cell for row
   * @param {string} title - cell title
   * @return {Object}
   */
  createCell(title) {
    return html`<div class="cell">${title}</div>`;
  }
  /**
   * Get string of styling classes for this row
   * @return {string} - string of classes
   */
  getClasses() {
    return `row ${this.type}`;
  }
  /**
   * Generate cells
   * @return {HTMLElement[]}
   */
  generateCelss() {
    return this.columns.map(this.createCell);
  }
  /**
   * Render component
   * @return {Object} - component`s template
   */
  render() {
    const cells = this.generateCelss();
    const rowClasses = this.getClasses();
    return html`
      <div class=${rowClasses} 
      style="grid-template-columns: repeat(${cells.length}, 1fr);">
        ${cells}
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('user-row', Row);

export default Row;
