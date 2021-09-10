import { registerEnumType } from 'type-graphql';

export enum ResponseStatus {
    ok = "ok",
    error = "error"
}

registerEnumType(ResponseStatus, {
    name: "ResponseStatus",
    description: "Response statuses",
});