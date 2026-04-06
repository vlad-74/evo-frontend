import {IDevices} from "./devices";
import {baseLighthouse} from "../../_lighthouse/base-lighthouse";


/** Маяк для оповещения о размерах экранов и страрицы */
export class DevicesLighthouse extends baseLighthouse<IDevices>{

    public constructor() {
        super('devices'); // Передаём тип для логирования и отладки
    }
}
