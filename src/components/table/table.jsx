import React from "react";
// import PropTypes from "prop-types";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";
import { Col, Row, Table } from "reactstrap";
// class for table className="ml-auto mr-auto mt-3" md="11"
const TableComponent = ({ columns, data, children }) => {
    return (
        <Row>
            <Col>
                <Table responsive>
                    {children || (
                        <>
                            <TableHeader {...{ columns }} />
                            <TableBody {...{ columns, data }} />
                        </>
                    )}
                </Table>
            </Col>
        </Row>
    );
};
// TableComponent.propTypes = {
//     onSort: PropTypes.func,
//     selectedSort: PropTypes.object,
//     columns: PropTypes.object,
//     data: PropTypes.array,
//     children: PropTypes.array
// };

export default TableComponent;
