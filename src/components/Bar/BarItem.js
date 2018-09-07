import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import styled from "styled-components";

const ProgressBar = styled.div`
    background-color: ${props => props.color};
    width: ${props => props.width}%;
`;

class BarItem extends PureComponent {
    static defaultProps = {
        width: 0,
        value: ""
    };

    static propTypes = {
        id: PropTypes.string,
        color: PropTypes.string,
        name: PropTypes.string,
        showName: PropTypes.bool,
        value: PropTypes.string,
        width: PropTypes.number
    };

    render() {
        let { id, showName, name, value, color, width } = this.props;
        return (
            <ProgressBar id={id} color={color} width={width} className="progress-bar" role="progressbar">
                {value} {showName ? name : null}
            </ProgressBar>
        );
    }
}

export default BarItem;
