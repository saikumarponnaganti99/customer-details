import React from "react";
import '../App.css'
import { MdClose } from "react-icons/md";

const FormTable= props => {
    const {handleClose, handelSubmit, handleOnChange, formValue} = props
  return (
    <div className="addContainer">
      <form id="form" onSubmit={handelSubmit}>
        <div className="close-btn" onClick={handleClose}>
          <MdClose />
        </div>
        <label htmlFor="name">Name : </label>
        <input type="text" id="name" name="name" onChange={handleOnChange} value={formValue.name} />

        <label htmlFor="email">Email : </label>
        <input type="text" id="email" name="email" onChange={handleOnChange} value={formValue.email} />

        <label htmlFor="mobile">Mobile : </label>
        <input
          type="text"
          id="mobile"
          name="mobile"
          onChange={handleOnChange} value={formValue.mobile}
        />

        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormTable;
