// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


// function createSocket() {
//   const socket_url = "ws://localhost:3001/cable";
//   const socket = new WebSocket(socket_url);

//   socket.onopen = function(event) {
//     console.log("connected to server");

//     const msg = {
//       command: 'subscribe',
//       identifier: JSON.stringify({
//         id: 1,
//         channel: 'EventsChannel'
//       })
//     };

//     socket.send(JSON.stringify(msg));
//   }

//   socket.onmessage = function(event) {

//     const data = JSON.parse(event.data)
//     if(data.type === "ping") {
//       return;
//     }
//     console.log(event.data);
//   };

//   socket.onclose = function(event) {  
//     console.log("connection closed");
//   };

// }

// createSocket();


const socket = new WebSocket('ws://localhost:3001/cable');

socket.onopen = () => {
  console.log('WebSocket connected');
  
  const msg = {
    command: 'subscribe',
    identifier: JSON.stringify({
      channel: 'EventsChannel',
      session_id: "ftfewfweghbwfjkwegn2556",
    }),
    data: JSON.stringify({channel: 'EventsChannel',
    trigger_type: "session-event",
    session_id: "ftfewfweghbwfjkwegn2556",
    event_type: "start-chat",
    timestamp: "2023-03-27T09:17:46.481081",
    source_page: "bant"})
  };

  socket.send(JSON.stringify(msg));
};

socket.onerror = (error) => {
  console.error('WebSocket error', error);
};

socket.onclose = (event) => {
  console.log('WebSocket closed', event.code, event.reason);
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data)
  if(data.type === "ping") {
    return;
  }
  
  console.log(event.data);

  const msg = {
    command: 'message',
    identifier: JSON.stringify({
      channel: 'EventsChannel',
      session_id: "ftfewfweghbwfjkwegn2556",
    }),
    data: JSON.stringify({
      channel: 'EventsChannel',
      trigger_type: "session-event",
      session_id: "ftfewfweghbwfjkwegn2556",
      event_type: "start-chat",
      timestamp: "2023-03-27T09:17:46.481081",
      source_page: "bant",
      message: "hi, how are you?"
    })
  };

  socket.send(JSON.stringify(msg));
};

// console.log("---------------------------------hi")

// if(socket.OPEN !== 1) {
//   const msg = {
//     command: 'message',
//     identifier: JSON.stringify({
//       session_id: 1,
//       channel: 'EventsChannel'
//     }),
//     data: JSON.stringify({test: "test"})
//   };

//   socket.send(JSON.stringify(msg));
// }

