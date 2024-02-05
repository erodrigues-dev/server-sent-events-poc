import { SSE } from 'sse.js';

let sse = null;
const btnStart = document.getElementById('btn-sse-start');
const btnClose = document.getElementById('btn-sse-close');

function listeningWithSSE() {
  console.log('SSE start');
  sse = new SSE('/api/events', {
    headers: {
      'x-origin-application': 'poc-sse',
    },
  });

  const h2 = document.getElementById('sse-text');

  sse.addEventListener('count', (e) => {
    console.log(e.data);
    h2.innerText = `event: count - ${JSON.parse(e.data).count}`;
  });

  sse.addEventListener('closed', (e) => {
    console.log('closed', e.data);
    h2.innerText = `event: closed`;
    sse.close();
  });

  sse.addEventListener('connected', (e) => {
    console.log(e.data);
    h2.innerText = `event: connected`;
  });

  sse.addEventListener('error', (e) => {
    console.log('onError');
    setTimeout(() => {
      console.log('reconnecting....');
      listeningWithSSE();
    }, 1000);
  });
}

function closeSSE() {
  sse.close();
  h2.innerText = 'event source is closed';
}

btnStart.onclick = listeningWithSSE;
btnClose.onclick = closeSSE;
