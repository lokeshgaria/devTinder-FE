import io from 'socket.io-client';

export const createSocketConnection = () =>{

    if(location.hostname==="localhost"){
        const socket = io(import.meta.env.VITE_API_URL);
        return socket;
    }
   else{
     const socket= io("/",{path:"/api/socket.io"})
     return socket
   }
}