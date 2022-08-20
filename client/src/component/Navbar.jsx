import React, { useContext } from "react";
import EthContext from "../contexts/EthContext/EthContext";

export default function Navbar() {
  const { state } = useContext(EthContext);
  
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Drop BOX
        </a>
        {!state?.isLoading && (
          <a className="navbar-brand" href="#">
            {state?.accounts[0]}
          </a>
        )}
      </div>
    </nav>
  );
}
