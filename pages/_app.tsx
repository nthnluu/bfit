import {BaseStyles} from '@primer/components'
import {useEffect, useState} from "react";
import fb from "../lib/firebaseConfig";
import SessionContext from '../lib/SessionContext';

function MyApp({Component, pageProps}) {
    const [sessionLoaded, toggleSessionLoaded] = useState(false)
    const [isAuthenticated, toggleAuthenticated] = useState(false)
    const [userProfile, setUserProfile] = useState({})

    useEffect(() => {
        fb.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                setUserProfile(user)
                toggleAuthenticated(true)
                toggleSessionLoaded(true)
            } else {
                // User is signed out.
                toggleAuthenticated(false)
                setUserProfile({})
                toggleSessionLoaded(true)
            }
        });
    }, [])

    // Waits until the session is loaded before loading the page
    if (!sessionLoaded) return null

    return <SessionContext.Provider value={{isAuthenticated, userProfile}}>
        <BaseStyles>
            <Component {...pageProps} />
        </BaseStyles>
    </SessionContext.Provider>
}

export default MyApp
