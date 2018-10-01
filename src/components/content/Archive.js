import React, { Component } from "react";

//import ChartsController from "./ChartsController";

import ProjectReport from "../ProjectReport";

class Archive extends Component {
    render() {
        return (
            <div>
                <div key="archive_reports">
                    {this.props.data.projects_archive_reports.map((x, i) => (
                        <ProjectReport key={x.id} project={x} data={this.props.data} />
                    ))}
                </div>
                {/* <ChartsController data={this.props.data} chart={{ name: "Projects archive statistics", type: "Archive" }} /> */}
            </div>
        );
    }
}

export default Archive;
