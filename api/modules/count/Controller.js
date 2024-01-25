import { Client } from './Client.js';
import { Service } from './Service.js';

export class CountController {
  constructor() {
    this._service = new Service();
  }
  count(_req, res) {
    const client = new Client(res);
    client.open();
    this._service.startCount(client);
  }
}
