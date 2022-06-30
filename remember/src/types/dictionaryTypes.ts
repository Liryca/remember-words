
export interface Word {
    englishVersion: string;
    rusVersion: string;
    example: string;
    mark: boolean;
    date: number;
    id: number;
}



export type Dictionary =Word[];


export interface DictionaryAction {
    type: string;
    dictionary: [];
}


export type DictionaryState =Dictionary