import './App.css';
import Banner from "./Banner";
import Exhibit from "./Exhibit";
import Ip, {IPV4, IPV6} from "./DataDisplay/Ip";

let siteTitle = "sextant";
let siteLogo = "/images/sextant-logo1.svg";

function App() {
  return (
    <div className="App">
    <Banner
      title={siteTitle}
      logo={siteLogo}/>
      <Exhibit header="Public IPv4">
        <Ip ipv={IPV4}/>
      </Exhibit>
      <Exhibit header="Public IPv6">
        <Ip ipv={IPV6}/>
      </Exhibit>
    </div>
  );
}

export default App;
