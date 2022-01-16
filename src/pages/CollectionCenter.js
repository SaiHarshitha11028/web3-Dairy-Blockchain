import React, { useState, useEffect } from "react";
import web3 from "./web3";
import data from "./CollectionCenterData";
import { Form, Button, InputGroup, FormControl, Table } from "react-bootstrap";
import "../App.css";

function CollectionCenter(props) {
  // async componentDidMount() {
  //   const centerId = await data.methods.centerId().call();
  // }

  var [centerId, setCenterId] = useState();
  var [milk, setMilk] = useState();
  var [fat, setFat] = useState();
  var [farmerId, setFarmerId] = useState();
  var [quantity, setQuantity] = useState();
  var [message, setMessage] = useState();
  var [id, setId] = useState();
  var [history, setHistory] = useState("");
  var [header, setHeader] = useState("");
  var val;

  useEffect(async () => {
    var TM = await data.methods.getTotalQuantity().call();
    setMilk(TM);
    
    var id = await data.methods.centerId().call();
    setCenterId(id);
  }, []);

  const onEnter = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    // console.log(accounts[0]);
    setMessage("Please Wait...");
    await data.methods.addMilk(farmerId, quantity, fat).send({ from: accounts[0] });
    setMessage("Milk Added Successfully ✓✓");
  };

  const getHistory = async (event) => {
    event.preventDefault();
    // console.log(id);
    const accounts = await web3.eth.getAccounts();
    const res = await data.methods.getDataByID(id).call({ from: accounts[0] });
    setHistory([]);
    // console.log(res);

    const val = (
      <Table
        striped
        bordered
        hover
        style={{ width: "600px", marginLeft: "30px" }}
      >
        <thead>
          <tr>
            <th> Time </th>
            <th> Quantity </th>
            <th> Fat </th>
          </tr>
        </thead>

        <tbody>
          {res.map((row, pos) => {
            return (
              <tr>
                <td>{timeConverter(row[0])}</td>
                <td>{row[1]}</td>
                <td>{row[2]}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );

    setHistory(val);
  };

  function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time =
      date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
    return time;
  }

  // async function genrateQR() {
  //   const accounts = await web3.eth.getAccounts();
  //   const totalData = await data.methods
  //     .exportMilk()
  //     .call({ from: accounts[0] });
  //   const uTime = timeConverter(totalData.split(" ").pop());
  //   // console.log(uTime);
  //   val = totalData.split(" ").slice(0, -1).concat(uTime).join(" ");
  //   ReactDOM.render(<QRCode value={val} />, document.getElementById("qrcode"));
  //   await data.methods.setMilkZero().send({ from: accounts[0] });
  // }

  return (
    <body>
      <div>
        <p>
          center ID : {centerId} <br />
          Total Milk : {milk}
        </p>
        <hr />
        <h4 style={{ textAlign: "center" }}>Add Milk</h4>
        <Form
          style={{
            width: 700,
            padding: 30,
          }}
          onSubmit={onEnter}
        >
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Farmer ID</InputGroup.Text>
            <FormControl
              placeholder="Enter ID of farmer"
              aria-label="Farmer ID"
              value={farmerId}
              onChange={(e) => setFarmerId(e.target.value)}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Milk Quantity</InputGroup.Text>
            <FormControl
              placeholder="Enter Milk Quantity"
              aria-label="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Fat percentage</InputGroup.Text>
            <FormControl
              placeholder="5%"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={fat}
              onChange={(e) => setFat(e.target.value)}
            />
          </InputGroup>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <p style={{ color: "green" }}>{message}</p>
        <hr />

        <h4 style={{ textAlign: "center" }}>Get history of the farmer</h4>

        <Form
          style={{ width: 700, padding: 30 }}
          onSubmit={getHistory}
        >
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Farmer ID</InputGroup.Text>
            <FormControl
              placeholder="Farmer ID"
              aria-label="Farmer ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </InputGroup>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>

        {/* <form onSubmit={getHistory}>
          <h4>Get history of a farmer</h4>
          <label>Enter ID of the farmer </label>
          <input value={id} onChange={(e) => setId(e.target.value)} />
          <br />
          <button>SUBMIT</button>
        </form> */}
        <div id="found">{history}</div>
        <hr />
        <Button onClick={props.temp} style={{alignItems:"center", marginLeft:"30px"}}>EXPORT</Button>
        <br />
        <div id="qrcode"></div>
      </div>
    </body>
  );
}
export default CollectionCenter;
