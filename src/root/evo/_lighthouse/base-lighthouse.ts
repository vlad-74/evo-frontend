import { BehaviorSubject } from 'rxjs';

import { ILighthouse } from './_lighthouse.interface';
import {TNullable} from "../../config";
import {TLoggingTypes} from "../logging/debugger";
import {evoBase} from "../../evo-global";

export class baseLighthouse<T> implements ILighthouse<T> {
    public lighthouse$: BehaviorSubject<TNullable<T>> = new BehaviorSubject<TNullable<T>>(null);

    constructor(private _type: TLoggingTypes) {}

    public send(value: T): void {
        if (!value) return;

        evoBase.log.warn(this._type, 'common', 'Метод SEND в baseLighthouse ' + this._type)

        this.lighthouse$.next(value);
    }
}
