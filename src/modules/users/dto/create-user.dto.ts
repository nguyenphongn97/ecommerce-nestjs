import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({ message: "name không được để trống"})
    name: string;
    @IsNotEmpty()
    @IsEmail({}, {message: "email không đúng định dạng"})
    email: string;
    @IsNotEmpty({ message: "password không được để trống"})
    password: string;
    phone: string;
    address: string;
    image: string;
}
