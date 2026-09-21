import { APIRequestContext } from "@playwright/test";


export class AuthService {
  constructor(private request: APIRequestContext) {}

  async login(email: string, password: string): Promise<string> {
    const response = await this.request.post(
      "https://api.practicesoftwaretesting.com/users/login",
      {
        data: {
          email,
          password,
        },
      },
    );

    const jsonData = await response.json();

    const token = jsonData.access_token;
    return token;
  }
}
