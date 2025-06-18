import ProductCard from './components/ProductCard'
import type { Currency } from './types/product'
import { useEffect } from 'react'

function App() {
  // Предзагрузка изображений
  useEffect(() => {
    const preloadImages = (urls: string[]) => {
      urls.forEach(url => {
        const img = new Image();
        img.src = url;
      });
    };

    // Собираем все URL изображений
    const imageUrls = products.flatMap(product => [
      product.imageUrl,
      ...product.colors.map(color => color.imageUrl)
    ]);

    preloadImages(imageUrls);
  }, []);

  const products = [
    {
      title: 'Apple iPhone 15 Pro Max 256GB',
      origin: 'Китай',
      price: 34900, // 349 рублей как в ТЗ
      currency: 'RUB' as Currency,
      imageUrl: './images/iphone/front.webp',
      colors: [
        {
          name: 'Black Titanium',
          color: '#4B4C4C',
          imageUrl: './images/iphone/front.webp',
          images: [
            './images/iphone/front.webp',
            './images/iphone/side.webp',
            './images/iphone/back.webp',
            './images/iphone/camera.webp'
          ]
        }
      ]
    },
    {
      title: 'MacBook Pro 14" M3 Pro',
      origin: 'USA',
      price: 34900, // $349 как в ТЗ
      currency: 'USD' as Currency,
      imageUrl: './images/macbook/front.webp',
      colors: [
        {
          name: 'Space Black',
          color: '#1C1C1C',
          imageUrl: './images/macbook/front.webp',
          images: [
            './images/macbook/front.webp',
            './images/macbook/side.webp',
            './images/macbook/open.webp',
            './images/macbook/detail.webp'
          ]
        }
      ]
    },
    {
      title: 'Apple Watch Ultra 2',
      origin: 'Germany',
      price: 34900, // 349€ как в ТЗ
      currency: 'EUR' as Currency,
      imageUrl: './images/watch/blue.webp',
      colors: [
        {
          name: 'Titanium Ocean Blue',
          color: '#2C4B6E',
          imageUrl: './images/watch/blue.webp',
          images: [
            './images/watch/blue.webp',
            './images/watch/natural.webp',
            './images/watch/black.webp'
          ]
        },
        {
          name: 'Titanium Natural',
          color: '#E3C5B5',
          imageUrl: './images/watch/natural.webp',
          images: [
            './images/watch/natural.webp',
            './images/watch/blue.webp',
            './images/watch/black.webp'
          ]
        },
        {
          name: 'Titanium Black',
          color: '#1C1C1C',
          imageUrl: './images/watch/black.webp',
          images: [
            './images/watch/black.webp',
            './images/watch/blue.webp',
            './images/watch/natural.webp'
          ]
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl xs:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Тестовые продукты
            </h1>

          </div>
          
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-6 xs:gap-8">
            {products.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
