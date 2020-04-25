import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as mime from 'mime-types';

import { BucketTypes } from '../../common/constants/bucket-type';
import { IFile } from '../../interfaces/IFile';
import { ConfigService } from './config.service';
import { GeneratorService } from './generator.service';

@Injectable()
export class AwsS3Service {
  private readonly _s3: AWS.S3;

  constructor(
    public configService: ConfigService,
    public generatorService: GeneratorService,
  ) {
    const options: AWS.S3.Types.ClientConfiguration = {
      endpoint: 'https://s3.ir-thr-at1.arvanstorage.com',
    };

    const awsS3Config = configService.awsS3Config;
    if (awsS3Config.accessKeyId && awsS3Config.secretAccessKey) {
      options.credentials = awsS3Config;
    }

    this._s3 = new AWS.S3(options);
  }

  async uploadImage(file: IFile, bucket: BucketTypes) {
    const fileName = this.generatorService.fileName(
      <string>mime.extension(file.mimetype),
    );
    const key = bucket + fileName;
    await this._s3
      .putObject({
        Bucket: this.configService.awsS3Config.bucketName,
        Body: file.buffer,
        ACL: 'public-read',
        Key: key,
      })
      .promise();

    return key;
  }
}
