import { useTo_Do_ListContext } from '../../context/To_Do_ListContext';
import './ModalWindow.scss';

export const ModalWindow = ()=>{
  const { deleteTask,setIsShowModal,currentIdDelete } =
      useTo_Do_ListContext();



    return(
    <div className="modal" onClick={()=>setIsShowModal(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <i className="modal-content-close" onClick={()=>setIsShowModal(false)}>
          X
        </i>
        <h1>Видалити запис ?</h1>
        <div className="modal-content-btns">
          <button className="accept" onClick={()=>deleteTask(currentIdDelete)}>
            Так, видалити
          </button>
          <button className="reject" onClick={()=>setIsShowModal(false) }>
            Ні, залишити
          </button>
        </div>
      </div>
    </div>
    )
}