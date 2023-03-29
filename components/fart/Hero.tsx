import BasicButton from "../buttons/BasicButton";

export default function Hero() {
  return (
    <div className="min-h-screen bg-white hero bg-opacity-10">
      <div className="text-center hero-content">
        <div className="max-w-md">
          {/* <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className="btn btn-primary">Get Started</button> */}
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              state of the fart AI - fart-generation
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We have so many farts... so many farts... so many farts... so many
              farts...
            </p>
            <div className="flex items-center justify-center mt-10 gap-x-6">
              <BasicButton as="link" href="#">
                Join the waitlist
              </BasicButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
