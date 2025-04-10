import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets2";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

//create context
export const Context = createContext()

//wrap the context value in provider
function ContextProvider({children}){

    const [cartItems,setCartItems] = useState({});
    const [promo, setPromo] = useState("");
    const [discountedAmt, setDiscountedAmt] = useState(0);
    const [members,setMembers] = useState([]);
    const [isPromoApplied, setIsPromoApplied] = useState(false);
    const url = "http://localhost:3000"
    const [token,setToken] = useState("")
    const [food_list,setFoodList] = useState([])

    const navigate = useNavigate();

    const addToCart = async (itemId) => {

        // { ...prev } creates a new object containing the existing cart items.
        // [itemId]: 1 adds a new item to the cart with an initial quantity of 1.

        if(!cartItems[itemId]){
            setCartItems((prev) => ({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev) => ({ ...prev, [itemId]:prev[itemId]+1}))
        }

        if(token){
            await axios.post(`${url}/api/cart/add`, { itemId },{headers : {token}})
        }

    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId]-1}))

        if(token){
            await axios.post(`${url}/api/cart/remove`,{itemId},{headers:{token}})
        }

    }

    const getCartTotalAmt = () => {

        let totalAmt = 0;

        for(const item in cartItems){

            if(cartItems[item]>0){
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmt += itemInfo.price * cartItems[item]; 
            }

        }

        return totalAmt;

    }

    const promoCodes = {
        "WELCOME10": 10,  //10% off
        "FOODIE50": 50,   //50% off upto $80
        "SAVE100": 100,    //100% off upto $80
    }

    const fetchFoodList = async() => {

        const res = await axios.get(url+"/api/food/list")

        setFoodList(res.data.data)

    }

    const loadCartData = async (token) => {
        const res = await axios.post(`${url}/api/cart/get`,{},{headers:{token}}) 
        setCartItems(res.data.cartData);
    }

    useEffect(()=>{
        
        async function loadData(){

            await fetchFoodList();

            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"))
            }

        }

        loadData();

    },[])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getCartTotalAmt,
        promoCodes,
        promo,
        setPromo,
        discountedAmt,
        setDiscountedAmt,
        members, 
        setMembers,
        isPromoApplied,
        setIsPromoApplied,
        url,
        token,
        setToken,
    };


    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    )

}

export default ContextProvider