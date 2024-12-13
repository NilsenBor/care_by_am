import { Session } from 'next-auth';

export type SessionApp = Session & { refreshToken: string };
