import React, { Component } from "react";
import { DefaultClickSoundButton } from "../../game/knowledge/sounds";
import { offices } from "../../game/knowledge/office";
import { colors } from "../../game/knowledge/colors";

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
                        ) : data.office.size > 1 ? (
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

                    <h3 style={{ color: `${colors.salary}` }} className="fw-700">
                        <span className="icon-usd">
                            <span className="path1" />
                            <span className="path2" />
                        </span>{" "}
                        {data.office.price}
                    </h3>
                </div>
            </div>
        );

        const coffeemaker = (
            <div className="card flex-element card-content-center">
                <div className="card-content-center office-actions">
                    <h4>Coffeemaker</h4>
                    <h6>Workers will come to work earlier if there is a Coffeemaker in the office.</h6>
                    <div className="btn-wrapper">
                        {data.office_things.coffeemaker ? (
                            <button
                                className="btn btn-success disabled"
                                data-provide="tooltip"
                                data-placement="top"
                                title=""
                                data-original-title="Workers come to work earlier because of the Coffeemaker in the office."
                            >
                                Bought
                            </button>
                        ) : (
                            <DefaultClickSoundButton
                                onClick={() => {
                                    data.helpers.buyCoffeemaker();
                                }}
                                className={data.money >= 5000 ? "btn btn-success btn-md" : "btn btn-success btn-md disabled"}
                            >
                                $5000
                            </DefaultClickSoundButton>
                        )}
                    </div>
                </div>
            </div>
        );

        const lunch = (
            <div className="card flex-element card-content-center">
                <div className="card-content-center office-actions">
                    <h4>Lunches</h4>
                    <h6>After a delicious Lunch for $25, employees will stay at work until night.</h6>
                    <div className="btn-wrapper">
                        {data.office_things.lunch ? (
                            <DefaultClickSoundButton
                                onClick={() => {
                                    data.helpers.lunchOff();
                                }}
                                className="btn btn-danger btn-md"
                            >
                                Cancel
                            </DefaultClickSoundButton>
                        ) : (
                            <DefaultClickSoundButton
                                onClick={() => {
                                    if (data.money >= data.helpers.getGadgetCost() && data.office.size > 3) {
                                        data.helpers.lunchOn();
                                    } else {
                                        return false;
                                    }
                                }}
                                className="btn btn-success btn-md"
                            >
                                On
                            </DefaultClickSoundButton>
                        )}
                    </div>
                </div>
            </div>
        );
        const gadget = (
            <div className="card flex-element card-content-center">
                <div className="card-content-center office-actions">
                    <h4>Gadgets</h4>
                    <h6>
                        Fancy gadgets gives 1% happiness Boost per gadget. You Own:
                        {data.office_things.gadget}
                    </h6>
                    <div className="btn-wrapper">
                        <DefaultClickSoundButton
                            onClick={() => {
                                if (data.money >= data.helpers.getGadgetCost() && data.office.size > 3) {
                                    data.helpers.buyGadget();
                                } else {
                                    return false;
                                }
                            }}
                            className={
                                data.money >= data.helpers.getGadgetCost() && data.office.size > 3
                                    ? "btn btn-success"
                                    : "btn btn-success disabled"
                            }
                        >
                            ${data.helpers.getGadgetCost()}
                        </DefaultClickSoundButton>
                    </div>
                </div>
            </div>
        );

        return (
            <div>
                {apartment_description}
                {data.office.size > 1 ? (
                    <div className="flex-container-row">
                        <span className={data.office.size > 1 ? "" : "office-disabled"}>{coffeemaker}</span>
                        <span className={data.office.size > 2 ? "" : "office-disabled"}>{lunch}</span>
                        <span className={data.office.size > 3 ? "" : "office-disabled"}>{gadget}</span>
                    </div>
                ) : (
                    <div />
                )}
            </div>
        );
    }
}

export default Office;
