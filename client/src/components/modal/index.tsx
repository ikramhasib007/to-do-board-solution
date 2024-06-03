import { FC, PropsWithChildren } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { classNames } from '@/utils';

interface ModalProps extends PropsWithChildren {
  open: boolean;
  onClose: () => void;
  onAccept?: () => void;
  title?: string;
  successButtonText?: string;
  cancelButtonText?: string;
  width?: 'minimal' | 'lg';
  footer?: boolean;
}

const Modal: FC<ModalProps> = ({
  open, onClose, onAccept, children,
  title, width = "minimal",
  successButtonText = 'Save',
  cancelButtonText = 'Cancel',
  footer = false,
}) => {

  return (
    <>
      <Transition show={open}>
        <Dialog onClose={onClose} className="relative z-50">
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" />
          </TransitionChild>

          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
              <DialogPanel className={classNames(
                width === "lg" ? "min-w-112 sm:min-w-160 md:min-w-176 sm:max-w-xl md:max-w-3xl lg:max-w-5xl" : "max-w-lg",
                "space-y-4 bg-white rounded-lg p-6 sm:p-10"
              )}>
                {title && <DialogTitle className="text-lg font-bold">{title}</DialogTitle>}
                {children}

                {footer && <div className="mt-5 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-neutral-600 text-base font-medium text-white hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={onAccept}
                  >
                    {successButtonText}
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={onClose}
                  >
                    {cancelButtonText}
                  </button>
                </div>}  
              </DialogPanel>
            </div>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  )
}

export default Modal
