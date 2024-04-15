import React, { useEffect, useState } from 'react'; // Importa React también
import { useDispatch, useSelector } from 'react-redux';
import { Input } from 'antd';
import './App.css';
import { busqueda, searchAcronimo} from "../src/redux/actions";
import ShowModal from './components/ShowModal'

const { Search } = Input;




function App() {
  const dispatch = useDispatch(); 
  const acronimo = useSelector((state)=>state.acronicos)
  const [acro, setAcro] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5

  



  console.log(acro);
 

  useEffect(()=>{
    const lfValues = acronimo?.map((item) => {
      return(
        {name:item.lf,
          since:item.since
        }
      )
    })
      if (lfValues?.length) {

        setCurrentPage(1)
        setAcro(lfValues)
        
      }
  }, [acronimo])
  const pageCount = Math.ceil(acro.length / pageSize);
  const indexOfLastGames = currentPage * pageSize;
  const indexOfFirstGames = indexOfLastGames - pageSize;
  const currentGames = acro.slice(indexOfFirstGames, indexOfLastGames);
  
  const onFinish = async (e) => {
    dispatch(searchAcronimo(e))
    const data = {
      name_acronimo: e,
    };
    
    dispatch(busqueda(data));
  };
  const next = () => {
    if (indexOfLastGames > acro.length) return;
    setCurrentPage(currentPage + 1);
  };
  const prev = () => {
    if (indexOfFirstGames < 1) return;
    setCurrentPage(currentPage - 1);
  };
  return (
    <div className="overflow-x-hidden shadow-xl  bg-[#282c34]">
      <div className="flex flex-col items-center w-screen h-[1000px] overflow-hidden left-0 bg-[#282c34]  gap-5 ">
        <div className='w-full flex justify-center items-center mt-8'>
          <div className='w-96 h-20 '>
            <Search name='name_acronimo' placeholder="Ingresa un acrónimo o inicial" enterButton={`Buscar`} size="large"  loading={false} onSearch={onFinish}/>
          </div>
        </div>
        <ShowModal  onFinish={onFinish}></ShowModal>
        <div className='flex flex-col w-[80%] justify-center items-center gap-5'>
        <div className='text-gray-100 w-[50%] gap-5 text-lg h-[300px] rounded-3xl flex flex-col justify-center items-center border-2 border-slate-200'>
          {currentGames.name=== "NO FOUND"?
          (<h1>Cargando...</h1>)
          :currentGames.map((e, index)=>{
            return(
                <ul key={index}>
                  <li  >
                    {e.name}
                  </li>
                </ul>
            )
          })}

        

        </div>
        <div  className='m-8'>
        <button className='m-1 font-extrabold hover:bg-blue-600 hover:border-slate-400 bg-slate-400 border-2 border-blue-500  rounded-xl p-1 cursor-pointer'  onClick={() => prev()}>PREV</button>
        {Array.from({ length: pageCount }).map((_, index) => (
          <button className={currentPage=== index + 1?'m-1 font-extrabold w-6 border-slate-400 border-2 bg-blue-600 text-white rounded-md p-1 cursor-pointer':'m-1 font-extrabold w-6 bg-slate-400 border-2 border-blue-500 rounded-md p-1 cursor-pointer'}  key={index} onClick={() => setCurrentPage(index + 1)}>
            {index + 1}
          </button>
        ))}
        <button className='m-1 font-extrabold hover:bg-blue-600 hover:border-slate-400 bg-slate-400 border-2 border-blue-500 rounded-xl p-1 cursor-pointer' onClick={() => next()}>NEXT</button>
      </div>
        </div>
      </div>
    </div>
  );
}

export default App;

