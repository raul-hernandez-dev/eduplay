import React, { forwardRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTheme } from '../../../contexts/ThemeContext';


const Recaptcha = forwardRef(({ onVerify, onExpired }, ref) => {
    const { theme } = useTheme();

    return (
        <div className="flex justify-center">
            <ReCAPTCHA
                key={theme}
                ref={ref}
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                theme={theme === 'dark' ? 'dark' : 'light'}
                onChange={onVerify}
                onExpired={onExpired}
            />
        </div>
    );
});

export default Recaptcha;
