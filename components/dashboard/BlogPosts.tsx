import Transition from "../motion/Transition";
import { fade } from "@/constants/transitions";

const posts = [
  {
    title: "Boost your conversion rate",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
  },
  {
    title: "How to use search engine optimization to drive sales",
    href: "#",
    description:
      "Optio cum necessitatibus dolor voluptatum provident commodi et. Qui aperiam fugiat nemo cumque.",
    date: "Mar 10, 2020",
    datetime: "2020-03-10",
  },
  {
    title: "Improve your customer experience",
    href: "#",
    description:
      "Cupiditate maiores ullam eveniet adipisci in doloribus nulla minus. Voluptas iusto libero adipisci rem et corporis.",
    date: "Feb 12, 2020",
    datetime: "2020-02-12",
  },
  {
    title: "Writing effective landing page copy",
    href: "#",
    description:
      "Ipsum voluptates quia doloremque culpa qui eius. Id qui id officia molestias quaerat deleniti. Qui facere numquam autem libero quae cupiditate asperiores vitae cupiditate. Cumque id deleniti explicabo.",
    date: "Jan 29, 2020",
    datetime: "2020-01-29",
  },
];

const BlogPosts = () => {
  return (
    <Transition
      variants={fade}
      name="welcome-history"
      className="divide-y divide-purple-700"
    >
      {posts.map((post) => (
        <li
          key={post.href}
          className="relative px-4 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-purple-700"
        >
          <div className="flex justify-between space-x-3">
            <div className="flex-1 min-w-0">
              <a href={post.href} className="block focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-purple-500 truncate">
                  {post.title}
                </p>
                <p className="text-sm text-indigo-500 truncate">
                  {post.description}
                </p>
              </a>
            </div>
            <time
              dateTime={post.datetime}
              className="flex-shrink-0 text-sm text-purple-700 whitespace-nowrap"
            >
              {post.datetime}
            </time>
          </div>
          <div className="mt-1">
            <p className="text-sm text-white line-clamp-3">
              {post.description}
            </p>
          </div>
        </li>
      ))}
    </Transition>
  );
};

export default BlogPosts;
