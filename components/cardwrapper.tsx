import React from 'react'
import {Card, CardHeader, CardTitle, CardDescription, CardContent, } from "@/components/ui/card";

type CardWrapperProps = {
    children: React.ReactNode; // Accepts any valid React node
  };
const CardWrapper: React.FC<CardWrapperProps> = ({children}) => {

    return (
       <Card className="bg-white p-5">
            <CardHeader>
                <CardTitle className="text-black text-center">
                    🔒 AuthFast
                </CardTitle>
                <CardDescription >
                    Implements Authentication quickly.
                 </CardDescription>   
            </CardHeader>

            <CardContent>
                {children}
            </CardContent>

       </Card>
    )
}

export default CardWrapper;