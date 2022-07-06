import React from 'react';
import { Button } from 'antd';

const FilterButtons = ({
    containerStyles = {},
    options = [],
    onClick,
    styles
}) => {
    return (
        <div style={containerStyles}>
            {options.map((option, index) => (
                <Button
                    key={index}
                    type="primary"
                    htmlType="submit"
                    style={styles[options[index].name]}
                    onClick={() => { onClick(options[index].name) }}>
                    {option.label}
                </Button>
            ))}
        </div>
    )
}

export default FilterButtons