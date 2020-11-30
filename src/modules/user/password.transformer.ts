import * as bcrypt from 'bcrypt';
import { ValueTransformer } from 'typeorm';


export class PasswordTransformer implements ValueTransformer {
  to(value: string): string {
    return bcrypt.hashSync(value, 10);
  }
  from(value: string): string {
    return value;
  }
}
