import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import theme from '../config/theme.jsx';
import createEmotionCache from '../config/createEmotionCache.jsx';
import {store, persistor} from './store/store.js';
import RoutesManager from './routes/RoutesManager.jsx';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

// This is the main App component
export default function App({emotionCache = clientSideEmotionCache}) {
    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <RoutesManager/>
                    </PersistGate>
                </Provider>
            </ThemeProvider>
        </CacheProvider>
    );
}