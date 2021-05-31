import React, { useEffect, useState } from 'react';
import './itemList.css';
import Spinner from '../spinner/spinner';

function ItemList({getData, onItemSelected, renderItem}) {

    const [items, updateItems] = useState([]);

    useEffect(() => {
        getData().then(data => updateItems(data));
    }, []);

    function renderItems(items) {
        return items.map((item, index) => {
            return (
                <li 
                    key={item.id}
                     className="list-group-item"
                     onClick={() => onItemSelected(item.id)}
                >
                    {renderItem(item)}
                </li>
            )
        })
    }

    if (!items) {
        return <Spinner/>
    }

    return (
        <ul className="item-list list-group">
            {renderItems(items)}
        </ul>
    )
}

export default ItemList;