import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import Fact from './Fact';

const loaderCssStyle = css`
  display: block;
  margin: 5rem auto 0;
`;

export default class FactsList extends Component {

  componentWillUnmount() {
    toast.dismiss()
  }

  render() {
    const { isLoading, facts, saveFact, removeFact } = this.props;
    return this.props.isLoading ?
      (<ClipLoader
        color={"#ffffff"}
        loading={isLoading}
        css={loaderCssStyle}
        size={100}
      />)
      : (<ul className="Facts-List">
        {facts.map((fact, i) =>
          <Fact
            key={i}
            fact={fact}
            saveFact={saveFact}
            removeFact={removeFact}
          />)}
      </ul>)
  }
}
