import Layout from "@/components/layout"
import SignupForm from "@/components/signup/SignupForm"

const SignupPage = () => {
  return (
    <Layout>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg lg:max-w-xl">
          <SignupForm />
        </div>
      </div>
    </Layout>
  )
}

export default SignupPage
