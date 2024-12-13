"use client";
import {FC, PropsWithChildren} from "react";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "@/api/tanstack/tanstackConfig";
import {SessionProvider} from "next-auth/react";

export const GlobalProvider:FC<PropsWithChildren> = ({children}) => {
    return <SessionProvider>
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    </SessionProvider>
}