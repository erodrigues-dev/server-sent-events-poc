const ws = new WritableStream({
  write(chunk) {
    console.log(chunk);
  },
});
const writer = ws.getWriter();

function writeTest() {
  writer.write('testando wirtable stream\n\n');
}

async function listenEvents() {
  console.log('start listening...');
  const res = axios({
    method: 'GET',
    url: '/api/events',
    // responseType: 'stream',
    headers: {
      Accept: 'text/event-stream',
    },
    // onDownloadProgress: (e) => console.log(e.event.target.responseText),
  });

  console.log(res.data);
}

function listenWithFetch() {
  const read = async (reader) => {
    const result = await reader.read();

    const strValue = new TextDecoder().decode(result.value);
    console.log(strValue);

    if (result.done) return;

    await read(reader);
  };

  fetch('http://localhost:3000/events').then(async (res) => {
    const reader = res.body.getReader();
    await read(reader);
  });
}

let sse;

function listenWithEventSource() {
  sse = new EventSource('/api/events', {
    options: {
      body: { test: true },
      headers: { 'x-test': '123' },
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

  sse.addEventListener('message', (e) => {
    console.log(e.data);
  });

  sse.addEventListener('connected', (e) => {
    console.log(e.data);
    h2.innerText = `event: connected`;
  });
}

function closeEventSource() {
  console.log('closeEventSource');
  sse?.close();
  document.getElementById('sse-text').innerText = 'event source is closed';
}

// https://github.com/mpetazzoni/sse.js
