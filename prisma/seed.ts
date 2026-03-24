import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const products = [
    {
      nameAr: 'عصير برتقال طازج',
      nameEn: 'Fresh Orange Juice',
      descriptionAr: 'برتقال طبيعي 100% بدون سكر مضاف.',
      descriptionEn: '100% natural orange juice with no added sugar.',
      price: 45,
      type: 'fresh',
      category: 'traditional',
      images: ['https://images.unsplash.com/photo-1621506289937-48e46279d57c?auto=format&fit=crop&q=80&w=400'],
    },
    {
      nameAr: 'عصير مانجو استوائي',
      nameEn: 'Tropical Mango Juice',
      descriptionAr: 'مانجو فاخرة مبردة.',
      descriptionEn: 'Premium chilled mango.',
      price: 60,
      type: 'fresh',
      category: 'blended',
      images: ['https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&q=80&w=400'],
    },
    {
      nameAr: 'باقة لتر - برتقال',
      nameEn: '1L Bottle - Orange',
      descriptionAr: 'زجاجة لتر للتوصيل أو الطلبات الكبيرة.',
      descriptionEn: '1L bottle for delivery or bulk orders.',
      price: 120,
      type: 'ready',
      category: 'bulk',
      images: ['https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=400'],
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  await prisma.blogPost.create({
    data: {
      titleAr: 'لماذا عصير عنترX هو الأفضل بعد التمرين؟',
      titleEn: 'Why AntarX is the Best Post-Workout Choice?',
      contentAr: 'العصير الطازج يوفر المعادن والسكريات الطبيعية التي يحتاجها جسمك بعد مجهود شاق.\nنحن نحرص على تقديم أفضل الفواكه المحلية لضمان أفضل تغذية.',
      contentEn: 'Fresh juice provides the minerals and natural sugars your body needs after a hard workout.\nWe ensure the best local fruits are used for maximum nutrition.',
      slug: 'post-workout-choice',
      published: true,
      category: 'Health',
      featuredImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200'
    }
  });

  console.log('Seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
