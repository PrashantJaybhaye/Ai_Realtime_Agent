import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="spinner">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .spinner {
    width: 80px;
    height: 80px;
    --clr: #ffffff;
    --clr-alpha: rgb(255, 255, 255, .1);
    animation: spinner 2s infinite linear;
    transform-style: preserve-3d;
  }

  .spinner > div {
    background-color: var(--clr-alpha);
    height: 100%;
    position: absolute;
    width: 100%;
    border: 5px solid var(--clr);
  }

  .spinner div:nth-of-type(1) {
    transform: translateZ(-40px) rotateY(180deg);
  }

  .spinner div:nth-of-type(2) {
    transform: rotateY(-270deg) translateX(50%);
    transform-origin: top right;
  }

  .spinner div:nth-of-type(3) {
    transform: rotateY(270deg) translateX(-50%);
    transform-origin: center left;
  }

  .spinner div:nth-of-type(4) {
    transform: rotateX(90deg) translateY(-50%);
    transform-origin: top center;
  }

  .spinner div:nth-of-type(5) {
    transform: rotateX(-90deg) translateY(50%);
    transform-origin: bottom center;
  }

  .spinner div:nth-of-type(6) {
    transform: translateZ(40px);
  }

  @keyframes spinner {
    0% {
      transform: rotate(0deg) rotateX(0deg) rotateY(0deg);
    }

    50% {
      transform: rotate(180deg) rotateX(180deg) rotateY(180deg);
    }

    100% {
      transform: rotate(360deg) rotateX(360deg) rotateY(360deg);
    }
  }`;

export default Loader;
