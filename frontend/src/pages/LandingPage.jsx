import React, { useState, useEffect, useSearchParams } from 'react';
import "../styles/landingPage.css"

export default function LandingPage() {
    const apiKey = import.meta.env.VITE_SPOTIFY_CLIENT_ID;

    useEffect(() => {
        fetchApi();
    }, []); 
    const fetchApi = async () => {

    }
    return (
        <div className='titulo'>{apiKey}</div>
    )
}
