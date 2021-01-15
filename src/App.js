import React, { useEffect ,useState } from 'react';

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [datas, setDatas] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false)

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
          setDatas(result);
        },
        
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  const clickDelete=(e)=>{
    
        if(!isDeleted){
          fetch("https://api.manage.prona.com/client/"+datas[0].id ,{
             method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000', 
              },
              mode: 'cors',
          })
          .then(response=> response.text())
          .then((result)=>{
            setIsDeleted(true);
            console.log(result);
          })
          
          }else{
            const deleteDatas = datas.slice();
            deleteDatas.splice(e,1);
            setDatas(deleteDatas);
            setIsDeleted(false)
            e.preventDefault();
          }
       
  }
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        
        return <div>Loading...</div>;
      } else{
        
      return <div>
        {datas.map(item => (
          <form key={item.id}>
            <div>{item.name}</div>
            <br />
            <div>{item.id}</div>
            <br />
            <input onClick={clickDelete} type="button" value="削除" />
            <br />
          </form>
          ))}
          {isDeleted?  <div>削除中...</div> 
          : 
          <div>削除しました。</div>}
          </div>
    }
}
export default App;
