export type Currency = 'RUB' | 'USD' | 'EUR';

export interface ColorVariant {
    name: string;
    color: string;
    imageUrl: string;
    images: string[];
}

export interface ProductCardProps {
    title: string;
    origin: string;
    price: number;
    currency: Currency;
    imageUrl: string;
    colors?: ColorVariant[];
    selectedColor?: string;
    onColorChange?: (color: string) => void;
} 