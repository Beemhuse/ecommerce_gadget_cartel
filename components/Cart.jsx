import React, { useRef, useState } from "react";
import Link from "next/link";
import { AiOutlineLeft, AiOutlineShopping } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, toggleCart } from "../store/reducers/cartReducer";
import axios from "axios";
import useLoggedInStatus from "../hooks/useLoggedinStatus";
import CircularSpinner from "./spinner/CircularSpinner";
import { Cookies } from "react-cookie";
import { useRouter } from "next/router";
import CartProduct from "./CartProduct";
import useCurrencyFormatter from "../hooks/useCurrencyFormatter";
import toast from "react-hot-toast";
import { handleGenericError } from "../hooks/mixin";
const FormField = ({ label, value, onChange, readOnly, textarea }) => {
  const InputComponent = textarea ? "textarea" : "input";

  return (
    <div className="form-group flex flex-col">
      <label>{label}</label>
      <InputComponent
        defaultValue={value}
        onChange={onChange}
        className="form-control outline-none border px-3 py-2"
        readOnly={readOnly}
      />
    </div>
  );
};
// Example usage with a prefix
// const transactionNumber = generateTransactionNumber('GC');
const Cart = () => {
  const cartRef = useRef();
  const { cartItems, showCart, totalPrice, totalQuantities } = useSelector(
    (state) => state?.cart
  );
  const dispatch = useDispatch();
  const formatCurrency = useCurrencyFormatter("NGN");
  const [loading, setLoading] = useState(false);
  const isLoggedIn = useLoggedInStatus();
  const cookies = new Cookies();
  const router = useRouter();
  const user = cookies.get("GC_user");

  const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 1;
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = cartItems?.slice(indexOfFirstItem, indexOfLastItem);
const totalPages = Math.ceil(cartItems?.length / itemsPerPage);

const handleNextPage = () => {
  if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
  }
};

const handlePreviousPage = () => {
  if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
  }
};


  const [formData, setFormData] = useState({
    deliveryAddress: "",
    emailAddress: user?.email || "",
    phoneNumber: "",
    extraNote: "",
    id: user?.id,
  });

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };
  const handleShowCart = () => {
    dispatch(toggleCart());
  };

  const handleCheckout = async () => {
    try {
      if (!isLoggedIn) {
        // Redirect to the login page if the user is not logged in
        router.push("/signin");
        dispatch(toggleCart());
        return;
      }
      // Call createOrder function before processing payment
      const amount = totalPrice;

      if (formData?.deliveryAddress !== "") {
        setLoading(true);

        await axios
          .post("/api/paystack", {
            cartItems,
            amount,
            email: user.email,
            deliveryAddress: formData.deliveryAddress,
            note: formData.extraNote,
            phone: formData.phoneNumber,
            id: user.id
          })

          .then((res) => {
            setLoading(false);
            dispatch(clearCart())
            handleShowCart()
            console.log(res);

            const paymentLink =
              res?.data?.paymentResponse?.data?.authorization_url;
            console.log(paymentLink);
            if (paymentLink) {
              window.location.href = paymentLink;

            }
          });
      } else {
        toast.error("Please add an address to proceed with checkout");
      }
      // Call Paystack API to initiate payment
    } catch (error) {
      const errMsg = handleGenericError(error);
      toast.error(errMsg, {
        position: "top-right",
        duration: 3000,
      });
      setLoading(false);
      handleShowCart()


      console.error("Error handling checkout:", error);
    }
  };

  return (
    <div className="cart-wrapper overflow-y-auto" ref={cartRef}>
      <div className="cart-container">
        <button type="button" className="cart-heading" onClick={handleShowCart}>
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cartItems?.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button type="button" onClick={handleShowCart} className="btn">
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems?.length >= 1 &&
            currentItems?.map((item) => (
              <CartProduct item={item} key={item?._id} />
            ))}

          <div className="flex justify-between items-center">
            <h3>Subtotal:</h3>
            <h3>{formatCurrency(totalPrice)}</h3>
          </div>
        </div>
        {totalPages > 0 && (
                            <div className="pagination-buttons flex justify-center space-x-4 my-4">
                                <button
                                    onClick={handlePreviousPage}
                                    className="text-white bg-gray-800 hover:bg-gray-600 px-4 py-2 rounded"
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={handleNextPage}
                                    className="text-white bg-gray-800 hover:bg-gray-600 px-4 py-2 rounded"
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </div>
                        )}
        <form className="flex flex-col gap-2">
          <h2 className="font-bold uppercase border border-b border-0 py-2 border-black">
            Delivery Details
          </h2>
          <FormField
            label="Delivery Address"
            // value={formData.deliveryAddress}
            onChange={(e) => handleChange("deliveryAddress", e.target.value)}
          />
          <FormField
            label="Email Address"
            value={formData.emailAddress}
            // readOnly
          />
          <FormField
            label="Phone number"
            value={formData.phoneNumber}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
          />
          <FormField
            label="Extra Note"
            value={formData.extraNote}
            onChange={(e) => handleChange("extraNote", e.target.value)}
            textarea
          />
        </form>

        {cartItems.length >= 1 && (
          <div className="cart-bottom mt-8">
            <div className="">
              <button
                type="button"
                className={`border  rounded-xl bg-black h-14  w-full text-white text-xl relative ${
                  loading ? "cursor-not-allowed" : ""
                }`}
                onClick={handleCheckout}
                disabled={loading} // Disable the button when loading is true
              >
                {loading ? <CircularSpinner /> : " Pay with paystack "}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
