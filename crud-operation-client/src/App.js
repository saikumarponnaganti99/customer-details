import { useEffect, useState } from "react";
import "./App.css";
import FormTable from "./components/FormTable";
import axios from "axios";

axios.defaults.baseURL = "https://profile-safe-base-server.onrender.com/";

function App() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    email: "",
    mobile: "",
    _id: "",
  });

  const [dataList, setDataList] = useState([]);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handelSubmit = async (event) => {
    event.preventDefault();

    const data = await axios.post("/create-user", formData);

    if (data.data.success) {
      setAddSection(false);
      alert(data.data.message);
      getFetchData();
      setFormData({
        name: "",
        email: "",
        mobile: ""
      })
    }
  };

  const getFetchData = async () => {
    const data = await axios.get("/users");

    if (data.data.success) {
      setDataList(data.data.data);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  const handelDelete = async (id) => {
    const data = await axios.delete("/delete-user/" + id);
    console.log(data);
    if (data.status === 200) {
      getFetchData();
      alert(data.data.message);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault()
    const data = await axios.put("/update-user/" , formDataEdit);
    console.log(data)
    if(data.status === 200){
      getFetchData()
      alert(data.data.message)
      setEditSection(false)
    }
  };

  const handleEdit = (data) => {
    setFormDataEdit(data)
    setEditSection(true)
  }

  const handleEditOnChange = async (e) => {
    const { value, name } = e.target;
    setFormDataEdit((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };



  return (
    <>
      <div className="container">
        <button className="btn btn-add" onClick={() => setAddSection(true)}>
          Add
        </button>

        {addSection && (
          <FormTable
            handleClose={() => setAddSection(false)}
            handelSubmit={handelSubmit}
            handleOnChange={handleOnChange}
            formValue = {formData}
          />
        )}

        {editSection && (
          <FormTable
            handleClose={() => setEditSection(false)}
            handelSubmit={handleUpdate}
            handleOnChange={handleEditOnChange}
            formValue={formDataEdit}
          />
        )}

        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th></th>
              </tr>
            </thead>

            {dataList.map((each) => {
              return (
                <tbody>
                  <tr>
                    <td>{each.name}</td>
                    <td>{each.email}</td>
                    <td>{each.mobile}</td>
                    <td>
                      <button
                        className="btn btn-edit"
                        onClick={() => handleEdit(each)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => handelDelete(each._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
          <div>
            {dataList.length > 0 ? null : <p className="noDataText">No Data</p>}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
