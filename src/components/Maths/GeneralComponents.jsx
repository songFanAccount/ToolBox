import { TBTextField } from "../UI/Form";

export function MEPTextField({onChange, expr}) {
    return (
        <TBTextField
            placeholder="e.g. ax^2 + bx + c"
            width={500}
            maxLength={150}
            onChange={onChange}
            value={expr}
            variant="outlined"
        />
    )
}