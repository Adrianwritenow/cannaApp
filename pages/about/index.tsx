import Image from "next/image";

export default function About() {
  return (
    <div className="min-h-screen  sm:py-24">
      <main>
        <div>
          {/* Hero card */}
          <div className="relative">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="relative shadow-xl  h-96 flex justify-center items-center sm:rounded-2xl sm:overflow-hidden">
                <div className="absolute inset-0">
                  <div className="h-full w-full">
                    <Image
                      src={
                        "https://images.unsplash.com/photo-1597266028990-0d03b2e9a2a0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2503&q=80"
                      }
                      className={"h-full w-full object-cover"}
                      alt="Marijuana Bud"
                      layout="fill"
                    />
                  </div>

                  <div className="absolute inset-0 bg-green-700 mix-blend-multiply" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 prose prose-indigo text-center prose-lg text-gray-500 mx-auto">
          <p>
            Faucibus commodo massa rhoncus, volutpat. <strong>Dignissim</strong>{" "}
            sed <strong>eget risus enim</strong>. Mattis mauris semper sed amet
            vitae sed turpis id. Id dolor praesent donec est. Odio penatibus
            risus viverra tellus varius sit neque erat velit. Faucibus commodo
            massa rhoncus, volutpat. Dignissim sed eget risus enim.{" "}
            <a href="#">Mattis mauris semper</a> sed amet vitae sed turpis id.
          </p>
          <p>
            Quis semper vulputate aliquam venenatis egestas sagittis quisque
            orci. Donec commodo sit viverra aliquam porttitor ultrices gravida
            eu. Tincidunt leo, elementum mattis elementum ut nisl, justo, amet,
            mattis. Nunc purus, diam commodo tincidunt turpis. Amet, duis sed
            elit interdum dignissim.
          </p>
        </div>{" "}
      </main>
    </div>
  );
}
