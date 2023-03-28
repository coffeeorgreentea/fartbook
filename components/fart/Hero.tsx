import BasicButton from "../buttons/BasicButton";

export default function Hero() {
  return (
    <div className="hero min-h-screen bg-white bg-opacity-10">
      <div className="hero-content text-center">
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
              State of the Art Fart-Generation AI
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We have so many farts... so many farts... so many farts... so many
              farts...
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <BasicButton as="link" href="#">
                Get farted
              </BasicButton>
              <BasicButton as="link" href="#">
                Learn more
              </BasicButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
