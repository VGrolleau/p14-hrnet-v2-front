import { PropTypes } from 'prop-types';
import '../utils/style/Input.css';

function Input(props) {
    const { id, label, type, error, onUpdate } = props;

    const onInputChange = (e) => {
        onUpdate(id, e.target.value);
    }

    return (
        <div className='input'>
            <label htmlFor={id}>{label}</label>
            <input type={type} id={id} onChange={(e) => onInputChange(e)} />
            <p className='error-text'>{error}</p>
        </div>
    )
};

Input.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string
}

export default Input;