import { useSocket } from "../context/socketContext.jsx";
export const useSocketEvents = () => {
    const socket = useSocket();
  
    const emitEvent = (eventName, data) => {
      if (socket?.connected) {
        socket.emit(eventName, data);
      }
    };
  
    const subscribeToEvent = (eventName, callback) => {
      if (socket) {
        socket.on(eventName, callback);
        return () => socket.off(eventName, callback);
      }
      return () => {};
    };
  
    return { emitEvent, subscribeToEvent };
  };