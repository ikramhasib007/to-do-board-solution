import { FC, useState } from 'react'
import AddCategory from './AddCategory'
import { PlusIcon } from '@heroicons/react/20/solid'
import Modal from '../modal'

const categories = [
  {
    name: 'Jane Cooper Jane Cooper Jane Cooper Jane Cooper',
    title: 'Regional Paradigm Technician Regional Paradigm Technician Regional Paradigm Technician',
    role: 'Admin',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Jane Cooper',
    title: 'Regional Paradigm Technician Regional Paradigm Technician Regional Paradigm Technician',
    role: 'Admin',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  
]

type CategoriesProps = {}

const Categories: FC<CategoriesProps> = () => {
  let [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className='overflow-auto pb-6'>
      <ul role="list" className="mx-[3px] flex flex-row gap-6">
        {categories.map((person, i) => (
          <li key={person.email + i} className="divide-y divide-gray-200 rounded-lg bg-white shadow">
            <div className="flex w-72 items-center justify-between space-x-4 p-4">
              <div className="relative flex-1 truncate hover:cursor-pointer">
                <div className="flex items-center justify-between space-x-3">
                  <h3 className="truncate text-sm font-medium text-gray-900">{person.name}</h3>
                  <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    {person.role}
                  </span>
                </div>
                <p className="mt-1 truncate text-sm text-gray-500">{person.title}</p>
              </div>              
            </div>
            <div>
              <div className="-mt-px flex">
                <div className="flex w-0 flex-1">
                  <button
                    type="button"
                    className='group relative inline-flex items-center gap-2 px-4 py-2'
                    onClick={() => setIsOpen(true)}
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

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onAccept={() => setIsOpen(false)}
        width="lg"
      >
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum ipsa qui tempora aperiam voluptatum consequuntur odio explicabo itaque eum, a doloremque maiores, aspernatur sequi! Iusto quae recusandae tempora minima voluptas.</p>
      </Modal>

    </div>
  )
}

export default Categories