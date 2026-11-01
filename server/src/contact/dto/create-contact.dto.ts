import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateContactDto {
  @IsString()
  @IsNotEmpty({ message: "Name is required" })
  @MaxLength(100)
  name: string;

  @IsEmail({}, { message: "Please enter a valid email address" })
  @IsNotEmpty({ message: "Email is required" })
  email: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  subject?: string;

  @IsString()
  @IsNotEmpty({ message: "Message content cannot be empty" })
  @MaxLength(5000)
  message: string;
}
