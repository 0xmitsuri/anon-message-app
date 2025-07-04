import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loginValidationSchema } from '../../../shared/validation';
import { Button } from './ui/button.jsx';
import { Label } from './ui/label.jsx';
import { Form } from './ui/form.jsx';
import { Input } from './ui/input.jsx';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import useAuthStore from '../stores/useAuthStore';

const apiUrl = import.meta.env.VITE_API_URL

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const login = useAuthStore(state => state.login);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(loginValidationSchema),
        defaultValues: {
            email: '',
            password: '',
            username: ''
        }
    });

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            console.log(data);


            console.log('Sending login request with:', { email: data.email, password: data.password });
            const payload = {
                email: data.email,
                password: data.password,
                ...(data.username && { username: data.username.trim() })
            };

            const response = await axios.post(`${apiUrl}/auth/login`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                withCredentials: true
            });

            login({
                token: response.data.token,
                user: response.data.user
            });

            toast.success('Login successful!');

            navigate('/');
        } catch (error) {
            console.error('Login error:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                headers: error.response?.headers
            });
            const errorMessage = error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                'Failed to login. Please try again.';
            const details = error.response?.data?.received ?
                `Received: ${JSON.stringify(error.response.data.received)}` :
                '';
            toast.error(`${errorMessage} ${details}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
            <div className="w-full max-w-md bg-card p-8 rounded-2xl shadow-lg">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-primary">Welcome</h1>
                    <p className="text-muted-foreground mt-2">
                        {watch('email') ? 'Enter your details to continue' : 'Enter your email to get started'}
                    </p>
                </div>

                <Form onSubmit={handleSubmit(onSubmit)}>
                    <div className='space-y-6'>
                        <div>
                            <Label htmlFor="email" className="text-foreground mb-2 block">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                {...register('email')}
                                className={`w-full ${errors.email ? 'border-red-500' : ''}`}
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                            )}
                        </div>

                        {watch('email') && (
                            <div>
                                <Label htmlFor="username" className="text-foreground mb-2 block">
                                    Username {!watch('username') && '(Optional)'}
                                </Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Choose a username"
                                    {...register('username')}
                                    className={`w-full ${errors.username ? 'border-red-500' : ''}`}
                                />
                                {errors.username && (
                                    <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>
                                )}
                                <p className="mt-1 text-xs text-muted-foreground">
                                    {!watch('username')
                                        ? 'Add a username to create a new account'
                                        : 'This will be your display name'}
                                </p>
                            </div>
                        )}

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <Label htmlFor="password" className="text-foreground">
                                    Password
                                </Label>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                disabled={isLoading}
                                {...register('password')}
                                className={`w-full bg-background text-foreground ${errors.password ? 'border-red-500' : ''}`}
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <Button
                            className="w-full"
                            disabled={isLoading}
                            onClick={handleSubmit(onSubmit)}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </Button>
                    </div>
                </Form>

                <p className="mt-4 text-center text-sm text-muted-foreground">
                    Don't have an account? Just enter a username to sign up
                </p>
            </div>
        </div>
    );
};

export default Login;
