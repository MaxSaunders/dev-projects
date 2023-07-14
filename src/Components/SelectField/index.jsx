import propTypes from 'prop-types'

const SelectField = ({ options, onChange, label, value, className, labelClassName }) =>
    <label className={labelClassName}>
        {label &&
            <>
                {label}:&nbsp;&nbsp;
            </>
        }
        <select className={className} value={value} onChange={e => onChange(e.target.value)}>
            {options?.map(({ value, label }) =>
                <option key={value} value={value}>{label}</option>
            )}
        </select>
    </label>

SelectField.propTypes = {
    options: propTypes.array,
    onChange: propTypes.func,
    label: propTypes.string,
    className: propTypes.string,
    labelClassName: propTypes.string,
    value: propTypes.any,
}

export default SelectField
