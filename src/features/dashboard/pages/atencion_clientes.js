import React, {useRef, useState} from 'react';
import { useAuth } from '../../common/redux/hooks';
import firebase from 'firebase/app';
import 'firebase/firestore';
import ReactAudioPlayer from 'react-audio-player';
import { useCollectionData, useCollection, useDocument   } from 'react-firebase-hooks/firestore';
import { Grid, Paper, IconButton, makeStyles, InputBase, List, ListItem, ListItemIcon, Checkbox, ListItemText } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';


firebase.initializeApp({
  apiKey: "AIzaSyCNbgAe7n5AZwkQV1KiLn2gUbHb3nHsjrk",
  authDomain: "brokfy-chat.firebaseapp.com",
  projectId: "brokfy-chat",
  storageBucket: "brokfy-chat.appspot.com",
  messagingSenderId: "606225511269",
  appId: "1:606225511269:web:cc16fa261d4cd84114a78c",
  measurementId: "G-5HPRL0MKJN"
});


const firestore = firebase.firestore();


const AtencionClientes = () => {
  const { auth } = useAuth();
  const [doc, setDoc] = useState('');

  console.log('AQUI ESTA =============');
  console.log(auth);
  return(
    <React.Fragment>
              <div className="chat-container">
     

    <ListChats
       onChange= {(id) => {
        console.log(id);
        setDoc(id);
        console.log(doc);
      }}

    />

<div>
      {doc != '' ? <ChatRoom doc={doc} />: <div className='chat-main'/>}
    </div>
    </div>
    
    </React.Fragment>
  );
}

const ListChats = (props) => {
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.typography.pxToRem(10),
    },
    secondaryHeadingWhite: {
        fontSize: theme.typography.pxToRem(20),
        color: 'white',
        margin: theme.spacing(2, 0)
    },
    input: {
        marginLeft: theme.spacing(1),
    },
    iconButton: {
        padding: 5,
    },
    iconButtonMin: {
      padding: 5,
      marginLeft: theme.typography.pxToRem(-4),
      border: "#6097ef 1px solid",
      color: "#6097ef",
      "&:hover": {
        border: "white 1px solid",
        color: "white",
        background: "#6097ef",
      }
    } 
  }));
  const classes = useStyles();

  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('updatedAt');
  const [messages] = useCollectionData(messagesRef,{ idField: 'id' });

  return (
    <div style={{height: "calc(100% - 101px)", width: "351px", display: "inline-block"}}>
    <div className="row border-bottom filtro-cliente-container">
      <div className="col-lg-12">
        <div className="p-xs">

          <Paper component="form" className={classes.paper} >
            <IconButton onClick={() => alert('')} color="primary" className={classes.iconButton} aria-label="directions">
              <SearchIcon />
            </IconButton>
            <InputBase
              className={classes.input}
              placeholder="Buscar clientes"
              inputProps={{ 'aria-label': 'Buscar clientes' }}
              onChange={(event) => alert(event)}
              onKeyPress={(event) => alert(event)}
            />
          </Paper>
          <div className="lista-poliza">
              <List className={classes.root}>
                  {messages && messages.map(msg => {
                    return (
                        <ListItem key={msg.id} role={undefined} dense button onClick={() => props.onChange(msg.id)} name={msg.id} >
                       
                            <ListItemText primary={msg.id} />
                        </ListItem>
                    );
                  })}
              </List>
          </div>
      
        </div>
      </div>
    </div>
  </div>
  );
}


const ShowChats = (props)  => {
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('updatedAt');
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
    documentData.update({
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    
  
    console.log("============ DOCS ==========");
    console.log(props.doc);
    console.log(firebase.firestore.Timestamp.now().seconds);
    console.log(firebase.firestore.FieldValue.serverTimestamp());

  const messagesRef = documentData.collection(props.doc);
  
  const query = messagesRef.orderBy('timestamp', "asc");

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');
  
  console.log("============ MESSAGES ==========");
  console.log(messages);

  const sendMessage = async (e) => {
    e.preventDefault();
    console.log("============ SEND MESSAGE ==========");
    console.log(firebase.firestore.FieldValue.serverTimestamp());

    const time = firebase.firestore.Timestamp.now().seconds;
    const uid = auth.username;
    console.log('PROPS DOPCS =============');
  
    let str = props.doc;
    let destinations = str.split("-");
    console.log('PROPS ============');
    const data = {
      content: formValue,
      idFrom: Number(uid),
      idTo:1,
      timestamp: String(time),
      type:1,
      fullName: auth.NombreCompleto,
    };
    
    await messagesRef.add(data);

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main className="chat-main">
      {props.doc !== '' ? messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} id={auth.username} />) : null}

      <span ref={dummy}></span>

    </main>

    <form className="chat-form" onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Escribe algo" />

      <button className='button' type="submit" disabled={!formValue}>Enviar</button>

    </form>
  </>)
}




const ChatMessage = (props) => {
  console.log("============== ChatMessage ====================");
  console.log(props.message);
  const { content, idFrom, type } = props.message;
  const id = props.id;
  console.log('================= ID:',id);
  console.log('========== UID:',idFrom);

  console.log(' ============== type',type);
  const messageClass = idFrom === id ? 'sent' : 'received';
  let typeWidget;
  switch(type){
    case 1:
    default:
      typeWidget = (
        <>
          <div className={`message ${messageClass}`}>
            <img className='chat-img' src={'https://api.adorable.io/avatars/23/abott@adorable.png'}  alt='avatar'/>
            <p className='chat-p' >{content}</p>
          </div>
        </>
        );
        break;
      case 2:
        typeWidget = (
          <>
            <div className={`message ${messageClass}`}>
              <img className='chat-img' src={'https://api.adorable.io/avatars/23/abott@adorable.png'} alt='avatar'/>
              <img className='chat-p' src={content} alt='document or message'/>
            </div>
          </>
          );
          break;
      case 3:
        typeWidget = (
          <>
            <div className={`message ${messageClass}`}>
              <img className='chat-img' src={'https://api.adorable.io/avatars/23/abott@adorable.png'} alt='avatar'/>
              <video className='chat-p' width="320" height="240" controls>
                <source src={content} type="video/mp4"/>
              </video>
            </div>
          </>
          );

          break;
      case 4:
        typeWidget = (
          <>
            <div className={`message ${messageClass}`}>
              <img className='chat-img' src={'https://api.adorable.io/avatars/23/abott@adorable.png'} alt='avatar'/>
              <ReactAudioPlayer
                 src={content}
                controls
              />
            </div>
          </>
        );
        break;
  }

  return typeWidget;

}

export default AtencionClientes;