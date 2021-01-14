import React, { useEffect ,useState } from 'react';

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [datas, setDatas] = useState([]);
  const [isFetched, setIsFetched] = useState(false)

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
   
    let datas_id = datas.find(d => d.id === datas.id)
    console.log(datas_id)
    
      fetch("https://api.manage.prona.com/client/"+datas_id ,{
      method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:3000', 
        },
        
        mode: 'cors',
        body: datas //DELETEメソッド使用時にjsonにパースするとエラーが起きるためそのまま渡しました。
       })
       .then(response=> response.text())
       .then((result)=>{
         setIsFetched(true);
         console.log(result);
        //fetchが成功=isFetchedがtrueの時なので、以下の配列削除を実行
        const deleteDatas = datas.slice();
        deleteDatas.splice(e,1);
        setDatas(deleteDatas);
        e.preventDefault();

        if(!isFetched){
          return <div>削除中...</div>
        }else{
          return <div>削除しました。</div>
        }
       })
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
            <div>{item.email}</div>
            <br />
            <div>{item.hash}</div>
            <br />
            <div>{item.id}</div>
            <br />
            <input onClick={clickDelete} type="button" value="削除" />
          </form>
          ))}</div>
    }
}
export default App;
