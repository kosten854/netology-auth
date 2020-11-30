import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';



export class UserCreateDto {

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', example: 'username' })
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  @ApiProperty({
    minLength: 8,
    example: 'strongPassword',
  })
  password: string;
}
