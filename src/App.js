import React, { useEffect ,useState } from 'react';

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    fetch("https://api.manage.prona.com/client",{
      method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:3000',
        },
        mode: 'cors',
        
      
    })
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPages(result);
        },
        
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])
 

      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else{
      return <div>
        {console.log(pages)}
        {pages.map(item => (
        <div key={item.id}>          
         
              <div>{item.name}</div>
              <br />
              <div>{item.email}</div>
              <br />
              <div>{item.hash}</div>
              <br />
              <div>{item.id}</div>
              <br />
              <div>{item.created_at}</div>
              <br />
              <div>{item.updated_at}</div>
              <br />
          
        </div>
          ))}</div>
    }
}
export default App;
