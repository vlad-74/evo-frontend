/**
 * Сервис для получения информации о текущем экране.
 */
import {IScreenInfo} from "./screen.interfaces";

import {IDevices} from "../devices/devices";
import {BrowserEnum, OperatingSystemEnum, OrientationScreenEnum, ScreenEnum} from "./screen.enum";


export class ScreenService  {
    /**
     * Получает информацию о текущем экране.
     * @param {IDevices} devices Параметры экрана
     * - devices.phoneMaxSize Максимальный размер для телефона.
     * - devices.tabletMaxSize Максимальный размер для планшета
     * - devices.desktopMaxSize Максимальный размер для десктопа.
     *
     * @returns {IScreenInfo} - Информация о экране.
     */
    getScreen(devices: IDevices): IScreenInfo {
        const phoneMaxSize: number = devices?.phoneMaxSize;
        const tabletMaxSize: number = devices?.tabletMaxSize;

        const screen: IScreenInfo = {
            devices,
            screen: {
                type: null,
                orientation: null,
                options: {
                    operatingSystem: this.getOperatingSystem(),
                    browser: this.getBrowserInfo(),
                    proportions: {
                        width: null,
                        height: null,
                        innerWidth: null,
                        innerHeight: null,
                    },
                    maxSize: null,
                    pixelRatio: window.devicePixelRatio,
                },
            }

        };

        // --- Определение ориентации экрана ---
        this._getOrientation(screen);

        // --- Определение пропорций экрана ---
        this._getOptions(screen, tabletMaxSize, phoneMaxSize);

        return screen;
    }

    /**
	 * Определение пропорций экрана
	 * @param {IScreenInfo} item Параметры экрана
	 * @param {number} tabletMaxSize Максимальный размер для планшета.
	 * @param {number} phoneMaxSize Максимальный размер для телефона..
	 */
	private _getOptions(item: IScreenInfo, tabletMaxSize: number, phoneMaxSize: number) {
		// --- Определение пропорций экрана ---
		item.screen.options.proportions.width = window.screen.width;
		item.screen.options.proportions.height = window.screen.height;

		item.screen.options.proportions.innerWidth = window.innerWidth;
		item.screen.options.proportions.innerHeight = window.innerHeight;

		// --- Определение максимального размера экрана ---
		item.screen.options.maxSize = item.screen.options.proportions.innerWidth >= item.screen.options.proportions.innerHeight
			? item.screen.options.proportions.innerWidth
			: item.screen.options.proportions.innerHeight;

		// --- Определение типа экрана (уточнить с pixelRatio?) ---

		if (item.screen.options.maxSize > tabletMaxSize ) {
			item.screen.type = ScreenEnum.Desktop;
		}

		if (item.screen.options.maxSize > phoneMaxSize && item.screen.options.maxSize <= tabletMaxSize) {
			item.screen.type = ScreenEnum.Tablet;
		}

		if (item.screen.options.maxSize <= phoneMaxSize) {
			item.screen.type = ScreenEnum.Phone;
		}
	}

	/**
	 * Определение ориентации экрана
	 * @param {IScreenInfo} item Параметры экрана
	 */
	private _getOrientation(item: IScreenInfo) {
		if (window.matchMedia('(orientation: landscape)').matches) {
            item.screen.orientation = OrientationScreenEnum.Horizontal;
		} else {
            item.screen.orientation = OrientationScreenEnum.Vertical;
		}
	}

    /**
     * Определяет операционную систему пользователя
     */
    public getOperatingSystem(): OperatingSystemEnum {
        const userAgent = navigator.userAgent.toLowerCase();

        if (userAgent.includes('win')) return OperatingSystemEnum.Windows;
        if (userAgent.includes('mac')) return OperatingSystemEnum.MacOS;
        if (userAgent.includes('linux')) return OperatingSystemEnum.Linux;
        if (userAgent.includes('android')) return OperatingSystemEnum.Android;
        if (userAgent.includes('ios') || userAgent.includes('iphone') || userAgent.includes('ipad')) return OperatingSystemEnum.iOS;
        if (userAgent.includes('x11')) return OperatingSystemEnum.UNIX;

        return OperatingSystemEnum.Unknown;
    }

    /**
     * Определяет браузер пользователя
     */
    public getBrowserInfo(): BrowserEnum {
        const userAgent = navigator.userAgent.toLowerCase();

        if (userAgent.includes('edg/')) return BrowserEnum.Edge;
        if (userAgent.includes('chrome/')) return BrowserEnum.Chrome;
        if (userAgent.includes('firefox/')) return BrowserEnum.Firefox;
        if (userAgent.includes('safari/') && !userAgent.includes('chrome/')) return BrowserEnum.Safari;
        if (userAgent.includes('opera/') || userAgent.includes('opr/')) return BrowserEnum.Opera;
        if (userAgent.includes('trident/') || userAgent.includes('msie')) return BrowserEnum.InternetExplorer;

        return BrowserEnum.Unknown;
    }
}
