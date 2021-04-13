import {css} from 'lit-element';

const style = css`
  .row {
    display: grid;
    gap: 10px;
    border-left: 1px solid black;
    border-right: 1px solid black;
    padding: 10px;
    text-align: center;
  }
  .row.head {
    background: #4271C3;
    color: white;
    font-size: 24px;
    font-weight: bold;
  }
  .row.light {
    color: rgba(0,0,0,0.9);
  }
  .row.dark {
    background: #D8E0F2;
  }
  .cell {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media screen and (max-width: 500px) {
    .row {
      font-size: 14px;
    }
    .row.head {
      font-size: 20px;
    }
  }
`;

export default style;
