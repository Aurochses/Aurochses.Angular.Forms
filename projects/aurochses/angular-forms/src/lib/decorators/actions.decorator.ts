import { ActionsModel } from '../models/actions.model';

export function Actions(show = true) {
    return function actionsInternal(target: Object): void {
        Object.defineProperty(
            target,
            `${ActionsMetadata.show}`,
            {
                value: show,
                enumerable: false,
                configurable: false
            }
        );
    };
}

export function getActionsModel<T>(instance: T): ActionsModel {
    const prototype = Object.getPrototypeOf(instance);

    const model = new ActionsModel();

    if (`${ActionsMetadata.show}` in prototype.constructor && prototype.constructor[`${ActionsMetadata.show}`] === true) {
        model.show = true;
    }

    return model;
}

class ActionsMetadata {
    public static show = `__actions__show`;
}
