import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class PrescriptionList extends Component{
  render(){
      return(
        <div>
          
           Patient Name: {this.props.prescription.patientName}
           <br /> <br />
           Patient Age: {this.props.prescription.patientAge}
           <br /><br />
           Doctor Name: {this.props.doctorName}
           <br /> <br />
    
          <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Medicine</th>
              <th>Dosage</th>
            </tr>
          </thead>
          <tbody>
            {this.props.prescription.medicineList.map((medicine, idx) => (
            <tr key={idx}>
              <td>
                {medicine.medicineName}
              </td>
              <td>
                {medicine.dosage}
              </td>
            </tr>
            ))}  
          </tbody>
          </table>
        </div>
      )
  }

}


export default class ViewPrescription extends Component {
  constructor() {
    super();

    this.onChangePrescriptionid = this.onChangePrescriptionid.bind(this);
    this.onViewPrescription = this.onViewPrescription.bind(this);

    this.state = {
      prescriptionid:''
    }
  }

  onChangePrescriptionid(e) {
    this.setState({
      prescriptionid: e.target.value
    });
  }  

  onViewPrescription(e) {
    axios.get('http://localhost:5000/prescription/'+this.state.prescriptionid)
    .then(prescription => {
        axios.get('http://localhost:5000/doctorInfo/'+prescription.data.doctorId)
        .then(doctorInfo => {
          ReactDOM.render(
            <PrescriptionList 
              prescription={prescription.data} 
              doctorName={doctorInfo.data} />,
              document.getElementById('prescTable')
            );
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
       console.log(error);
    });
    
  }

  render() {
    return (
      <div>
        <h3 style={{textAlign:"center"}}>View Prescription</h3>

        <form>
          <div className="form-group"> 
            <label> Prescription Id: </label>
            <input  type="text"
              required
              className="form-control"
              value={this.state.precsriptionid}
              onChange={this.onChangePrescriptionid}
              />
          </div>
          <div className="form-group">
            <input type="button" value="View Prescription" className="btn btn-primary" 
              onClick={this.onViewPrescription}
            />
          </div>
        </form>
        <div id="prescTable"> </div>
       </div>
    )
  }
}