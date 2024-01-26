const {
  Singleton: { config, log },
} = require('simple-node-framework');

// console.log(config);

log.info('TEST', 'estou testando o log do framework', {
  a: 1,
  b: 2,
  natural: { requestId: 'xyz-1234' },
});
