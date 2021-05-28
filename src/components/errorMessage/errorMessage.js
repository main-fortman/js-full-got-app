import React from 'react';

export default function ErrorMessage() {
    return (
        <>
            <img 
                src={process.env.PUBLIC_URL + "/img/error.jpg"}
                alt='error'/>
            <span>Something goes wrong</span>
        </>
    )
}