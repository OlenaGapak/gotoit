import React, { Component } from "react";
import Worker from "./Worker";
import { offices } from "../game/knowledge/office";

class Workers extends Component {
    constructor(props) {
        super(props);

        this.hire = this.hire.bind(this);
        this.reject = this.reject.bind(this);
    }

    hire(event, type) {
        this.props.data.helpers.hireCandidate(event.target.id, type);
    }

    reject(event, type) {
        this.props.data.helpers.rejectCandidate(event.target.id, type);
    }

    render() {
        const data = this.props.data;

        return (
            <section className="workers">
                {data.workers.map((x, i) => (
                    <Worker key={x.id} worker={x} data={data} />
                ))}
            </section>
        );
    }
}

export default Workers;
