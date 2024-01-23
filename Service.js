class Service {
  count(client) {
    // let count = 0;
    // const interval = setInterval(() => {
    //   count++;
    //   console.log('>>> ', count);
    //   client.emit('count', { count });

    //   if (count > 40) {
    //     client.emit('closed', {});
    //     clearInterval(interval);
    //     client.close();
    //   }
    // }, 1000);

    client.onClose(() => {
      console.log('service closed');
      clearInterval(interval);
    });
  }
}

module.exports = Service;
