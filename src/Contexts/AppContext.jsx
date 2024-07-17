import {createContext, useState} from "react";
import {State} from "../store/Flux.tsx";

export const Context = createContext (null);

const InjectContext = (Component) => {
    const Container = (props) => {
        const [state, setState] = useState(
            State({
                getStore: () => state.store,
                setStore: (updatedStore) => {
                    setState({
                        store: {...state.store, ...updatedStore},
                        actions: {...state.actions}
                    })
                }
            })
        );

        return (
            <Context.Provider value={state}>
                <Component {...props}/>
            </Context.Provider>
        )
    }
    return Container;
}

export default InjectContext;