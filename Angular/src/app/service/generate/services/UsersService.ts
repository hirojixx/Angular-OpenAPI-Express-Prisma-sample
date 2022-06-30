/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

import type { CreateUser } from '../models/CreateUser';
import type { ResponseUserApi } from '../models/ResponseUserApi';

import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

@Injectable()
export class UsersService {

  constructor(private readonly http: HttpClient) {}

  /**
   * Return a list of users
   * @returns ResponseUserApi
   * @throws ApiError
   */
  public usersControllerGetUsers(): Observable<ResponseUserApi> {
    return __request(OpenAPI, this.http, {
      method: 'GET',
      url: '/users/',
    });
  }

  /**
   * Create a new user
   * @param requestBody CreateUser
   * @returns ResponseUserApi
   * @throws ApiError
   */
  public usersControllerCreateUser(
requestBody?: CreateUser,
): Observable<ResponseUserApi> {
    return __request(OpenAPI, this.http, {
      method: 'POST',
      url: '/users/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Return find a user
   * @param id
   * @returns ResponseUserApi
   * @throws ApiError
   */
  public usersControllerGetUserById(
id: number,
): Observable<ResponseUserApi> {
    return __request(OpenAPI, this.http, {
      method: 'GET',
      url: '/users/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * Update a user
   * @param id
   * @param requestBody CreateUser
   * @returns ResponseUserApi
   * @throws ApiError
   */
  public usersControllerUpdateUser(
id: number,
requestBody?: CreateUser,
): Observable<ResponseUserApi> {
    return __request(OpenAPI, this.http, {
      method: 'PUT',
      url: '/users/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Delete a user
   * @param id
   * @returns ResponseUserApi
   * @throws ApiError
   */
  public usersControllerDeleteUser(
id: number,
): Observable<ResponseUserApi> {
    return __request(OpenAPI, this.http, {
      method: 'DELETE',
      url: '/users/{id}',
      path: {
        'id': id,
      },
    });
  }

}
