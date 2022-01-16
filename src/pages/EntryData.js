import web3 from "./web3";

const address = "0x9176bc768331c1096b3D4D8906c26f99ef2eE032";
const abi = [
  {
    inputs: [
      { internalType: "uint256", name: "centerID", type: "uint256" },
      { internalType: "uint256", name: "_quantity", type: "uint256" },
    ],
    name: "addMilk",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
    signature: "0xc5c1b3b5",
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
    inputs: [{ internalType: "uint256", name: "centerID", type: "uint256" }],
    name: "getDataByCenterID",
    outputs: [{ internalType: "uint256[2][]", name: "", type: "uint256[2][]" }],
    stateMutability: "view",
    type: "function",
    constant: true,
    signature: "0x37f6b0fc",
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
    name: "prevData",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
    constant: true,
    signature: "0x78f7b8aa",
  },
  {
    inputs: [],
    name: "sendInto",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "nonpayable",
    type: "function",
    signature: "0xc2418f8f",
  },
  {
    inputs: [],
    name: "setMilktoZero",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
    signature: "0x8cccaa38",
  },
  {
    inputs: [{ internalType: "string", name: "info", type: "string" }],
    name: "setPrevData",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "nonpayable",
    type: "function",
    signature: "0xb5dad3a7",
  },
];

const contract = new web3.eth.Contract(abi, address);

export default contract;
