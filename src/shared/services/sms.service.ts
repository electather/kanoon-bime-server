import { Injectable } from '@nestjs/common';
import * as Ghasedak from 'ghasedak';

import { ConfigService } from './config.service';
import { GeneratorService } from './generator.service';

@Injectable()
export class SmsService {
  private _instance: Ghasedak;
  constructor(
    private _configService: ConfigService,
    private _generatorService: GeneratorService,
  ) {
    this._instance = new Ghasedak(this._configService.get('GHASEDAK_API_KEY'));
  }

  sendSms(message: string, receptor: string): void {
    this._instance.send({
      message,
      receptor,
      linenumber: '300002525',
    });
  }

  sendOtp(receptor: string): void {
    this._instance.send({
      receptor,
      message: 'کد فعال سازی شما ...',
      linenumber: '300002525',
    });
  }

  sendConfirmation(receptor: string): void {
    this._instance.send({
      receptor,
      message: 'بیمه شما ثبت شد ...',
      linenumber: '300002525',
    });
  }
}
