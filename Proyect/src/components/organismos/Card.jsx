import axios from "axios";
import { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import useAuth from "../../hooks/useAuth";
import Modal from "../moleculas/Modal";

const PaymentForms = ({ dataFactura }) => {
  const [state, setState] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focus: "",
  });
  const [openModal, setOpenModal] = useState(false);

  const { user } = useAuth();
  const handleInputChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleFocusChange = (e) => {
    setState({
      ...state,
      focus: e.target.name,
    });
  };

  const processPayment = (e) => {
    e.preventDefault();
    if (
      state.cvc != "" &&
      state.number != "" &&
      state.name != "" &&
      state.expiry != "" &&
      dataFactura.plan != ""
    ) {
      axios
        .put(`http://localhost:2025/api/user/${user.userName}`, dataFactura)
        .then((res) => {
          console.log(res.data);
        });
      setOpenModal(true);
    } else {
      console.log("error");
    }
  };

  return (
    <div className="card text-white">
      <div className="card-body">
        <Cards
          number={state.number}
          name={state.name}
          expiry={state.expiry}
          cvc={state.cvc}
          focused={state.focus}
        />
        <form>
          <div className="form-group">
            <label htmlFor="number">Número de la tarjeta</label>
            <input
              type="text"
              name="number"
              id="number"
              maxLength="16"
              className="form-control styleInputs"
              onChange={handleInputChange}
              onFocus={handleFocusChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              name="name"
              id="name"
              maxLength="30"
              className="form-control styleInputs"
              onChange={handleInputChange}
              onFocus={handleFocusChange}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="expiry">Fecha de expiración</label>
              <input
                type="text"
                name="expiry"
                id="expiry"
                maxLength="4"
                className="form-control styleInputs"
                onChange={handleInputChange}
                onFocus={handleFocusChange}
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="cvc">CVC</label>
              <input
                type="text"
                name="cvc"
                id="cvc"
                maxLength="4"
                className="form-control styleInputs"
                onChange={handleInputChange}
                onFocus={handleFocusChange}
                required
              />
            </div>
          </div>

          <button
            onClick={processPayment}
            type="button"
            className="btn btn-success btn-block btn-lg"
          >
            Pagar
          </button>
        </form>
      </div>
      <Modal
        open={openModal}
        text={"Compra Realizada con Exito 😎💪"}
        dir={"profile"}
      />
    </div>
  );
};

export default PaymentForms;
