import { DisplayMetadata } from '../decorators/display.decorator';

export class Display {

    constructor(prototype: any) {
        if (`${DisplayMetadata.displayName}${name}` in prototype) {
            display.name = prototype[`${DisplayMetadata.displayName}${name}`];
        }
        if (`${DisplayMetadata.displayOrder}${name}` in prototype) {
            display.order = prototype[`${DisplayMetadata.displayOrder}${name}`];
        }
        if (`${DisplayMetadata.displayDesc}${name}` in prototype) {
            display.description = prototype[`${DisplayMetadata.displayDesc}${name}`];
        }
    }

    name: string;
    order: number;
    description: string;
}
