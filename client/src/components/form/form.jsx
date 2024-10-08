import { useState } from "react";
import axios from "axios";
import "./form.css";

const Form = () => {
  const [name_state, setName_state] = useState("");
  const [age_state, setAge_state] = useState("");
  const [age_delete_state, setAge_delete_state] = useState("");
  const [age_get_state, setAge_get_state] = useState("");
  const [age_put_state, setAge_put_state] = useState("");
  const [name_put_state, setName_put_state] = useState("");
  const [age_patch_state, setAge_patch_state] = useState("");
  const [name_patch_state, setName_patch_state] = useState("");

  const [post_res_state, setPost_res_state] = useState("");
  const [delete_res_state, setDelete_res_state] = useState("");
  const [get_res_state, setGet_res_state] = useState("");
  const [put_res_state, setPut_res_state] = useState("");
  const [patch_res_state, setPatch_res_state] = useState("");

  function formData_collect(event) {
    if (event.target.id == "name") {
      setName_state(event.target.value);
    } else if (event.target.id == "age") {
      setAge_state(event.target.value);
    } else if (event.target.id === "delete_age") {
      setAge_delete_state(event.target.value);
    } else if (event.target.id === "get_age") {
      setAge_get_state(event.target.value);
    } else if (event.target.id === "put_age") {
      setAge_put_state(event.target.value);
    } else if(event.target.id === "put_name"){
      setName_put_state(event.target.value)
    }else if (event.target.id === "patch_age") {
      setAge_patch_state(event.target.value);
    } else if(event.target.id === "patch_name") {
      setName_patch_state(event.target.value)
    }
  }

  function formData_submit_post(event) {
    event.preventDefault();
    let userData = {
      Name: name_state,
      Age: age_state,
    };
    dataBase_post(userData);
  }

  async function dataBase_post(data1) {
    try {
      let data = await axios.post("/post", data1);
      let element = document.getElementById("p");

      if (data.data.success === true) {
        setPost_res_state("Success");
        element.style.color = "green";
      } else {
        setPost_res_state("False");
        element.style.color = "red";
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function formData_submit_delete(event) {
    event.preventDefault();
    dataBase_delete(age_delete_state);
  }

  async function dataBase_delete(Age) {
    try {
      let data = await axios.delete(`/delete?Age=${Age}`);
      console.log(data);
      let element = document.getElementById("p1");

      if (data.data.success === true) {
        setDelete_res_state("Success");
        element.style.color = "green";
      } else {
        setDelete_res_state("False");
        element.style.color = "red";
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function formData_submit_get(event) {
    event.preventDefault();
    dataBase_get(age_get_state);
  }

  async function dataBase_get(Age) {
    try {
      let data = await axios.get(`/get?Age=${Age}`);
      setGet_res_state(data.data.msg);
    } catch (error) {
      console.error(error);
    }
  }

  async function formData_submit_put(event) {
    event.preventDefault();
    let obj = {
      Name: name_put_state,
    };
    dataBase_put(obj);
  }

  async function dataBase_put(Age) {
    try {
      let data = await axios.put(
        `/put?Age=${age_put_state}`, Age
      );
      setPut_res_state(data.data.msg);
    } catch (error) {
      console.error(error);
    }
  }

  async function formData_submit_patch(event) {
    event.preventDefault();
    let obj = {
      Name: name_patch_state,
    };
    dataBase_patch(obj);
  }

  async function dataBase_patch(Age) {
    try {
      let data = await axios.patch(
        `/patch?Age=${age_patch_state}`, Age
      );
      setPatch_res_state(data.data.msg);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <form>
        <h3>Post Data Form</h3>
        <div>
          <label htmlFor="name">Enter Your Name - </label>
          <input id="name" type="text" onChange={formData_collect} />
        </div>
        <div>
          <label htmlFor="age">Enter Your Age - </label>
          <input id="age" type="number" onChange={formData_collect} />
        </div>
        <div>
          <button onClick={formData_submit_post}>Submit</button>
        </div>
        <div>
          {/* <p>{JSON.stringify(post_res_state)}</p> */}
          <p id="p">{post_res_state}</p>
        </div>
      </form>
      <hr />
      <div>
        <form>
          <h3>Delete Data Form</h3>
          <div>
            <label htmlFor="delete_age">Enter Your Age</label>
            <input id="delete_age" onChange={formData_collect} type="text" />
          </div>
          <div>
            <button onClick={formData_submit_delete}>Delete</button>
          </div>
          <div>
            {/* <p>{JSON.stringify(post_res_state)}</p> */}
            <p id="p1">{JSON.stringify(delete_res_state)}</p>
          </div>
        </form>
      </div>
      <hr />
      <div>
        <form>
          <h3>Get Data Form</h3>
          <div>
            <label htmlFor="get_age">Enter Your Age</label>
            <input id="get_age" onChange={formData_collect} type="text" />
          </div>
          <div>
            <button onClick={formData_submit_get}>Get</button>
          </div>
          <div>
            {/* <p>{JSON.stringify(post_res_state)}</p> */}
            <p id="p2">{JSON.stringify(get_res_state)}</p>
          </div>
        </form>
      </div>
      <hr />
      <div>
        <form>
          <h3>Put Data Form</h3>
          <div>
            <label htmlFor="put_age">Enter Your Age</label>
            <input id="put_age" onChange={formData_collect} type="text" />
          </div>
          <div>
            <label htmlFor="put_name">Enter Your Name</label>
            <input id="put_name" onChange={formData_collect} type="text" />
          </div>
          <div>
            <button onClick={formData_submit_put}>Put</button>
          </div>
          <div>
            {/* <p>{JSON.stringify(post_res_state)}</p> */}
            <p id="p2">{JSON.stringify(put_res_state)}</p>
          </div>
        </form>
      </div>
      <div>
      <form>
          <h3>Patch Data Form</h3>
          <div>
            <label htmlFor="patch_age">Enter Your Age</label>
            <input id="patch_age" onChange={formData_collect} type="text" />
          </div>
          <div>
            <label htmlFor="patch_name">Enter Your Name</label>
            <input id="patch_name" onChange={formData_collect} type="text" />
          </div>
          <div>
            <button onClick={formData_submit_patch}>Patch</button>
          </div>
          <div>
            {/* <p>{JSON.stringify(post_res_state)}</p> */}
            <p id="p2">{JSON.stringify(patch_res_state)}</p>
          </div>
        </form>
      </div>
      <hr />
      <hr />
    </div>
  );
};

export default Form;
