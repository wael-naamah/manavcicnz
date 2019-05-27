import React from 'react';
import { Nav, Navbar, NavDropdown, Badge, Modal, Button } from 'react-bootstrap';
import { FaCartArrowDown } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { MdPerson } from "react-icons/md";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout , getInvoice } from '../actions';
import SweetAlert from 'react-bootstrap-sweetalert';


class Header extends React.Component {

    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
            logoutAlert: null
        };
    }

    componentDidMount(){
        this.props.getInvoice(this.props.phone);
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    onConfirm() {
        this.props.logout();
        this.setState({
            logoutAlert: null
        });
    }

    onCancel() {
        this.setState({
            logoutAlert: null
        });
    }

    handleLogOut(e) {
        e.preventDefault();
        const getAlert = () => (
            <SweetAlert
                custom
                showCancel
                confirmBtnText="Evet"
                cancelBtnText="Hayır"
                confirmBtnBsStyle="primary"
                cancelBtnBsStyle="default"
                customIcon="thumbs-up.jpg"
                title="Çıkış yapmak ister misiniz?"
                onConfirm={this.onConfirm.bind(this)}
                onCancel={this.onCancel.bind(this)}
            >
            </SweetAlert>
        );

        this.setState({
            logoutAlert: getAlert()
        });

    }

    render() {
        const title = <span><MdPerson size={32} /> {this.props.name} </span>
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" variant="dark" style={{ background: '#17a2b8' }} >
                    <Navbar.Brand href="/">ürünler sayfası</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                        </Nav>
                        <Nav>
                            <Link to="/orders" className='nav-link' >Emirler</Link>
                            <Link to="/cart" className='nav-link' >
                                < FaCartArrowDown color="white" size={32} />
                                <span>  </span><Badge variant="success">{this.props.cart.length}</Badge>
                            </Link>
                        </Nav>
                        <NavDropdown title={title} id="nav-dropdown"  >
                            <NavDropdown.Item href="#action/3.1" onClick={this.handleShow} >fatura</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4" onClick={this.handleLogOut.bind(this)} > < IoIosLogOut color="black" size={32} /> çıkış Yap </NavDropdown.Item>
                        </NavDropdown>

                    </Navbar.Collapse>
                </Navbar>
                <Modal show={this.state.show} onHide={this.handleClose} >
                    <Modal.Header closeButton  >
                        <Modal.Title style={{ color : 'white' }} >Hoşgeldiniz {this.props.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><h3>fatura detayları</h3>
                        <p> tüm miktarlar   <span style={{paddingLeft: '25px'}} >{this.props.amount} TL </span></p>
                        <p> tüm ödemeler  <span style={{paddingLeft: '25px'}} > {this.props.payment} TL </span> </p>
                        <p>fatura <span style={{paddingLeft: '25px'}} > {this.props.invoice} TL</span></p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                     </Button>
                    </Modal.Footer>
                </Modal>
                {this.state.logoutAlert}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart.cart,
        name: state.auth.user_name,
        amount: state.orders.total_amount,
        payment: state.orders.total_payment,
        invoice: state.orders.total_invoice,
        phone: state.auth.userPhone
    }
}

export default connect(mapStateToProps, { logout , getInvoice })(Header)