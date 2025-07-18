import io from 'socket.io-client';


export const createSocketConnection=()=>{
    return io(import.meta.env.VITE_BASE_URL || "http://localhost:1511");
}