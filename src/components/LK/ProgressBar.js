import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { Button } from "primereact/button";

const transitionStyles = {
    entering: { transform: "scale(1.5)" },
    entered: { transform: "scale(1)" },
    exiting: { transform: "scale(1.5)" },
    exited: { transform: "scale(1)" }
  };

export default class MyProgressBar extends React.Component {

    render() {
      const percent = this.props.percent
      return (
        <ProgressBar
            percent={percent}
            filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
        >
            <Step transition="scale" transitionDuration="1000">
                {({ accomplished, transitionState, index }) => (
                <div
                    style={transitionStyles[transitionState]}
                    className={`indexedStep ${accomplished ? "accomplished" : ""}`}
                >
                    <Button></Button>
                    {index + 1}
                </div>
                )}
            </Step>
            <Step transition="scale">
                {({ accomplished, transitionState, index }) => (
                    <div
                        style={transitionStyles[transitionState]}
                        className={`indexedStep ${accomplished ? "accomplished" : ""}`}
                    >
                        {index + 1}
                    </div>
                )}
            </Step>
            <Step transition="scale">
                {({ accomplished, transitionState, index }) => (
                    <div
                        style={transitionStyles[transitionState]}
                        className={`indexedStep ${accomplished ? "accomplished" : ""}`}
                    >
                        {index + 1}
                    </div>
                )}
            </Step>
      </ProgressBar>
      );
    }
  }
