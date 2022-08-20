import React, { useContext, useState } from "react";
import { EthContext } from "../contexts/EthContext";
const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({
  host: "127.0.0.1",
  port: 5001,
  protocol: "http",
});
export default function FileUpload() {
  const { state } = useContext(EthContext);
  const [img, setimg] = useState(null);
  const [buffer_img, setbuffer_img] = useState(null);
  const [desc, setdesc] = useState("");
  // console.log("Contarct:", state?.contract?.methods?.fileCount()?.call());
  const handleSubmit = async () => {
    const res = await ipfs.add(buffer_img);
    console.log("res: ", res);
    state.contract.methods
      .uploadFile(img.name, desc, img.size, res.path)
      .send({ from: state?.accounts[0] })
      .on("transactionHash", (hash) => {
        window.location.reload();
      })
      .on("error", (err) => {
        console.error(err);
      });
  };
  return (
    <div className="w-50 m-2 text-center">
      <input
        className="form-control form-control-lg mb-3"
        type="text"
        placeholder="Description"
        value={desc}
        onChange={(evt) => {
          setdesc(evt.target.value);
        }}
      />
      <input
        className="form-control form-control-lg"
        type="file"
        placeholder="Choose File"
        onChange={(evt) => {
          let reader = new window.FileReader();
          reader.onloadend = function (e) {
            setbuffer_img(Buffer(e.currentTarget.result));
          };
          reader.readAsArrayBuffer(evt.target.files[0]);
          setimg(evt.target.files[0]);
        }}
      />
      <button className="btn btn-info mt-3" onClick={handleSubmit}>
        Upload
      </button>
    </div>
  );
}
