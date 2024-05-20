import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import ButtonSpinner from '../spinners/ButtonSpinner'

const schema = yup.object().shape({
  email: yup.string().label('Email address').email().required(),
  password: yup.string().label('Password').min(8).required(),
})

type SigninFormInputs = {
  email: string;
  password: string;
}

function initializeFormData(): SigninFormInputs {
  return {
    email: '',
    password: '',
  }
}

function SigninForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<SigninFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      ...initializeFormData()
    }
  })

  const onSubmit: SubmitHandler<SigninFormInputs> = (data) => console.log(data)

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email"
            {...register('email')}
            type="email"
            autoComplete="email"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {errors.email && <p className="mt-1 text-sm text-danger-600">{errors.email?.message}</p>}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
            Password
          </label>
          <div className="text-sm">
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Forgot password?
            </a>
          </div>
        </div>
        <div className="mt-2">
          <input
            id="password"
            {...register("password")}
            type="password"
            autoComplete="current-password"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {errors.password && <p className="mt-1 text-sm text-danger-600">{errors.password?.message}</p>}
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          // disabled={true}
        >
          <ButtonSpinner loading={false} buttonText="Sign in" />
        </button>
      </div>
    </form>
  )
}

export default SigninForm