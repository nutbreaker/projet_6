/**
 * Renders a form field with a label and an input.
 * 
 * @param {Object} props the component props
 * @param {string} props.label the label text
 * @param {string} props.id the input ID and htmlFor attribute
 * @param {string} props.name the input name attribute
 * @param {string} [props.type] the input type (text, password, etc)
 * @param {boolean} [props.isSubmitting=false] whether the form is currently submitting
 * 
 * @returns {JSX.Element}
 */
export default function FormField({
    label,
    id,
    name,
    type,
    isSubmitting = false
}) {

    return (
        <label className="form-field" htmlFor={id}>
            {label}

            <input id={id} name={name} type={type} disabled={isSubmitting} required />
        </label>

    );
}