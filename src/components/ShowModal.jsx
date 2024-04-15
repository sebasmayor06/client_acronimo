import React, {useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { historial_busqueda } from '../redux/actions';



const ShowModal2 = ({ onFinish}) => {
  const dispatch = useDispatch(); 
  const historial = useSelector((state)=>state.historial)
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(()=>{
    dispatch(historial_busqueda())
  }, [dispatch, isModalOpen])

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleClick = (name) =>{

    setIsModalOpen(false)
    onFinish(name.target.value)

  }

  return (
      <>
        <Button type="primary" onClick={showModal}>
          Ver Historial
        </Button>
        {historial?.length > 0 && (
          <Modal
            title="Historial"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <div className='text-black w-full h-full rounded-xl grid grid-cols-3 p-4 border-2 border-slate-200 gap-2'>
              {historial?.map((f, index) => (
                <button onClick={handleClick} name={f.name_acronimo} value={f.name_acronimo} className=' border-2 font-bold border-slate-500 w-20 rounded-md bg-slate-200' key={index}>{f.name_acronimo}</button>
              ))}
            </div>
          </Modal>
        )}
      </>
    );
    
};

export default ShowModal2;
