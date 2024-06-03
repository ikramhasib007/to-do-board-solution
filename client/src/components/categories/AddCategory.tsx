import { FC } from 'react'
import { PlusIcon } from '@heroicons/react/20/solid'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@apollo/client'
import { CREATE_CATEGORY, GET_CATEGORIES } from '@/operations/category'

const schema = yup.object().shape({
  title: yup.string().label('Title').required(),
})

type FormValues = {
  title: string;
}

type AddCategoryProps = {}

const AddCategory: FC<AddCategoryProps> = () => {
  const { register, handleSubmit, reset } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: ''
    }
  })
  const [mutate, { loading }] = useMutation(CREATE_CATEGORY, {
    update(cache, { data: { createCategory } }) {
      const cacheData = cache.readQuery({
        query: GET_CATEGORIES,
      })

      cache.writeQuery({
        query: GET_CATEGORIES,
        data: {
          // @ts-expect-error -> to be noted
          categories: [...cacheData.categories, createCategory],
        }
      })
    }
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if(!loading) {
      mutate({
        variables: {
          data
        }
      }).then(({ errors }) => {
        if(!errors) reset({ title: '' }, { keepValues: false })
      })
      .catch((err) => console.log(err))
    }
  }

  return (
    <div>
      <div className='rounded-lg bg-white shadow'>
        <div className='flex flex-col w-72 space-y-4 p-4'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              {...register('title')}
              id="title"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Title"
            />
          </form>
          <button
            type="button"
            className='group relative inline-flex items-center gap-2'
            onClick={() => console.log("I'm clicked!")}
          >
            <div className="rounded-full bg-indigo-600 p-1 text-white shadow-sm group-hover:bg-indigo-500 group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-indigo-600">
              <PlusIcon className="h-4 w-4" aria-hidden="true" />
            </div>
            <span className='font-normal text-sm tracking-wide text-gray-500 group-hover:text-gray-600 text-nowrap'>Add new</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddCategory