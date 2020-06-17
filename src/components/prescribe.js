import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import jwt_decode from 'jwt-decode';

class AddMedicine extends Component{
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onMedicineAdd = this.onMedicineAdd.bind(this);

    this.state = {
      dosage: '',
      medicinename: ''
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onMedicineAdd() {
    this.props.addMedicine(this.state.medicinename,this.state.dosage);
    
    this.setState({
      medicinename: '',
      dosage:''
    });
  }

  render(){
      return(
        <form>
          <div className="form-group"> 
            <label> Medicine: </label>
            <input  type="text"
              required
              className="form-control"
              name="medicinename"
              value={this.state.medicinename}
              onChange={this.onChange}
              />
          </div>

          <div className="form-group"> 
            <label> Dosage: </label>
            <input  type="text"
              required
              className="form-control"
              name="dosage"
              value={this.state.dosage}
              onChange={this.onChange}
              />
          </div>
          <div className="form-group">
            <input type="button" value="Add Medicine" className="btn btn-primary" 
              onClick={this.onMedicineAdd}
            />
          </div>

        </form>
      )
  }

}


export default class Prescribe extends Component {
  constructor() {
    super();

    this.onChange = this.onChange.bind(this);
    this.addMedicine = this.addMedicine.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      doctorid: '',
      patientname: '',
      patientage: '',
      medicineList: []
    }
  }

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    this.setState({
      doctorid: decoded._id,
    })
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  addMedicine(medName, dose) {
    const medicine = {
      medicineName: medName,
      dosage: dose
    }
    this.setState({
      medicineList: [...this.state.medicineList, medicine]
    });
  }
  
  removeMedicine(medName) {
    this.setState(prevState => ({
      medicineList: prevState.medicineList.filter(med => med.medicineName !== medName)
  }));
	}

  onSubmit(e) {
    e.preventDefault();
  
    const prescription = {
      doctorId: this.state.doctorid,
      patientName: this.state.patientname,
      patientAge: this.state.patientage,
      medicineList: this.state.medicineList
    };

  axios.post('http://localhost:5000/prescription/add', prescription)
    .then(res => {
      alert("Prescription Id is: "+ res.data);
      this.setState({
        doctorid: '',
        patientname: '',
        patientage: '',
        medicineList: []
      });
    });
  }

  render() {
    return (
      <div>
        <h3 style={{textAlign:"center"}}>Prescribe</h3>
        <AddMedicine  addMedicine={this.addMedicine} />

        <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Medicine</th>
                <th>Dosage</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.medicineList.map((medicine, idx) => (
              <tr key={idx}>
                <td>
                  {medicine.medicineName}
                </td>
                <td>
                  {medicine.dosage}
                </td>
                <td>
                  <Link to="#" onClick={() => { this.removeMedicine(medicine.medicineName) }}>
                    Remove
                  </Link>
                </td>
              </tr>
              ))}  
            </tbody>
          </table>

        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Patient Name: </label>
            <input 
                type="text" 
                className="form-control"
                name="patientname"
                value={this.state.patientname}
                onChange={this.onChange}
                />
          </div>

          <div className="form-group">
            <label>Patient Age: </label>
            <input 
                type="text" 
                className="form-control"
                name="patientage"
                value={this.state.patientage}
                onChange={this.onChange}
                />
          </div>

          <div style={{ display: "flex" }} className="form-group">
            <input style={{ margin: "auto" }}  type="submit" value="Prescribe" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}