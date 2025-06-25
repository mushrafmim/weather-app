import React from "react";
import {Skeleton} from "@/components/ui/skeleton";

type MetricCardProps = {
    loading: boolean;
    children: React.ReactNode;
}

export default function MetricCard(props: MetricCardProps) {
    return (
        <div className="bg-sky-600/20 shadow-sm backdrop-blur-md border border-white/40 rounded-2xl p-4 w-full h-full">
            {props.loading ? (
                <div className="flex flex-col space-y-3">
                    <Skeleton className="h-4 w-1/2"/>
                    <Skeleton className="h-[125px] w-full rounded-xl"/>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full"/>
                    </div>
                </div>
            ) : <>{props.children}</>}
        </div>
    )
}