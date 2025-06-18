/** Поддерживаемые валюты */
export type Currency = 'RUB' | 'USD' | 'EUR';

export interface ColorVariant {
    name: string;
    color: string;
    imageUrl: string;
    images: string[];
}

export interface ProductCardProps {
    /** Название товара */
    title: string;
    /** Страна происхождения */
    origin: string;
    /** 
     * Цена в минимальных единицах валюты
     * @example
     * 34900 - для 349 рублей (34900 копеек)
     * 349 - для $3.49 (349 центов)
     * 349 - для 3.49€ (349 центов)
     */
    price: number;
    /** Валюта цены */
    currency: Currency;
    /** URL изображения товара */
    imageUrl: string;
    /** Варианты цветов товара */
    colors?: ColorVariant[];
    /** Выбранный цвет */
    selectedColor?: string;
    /** Callback при изменении цвета */
    onColorChange?: (color: string) => void;
} 