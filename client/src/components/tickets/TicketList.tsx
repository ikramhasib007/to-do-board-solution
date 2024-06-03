import { FC } from 'react'
import { useQuery } from '@apollo/client'
import { GET_TICKETS } from '@/operations/ticket'
import { Category, Ticket } from '@/types'

type TicketListProps = {
  category: Category;
}

const TicketList: FC<TicketListProps> = ({
  category
}) => {
  const { data, loading } = useQuery(GET_TICKETS, {
    variables: {
      categoryId: category.id,
    },
    fetchPolicy: 'network-only'
  })

  // console.log('[TicketList] data, loading: ', data, loading);

  if(loading) return <TicketLoadingSkeleton />

  if(!data || !data?.tickets.length) return <div className='flex w-72 border-t-required' />

  return (
    <>
      {data.tickets.map((ticket: Ticket) => (
        <div key={ticket.id} className="flex w-72 items-center justify-between space-x-4 p-4">
          <div className="group relative flex-1 truncate hover:cursor-pointer">
            <div className="flex items-center justify-between space-x-3">
              <h3 className="truncate text-sm font-medium text-gray-900 group-hover:text-gray-600">{ticket.title}</h3>
              <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 group-hover:text-green-600 ring-1 ring-inset ring-green-600/20">
                Label
              </span>
            </div>
            <p className="mt-1 truncate text-sm text-gray-500 group-hover:text-gray-400">{ticket.description}</p>
          </div>              
        </div>
      ))}
    </>
  )
}

export default TicketList

function TicketLoadingSkeleton() {
  return (
    <div className="flex w-72 items-center justify-between space-x-4 p-4">
      <div className="group relative flex-1 truncate hover:cursor-pointer">
        <div className="flex items-center justify-between space-x-3">
          <div className="h-5 w-full bg-slate-200 rounded"></div>
        </div>
        <div className="mt-2 h-4 w-full bg-slate-200 rounded"></div>
      </div>              
    </div>
  )
}
