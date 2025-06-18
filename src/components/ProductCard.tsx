import { type FC, useState, useCallback } from 'react';
import type { ProductCardProps } from '../types/product';
import ProductModal from './ProductModal';

const ProductCard: FC<ProductCardProps> = (props) => {
    const { 
        title, 
        origin, 
        price, 
        currency, 
        imageUrl, 
        colors = [],
        selectedColor: externalSelectedColor,
        onColorChange 
    } = props;

    const [selectedColor, setSelectedColor] = useState<string>(externalSelectedColor ?? colors[0]?.name ?? '');
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleOpenModal = useCallback((): void => {
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback((): void => {
        setIsModalOpen(false);
    }, []);

    const currentImage = colors.find(c => c.name === selectedColor)?.imageUrl ?? imageUrl;
    const formattedPrice = formatPrice(price, currency);

    return (
        <>
            <article 
                className="group relative bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden 
                         shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 
                         hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] hover:-translate-y-1
                         cursor-pointer"
                itemScope 
                itemType="http://schema.org/Product"
                onClick={handleOpenModal}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleOpenModal();
                    }
                }}
            >
                <div className="relative pb-[75%] xs:pb-[100%] overflow-hidden bg-gray-100">
                    <img
                        className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 
                                 group-hover:scale-105"
                        src={currentImage}
                        alt={`${title} - ${selectedColor}`.trim()}
                        loading="lazy"
                        itemProp="image"
                        width="800"
                        height="800"
                    />
                    <div 
                        className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 opacity-0 
                                 group-hover:opacity-100 transition-opacity duration-300" 
                        aria-hidden="true"
                    />
                </div>
                <div className="relative p-4 xs:p-6">
                    <div 
                        className="absolute -top-4 right-4 xs:right-6 bg-white/90 backdrop-blur-md px-3 xs:px-4 py-1 
                                 rounded-full shadow-lg text-xs xs:text-sm text-gray-600 font-medium"
                        itemProp="countryOfOrigin"
                    >
                        {origin}
                    </div>
                    
                    <h2 
                        className="font-bold text-lg xs:text-xl mb-3 text-gray-800 line-clamp-2 leading-tight"
                        itemProp="name"
                    >
                        {title}
                    </h2>

                    {colors.length > 0 && (
                        <div 
                            className="flex gap-2 mb-4" 
                            role="radiogroup" 
                            aria-label="Выбор цвета"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {colors.map((colorVar) => (
                                <button
                                    key={colorVar.name}
                                    className={`w-6 h-6 rounded-full border-2 transition-all duration-200 
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
                    )}
                    
                    <div className="flex flex-col xs:flex-row items-start xs:items-center gap-3 xs:gap-0 
                                  xs:justify-between">
                        <p 
                            className="text-xl xs:text-2xl font-semibold bg-gradient-to-r from-purple-600 
                                     to-blue-600 bg-clip-text text-transparent"
                            itemProp="offers" 
                            itemScope 
                            itemType="http://schema.org/Offer"
                        >
                            <meta itemProp="priceCurrency" content={currency} />
                            <meta itemProp="price" content={String(price / 100)} />
                            <meta itemProp="availability" content="https://schema.org/InStock" />
                            {formattedPrice}
                        </p>
                        <button 
                            className="w-full xs:w-auto bg-gradient-to-r from-purple-600 to-blue-600 
                                     text-white px-4 xs:px-6 py-2 rounded-full text-sm font-medium 
                                     transition-all duration-300 hover:shadow-lg hover:scale-105 
                                     active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-600 
                                     focus:ring-offset-2"
                            aria-label={`Добавить ${title} в корзину`}
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                // TODO: Добавить логику добавления в корзину
                            }}
                        >
                            В корзину
                        </button>
                    </div>
                </div>
            </article>

            <ProductModal 
                {...props}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                selectedColor={selectedColor}
            />
        </>
    );
};

export default ProductCard; 