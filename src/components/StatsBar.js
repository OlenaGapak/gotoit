import React, { Component } from "react";
import { colors } from "../game/knowledge/colors";
import CircularProgressbar from "react-circular-progressbar";

/***
 * KILL THIS ASAP
 */

class StatsBar extends Component {
    // shouldComponentUpdate() {
    //   return false;
    // }
    componentDidMount() {
        console.info("StatsBar mounted");
    }

    render() {
        const data = this.props.data;
        const stats = this.props.stats;
        const project = this.props.project;

        return (
            <div className="text-center flex-element flex-container-row description">
                <h1 className="flex-element salary" style={{ color: `${colors.reputation.colorCompleted}` }}>
                    {project ? project.deadline : ""}
                </h1>
                {Object.keys(stats).map(stat => {
                    return project ? (
                        <div className="stats-column" key={stat}>
                            <CircularProgressbar
                                className="skills-circle flex-element"
                                initialAnimation={true}
                                strokeWidth={8}
                                styles={{
                                    path: {
                                        stroke: `${
                                            stats[stat].name === "program"
                                                ? colors.program.colorCompleted
                                                : stats[stat].name === "design"
                                                    ? colors.design.colorCompleted
                                                    : colors.manage.colorCompleted
                                        }`
                                    },
                                    text: {
                                        fill: `${
                                            stats[stat].name === "program"
                                                ? colors.program.colorCompleted
                                                : stats[stat].name === "design"
                                                    ? colors.design.colorCompleted
                                                    : colors.manage.colorCompleted
                                        }`,
                                        fontSize: "38px"
                                    },
                                    trail: {
                                        stroke: `${
                                            stats[stat].name === "program"
                                                ? colors.program.colorTrail
                                                : stats[stat].name === "design"
                                                    ? colors.design.colorTrail
                                                    : colors.manage.colorTrail
                                        }`
                                    }
                                }}
                                percentage={Math.ceil(stats[stat].val * 100) / 100}
                                text={`${(Math.ceil(stats[stat].val * 100) / 100).toFixed(0)}`}
                            />
                        </div>
                    ) : (
                        <span key={stat}>
                            <span key={stat}>
                                {stats[stat].name}:{" "}
                                <span>
                                    {stats[stat].val}
                                    {"  "}
                                </span>
                            </span>
                        </span>
                    );
                })}
            </div>

            /* return <StatsProgressBar
            // type={stats[stat].name}
            // hideCheckbox={true}
            // max_stat={data.max_stats_projects_offered}
            // stats={stats[stat].val}
            // worker={candidate}
            // data={data}
            // /> */
        );
    }
}

export default StatsBar;
