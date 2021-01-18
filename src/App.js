import React, { useEffect ,useState } from 'react';


function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [datas, setDatas] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDeleted, setIsDeleted] = useState(true)


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
          
          if(!isDeleting && isDeleted){
            setIsDeleted(false)
            setIsDeleting(true)
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
                
                setIsDeleting(false)
                setIsDeleted(true)
                
              }else{
                setIsDeleting(false)
                setIsDeleted(false)
              }

            })}
           
  }
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        
        return <div>Loading...</div>;
      } else {
        
      return <div>
        
        {isDeleted? <div>削除しました。</div> : <div></div>}

        {isDeleting? 
          <div>削除中...</div>

            :

          <div>
            
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
