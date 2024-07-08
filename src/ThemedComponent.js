import React, { useContext } from 'react';
import { ThemeContext } from './context/themecontext';

function ThemedComponent(){
    const {theme,toggleTheme} = useContext(ThemeContext);

    return(
        <div style={{ background: theme === 'light' ? '#fff' : '333', color: theme === 'light' ? '#000' : '#fff'}}>
            <p>Current theme: {theme}</p>
            <button onClick={toggleTheme}>Toggle Theme</button>
        </div>
    );
}

export default ThemedComponent;