import { getTranslations } from 'next-intl/server';
import { getBlogPosts } from '@/lib/actions';
import { Link } from '@/navigation';

export default async function BlogPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const t = await getTranslations('BlogPage');
  const posts = await getBlogPosts();

  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <main className="mx-auto max-w-7xl px-4 pt-32 pb-20">
        <div className="text-center">
          <h1 className="text-4xl font-black text-black dark:text-white sm:text-6xl text-center">
            {t('title')}
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 text-center">
            {t('subtitle')}
          </p>
        </div>

        <div className="mt-20 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {posts.length > 0 ? (
            posts.map((post: any) => (
              <BlogCard key={post.id} post={post} locale={locale} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-zinc-500">
              {t('noPosts')}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function BlogCard({ post, locale }: { post: any; locale: string }) {
  const title = locale === 'ar' ? post.titleAr : post.titleEn;

  return (
    <Link href={`/blog/${post.slug}`} className="group space-y-4">
      <div className="aspect-[16/9] overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-800">
        <img
          src={post.featuredImage || '/logo.png'}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-black dark:text-white group-hover:text-orange-600 transition-colors">
          {title}
        </h2>
        <p className="mt-2 text-zinc-500 line-clamp-2">
          {locale === 'ar' ? post.contentAr.substring(0, 100) : post.contentEn.substring(0, 100)}...
        </p>
      </div>
    </Link>
  );
}
