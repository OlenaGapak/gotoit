import React, { PureComponent } from "react";
import * as PropTypes from "prop-types";
import { DefaultClickSoundButton } from "../../game/knowledge/sounds";

export class ReleaseButton extends PureComponent {
    static propTypes = {
        onClick: PropTypes.func,
        doneQuantity: PropTypes.any,
        stage: PropTypes.any,
        type: PropTypes.any
    };

    render() {
        let { onClick, type, stage, doneQuantity } = this.props;
        if (!(doneQuantity > 0 && type === "own" && stage !== "fixing")) return null;
        return (
            <DefaultClickSoundButton
                className="btn btn-success"
                onClick={onClick}
                style={{
                    width: "88px",
                    height: "32px",
                    background: "#45B0E5",
                    paddingLeft: "10px",
                    paddingRight: "10px"
                }}
            >
                <svg className="done_icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.2188L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.78125 12L9 16.2188Z" fill="#fff" />
                </svg>
                Release
            </DefaultClickSoundButton>
        );
    }
}
