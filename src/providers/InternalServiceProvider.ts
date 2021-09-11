import { Provide } from "../context/IocProvider";
import { CONFIG } from "../context/components/Configuration";

@Provide(InternalServiceProvider)
export abstract class InternalServiceProvider {

    protected async getDefaultOptions() {
        return {
            searchParams: {
                apikey: CONFIG.musixmatch.apiKey
            },
            // By default, Got will retry on failure. To disable this option, set options.retry to 0.
            retry: 0,
            // Milliseconds to wait for the server to end the response before aborting the request with got.TimeoutError error (a.k.a. request property). By default, there's no timeout.
            timeout: 20000,
            responseType: 'json'
        };
    }
}