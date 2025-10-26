import React from 'react';
import { useForm } from 'react-hook-form';
import toast, {Toaster} from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {

    const navigate = useNavigate();

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const handleRegister = async (data) => {
        
        const res = await fetch(import.meta.env.VITE_API_URL + "/register", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        const json = await res.json();

        if (res.status === 200) {
            toast.success("Register Successfully");
            // console.log(json)
            navigate("/")
        } else {
            toast.error(json.message);
        }


    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                <Toaster position="top-center" reverseOrder={false} />

                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create an account
                        </h1>
                        <form onSubmit={handleSubmit(handleRegister)} className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                                <input type="name" name="name" id="name" {...register("name",
                                    {
                                        required: true, minLength: 3, maxLength: 50
                                    }
                                )} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
                                {
                                    errors.name?.type === 'required' && <p className='text-red-500'>Name is required</p>
                                }
                                {
                                    errors.name?.type === 'minLength' && <p className='text-red-500'>Name must be at least 3 characters</p>
                                }
                                {
                                    errors.name?.type === 'maxLength' && <p className='text-red-500'>Name must be at most 50 characters</p>
                                }
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" name="email" id="email" {...register("email",
                                    {
                                        required: true,
                                    }
                                )} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                                {
                                    errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>
                                }
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" {...register("password",
                                    {
                                        required: true,
                                        minLength: 8,
                                    }
                                )} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                {
                                    errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
                                }
                                {
                                    errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be at least 8 characters</p>
                                }
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                <input type="confirm-password" name="confirm-password" id="confirm-password" {...register("password_confirmation",
                                    {
                                        required: true,
                                        validate: value => value === watch('password') || "Passwords do not match"
                                    }
                                )} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                {
                                    errors.password_confirmation && <p className='text-red-500'>{errors.password_confirmation.message}</p>
                                }
                            </div>

                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <Link to={"/"} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default RegisterPage
