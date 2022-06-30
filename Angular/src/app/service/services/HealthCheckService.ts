/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

@Injectable()
export class HealthCheckService {

  constructor(public readonly http: HttpClient) {}

  /**
   * Health check
   * @returns any Successful response
   * @throws ApiError
   */
  public healthCheckControllerHealthCheck(): Observable<any> {
    return __request(OpenAPI, this.http, {
      method: 'GET',
      url: '/',
    });
  }

}
