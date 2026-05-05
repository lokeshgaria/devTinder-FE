import io from 'socket.io-client';

export const createSocketConnection = () =>{

    if(location.hostname==="localhost"){
        const socket = io("http://localhost:8080");
        return socket;
    }
   else{
     const socket= io("/",{path:"/socket.io"})
     return socket
   }
}