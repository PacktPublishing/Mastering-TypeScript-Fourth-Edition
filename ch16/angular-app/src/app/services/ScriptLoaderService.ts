import { Injectable, ɵɵtrustConstantResourceUrl } from "@angular/core";
import { forkJoin, Observable } from "rxjs";

export interface ScriptStatus {
    script: string,
    loaded: boolean,
    status: string
}

@Injectable()
export class ScriptLoaderService {
    static scriptAlreadyLoaded(scriptUrl: string): boolean {
        let scripts = document.getElementsByTagName("body")[0].getElementsByTagName("script");
        var scriptAlreadyLoaded = false;
        for (var i = 0; i < scripts.length; i++) {
            if (scripts[i].src.endsWith(scriptUrl)) {
                scriptAlreadyLoaded = true;
            }
        }
        return scriptAlreadyLoaded;
    }

    loadAllScripts(...scriptUrls: string[]): Observable<ScriptStatus[]> {
        return forkJoin(scriptUrls.map(this.loadScript));
    }

    loadScript(scriptUrl: string): Observable<ScriptStatus> {
        return new Observable((observer) => {
            if (!ScriptLoaderService.scriptAlreadyLoaded(scriptUrl)) {
                var script: any = document.createElement("script");
                script.type = "text/javascript";
                script.src = scriptUrl;
                if (script.readyState) {  //IE
                    script.onreadystatechange = () => {
                        if (script.readyState === 'loaded' || script.readyState === 'complete') {
                            script.onreadystatechange = null;
                            observer.next({ script: scriptUrl, loaded: true, status: 'Loaded' });
                        }
                    };
                } else {  //Others
                    script.onload = () => {
                        observer.next({ script: scriptUrl, loaded: true, status: 'Loaded' });
                    };
                }
                script.onerror = (error: any) => observer.error(error);
                document.getElementsByTagName("body")[0].appendChild(script);
            } else {
                setTimeout(() => observer.next({ script: scriptUrl, loaded: true, status: 'Loaded' }), 300);
            }
        });
    }
}