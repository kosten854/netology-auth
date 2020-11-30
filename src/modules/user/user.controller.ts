import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthUser } from "src/decorators/auth.decorator";
import { LocalAuthGuard } from "src/guards/localAuth.guard";
import { UserCreateDto } from "./dto/UserCreateDto";
import { UserDto } from "./dto/UserDto";
import { UserLoginDto } from "./dto/UserLoginDto";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";



@ApiTags('USER')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @Post('signup')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Регистрация',
  })
  @ApiOkResponse({
    description: 'Созданый пользователь',
    type: UserDto,
  })
  async createUser(@Body() body: UserCreateDto): Promise<UserDto> {
    const createdUser = await this.userService.create(body);
    return new UserDto(createdUser);
  }


  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Логин',
  })
  @UseGuards(LocalAuthGuard)
  @ApiOkResponse({
    description: 'Пользователь',
    type: UserDto,
  })
  async login(@Body() body: UserLoginDto, @AuthUser() user: UserEntity): Promise<UserDto> {
    return new UserDto(user);
  }

}
