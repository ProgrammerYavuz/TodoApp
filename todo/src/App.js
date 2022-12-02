import React, { useState, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import Todo from './Todo';
import { db } from './firebase';
import {query,collection,onSnapshot,updateDoc,doc,addDoc,deleteDoc,} from 'firebase/firestore';

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#0e324a] to-[#1e687e]`,
  container: `bg-slate-300 max-w-[80%] w-full m-auto rounded-md shadow-xl p-5`,
  heading: `text-3xl font-bold text-center text-[#0e324a] p-2`,
  form: `flex justify-between`,
  input: `border p-2 pl-5 w-full text-xl border-[#577399] border-4 rounded-2xl`,
  button: `border p-4 ml-2 bg-[#fff] border-[#577399] border-4 text-[#577399] rounded-2xl hover:bg-[#577399] hover:text-[#fff]`,
  list: `text-center p-2 bg-[#577399] my-3 text-[#1e687e] font-bold  rounded-md`,
  count: `text-center p-2 bg-[#e0dcd4] text-[#1e687e] font-bold  rounded-md`,
};

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // Yeni yapılacak iş ekle
  const createTodo = async (e) => {
    e.preventDefault(e);
    if (input === '') {
      alert('⚠️ Lütfen bir yapılacak iş ekleyin! ⚠️');
      return;
    }
    await addDoc(collection(db, 'todos'), {
      text: input,
      completed: false, // varsayılan olarak tamamlanmadı yapılır
    });
    setInput('');
  };

  // Firebase'den yapılacakları getir
  useEffect(() => {
    const q = query(collection(db, 'todos'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  // Firebase'de yapılacakları güncelle
  const toggleComplete = async (yapilacak) => {
    await updateDoc(doc(db, 'todos', yapilacak.id), {
      completed: !yapilacak.completed,
    });
  };

  // Firebase'de yapılacakları id'ye göre sil
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Yapılacaklar Listesi</h3>
        <br></br>
        <form onSubmit={createTodo} className={style.form}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={style.input}
            type='text'
            placeholder='Yeni İş Ekle'
          />
          <button className={style.button}>
            <AiOutlinePlus size={30} />
          </button>
        </form>
        <ul className={style.list}>
          {todos.map((yapilacak, index) => (
            <Todo
              key={index}
              yapilacak={yapilacak}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
        {todos.length < 1 ? null : (
          <p className={style.count}>{`Toplamda ${todos.length} iş listeleniyor...`}</p>
        )}
      </div>
    </div>
  );
}

export default App;
