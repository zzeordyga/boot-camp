'use client'
import {db} from "../utils/firebase"
import {useState, useEffect} from "react";
import {onSnapshot, collection, deleteDoc, doc} from "firebase/firestore";
import {useThemeContext} from "../context/theme-context";
import {useRoleContext} from "../context/role-context";
import useLocalStorage from "../hooks/useLocalStorage";
import '../src/app/globals.css'
import {useRouter} from "next/navigation";
import AddItemModal from "../components/addItemModal";
import {EditItemModal, updateEditItemId} from "../components/editItemModal";
import calculateTotal from "../utils/calculateTotal"

export default function StoreList()
{
    const router  = useRouter();
    const [items, setItems] = useState([]);
    const [addModalVisible, setAddModalVisible] = useState(false);

    const showAddModal = () => {
        setAddModalVisible(true);
    };
    const hideAddModal = () => {
        setAddModalVisible(false);
    };
    const [editModalVisible, setEditModalVisible] = useState(false);
    const showEditModal = (itemId) => {
        updateEditItemId(itemId);
        setEditModalVisible(true);
    };
    const hideEditModal = () => {
        setEditModalVisible(false);
    };

    const deleteItem = async (id) => {
        await deleteDoc(doc(db, "store", id));
    };

    const {theme} = useThemeContext()
    const {role} = useRoleContext();
    const [sortType, setSortType] = useLocalStorage("sortType", 0);

    const background = {
        width : '100vw',
        height : '100vh',
        backgroundColor : theme === 'light' ? '#FFFFFF' : '#2d3748'
    }
    const listContainer = {
        width: '900px',
        margin: '0 auto',
        padding : '10px',
        textAlign: 'center',
        backgroundColor: theme === 'light' ? '#F4F4F4' : '#1A3D64',
        color: theme === 'light' ? '#1A3D64' : '#F4F4F4',
        fontFamily: 'Tahoma',
        display: 'flex',
        flexDirection: 'column',
    };

    const sortList = (items, sortType) =>
    {
        let sortItem = items;
        switch (sortType) {
            case 1: // Price
                sortItem.sort((a, b) => b.price - a.price);
                break;
            case 2: // Quantity
                sortItem.sort((a, b) => b.quantity - a.quantity);
                break;
            default: // None
                break;
        }

        return sortItem;
    }

    useEffect( () => {
        onSnapshot(collection(db, "store"), (snapshot) => {
            const itemsArray = snapshot.docs.map((document) => {
                return { id: document.id,
                    name: document.data().name,
                    description: document.data().description,
                    price : document.data().price,
                    quantity : document.data().quantity,
                    totalPrice : calculateTotal(document.data().price, document.data().quantity)
                }});
            setItems(sortList(itemsArray, sortType));

        }, error => {
            console.log(error)
        });
    }, [sortType]);

    return(
        <div style={background}>
            {addModalVisible && <AddItemModal hideModal={hideAddModal}/>}
            {editModalVisible && <EditItemModal hideModal={hideEditModal} />}
            <button className="buttonStyle" onClick={() => {
                router.push('/');
            }}>
                Go to main
            </button>
            <div style={listContainer}>
                <h1 className="titleText">Store Page</h1>
                <br></br>
                <div>
                    <button className="buttonStyle" onClick={() => setSortType(1)}>
                        Sort by Price
                    </button>
                    <button className="buttonStyle" onClick={() => setSortType(2)}>
                        Sort by Quantity
                    </button>
                    <button className="buttonStyle" onClick={() => setSortType(0)}>
                        No Sort
                    </button>
                    {role === "admin" && <button className="buttonStyle" onClick={showAddModal}>
                        Add Item
                    </button>}
                </div>
                <br></br>
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total Price * Quantity</th>
                        {role === "admin" &&
                            <th>Edit</th>}
                        {role === "admin" &&
                            <th>Delete</th>}
                    </tr>
                    </thead>
                    <tbody>
                    {items.map(item=> (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                            <td>{item.totalPrice}</td>
                            {role === "admin" &&
                                <td>
                                    <button className="buttonStyle" onClick={() => showEditModal(item.id)}> Edit </button>
                                </td>}
                            {role === "admin" &&
                                <td>
                                    <button className="buttonStyle" onClick={() => deleteItem(item.id)}>Delete</button>
                                </td>}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )