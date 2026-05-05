import io from 'socket.io-client';

export const createSocketConnection = () =>{

    if(location.hostname==="localhost"){
        const socket = io("http://localhost:8080");
        return socket;
    }
   else{
     const socket= io("/",{path:"/api/socket.io"})
     return socket
   }
}