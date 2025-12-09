import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const LocalizationContext = createContext();

export const useLocalization = () => useContext(LocalizationContext);

export const LocalizationProvider = ({ children }) => {
    const { i18n } = useTranslation();
    const [currency, setCurrency] = useState('USD');
    const [currencySymbol, setCurrencySymbol] = useState('$');
    const [countryCode, setCountryCode] = useState('US');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const response = await axios.get('https://ipapi.co/json/');
                const data = response.data;
                const country = data.country_code;
                
                setCountryCode(country);

                if (country === 'IN') {
                    setCurrency('INR');
                    setCurrencySymbol('₹');
                    // i18n.changeLanguage('hi'); // Uncomment if you want to switch language automatically
                } else {
                    setCurrency('USD');
                    setCurrencySymbol('$');
                    // i18n.changeLanguage('en');
                }
            } catch (error) {
                console.error("Error fetching country:", error);
                // Fallback to default
            } finally {
                setLoading(false);
            }
        };

        fetchCountry();
    }, [i18n]);

    const convertPrice = (priceInUSD) => {
        if (currency === 'INR') {
            return Math.round(priceInUSD * 85); // Approximate conversion rate
        }
        return priceInUSD;
    };

    return (
        <LocalizationContext.Provider value={{ currency, currencySymbol, countryCode, convertPrice, loading }}>
            {children}
        </LocalizationContext.Provider>
    );
};
