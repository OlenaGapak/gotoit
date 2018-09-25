import React, { Component } from "react";
import * as PropTypes from "prop-types";
import _ from "lodash";
import isEqual from "react-fast-compare";

export class Avatar extends Component {
    static propTypes = {
        className: PropTypes.string,
        kind: PropTypes.string,
        name: PropTypes.string,
        platform: PropTypes.string,
        size: PropTypes.number,
        style: PropTypes.object,
        sources: PropTypes.array
    };
    shouldComponentUpdate(nextProps) {
        return !isEqual(this.props, nextProps);
    }
    render() {
        let props = {};
        if (this.props.size) {
            props = {
                ...props,
                width: this.props.size,
                height: this.props.size
            };
        }
        if (this.props.style) {
            props = {
                ...props,
                style: this.props.style
            };
        }
        // if (this.props.className) {
        //   props = {
        //     ...props,
        //     className: this.props.className
        //   };
        // }

        return (
            <div className={this.props.className}>
                {_.map(this.props.sources, ([type, src], index) => {
                    if (!src) {
                        return null;
                    }
                    return (
                        <img className="avatar-fragment" key={`${index}${type}`} alt={this.props.name + " avatar"} src={src} {...props} />
                    );
                })}
            </div>
        );
    }
}
