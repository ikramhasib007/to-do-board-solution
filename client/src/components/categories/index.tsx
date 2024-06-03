import { FC, useState } from 'react'
import AddCategory from './AddCategory'
import { PlusIcon } from '@heroicons/react/20/solid'
import Modal from '../modal'
import { useQuery } from '@apollo/client'
import { GET_CATEGORIES } from '@/operations/category'
import { Category } from '@/types'
import AddTicket from '../tickets/AddTicket'

type State = {
  isOpen: boolean;
  category?: Category;
}

type CategoriesProps = {}

const Categories: FC<CategoriesProps> = () => {
  let [state, setState] = useState<State>({ isOpen: false, category: undefined })
  const { data, loading } = useQuery(GET_CATEGORIES, {
    fetchPolicy: 'network-only'
  })
  // console.log('[Categories] data, loading: ', data, loading);
  
  return (
    <div className='flex overflow-auto gap-6 pb-6'>
      <ul role="list" className="mx-[3px] flex flex-row gap-6">
        {loading && !data && <CategoriesSkeleton />}
        {data?.categories.map((category: Category, i: number) => (
          <li key={category.title + i} className="divide-y divide-gray-200 rounded-lg bg-white shadow">
            <div className="sm:flex-auto p-4">
              <h4 className="text-base font-semibold leading-6 text-gray-900">{category.title}</h4>
            </div>
            <div className="flex w-72 items-center justify-between space-x-4 p-4">
              <div className="group relative flex-1 truncate hover:cursor-pointer">
                <div className="flex items-center justify-between space-x-3">
                  <h3 className="truncate text-sm font-medium text-gray-900 group-hover:text-gray-600">Ticket title</h3>
                  <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 group-hover:text-green-600 ring-1 ring-inset ring-green-600/20">
                    Label
                  </span>
                </div>
                <p className="mt-1 truncate text-sm text-gray-500 group-hover:text-gray-400">Ticket description</p>
              </div>              
            </div>
            <div>
              <div className="-mt-px flex">
                <div className="flex w-0 flex-1">
                  <button
                    type="button"
                    className='group relative inline-flex items-center gap-2 px-4 py-2'
                    onClick={() => setState(prevState => ({ ...prevState, isOpen: true, category }))}
                  >
                    <div className="rounded-full bg-indigo-600 p-1 text-white shadow-sm group-hover:bg-indigo-500 group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-indigo-600">
                      <PlusIcon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <span className='font-normal text-sm text-gray-500 group-hover:text-gray-600'>Add a ticket</span>
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      
      {!loading && <AddCategory />}

      <Modal
        open={state.isOpen}
        onClose={() => setState(prevState => ({ ...prevState, isOpen: false }))}
        onAccept={() => setState(prevState => ({ ...prevState, isOpen: false }))}
        width="lg"
      >
        <AddTicket category={state.category!} />
      </Modal>

    </div>
  )
}

export default Categories

function CategoriesSkeleton() {
  return (
    <div className="animate-pulse-1s divide-y divide-gray-200 rounded-lg bg-white shadow">
      <div className="sm:flex-auto p-4">
        <div className="h-6 w-40 bg-slate-200 rounded"></div>
      </div>
      <div className="flex w-72 items-center justify-between space-x-4 p-4">
        <div className="group relative flex-1 truncate hover:cursor-pointer">
          <div className="flex items-center justify-between space-x-3">
            <div className="h-5 w-full bg-slate-200 rounded"></div>
          </div>
          <div className="mt-2 h-4 w-full bg-slate-200 rounded"></div>
        </div>              
      </div>
      <div>
        <div className="-mt-px flex">
          <div className="flex w-0 flex-1">
            <div
              className='group relative inline-flex items-center gap-2 px-4 py-2'
            >
              <div className="rounded-full bg-slate-200 p-1 text-white shadow-sm">
                <div className="h-4 w-4 bg-slate-200 rounded"></div>
              </div>
              <div className="h-4 w-24 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}