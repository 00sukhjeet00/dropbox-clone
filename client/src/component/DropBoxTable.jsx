import React, { useContext, useEffect, useState } from "react";
import { EthContext } from "../contexts/EthContext";

export default function DropBoxTable() {
  const { state } = useContext(EthContext);
  const [files, setfiles] = useState([]);
  useEffect(() => {
    fetchData();
  }, [state?.isLoading]);
  const fetchData = async () => {
    const fileCount = await state?.contract?.methods.fileCount().call();
    let fileData=[]
    for (let id = 1; id <= fileCount; id++) {
      const data = await state?.contract?.methods.Files(id).call();
      fileData.push({
          desc: data.desc,
          fileHash: data.fileHash,
          fileName: data.fileName,
          fileSize: data.fileSize,
          id: data.id,
          uploader: data.uploader,
        })
    }
    setfiles(fileData)
  };
  return (
    // <div>
      <table class="table mt-3">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Name</th>
            <th scope="col">Size</th>
            <th scope="col">Description</th>
            <th scope="col">Path</th>
          </tr>
        </thead>
        <tbody>
          {files?.map((file) => (
            <tr key={file?.id}>
              <th scope="row">{file?.id}</th>
              <td>{file?.fileName}</td>
              <td>{file?.fileSize}</td>
              <td>
                  {file.desc}
              </td>
              <td>
                <a
                  href={"http://127.0.0.1:8080/ipfs/" + file.fileHash}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {file.fileHash.substring(0, 10)}...
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    // </div>
  );
}
