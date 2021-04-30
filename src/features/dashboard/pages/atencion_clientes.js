import React, {useRef, useState} from 'react';
import { useAuth } from '../../common/redux/hooks';
import firebase from 'firebase/app';
import 'firebase/firestore';

import { useCollectionData, useCollection, useDocument   } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "api-key",
  authDomain: "authDomain",
  projectId: "projectId",
  storageBucket: "storageBucket",
  messagingSenderId: "messagingSenderId",
  appId: "appId",
  measurementId: "measurementId"
})

const firestore = firebase.firestore();


const AtencionClientes = () => {
  const { auth } = useAuth();
  const [doc, setDoc] = useState('');

  console.log('AQUI ESTA =============');
  console.log(auth);
  return(
    <div>
      <h1>Atención Clientes</h1>
      <div>
        { auth ? auth.username : null }
    </div>

    

    <section>
    <ShowChats
        onChange= {(id) => {
        console.log(id);
        setDoc(id);
        console.log(doc);
      }}
    />
       {doc != '' ? <ChatRoom doc={doc} />: <div className='main'/>}
    </section>
   
    </div>
  );
}


const ShowChats = (props)  => {
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('updateAt');
  const [messages] = useCollectionData(messagesRef,{ idField: 'id' });

  return (<>
    <div className='head'>
      <ul>
      {messages && messages.map(
        msg => 
        <li><button className='chat-item' onClick={() => props.onChange(msg.id)} name={msg.id} >{msg.id}</button></li>
        )}
      </ul>
    </div>

  </>)
}


const ChatRoom = (props)  => {
  const { auth } = useAuth();
  const dummy = useRef();
  const documentData = firestore.collection('messages').doc(props.doc);
    documentData.set({
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    
  

  
  const messagesRef = documentData.collection('booksList');
  
  const query = messagesRef.orderBy('createdAt');

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');
  

  const sendMessage = async (e) => {
    e.preventDefault();

    const uid = auth.username;
    const photoURL = 'https://api.adorable.io/avatars/23/abott@adorable.png';
    const data = {
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    };
    
    await messagesRef.add(data);

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main>
      {props.doc !== '' ? messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} id={auth.username} />) : null}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Escribe algo" />

      <button className='button' type="submit" disabled={!formValue}>Enviar</button>

    </form>
  </>)
}




const ChatMessage = (props) => {
  const { text, uid, photoURL } = props.message;
  const id = props.id;
  console.log('================= ID:',id);
  console.log('========== UID:',uid);
  const messageClass = uid === id ? 'sent' : 'received';


  return (
  <>
    <div className={`message ${messageClass}`}>
      <img className='chat-img' src={ photoURL != null ? photoURL : 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
      <p className='chat-p' >{text}</p>
    </div>
  </>
  );

}

export default AtencionClientes;