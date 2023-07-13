import React, { useState } from 'react';

const items = [
  {
    title: 'A Surge Protector',
    price: 300,
    id: 1,
  },
  {
    title: 'B Surge Protector',
    price: 400,
    id: 2,
  },
  {
    title: 'C Surge Protector',
    price: 500,
    id: 3,
  },
  {
    title: 'D Surge Protector',
    price: 600,
    id: 4,
  },
  {
    title: 'E Surge Protector',
    price: 700,
    id: 5,
  },
];

function CartItemsSelectionPage() {
  const [cartItems, setCartItems] = useState([]);

  // Function to add an item to the cart
  const addItem = (itemId) => {
    const updatedCartItems = [...cartItems];
    const existingItem = updatedCartItems.find(item => item.id === itemId);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      updatedCartItems.push({ id: itemId, quantity: 1 });
    }
    setCartItems(updatedCartItems);
  };

  // Function to remove an item from the cart
  const removeItem = (itemId) => {
    const updatedCartItems = [...cartItems];
    const existingItem = updatedCartItems.find(item => item.id === itemId);
    if (existingItem && existingItem.quantity > 0) {
      existingItem.quantity--;
    }
    setCartItems(updatedCartItems);
  };

  // Function to calculate the total items and total cost
  const calculateTotal = () => {
    let totalItems = 0;
    let totalCost = 0;

    cartItems.forEach(item => {
      const price = getItemPrice(item.id);
      totalItems += item.quantity;
      totalCost += item.quantity * price;
    });

    return { totalItems, totalCost };
  };

  // Helper function to get the price of an item based on its ID
  const getItemPrice = (itemId) => {
    const item = items.find(item => item.id === itemId);
    return item ? item.price : 0;
  };

  // Function to view the cart
  const viewCart = () => {
    const selectedItems = cartItems.map(item => {
      const selectedItem = items.find(itemData => itemData.id === item.id);
      const itemName = selectedItem ? selectedItem.title : '';
      const itemQuantity = item.quantity;
      return `${itemName}: ${itemQuantity}`;
    });

    window.alert(`Selected Items:\n${selectedItems.join('\n')}`);
  };

  return (
    <div>
      <h1>SELECT PLAN</h1>

      <div id="cart-items" style={{width: '90%', }}>
        {items.map(item => (
          <div className="item" key={item.id} style={{alignContent:'space-around', alignItems: 'center', display: 'flex', flexDirection: 'row', justifyContent:'space-between', padding: 10}}>
            <h3 style={{fontWeight:'bold'}}>{item.title}</h3>
            <p style={{color:'gray'}}>₹{item.price}</p>
            <div className="quantity" style={{ alignContent:'center', alignItems: 'center', display:'flex', justifyContent:'space-between', width: 40}}>
             {cartItems.find(cartItem => cartItem.id === item.id)?.quantity? <button className="remove" onClick={() => removeItem(item.id)}>-</button>: null}
              <span>{cartItems.find(cartItem => cartItem.id === item.id)?.quantity || 'ADD'}</span>

             {cartItems.find(cartItem => cartItem.id === item.id)?.quantity? <button className="add" onClick={() => removeItem(item.id)}>-</button>: null}
              <button className="add" onClick={() => addItem(item.id)}>+</button>
            </div>
          </div>
        ))}
      </div>

      <div id="total-floater" style={{position: 'absolute', bottom: 0, display:'flex', justifyContent:'space-between',alignSelf:'flex-end',backgroundColor:'#e64b17', color:'white', borderRadius: 5, padding: 10 , alignItems:'center', width: '98%'}}>
        <p >Total Items: {calculateTotal().totalItems}</p>
        <p>Total Cost: ₹{calculateTotal().totalCost}</p>
        {/* <button id="view-cart-btn" onClick={viewCart}>View Cart</button> */}
        <p onClick={viewCart} style={{cursor:'pointer', fontWeight:'bold'}}>View Cart </p>
      </div>

     
    </div>
  );
}

export default CartItemsSelectionPage;
