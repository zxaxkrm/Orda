import { Product } from "@/lib/types";
import {create} from "zustand";
import { persist } from "zustand/middleware";


export interface CartItem {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    quantity: number
};

interface CartStore {
    items: CartItem[];
     isCartOpen: boolean;

    addItem: (product: Product)=> void;
    removeItem: (id: number)=> void;
    updateQuantity: (id: number, quantity: number)=> void;
    clearCart: ()=> void;
    total: ()=> number;

     openCart: ()=> void;
    closeCart: ()=> void;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get)=>({
            items:[],
             isCartOpen: false,

      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),

            addItem: (product)=>{
                const existing = get().items.find((i)=> i.id === product.id);
                if (existing) {
                    set((s)=>({
                        items: s.items.map((i)=>
                        i.id === product.id ? {...i, quantity:  i.quantity + 1} : i
                        ),
                    }));
                }else{
                    set((s)=>({
                        items: [...s.items, {
                            id: product.id,
                            title: product.title,
                            price: product.price,
                            thumbnail: product.thumbnail,
                            quantity: 1
                        }],
                    }));
                }
                 set({ isCartOpen: true });
            },

            removeItem: (id)=> set((s)=> ({items: s.items.filter((i)=> i.id !== id)})),

            updateQuantity: (id, quantity)=> 
                set((s)=>({
                    items: s.items.map((i)=>(i.id === id ? {...i, quantity }: i))
                })),

                clearCart: ()=> set({items: []}),

                total: ()=>
                    get().items.reduce((sum, i)=> sum + i.price * i.quantity, 0 ),

        }),
        {name: "cart-storage",
            partialize: (state) => ({ items: state.items }),
        }
        
    )
)