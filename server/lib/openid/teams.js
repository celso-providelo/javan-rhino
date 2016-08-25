export default class LaunchpadTeams {
  // FIXME sstewart 20-Aug-16 just pass array or string?
  constructor(options) {
    this.requestParams = {
      'openid.ns.lp': 'http://ns.launchpad.net/2007/openid-teams'
    };

    if (options.teams && options.teams.length) {
      this.requestParams['openid.lp.query_membership'] = options.teams.join(',');
    }
  }

  fillResult(params, result) {
    if (params['openid.lp.is_member'] && params['openid.lp.is_member'].length) {
      result['teams'] = params['openid.lp.is_member'].split(',');
    }
  }
}
