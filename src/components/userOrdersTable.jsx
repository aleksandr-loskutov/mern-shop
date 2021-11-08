import React from "react";
import SectionTables from "../kit/views/index-sections/SectionTables";
import {
    Button,
    Col,
    FormGroup,
    Input,
    Label,
    Row,
    Table,
    UncontrolledTooltip
} from "reactstrap";

function UserOrdersTable(props) {
    return (
        <Row>
            <Col className="ml-auto mr-auto mt-3" md="8">
                <Table responsive>
                    <thead>
                        <tr>
                            <th className="text-center">#</th>
                            <th>Name</th>
                            <th>Job Position</th>
                            <th>Since</th>
                            <th className="text-right">Salary</th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="text-center">1</td>
                            <td>Andrew Mike</td>
                            <td>Develop</td>
                            <td>2013</td>
                            <td className="text-right">€ 99,225</td>
                            <td className="td-actions text-right">
                                <Button
                                    className="btn-link mr-1"
                                    color="info"
                                    data-toggle="tooltip"
                                    id="tooltip542628903"
                                    size="sm"
                                    type="button"
                                >
                                    <i className="fa fa-user" />
                                </Button>
                                <UncontrolledTooltip
                                    delay={0}
                                    placement="top"
                                    target="tooltip542628903"
                                >
                                    View Profile
                                </UncontrolledTooltip>
                                <Button
                                    className="btn-link mr-1"
                                    color="success"
                                    data-toggle="tooltip"
                                    id="tooltip278266693"
                                    size="sm"
                                    type="button"
                                >
                                    <i className="fa fa-edit" />
                                </Button>
                                <UncontrolledTooltip
                                    delay={0}
                                    placement="top"
                                    target="tooltip278266693"
                                >
                                    Edit Profile
                                </UncontrolledTooltip>
                                <Button
                                    className="btn-link"
                                    color="danger"
                                    data-toggle="tooltip"
                                    id="tooltip16493734"
                                    size="sm"
                                    type="button"
                                >
                                    <i className="fa fa-times" />
                                </Button>
                                <UncontrolledTooltip
                                    delay={0}
                                    placement="top"
                                    target="tooltip16493734"
                                >
                                    Remove
                                </UncontrolledTooltip>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-center">2</td>
                            <td>John Doe</td>
                            <td>Design</td>
                            <td>2012</td>
                            <td className="text-right">€ 89,241</td>
                            <td className="td-actions text-right">
                                <Button
                                    className="btn-link mr-1"
                                    color="info"
                                    data-toggle="tooltip"
                                    id="tooltip835309420"
                                    size="sm"
                                    type="button"
                                >
                                    <i className="fa fa-user" />
                                </Button>
                                <UncontrolledTooltip
                                    delay={0}
                                    placement="top"
                                    target="tooltip835309420"
                                >
                                    View Profile
                                </UncontrolledTooltip>
                                <Button
                                    className="btn-link mr-1"
                                    color="success"
                                    data-toggle="tooltip"
                                    id="tooltip287674338"
                                    size="sm"
                                    type="button"
                                >
                                    <i className="fa fa-edit" />
                                </Button>
                                <UncontrolledTooltip
                                    delay={0}
                                    placement="top"
                                    target="tooltip287674338"
                                >
                                    Edit Profile
                                </UncontrolledTooltip>
                                <Button
                                    className="btn-link"
                                    color="danger"
                                    data-toggle="tooltip"
                                    id="tooltip479370246"
                                    size="sm"
                                    type="button"
                                >
                                    <i className="fa fa-times" />
                                </Button>
                                <UncontrolledTooltip
                                    delay={0}
                                    placement="top"
                                    target="tooltip479370246"
                                >
                                    Remove
                                </UncontrolledTooltip>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-center">3</td>
                            <td>Alex Mike</td>
                            <td>Design</td>
                            <td>2010</td>
                            <td className="text-right">€ 92,144</td>
                            <td className="td-actions text-right">
                                <Button
                                    className="btn-link mr-1"
                                    color="info"
                                    data-toggle="tooltip"
                                    id="tooltip594620504"
                                    size="sm"
                                    type="button"
                                >
                                    <i className="fa fa-user" />
                                </Button>
                                <UncontrolledTooltip
                                    delay={0}
                                    placement="top"
                                    target="tooltip594620504"
                                >
                                    View Profile
                                </UncontrolledTooltip>
                                <Button
                                    className="btn-link mr-1"
                                    color="success"
                                    data-toggle="tooltip"
                                    id="tooltip716621284"
                                    size="sm"
                                    type="button"
                                >
                                    <i className="fa fa-edit" />
                                </Button>
                                <UncontrolledTooltip
                                    delay={0}
                                    placement="top"
                                    target="tooltip716621284"
                                >
                                    Edit Profile
                                </UncontrolledTooltip>
                                <Button
                                    className="btn-link"
                                    color="danger"
                                    data-toggle="tooltip"
                                    id="tooltip329473987"
                                    size="sm"
                                    type="button"
                                >
                                    <i className="fa fa-times" />
                                </Button>
                                <UncontrolledTooltip
                                    delay={0}
                                    placement="top"
                                    target="tooltip329473987"
                                >
                                    Remove
                                </UncontrolledTooltip>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-center">4</td>
                            <td>Mike Monday</td>
                            <td>Marketing</td>
                            <td>2013</td>
                            <td className="text-right">€ 49,990</td>
                            <td className="td-actions text-right">
                                <Button
                                    className="btn-link mr-1"
                                    color="info"
                                    data-toggle="tooltip"
                                    id="tooltip673879542"
                                    size="sm"
                                    type="button"
                                >
                                    <i className="fa fa-user" />
                                </Button>
                                <UncontrolledTooltip
                                    delay={0}
                                    placement="top"
                                    target="tooltip673879542"
                                >
                                    View Profile
                                </UncontrolledTooltip>
                                <Button
                                    className="btn-link mr-1"
                                    color="success"
                                    data-toggle="tooltip"
                                    id="tooltip661394722"
                                    size="sm"
                                    type="button"
                                >
                                    <i className="fa fa-edit" />
                                </Button>
                                <UncontrolledTooltip
                                    delay={0}
                                    placement="top"
                                    target="tooltip661394722"
                                >
                                    Edit Profile
                                </UncontrolledTooltip>
                                <Button
                                    className="btn-link"
                                    color="danger"
                                    data-toggle="tooltip"
                                    id="tooltip755642510"
                                    size="sm"
                                    type="button"
                                >
                                    <i className="fa fa-times" />
                                </Button>
                                <UncontrolledTooltip
                                    delay={0}
                                    placement="top"
                                    target="tooltip755642510"
                                >
                                    Remove
                                </UncontrolledTooltip>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-center">5</td>
                            <td>Paul Dickens</td>
                            <td>Communication</td>
                            <td>2016</td>
                            <td className="text-right">€ 69,201</td>
                            <td className="td-actions text-right">
                                <Button
                                    className="btn-link mr-1"
                                    color="info"
                                    data-toggle="tooltip"
                                    id="tooltip836884478"
                                    size="sm"
                                    type="button"
                                >
                                    <i className="fa fa-user" />
                                </Button>
                                <UncontrolledTooltip
                                    delay={0}
                                    placement="top"
                                    target="tooltip836884478"
                                >
                                    View Profile
                                </UncontrolledTooltip>
                                <Button
                                    className="btn-link mr-1"
                                    color="success"
                                    data-toggle="tooltip"
                                    id="tooltip531808427"
                                    size="sm"
                                    type="button"
                                >
                                    <i className="fa fa-edit" />
                                </Button>
                                <UncontrolledTooltip
                                    delay={0}
                                    placement="top"
                                    target="tooltip531808427"
                                >
                                    Edit Profile
                                </UncontrolledTooltip>
                                <Button
                                    className="btn-link"
                                    color="danger"
                                    data-toggle="tooltip"
                                    id="tooltip875159762"
                                    size="sm"
                                    type="button"
                                >
                                    <i className="fa fa-times" />
                                </Button>
                                <UncontrolledTooltip
                                    delay={0}
                                    placement="top"
                                    target="tooltip875159762"
                                >
                                    Remove
                                </UncontrolledTooltip>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Col>
        </Row>
    );
}

export default UserOrdersTable;
