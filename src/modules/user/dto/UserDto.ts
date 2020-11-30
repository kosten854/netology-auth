import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../user.entity';
export class UserDto {

  @ApiProperty({ minimum: 1, example: 1 })
  id: number;

  @ApiProperty({ type: 'string' })
  username: string;

  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;


  constructor(user: UserEntity) {
    this.id = user.id;
    this.username = user.username;
    this.createdAt = user.createdAt;
  }
}
