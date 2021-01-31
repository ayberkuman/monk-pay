import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from 'lodash'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import API, { headers } from "../utils/API";
import { scrollToTop, currency, formatMoney } from "../utils/helper";
import InputWLabel from "../utils/components/InputWLabel";

export class Expense extends Component {
  constructor(props){
    super(props)
    this.state={
      processRows: [],
      doctorRows: [],
      date: '',
    }
  }

  
  componentDidMount = () => {
    scrollToTop();
    this.props.headerTitleSet(this.props.translate('analyses'));
    this.getData()
  };

  getData = ()=>{
    this.props.pageLoadingSet(true);
    const date = this.state.date !== '' ? moment(this.state.date).format('YYYY-MM-DD') : ''
    API.get(`/Dashboard/Analysis?date=${date}`, {
      headers: { ...headers, Authorization: `Bearer ${this.props.user.token}`},
    })
      .then((res) => {
        this.props.pageLoadingSet(false);
        const { data } = res;
        this.setState({
          processRows: data.processAnalyses,
          doctorRows: data.doctorAnalyses
        })
      })
      .catch((err) => {
        this.props.pageLoadingSet(false);
      });
  }

  render() {
    return (
      <div className="Payments">
        <div className="align-items-center justify-content-between mt-4 mb-4">
          <div className="row">
            <div className="col-md-6 ml-auto">
              <DatePicker
                selected={this.state.date}
                onChange={(date) => {
                  console.log(date)
                  this.setState(
                    {
                      date: _.isNull(date) ? '' : date,
                    },
                    () => {
                      this.getData();
                    }
                  );
                }}
                placeholderText="Tarih seç"
                className="w-100 min"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="row">
            <div className="col-md-6">
              <div className="react-infinite-table react-infinite-table-fill example-table rounded table-bordered ">
                <div className="row">
                  <div className="col-md-12">
                    <h3 className="w-100 p-3 pt-4">Tedavilere Göre</h3>
                  </div>
                  <div className="col-md-12">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th className="react-infinite-table-col-0">
                            Tedavi Adı
                          </th>
                          <th className="react-infinite-table-col-1 text-right">
                            Ciro
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.processRows.map((i, index) => (
                          <tr key={index + "a"} id={"rowElement" + i.processId}>
                            <td className="react-infinite-table-col-0 pt-3 pb-3">
                              {i.process.name}
                            </td>
                            <td className="react-infinite-table-col-0 pt-3 pb-3 text-right">
                              {i.amount} TL
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="react-infinite-table react-infinite-table-fill example-table rounded table-bordered ">
                <div className="row">
                  <div className="col-md-12">
                    <h3 className="w-100 p-3 pt-4">Doktora Göre</h3>
                  </div>
                  <div className="col-md-12">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th className="react-infinite-table-col-0">
                            Doktor Adı
                          </th>
                          <th className="react-infinite-table-col-1 text-right">
                            Ciro
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.doctorRows.map((i, index) => (
                          <tr key={index + "a"} id={"rowElement" + i.doctorId}>
                            <td className="react-infinite-table-col-0 pt-3 pb-3">
                              {i.doctor.fullName}
                            </td>
                            <td className="react-infinite-table-col-0 pt-3 pb-3 text-right">
                              {i.amount} TL
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Expense
