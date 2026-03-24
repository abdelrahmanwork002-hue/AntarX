import { getTranslations } from 'next-intl/server';
import { getBlogPostBySlug } from '@/lib/actions';
import { notFound } from 'next/navigation';
import { Link } from '@/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug, locale } = await props.params;
  const post = await getBlogPostBySlug(slug);
  const t = await getTranslations('BlogPage');

  if (!post) notFound();

  const title = locale === 'ar' ? post.titleAr : post.titleEn;
  const content = locale === 'ar' ? post.contentAr : post.contentEn;

  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <article className="mx-auto max-w-4xl px-4 pt-32 pb-20">
        <Link 
          href="/blog" 
          className="flex items-center gap-2 text-zinc-500 hover:text-black dark:hover:text-white transition-colors mb-12"
        >
          {locale === 'ar' ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
          {t('back')}
        </Link>

        {post.featuredImage && (
          <div className="aspect-[21/9] w-full overflow-hidden rounded-[3rem] bg-zinc-100 dark:bg-zinc-800 mb-12">
            <img src={post.featuredImage} alt={title} className="h-full w-full object-cover" />
          </div>
        )}

        <h1 className="text-4xl font-black text-black dark:text-white sm:text-6xl mb-8 leading-tight">
          {title}
        </h1>

        <div className="prose prose-lg dark:prose-invert max-w-none prose-orange">
          {content.split('\n').map((para: string, i: number) => (
            para && <p key={i} className="mb-6 leading-relaxed text-zinc-700 dark:text-zinc-300">{para}</p>
          ))}
        </div>
      </article>
    </div>
  );
}
