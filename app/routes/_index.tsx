import { useLoaderData } from "@remix-run/react";
import { json, MetaFunction } from "@vercel/remix";
import { Container, LogoAnimation, TagCloud } from "~/components";
import { notesControllerGetTagCloud } from "../../api";

export const meta: MetaFunction = () => {
  return [
    { title: "goker" },
    { property: "og:title", content: "goker" },
    {
      name: "description",
      content:
        "I'm oil-free piece of fried eggs, determined to cling on the floor and completely contrary from the whole...",
    },
  ];
};

export async function loader() {
  const tags = await notesControllerGetTagCloud().catch((err) => {
    throw new Response(String(err), {
      status: 500,
    });
  });
  return json({ tags, meta: {} });
}

export default function Index() {
  const { tags } = useLoaderData<typeof loader>();

  return (
    <>
      <Container>
        <div className="h-full flex flex-col items-center sm:justify-center w-full">
          <div className="p-4 md:w-[300px] lg:w-[500px]">
            <LogoAnimation className="block sm:hidden p-4 mb-4 mx-auto dark:fill-white fill-gray-900 w-44 h-44" />
            <form
              method="GET"
              action="/@goker"
              className="group flex bg-white rounded-full items-center px-2 pr-4 border border-neutral-600"
            >
              <i className="icon-search text-2xl" />
              <input
                name="search"
                placeholder="search"
                className="w-full px-2 py-2.5 border-0 outline-0 text-neutral-700 rounded-full"
              />
            </form>
            <div className="-mx-4 mt-8 sm:mt-2.5 flex space-x-2">
              <LogoAnimation className="hidden sm:block dark:fill-white fill-gray-900 w-44 h-44 float-left mr-4" />
              <div>
                <TagCloud tags={tags} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
