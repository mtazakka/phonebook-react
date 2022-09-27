import React, { Component } from "react"

export default class ContactItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isEdit: false,
            name: props.contact.name,
            phone: props.contact.phone
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleUpdate = () => {
        this.props.update(this.state.name, this.state.phone)
        this.setState({ isEdit: false })
    }

    render() {
        if (this.state.isEdit) {
            return (
                <tr>
                    <td>{this.props.no}</td>
                    <td>
                        <input name="name" type="text" value={this.state.name} onChange={this.handleInputChange} />
                    </td>
                    <td>
                        <input name="phone" type="text" value={this.state.phone} onChange={this.handleInputChange} />
                    </td>
                    <td>
                        <button className="btn btn-primary" type="button"
                            onClick={this.handleUpdate}>
                            SAVE
                        </button>
                        <button className="btn btn-warning" type="button"
                            onClick={() => this.setState({ isEdit: false })}>
                            CANCEL
                        </button>
                    </td>
                </tr>
            )
        } else {
            return (
                <tr>
                    <td>{this.props.no}</td>
                    <td>
                        {this.props.contact.name}
                    </td>
                    <td>
                        {this.props.contact.phone}
                    </td>
                    <td>
                        <button className="btn btn-success" type="button"
                            onClick={() => this.setState({ isEdit: true })}>
                            EDIT
                        </button>
                        <button className={this.props.contact.sent ? "btn btn-danger" : "btn btn-warning"} type="button"
                            onClick={this.props.contact.sent ? this.props.remove : this.props.resend}>
                            {this.props.contact.sent ? "DELETE" : "RESEND"}
                        </button>
                    </td>
                </tr>
            )
        }
    }
} 