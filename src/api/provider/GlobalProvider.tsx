import {FC,PropsWithChildren} from "react";
import { QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "@/api/query/tanstack";


export const GlobalProvider:FC<PropsWithChildren> = ({children}) => {
    return <QueryClientProvider client = {queryClient}>
        {children}
        </QueryClientProvider>
}