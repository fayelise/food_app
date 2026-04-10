import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

await prisma.menuItem.createMany({
data: [

/* ===== Breakfast ===== */

{ name: "Bacon Egg & Cheese Biscuit", description: "On a buttermilk biscuit", price: 4.49, category: "breakfast", image: "/images/menu/baconegg.png" },
{ name: "Sausage McMuffin", description: "Sausage patty with cheese", price: 3.99, category: "breakfast", image: "/images/menu/sausagemuffin.png" },
{ name: "Hotcakes", description: "Fluffy pancakes with syrup and butter", price: 5.49, category: "breakfast", image: "/images/menu/hotcakes.png" },
{ name: "Breakfast Burrito", description: "Eggs, cheese, bacon, potatoes", price: 5.99, category: "breakfast", image: "/images/menu/breakfastburrito.png" },
{ name: "French Toast Sticks", description: "4 pieces with syrup", price: 4.99, category: "breakfast", image: "/images/menu/toaststicks.png" },
{ name: "Oatmeal", description: "Fresh oatmeal with brown sugar", price: 3.49, category: "breakfast", image: "/images/menu/oatmeal.png" },
{ name: "Egg White Grill", description: "Egg whites, spinach, tomato on English muffin", price: 4.99, category: "breakfast", image: "/images/menu/eggwhitegrill.png" },
{ name: "Hash Browns", description: "Crispy shredded potatoes", price: 2.29, category: "breakfast", image: "/images/menu/hashbrown.png" },
{ name: "Sausage Burrito", description: "Sausage, eggs, cheese, peppers", price: 5.49, category: "breakfast", image: "/images/menu/sausageburrito.png" },
{ name: "Bagel with Cream Cheese", description: "Toasted bagel with cream cheese", price: 3.29, category: "breakfast", image: "/images/menu/bagel.png" },    

/* ===== McDonald's ===== */

{ name: "Big Mac", description: "Double beef, lettuce, cheese, pickles, special sauce", price: 7.5, category: "burger", image: "/images/menu/bigmac.png" },
{ name: "Quarter Pounder with Cheese", description: "Beef patty, cheese, onion, pickles", price: 8, category: "burger", image: "/images/menu/quartercheese.png" },
{ name: "McChicken", description: "Crispy chicken, lettuce, mayo", price: 6, category: "chicken", image: "/images/menu/mcchicken.png" },
{ name: "Spicy McChicken", description: "Spicy crispy chicken with lettuce", price: 6.5, category: "chicken", image: "/images/menu/spicymcchicken.png" },
{ name: "Double Cheeseburger", description: "Two beef patties with cheese", price: 6.5, category: "burger", image: "/images/menu/doublecheese.png" },

/* ===== Wendy's ===== */

{ name: "Dave’s Single", description: "Beef, cheese, lettuce, tomato", price: 8, category: "burger", image: "/images/menu/davesingle.png" },
{ name: "Dave’s Double", description: "Double beef, cheese, lettuce", price: 9, category: "burger", image: "/images/menu/davedouble.png" },
{ name: "Spicy Chicken Sandwich", description: "Spicy fried chicken breast", price: 7.5, category: "chicken", image: "/images/menu/wendyspicychicken.png" },
{ name: "Classic Chicken Sandwich", description: "Breaded chicken with mayo", price: 7, category: "chicken", image: "/images/menu/wendyclassichicken.png" }, 
{ name: "Baconator", description: "Beef patties with bacon and cheese", price: 9.5, category: "burger", image: "/images/menu/baconator.png" },

/* ===== Chick-fil-A ===== */

{ name: "Chick-fil-A Original", description: "Fried chicken breast with pickles", price: 7, category: "chicken", image: "/images/menu/cfaoriginal.png" },
{ name: "Spicy Chick-fil-A Sandwich", description: "Spicy chicken breast", price: 7.5, category: "chicken", image: "/images/menu/cfaspicy.png" },
{ name: "Grilled Chicken Sandwich", description: "Grilled chicken breast", price: 7.5, category: "chicken", image: "/images/menu/cfagrilled.png" },
{ name: "Deluxe Chicken Sandwich", description: "Chicken with cheese and tomato", price: 8, category: "chicken", image: "/images/menu/cfadeluxe.png" },

/* ===== Popeyes ===== */

{ name: "Popeyes Classic Chicken Sandwich", description: "Crispy chicken, pickles, mayo", price: 7.5, category: "chicken", image: "/images/menu/popeyesclassic.png" },
{ name: "Popeyes Spicy Chicken Sandwich", description: "Spicy crispy chicken", price: 8, category: "chicken", image: "/images/menu/popeyesspicy.png" },
{ name: "Blackened Chicken Sandwich", description: "Seasoned grilled chicken", price: 8, category: "chicken", image: "/images/menu/popeyesblack.png" },

/* ===== Shake Shack ===== */

{ name: "ShackBurger", description: "Beef, lettuce, tomato, Shack sauce", price: 8.5, category: "burger", image: "/images/menu/shackburger.png" },
{ name: "SmokeShack", description: "Beef, bacon, cheese", price: 9, category: "burger", image: "/images/menu/smokeshack.png" },   
{ name: "Shroom Burger", description: "Fried mushroom with cheese", price: 8, category: "burger", image: "/images/menu/shroomburger.png" },  
{ name: "Chicken Shack", description: "Crispy chicken breast", price: 8, category: "chicken", image: "/images/menu/chickenshack.png" },

/* ===== Five Guys ===== */

{ name: "Five Guys Cheeseburger", description: "Beef with cheese", price: 9, category: "burger", image: "/images/menu/5guyscheeseburger.png" },
{ name: "Five Guys Bacon Burger", description: "Beef with bacon", price: 9.5, category: "burger", image: "/images/menu/5guysbaconburger.png" },
{ name: "Little Hamburger", description: "Single beef patty", price: 7, category: "burger", image: "/images/menu/5guyslittleham.png" },
{ name: "Little Cheeseburger", description: "Single beef with cheese", price: 7.5, category: "burger", image: "/images/menu/5guyslittlecheese.png" },
{ name: "Grilled Cheese Sandwich", description: "Toasted bun with melted cheese", price: 6, category: "burger", image: "/images/menu/5guysgrilled.png" },

/* ===== Fries ===== */

{ name: "Small Fries", description: "Crispy golden fries", price: 2.5, category: "fries", image: "/images/menu/smallfries.png" },
{ name: "Medium Fries", description: "Medium portion crispy fries", price: 3.2, category: "fries", image: "/images/menu/mediumfries.png" },
{ name: "Large Fries", description: "Large portion crispy fries", price: 3.8, category: "fries", image: "/images/menu/largefries.png" },
{ name: "Curly Fries", description: "Seasoned curly fries", price: 3.5, category: "fries", image: "/images/menu/curlyfries.png" },
{ name: "Cheese Fries", description: "Fries topped with melted cheese", price: 4.5, category: "fries", image: "/images/menu/cheesefries.png" },

/* ===== Drinks ===== */

{ name: "Coca-Cola", description: "Classic Coke", price: 2.5, category: "drink", image: "/images/menu/cocacola.png" },
{ name: "Diet Coke", description: "Sugar free Coke", price: 2.5, category: "drink", image: "/images/menu/coke.png" },
{ name: "Sprite", description: "Lemon lime soda", price: 2.5, category: "drink", image: "/images/menu/sprite.png" },
{ name: "Fanta Orange", description: "Orange flavored soda", price: 2.5, category: "drink", image: "/images/menu/fanta.png" },
{ name: "Iced Tea", description: "Sweet iced tea", price: 2.8, category: "drink", image: "/images/menu/icetea.png" },
{ name: "Lemonade", description: "Fresh lemonade", price: 3, category: "drink", image: "/images/menu/lemonade.png" },
{ name: "Chocolate Milkshake", description: "Creamy chocolate shake", price: 4.5, category: "drink", image: "/images/menu/chocolate.png" },
{ name: "Vanilla Milkshake", description: "Classic vanilla shake", price: 4.5, category: "drink", image: "/images/menu/vanilla.png" },
{ name: "Strawberry Milkshake", description: "Strawberry flavored shake", price: 4.5, category: "drink", image: "/images/menu/strawberry.png" },
{ name: "Bottled Water", description: "Fresh mineral water", price: 1.8, category: "drink", image: "/images/menu/water.png" },

/* ===== Pizza ===== */

{ name: "Margherita Pizza", description: "Tomato sauce, fresh mozzarella, basil", price: 12.99, category: "pizza", image: "/images/menu/margeritta.png" },
{ name: "Pepperoni Pizza", description: "Tomato sauce, mozzarella, pepperoni", price: 14.99, category: "pizza", image: "/images/menu/pepperonipizza.png" },
{ name: "BBQ Chicken Pizza", description: "BBQ sauce, grilled chicken, red onions, cilantro", price: 15.99, category: "pizza", image: "/images/menu/bbqchickenpizza.png" },
{ name: "Four Cheese Pizza", description: "Mozzarella, parmesan, gorgonzola, fontina", price: 13.99, category: "pizza", image: "/images/menu/4cheesepizza.png" },
{ name: "Hawaiian Pizza", description: "Tomato sauce, ham, pineapple, mozzarella", price: 14.49, category: "pizza", image: "/images/menu/hawaienpizza.png" },
{ name: "Meat Lovers Pizza", description: "Pepperoni, sausage, bacon, ham, ground beef", price: 16.99, category: "pizza", image: "/images/menu/meatlovers.png" },
{ name: "Veggie Pizza", description: "Bell peppers, mushrooms, onions, olives, tomatoes", price: 13.49, category: "pizza", image: "/images/menu/veggiepizza.png" },
{ name: "White Pizza", description: "Olive oil, ricotta, mozzarella, garlic, parsley", price: 13.99, category: "pizza", image: "/images/menu/whitepizza.png" },


/* ===== Noodles ===== */

{ name: "Chicken Lo Mein", description: "Egg noodles with chicken and vegetables", price: 11.99, category: "noodles", image: "/images/menu/ChickenLoMein.png" },
{ name: "Beef Chow Fun", description: "Wide rice noodles with beef and bean sprouts", price: 12.99, category: "noodles", image: "/images/menu/Beef Chow Fun.png" },
{ name: "Shrimp Pad Thai", description: "Rice noodles with shrimp, peanuts, bean sprouts", price: 13.99, category: "noodles", image: "/images/menu/Shrimp_Pad_Thai.png" },
{ name: "Vegetable Udon", description: "Thick wheat noodles in savory broth with vegetables", price: 10.99, category: "noodles", image: "/images/menu/Vegetable Udon.png" },
{ name: "Spicy Ramen", description: "Pork broth, noodles, chashu, egg, nori", price: 12.99, category: "noodles", image: "/images/menu/Spicy Ramen.png" },
{ name: "Peking Noodles", description: "Hand-pulled noodles with minced pork", price: 11.49, category: "noodles", image: "/images/menu/Peking Noodles.png" },
{ name: "Singapore Noodles", description: "Curry rice noodles with shrimp and BBQ pork", price: 12.49, category: "noodles", image: "/images/menu/Singapore Noodles.png" },
{ name: "Sesame Noodles", description: "Cold noodles with sesame sauce and cucumber", price: 9.99, category: "noodles", image: "/images/menu/Sesame Noodles.png" },
{ name: "Seafood Noodle Soup", description: "Clear broth with mixed seafood and noodles", price: 14.99, category: "noodles", image: "/images/menu/Seafood Noodle Soup.png" },
{ name: "Dan Dan Noodles", description: "Spicy Sichuan noodles with minced pork", price: 11.99, category: "noodles", image: "/images/menu/Dan Dan Noodles.png" },

/* ===== Chicken Tenders ===== */

{ name: "Classic Chicken Tenders", description: "Hand-breaded chicken tenders", price: 6.99, category: "tenders", image: "/images/menu/Classic Chicken Tenders.png" },
{ name: "Spicy Chicken Tenders", description: "Crispy spicy-breaded tenders", price: 7.49, category: "tenders", image: "/images/menu/Spicy Chicken Tenders.png" },
{ name: "Honey BBQ Tenders", description: "Tossed in honey BBQ sauce", price: 8.49, category: "tenders", image: "/images/menu/Honey BBQ Tenders.png" },
{ name: "Buffalo Tenders", description: "Tossed in spicy buffalo sauce", price: 8.49, category: "tenders", image: "/images/menu/Buffalo Tenders.png" },
{ name: "Garlic Parmesan Tenders", description: "Tossed in garlic parmesan sauce", price: 8.99, category: "tenders", image: "/images/menu/Garlic Parmesan Tenders.png" },
{ name: "Honey Mustard Tenders", description: "Served with honey mustard sauce", price: 7.99, category: "tenders", image: "/images/menu/Honey Mustard Tenders.png" },


/* ===== Desserts ===== */

{ name: "Chocolate Chip Cookie", description: "Fresh baked cookie", price: 2.49, category: "dessert", image: "/images/menu/chocolatechipcookie.png" },
{ name: "Brownie", description: "Rich chocolate brownie", price: 3.49, category: "dessert", image: "/images/menu/brownie.png" },
{ name: "Apple Pie", description: "Classic baked apple pie", price: 3.99, category: "dessert", image: "/images/menu/applepie.png" },
{ name: "Cheesecake", description: "New York style cheesecake", price: 4.99, category: "dessert", image: "/images/menu/cheesecake.png" },
{ name: "Chocolate Lava Cake", description: "Warm cake with molten chocolate center", price: 5.49, category: "dessert", image: "/images/menu/chocolatelavacake.png" },
{ name: "Ice Cream Sundae", description: "Vanilla ice cream with chocolate sauce", price: 3.99, category: "dessert", image: "/images/menu/sundae.png" },
{ name: "Tiramisu", description: "Italian coffee-flavored dessert", price: 5.99, category: "dessert", image: "/images/menu/tiramisu.png" },
{ name: "Cinnamon Roll", description: "Warm roll with cream cheese icing", price: 3.49, category: "dessert", image: "/images/menu/cinamon.png" },
{ name: "Fruit Cup", description: "Fresh mixed fruit", price: 3.99, category: "dessert", image: "/images/menu/fruitcup.png" },



]
});

