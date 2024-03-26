import React, {useState, useEffect} from 'react';
import axios from 'axios';

type UserData = {
  id: number,
  firstName: string,
  lastName: string,
}

function App() {

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

  return (
    <div>
      {data !== undefined ? (
        <div>
          {data.map(user => (
            <li key={user.id}>
              {user.firstName} {user.lastName}
            </li>
          ))}
        </div>
      ) : (
        <div>
          Loading...
        </div>
      )}
    </div>
  );

}

export default App;
