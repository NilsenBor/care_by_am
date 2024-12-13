import * as nextAuth from "next-auth/react";
import {SessionApp} from "@/api/auth/type";

type GetSession = Parameters<typeof nextAuth.getSession>
type UseSession = Parameters<typeof nextAuth.useSession>


export const getSession: (arg:GetSession[0]) => Promise<SessionApp | null> = (options) => {
    return nextAuth.getSession(options) as Promise<SessionApp | null>;
};

export const useSession= (options:UseSession[0]) => {
   const session = nextAuth.useSession(options)

    return {...session,data: session.data as SessionApp | null }
};