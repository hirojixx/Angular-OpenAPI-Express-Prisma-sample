import 'reflect-metadata';
import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsNumber, IsString, ValidateNested } from 'class-validator';

export class CreateUser {
  @IsEmail()
  public email!: string;

  @IsString()
  public name!: string;

  @IsString()
  public password!: string;
}

export class ResponseUser {
  @IsNumber()
  user_id!: number;
  @IsString()
  email!: string;
  @IsString()
  name!: string;
  @IsString()
  password!: string;

}

export class ResponseUserApi {

  @IsString()
  message!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResponseUser)
  data!: ResponseUser[];

}
