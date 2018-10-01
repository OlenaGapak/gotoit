import React from "react";
import BubbleAnimated from "./animation_content/BubbleAnimated";
import { genAnimationData } from "../game/knowledge/animation_data";
import _ from "lodash";

//var timeoutID = null;

class BubblesAnimation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };

        this.addBubbleAnimation = this.addBubbleAnimation.bind(this);
    }
    // shouldComponentUpdate() {
    //   return false;
    // }
    componentDidMount() {
        this.props.onRef(this);
    }
    componentWillUnmount() {
        this.props.onRef(undefined);
    }

    // trueAddBubbleAnimation(animation_data) {
    //     debugger;
    //     let items = this.state.items.concat({
    //         id: this.state.length,
    //         item: animation_data
    //     });
    //     this.setState(() => ({
    //         items: items,
    //         length: this.state.length + 1
    //     }));
    // }

    addBubbleAnimation(name, count, workerId, projectId, isBug = false) {
        let animation_data = genAnimationData(name, workerId, projectId, count, isBug);
        this.setState(prevState => ({
            items: [
                ...prevState.items,
                {
                    id: `_${new Date().getTime()}`,
                    ...animation_data
                }
            ]
        }));
    }

    removeItem = id => {
        this.setState(prevState => {
            let newItems = prevState.items.filter(i => i.id !== id);
            return {
                items: newItems
            };
        });
    };

    renderItem = ({ id, size, color, count, from, to }) => {
        return (
            <BubbleAnimated
                key={id}
                size={size}
                color={color}
                count={count}
                from={from}
                to={to}
                handleTransitionEnd={() => this.removeItem(id)}
            />
        );
    };
    render() {
        const items = _.map(this.state.items, this.renderItem);
        return <div className="bubbles-wrapper">{items}</div>;
    }
}

export default BubblesAnimation;
