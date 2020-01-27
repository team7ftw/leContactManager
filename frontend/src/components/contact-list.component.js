import React, { Component } from 'react';

class ContactList extends Component {
    render() {
        return(
            <div className="mt-4">
                <h2 className="mb-4">All Contacts</h2>

                <table className="table table-striped text-light borderless">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Last</th>
                        <th scope="col">First</th>
                        <th scope="col">Phone</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Rhodes</td>
                        <td>Candace</td>
                        <td>407 555 5555</td>
                        <td><a href="#">Edit</a></td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Bernard</td>
                        <td>Lorence</td>
                        <td>407 555 5555</td>
                        <td><a href="#">Edit</a></td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Cortez</td>
                        <td>Alicia</td>
                        <td>407 555 5555</td>
                        <td><a href="#">Edit</a></td>
                    </tr>
                </tbody>
            </table>
            <p className="muted">This table just for design reference purposes it's not accessing anything yet.</p>
        </div>
        );
    }
}

export default ContactList;