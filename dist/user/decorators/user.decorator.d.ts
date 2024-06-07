export interface UserInfo {
    name: string;
    iat: number;
    id: number;
    exp: number;
}
export declare const User: (...dataOrPipes: any[]) => ParameterDecorator;
