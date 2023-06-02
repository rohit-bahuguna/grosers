import { v4 as uuid } from 'uuid';

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
	{
		_id: uuid(),
		categoryName: 'Fruits & Vegetables',
		subCategories: [
			{ _id: uuid(), subCategoryName: 'Fresh Vegetables' },
			{ _id: uuid(), subCategoryName: 'Fresh Fruits' },
			{ _id: uuid(), subCategoryName: 'Premium Fruits' },
			{ _id: uuid(), subCategoryName: 'Herbs & Seasonings' },
			{ _id: uuid(), subCategoryName: 'Exotic Fruits & Vegetables' }
		],
		banner: '/images/category/Fruits-and-Vegetables.jpg'
	},
	{
		_id: uuid(),
		categoryName: 'Dairy & Bakery',
		subCategories: [
			{ _id: uuid(), subCategoryName: 'Dairy' },
			{ _id: uuid(), subCategoryName: 'Toast & Khari' },
			{ _id: uuid(), subCategoryName: 'Breads and Buns' },
			{ _id: uuid(), subCategoryName: 'Cakes & Muffins' },
			{ _id: uuid(), subCategoryName: 'Paneer & Tofu' }
		],
		banner:
			'https://d2pyicwmjx3wii.cloudfront.net/s/60a39f1801d30d79c4caa94b/62e267b05ad1bccc988d7ffe/webp/dairy-and-bakery-1080x529.jpg'
	},
	{
		_id: uuid(),
		categoryName: 'Staples',
		subCategories: [
			{ _id: uuid(), subCategoryName: 'Atta, Flours & Sooji' },
			{ _id: uuid(), subCategoryName: 'Dals & Pulses' },
			{ _id: uuid(), subCategoryName: 'Rice & Rice Products' },
			{ _id: uuid(), subCategoryName: 'Oils & Ghee' },
			{ _id: uuid(), subCategoryName: 'Combo Offer' },
			{ _id: uuid(), subCategoryName: 'Sugar & Jaggery' }
		],
		banner: '/images/category/staples.jpg'
	},
	{
		_id: uuid(),
		categoryName: 'Snacks & Branded Foods',
		subCategories: [
			{ _id: uuid(), subCategoryName: 'Biscuits & Cookies' },
			{ _id: uuid(), subCategoryName: 'Noodle, Pasta, Vermicelli' },
			{ _id: uuid(), subCategoryName: 'Snacks & Namkeen' },
			{ _id: uuid(), subCategoryName: 'Chocolates & Candies' },
			{ _id: uuid(), subCategoryName: 'Spreads, Sauces, Ketchup' },
			{ _id: uuid(), subCategoryName: 'Pickles & Chutney' },
			{ _id: uuid(), subCategoryName: 'Indian Sweets' }
		],
		banner: '/images/category/snacks.jpeg'
	},
	{
		_id: uuid(),
		categoryName: 'Beverages',
		subCategories: [
			{ _id: uuid(), subCategoryName: 'Tea' },
			{ _id: uuid(), subCategoryName: 'Coffee, Vermicelli' },
			{ _id: uuid(), subCategoryName: 'Fruit juices' },
			{ _id: uuid(), subCategoryName: 'Energy & Soft Drinks' },
			{ _id: uuid(), subCategoryName: 'Soda & Water' },
			{ _id: uuid(), subCategoryName: 'Health Drink & Supplement' }
		],
		banner:
			'https://5.imimg.com/data5/SELLER/Default/2020/10/NP/NQ/FF/115160227/q-500x500.png'
	}
];
