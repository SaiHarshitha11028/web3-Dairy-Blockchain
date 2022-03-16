import web3 from "./web3";

const address = "0x8660B3e6CD75f5ed788fc8eDEdB62cEefEf48799";
const abi = [
  {
    inputs: [{ internalType: "uint256", name: "quant", type: "uint256" }],
    name: "addMilk",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
    signature: "0x56da207d",
  },
  {
    inputs: [],
    name: "checkQuality",
    outputs: [{ internalType: "uint256[2]", name: "", type: "uint256[2]" }],
    stateMutability: "nonpayable",
    type: "function",
    signature: "0xf6aa1054",
  },
  {
    inputs: [],
    name: "export",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "nonpayable",
    type: "function",
    signature: "0x07a43efd",
  },
  {
    inputs: [],
    name: "getTotalQuantity",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
    constant: true,
    signature: "0x7474e331",
  },
  {
    inputs: [],
    name: "setMilktoZero",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
    signature: "0x8cccaa38",
  },
];

const contract = new web3.eth.Contract(abi, address);

export default contract;
//comment
