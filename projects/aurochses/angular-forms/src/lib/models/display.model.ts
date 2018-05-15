import { DisplayMetadata } from '../decorators/display.decorator';

export class Display {

    constructor(prototype: any, property: string) {
        if (`${DisplayMetadata.displayName}${property}` in prototype) {
            this.name = prototype[`${DisplayMetadata.displayName}${property}`];
        } else {
            this.name = property;
        }

        if (`${DisplayMetadata.displayOrder}${property}` in prototype) {
            this.order = parseInt(prototype[`${DisplayMetadata.displayOrder}${property}`], 10);
        }

        if (`${DisplayMetadata.displayDescription}${property}` in prototype) {
            this.description = prototype[`${DisplayMetadata.displayDescription}${property}`];
        }
    }

    name: string;
    order: number;
    description: string;
}
