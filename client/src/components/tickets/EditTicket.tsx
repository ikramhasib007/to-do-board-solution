import '../../utils/date.extensions'
import { FC, useEffect } from 'react'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import { CalendarIcon, UserCircleIcon } from '@heroicons/react/20/solid'
import { classNames } from '@/utils'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Ticket, User } from '@/types'
import { useMutation, useQuery } from '@apollo/client'
import { GET_USERS } from '@/operations/user'
import { GET_TICKETS, UPDATE_TICKET } from '@/operations/ticket'
import ButtonSpinner from '../spinners/ButtonSpinner'
import { ticketFormVar } from '@/stores'

const dueDates = [
  { name: 'No due date', value: null },
  { name: 'Today', value: new Date() },
  { name: 'Tomorrow', value: new Date().addDays(1) },
  { name: 'Day after tomorrow', value: new Date().addDays(2) },
]

const schema = yup.object().shape({
  title: yup.string().trim().label('Title').required(),
  description: yup.string().trim().label('Description').required(),
  expiryDate: yup.object().label('Expiry date').nullable().required('Expiry date is required'),
  category: yup.object().label('Category').nullable().required(),
  user: yup.object().label('User').nullable().required('Assignee is required'),
});

function initializeFormData(ticket: Ticket) {
  const expiryDate = dueDates.find(item => {
    return (
      item.value?.getFullYear() === new Date(ticket.expiryDate).getFullYear() &&
      item.value?.getMonth() === new Date(ticket.expiryDate).getMonth() &&
      item.value?.getDate() === new Date(ticket.expiryDate).getDate()
    )
  })
  return {
    title: ticket.title,
    description: ticket.description,
    expiryDate: expiryDate || '',
    category: ticket.category,
    user: ticket.user,
  }
}

type EditTicketProps = {
  ticket: Ticket;
  onClose: () => void;
}

const EditTicket: FC<EditTicketProps> = ({
  ticket, onClose
}) => {
  const stageFormValues = ticketFormVar()
  const { data: usersData, loading: usersLoading } = useQuery(GET_USERS)

  const { register, handleSubmit, formState: { errors, isSubmitSuccessful, isDirty }, watch, setValue, reset, clearErrors, setError, getValues } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...initializeFormData(ticket)
    }
  })

  const [mutate, { loading }] = useMutation(UPDATE_TICKET, {
    update(cache, { data: { updateTicket } }) {
      const cacheData = cache.readQuery({
        query: GET_TICKETS,
        variables: { categoryId: ticket.category.id }
      })

      cache.writeQuery({
        query: GET_TICKETS,
        variables: { categoryId: ticket.category.id },
        data: {
          // @ts-expect-error
          tickets: cacheData.tickets.map((item: Ticket) => {
            if(item.id === ticket.id) return updateTicket
            return item
          })
        }
      })
    }
  })
  
  const onSubmit = (data: any) => {
    if(data.user.id === 'idx') return setError('user', { message: 'Assignee is required' })
    const variables = {
      id: ticket.id,
      data: {
        title: data.title,
        description: data.description,
        expiryDate: new Date(data.expiryDate.value).toISOString(),
        categoryId: data.category.id,
        userId: data.user.id,
      }
    }
    if(!loading) {
      mutate({ variables })
      .then(({ errors, data }) => {
        if(!errors) {
          reset(initializeFormData(data.updateTicket), { keepValues: false })
          onClose()
        }
      })
      .catch(err => console.log(err))
    }
  }

  const handleAssigneeChange = (value: User) => {
    setValue('user', value)
    clearErrors('user')
  }

  const handleExpiryDateChange = (value: { name: string, value: Date | null }) => {
    setValue('expiryDate', value)
    clearErrors('expiryDate')
  }

  const assigned = watch('user')
  const dated = watch('expiryDate')

  useEffect(() => {

    return function cleanup() {
      if(isDirty && !isSubmitSuccessful) {
        const formValues = getValues()
        // @ts-expect-error
        stageFormValues[ticket.id] = formValues
        ticketFormVar(stageFormValues)
      }
    }
  })

  useEffect(() => {
    // @ts-expect-error
    if(stageFormValues[ticket.id] && !isDirty) {
      // @ts-expect-error
      reset(stageFormValues[ticket.id])
    }
  }, [ticket, stageFormValues, reset, isDirty])

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
          <Listbox as="div" value={assigned} onChange={handleAssigneeChange} className="flex-shrink-0">
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
                      {!usersLoading && usersData && <>
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
                      </>}
                    </ListboxOptions>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>

          <Listbox as="div" value={dated} onChange={handleExpiryDateChange} className="flex-shrink-0">
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
            {(errors.user && errors.expiryDate) && <p className="text-sm text-danger-600">Assignee and Expiry date is required</p>}
            {!errors.user && errors.expiryDate && <p className="text-sm text-danger-600">Expiry date is required</p>}
            {errors.user && !errors.expiryDate && <p className="text-sm text-danger-600">Assignee is required</p>}
          </div>
          <div className="flex-shrink-0">
            <button
              type="submit"
              className="relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              disabled={loading}
            >
              <ButtonSpinner loading={loading} buttonText='Update' />
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default EditTicket
