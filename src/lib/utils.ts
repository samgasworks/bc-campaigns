import { writable } from 'svelte/store';

export const loading = writable<boolean>(false);
export const currentDropDown = writable<string | null>(null);
export const currentModal = writable<string | null>(null);	
