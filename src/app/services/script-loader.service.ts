import { Injectable } from '@angular/core';
import { IScriptsModel } from '../models/IScripts-model';

@Injectable({
  providedIn: 'root',
})
export class ScriptLoaderService {
  constructor() {}

  load(scriptsList: IScriptsModel[]) {
    const promises: any[] = [];
    scriptsList.forEach((scriptObj) =>
      promises.push(this.loadScript(scriptObj))
    );
    return Promise.all(promises);
  }

  loadScript(scriptObj: IScriptsModel) {
    return new Promise((resolve, reject) => {
      // resolve if already loaded
      if (scriptObj.loaded) {
        resolve({ script: scriptObj, loaded: true, status: 'Already Loaded' });
      } else {
        // load script
        let script: any;
        if (scriptObj.type === 'js') {
          script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = scriptObj.src;
        } else {
          script = document.createElement('link');
          script.href = scriptObj.src;
          script.rel = 'stylesheet';
        }
        script.onload = () => {
          scriptObj.loaded = true;
          resolve({ script: scriptObj, loaded: true, status: 'Loaded' });
        };
        script.onerror = (error: any) =>
          resolve({ script: name, loaded: false, status: 'Loaded' });
        document.getElementsByTagName('head')[0].appendChild(script);
      }
    });
  }
}
