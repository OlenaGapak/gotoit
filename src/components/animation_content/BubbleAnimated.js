import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Animate } from "react-move";
import { easeLinear } from "d3-ease";
import { Motion, spring } from "react-motion";
import SplashAnimated from "./SplashAnimated";
import { sounds } from "../../game/knowledge/sounds";

class BubbleAnimated extends PureComponent {
    static propTypes = {
        color: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
        from: PropTypes.string.isRequired,
        handleTransitionEnd: PropTypes.func.isRequired,
        size: PropTypes.string.isRequired,
        to: PropTypes.string.isRequired
    };
    constructor(props) {
        super(props);
        let { size, color, queue } = props;
        let from = { x: 0, y: 0 };
        let elementFrom = document.getElementById(props.from);
        let elementTo = document.getElementById(props.to);
        this.state = {
            elementFrom,
            elementTo
        };
        if (elementFrom) {
            from = elementFrom.getBoundingClientRect();
            this.state = {
                ...this.state,
                step: 1,
                duration: 700 - 50 * props.gameSpeed,
                size,
                color,
                opacity: 1,
                scale: 1,
                x: from.x + 50,
                y: from.y + 50
            };
        }
    }
    transitionEnd = () => {
        this.props.handleTransitionEnd();
    };
    movingEnd = () => {
        let { step } = this.state;
        console.info("movingEnd ");
        return this.props.handleTransitionEnd();
    };
    componentDidMount() {
        let to;
        let { elementFrom, elementTo } = this.state;
        let audio = new Audio(sounds.bubble_appear);
        audio.play();
        if (elementTo) {
            to = elementTo.getBoundingClientRect();
            to.x -= to.width / 2;
            to.y -= to.height / 2;
            this.setState({
                x: to.x,
                y: to.y
            });
        }
    }
    componentWillUnmount() {
        let audio = new Audio(sounds.bubble_burst);
        audio.play();
    }
    render() {
        let { count, queue } = this.props;
        let { size, color, x, y, elementFrom, elementTo, opacity, scale, duration } = this.state;
        if (!elementFrom || !elementTo) return null;
        return (
            <div>
                {
                    <Animate
                        start={{
                            x: x,
                            y: y,
                            opacity: 1,
                            scale: 1
                            // duration: 700 - 50 * this.props.gameSpeed
                        }}
                        update={[
                            {
                                x: [x],
                                y: [y],
                                opacity: [opacity],
                                scale: [scale],
                                timing: {
                                    duration: [duration]
                                    // ease: easeLinear
                                },
                                events: { end: this.movingEnd }
                            }
                        ]}
                        leave={[
                            // an array!
                            {
                                opacity: [0],
                                scale: [2],
                                timing: {
                                    duration: 3500
                                    // ease: easeLinear
                                }
                            }
                        ]}
                    >
                        {({ x, y, opacity, scale }) => {
                            return (
                                <div
                                    style={{
                                        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                                        opacity: opacity,
                                        width: size,
                                        height: size,
                                        background: color,
                                        willChange: "transform, opacity",
                                        borderRadius: "50%",

                                        textAlign: "center",
                                        lineHeight: size,
                                        position: "relative",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        color: "white",
                                        cursor: "pointer"
                                    }}
                                >
                                    {count}
                                </div>
                            );
                        }}
                    </Animate>
                }
            </div>
        );
    }
}

export default BubbleAnimated;
