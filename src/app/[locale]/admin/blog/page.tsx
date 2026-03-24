import prisma from '@/lib/prisma';

export default async function AdminBlogPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-black text-black dark:text-white">Blog Management</h1>
        <button className="rounded-full bg-black px-6 py-3 font-bold text-white transition-all hover:bg-zinc-800 dark:bg-white dark:text-black">
          New Post
        </button>
      </div>

      <div className="mt-12 space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="flex items-center justify-between gap-6 rounded-3xl bg-white p-6 shadow-sm dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 transition-all hover:shadow-md">
            <div className="flex items-center gap-6">
              <div className="h-16 w-16 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
                <img src={post.featuredImage || '/logo.png'} alt={post.titleEn} className="h-full w-full object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{post.titleEn}</h3>
                <p className="text-sm text-zinc-500">{post.category} • {post.published ? 'Published' : 'Draft'}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="rounded-xl px-4 py-2 text-sm font-bold transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800">Edit</button>
              <button className="rounded-xl px-4 py-2 text-sm font-bold text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20">Delete</button>
            </div>
          </div>
        ))}
        {posts.length === 0 && (
          <div className="py-20 text-center text-zinc-500">No blog posts yet. Create your first one.</div>
        )}
      </div>
    </div>
  );
}
