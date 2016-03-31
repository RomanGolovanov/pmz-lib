declare module 'windows-1251' {

    interface windows1251 {
        encode(text: string): string;
        decode(text: string, options: any): string;
    }

    var windows1251: {
        encode(text: string): string;
        decode(text: string, options: any): string;
    }

    export = windows1251;
}
