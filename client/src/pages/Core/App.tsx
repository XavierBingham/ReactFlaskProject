//Imports
import React, {useState, useEffect} from 'react';
import axios from 'axios';

//Styles
import '../../styles/Global.css';
import '../../styles/GlobalAnimations.css';

//Components
import NavBar from '../HeaderNavBar/NavBar';

type UserData = {
  id: number,
  firstName: string,
  lastName: string,
}

function App() {

  /*
  let [data, updateData]:[UserData[], any] = useState([]);
  
  const getData = async () => {
    await axios.get("/api/test")
    .then((res) => {
      const data = res.data.data;
      updateData(data);
    })
    .catch((err) => {
      console.error("Error fetching data", err);
    });
  };
  
  useEffect(() => {
    getData();
  }, []);
  */

  return (
    <div>
      <NavBar/>
    </div>
  );

}

export default App;