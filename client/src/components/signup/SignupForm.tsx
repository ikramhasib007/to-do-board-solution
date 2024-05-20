import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import ButtonSpinner from '../spinners/ButtonSpinner'

const schema = yup.object().shape({
  firstName: yup.string().trim().label('First name').required(),
  lastName: yup.string().trim().label('Last name').required(),
  email: yup.string().label('Email address').email().required(),
  password: yup.string().label('Password').min(8).required(),
  repeatPassword: yup.string().oneOf([yup.ref('password'), ''], 'Password does not match').required('Type the password again'),
})

type SignupFormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
}

function initializeFormData(): SignupFormInputs {
  return {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
  }
}

function SignupForm() {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<SignupFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      ...initializeFormData()
    }
  })

  const onSubmit: SubmitHandler<SignupFormInputs> = (data) => console.log(data)

  return (
    <div className="divide-gray-900/10">
      <form
        className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="px-4 py-6 sm:p-8">
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('firstName')}
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.firstName && <p className="mt-1 text-sm text-danger-600">{errors.firstName?.message}</p>}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("lastName")}
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.lastName && <p className="mt-1 text-sm text-danger-600">{errors.lastName?.message}</p>}
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email")}
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && <p className="mt-1 text-sm text-danger-600">{errors.email?.message}</p>}
              </div>
            </div>


            <div className="sm:col-span-3">
              <div className="flex space-x-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <ExclamationCircleIcon
                  title='Passwords will contain at least 1 upper case letter, 1 lower case letter, 1 number or special character'
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true" />
              </div>
              <div className="mt-2">

                <input
                  type="password"
                  {...register("password")}
                  id="password"
                  autoComplete="new-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && <p className="mt-1 text-sm text-danger-600">{errors.password?.message}</p>}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="repeatPassword" className="block text-sm font-medium text-gray-700">
                Repeat password
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  {...register("repeatPassword")}
                  id="repeatPassword"
                  autoComplete="new-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {watch("password") && !errors.password && errors.repeatPassword && <p className="mt-1 text-sm text-danger-600">{errors.repeatPassword?.message}</p>}
              </div>
            </div>

          </div>
        </div>
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={() => reset({ ...initializeFormData() }, { keepValues: false })}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            // disabled={true}
          >
            <ButtonSpinner loading={false} buttonText="Sign up" />
          </button>
        </div>
      </form>
    </div>
  )
}

export default SignupForm
