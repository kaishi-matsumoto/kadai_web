import React, { useEffect ,useState } from 'react';

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [datas, setDatas] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false)
  


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

  /* const submitDelete=(e)=>{
          console.log(e)
          
          if(!isDeleting){
            setIsDeleting(true);
            fetch("https://api.manage.prona.com/client/"+datas[e].id ,{
              method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': 'http://localhost:3000', 
                },
                mode: 'cors',
            })
            .then(response=> response.text())
            .then((result)=>{
              console.log(result);
              if(result === datas[0].id){
                const deleteData = datas.slice();
                deleteData.splice(e,1);
                setDatas(deleteData);
                setIsDeleting(true)
                e.preventDefault();
              }
            })
            }

  } */
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        
        return <div>Loading...</div>;
      } else {
        
      return <div>
        {datas.map((item, index) => (
          <form key={index} 
          onSubmit={(e)=>{
            console.log(datas[index])
            fetch("https://api.manage.prona.com/client/"+datas[index].id ,{
            method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000', 
              },
              mode: 'cors',
          })
          .then(response=> response.text())
          .then((result)=>{
            console.log(result);
            if(result === datas[index].id){
              setIsDeleting(false)
              const deleteData = datas.slice();
              deleteData.splice(index,1);
              setDatas(deleteData);
              setIsDeleting(true)
              e.preventDefault()
            }
          })}} >
           
            <div>{item.name}</div>
            <br />
            <div className='id'>{item.id}</div>
            <br />
            <input type="submit" value="削除" />
            <br />
           
          </form>
          ))}
          {isDeleting?  <div>削除しました。</div> 
          : 
          <div>削除中...</div>}
          </div>
    }
}
export default App;
