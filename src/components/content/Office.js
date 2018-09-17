import React, { Component } from "react";
import { offices } from "../../game/knowledge/office";

//import {offices} from '../game/knowledge';

class Office extends Component {
    render() {
        const data = this.props.data;
        const apartment_description = (
            <div className="office">
                <h6 className="small-heading">Appartment description</h6>
                <h4>{data.office.text}</h4>

                <div className="flex-container-row">
                    <div className="flex-element office-buttons">
                        {data.workers.length < data.office.space ? (
                            <div className="column-buttons">
                                {data.office.size > 1 && offices[data.office.size - 1].space >= data.workers.length ? (
                                    data.office.size === 2 ? (
                                        <button
                                            onClick={() => {
                                                data.helpers.downOffice();
                                            }}
                                            className="btn btn-warning btn-sm"
                                        >
                                            Cancel the Office
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                data.helpers.downOffice();
                                            }}
                                            className="btn btn-warning btn-sm"
                                        >
                                            Downgrade the Office
                                        </button>
                                    )
                                ) : (
                                    ""
                                )}

                                {data.office.size < 4 && data.workers.length === data.office.space ? (
                                    <button
                                        onClick={() => {
                                            data.helpers.upOffice();
                                        }}
                                        className="btn btn-success btn-sm"
                                    >
                                        Extend the Office
                                    </button>
                                ) : (
                                    ""
                                )}
                            </div>
                        ) : data.office.size === 1 ? (
                            <div className="column-buttons">
                                <button
                                    onClick={() => {
                                        data.helpers.upOffice();
                                    }}
                                    className="btn btn-success btn-md"
                                >
                                    Rent an Office
                                </button>
                            </div>
                        ) : data.office.size < 4 && data.workers.length === data.office.space ? (
                            <div className="column-buttons">
                                <button
                                    onClick={() => {
                                        data.helpers.upOffice();
                                    }}
                                    className="btn btn-success btn-sm"
                                >
                                    Extend the Office
                                </button>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>

                    <div className="flex-element">
                        <span className="icon-usd">
                            <span className="path1" />
                            <span className="path2" />
                        </span>
                        <h3 style={{ color: "#71B247", paddingLeft: "6px" }} className="fw-700">
                            {data.office.price}
                        </h3>
                    </div>
                </div>
            </div>
        );

        const coffeemaker = (
            <div className="card flex-element" style={{ margin: "0 auto" }}>
                <div className="card-content-center">
                    <h4>Coffeemaker</h4>
                    <h6>Workers will come to work earlier if there is a Coffeemaker in the office.</h6>
                    {data.office_things.coffeemaker ? (
                        <button
                            className="btn btn-info disabled"
                            data-provide="tooltip"
                            data-placement="top"
                            title=""
                            data-original-title="Workers come to work earlier because of the Coffeemaker in the office."
                        >
                            Coffeemaker is bought
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                data.helpers.buyCoffeemaker();
                            }}
                            className={data.money >= 5000 ? "btn btn-success btn-md" : "btn btn-success btn-md disabled"}
                        >
                            $5000
                        </button>
                    )}
                </div>
            </div>
        );

        const lunch = (
            <div className="card flex-element card-content-center">
                <h4>Lunches</h4>
                <h6>After a delicious Lunch for $25, employees will stay at work until night.</h6>
                {data.office_things.lunch ? (
                    <button
                        onClick={() => {
                            data.helpers.lunchOff();
                        }}
                        className="btn btn-danger btn-md"
                    >
                        Cancel
                    </button>
                ) : (
                    <button
                        onClick={() => {
                            data.helpers.lunchOn();
                        }}
                        className="btn btn-info btn-md"
                    >
                        On
                    </button>
                )}{" "}
            </div>
        );
        const gadget = (
            <div className="card flex-element card-content-center">
                <h4>Gadgets</h4>
                <h6>
                    Fancy gadgets gives 1% happiness Boost per gadget. You Own:
                    {data.office_things.gadget}
                </h6>
                <button
                    onClick={() => {
                        data.helpers.buyGadget();
                    }}
                    className={data.money >= data.helpers.getGadgetCost() ? "btn btn-info" : "btn btn-info disabled"}
                >
                    Buy Gadget ${data.helpers.getGadgetCost()}
                </button>
            </div>
        );

        return (
            <div style={{ padding: "32px 32px 32px 32px" }}>
                {apartment_description}
                {data.office.size > 1 ? (
                    <div className="flex-container-row" style={{ paddingTop: "32px" }}>
                        {data.office.size > 1 ? coffeemaker : ""}
                        {data.office.size > 2 ? lunch : ""}
                        {data.office.size > 3 ? gadget : ""}
                    </div>
                ) : (
                    <div />
                )}
            </div>
        );
    }
}

export default Office;
