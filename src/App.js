import "./App.css";
// import React from "react";
import CollectionCenter from "./pages/CollectionCenter";
import Entry from "./pages/Entry";
import Packing from "./pages/Packing";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";
import web3 from "./pages/web3";
import data from "./pages/CollectionCenterData";
import EnData from "./pages/EntryData";
import ExData from "./pages/ExitData";
import PackData from "./pages/PackingData";
import { Navbar, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

function Home() {
  return <h2>Home</h2>;
}

const App = () => {
  var str = "";
  var indo, packts;

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

  async function generateQR() {
    const accounts = await web3.eth.getAccounts();
    const totalData = await data.methods
      .exportMilk()
      .call({ from: accounts[0] });
    const uTime = timeConverter(totalData.split(" ").pop());
    const val = totalData.split(" ").slice(0, -1).concat(uTime).join(" ");
    await EnData.methods.setPrevData(val).send({ from: accounts[0] });
    // const temp = await EnData.methods.prevData().call({ from: accounts[0] });
    ReactDOM.render(<QRCode value={val} />, document.getElementById("qrcode"));
    await data.methods.setMilkZero().send({ from: accounts[0] });
  }

  async function generateQREntry() {
    const accounts = await web3.eth.getAccounts();
    const totalData = await EnData.methods
      .sendInto()
      .call({ from: accounts[0] });
    // console.log(totalData);
    const uTime = timeConverter(totalData.split(" ").pop());
    const Enval = totalData.split(" ").slice(0, -1).concat(uTime).join(" ");
    str = Enval;
    ReactDOM.render(
      <QRCode value={Enval} />,
      document.getElementById("qrcode")
    );
    await EnData.methods.setMilktoZero().send({ from: accounts[0] });
  }

  async function generateQRExit() {
    const accounts = await web3.eth.getAccounts();
    const totalData = await ExData.methods.export().call({ from: accounts[0] });
    const uTime = timeConverter(totalData.split(" ").pop());
    const ExVal = totalData.split(" ").slice(0, -1).concat(uTime).join(" ");
    str += ExVal;
    // console.log(str);
    ReactDOM.render(<QRCode value={str} />, document.getElementById("qrcode"));
    await PackData.methods.setPrevData(str).send({ from: accounts[0] });
    await ExData.methods.setMilktoZero().send({ from: accounts[0] });
  }

  async function generateQRDelivery(indo, packts) {
    console.log(indo, packts);
    const accounts = await web3.eth.getAccounts();
    const res = await PackData.methods.export(indo, packts).call({ from: accounts[0] });
    const uTime = timeConverter(res.split(" ").pop());
    const DeVal = res.split(" ").slice(0, -1).concat(uTime).join(" ");
    ReactDOM.render(
      <QRCode value={DeVal} />,
      document.getElementById("qrcode")
    );
  }

  return (
    <div>
      <Navbar variant="dark" expand="md" className="navbar">
        <div className="container-fluid">
          <Navbar.Brand>
            <div className="logo">Dairy Blockchain</div>
          </Navbar.Brand>

          {/* For Mobile View */}
          {/* <Navbar.Toggle /> */}

          <Navbar.Collapse className="right-aligned">
            <Nav
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "right",
              }}
            >
              <Nav.Link href="/" activeClassName="active">
                <div className="nav-links">Home</div>
              </Nav.Link>
              <Nav.Link href="/CollectionCenter" activeClassName="active">
                <div className="nav-links">Collection Center</div>
              </Nav.Link>
              <Nav.Link href="/Entry" activeClassName="active">
                <div className="nav-links">Processing Center</div>
              </Nav.Link>
              <Nav.Link href="/Packing" activeClassName="active">
                <div className="nav-links">Pack and Delivery</div>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>

      <Router>
        {/* <div>
          <Link style={{ color: "red" }} to="/">
            Home
          </Link>
          <Link to="/CollectionCenter">CollectionCenter</Link>
          <Link to="/Entry">Entry</Link>
          <Link to="/Packing">Packing</Link>
        </div> */}
        <Routes>
          <Route exact path="/" component={Home} />
          <Route
            path="/CollectionCenter"
            element={<CollectionCenter temp={() => generateQR()} />}
          />
          <Route
            path="/Entry"
            element={
              <Entry
                temp={() => generateQREntry()}
                temp2={() => generateQRExit()}
              />
            }
          />
          <Route
            path="/Packing"
            element={<Packing temp={(idno, packts) => generateQRDelivery(idno, packts)} />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
