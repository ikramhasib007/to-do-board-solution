export default function Footer() {
  return (
    <footer className="bg-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="border-t border-gray-900/10 pt-8">
          <p className="text-xs leading-5 text-gray-500">&copy; {new Date().getFullYear()} Your Company, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
