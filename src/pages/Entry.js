import React, { useState, useEffect } from "react";
import web3 from "./web3";
import data from "./EntryData";
import Exdata from "./ExitData";
import { Form, Button, InputGroup, FormControl, Table } from "react-bootstrap";

function Entry(props) {
  var [quantity, setQuantity] = useState();
  var [milk, setMilk] = useState();
  var [centerId, setCenterId] = useState();
  var [message, setMessage] = useState();
  var [history, setHistory] = useState("");
  var [id, setId] = useState();

  useEffect(async () => {
    var Tm = await data.methods.getTotalQuantity().call();
    setMilk(Tm);
  });

  const onEnter = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    // console.log(accounts[0]);
    setMessage("Please Wait...");
    await data.methods.addMilk(centerId, quantity).send({ from: accounts[0] });
    await Exdata.methods.addMilk(quantity).send({ from: accounts[0] });
    setMessage("Milk Entered Successfully ✓✓");
  };

  const getHistory = async (event) => {
    event.preventDefault();
    // console.log(id);
    const accounts = await web3.eth.getAccounts();
    const res = await data.methods
      .getDataByCenterID(id)
      .call({ from: accounts[0] });
    setHistory([]);
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
          </tr>
        </thead>

        <tbody>
          {res.map((row, pos) => {
            return (
              <tr>
                <td>{timeConverter(row[0])}</td>
                <td>{row[1]}</td>
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
  //   // const accounts = await web3.eth.getAccounts();
  //   // const totalData = await data.methods.send().call({ from: accounts[0] });
  //   // const uTime = timeConverter(totalData.split(" ").pop());
  //   // // console.log(uTime);
  //   // const val = totalData.split(" ").slice(0, -1).concat(uTime).join(" ");
  //   // // console.log(val);
  //   // ReactDOM.render(<QRCode value={val} />, document.getElementById("qrcode"));
  //   // await data.methods.setMilkZero().send({ from: accounts[0] });

  //   console.log(props.temp);
  // }

  return (
    <body>
      <div>
        <p>{props.data}</p>
        <p>Total Milk: {milk}</p>
        <hr />

        <Form
          style={{
            width: 700,
            padding: 30,
          }}
          onSubmit={onEnter}
        >
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              Collection Center ID
            </InputGroup.Text>
            <FormControl
              placeholder="Enter ID of the Center"
              aria-label="Farmer ID"
              value={centerId}
              onChange={(e) => setCenterId(e.target.value)}
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

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <p style={{ color: "green" }}>{message}</p>

        <Form
          style={{ width: 700, padding: 30 }}
          onSubmit={getHistory}>
          <h4>Get History of Collection Center</h4>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Collection Center ID</InputGroup.Text>
            <FormControl
              placeholder="Enter Center ID"
              aria-label="Farmer ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </InputGroup>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <div id="found">{history}</div>
        <hr />
        <Button onClick={props.temp} className="Ebutton">Send Into</Button>
        <Button onClick={props.temp2} className="Ebutton">Send Out</Button>
        <br />
        <div id="qrcode"></div>
      </div>
    </body>
  );
}

export default Entry;
