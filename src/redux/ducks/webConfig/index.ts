/* eslint-disable no-case-declarations */
import { PaletteMode } from '@mui/material';
import { Types, IWebConfig } from './types';


function getMode(): PaletteMode {
    let value = 'light'
    if (typeof window !== 'undefined') {
        value = localStorage.getItem('theme') || 'light'
    }
    if (value == 'light' || value == 'dark')
        return value;
    return 'light';
}

const INITIAL_STATE: IWebConfig = {
    mode: getMode(),
};

const reducer = (state = INITIAL_STATE, action: any): any => {
    switch (action.type) {
        case Types.CHANGE_THEME:
            state.mode = state.mode == 'light' ? 'dark' : 'light'
            if (typeof window !== 'undefined')
                localStorage.setItem('theme', state.mode)
            return { ...state };
        default:
            if (typeof window !== 'undefined')
                localStorage.setItem('theme', state.mode)
            return state;
    }
};

export default reducer;
