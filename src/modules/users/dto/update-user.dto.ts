import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
    @IsMongoId({message: '_id không hợp lệ'})
    @IsNotEmpty({ message: '_id không được để trống'})
    _id: string;

    ///IsOptional: check giá trị == null => skip qua các phần validator
    @IsOptional()
    name: string;
    
    @IsOptional()
    phone: string;
    address: string;
    image: string;
}
