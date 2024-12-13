import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { loginSchema } from '@/services/login';
import { authService } from '@/services/auth/impl';
import {SessionApp, SessionUser} from '@/api/auth/type';


export const authOptions: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
    pages: {
        signIn: '/login',
        error: '/login',
    },
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60,
    },
    callbacks: {
        async jwt(props) {
            const {token,account} =  props
            const user = props.user as SessionUser | undefined

            if (account && user) {
                return {
                    ...token,
                    accessToken: user.accessToken,
                    refreshToken: user.refreshToken,
                    userId: user.id,
                    userProfile: user.userProfile,
                };
            } else if (Date.now() < Number(token.exp) * 1000) {
                return token;
            } else {
                return { ...token, error: 'RefreshAccessTokenError' };
            }
        },
        async session(params) {
            const { token } = params;

            const session = params.session as SessionApp;

            if (token) {
                session.userProfile = token.userProfile as User;
                session.refreshToken = token.refreshToken as string;
                session.accessToken = token.accessToken as string;
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                token.error as 'RefreshAccessTokenError';
            }
            return session;
        },
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials) return null;

                const parsedCredentials = loginSchema.safeParse(credentials);

                if (!parsedCredentials.success) {
                    const [{ message }] = parsedCredentials.error.issues;
                    throw new Error(message);
                }

                try {
                    const { email, password } = parsedCredentials.data;
                    const response = await authService.login({email, password});

                    const { accessToken, refreshToken, userProfile } = response;

                    return {
                        id: response.userProfile.id,
                        email,
                        accessToken,
                        refreshToken,
                        user:userProfile
                    };
                }
                catch{
                    throw new Error('Invalid credentials');

                }
            },
        }),
    ],
};
