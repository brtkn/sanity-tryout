import { fullBlog } from '@/app/lib/interface';
import { client, urlFor } from '@/app/lib/sanity';
import { PortableText } from 'next-sanity';
import Image from 'next/image';

async function getData(slug: string) {
  const query = `
    *[_type=="blog"&& slug.current == '${slug}']{
        "currentSlug": slug.current,
          title,
          content,
          titleImage
    }[0]`;

  const data = await client.fetch(query);
  return data;
}

export default async function BlogArticle({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullBlog = await getData(params.slug);

  return (
    <div className='mt-8'>
      <h1>
        <span className='block text-center text-base text-primary font-semibold tracking-wide uppercase'>
          Jan Marshall - Blog
        </span>
        <span className='mt-2 block text-3xl text-center leading-8 tracking-tight sm:text-4xl'>
          {data.title}
        </span>
      </h1>
      <Image
        src={urlFor(data.titleImage).url()}
        alt='Image'
        width={800}
        height={800}
        className='rounded mt-8 border '
        priority
      />
      <div className='mt-16 prose prose-blue prose-xl dark:prose-invert prose-headings:underline prose-li:marker:text-primary'>
        <PortableText value={data.content} />
      </div>
    </div>
  );
}
