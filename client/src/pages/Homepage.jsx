import FadeIn from '@/components/FadeIn'
import { Button } from '@/components/ui/button'
import React from 'react'
import Navbar from '@/components/Navbar'

const Homepage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen w-full">
            <Navbar />
            <FadeIn>
                <h1 className="text-6xl font-bold bg-gradient-to-br from-primary to-foreground bg-clip-text text-transparent p-4">
                    AnonyMessage
                </h1>
            </FadeIn>
            <FadeIn delay={0.3}>
                <p className="text-lg text-center text-muted-foreground">Send anonymous messages to your friends</p>
            </FadeIn>
            <FadeIn delay={0.5}>
                <Button className="mt-4">Create Link</Button>
            </FadeIn>
        </div>
    )
}

export default Homepage
