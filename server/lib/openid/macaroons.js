export default class Macaroons {
  // FIXME sstewart 20-Aug-16 just pass cid?
  constructor(options) {
    this.requestParams = {
      'openid.ns.macaroon': 'http://ns.login.ubuntu.com/2016/openid-macaroon'
    };
    if (options && options.caveat_id) {
      this.requestParams['openid.macaroon.caveat_id'] = options.caveat_id;
    }
  }

  fillResult(params, result) {
    if (params['openid.macaroon.discharge']) {
      result['discharge'] = params['openid.macaroon.discharge'];
    }
  }
}
