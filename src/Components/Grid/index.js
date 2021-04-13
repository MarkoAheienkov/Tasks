import {html, LitElement} from 'lit-element';

import gridStyle from './style';

/**
 * Webcomponent for creating grid
*/
class Grid extends LitElement {
  /**
   * Static method fot getting styles
   * @return {Object} - component`s styles
  */
  static get styles() {
    return gridStyle;
  }
  /**
   * Static method fot getting properties
   * @return {Object} - component`s properties
  */
  static get properties() {
    return {
      data: {
        type: Object,
        reflect: true,
        attribute: true,
      },
      columns: {
        type: Array,
        reflect: true,
        attribute: true,
      },
    };
  }
  /**
  */
  constructor() {
    super();
    this.data = [];
    this.columns = {};
  }
  /**
   * Get row`s type by index
   * @param {number} idx - row index
   * @return {String} - component`s properties
  */
  getRowType(idx) {
    if (idx%2 === 0) {
      return 'light';
    } else {
      return 'dark';
    }
  }
  /**
   * Create rows
   * @param {Array} titles - array of titles
   * @return {Array} - array of rows
  */
  createRows(titles) {
    return titles.map((columns, idx) => {
      const row = document.createElement('user-row');
      row.setColumns(columns);
      row.type = this.getRowType(idx);
      return row;
    });
  }
  /**
   * Map data array to array of titles
   * @return {Array} - array of titles
  */
  dataToTitles() {
    return this.data.map((data) => {
      const fields = Object.keys(this.columns);
      return fields.map((field) => {
        if (!data[field]) {
          throw new Error('No such field in data');
        }
        return data[field];
      });
    });
  }
  /** Set Rows Data
   * @param {Array} data - array of data for rows
  */
  setData(data) {
    this.data = [...data];
  }
  /** Set columns template
   * @param {Object} columns - columns template {field: Title}
  */
  setColumns(columns) {
    this.columns = {...columns};
  }
  /**
   * Render component
   * @return {Object} - component`s template
   */
  render() {
    const titles = Object.values(this.columns);
    const row = document.createElement('user-row');
    const dataTitles = this.dataToTitles();
    row.setColumns(titles);
    row.type = 'head';
    const rows = this.createRows(dataTitles);
    return html`
      <div class="grid">
        ${row}
        ${rows}
      </div>
    `;
  }
}

export default Grid;
