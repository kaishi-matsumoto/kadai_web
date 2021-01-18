import React, { useEffect ,useState } from 'react';
/* import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';
 */

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [datas, setDatas] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)


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

  const clickDelete=(e,index)=>{
          
          if(!isDeleting){
            setIsLoading(true)
            fetch("https://api.manage.prona.com/client/"+datas[index].id ,{
              method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': 'http://localhost:3000', 
                },
                mode: 'cors',
            })
            .then(response => response.json())
            .then((result) => {              
              
              if(result.id===datas[index].id ){
                const deleteData = datas.slice();
                deleteData.splice(index,1);
                setDatas(deleteData);
                setIsLoading(false)
                setIsDeleting(false)
              }else{
                console.log(datas[index])
                console.log(result.id===datas[index].id ? 'OK': 'NO')
                setIsLoading(false)
                setIsLoading(false)
              }

            })
            
            }else{
              setIsDeleting(false)
            }

            

  }
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        
        return <div>Loading...</div>;
      } else {
        
      return <div>

          {isLoading? 
          <div>削除中...</div>

            :

          <div>
            削除しました。
            {datas.map((item, index) => (
              <form key={index} >
              
                <div>{item.name}</div>
                <br />
                <div className='id'>{item.id}</div>
                <br />
                <input onClick={(e)=>clickDelete(e,index)} type="submit" value="削除" />
                <br />
              
              </form>
          ))}
          </div> 
          
          }
          </div>
    }
}
export default App;
