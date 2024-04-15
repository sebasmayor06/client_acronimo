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
      {(
        <Modal
          title="Historial"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className='text-black w-full h-full rounded-3xl grid grid-cols-3 p-4 border-2 border-slate-200 gap-2'>
            {historial?.map((f, index) => (
              <button onClick={handleClick} name={f.name_acronimo} value={f.name_acronimo} className=' border-2 font-bold border-slate-950 w-20 rounded-3xl bg-slate-400' key={index}>{f.name_acronimo}</button>
            ))}
          </div>
        </Modal>
      )}
    </>
  );
};

export default ShowModal2;
