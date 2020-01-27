import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Button from 'react-bootstrap/Button';

class NewContact extends Component {
    // Component constructor
    constructor(props) {
        super(props);

        // Set component intial state
        this.state = {
            c_firstname: '',
            c_lastname: '',
            c_phone: '',
            c_birthdate: '',
            c_address: ''
        }

        // Bind event listeners
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeBirthdate = this.onChangeBirthdate.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
    }

    render() {
        // TODO: Form validation
        return(
            <div className="mt-4">
                <h2 className="mb-4">Create a New Contact</h2>
                <Form onSubmit={this.onSubmit}>
                    <Row>
                        <Col className="my-2 col-12 col-md-6">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="First" 
                                value={this.state.c_firstname} 
                                onChange={this.onChangeFirstName} 
                            />
                        </Col>

                        <Col className="my-2 col-12 col-md-6">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Last" 
                                value={this.state.c_lastname} 
                                onChange={this.onChangeLastName} 
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col className="my-2 col-12 col-md-6">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="(123) 456-7890"
                                value={this.state.c_phone} 
                                onChange={this.onChangePhone}
                            />
                        </Col>

                        <Col className="my-2 col-12 col-md-6">
                            <Form.Label>Birthday</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="YYYY-MM-DD"
                                value={this.state.c_birthdate}
                                onChange={this.onChangeBirthdate} 
                            />
                        </Col>
                    </Row>

                    <Form.Group>
                        <Form.Label>Address</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            placeholder="1234 Main St" 
                            rows="2"
                            value={this.state.c_address}
                            onChange={this.onChangeAddress}
                        />
                    </Form.Group>

                    <Button variant="outline-fire mt-4" type="submit">
                        Create
                    </Button>
                </Form>
            </div>
        );
    }

    // Events
    onSubmit(e) {
        // Prevent page reload
        e.preventDefault();

        // TODO: POST to API
        console.log(`Form submitted:`);
        console.log(`Contact name: ${this.state.c_firstname} ${this.state.c_lastname}`);

        // Reset form after submit
        this.setState({
            c_firstname: '',
            c_lastname: '',
            c_phone: '',
            c_birthdate: '',
            c_address: ''
        });
    }

    onChangeFirstName(e) {
        this.setState({
            c_firstname: e.target.value
        });
    }

    onChangeLastName(e) {
        this.setState({
            c_lastname: e.target.value
        });
    }

    onChangeAddress(e) {
        this.setState({
            c_address: e.target.value
        });
    }

    onChangeBirthdate(e) {
        this.setState({
            c_birthdate: e.target.value
        });
    }

    onChangePhone(e) {
        this.setState({
            c_phone: e.target.value
        });
    }
}

export default NewContact;