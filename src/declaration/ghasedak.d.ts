/* eslint-disable camelcase */
declare module 'ghasedak' {
  interface ISend {
    message: string;
    receptor: string;
    linenumber: string;
    senddate?: Date;
    checkid?: string;
  }

  interface ISendVoice {
    message: string;
    receptor: string;
    senddate?: Date;
  }

  interface ISendTemplate {
    receptor: string;
    type: 1 | 2;
    template: string;
    param1: string;
  }

  interface ISendVerification {
    receptor: string;
    type: 1 | 2;
    template: string;
    checkid: string;
    param1: string;
    param2?: string;
    param3?: string;
    param4?: string;
    param5?: string;
    param6?: string;
    param7?: string;
    param8?: string;
    param9?: string;
    param10?: string;
  }
  class Ghasedak {
    /**
     * Create a new Ghasedak
     * @constructor
     * @param [apiKey] - the credential to authenticate to Ghasedak.
     * @param [apiBase=api.ghasedak.io] - api address
     * @param [apiVersion=/v2] - api version
     */
    constructor(apiKey: string, apiVersion?: string, apiBase?: string);

    /**
     * Send simple sms
     * @see https://ghasedak.io/docs
     * @param {object} [opts] - sms info to send
     */
    send(opts: ISend): void;
    /**
     * Send bulk sms - type 1
     * @see https://ghasedak.io/docs
     * @param [opts] - bulk sms info to send
     */
    bulk1(opts: ISend): void;
    /**
     * Send bulk sms - type 2
     * @see https://ghasedak.io/docs
     * @param [opts] - bulk sms info to send
     */
    bulk2(opts: ISend): void;

    /**
     * Send bulk sms
     * @see https://ghasedak.io/docs
     * @param [opts] - bulk sms info to send
     * @param [bulktype] - 1 for bulk and 2 for bulk2
     */
    bulk(opts: ISend, bulktype: 1 | 2): void;

    /**
     * Send voice call
     * @see https://ghasedak.io/docs
     * @param [opts] - voice call
     */
    voicecall(opts: ISendVoice): void;

    /**
     * send sms in template
     * @see https://ghasedak.io/docs
     * @param [opts] - voice call
     */
    template(opts: ISendTemplate): void;

    /**
     * send verification sms to user
     * @see https://ghasedak.io/docs
     * @param [opts] - voice call
     */
    verification(opts: ISendVerification): void;
  }
  namespace Ghasedak {}
  export = Ghasedak;
}
