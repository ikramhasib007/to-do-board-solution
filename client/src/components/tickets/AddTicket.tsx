import '../../utils/date.extensions'
import { FC } from 'react'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import { CalendarIcon, UserCircleIcon } from '@heroicons/react/20/solid'
import { classNames } from '@/utils'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Category } from '@/types'
import { useApolloClient, useQuery } from '@apollo/client'
import { GET_USER, GET_USERS } from '@/operations/user'

const dueDates = [
  { name: 'No due date', value: null },
  { name: 'Today', value: new Date() },
  { name: 'Tomorrow', value: new Date().addDays(1) },
  { name: 'Day after tomorrow', value: new Date().addDays(2) },
]

const schema = yup.object().shape({
  title: yup.string().trim().label('Title').required(),
  description: yup.string().trim().label('Description').required(),
  expiryDate: yup.object().label('Expiry date').nullable().required(),
  category: yup.object().label('Category').nullable().required(),
  user: yup.object().label('User').nullable().required(),
});

type AddTicketProps = {
  category: Category;
}

const AddTicket: FC<AddTicketProps> = ({
  category
}) => {
  const client = useApolloClient()
  const { user } = client.readQuery({ query: GET_USER })
  const { data: usersData, loading: usersLoading } = useQuery(GET_USERS)
  // console.log('[GET_USERS] usersData, usersLoading: ', usersData, usersLoading);
  // console.log('[AddTicket] user: ', user, 'category: ', category);

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      expiryDate: '',
      category,
      user: '',
    }
  })
  
  const onSubmit = (data: any) => {
    console.log('data: ', data);

  }

  const assigned = watch('user')
  const dated = watch('expiryDate')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative">
      <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
        <label htmlFor="title" className="sr-only">
          Title
        </label>
        <input
          type="text"
          {...register('title')}
          id="title"
          className="block w-full border-0 pt-2.5 text-lg font-medium placeholder:text-gray-400 focus:ring-0"
          placeholder="Title"
        />
        <label htmlFor="description" className="sr-only">
          Description
        </label>
        <textarea
          rows={6}
          {...register('description')}
          id="description"
          className="block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="Write a description..."
        />

        {/* Spacer element to match the height of the toolbar */}
        <div aria-hidden="true">
          <div className="py-2">
            <div className="h-9" />
          </div>
          <div className="h-px" />
          <div className="py-2">
            <div className="py-px">
              <div className="h-9" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-px bottom-0">
        {/* Actions: These are just examples to demonstrate the concept, replace/wire these up however makes sense for your project. */}
        <div className="flex flex-nowrap justify-end space-x-2 px-2 py-2 sm:px-3">
          <Listbox as="div" value={assigned} onChange={(value) => setValue('user', value)} className="flex-shrink-0">
            {({ open }) => (
              <>
                <Label className="sr-only">Assign</Label>
                <div className="relative">
                  <ListboxButton className="relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 sm:px-3">
                    <UserCircleIcon className="h-5 w-5 flex-shrink-0 text-gray-300 sm:-ml-1" aria-hidden="true" />
                    <span
                      className={classNames(
                        // @ts-expect-error
                        (!assigned || (assigned.value === null)) ? '' : 'text-gray-900',
                        'hidden truncate sm:ml-2 sm:block'
                      )}
                    >
                      {/* @ts-expect-error */}
                      {(!assigned || (assigned.value === null)) ? 'Assign' : `${assigned.firstName} ${assigned.lastName}`}
                    </span>
                  </ListboxButton>

                  <Transition
                    show={open}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <ListboxOptions className="absolute right-0 z-10 mt-1 max-h-56 w-52 overflow-auto rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {[{ id: 'idx', firstName: 'Unassigned', value: null }, ...usersData?.users].map((assignee) => (
                        <ListboxOption
                          key={assignee.id}
                          className={({ focus }) =>
                            classNames(
                              focus ? 'bg-gray-100' : '',
                              !focus ? 'bg-white' : '',
                              'relative cursor-default select-none px-3 py-2'
                            )
                          }
                          value={assignee}
                        >
                          <div className="flex items-center">
                            <UserCircleIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />                            
                            <span className="ml-3 block truncate font-medium">
                              {assignee?.value === null ? assignee.firstName : `${assignee.firstName} ${assignee.lastName}`}
                            </span>
                          </div>
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>

          <Listbox as="div" value={dated} onChange={(value) => setValue('expiryDate', value)} className="flex-shrink-0">
            {({ open }) => (
              <>
                <Label className="sr-only">Add a due date</Label>
                <div className="relative">
                  <ListboxButton className="relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 sm:px-3">
                    <CalendarIcon
                      className={classNames(
                        // @ts-expect-error
                        !dated.value ? 'text-gray-300' : 'text-gray-500',
                        'h-5 w-5 flex-shrink-0 sm:-ml-1'
                      )}
                      aria-hidden="true"
                    />
                    <span
                      className={classNames(
                        // @ts-expect-error
                        !dated.value ? '' : 'text-gray-900',
                        'hidden truncate sm:ml-2 sm:block'
                      )}
                    >
                      {/* @ts-expect-error */}
                      {!dated.value ? 'Due date' : dated.name}
                    </span>
                  </ListboxButton>

                  <Transition
                    show={open}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <ListboxOptions className="absolute right-0 z-10 mt-1 max-h-56 w-52 overflow-auto rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {dueDates.map((dueDate, i) => (
                        <ListboxOption
                          key={`${dueDate.value}${i}`}
                          className={({ focus }) =>
                            classNames(
                              focus ? 'bg-gray-100' : '',
                              !focus ? 'bg-white' : '',
                              'relative cursor-default select-none px-3 py-2'
                            )
                          }
                          value={dueDate}
                        >
                          <div className="flex items-center">
                            <span className="block truncate font-medium">{dueDate.name}</span>
                          </div>
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        </div>
        <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
          <div className="flex">
          </div>
          <div className="flex-shrink-0">
            <button
              type="submit"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default AddTicket
