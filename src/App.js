import React, { useEffect ,useState } from 'react';


function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [datas, setDatas] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
 /*  const [isEdited, setIsEdited] = useState(false) */


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
          
          if(!isDeleted && !isDeleting){
           ///isDeletingをtrueにして、「削除中を表示」
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
                            
              if(result.id === datas[index].id){

                const deleteData = datas.slice();
                deleteData.splice(index,1);
                setDatas(deleteData);
                //isDeletingをfalseにして、「削除中」を非表示
                setIsDeleting(false)
                //isDeletedをtrueにして、「削除しました」を表示
                setIsDeleted(true)
              }

            })}else if(isDeleted && !isDeleting){
              ///isDeletingをtrueにして、「削除中」を表示
              setIsDeleting(true)
              //isDeletedをfalseにして、「削除しました」を非表示
              setIsDeleted(false)
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
                              
                if(result.id === datas[index].id){
                          
                  const deleteData = datas.slice();
                  deleteData.splice(index,1);
                  setDatas(deleteData);
                  //isDeletingをfalseにして「削除中」を非表示
                  setIsDeleting(false)
                  //isDeletedをtrueにして「削除しました」を表示
                  setIsDeleted(true)
                }
              })
            }
  }
/* 
  const clickEdit =(props)=>{
    setIsEdited(true)
    console.log(isEdited)
    setIsDeleted(false)
  }
 */
  const fetchCreate=(e,index)=>{
    console.log(datas[index].id)
    fetch("https://api.manage.prona.com/client/"+datas[index].id ,{
              method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': 'http://localhost:3000', 
                },
                mode: 'cors',
            })
            .then(response => response.json())
            .then((result) => {              
                            
              if(result.id === datas[index].id){
                //今のデータを予め別の変数に格納
                const completeData = datas[index]
                //ステートを更新
                setDatas(completeData);
                //editをfalseにして配列の描画に戻す
          /*       setIsEdited(false) */
              }

            })
  }

  const registerDatas= (e)=>{
    setIsDeleted(false)
    e.preventDefault();

    const registeringData = datas.slice() 
    registeringData.push({name: e.currentTarget.title.value})
    console.log(registeringData[registeringData.length-1])
    fetch("https://api.manage.prona.com/client" ,{
              method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': 'http://localhost:3000', 
                },
                mode: 'cors',
                body: JSON.stringify(registeringData[registeringData.length-1]), 

            })
            .then(response => response.json())
            .then((result) => { 
                console.log(result.name) //POSTによってオブジェクトが返ってくる
                const fetchedData = datas.slice()   
                fetchedData.push(result) //末尾にオブジェクトを追加し、既存のデータと一緒に保管しておく 
                setDatas(fetchedData)
            })
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
            
            <form onSubmit={(e)=>registerDatas(e)}>
              <label>
                <input name="title" placeholder="名前" type="text" />
              </label>
              <input type="submit" value="登録"/>
            </form>

            <DataList datas={datas} /* isEdited={isEdited} */ clickDelete={clickDelete} fetchCreate={fetchCreate} /* clickEdit={clickEdit} */ />
          </div>
          
          }
        
          
          </div>
    }
}

function DataList(props){
  return <div>
            {props.datas.map((item, index) => (
              <Datas /* isEdited={props.isEdited} */ item={item} index={index} clickDelete={props.clickDelete} fetchCreate={props.fetchCreate} clickEdit={props.clickEdit} />
          ))}
          </div> 
}

function Datas(props){
  
  const [value, setValue]= useState('')
  const [isEdited, setIsEdited] = useState(false)

  const submitEdit=(e)=>{
    setValue(props.item.name)
    /* console.log(props.item.name) */
    console.log(value)
    /* props.clickEdit(props.isEdited) */
    /* console.log(props.isEdited) */
    setIsEdited(true)
  }

  const submitComplete=(e)=>{
    e.preventDefault();
    /* console.log(props.index) */
    console.log(props.isEdited)
    props.item.name = e.target.name.value
    props.fetchCreate(e,props.index)
    setIsEdited(false)

  }

  return <div>
    {isEdited? 
    
        <form onSubmit={(e)=>submitComplete(e)}>
           <input name="name" type="text" value={value} onChange={(e)=>setValue(e.target.name.value)} />
           <input type="submit" value="完了"  />
         </form>
            : 
            <form key={props.index} >
              
              <div>{props.item.name}</div>
              <br />
              <div>{props.item.id}</div>
              <br />
              <input onClick={(e)=>submitEdit(e,props.index)} type="submit" value="編集" />
              <input onClick={(e)=>props.clickDelete(e,props.index)} type="submit" value="削除" />
              <br />
  
            </form>
            }
  </div>
  
}

export default App;
