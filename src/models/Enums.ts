import { registerEnumType } from 'type-graphql';

export enum ChartNamesEnum {
    hot = 'hot',
    top = 'top',
    mxmweekly = 'mxmweekly',
    mxmweekly_new = 'mxmweekly_new'
}

export enum ResponseStatus {
    ok = "ok",
    error = "error"
}

registerEnumType(ResponseStatus, {
    name: "ResponseStatus",
    description: "Response statuses",
});