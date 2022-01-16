import web3 from "./web3";
// import JSON from "JSON";

const address = "0x7fBdF769914752c5fB2039C06006e4a1b442B19A";
const abi = [
  {
    inputs: [{ internalType: "uint256", name: "_centerId", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "constructor",
    signature: "constructor",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_farmerId", type: "uint256" },
      { internalType: "uint256", name: "_quantity", type: "uint256" },
      { internalType: "uint256", name: "fatPercent", type: "uint256" },
    ],
    name: "addMilk",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
    signature: "0xbcea3e48",
  },
  {
    inputs: [],
    name: "centerId",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
    constant: true,
    signature: "0x4fbf2287",
  },
  {
    inputs: [],
    name: "checkQuality",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "pure",
    type: "function",
    constant: true,
    signature: "0xf6aa1054",
  },
  {
    inputs: [],
    name: "exportMilk",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "nonpayable",
    type: "function",
    signature: "0xf79a9736",
  },
  {
    inputs: [{ internalType: "uint256", name: "_farmerId", type: "uint256" }],
    name: "getDataByID",
    outputs: [{ internalType: "uint256[3][]", name: "", type: "uint256[3][]" }],
    stateMutability: "view",
    type: "function",
    constant: true,
    signature: "0x5a452943",
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
    name: "setMilkZero",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
    signature: "0x88496bdf",
  },
];

const contract = new web3.eth.Contract(abi, address);

export default contract;
