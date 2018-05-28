import { DataType } from '../models/data.type';

class DataMetadata {
    public static hasData = '__hasData__';
    public static dataType = '__dataType__';
}

export function Data(type: DataType) {
    return function dataInternal(target: Object, property: string | symbol): void {
        Object.defineProperty(
            target,
            `${DataMetadata.hasData}${property.toString()}`,
            {
                value: true,
                configurable: false,
                enumerable: false
            }
        );

        Object.defineProperty(
            target,
            `${DataMetadata.dataType}${property.toString()}`,
            {
                value: type,
                configurable: false,
                enumerable: false
            }
        );
    };
}

export function hasData<T>(instance: T, property: keyof T): boolean {
    const prototype = Object.getPrototypeOf(instance);

    return !!prototype[`${DataMetadata.hasData}${property}`];
}

export function getDataModel<T>(instance: T, property: keyof T): DataType | null {
    if (hasData(instance, property)) {
        const prototype = Object.getPrototypeOf(instance);

        return <DataType>prototype[`${DataMetadata.dataType}${property}`];
    }

    return null;
}
