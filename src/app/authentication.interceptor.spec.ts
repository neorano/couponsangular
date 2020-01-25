import { AuthenticationInterceptor } from './authentication.interceptor';
import { UserService } from './user.service';

describe('Authentication.Interceptor', () => {
  it('should create an instance', () => {
    expect(new AuthenticationInterceptor(UserService)).toBeTruthy();
  });
});
