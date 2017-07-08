export class ControlModel {
    key: number;
    name: string;
    placeholder: string;
    type: string;
    isReadonly: boolean;
    isRequired: boolean;
    maxLength?: number | null;
    minLength?: number | null;
    max?: number | Date | null;
    min?: number | Date | null;
}
