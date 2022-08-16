import { PrismaClient } from '@prisma/client';
import classNames from 'classnames';
import Head from 'next/head';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';

export type GetStaticPropsReturnType<P> = {
  props: P;
  revalidate?: number | boolean;
};

export type InferredStaticProps<T> = T extends (ctx?: {
  params?: ParsedUrlQuery;
  preview?: boolean;
  previewData?: any;
}) => Promise<GetStaticPropsReturnType<infer P>>
  ? GetStaticPropsReturnType<P>["props"]
  : never;
export const menuItems = [
  { name: "PHOTOS", href: "/" },
  { name: "DIARY", href: "/diary" },
  { name: "CONTACT", href: "/contact" },
];
export async function getStaticProps() {
  const prisma = new PrismaClient();
  const photos = await prisma.photo.findMany();

  return {
    props: { photos },
  };
}

const Home = ({ photos }: InferredStaticProps<typeof getStaticProps>) => {
  // const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative p-20">
        <div className="flex justify-between gap-20">
          <h1 className="text-6xl mb-20">MAX MONTGOMERY</h1>
          <div className="flex grow justify-evenly">
            {menuItems.map((item, i) => (
              <Link href={item.href} key={item.href}>
                <a
                  className={classNames("anton text-xl", {
                    "text-selected disableClick": i === 0,
                  })}
                >
                  {item.name}
                </a>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap  gap-20 mt-4 px-10 w-fit justify-center">
          {photos.map((photo) => (
            <img
              src={photo.displayUrl}
              alt="test"
              key={photo.displayUrl}
              className="h-[500px]"
            />
          ))}
        </div>
        <p className="poppins ml-auto mt-20 w-fit text-sm font-light">
          All Images © Max Montgomery Photography.
        </p>
      </div>
    </>
  );
};

export default Home;
