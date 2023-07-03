import './App.css';
import Sidebar from './components/Sidebar';
import DisplayPanel from './components/DisplayPanel';
import { useState, useEffect } from 'react';
import Authenticate from './components/Authenticate';

function App() {
  const [tab, setTab] = useState("Pinned");
  const [displayData, setDisplayData] = useState()
  const [authenticated, setAuthenticated] = useState(false)
  const [changing,setChanging] = useState(false)

  useEffect(() => {
    try {
      if (!window.localStorage.getItem("pmdata")) {
        const dummyData = {
          logins: [],
          notes: [],
          notesIndex: 1
        }
        setDisplayData(dummyData)
        const writeData = JSON.stringify(dummyData);
        window.localStorage.setItem("pmdata", writeData)
      } else {
        setDisplayData(JSON.parse(window.localStorage.getItem("pmdata")))
        console.log("Data is : ", displayData );
      }
    }
    catch (err) {
      console.log(err);
    }
  }, [])

  if (!authenticated) {
    return (
      <div style={{ display: 'flex', justifyContent: 'stretch', height: '100vh' }}>
        <div className='title-bar'></div>
        <Authenticate setAuthenticated={setAuthenticated} changing={changing} />
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'stretch', height: '100vh' }}>
      <div className='title-bar'></div>
      <Sidebar tab={tab} setTab={setTab} />
      <DisplayPanel tab={tab} setTab={setTab} data={displayData} setData={setDisplayData} setAuthenticated={setAuthenticated} setChanging={setChanging} />
    </div>
  );
}

export default App;
