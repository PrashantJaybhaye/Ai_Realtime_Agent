import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`box box-${i}`}>
            <div className="side-left" />
            <div className="side-right" />
            <div className="side-top" />
          </div>
        ))}
      </div>
      <p className="loading-text">Loading Sidvia...</p>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #0b0b0b;
  height: 100vh;
  width: 100vw;
  gap: 1rem;
  z-index: 50;
  position: fixed;
  inset: 0;

  .loader {
    scale: 2.8;
    height: 50px;
    width: 40px;
    position: relative;
  }

  .box {
    position: relative;
    opacity: 0;
    left: 10px;
  }

  .side-left {
    position: absolute;
    background-color: #334155; /* Slate-700 */
    width: 19px;
    height: 5px;
    transform: skew(0deg, -25deg);
    top: 14px;
    left: 10px;
    border-radius: 2px;
  }

  .side-right {
    position: absolute;
    background-color: #10a37f; /* Sidvia green */
    width: 19px;
    height: 5px;
    transform: skew(0deg, 25deg);
    top: 14px;
    left: -9px;
    border-radius: 2px;
  }

  .side-top {
    position: absolute;
    background-color: #1f2937; /* Slate-900 */
    width: 20px;
    height: 20px;
    rotate: 45deg;
    transform: skew(-20deg, -20deg);
    border-radius: 4px;
  }

  .box-1 {
    animation: from-left 4s infinite;
  }

  .box-2 {
    animation: from-right 4s infinite;
    animation-delay: 1s;
  }

  .box-3 {
    animation: from-left 4s infinite;
    animation-delay: 2s;
  }

  .box-4 {
    animation: from-right 4s infinite;
    animation-delay: 3s;
  }

  @keyframes from-left {
    0% {
      z-index: 20;
      opacity: 0;
      transform: translate(-20px, -6px);
    }
    20% {
      z-index: 10;
      opacity: 1;
      transform: translate(0px, 0px);
    }
    40% {
      z-index: 9;
      transform: translate(0px, 4px);
    }
    60% {
      z-index: 8;
      transform: translate(0px, 8px);
    }
    80% {
      z-index: 7;
      opacity: 1;
      transform: translate(0px, 12px);
    }
    100% {
      z-index: 5;
      transform: translate(0px, 30px);
      opacity: 0;
    }
  }

  @keyframes from-right {
    0% {
      z-index: 20;
      opacity: 0;
      transform: translate(20px, -6px);
    }
    20% {
      z-index: 10;
      opacity: 1;
      transform: translate(0px, 0px);
    }
    40% {
      z-index: 9;
      transform: translate(0px, 4px);
    }
    60% {
      z-index: 8;
      transform: translate(0px, 8px);
    }
    80% {
      z-index: 7;
      opacity: 1;
      transform: translate(0px, 12px);
    }
    100% {
      z-index: 5;
      transform: translate(0px, 30px);
      opacity: 0;
    }
  }

  .loading-text {
    color: #e2e8f0; /* Light slate */
    font-size: 0.95rem;
    font-weight: 500;
    opacity: 0.9;
    animation: pulse 1.8s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
  }
`;

export default Loader;
