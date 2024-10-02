import { css } from "@emotion/react";
import styled from "@emotion/styled";

const SelectContainer = styled.div(
	() => css`
    border: 1px solid #eeeeee;
    background: #ffffff;
    max-width: 30em;
    padding: 1em;
    // margin-bottom: 1em;
    margin-bottom: 400px;

    .custom-select {
      position: relative;
    }

    .select-css {
      display: block;
      font-size: 1em;
      font-family: sans-serif;
      font-weight: 700;
      color: #444;
      line-height: 1.3;
      padding: .6em 1.4em .5em .8em;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
      margin: 0;
      border: 1px solid #aaa;
      box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
      border-radius: .25em;
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      background-color: #fff;
      position: relative;
      z-index: 10;
    }

    .select-css::-ms-expand {
      display: none;
    }
    .select-css:hover {
      border-color: #888;
    }
    .select-css:focus {
      border: 2px dashed blue; 
      color: #222;
      outline: none;
    }

    .custom-select-options {
      border: 1px solid #aaa;
      border-radius: 0 0 0.25em .25em;
      line-height: 1.5;
      margin: 0;
      padding: 0;
      list-style-type: none;
      font-weight:normal;
      cursor: pointer;
      z-index: 2;
      position: absolute;
      width: calc(100% - 1px);
      background-color: #ffffff;

       li {
        padding: 1em;
      }
       li:hover {
        background: blue;
        color: #fff;
        border: 1px solid blue;
        border-width: 0 0 0 1px;
      }

       li:focus {
        border: 2px dashed blue;
      }

    }

    .hidden-all {
      display: none;
    }
    .hidden-visually {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      overflow: hidden;
      clip: rect(0,0,0,0);
      white-space: nowrap;
      -webkit-clip-path: inset(50%);
      clip-path: inset(50%);
      border: 0;
    }
`,
);

export { SelectContainer };
