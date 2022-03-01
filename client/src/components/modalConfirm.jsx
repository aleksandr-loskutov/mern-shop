/* eslint-disable react/jsx-no-target-blank*/
import React from "react";

// reactstrap components
import { Button, Container, Row, Col, Modal } from "reactstrap";

function ModalConfirm({ modalOpen, setModalOpen, onConfirm }) {
    const confirm = (value) => {
        confirm && onConfirm();
        setModalOpen(false);
    };
    return (
        <>
            <div className="section section-blue javascript-components">
                <Container>
                    <Row id="modals">
                        <Col md="12">
                            <Modal
                                size="sm"
                                isOpen={modalOpen}
                                toggle={() => setModalOpen(false)}
                            >
                                <div className="modal-header no-border-header">
                                    <button
                                        className="close"
                                        type="button"
                                        onClick={() => setModalOpen(false)}
                                    >
                                        ×
                                    </button>
                                </div>
                                <div className="modal-body text-center">
                                    <h5>Вы уверены что хотите удалить?</h5>
                                </div>
                                <div className="modal-footer">
                                    <div className="left-side">
                                        <Button
                                            className="btn-link"
                                            color="default"
                                            type="button"
                                            onClick={() => setModalOpen(false)}
                                        >
                                            Отмена
                                        </Button>
                                    </div>
                                    <div className="divider" />
                                    <div className="right-side">
                                        <Button
                                            className="btn-link"
                                            color="danger"
                                            type="button"
                                            onClick={() => confirm(true)}
                                        >
                                            Удалить
                                        </Button>
                                    </div>
                                </div>
                            </Modal>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default ModalConfirm;
