import { CalendarIcon, UsersIcon } from "@heroicons/react/solid";

const posts = [
  {
    id: 1,
    title: "Where de best sticky",
    type: "Recommendation",
    by: "DaTroof420",
    closeDate: "2020-01-07",
    closeDateFull: "January 7, 2020",
  },
  {
    id: 2,
    title: "Can I get a #2",
    type: "Other",
    by: "MeeganTheShowPony",
    closeDate: "2020-01-07",
    closeDateFull: "January 7, 2020",
  },
  {
    id: 3,
    title: "Help I think I ate too much RSO???",
    type: "Help",
    by: "RingoStickler",
    closeDate: "2020-01-14",
    closeDateFull: "January 14, 2020",
  },
  {
    id: 4,
    title: "Where can I find cheap pre rolls",
    type: "Recommendation",
    by: "Bill",
    closeDate: "2020-01-14",
    closeDateFull: "January 14, 2020",
  },
];

export default function Forum() {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md min-h-screen">
      <div className="py-16 px-4 sm:py-24 sm:px-6 lg:px-8 bg-gray-100">
        <div className="text-center">
          <h2 className="text-base font-semibold text-green-600 tracking-wide uppercase">
            Lorem Ipsum Dolor
          </h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Forum
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            Chat with others and get info straight from your community
          </p>
        </div>
      </div>
      <ul role="list" className="divide-y divide-gray-200 max-w-5xl mx-auto">
        {posts.map((post) => (
          <li key={post.id}>
            <a href="#" className="block hover:bg-gray-50">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-green-600 truncate">
                    {post.title}
                  </p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {post.type}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      <UsersIcon
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      {post.by}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <CalendarIcon
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <p>
                      <time dateTime={post.closeDate}>
                        {post.closeDateFull}
                      </time>
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
