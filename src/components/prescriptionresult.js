import React, { Component } from 'react'
import  { Redirect } from 'react-router-dom'

class PrescriptionResult extends Component {
  constructor(props) {
    super(props);

    //this.onChange = this.onChange.bind(this);
    //this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      prescriptionid: ''
    }
  }

  componentDidMount() {
    this.setState({
      prescriptionid: props.prescriptionId,
    })
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">Prescribed Successfully</h1>
            <h3 className="text-center">Prescription Id : {this.state.prescriptionid} </h3>
          </div>
        </div>
      </div>
    )
  }
}

export default PrescriptionResult;
