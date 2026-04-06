import { BehaviorSubject } from 'rxjs';
import {TNullable} from "../../config";

export interface ILighthouse<T> {

    lighthouse$: BehaviorSubject<TNullable<T>>;

    send(config: T): void;
}