await prisma.topping.createMany({
data: [

{ name: "Extra Cheese", price: 1, image: "/images/toppings/cheese.png" },
{ name: "Bacon", price: 1.5, image: "/images/toppings/bacon.png" },
{ name: "Jalapenos", price: 0.7, image: "/images/toppings/jalapenos.png" },
{ name: "Avocado", price: 1.2, image: "/images/toppings/avocado.png" },
{ name: "Lettuce", price: 0.3, image: "/images/toppings/lettuce.png" },
{ name: "Tomato", price: 0.4, image: "/images/toppings/tomato.png" },
{ name: "Pickles", price: 0.3, image: "/images/toppings/pickles.png" },
{ name: "BBQ Sauce", price: 0.4, image: "/images/toppings/BBQ Sauce.png" },
{ name: "Spicy Sauce", price: 0.4, image: "/images/toppings/Spicy Sauce.png" },
{ name: "Mayo", price: 0.3, image: "/images/toppings/Mayo.png" },
{ name: "Mushrooms", price: 0.6, image: "/images/toppings/mushroom.png" },
{ name: "Pepperoni", price: 1.2, image: "/images/toppings/pepperoni.png" },
{ name: "Olives", price: 0.5, image: "/images/toppings/Olives.png" },
{ name: "Onions", price: 0.4, image: "/images/toppings/onion.png" },


]
});

console.log("Menu and toppings added");

}

main()
.catch(e => console.error(e))
.finally(() => prisma.$disconnect());