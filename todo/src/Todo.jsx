import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';

const style = {
  li: `flex justify-between bg-slate-200 p-4 my-2 capitalize`,
  liComplete: `flex justify-between bg-slate-400 p-4 my-2 capitalize`,
  row: `flex`,
  text: `ml-2 cursor-pointer`,
  textComplete: `ml-2 cursor-pointer line-through`,
  button: `cursor-pointer flex items-center`,
};

const Yapilacak = ({ yapilacak, toggleComplete, deleteTodo }) => {
  return (
    <li className={yapilacak.completed ? style.liComplete : style.li}>
      <div className={style.row}>
        <input onChange={() => toggleComplete(yapilacak)} type='checkbox' checked={yapilacak.completed ? 'checked' : ''} />
        <p onClick={() => toggleComplete(yapilacak)} className={yapilacak.completed ? style.textComplete : style.text}>
          {yapilacak.text}
        </p>
      </div>
      <button onClick={() => deleteTodo(yapilacak.id)}>{<FaRegTrashAlt />}</button>
    </li>
  );
};

export default Yapilacak;
