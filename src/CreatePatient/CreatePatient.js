import React, { Component } from "react";
import InputWLabel from "../utils/components/InputWLabel";
import { scrollToTop } from "../utils/helper";
import API, { headers } from "../utils/API";
import { authRoutes } from "../App/routes";
import { validateInput } from "../utils/helper";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export class CreatePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tckn: "",
      firstName: "",
      lastName: "",
      eMail: "",
      phoneNumber: "",
      address: "",
      tcknError: "",
      firstError: "",
      lastError: "",
      eMailError: "",
      phoneNumberError: "",
      addressError: "",
    };
  }

  componentDidMount = () => {
    scrollToTop();
    setTimeout(() => {
      this.props.headerTitleSet(this.props.translate("payments"));
    }, 400);
  };

  componentWillUnmount() {
    clearTimeout(this._loadRowsTimeout);
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value }, () => {
      setTimeout(this.handleCheck, 20);
    });
  };

  handleCheck = () => {};
  postData = (redirect) => {
    console.log(this.state);
    const { tckn, firstName, lastName, eMail, phoneNumber, address } =
      this.state;
    this.setState(
      {
        firstNameError: firstName === "" ? "Lütfen adınızı giriniz" : "",
        lastNameError: lastName === "" ? "Lütfen soyadınızı giriniz" : "",
        eMailError: !validateInput("email", eMail)
          ? "Geçerli bir e-posta adresi giriniz"
          : "",
      },
      () => {
        const { firstNameError, lastNameError, eMailError } = this.state;
        if (
          firstNameError === "" &&
          lastNameError === "" &&
          eMailError === ""
        ) {
          this.props.pageLoadingSet(true);
          const data = {
            user: {
              identityNumber: tckn,
              email: eMail,
              phoneNumber: phoneNumber,
              firstName,
              lastName,
              address: address,
            },
          };

          API.post("/Account/Addpassion", data, {
            headers: {
              ...headers,
              Authorization: `Bearer ${this.props.user.token}`,
            },
          })

            .then((res) => {
              this.props.pageLoadingSet(false);
              if (redirect === "pay") {
                this.props.history.push(
                  authRoutes.addTreatment.links[this.props.lang].replace(
                    ":id",
                    res.data.id
                  )
                );
              } else {
                this.props.history.push(
                  authRoutes.payments.links[this.props.lang]
                );
              }
            })
            .catch((err) => {
              this.props.pageLoadingSet(false);
              if (err.response.data.errors.Email) {
                alert(err.response.data.errors.Email[0]);
              }
              if (err.response.data.errors.IdentityNumber) {
                alert(err.response.data.errors.IdentityNumber[0]);
              }
              if (err.response.data.errors.PhoneNumber) {
                alert(err.response.data.errors.PhoneNumber[0]);
              }
            });
        }
      }
    );
  };
  save = () => {
    this.postData();
  };
  saveAndPay = () => {
    this.postData("pay");
  };
  render() {
    console.log(this.state.phoneNumber);
    return (
      <div className="Payments">
        <div className="align-items-center justify-content-between mt-4 mb-4">
          <div className="row">
            <div className="col-md-12 mb-2">
              <h1>Kayıt Oluşturma</h1>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          {/* <div className="col-md-4 mt-2">
            <InputWLabel
              classes="mt-3"
              type="text"
              name="tckn"
              id="tckn"
              label="Kimlik Numarası"
              placeholder="Kimlik Numarası"
              value={this.state.tckn}
              setValue={this.handleChange}
              inputRef={this.tcknRef}
              tabIndex={1}
              errorMessage={this.state.tcknError}
            />
          </div> */}
          <div className="col-md-3 mt-2">
            <InputWLabel
              classes="mt-3"
              type="text"
              name="firstName"
              id="firstName"
              label="Ad"
              placeholder="Ad"
              value={this.state.firstName}
              setValue={this.handleChange}
              inputRef={this.firstNameRef}
              tabIndex={1}
              errorMessage={this.state.firstNameError}
            />
          </div>
          <div className="col-md-3 mt-2">
            <InputWLabel
              classes="mt-3"
              type="text"
              name="lastName"
              id="lastName"
              label="Soyad"
              placeholder="Soyad"
              value={this.state.lastName}
              setValue={this.handleChange}
              inputRef={this.lastNameRef}
              tabIndex={1}
              errorMessage={this.state.lastNameError}
            />
          </div>
          <div className="col-md-3"></div>
          <div className="col-md-6 mt-2">
            <label style={{ fontSize: "16px", marginBottom: "5px" }}>
              Cep Telefonu
            </label>
            <PhoneInput
              placeholder="Cep telefonu"
              country={"tr"}
              containerStyle={{
                borderRadius: "8px",
                color: "#474555",
              }}
              inputStyle={{
                height: "58px",
                width: "660px",
              }}
              specialLabel="cep"
              label="Cep Telefonu"
              name="phoneNumber"
              ccName="cc"
              value={this.state.phoneNumber}
              onChange={(phone) => {
                this.setState({
                  phoneNumber: phone,
                });
              }}
              ccValue={this.state.phoneNumber.cc}
              maxLength={10}
            />
          </div>
          {/* <div className="col-md-6 mt-2">
            <InputWLabel
              classes="mt-3"
              type="phone"
              name="phoneNumber"
              id="phoneNumber"
              label="Telefon"
              placeholder="Telefon"
              value={this.state.phoneNumber}
              setValue={this.handleChange}
              inputRef={this.phoneNumberRef}
              tabIndex={1}
              errorMessage={this.state.phoneNumberError}
            />
          </div> */}
          <div className="col-md-3 mt-2"></div>
          <div className="col-md-6 mt-5">
            <InputWLabel
              classes="mt-3"
              type="email"
              name="eMail"
              id="eMail"
              label="E-posta"
              placeholder="E-posta"
              value={this.state.eMail}
              setValue={this.handleChange}
              inputRef={this.eMailRef}
              tabIndex={1}
              errorMessage={this.state.eMailError}
            />
          </div>
          {/* <div className="col-md-8 mt-2">
            <InputWLabel
              classes="mt-3"
              type="text"
              name="address"
              id="address"
              label="Adres"
              placeholder="Adres"
              value={this.state.address}
              setValue={this.handleChange}
              inputRef={this.addressRef}
              tabIndex={1}
              errorMessage={this.state.addressError}
            />
          </div> */}
        </div>
        <div className="row">
          <div className="col-md-12">
            <button
              className="primary-button d-inline-flex"
              onClick={() => this.save()}
            >
              Kayıt Al
            </button>
            <button
              className="primary-white-button d-inline-flex ml-4"
              onClick={() => this.saveAndPay()}
            >
              Kayıt Al ve Ödeme Al
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePatient;
