interface ApiResponse<T> {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
}

interface RefreshTokenData {
    accessToken: string;
}

interface LoginResponseData {
  id: string;
  email: string;
  username: string;
  accessToken: string;
}

interface LoginRequestData {
    hello: string
    // define in some time
}

interface SecretData {
    username: string,
    id: string,
    email: string,
    secret: {
        setup: string,
        punchline: string
    }
}

export type {
    ApiResponse,
    RefreshTokenData,
    LoginResponseData,
    LoginRequestData,
    SecretData
}