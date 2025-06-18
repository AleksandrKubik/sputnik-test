import { type FC, useEffect, useCallback, useState } from 'react';
import type { ProductCardProps, ColorVariant } from '../types/product';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import type { Swiper as SwiperType } from 'swiper';

interface ProductModalProps extends ProductCardProps {
    isOpen: boolean;
    onClose: () => void;
    selectedColor?: string;
}

const ProductModal: FC<ProductModalProps> = ({
    isOpen,
    onClose,
    title,
    origin,
    price,
    currency,
    imageUrl,
    colors = [],
    selectedColor: externalSelectedColor,
    onColorChange
}) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [selectedColor, setSelectedColor] = useState(externalSelectedColor ?? colors[0]?.name ?? '');

    // Находим текущий цвет
    const currentColorVariant = colors.find(c => c.name === selectedColor) as ColorVariant | undefined;
    
    // Получаем все изображения для текущего цвета или используем дефолтное
    const currentImages = currentColorVariant?.images ?? [imageUrl];

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    const formatPrice = useCallback((price: number, currency: string): string => {
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency,
            minimumFractionDigits: 0,
        }).format(price / 100);
    }, []);

    const handleColorChange = useCallback((colorName: string): void => {
        setSelectedColor(colorName);
        onColorChange?.(colorName);
    }, [onColorChange]);

    const formattedPrice = formatPrice(price, currency);

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div 
                className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                <button
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm
                             hover:bg-white transition-colors duration-200"
                    onClick={onClose}
                    aria-label="Закрыть"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Слайдер */}
                    <div className="relative bg-gray-100 p-4">
                        <Swiper
                            style={{
                                '--swiper-navigation-color': '#7c3aed',
                                '--swiper-pagination-color': '#7c3aed',
                            } as React.CSSProperties}
                            spaceBetween={10}
                            navigation={true}
                            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="h-full aspect-square rounded-xl"
                        >
                            {currentImages.map((img, index) => (
                                <SwiperSlide key={`${selectedColor}-${index}`}>
                                    <img
                                        src={img}
                                        alt={`${title} - ${selectedColor} - Изображение ${index + 1}`}
                                        className="w-full h-full object-contain"
                                        loading="lazy"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        
                        {/* Миниатюры */}
                        {currentImages.length > 1 && (
                            <div className="mt-4">
                                <Swiper
                                    onSwiper={setThumbsSwiper}
                                    spaceBetween={10}
                                    slidesPerView={4}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="thumbs-swiper"
                                >
                                    {currentImages.map((img, index) => (
                                        <SwiperSlide key={`thumb-${selectedColor}-${index}`}>
                                            <div className="cursor-pointer rounded-lg overflow-hidden aspect-square">
                                                <img
                                                    src={img}
                                                    alt={`Миниатюра ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        )}
                    </div>

                    {/* Информация о товаре */}
                    <div className="p-6 flex flex-col">
                        <div className="mb-4">
                            <span 
                                className="inline-block px-3 py-1 text-sm font-medium text-gray-600 
                                         bg-gray-100 rounded-full"
                            >
                                {origin}
                            </span>
                        </div>

                        <h2 
                            id="modal-title"
                            className="text-2xl font-bold text-gray-900 mb-4"
                        >
                            {title}
                        </h2>

                        <div className="prose prose-sm text-gray-600 mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Описание</h3>
                            <p>
                                Откройте для себя непревзойденное качество и инновации с {title}. 
                                Этот продукт сочетает в себе передовые технологии и элегантный дизайн, 
                                обеспечивая исключительный пользовательский опыт.
                            </p>
                            <ul className="mt-4">
                                <li>Премиальное качество сборки</li>
                                <li>Передовые технологии</li>
                                <li>Элегантный дизайн</li>
                                <li>Гарантия производителя</li>
                            </ul>
                        </div>

                        {colors.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                    Доступные цвета
                                </h3>
                                <div 
                                    className="flex gap-3" 
                                    role="radiogroup" 
                                    aria-label="Выбор цвета"
                                >
                                    {colors.map((colorVar) => (
                                        <button
                                            key={colorVar.name}
                                            className={`w-8 h-8 rounded-full border-2 transition-all duration-200
                                                      ${selectedColor === colorVar.name 
                                                        ? 'border-purple-600 scale-110' 
                                                        : 'border-gray-300 hover:border-purple-400'}`}
                                            style={{ backgroundColor: colorVar.color }}
                                            onClick={() => handleColorChange(colorVar.name)}
                                            title={`Выбрать цвет: ${colorVar.name}`}
                                            aria-label={`Выбрать цвет: ${colorVar.name}`}
                                            aria-pressed={selectedColor === colorVar.name}
                                            role="radio"
                                            type="button"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mt-auto">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-3xl font-bold text-gray-900">
                                    {formattedPrice}
                                </span>
                                <span className="text-sm text-gray-500">
                                    Доступно к заказу
                                </span>
                            </div>

                            <button
                                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white 
                                         px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 
                                         hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] 
                                         focus:outline-none focus:ring-2 focus:ring-purple-600 
                                         focus:ring-offset-2"
                                type="button"
                            >
                                Добавить в корзину
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal; 