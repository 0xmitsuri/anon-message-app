import React from 'react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className='p-1 fixed w-2/3 h-16 z-20 border border-border bg-gradient-to-br from-primary to-foreground top-0 mt-2 rounded-2xl'>
            <div className='w-full h-full bg-background flex items-center justify-between rounded-xl px-2'>
                <img src="/logo.png" alt="logo" className="h-8 w-8" />
                <div className='h-full flex justify-center items-center gap-8'>
                    <Link to="/">Home</Link>
                    <Link to="/dashboard">Dashboard</Link>
                </div>
                <Button>Log In</Button>
            </div>
        </nav>
    )
}

export default Navbar