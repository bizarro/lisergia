declare interface Promise<T> {
    reject: any;
    resolve: any;
}
declare interface PromiseConstructor {
    create(): Promise<any>;
}
