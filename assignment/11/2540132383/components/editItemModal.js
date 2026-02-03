"use client";

import { db } from "../utils/firebase";
import { setDoc, doc } from "firebase/firestore";
import {useDataHooks} from "../hooks/useDataHooks";
import '../src/app/globals.css'

let itemId = ""
export function updateEditItemId(editItemId) {
    itemId = editItemId
}

export function EditItemModal({ hideModal }) {
    const itemName = useDataHooks("");
    const itemDescription = useDataHooks("");
    const itemPrice = useDataHooks(0)
    const itemQuantity = useDataHooks(0)
    const handleEditItem = async (event) => {
        event.preventDefault();

        const userDocRef = doc(db, "store", itemId);
        await setDoc(userDocRef, {
            name: itemName.value,
            description: itemDescription.value,
            price: itemPrice.value,
            quantity: itemQuantity.value,
        });

        hideModal();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={hideModal} />
            <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6">
                <div>
                    <h2 className="titleText">Edit item : {itemId}</h2>
                    <div>
                        <label>Name:</label>
                        <input style={{ outlineStyle: 'solid'}} type="text" name="name"
                               onChange={itemName.handleChange} value={itemName.value} />)
                    </div>
                    <div>
                        <label>Description:</label>
                        <input style={{ outlineStyle: 'solid'}} type="text" name="description"
                               onChange={itemDescription.handleChange} value={itemDescription.value}/>)
                    </div>
                    <div>
                        <label>Price:</label>
                        <input style={{ outlineStyle: 'solid'}} type="text" name="price"
                               onChange={itemPrice.handleChange} value={itemPrice.value}/>)
                    </div>
                    <div>
                        <label>Quantity:</label>
                        <input style={{ outlineStyle: 'solid'}} type="text" name="quantity"
                               onChange={itemQuantity.handleChange} value={itemQuantity.value}/>)
                    </div>
                    <button className="buttonStyle" onClick={handleEditItem}>
                        Edit Item
                    </button>
                    <button className="buttonStyle" onClick={hideModal}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
