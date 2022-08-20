import { EthProvider } from "./contexts/EthContext";
import Navbar from "./component/Navbar";
import FileUpload from "./component/FileUpload";
import DropBoxTable from "./component/DropBoxTable";

function App() {
  return (
    <EthProvider>
      <Navbar />
      <div className="container d-flex justify-content-center" style={{flexDirection:'column',alignItems:"center"}}>
        <FileUpload />
        <DropBoxTable/>
      </div>
    </EthProvider>
  );
}

export default App;
